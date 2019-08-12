// They are still samples.

chrome.storage.local.get("tagData", function(baseItems) {

    //This function is not working
    //

    const tagContainer = document.getElementById('tag-container')

    const tagDiv = document.createElement('div')

    const tagLabel = document.createElement('label').textContent = baseItems.tagData;
    tagLabel.setAttribute('for', `${tagData}-input`)

    const tagInput = document.createElement('input')
    tagInput.setAttribute('id', `${tagData}-input`)
    tagInput.setAttribute('type', 'checkbox')

    tagContainer.appendChild(tagDiv)
    tagDiv.appendChild(tagLabel)
    tagDiv.appendChild(tagInput)


});

chrome.storage.local.get("vocab", function(items) {
    
    // This is working ok
    //
    document.getElementById('main-word').textContent = items.vocab;
});