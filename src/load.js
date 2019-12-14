// Load tag data from storage
chrome.storage.local.get({ tagData:[] }, (items) => {

    for(let i = 0; i < items.tagData.length; i++ ) {

        const tagContainer = document.getElementById('tag-container')

        const tagDiv = document.createElement('div')

        const tagInput = document.createElement('input')
              tagInput.setAttribute('id', `tag${i}-input`)
              tagInput.setAttribute('type', 'checkbox')
              tagInput.setAttribute('form', 'add-word-form')

        const tagLabel = document.createElement('label')
              tagLabel.textContent = items.tagData[i];
              tagLabel.setAttribute('for', `tag${i}-input`)
              tagLabel.setAttribute('id', `tag${i}-label`)

        tagContainer.appendChild(tagDiv)
        tagDiv.appendChild(tagInput)
        tagDiv.appendChild(tagLabel)
            
    }

});

// Load category data from storage
chrome.storage.local.get({ catData:[] }, (items) => {

    for(let i = 0; i < items.catData.length; i++ ) {
        
        // Display them on add-word-drawer contents
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

        // Display them on nav-drawer contents
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

        hmbBtn.addEventListener('click', () => {
            input.setAttribute('class', 'nav-input');
        });

        navBtn.addEventListener('click', () => {
            input.removeAttribute('class')
            input.checked = false
        });

    }

});

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