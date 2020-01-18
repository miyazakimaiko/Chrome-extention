
class WordList {
    constructor() {
        this.wordInfo = {};
    }
}

class word {
    constructor(word) {
        this.keys = word
        this.id = 0
        this.meaning = null
        this.tags = []
        this.category = null
    }
}

//----------------------------------------------------------------------//

chrome.storage.local.get(null, (items) => {
    const words      = items.wordInfo
    const tags       = items.tagData
    const categories = items.catData

    if (words === undefined || Object.keys(words).length === 0) {
        displayIntroduction();
        const CreateWordList = new WordList
        chrome.storage.local.set(CreateWordList)
    } else {
        displayWords(words);
    }

    if (tags !== undefined) {
        for(let i = 0; i < tags.length; i++ ) {
            displayTagsInAddWordPage(tags, i);
        }
    }

    if (categories !== undefined) {
        for(let i = 0; i < categories.length; i++ ) {
            displayCategoriesInAddWordPage(categories, i)
            displayCategoriesInNaviPage(categories, i)

            document.getElementById(`cat-edit-btn${i}`).addEventListener("click", () => {
                openEditCategoryModal(categories, i)

                document.getElementById('edit-category').onsubmit = () => {
                    saveEditedCategoryName(categories, words, items, i)
                    return false;
                }
            });

            document.getElementById(`cat-form${i}`).onsubmit = () => {
                displaySelectedWordsByCategory(words, i);
                return false;
            };
        }
    }
});

//----------------------------------------------------------------------//
const displayIntroduction = () => {
    const introTop    = document.querySelector('.introduction-top')
    const introSample = document.querySelector('.sample-w')
    const introBtm    = document.querySelector('.introduction-bottom')
                        introTop.classList.add('display-block')
                        introSample.classList.add('display-flex')
                        introBtm.classList.add('display-block')
}
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
const openEditCategoryModal = (categories, i) => {
    const catModal = document.getElementById("cat-modal")
                     openModal(catModal)
    document.getElementById('category-modal-title').textContent = 'Edit Category Name'
    document.getElementById('category-input').value             = categories[i]
    document.getElementById('add-category').id = 'edit-category'
}
//----------------------------------------------------------------------//
const saveEditedCategoryName = (categories, words, storage, i) => {
    const newCategoryName = document.getElementById('category-input').value
    const categoryAlert   = document.getElementById("alert-success-c")

    if (categories.indexOf(newCategoryName) === -1) {
        for (let j in words) {
            if (words[j].category === categories[i]) {
                words[j].category = newCategoryName
            }
        }
        categories[i] = newCategoryName
        chrome.storage.local.set(storage)
        document.getElementById('edit-category').id = 'add-category'
        categoryAlert.classList.add('alert-success')
        categoryAlert.textContent = 'Successfully edited.';
    } else {
        categoryAlert.classList.add('alert-danger')
        categoryAlert.textContent = 'This category name already exists.';
    }
    showAlert(categoryAlert);
}
//----------------------------------------------------------------------//
const displaySelectedWordsByCategory = (words, i) => {
    const wordsList = document.getElementById('words-ul')
    const keyword   = document.getElementById(`submit${i}`).textContent
    let   result    = {};

    while (wordsList.firstChild) {
        wordsList.removeChild(wordsList.firstChild)
    }

    for (let j in words) {
        if ( words[j].category === keyword ) {
            result[j] = words[j];
        }
    }
    displayWords(result)                
}
//----------------------------------------------------------------------//
const showAlert = (alert) => {
    alert.style.display = "flex";
    setTimeout(function() { 
        clearAlert(alert) 
    }, 3000);
}
//----------------------------------------------------------------------//
const clearAlert = (alert) => {
    alert.style.display = "none";
    alert.classList.remove('alert-danger')
}


chrome.storage.local.get(null, (items) => {
    console.log(items.countId)
    let words = items.wordInfo;
    console.log(words)
    console.log(items.catData)
    console.log(items.tagData)

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

