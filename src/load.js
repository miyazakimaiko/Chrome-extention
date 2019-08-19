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
        catInput.setAttribute('id', `cat${i}-input`)
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
        navForm.setAttribute('class', 'cat-form')        

        const navBtn = document.createElement('button')
        navBtn.setAttribute('type', 'submit')
        navBtn.setAttribute('id', `submit${i}`)
        navBtn.setAttribute('class', 'category-btn')
        navBtn.textContent = items.catData[i];

        navContainer.appendChild(navDiv)
        navDiv.appendChild(navForm)
        navForm.appendChild(navBtn)

        // Close nav bar when clicking category btn
        const input = document.getElementById('nav-input')
        const hmbBtn = document.getElementById('nav-open')
        hmbBtn.addEventListener('click', function() {
            input.setAttribute('class', 'nav-input');
          });
        navBtn.addEventListener('click', function() {
            input.removeAttribute('class')
            input.checked = false
          });
    }

});

chrome.storage.local.get(null, function(items) {
    console.log(items.countId)
    console.log(items.wordInfo)

});

// Display all words (default)
chrome.storage.local.get({ wordInfo:[] }, function(items) {

    console.log(items.wordInfo)

    for( let i = 0; i < items.wordInfo.length; i++ ) {
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
            tagSpan.textContent = items.wordInfo[i].tag[j]
            tagSpan.setAttribute('class', 'main-tag');
            divTag.appendChild(tagSpan)

        }
        // Second <p> meaning
        const wordPara2 = document.createElement('p')
        wordPara2.textContent = items.wordInfo[i].meanings
        wordPara2.setAttribute('class', 'main-meaning')

        wordLi.appendChild(wordPara2)

        // Edit button
        const editForm = document.createElement('form')
        editForm.setAttribute('id',`edit-submit-form${i}`)
        
        const editSubmit = document.createElement('button')
        editSubmit.setAttribute('type', 'submit')
        editSubmit.setAttribute('class', 'edit-submit-btn')

        const fontAwesome = document.createElement('i')

        wordLi.appendChild(editForm)
        editForm.appendChild(editSubmit)
        editSubmit.appendChild(fontAwesome)

        wordLi.addEventListener('mouseenter', () => {
            fontAwesome.setAttribute('class', 'fas fa-edit')
        }, false);

        wordLi.addEventListener('mouseleave', () => {
            fontAwesome.removeAttribute('class')
        }, false);

        // Pull down word-edit form
        document.getElementById(`edit-submit-form${i}`).onsubmit = () => {
            
            const input = document.getElementById('add-word-input')
            input.checked = true;
            
            const editWordForm = document.getElementById('add-word-form')
            editWordForm.id = 'edit-word-form'
            // Display data related to the button that is submitted
            //// word
            document.getElementById('vocabulary').value = items.wordInfo[i].word
            //// meaning
            document.getElementById('meaning-textarea').value = items.wordInfo[i].meanings
            //// tag
            chrome.storage.local.get({ tagData:[] }, function(items) {

                for (let k = 0; k < items.tagData.length; k++ ) {

                    const a = document.getElementById(`tag${k}-label`).textContent
                    
                    chrome.storage.local.get({ wordInfo:[] }, function(items) {

                        for (let l = 0; l < items.wordInfo[i].tag.length; l++ ) {

                            const b = items.wordInfo[i].tag[l]
    
                            if ( a === b ) {
                                document.getElementById(`tag${k}-input`).checked = true
                            }
                        }

                    });
                    
                }
            });
            //// category
            chrome.storage.local.get({ catData:[] }, function(items) {

                for (let k = 0; k < items.catData.length; k++ ) {

                    const a = document.getElementById(`cat${k}-span`).textContent
                    
                    chrome.storage.local.get({ wordInfo:[] }, function(items) {

                        const b = items.wordInfo[i].category

                        if ( a === b ) {
                            document.getElementById(`cat${k}-input`).checked = true
                        }

                    });
                    
                }
            });

            document.getElementById('edit-word-form').onsubmit = () => {

                let editedWord = { word:'', tag:[], category:'', meanings:'' }; // need to add ID -----------------------------------------------

                editedWord.word = document.getElementById('vocabulary').value
                editedWord.meanings = document.getElementById('meaning-textarea').value
                // Push tag
                const tagEl = document.getElementById('tag-container');
                const tags = tagEl.getElementsByTagName('input');
                for (let l=0, len=tags.length; l<len; l++ ) {
            
                    if (tags[l].checked) {
        
                        const nTag = document.getElementById(`tag${l}-label`).textContent;
                        editedWord.tag.push(nTag);
        
                    }
        
                }
                // Push category
                const catEl = document.getElementById('category-container');

                const cat = catEl.getElementsByTagName('input');

                for (let m=0, len=cat.length; m<len; m++ ) {
                    
                    if (cat[m].checked) {

                        let checkedSpan = document.getElementById(`cat${m}-span`).textContent;
                        editedWord.category = checkedSpan;

                    }

                }
                items.wordInfo[i] = editedWord;  // This work if they have ID !!! ------------------------------

                chrome.storage.local.set(items);

                const putBackWordForm = document.getElementById('edit-word-form')
                putBackWordForm.id = 'add-word-form'

            }
            return false;

            
        };

    }

});

