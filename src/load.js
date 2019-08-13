// They are still samples.

chrome.storage.local.get('tagData', function(baseItems) {

    //This function is working!
    //
    console.log(baseItems.tagData);

    const tagContainer = document.getElementById('tag-container')

    const tagDiv = document.createElement('div')

    const tagInput = document.createElement('input')
    tagInput.setAttribute('id', `${baseItems.tagData[1]}-input`)
    tagInput.setAttribute('type', 'checkbox')

    const tagLabel = document.createElement('label')
    tagLabel.textContent = baseItems.tagData[1];
    tagLabel.setAttribute('for', `${baseItems.tagData[1]}-input`)

    tagContainer.appendChild(tagDiv)
    tagDiv.appendChild(tagInput)
    tagDiv.appendChild(tagLabel)

});

chrome.storage.local.get('vocab', function(items) {
    
    // This is working ok

    console.log(items.vocab)
    //
    document.getElementById('main-word').textContent = items.vocab;
});