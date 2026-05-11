
let notes = ["Einkaufen", "Sport", "Handwerker"];


function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";
    for (let indexNotes = 0; indexNotes < notes.length; indexNotes++) {
        const note = notes[indexNotes];
        contentRef.innerHTML += getNoteTemplate(note);

    }
}

function getNoteTemplate(note) {
    return `<p>+ ${note}</p>`;
}

function addNote(){
    let noteInputRef = document.getElementById("noteInput");
    let noteInput = noteInputRef.value;

    notes.push(noteInput);
    renderNotes();
    noteInputRef.value = "";
}

function deleteNote(){
    
}