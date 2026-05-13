
const errorMessage = document.getElementById("error");
let notes = ["Haferflocken", "Laufen", "Handwerker"];
let titles = ["Einkaufen", "Sport", "Fenster"];
let trashNotes = [];
let trashTitles = [];

function renderTasks() {

    getFromLocalStorage();
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";
    errorMessage.innerHTML = "";

    for (let indexNotes = 0; indexNotes < notes.length; indexNotes++) {
        contentRef.innerHTML += getTasksTemplate(indexNotes);
    };

}

function renderTrashTasks() {

    getFromLocalStorage();
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";
    for (let indexTrashNotes = 0; indexTrashNotes < trashNotes.length; indexTrashNotes++) {
        trashContentRef.innerHTML += getTrashTasksTemplate(indexTrashNotes);
    };
}

function getTasksTemplate(indexNotes) {
    errorMessage.innerHTML = `<p>Bitte Titel und Beschreibung einfügen</p>`
    return `<p> ${titles[indexNotes]}: ${notes[indexNotes]} <button onclick="noteToTrash(${indexNotes})">x</button></p>`;
}

function getTrashTasksTemplate(indexTrashNotes) {
    return `<p>${trashTitles[indexTrashNotes]}: ${trashNotes[indexTrashNotes]} <button onclick="deleteNote(${indexTrashNotes})">x</button></p>`;
}

function addTask() {
    let titleInputRef = document.getElementById("titleInput");
    let titleInput = titleInputRef.value;
    let noteInputRef = document.getElementById("noteInput");
    let noteInput = noteInputRef.value;
    if ((titleInput.length > 0) && (noteInput.length > 0)) {


        // titles.push(titleInput);
        // notes.push(noteInput);
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
    let trashTitle = titles.splice(indexNotes, 1);
    trashTitles.push(trashTitle[0]);

    let trashNote = notes.splice(indexNotes, 1);
    trashNotes.push(trashNote[0]);

    safeData();
    renderTasks();
    renderTrashTasks();
}

function deleteNote(indexTrashNotes) {
    let titleDelete = trashTitles.splice(indexTrashNotes, 1);
    let noteDelete = trashNotes.splice(indexTrashNotes, 1);
    safeData();
    renderTasks();
    renderTrashTasks();
}







function safeData() {
    let titleRef = document.getElementById("titleInput");
    let noteRef = document.getElementById("noteInput");

    if (titleRef.value != "" && noteRef.value != "") {
        titles.push(titleRef.value);
        notes.push(noteRef.value);
    }
    safeToLocalStorage();
    titleRef.value = "";
    noteRef.value = "";

}

function safeToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));

    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("trashTitles", JSON.stringify(trashTitles));
};

function getFromLocalStorage() {

    let myNotesArray = JSON.parse(localStorage.getItem("notes"));
    let myTrashNotesArray = JSON.parse(localStorage.getItem("trashNotes"));

    let myTitlesArray = JSON.parse(localStorage.getItem("titles"));
    let myTrashTitlesArray = JSON.parse(localStorage.getItem("trashTitles"));

    if (myNotesArray != null) {
        notes = myNotesArray;
        trashNotes = myTrashNotesArray;

        titles = myTitlesArray;
        trashTitles = myTrashTitlesArray;
    }


};