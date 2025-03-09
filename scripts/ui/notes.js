// Notes feature triggered by triple-click on Faith title
document.addEventListener('DOMContentLoaded', () => {
    console.log('notes.js: Loaded at', new Date().toISOString());

    const faithText = document.getElementById('faithText');
    const noteInput = document.getElementById('noteInput');
    const noteTextarea = document.getElementById('noteTextarea');
    const sendNote = document.getElementById('sendNote');

    // Validate elements
    if (!faithText || !noteInput || !noteTextarea || !sendNote) {
        console.error('notes.js: Required elements not found');
        return;
    }

    // Style note input
    noteInput.style.position = 'fixed';
    noteInput.style.top = '50%';
    noteInput.style.left = '50%';
    noteInput.style.transform = 'translate(-50%, -50%)';
    noteInput.style.backgroundColor = '#111';
    noteInput.style.padding = '20px';
    noteInput.style.border = '2px solid #00ff00';
    noteInput.style.zIndex = '1000';
    noteTextarea.style.width = '300px';
    noteTextarea.style.height = '100px';
    noteTextarea.style.backgroundColor = '#000';
    noteTextarea.style.color = '#fff';
    noteTextarea.style.border = '1px solid #ff69b4';
    sendNote.style.marginTop = '10px';
    sendNote.style.padding = '5px 10px';
    sendNote.style.backgroundColor = '#ff69b4';
    sendNote.style.color = '#000';
    sendNote.style.border = 'none';
    sendNote.style.cursor = 'pointer';

    // Triple-click on Faith to show note input
    let clickCount = 0;
    faithText.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 3) {
            noteInput.style.display = 'block';
            noteTextarea.focus();
            clickCount = 0;
        }
        setTimeout(() => {
            clickCount = 0;
        }, 1000);
    });

    // Send note to Discord webhook
    sendNote.addEventListener('click', () => {
        const note = noteTextarea.value.trim();
        if (note) {
            console.log('notes.js: Note submitted:', note);
            if (typeof window.sendToWebhook === 'function') {
                window.sendToWebhook(`New note: ${note}`);
            }
            noteInput.style.display = 'none';
            noteTextarea.value = '';
        }
    });

    // Close note input on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && noteInput.style.display === 'block') {
            noteInput.style.display = 'none';
            noteTextarea.value = '';
        }
    });
});

console.log('notes.js: Notes feature initialized');
