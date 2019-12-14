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
                alert.innerHTML = `Category[${newCat}] already exists.`;
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

            saveWord(items);
            
        });
        return false;
    }

}