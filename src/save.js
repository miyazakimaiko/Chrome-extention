// Create tags

document.getElementById('add-tags').onsubmit = function(){
    
    var tags = document.getElementById('tag-input').value;
    
    chrome.storage.local.set({tagData:tags});
	return false; // Checked
}

document.getElementById('add-word-form').onsubmit = function(){
    
    var vocabulary = document.getElementById('vocabulary').value;
    
    chrome.storage.local.set({vocab:vocabulary});
	return false; // Checked
}
