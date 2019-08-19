

// Create tags
document.getElementById('add-tags').onsubmit = function(){

    chrome.storage.local.get({ tagData:[] }, function(items) {

        let newTag = document.getElementById('tag-input').value;

        items.tagData.push(newTag);

        chrome.storage.local.set(items);

    });

}

// Create categories
document.getElementById('add-category').onsubmit = function(){
    
    chrome.storage.local.get({ catData:[] }, function(items) {

        let newCat = document.getElementById('category-input').value;

        items.catData.push(newCat);

        chrome.storage.local.set(items);

    });

}


// Add words
document.getElementById('add-word-form').onsubmit = function(){

    chrome.storage.local.get(null, function(items) {

        // Create ID"
        if (items.countId === undefined || items.countId === 0) {
            let id = 1
            items.countId = id;
            chrome.storage.local.set(items);
        } else {
            items.countId++
            chrome.storage.local.set(items);
        }

        // Create wordInfo array
        if(!items.wordInfo){
            items.wordInfo = [];
        }


        const newWord = { id:'', word:'', tag:[], category:'', meanings:'' }; // need to add ID -----------------------------------------------

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

        for (let i=0, len=tags.length; i<len; i++ ) {
            
            if (tags[i].checked) {

                let checkedLabel = document.getElementById(`tag${i}-label`).textContent;
                newWord.tag.push(checkedLabel);

            }

        }

        // Push category
        let catEl = document.getElementById('category-container');

        let cat = catEl.getElementsByTagName('input');

        for (let i=0, len=cat.length; i<len; i++ ) {
            
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

