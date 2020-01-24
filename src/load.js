chrome.storage.local.get(null, (items) => {
    const words      = items.wordInfo
    const tags       = items.tagData
    const categories = items.catData

    console.log(words)
    console.log(tags)
    console.log(categories)

    if (words === undefined || Object.keys(words).length === 0) {
        displayIntroduction();
        items.wordInfo = new Map();
    } else {
        displayWords(words);
    }

    if (tags === undefined) {
        items.tagData = []
    } else {
        for(let i = 0; i < tags.length; i++ ) {
            displayTagsInAddWordPage(tags, i);
        }
    }

    if (categories === undefined) {
        items.catData = []
    } else {
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

    for (let i in words) {
        document.getElementById(`delete-btn${i}`).addEventListener("click", () => {
            displayWarningForDeletion(i)
            deleteWord(items, words, i)
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
                delete words[i]
                saveWord(items)
                const wordAlert = document.getElementById("alert-success-w")
                                  wordAlert.classList.add('alert-success')
                                  wordAlert.innerHTML = 'Successfully edited.'
                showAlert(wordAlert)
                return false
            }
  
        });
    }

    document.getElementById('add-word-form').onsubmit = () => {    
        saveWord(items);
        return false;
    }

    document.getElementById('add-tags').onsubmit = () => {
        let newTag  = document.getElementById('tag-input').value;
        const alert = document.getElementById("alert-success-t")
        if ( !newTag.length ) {
            alert.classList.add('alert-danger')
            alert.textContent = "Please fill the form.";
        }
        else if (tags.indexOf(newTag) === -1 ) {
            tags.push(newTag)
            chrome.storage.local.set(items)
            alert.classList.add('alert-success')
            alert.textContent = `Successfully added a tag [${newTag}].`
        } else {
            alert.classList.add('alert-danger')
            alert.textContent = `Tag[${newTag}] already exists.`
        }
        showAlert(alert)
        return false;
    }

    document.getElementById('add-category').onsubmit = () => {
        let newCat  = document.getElementById('category-input').value;
        const alert = document.getElementById("alert-success-c")
        if ( !newCat.length ) {
            alert.classList.add('alert-danger')
            alert.textContent = "Please fill the form.";
        }
        else if (categories.indexOf(newCat) === -1 ) {
            categories.push(newCat);
            chrome.storage.local.set(items);
            alert.classList.add('alert-success')
            alert.textContent = `Successfully added a category [${newCat}].`;
        } else {
            alert.classList.add('alert-danger')
            alert.textContent = `Category[${newCat}] already exists.`;
        }
        showAlert(alert);
        return false;
    }

});

const addWordOpenBtn = document.getElementById("add-word-form-open-btn");
const wordForm       = document.getElementById("word-modal")
OpenForm(addWordOpenBtn, wordForm);

const addWordCloseBtn = document.querySelector(".word-close-btn")
OpenForm(addWordCloseBtn, wordForm)

const tagOpenBtn = document.getElementById("tag-form-open-btn");
const tagForm    = document.getElementById("tag-modal");
OpenForm(tagOpenBtn, tagForm);

const tagCloseBtn = document.querySelector(".tag-close-btn")
OpenForm(tagCloseBtn, tagForm);

const catOpenBtn = document.getElementById("cat-form-open-btn");
const catForm    = document.getElementById("cat-modal");
OpenForm(catOpenBtn, catForm);

const catCloseBtn = document.querySelector(".cat-close-btn")
OpenForm(catCloseBtn, catForm);

const deleteCloseBtn = document.querySelector(".delete-close-btn")
const deleteForm     = document.getElementById("delete-modal")
OpenForm(deleteCloseBtn, deleteForm)

const deleteCancelBtn = document.getElementById("delete-cancel-btn")
OpenForm(deleteCancelBtn, deleteForm)


