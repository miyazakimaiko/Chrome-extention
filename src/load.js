// Load tag data from storage
chrome.storage.local.get({ tagData:[] }, (items) => {

    for(let i = 0; i < items.tagData.length; i++ ) {

        const tagContainer = document.getElementById('tag-container')

        const tagDiv = document.createElement('div')

        const tagInput = document.createElement('input')
              tagInput.setAttribute('id', `tag${i}-input`)
              tagInput.setAttribute('type', 'checkbox')

        const tagLabel = document.createElement('label')
              tagLabel.textContent = items.tagData[i];
              tagLabel.setAttribute('for', `tag${i}-input`)
              tagLabel.setAttribute('id', `tag${i}-label`)

        tagContainer.appendChild(tagDiv)
        tagDiv.appendChild(tagInput)
        tagDiv.appendChild(tagLabel)
            
    }

});

// Load category data from storage
chrome.storage.local.get({ catData:[] }, (items) => {

    for(let i = 0; i < items.catData.length; i++ ) {
        
        // Display them on add-word-drawer contents
        const catContainer = document.getElementById('category-container')

        const catLabel = document.createElement('label')

        const catInput = document.createElement('input')
              catInput.setAttribute('type', 'radio')
              catInput.setAttribute('id', `cat${i}-input`)
              catInput.setAttribute('name', 'category')

        const catSpan = document.createElement('span')
              catSpan.textContent = items.catData[i];
              catSpan.setAttribute('id', `cat${i}-span`)

        catContainer.appendChild(catLabel)
        catLabel.appendChild(catInput)
        catLabel.appendChild(catSpan)

        // Display them on nav-drawer contents
        const navContainer = document.getElementById('nav-cat-container')

        const navDiv = document.createElement('div')

        const navForm = document.createElement('form')
              navForm.setAttribute('id', `cat-form${i}`)
              navForm.setAttribute('class', 'cat-form')        

        const navBtn = document.createElement('button')
              navBtn.setAttribute('type', 'submit')
              navBtn.setAttribute('id', `submit${i}`)
              navBtn.setAttribute('class', 'category-btn')
              navBtn.textContent = items.catData[i];

        navContainer.appendChild(navDiv)
        navDiv.appendChild(navForm)
        navForm.appendChild(navBtn)

        // Close nav bar when clicking category btn
        const input = document.getElementById('nav-input')
        const hmbBtn = document.getElementById('nav-open')

        hmbBtn.addEventListener('click', () => {
            input.setAttribute('class', 'nav-input');
        });

        navBtn.addEventListener('click', () => {
            input.removeAttribute('class')
            input.checked = false
        });

    }

});

chrome.storage.local.get(null, (items) => {
    console.log(items.countId)
    console.log(items.wordInfo)
    console.log(items.catData)
    console.log(items.tagData)

});

// To display words
const displayWords = (root, location, storage) => {

    // O(n)
    for( let i = 0; i < storage.length; i++ ) {
        // Build main-area with words
        // Main <ul> 
        const wordUl = document.getElementById('words-ul')
        // Message if there's no data
        const message = document.createElement('p')
              message.textContent = ('You can add tags from side bar!')
        
        if ( storage.length === 0 ) {
            wordUl.appendChild(message)   
        }
        // <li>
        const wordLi = document.createElement('li')
              wordLi.setAttribute('class', 'flexbox')

        // First <p> word
        const wordPara1 = document.createElement('p')
              wordPara1.setAttribute('class', 'main-word')
              wordPara1.setAttribute('id', `main-word-${i}`)
              wordPara1.textContent = storage[i].word
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
        const wordPara2 = document.createElement('p')
              wordPara2.textContent = storage[i].meanings
              wordPara2.setAttribute('class', 'main-meaning')

        wordLi.appendChild(wordPara2)

        // Edit button
        const editForm = document.createElement('form')
              editForm.setAttribute('class', 'edit-submit-form')
              editForm.setAttribute('id',`edit-submit-form${i}`)
        
        const editSubmit = document.createElement('button')
              editSubmit.setAttribute('type', 'submit')
              editSubmit.setAttribute('class', 'edit-submit-btn')

        const fontAwesome = document.createElement('i')

        wordLi.appendChild(editForm)
        editForm.appendChild(editSubmit)
        editSubmit.appendChild(fontAwesome)

        wordLi.addEventListener("mouseenter", () => {
            fontAwesome.setAttribute('class', 'fas fa-edit')
        }, false);

        wordLi.addEventListener("mouseleave", () => {
            fontAwesome.removeAttribute('class')
        }, false);

        // Pull down word-edit form
        document.getElementById(`edit-submit-form${i}`).onsubmit = () => {
            
            const input = document.getElementById('add-word-input')
                  input.checked = true;
            // Change ID so the form can send different way
            const editWordForm = document.getElementById('add-word-form')
                  editWordForm.id = 'edit-word-form'
            // Display data related to the button that is submitted
            //// ID
            document.getElementById('id-sender').value = storage[i].id
            //// word
            document.getElementById('vocabulary').value = storage[i].word
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
                    input.checked = false;
                } else {
                    input.checked = false;
                }

            }

            // Set data into storage.local
            document.getElementById('edit-word-form').onsubmit = () => {

                let editedWord = { id:'', word:'', tag:[], category:'', meanings:'' };
                    editedWord.id = document.getElementById('id-sender').value
                    editedWord.word = document.getElementById('vocabulary').value
                    editedWord.meanings = document.getElementById('meaning-textarea').value

                // Push tag
                const tagEl = document.getElementById('tag-container');
                const tags = tagEl.getElementsByTagName('input');
                for (let l = 0; l < tags.length ; l++ ) {
            
                    if (tags[l].checked) {
                        const nTag = document.getElementById(`tag${l}-label`).textContent;
                        editedWord.tag.push(nTag);
                    }
        
                }

                // Push category
                const catEl = document.getElementById('category-container')
                const cat = catEl.getElementsByTagName('input')
                for (let m = 0; m < cat.length; m++ ) {
                    
                    if (cat[m].checked) {
                        let checkedSpan = document.getElementById(`cat${m}-span`).textContent;
                        editedWord.category = checkedSpan;
                    }

                }

                for (let n = 0; n < location.length; n++ ) {
                    if ( location[n].id == editedWord.id ) {
                        location[n] = editedWord
                        chrome.storage.local.set(root)
                        alert('Successfully edited!')
                    } 
                }
                
                const putBackWordForm = document.getElementById('edit-word-form')
                putBackWordForm.id = 'add-word-form'

            }
            return false;
  
        };


    }

}


// Display all words (default)
chrome.storage.local.get({ wordInfo:[] }, (items) => {
    displayWords(items, items.wordInfo, items.wordInfo);
});

// Display words depends on category
chrome.storage.local.get({ catData:[] }, (items) => {
    
    for( let h = 0; h < items.catData.length; h++ ) {

        // Word list sorted by Category
        document.getElementById(`cat-form${h}`).onsubmit = () => {

            const removeItems = document.getElementById('words-ul')
            while (removeItems.firstChild) {
                removeItems.removeChild(removeItems.firstChild)
            }

            chrome.storage.local.get({ wordInfo:[] }, (items) => {

                const keyword = document.getElementById(`submit${h}`).textContent
                const allItems = items.wordInfo

                const filterByCategory = (item) => {
                    if ( item.category === keyword ) {
                        return true
                    }
                }

                let result = allItems.filter(filterByCategory);
                displayWords(items, items.wordInfo, result);

            });
                
            return false
        };
    
    }

});
