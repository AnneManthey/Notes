
let notes = ["Haferflocken", "Klettern", "Handwerker"];
let titles = ["Einkaufen", "Sport", "Fenster"];
let trashNotes = [];
let trashTitles = [];

function renderTasks() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";
    for (let indexNotes = 0; indexNotes < notes.length; indexNotes++) {
        contentRef.innerHTML += getTasksTemplate(indexNotes);

    }
    ;
}

function renderTrashTasks() {
    let trashContentRef = document.getElementById('trash_content');
    trashContentRef.innerHTML = "";
    for (let indexTrashNotes = 0; indexTrashNotes < trashNotes.length; indexTrashNotes++) {
        trashContentRef.innerHTML += getTrashTasksTemplate(indexTrashNotes);
    }
    ;
}

function getTasksTemplate(indexNotes) {
    return `<p> ${titles[indexNotes]}: ${notes[indexNotes]} <button onclick="noteToTrash(${indexNotes})">x</button></p>`;
}

function getTrashTasksTemplate(indexTrashNotes) {
    return `<p>${titles[indexTrashNotes]}: ${trashNotes[indexTrashNotes]} <button onclick="deleteNote(${indexTrashNotes})">x</button></p>`;
}

function addTask() {
    let titleInputRef = document.getElementById("titleInput");
    let noteInputRef = document.getElementById("noteInput");
    let noteInput = noteInputRef.value;
    let titleInput = titleInputRef.value;

    notes.push(noteInput);
    titles.push(titleInput);

    renderTasks();
    noteInputRef.value = "";
    titleInputRef.value = "";
}

function noteToTrash(indexNotes) {
    let trashNote = notes.splice(indexNotes, 1);
    let trashTitle = titles.splice(indexNotes, 1);
    trashNotes.push(trashNote);
    renderTasks();
    renderTrashTasks();
}

function deleteNote(indexTrashNotes) {
    let noteDelete = trashNotes.splice(indexTrashNotes, 1);
    let titleDelete =
    renderTasks();
    renderTrashTasks();
}







function saveData(){
    let titleRef = document.getElementById("titleInput");
    let noteRef = document.getElementById("noteInput");

    if (titleRef.value != "" && noteRef.value != ""){
        titles.push(titleRef.value);
        notes.push(noteRef.value);
    }
    safeToLocalStorage();
    //renderNotes();
    titleRef.value = "";
    noteRef.value = "";

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