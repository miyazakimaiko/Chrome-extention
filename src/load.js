chrome.storage.local.get(null, (items) => {

    if (items.wordInfo === undefined || Object.keys(items.wordInfo).length === 0) {
        displayIntroduction();
        items.wordInfo = new Map();
        items.wordInfo.set('key', 'val')
        console.log(items.wordInfo)

    } else {
        displayWords(items, items.wordInfo);
    }

    if (items.tagData === undefined) {
        items.tagData = []
    } else {
        for(let i = 0; i < items.tagData.length; i++ ) {
            displayTagsInAddWordPage(items.tagData, i);
        }
    }

    if (items.catData === undefined) {
        items.catData = []
    } else {
        for(let i = 0; i < items.catData.length; i++ ) {
            displayCategoriesInAddWordPage(items.catData, i)
            displayCategoriesInNaviPage(items.catData, i)

            document.getElementById(`cat-edit-btn${i}`).addEventListener("click", () => {
                openEditCategoryModal(items.catData, i)

                document.getElementById('edit-category').onsubmit = () => {
                    saveEditedCategoryName(items.catData, items.wordInfo, items, i)
                    return false;
                }
            });

            document.getElementById(`cat-form${i}`).onsubmit = () => {
                displaySelectedWordsByCategory(items, items.wordInfo, i);
                return false;
            };
        }
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
        else if (items.tagData.indexOf(newTag) === -1) {
            items.tagData.push(newTag)
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
        else if (items.catData.indexOf(newCat) === -1 ) {
            items.catData.push(newCat);
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


