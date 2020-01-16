// Load tag data from storage
chrome.storage.local.get({ tagData:[] }, (items) => {
    for(let i = 0; i < items.tagData.length; i++ ) {
        displayTagsInAddWordPage(items.tagData, i);
    }
});

//----------------------------------------------------------------------//

const displayTagsInAddWordPage = (item, index) => {
    const tagContainer = document.getElementById('tag-container')
    const tagDiv       = document.createElement('div')
    const tagInput     = document.createElement('input')
                        tagInput.setAttribute('id', `tag${index}-input`)
                        tagInput.setAttribute('type', 'checkbox')
                        tagInput.setAttribute('form', 'add-word-form')
    const tagLabel     = document.createElement('label')
                        tagLabel.textContent = item[index];
                        tagLabel.setAttribute('for', `tag${index}-input`)
                        tagLabel.setAttribute('id', `tag${index}-label`)

    tagContainer.appendChild(tagDiv)
    tagDiv.appendChild(tagInput)
    tagDiv.appendChild(tagLabel)
}

//----------------------------------------------------------------------//

// Load category data from storage
chrome.storage.local.get({ catData:[] }, (items) => {

    for(let i = 0; i < items.catData.length; i++ ) {
        displayCategoriesInAddWordPage(items.catData, i)
        displayCategoriesInNaviPage(items.catData, i)

        document.getElementById(`cat-edit-btn${i}`).addEventListener("click", () => {
            
            const catModal = document.getElementById("cat-modal")
            openModal(catModal)
            changeId('add-category', 'edit-category')
            document.getElementById('category-modal-title').textContent = 'Edit Category Name'
            document.getElementById('category-input').value = items.catData[i]


            // Set data into storage.local
            document.getElementById('edit-category').onsubmit = () => {

                const newCategoryName = document.getElementById('category-input').value
                const categoryAlert = document.getElementById("alert-success-c")

                chrome.storage.local.get(null, (items) => {
                    // ----------------------------------------------------------------------need to add validation -------------------------
                    if (items.catData.indexOf(newCategoryName) === -1) {
                        for (let j in items.wordInfo) {
                            if (items.wordInfo[j].category === items.catData[i]) {
                                items.wordInfo[j].category = newCategoryName
                            }
                        }
                        items.catData[i] = newCategoryName;
                        chrome.storage.local.set(items);

                        categoryAlert.classList.add('alert-success')
                        categoryAlert.textContent = 'Successfully edited.';
                        const putBackWordForm = document.getElementById('edit-category')
                        putBackWordForm.id = 'add-category'
                    } else {
                        categoryAlert.classList.add('alert-danger')
                        categoryAlert.textContent = 'This category name already exists.';
                    }
                });
    
                showAlert(categoryAlert);
                return false;
            }
  
        });

    }

});

//----------------------------------------------------------------------//

const displayCategoriesInAddWordPage = (item, index) => {

    const catContainer = document.getElementById('category-container')
    const catLabel     = document.createElement('label')
    const catInput     = document.createElement('input')
                         catInput.setAttribute('type', 'radio')
                         catInput.setAttribute('id', `cat${index}-input`)
                         catInput.setAttribute('name', 'category')
    const catSpan      = document.createElement('span')
                         catSpan.textContent = item[index];
                         catSpan.setAttribute('id', `cat${index}-span`)

    catContainer.appendChild(catLabel)
    catLabel.appendChild(catInput)
    catLabel.appendChild(catSpan)
}

//----------------------------------------------------------------------//

const displayCategoriesInNaviPage = (item, index) => {

    const navContainer = document.getElementById('nav-cat-container')
    const navDiv       = document.createElement('div')
                         navDiv.setAttribute('class', 'category-nav-wrapper')
    const navForm      = document.createElement('form')
                         navForm.setAttribute('id', `cat-form${index}`)
                         navForm.setAttribute('class', 'cat-form')        
    const navBtn       = document.createElement('button')
                         navBtn.setAttribute('type', 'submit')
                         navBtn.setAttribute('id', `submit${index}`)
                         navBtn.setAttribute('class', 'category-btn')
                         navBtn.textContent = item[index];
    const catEditBtn   = document.createElement('button')
                         catEditBtn.setAttribute('id', `cat-edit-btn${index}`)
                         catEditBtn.setAttribute('class', 'cat-edit-btn')
                         catEditBtn.textContent = 'Edit'

    navContainer.appendChild(navDiv)
    navDiv.appendChild(navForm)
    navForm.appendChild(navBtn)
    navDiv.appendChild(catEditBtn)

    toggleDisplayOnMouseEnterAndLeave(navDiv, catEditBtn)
    removeCheckWhenClikingCategory(navBtn)
}

//----------------------------------------------------------------------//

