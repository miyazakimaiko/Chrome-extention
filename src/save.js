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
// Still working on this part--------------------------------------------
document.getElementById('add-word-form').onsubmit = function(){
    
    chrome.storage.local.get({ wordInfo:[] }, function(items) {

        let newWord = [];

        let word = document.getElementById('vocabulary').value;

        let tags = 
        items.wordInfo.push({ wordInfo:newWord });

        let newTags = 

        chrome.storage.local.set(items);

    });

}
