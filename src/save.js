// Create tags
if ( document.getElementById('add-tags') ) {

    document.getElementById('add-tags').onsubmit = () => {

        let newTag = document.getElementById('tag-input').value;
        const alert = document.getElementById("alert-success-t")

        chrome.storage.local.get({ tagData:[] }, (items) => {

            if ( !newTag.length ) {
                alert.classList.add('alert-danger')
                alert.innerHTML = "Please fill the form.";
            }
            else if (items.tagData.indexOf(newTag) === -1 ) {
                items.tagData.push(newTag);
                chrome.storage.local.set(items);
                alert.classList.add('alert-success')
                alert.innerHTML = `Successfully added a tag [${newTag}].`;
            } else {
                alert.classList.add('alert-danger')
                alert.innerHTML = `Tag[${newTag}] already exists.`;
            }
            showAlert(alert);

        });
        return false;
    }

}

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


// Create categories
if ( document.getElementById('add-category') ) {

    document.getElementById('add-category').onsubmit = () => {

        let newCat = document.getElementById('category-input').value;
        const alert = document.getElementById("alert-success-c")
        
        chrome.storage.local.get({ catData:[] }, (items) => {
            
            if ( !newCat.length ) {
                alert.classList.add('alert-danger')
                alert.innerHTML = "Please fill the form.";
            }
            else if (items.catData.indexOf(newCat) === -1 ) {
                items.catData.push(newCat);
                chrome.storage.local.set(items);
                alert.classList.add('alert-success')
                alert.innerHTML = `Successfully added a category [${newCat}].`;
            } else {
                alert.classList.add('alert-danger')
                alert.innerHTML = `Tag[${newCat}] already exists.`;
            }
            showAlert(alert);

        });
        return false;
    }

}

// Add words
if ( document.getElementById('add-word-form') ) {

    document.getElementById('add-word-form').onsubmit = () => {

        chrome.storage.local.get(null, (items) => {

            // Create ID"
            if (items.countId === undefined || items.countId === 0) {
                let id = 1
                items.countId = id;
                chrome.storage.local.set(items);
            } else {
                items.countId++
                chrome.storage.local.set(items);
            }

            // init array
            if(!items.wordInfo){
                items.wordInfo = [];
            }
            const newWord = { id:0, word:"", tag:[], category:"", meanings:"" };

            // Add ID
            const cId = items.countId;
            newWord.id = cId;

            // Push word
            let vocab = document.getElementById('vocabulary').value;
            newWord.word = vocab;

            // Push meaning
            let meaning = document.getElementById('meaning-textarea').value;
            newWord.meanings = meaning;

            // Push tag
            let tagEl = document.getElementById('tag-container');

            let tags = tagEl.getElementsByTagName('input');

            for (let i = 0; i < tags.length; i++ ) {
                
                if (tags[i].checked) {
                    let checkedLabel = document.getElementById(`tag${i}-label`).textContent;
                    newWord.tag.push(checkedLabel)
                }

            }

            // Push category
            let catEl = document.getElementById('category-container');

            let cat = catEl.getElementsByTagName('input');

            for (let i = 0; i < cat.length; i++ ) {
                if (cat[i].checked) {
                    let checkedSpan = document.getElementById(`cat${i}-span`).textContent;
                    newWord.category = checkedSpan;
                }
            }

            if(items.wordInfo === undefined ) {
                items.wordInfo[0] = newWord;
            } else {
                items.wordInfo.unshift(newWord); 
            }

            chrome.storage.local.set(items);

        });

    }

}