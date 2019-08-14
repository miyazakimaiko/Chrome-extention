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
    
    chrome.storage.local.get({ wordInfo:[] }, function(items) {

        let newWord = { word:'', tag:[], category:'', meanings:'' };

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

        items.wordInfo.push(newWord); 

        chrome.storage.local.set(items);

    });

}
