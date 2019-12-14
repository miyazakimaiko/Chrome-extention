const showAlert = (alert) => {
    alert.style.display = "flex";
    setTimeout(function() { 
        clearAlert(alert) 
    }, 3000);
}

    const clearAlert = (alert) => {
        alert.style.display = "none";
        alert.classList.remove('alert-danger')
    }

const saveWord = (items) => {
    // Get the vocaburary
    let vocab = document.getElementById('vocabulary').value;
    const wordAlert = document.getElementById("alert-success-w")
    // init array
    if(!items.wordInfo){
        items.wordInfo = {};
    } 
    if(items.wordInfo[vocab] == null) {
        items.wordInfo[vocab] = { id:0, tag:[], category:"", meanings:"" };
    } else {
        wordAlert.classList.add('alert-danger')
        wordAlert.innerHTML = `Word [${vocab}] already exists.`;
        showAlert(wordAlert);
        return false;
    }

    // Create ID
    if (items.countId === undefined || items.countId === 0) {
        let id = 1
        items.countId = id;
        chrome.storage.local.set(items);
    } else {
        items.countId++
        chrome.storage.local.set(items);
    }

    // Add ID
    const cId = items.countId;
    items.wordInfo[vocab].id = cId;

    // Push meaning
    let meaning = document.getElementById('meaning-textarea').value;
    items.wordInfo[vocab].meanings = meaning;

    // Push tag
    let tagEl = document.getElementById('tag-container');

    let tags = tagEl.getElementsByTagName('input');

    for (let i = 0; i < tags.length; i++ ) {
        
        if (tags[i].checked) {
            let checkedLabel = document.getElementById(`tag${i}-label`).textContent;
            items.wordInfo[vocab].tag.push(checkedLabel)
        }

    }

    // Push category
    let catEl = document.getElementById('category-container');

    let cat = catEl.getElementsByTagName('input');

    for (let i = 0; i < cat.length; i++ ) {
        if (cat[i].checked) {
            let checkedSpan = document.getElementById(`cat${i}-span`).textContent;
            items.wordInfo[vocab].category = checkedSpan;
        }
    }

    chrome.storage.local.set(items);
    wordAlert.classList.add('alert-success')
    wordAlert.innerHTML = 'Successfully added.';
    showAlert(wordAlert);
}


