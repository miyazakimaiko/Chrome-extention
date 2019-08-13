// Create tags

document.getElementById('add-tags').onsubmit = function(){
    
    chrome.storage.local.get({ tagData:[] }, function(result){

        var tagData = result.tagData;

        var newTag = document.getElementById('tag-input').value;  

        tagData.push(newTag); // here has through an error

        chrome.storage.local.set({ tagData:tagData });
            
    });

}

// Add words
// this function only add word in vocab inseparately..

document.getElementById('add-word-form').onsubmit = function(){
    
    chrome.storage.local.get('vocab', function({ vocab }){
        
        var newVocab = document.getElementById('vocabulary').value;

        const nextVocab = vocab.concat(newVocab);

        chrome.storage.local.set({vocab:nextVocab}); // Checksed
    });
    

}