// Display words depends on category
chrome.storage.local.get({ catData:[] }, function(items) {
    
    for( let h = 0; h < items.catData.length; h++ ) {

        // Word list sorted by Category
        document.getElementById(`cat-form${h}`).onsubmit = function(){

            const removeItems = document.getElementById('words-ul')
            while (removeItems.firstChild) {
                removeItems.removeChild(removeItems.firstChild)
            }

            chrome.storage.local.get({ wordInfo:[] }, function(items) {

                const keyword = document.getElementById(`submit${h}`).textContent

                const allItems = items.wordInfo

                function filterByCategory(item) {

                    if ( item.category === keyword ) {
                        return true
                    }
                    
                }

                let result = allItems.filter(filterByCategory)

                for( let i = 0; i < result.length; i++ ) {
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
                    wordPara1.textContent = result[i].word
                    // <div> for tag's <span>
                    const tagDiv = document.createElement('div')
                    tagDiv.setAttribute('class', 'tagDiv')
                    tagDiv.setAttribute('id', `tagDiv${i}`)
            
                    wordUl.appendChild(wordLi)
                    wordLi.appendChild(wordPara1)
                    wordLi.appendChild(tagDiv)
                    
                    // Tag's <span>
                    for (let j = 0; j < result[i].tag.length; j++ ) {
            
                        const divTag = document.getElementById(`tagDiv${i}`)
                        const tagSpan = document.createElement('span')
                        tagSpan.textContent = result[i].tag[j]
                        tagSpan.setAttribute('class', 'main-tag');

                        divTag.appendChild(tagSpan)
            
                    }
                    // Second <p> meaning
                    const wordPara2 = document.createElement('p')
                    wordPara2.textContent = result[i].meanings
                    wordPara2.setAttribute('class', 'main-meaning')
            
                    wordLi.appendChild(wordPara2)

                    // Edit button
                    const editForm = document.createElement('form')
                    editForm.setAttribute('id',`edit-submit-form${i}`)
                    
                    const editSubmit = document.createElement('button')
                    editSubmit.setAttribute('type', 'submit')
                    editSubmit.setAttribute('class', 'edit-submit-btn')

                    const fontAwesome = document.createElement('i')

                    wordLi.appendChild(editForm)
                    editForm.appendChild(editSubmit)
                    editSubmit.appendChild(fontAwesome)

                    wordLi.addEventListener('mouseenter', () => {
                        fontAwesome.setAttribute('class', 'fas fa-edit')
                    }, false);

                    wordLi.addEventListener('mouseleave', () => {
                        fontAwesome.removeAttribute('class')
                    }, false);

                    // Pull down word-edit form
                    document.getElementById(`edit-submit-form${i}`).onsubmit = () => {
            
                        const input = document.getElementById('add-word-input')
                        input.checked = true;
                        
                        const editWordForm = document.getElementById('add-word-form')
                        editWordForm.id = 'edit-word-form'
                        // Display data related to the button that is submitted
                        //// word
                        document.getElementById('vocabulary').value = result[i].word
                        //// meaning
                        document.getElementById('meaning-textarea').value = result[i].meanings
                        //// tag
                        chrome.storage.local.get({ tagData:[] }, function(items) {
            
                            for (let k = 0; k < items.tagData.length; k++ ) {
            
                                const a = document.getElementById(`tag${k}-label`).textContent
                                
                                for (let l = 0; l < result[i].tag.length; l++ ) {
        
                                    const b = result[i].tag[l]
            
                                    if ( a === b ) {
                                        document.getElementById(`tag${k}-input`).checked = true
                                    }
                                }
                                
                            }
                        });
                        //// category
                        chrome.storage.local.get({ catData:[] }, function(items) {
            
                            for (let k = 0; k < items.catData.length; k++ ) {
            
                                const a = document.getElementById(`cat${k}-span`).textContent
            
                                const b = result[i].category
        
                                if ( a === b ) {
                                    document.getElementById(`cat${k}-input`).checked = true
                                }
                                
                            }

                        });
            
                        document.getElementById('edit-word-form').onsubmit = () => {
            
                            let editedWord = { word:'', tag:[], category:'', meanings:'' };
            
                            editedWord.word = document.getElementById('vocabulary').value
                            editedWord.meanings = document.getElementById('meaning-textarea').value
                            // Push tag
                            const tagEl = document.getElementById('tag-container');
                            const tags = tagEl.getElementsByTagName('input');
                            for (let l=0, len=tags.length; l<len; l++ ) {
                        
                                if (tags[l].checked) {
                    
                                    const nTag = document.getElementById(`tag${l}-label`).textContent;
                                    editedWord.tag.push(nTag);
                    
                                }
                    
                            }
                            // Push category
                            const catEl = document.getElementById('category-container');
            
                            const cat = catEl.getElementsByTagName('input');
            
                            for (let m=0, len=cat.length; m<len; m++ ) {
                                
                                if (cat[m].checked) {
            
                                    let checkedSpan = document.getElementById(`cat${m}-span`).textContent;
                                    editedWord.category = checkedSpan;
            
                                }
            
                            }
                            result[i] = editedWord; 
            
                            chrome.storage.local.set(items);

                            const putBackWordForm = document.getElementById('edit-word-form')
                            putBackWordForm.id = 'add-word-form'
            
                        }
                        return false;
            
                        
                    };
            
                }
                
            });
            return false
        };
    
    }

});
