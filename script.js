const editButton = document.querySelector(".edit");
const newButton = document.querySelector(".new-doc");
const infoButton = document.querySelector(".info");
const newCloseButton = document.querySelector(".new-close-btn");
const editCloseButton = document.querySelector(".edit-close-btn");
const infoCloseButton = document.querySelector(".info-close-btn");
const infoDeleteButton = document.querySelector(".info-popup-deltete");

const editPopUp = document.querySelector(".edit-popup");
const newPopUp = document.querySelector(".new-popup");
const infoPopUp = document.querySelector(".info-popup");
const overlay = document.querySelector(".overlay");


const newSubmitButton = document.querySelector(".new-popup-submit");
const newInputBox = document.querySelector("#new-popup-input");

const editSubmitButton = document.querySelector('.edit-popup-submit');
const editInputBox = document.querySelector("#edit-popup-input");

const recentDocumentsList = document.querySelector(".recently-document");
const favoriteDocumentsList = document.querySelector(".favorite-document");


const documentTitle = document.querySelector(".title");
const infoLabel = document.querySelector("#info-popup-label");
const lastOpenedDate = document.querySelector("#last-opened");



//

showRecent();


myStorage = window.localStorage;
var recentDocuments;
var currentDocument;
var favoriteDocuments;
var currentRecentButton;
var currentFavoriteButton;

function include(file) {

    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
    document.getElementsByTagName('head').item(0).appendChild(script);

}
newButton.onclick = function() {
    newPopUp.classList.add('show');
    overlay.classList.add('show');

}

infoDeleteButton.onclick = function() {
    if (currentDocument != null) {
        let getLocalStorageData = localStorage.getItem("Recent");
        if (getLocalStorageData == null) {
            recentDocuments = [];
        } else {
            recentDocuments = JSON.parse(getLocalStorageData);
        }
        let index = recentDocuments.indexOf(currentDocument);
        if (index !== -1) {
            recentDocuments.splice(index, 1);
        }
        localStorage.removeItem(currentDocument);
        localStorage.setItem("Recent", JSON.stringify(recentDocuments));
        currentDocument = null;
        showRecent();
        documentTitle.textContent = "Document.docx";
        editor.setData('');
        lastOpenedDate.innerHTML = "";
    }
    infoPopUp.classList.remove('show');
    overlay.classList.remove('show');

}

editButton.onclick = function() {
    editPopUp.classList.add('show');
    overlay.classList.add('show');
    if (currentDocument != null) {
        editInputBox.value = currentDocument;
    }
}

editSubmitButton.onclick = function() {
    let temp = editInputBox.value;
    if (temp != currentDocument && currentDocument != null) {
        let data = localStorage.getItem(currentDocument);
        localStorage.removeItem(currentDocument);
        localStorage.setItem(temp, data);
        let getLocalStorageData = localStorage.getItem("Recent");
        if (getLocalStorageData == null) {
            recentDocuments = [];
        } else {
            recentDocuments = JSON.parse(getLocalStorageData);
        }
        let index = recentDocuments.indexOf(currentDocument);
        if (index !== -1) {
            recentDocuments.splice(index, 1);
        }
        currentDocument = temp;
        recentDocuments.unshift(temp);
        localStorage.setItem("Recent", JSON.stringify(recentDocuments));
        showContent(temp);
        showRecent();
    }
    editPopUp.classList.remove('show');
    overlay.classList.remove('show');

}
infoButton.onclick = function() {
    infoPopUp.classList.add('show');
    overlay.classList.add('show');
    if (currentDocument != null) {
        infoLabel.innerHTML = 'Name:   ' + currentDocument + '.docx';
        console.log(currentDocument);
    } else {
        infoLabel.innerHTML = 'Name: None';
    }
}
editCloseButton.onclick = function() {
    editPopUp.classList.remove('show');
    overlay.classList.remove('show');
}
infoCloseButton.onclick = function() {
    infoPopUp.classList.remove('show');
    overlay.classList.remove('show');

}
newCloseButton.onclick = function() {
    newPopUp.classList.remove('show');
    overlay.classList.remove('show');
}


