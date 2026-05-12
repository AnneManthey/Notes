
let notes = ["Einkaufen", "Sport", "Handwerker"];


function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";
    for (let indexNotes = 0; indexNotes < notes.length; indexNotes++) {
        const note = notes[indexNotes];
        contentRef.innerHTML += getNoteTemplate(indexNotes);

    }
}

function getNoteTemplate(indexNotes) {
    return `<p>+ ${notes[indexNotes]} <button onclick="deleteNote(${indexNotes})">x</button></p>`;
}

function addNote(){
    let noteInputRef = document.getElementById("noteInput");
    let noteInput = noteInputRef.value;

    notes.push(noteInput);
    renderNotes();
    noteInputRef.value = "";
}

function deleteNote(indexNotes){
    notes.splice(indexNotes, 1);
    renderNotes();
}