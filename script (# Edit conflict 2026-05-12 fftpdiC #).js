
let notes = ["Haferflocken", "Klettern", "Handwerker"];
let titles = ["Einkaufen", "Sport", "Fenster"];
let trashNotes = [];

function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";
    for (let indexNotes = 0; indexNotes < notes.length; indexNotes++) {
        contentRef.innerHTML += getNoteTemplate(indexNotes);
    }
    ;
}


function renderTrashNotes() {
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";
    for (let indexTrashNotes = 0; indexTrashNotes < trashNotes.length; indexTrashNotes++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNotes);

    }
    ;
}

function getNoteTemplate(indexNotes) {
    return `<p> ${titles[indexNotes]}: ${notes[indexNotes]} <button onclick="noteToTrash(${indexNotes})">x</button></p>`;
}

function getTrashNoteTemplate(indexTrashNotes) {
    return `<p>+ ${trashNotes[indexTrashNotes]} <button onclick="deleteNote(${indexTrashNotes})">x</button></p>`;
}

function addNote() {
    let noteInputRef = document.getElementById("noteInput");
    let noteInput = noteInputRef.value;

    notes.push(noteInput);
    renderNotes();
    noteInputRef.value = "";
}

function noteToTrash(indexNotes) {
    let trashNote = notes.splice(indexNotes, 1);
    trashNotes.push(trashNote);
    renderNotes();
    renderTrashNotes();
}

function deleteNote(indexTrashNotes) {
    let noteDelete = trashNotes.splice(indexTrashNotes, 1);
    renderNotes();
    renderTrashNotes();
}









function safeToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
};

function getFromLocalStorage() {
    let myNotes = JSON.parse(localStorage.getItem("notes"));
    let myTrash = JSON.parse(localStorage.getItem("trashNotes"));

    notes = myNotes;
    trashNotes = myTrash;
};