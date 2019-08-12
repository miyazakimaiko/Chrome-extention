document.getElementById('add-word-form').onsubmit = function() {
    var contents = document.getElementById('add-word-form').contents.value;
    chrome.strage.local.set({hold_content:contents})
    console.log('Data is saved!')
};