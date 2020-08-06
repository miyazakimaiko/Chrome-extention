
class Word {
    constructor() {
        this.id = 0
        this.meanings = null
        this.tag = []
        this.category = null
    }
}

const saveWord = (items) => {
    const vocab = document.getElementById('vocabulary').value;
    const wordAlert = document.getElementById("alert-success-w")
    const newWord = new Word;

    if (items.wordInfo[vocab] == null) {
        incrementWordId(items)
        fetchAndSaveId(items, newWord)
        fetchAndSaveMeaning(newWord)
        fetchAndSaveTags(newWord)
        fetchAndSaveCategory(newWord)
        items.wordInfo[vocab] = newWord;
        chrome.storage.local.set(items);
        wordAlert.classList.add('alert-success')
        wordAlert.innerHTML = 'Successfully added.';
        showAlert(wordAlert);
    } else {
        wordAlert.classList.add('alert-danger')
        wordAlert.innerHTML = `Word [${vocab}] already exists.`;
        showAlert(wordAlert);
    }
}
//----------------------------------------------------------------------//
const incrementWordId = (items) => {
    if (items.countId === undefined || items.countId === 0) {
        let id = 1
        items.countId = id;
        chrome.storage.local.set(items);
    } else {
        items.countId++
        chrome.storage.local.set(items);
    }
}
//----------------------------------------------------------------------//
const fetchAndSaveId = (items, newWord) => {
    const cId = items.countId;
    newWord.id = cId;
}
//----------------------------------------------------------------------//
const fetchAndSaveMeaning = (newWord) => {
    let meaning = document.getElementById('meaning-textarea').value;
    newWord.meanings = meaning;
}
//----------------------------------------------------------------------//
const fetchAndSaveTags = (newWord) => {
    let tagEl = document.getElementById('tag-container');
    let tags  = tagEl.getElementsByTagName('input');

    for (let i = 0; i < tags.length; i++ ) {
        if (tags[i].checked) {
            let checkedLabel = document.getElementById(`tag${i}-label`).textContent;
            newWord.tag.push(checkedLabel)
        }
    }
}
//----------------------------------------------------------------------//
const fetchAndSaveCategory = (newWord) => {
    let catEl = document.getElementById('category-container');
    let cat   = catEl.getElementsByTagName('input');

    for (let i = 0; i < cat.length; i++ ) {
        if (cat[i].checked) {
            let checkedSpan = document.getElementById(`cat${i}-span`).textContent;
            newWord.category = checkedSpan;
        }
    }
}
//======================================================================//
const displayWords = (items, storage) => {
    const parentUl = document.getElementById('words-ul')

    for( let i in storage ) {
        const parentLi = document.createElement('li')
                         parentLi.setAttribute('class', 'flexbox') 

        displayWordTagAndDefinition(storage, parentUl, parentLi, i)
        displayDeleteAndEditButton(parentLi, i)

        document.getElementById(`delete-btn${i}`).addEventListener("click", () => {
            displayWarningForDeletion(i)
            deleteWord(items, items.wordInfo, i)
        });

        document.getElementById(`edit-submit-btn${i}`).addEventListener("click", () => {
            const wordModal = document.getElementById("word-modal")
            openModal(wordModal)      
            fillEditWordFormWithCurrentData(items, i)

            const FormForEditingWordData = document.getElementById('edit-word-form')
            document.getElementById('cancel-form').onsubmit = () => {
                if (FormForEditingWordData) {
                    FormForEditingWordData.id = 'add-word-form'
                }
                wordModal.classList.remove("display-modal")
            }

            FormForEditingWordData.onsubmit = () => {
                delete items.wordInfo[i]
                saveWord(items)
                const wordAlert = document.getElementById("alert-success-w")
                                  wordAlert.classList.add('alert-success')
                                  wordAlert.textContent = 'Successfully edited.'
                showAlert(wordAlert)
                return false
            }
  
        });
    }
}
//----------------------------------------------------------------------//
const displayWordTagAndDefinition = (storage, parentUl, parentLi, i) => {
    const wordPara1 = document.createElement('div')
                      wordPara1.setAttribute('class', 'main-word')
                      wordPara1.setAttribute('id', `main-word-${i}`)
                      wordPara1.textContent = i
    const tagDiv    = document.createElement('div')
                      tagDiv.setAttribute('class', 'tagDiv')
                      tagDiv.setAttribute('id', `tagDiv${i}`)

    parentUl.appendChild(parentLi)
    parentLi.appendChild(wordPara1)
    parentLi.appendChild(tagDiv)

    displayEachTag(storage, i)
    displayDefinition(storage, i, parentLi)
}
//----------------------------------------------------------------------//
const displayEachTag = (storage, i) => {
    for (let j = 0; j < storage[i].tag.length; j++ ) {
        const divTag = document.getElementById(`tagDiv${i}`)
        const tagSpan = document.createElement('span')
                        tagSpan.textContent = storage[i].tag[j]
                        tagSpan.setAttribute('class', 'badge badge-pill badge-success')
                        divTag.appendChild(tagSpan)
    }
}
//----------------------------------------------------------------------//
const displayDefinition = (storage, i, parentList) => {
    const wordPara2 = document.createElement('div')
    wordPara2.textContent = storage[i].meanings
    wordPara2.setAttribute('class', 'main-meaning')
    wordPara2.setAttribute('id', `main-meaning${i}`)
    parentList.appendChild(wordPara2)
}
//----------------------------------------------------------------------//
const displayDeleteAndEditButton = (parentLi, i) => {
    const deleteBtn  = document.createElement('button')
                       deleteBtn.setAttribute('type', 'submit')
                       deleteBtn.setAttribute('id', `delete-btn${i}`)
                       deleteBtn.setAttribute('class', 'delete-btn')
    const editSubmit = document.createElement('button')
                       editSubmit.setAttribute('type', 'submit')
                       editSubmit.setAttribute('id', `edit-submit-btn${i}`)
                       editSubmit.setAttribute('class', 'edit-submit-btn')

    parentLi.appendChild(deleteBtn)
    parentLi.appendChild(editSubmit)

    parentLi.addEventListener("mouseenter", () => {
        deleteBtn.classList.add('display')
        editSubmit.classList.add('display')
    }, false);
    parentLi.addEventListener("mouseleave", () => {
        deleteBtn.classList.remove('display')
        editSubmit.classList.remove('display')
    }, false);
}
//======================================================================//
const displayIntroduction = () => {
    const introTop    = document.querySelector('.introduction-top')
    const introSample = document.querySelector('.sample-w')
    const introBtm    = document.querySelector('.introduction-bottom')
                        introTop.classList.add('display-block')
                        introSample.classList.add('display-flex')
                        introBtm.classList.add('display-block')

    const mainWordSample      = document.getElementById("main-word-Sample1795237")
    const mainWordDescription = document.getElementById("main-word-description")
    showElementOnMouseEnter(mainWordSample, mainWordDescription)
    
    const tagSample      = document.getElementById("tagDivSample1795237")
    const tagDescription = document.getElementById("tag-description")
    showElementOnMouseEnter(tagSample, tagDescription)
    
    const meaningSample      = document.getElementById("main-meaningSample1795237")
    const meaningDescription = document.getElementById("meaning-description")
    showElementOnMouseEnter(meaningSample, meaningDescription)
                        
}
//----------------------------------------------------------------------//
const showElementOnMouseEnter = (area, element) => {
    area.addEventListener("mouseenter", () => {
        element.classList.add('display-block')
    }, false);
    area.addEventListener("mouseleave", () => {
        element.classList.remove('display-block')
    }, false);
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
//----------------------------------------------------------------------//　//----------------------------------------------------------------------//
const displaySelectedWordsByCategory = (items, words, i) => {
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
    displayWords(items, result)                
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
//----------------------------------------------------------------------//
const displayWarningForDeletion = (i) => {
    const deleteForm = document.getElementById("delete-modal")
    if (deleteForm.classList.contains("display-modal")) {
        deleteForm.classList.remove("display-modal");
    } else if (!deleteForm.classList.contains("display-modal")) {
        deleteForm.classList.add("display-modal");
        document.querySelector(".delete-message").innerHTML = `Are you sure to delete a word [${i}] ?`;
    };
}
//----------------------------------------------------------------------//
const deleteWord = (items, words, i) => {
    document.getElementById('delete-word-form').onsubmit = () => {
        delete words[i];
        chrome.storage.local.set(items);
    }
}
//----------------------------------------------------------------------//
const fillEditWordFormWithCurrentData = (items, i) => {
    const words      = items.wordInfo
    const tags       = items.tagData
    const categories = items.catData

    document.getElementById('add-word-form').id = 'edit-word-form'
    document.getElementById('word-modal-title').innerHTML = 'Edit the word'
    document.getElementById('id-sender').value = words[i].id
    document.getElementById('vocabulary').value = i
    document.getElementById('meaning-textarea').value = words[i].meanings

    for (let k = 0; k < tags.length; k++ ) {
        const a = tags[k]
        for (let l = 0; l < words[i].tag.length; l++ ) {
            const b = words[i].tag[l]
            if ( a === b ) {
                document.getElementById(`tag${k}-input`).checked = true
            }
        }
    }

    for (let k = 0; k < categories.length; k++ ) {
        const a = categories[k]
        const b = words[i].category
        if ( a === b ) {
            document.getElementById(`cat${k}-input`).checked = true
        }
    }
}
//----------------------------------------------------------------------//
const OpenForm = (btn, form) => {
    btn.addEventListener("click", () => {
        if (form.classList.contains("display-modal")) {
            location.reload();
        } else if (!form.classList.contains("display-modal")) {
        form.classList.add("display-modal");
        }
    });
}