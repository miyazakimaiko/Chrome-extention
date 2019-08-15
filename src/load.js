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
        tagLabel.setAttribute('id', `tag${i}-label`)

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
        catSpan.setAttribute('id', `cat${i}-span`)

        catContainer.appendChild(catLabel)
        catLabel.appendChild(catInput)
        catLabel.appendChild(catSpan)

        // Build nav-drawer contents
        const navContainer = document.getElementById('nav-cat-container')

        const navDiv = document.createElement('div')

        const navForm = document.createElement('form')
        navForm.setAttribute('id', `cat-form${i}`)

        const navBtn = document.createElement('button')
        navBtn.setAttribute('type', 'submit')
        navBtn.textContent = items.catData[i];

        navContainer.appendChild(navDiv)
        navDiv.appendChild(navForm)
        navForm.appendChild(navBtn)

    }

});

chrome.storage.local.get({ wordInfo:[] }, function(items) {

    //console.log(items.wordInfo);

    let i;
    for( i = 0; i < items.wordInfo.length; i++ ) {

        // Build main-area with words
        // Main <ul> 
        const wordUl = document.getElementById('words-ul')
        // <li>
        const wordLi = document.createElement('li')
        wordLi.setAttribute('class', 'flexbox')
        // First <p> word
        const wordPara1 = document.createElement('p')
        wordPara1.setAttribute('class', 'main-word')
        wordPara1.setAttribute('id', `main-word-${i}`)
        wordPara1.textContent = items.wordInfo[i].word

        // <div> for tag's <span>
        const tagDiv = document.createElement('div')
        tagDiv.setAttribute('class', 'tagDiv')
        tagDiv.setAttribute('id', `tagDiv${i}`)

        wordUl.appendChild(wordLi)
        wordLi.appendChild(wordPara1)
        wordLi.appendChild(tagDiv)
        
        // Tag's <span>
        for (let j = 0; j < items.wordInfo[i].tag.length; j++ ) {

            const divTag = document.getElementById(`tagDiv${i}`)
            const tagSpan = document.createElement('span')
            tagSpan.textContent = items.wordInfo[i].tag[j];
            tagSpan.setAttribute('class', 'main-tag');
            divTag.appendChild(tagSpan)

        }
        // Second <p> meaning
        const wordPara2 = document.createElement('p')
        wordPara2.textContent = items.wordInfo[i].meanings
        wordPara2.setAttribute('class', 'main-meaning')

        wordLi.appendChild(wordPara2)
    }

});