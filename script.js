
const errorMessage = document.getElementById("error");

// let notes = ["Haferflocken", "Laufen", "Fenster"];
// let titles = ["Einkaufen", "Sport", "Handwerker"];
// let trashNotes = [];
// let trashTitles = [];

let allNotes = {
    'notes': ["Haferflocken", "Laufen", "Fenster"],
    'titles': ["Einkaufen", "Sport", "Handwerker"],
    'trashNotes': [],
    'trashTitles': []
}

function renderTasks() {
    getFromLocalStorage();
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";
    errorMessage.innerHTML = "";

    for (let indexNotes = 0; indexNotes < allNotes.notes.length; indexNotes++) {
        contentRef.innerHTML += getTasksTemplate(indexNotes);
    };
}

function renderTrashTasks() {
    getFromLocalStorage();
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";

    for (let indexTrashNotes = 0; indexTrashNotes < allNotes.trashNotes.length; indexTrashNotes++) {
        trashContentRef.innerHTML += getTrashTasksTemplate(indexTrashNotes);
    };
}

function getTasksTemplate(indexNotes) {
    errorMessage.innerHTML = `<p>Bitte Überschrift und Beschreibung einfügen</p>`
    return `<div class="task_container">
            <h3> ${allNotes.titles[indexNotes]}</h3>
            <p> ${allNotes.notes[indexNotes]}</p>
            <div class="task_btn_wrapper">
            <button class="task_btn" onclick="noteToTrash(${indexNotes})" >erledigt</button> 
            <button class="task_btn" onclick="deleteNote(${indexNotes})">löschen</button>
            </div>
            </div>`;
}

// onclick="moveNote(${indexNotes}, 'notes', 'trashnotes')"



function getTrashTasksTemplate(indexTrashNotes, indexNotes) {
    return `<div class="task_container">
            <h3>${allNotes.trashTitles[indexTrashNotes]}</h3>
            <p> ${allNotes.trashNotes[indexTrashNotes]}</p>
            <div class="task_btn_wrapper">
            
            <button class="task_btn" onclick="deleteTrashNote(${indexTrashNotes})">löschen</button>
            </div>
            </div>`;
}

//<button class="task_btn" onclick="moveNote(${indexNotes}, 'trashnotes', 'notes')">zurück</button>

function addTask() {
    let titleInputRef = document.getElementById("titleInput");
    let titleInput = titleInputRef.value;
    let noteInputRef = document.getElementById("noteInput");
    let noteInput = noteInputRef.value;
    if ((titleInput.length > 0) && (noteInput.length > 0)) {
        safeData();
        renderTasks();
        noteInputRef.value = "";
        titleInputRef.value = "";
        errorMessage.classList.remove("show_error");
    }
    else {
        errorMessage.classList.add("show_error");
    }
}

function noteToTrash(indexNotes) {
    let trashTitle = allNotes.titles.splice(indexNotes, 1);
    allNotes.trashTitles.push(trashTitle);   //[0]
    let trashNote = allNotes.notes.splice(indexNotes, 1);
    allNotes.trashNotes.push(trashNote);  //[0]
    renderAllNotes();
}
function deleteNote(indexNotes) {
    let titleDelete = allNotes.titles.splice(indexNotes, 1);
    let noteDelete = allNotes.notes.splice(indexNotes, 1);
    renderAllNotes();
}

function deleteTrashNote(indexTrashNotes) {
    let titleDelete = allNotes.trashTitles.splice(indexTrashNotes, 1);
    let noteDelete = allNotes.trashNotes.splice(indexTrashNotes, 1);
    renderAllNotes();
}

// Move All-in-one function

function moveNote(indexNote, startKey, destinationKey) {
    let note = allNotes[startKey].splice(indexNote, 1);
    allNotes[destinationKey].push(note[0]);

    let noteTitle = allNotes[startKey + "Titles"].splice(indexNote, 1);
    allNotes[destinationKey + "Titles"].push(noteTitle[0]);
    renderAllNotes();
}

function renderAllNotes() {
    safeData();
    renderTasks();
    renderTrashTasks();
}

function safeData() {
    let titleRef = document.getElementById("titleInput");
    let noteRef = document.getElementById("noteInput");

    if (titleRef.value != "" && noteRef.value != "") {
        allNotes.titles.push(titleRef.value);
        allNotes.notes.push(noteRef.value);
    }
    safeToLocalStorage();
    titleRef.value = "";
    noteRef.value = "";
}

function safeToLocalStorage() {
    localStorage.setItem("allNotes.notes", JSON.stringify(allNotes.notes));
    localStorage.setItem("allNotes.trashNotes", JSON.stringify(allNotes.trashNotes));
    localStorage.setItem("allNotes.titles", JSON.stringify(allNotes.titles));
    localStorage.setItem("allNotes.trashTitles", JSON.stringify(allNotes.trashTitles));
};

function getFromLocalStorage() {
    let myNotesArray = JSON.parse(localStorage.getItem("allNotes.notes"));
    let myTrashNotesArray = JSON.parse(localStorage.getItem("allNotes.trashNotes"));
    let myTitlesArray = JSON.parse(localStorage.getItem("allNotes.titles"));
    let myTrashTitlesArray = JSON.parse(localStorage.getItem("allNotes.trashTitles"));

    if (myNotesArray != null) {
        allNotes.notes = myNotesArray;
        allNotes.trashNotes = myTrashNotesArray;
        allNotes.titles = myTitlesArray;
        allNotes.trashTitles = myTrashTitlesArray;
    }
};