function deleteDocument(id) {
    window.localStorage.removeItem(id);
}

newSubmitButton.onclick = function() {
    let inputData = newInputBox.value;
    let getLocalStorageData = localStorage.getItem("Recent");
    if (getLocalStorageData == null) {
        recentDocuments = [];
    } else {
        recentDocuments = JSON.parse(getLocalStorageData);
    }
    recentDocuments.unshift(inputData);
    localStorage.setItem("Recent", JSON.stringify(recentDocuments));
    localStorage.setItem(inputData, ' ');
    showRecent();
    showContent(inputData);
    currentDocument = inputData;
    newPopUp.classList.remove('show');
    overlay.classList.remove('show');
    lastOpenedDate.innerHTML = "Last opened:  " + currentTime();
    document.getElementById("recently-btn").checked = true;


}


function showRecent() {
    let getLocalStorageData = localStorage.getItem("Recent");
    if (recentDocuments == null) {
        recentDocuments = [];
    } else {
        recentDocuments = JSON.parse(getLocalStorageData);
    }
    let recentList = '';

    recentDocuments.forEach((name) => {
            recentList += `  <li>
        <div class="document-overview" id="${name}" >
            <div><a href="#" id="${name}">${name}.docx</a></div>
            <button id="${name}" class="buttonn" type="button"  onclick="changeFavoriteStatus(this.id)" ><i id="${name}" class="fa-solid fa-heart"></i></button>
        </div>
    </li>`;
        })
        // <button id="${name}" class="buttonn" type="button" onclick="changeFavoriteStatus(this.id)" style="color:gray;"><i class="fa-solid fa-heart"></i></button>
    recentDocumentsList.innerHTML = recentList;

}

function changeFavoriteStatus(id) {
    let getLocalStorageData = localStorage.getItem("Favorite");
    if (favoriteDocuments == null) {
        favoriteDocuments = [];
    } else {
        favoriteDocuments = JSON.parse(getLocalStorageData);
    }
    if (id != null && !favoriteDocuments.includes(id)) {
        favoriteDocuments.push(id);
    }
    localStorage.setItem("Favorite", JSON.stringify(favoriteDocuments));
    showFavorite();
    getCurrentDocument(id);
}


function showFavorite() {
    let getLocalStorageData = localStorage.getItem("Favorite");
    if (favoriteDocuments == null) {
        favoriteDocuments = [];
    } else {
        favoriteDocuments = JSON.parse(getLocalStorageData);
    }
    let favoriteList = '';
    favoriteDocuments.forEach((name, index) => {
        favoriteList += `  <li>
        <div class="document-overview" id="${name}" >
            <div><a href="#" id="${name}">${name}.docx</a></div>
            <button id="${name}" class="buttonn" type="button" onclick="changeFavoriteStatus(this.id)" style="color:red;"><i class="fa-solid fa-heart"></i></button>


        </div>
    </li>`;
    })


    favoriteDocumentsList.innerHTML = favoriteList;


}

function getCurrentDocument(element) {

    currentDocument = element;
    let getLocalStorageData = localStorage.getItem("Recent");
    if (getLocalStorageData == null) {
        recentDocuments = [];
    } else {
        recentDocuments = JSON.parse(getLocalStorageData);
    }
    var index = recentDocuments.indexOf(currentDocument);
    if (index != -1) {
        recentDocuments.splice(index, 1);
        recentDocuments.unshift(currentDocument);
        lastOpenedDate.innerHTML = "Last opened:  " + currentTime();
        localStorage.setItem("Recent", JSON.stringify(recentDocuments));
        showContent(element);
        showRecent();
    }




}


function currentTime() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime;
}


function showContent(title) {
    documentTitle.textContent = title + ".docx";
    let data = localStorage.getItem(title);
    if (data != null) {
        editor.setData(data);
    }

}
document.querySelector('#save-btn').addEventListener('click', () => {

    let data = editor.getData();
    localStorage.setItem(currentDocument, data);


})


recentDocumentsList.addEventListener('click', (event) => {
    currentDocument = event.target.id;
    getCurrentDocument(currentDocument);

})