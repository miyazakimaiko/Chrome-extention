
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

    if (!items.wordInfo) {
        items.wordInfo = {};
    } else if (items.wordInfo[vocab] == null) {
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
const displayWords = (storage) => {
    const parentUl = document.getElementById('words-ul')

    for( let i in storage ) {
        const parentLi = document.createElement('li')
                         parentLi.setAttribute('class', 'flexbox') 

        displayWordTagAndDefinition(storage, parentUl, parentLi, i)
        displayDeleteAndEditButton(parentLi, i)
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

