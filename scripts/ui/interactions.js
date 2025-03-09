// Note input interaction
const noteInput = document.getElementById('noteInput');
const noteTextarea = document.getElementById('noteTextarea');
const sendNote = document.getElementById('sendNote');

document.addEventListener('keydown', (e) => {
    if (e.key === 'n' && e.ctrlKey) {
        noteInput.style.display = 'block';
        noteTextarea.focus();
    }
});

sendNote.addEventListener('click', () => {
    console.log('Note submitted:', noteTextarea.value);
    noteInput.style.display = 'none';
    noteTextarea.value = '';
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('interactions.js loaded');
});