const toggleDisplayOnMouseEnterAndLeave = (location, itemToToggle) => {
    location.addEventListener("mouseenter", () => {
        itemToToggle.classList.add('display')
    }, false);

    location.addEventListener("mouseleave", () => {
        itemToToggle.classList.remove('display')
    }, false);
}

//----------------------------------------------------------------------//

const removeCheckWhenClikingCategory = (categoryBtn) => {
    const input        = document.getElementById('nav-input')
    const humbergerBtn = document.getElementById('nav-open')

    humbergerBtn.addEventListener('click', () => {
        input.setAttribute('class', 'nav-input');
    });
    categoryBtn.addEventListener('click', () => {
        input.removeAttribute('class')
        input.checked = false
    });
}

//----------------------------------------------------------------------//

const openModal = (modal) => {
    if (modal.classList.contains("display-modal")) {
        modal.classList.remove("display-modal");
    } else if (!modal.classList.contains("display-modal")) {
        modal.classList.add("display-modal");
    };
}

//----------------------------------------------------------------------//


const changeId = (targetId, newId) => {
    document.getElementById(targetId).id = newId
}

//----------------------------------------------------------------------//


chrome.storage.local.get(null, (items) => {
    console.log(items.countId)
    let words = items.wordInfo;
    console.log(words)
    console.log(items.catData)
    console.log(items.tagData)

});


// Display all words (default)
chrome.storage.local.get({ wordInfo:[] }, (items) => {
    displayWords(items, items.wordInfo, items.wordInfo);
});

// Display words depends on category
chrome.storage.local.get({ catData:[] }, (items) => {
    
    for( let h = 0; h < items.catData.length; h++ ) {

        // Word list sorted by Category
        document.getElementById(`cat-form${h}`).onsubmit = () => {

            const removeItems = document.getElementById('words-ul')
            while (removeItems.firstChild) {
                removeItems.removeChild(removeItems.firstChild)
            }

            chrome.storage.local.get({ wordInfo:[] }, (items) => {

                const keyword = document.getElementById(`submit${h}`).textContent
                const allItems = items.wordInfo;
                let result = {};

                for (let i in allItems) {
                    if ( allItems[i].category === keyword ) {
                        result[i] = allItems[i];
                    }
                }
                displayWords(items, items.wordInfo, result);

            });
                
            return false
        };
    
    }

});

const OpenForm = (btn, form) => {
    btn.addEventListener("click", () => {
        if (form.classList.contains("display-modal")) {
            location.reload();
        } else if (!form.classList.contains("display-modal")) {
        form.classList.add("display-modal");
        }
    });
}

const addWordOpenBtn = document.getElementById("add-word-form-open-btn");
const wordForm = document.getElementById("word-modal")
OpenForm(addWordOpenBtn, wordForm);

const addWordCloseBtn = document.querySelector(".word-close-btn")
OpenForm(addWordCloseBtn, wordForm)

const tagOpenBtn = document.getElementById("tag-form-open-btn");
const tagForm = document.getElementById("tag-modal");
OpenForm(tagOpenBtn, tagForm);

const tagCloseBtn = document.querySelector(".tag-close-btn")
OpenForm(tagCloseBtn, tagForm);

const catOpenBtn = document.getElementById("cat-form-open-btn");
const catForm = document.getElementById("cat-modal");
OpenForm(catOpenBtn, catForm);

const catCloseBtn = document.querySelector(".cat-close-btn")
OpenForm(catCloseBtn, catForm);

const deleteCloseBtn = document.querySelector(".delete-close-btn")
const deleteForm = document.getElementById("delete-modal")
OpenForm(deleteCloseBtn, deleteForm)

const deleteCancelBtn = document.getElementById("delete-cancel-btn")
OpenForm(deleteCancelBtn, deleteForm)


const mainWordSample = document.getElementById("main-word-Sample1795237")
const mainWordDescription = document.getElementById("main-word-description")
mainWordSample.addEventListener("mouseenter", () => {
    mainWordDescription.classList.add('display-block')
}, false);
mainWordSample.addEventListener("mouseleave", () => {
    mainWordDescription.classList.remove('display-block')
}, false);

const tagSample = document.getElementById("tagDivSample1795237")
const tagDescription = document.getElementById("tag-description")
tagSample.addEventListener("mouseenter", () => {
    tagDescription.classList.add('display-block')
}, false);
tagSample.addEventListener("mouseleave", () => {
    tagDescription.classList.remove('display-block')
}, false);

const meaningSample = document.getElementById("main-meaningSample1795237")
const meaningDescription = document.getElementById("meaning-description")
meaningSample.addEventListener("mouseenter", () => {
    meaningDescription.classList.add('display-block')
}, false);
meaningSample.addEventListener("mouseleave", () => {
    meaningDescription.classList.remove('display-block')
}, false);