const displayWords = (root, location, storage) => {
    // O(n)
    const wordUl = document.getElementById('words-ul')

    if (Object.entries(storage).length === 0) {
        ///.introduction-top,
        //.sample-w,
        //.introduction-bottom
        const introTop = document.querySelector('.introduction-top')
        const introSample = document.querySelector('.sample-w')
        const introBtm = document.querySelector('.introduction-bottom')
              introTop.classList.add('display-block')
              introSample.classList.add('display-flex')
              introBtm.classList.add('display-block')
    }

    for( let i in storage ) {
        // <li>
        const wordLi = document.createElement('li')
              wordLi.setAttribute('class', 'flexbox')

        // First <p> word
        const wordPara1 = document.createElement('div')
              wordPara1.setAttribute('class', 'main-word')
              wordPara1.setAttribute('id', `main-word-${i}`)
              wordPara1.textContent = i
        // <div> for tag's <span>
        const tagDiv = document.createElement('div')
              tagDiv.setAttribute('class', 'tagDiv')
              tagDiv.setAttribute('id', `tagDiv${i}`)

        wordUl.appendChild(wordLi)
        wordLi.appendChild(wordPara1)
        wordLi.appendChild(tagDiv)

        // Tag's <span> O(n2)
        for (let j = 0; j < storage[i].tag.length; j++ ) {
            const divTag = document.getElementById(`tagDiv${i}`)
            const tagSpan = document.createElement('span')
                  tagSpan.textContent = storage[i].tag[j]
                  tagSpan.setAttribute('class', 'badge badge-pill badge-success')
                  divTag.appendChild(tagSpan)
        }
        // Second <p> meaning
        const wordPara2 = document.createElement('div')
              wordPara2.textContent = storage[i].meanings
              wordPara2.setAttribute('class', 'main-meaning')
              wordPara2.setAttribute('id', `main-meaning${i}`)

        wordLi.appendChild(wordPara2)
        
        // Delete button
        const deleteBtn = document.createElement('button')
              deleteBtn.setAttribute('type', 'submit')
              deleteBtn.setAttribute('id', `delete-btn${i}`)
              deleteBtn.setAttribute('class', 'delete-btn')

        wordLi.appendChild(deleteBtn)
    
        // Edit button
        const editSubmit = document.createElement('button')
              editSubmit.setAttribute('type', 'submit')
              editSubmit.setAttribute('id', `edit-submit-btn${i}`)
              editSubmit.setAttribute('class', 'edit-submit-btn')

        wordLi.appendChild(editSubmit)

        wordLi.addEventListener("mouseenter", () => {
            deleteBtn.classList.add('display')
            editSubmit.classList.add('display')
        }, false);

        wordLi.addEventListener("mouseleave", () => {
            deleteBtn.classList.remove('display')
            editSubmit.classList.remove('display')
        }, false);

        document.getElementById(`delete-btn${i}`).addEventListener("click", () => {
            const deleteForm = document.getElementById("delete-modal")
            if (deleteForm.classList.contains("display-modal")) {
                deleteForm.classList.remove("display-modal");
            } else if (!deleteForm.classList.contains("display-modal")) {
                deleteForm.classList.add("display-modal");
                document.querySelector(".delete-message").innerHTML = `Are you sure to delete a word [${i}] ?`;
            };

            document.getElementById('delete-word-form').onsubmit = () => {
                chrome.storage.local.get(null, (items) => {
                    delete items.wordInfo[i];
                    chrome.storage.local.set(items);
                });
            }
        });

        // Pull down word-edit form
        document.getElementById(`edit-submit-btn${i}`).addEventListener("click", () => {
            
            const wordForm = document.getElementById("word-modal")
            if (wordForm.classList.contains("display-modal")) {
                wordForm.classList.remove("display-modal");
            } else if (!wordForm.classList.contains("display-modal")) {
                wordForm.classList.add("display-modal");
            };
                  
            // Change ID so the form can send different way
            document.getElementById('add-word-form').id = 'edit-word-form'
            document.getElementById ('word-modal-title').innerHTML = 'Edit the word'
            // Display data related to the button that is submitted
            //// ID
            document.getElementById('id-sender').value = storage[i].id
            //// word
            document.getElementById('vocabulary').value = i
            //// meaning
            document.getElementById('meaning-textarea').value = storage[i].meanings
            //// tag
            chrome.storage.local.get({ tagData:[] }, (items) => {

                // O(n2)
                for (let k = 0; k < items.tagData.length; k++ ) {

                    const a = items.tagData[k]
                    //O(n3)
                    for (let l = 0; l < storage[i].tag.length; l++ ) {
                        const b = storage[i].tag[l]
                        if ( a === b ) {
                            document.getElementById(`tag${k}-input`).checked = true
                        }
                    }
                    
                }
            });

            //// category
            chrome.storage.local.get({ catData:[] }, (items) => {
                for (let k = 0; k < items.catData.length; k++ ) {
                    const a = items.catData[k]
                    const b = storage[i].category
                    if ( a === b ) {
                        document.getElementById(`cat${k}-input`).checked = true
                    }
                }
            });

            document.getElementById('cancel-form').onsubmit = () => {

                if ( document.getElementById('edit-word-form') ) {
                    document.getElementById('edit-word-form').id = 'add-word-form'
                    // Close the pull down window
                    wordForm.classList.remove("display-modal");
                } else {
                    wordForm.classList.remove("display-modal");
                }

            }

            // Set data into storage.local
            document.getElementById('edit-word-form').onsubmit = () => {

                chrome.storage.local.get(null, (items) => {

                    delete items.wordInfo[i]
                    saveWord(items); 

                });

                const wordAlert = document.getElementById("alert-success-w")
                wordAlert.classList.add('alert-success')
                wordAlert.innerHTML = 'Successfully edited.';
                showAlert(wordAlert);
                
                const putBackWordForm = document.getElementById('edit-word-form')
                putBackWordForm.id = 'add-word-form'
                return false;
            }
  
        });

    }

}