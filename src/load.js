// Tag data

chrome.storage.local.get({ tagData:[] }, function(items) {

    let i;
    for( i = 0; i < items.tagData.length; i++ ) {

    const tagContainer = document.getElementById('tag-container')

    const tagDiv = document.createElement('div')

    const tagInput = document.createElement('input')
    tagInput.setAttribute('id', `tag${i}-input`)
    tagInput.setAttribute('type', 'checkbox')

    const tagLabel = document.createElement('label')
    tagLabel.textContent = items.tagData[i];
    tagLabel.setAttribute('for', `tag${i}-input`)

    tagContainer.appendChild(tagDiv)
    tagDiv.appendChild(tagInput)
    tagDiv.appendChild(tagLabel)
            
    }

});

// Category data
chrome.storage.local.get({ catData:[] }, function(items) {

    let i;
    for( i = 0; i < items.catData.length; i++ ) {
    // Build add-word-drawer
    const catContainer = document.getElementById('category-container')

    const catLabel = document.createElement('label')

    const catInput = document.createElement('input')
    catInput.setAttribute('type', 'radio')
    catInput.setAttribute('name', 'category')

    const catSpan = document.createElement('span')
    catSpan.textContent = items.catData[i];

    catContainer.appendChild(catLabel)
    catLabel.appendChild(catInput)
    catLabel.appendChild(catSpan)

    // Build nav-drawer contents
    const navContainer = document.getElementById('nav-cat-container')

    const navDiv = document.createElement('div')

    const navLink = document.createElement('a')
    navLink.setAttribute('href', '#')
    navLink.textContent = items.catData[i];

    navContainer.appendChild(navDiv)
    navDiv.appendChild(navLink)

    }

});


chrome.storage.local.get({ words:[] }, function(items) {
    //
    console.log(items.words);
    document.getElementById('main-word').textContent = items.words;

});