// Initialize touch events on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('touch.js loaded');

    const faithText = document.getElementById('faithText');
    const cocaineText = document.getElementById('cocaineText');
    const heartText = document.querySelector('.heart-text');
    const sendNoteButton = document.getElementById('sendNote');

    if (!faithText || !cocaineText || !heartText || !sendNoteButton) {
        console.error('Touch elements not found');
        return;
    }

    let faithTapCount = 0;
    let lastTapFaith = 0;
    let lastTapCocaine = 0;
    let lastTapHeart = 0;
    const tripleTapDelay = 300;
    const doubleTapDelay = 300;

    // Triple-tap on Faith to show note input
    faithText.addEventListener('touchend', (e) => {
        e.preventDefault();
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapFaith;
        console.log('Faith tapped, tapLength:', tapLength, 'count:', faithTapCount + 1);
        if (tapLength < tripleTapDelay && tapLength > 0) {
            faithTapCount++;
            if (faithTapCount === 3) {
                document.getElementById('noteInput').style.display = 'block';
                faithTapCount = 0;
                console.log('Note input shown on mobile');
            }
        } else {
            faithTapCount = 1;
        }
        lastTapFaith = currentTime;
        setTimeout(() => {
            if (faithTapCount !== 0) {
                faithTapCount = 0;
                console.log('Faith tap count reset');
            }
        }, 1000);
    });

    // Double-tap on Cocaine Woman to redirect
    cocaineText.addEventListener('touchend', (e) => {
        e.preventDefault();
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapCocaine;
        if (tapLength < doubleTapDelay && tapLength > 0) {
            console.log('Double-tapped Cocaine Woman');
            window.location.href = 'https://youtu.be/FMw_EXe18Qg?si=uXcD2Kykxww0JJGO';
        }
        lastTapCocaine = currentTime;
    });

    // Double-tap on <3 to redirect
    heartText.addEventListener('touchend', (e) => {
        e.preventDefault();
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapHeart;
        if (tapLength < doubleTapDelay && tapLength > 0) {
            console.log('Double-tapped heart');
            window.location.href = 'https://discordapp.com/users/1265799421417754664';
        }
        lastTapHeart = currentTime;
    });

    // Send note on mobile
    sendNoteButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        const note = document.getElementById('noteTextarea').value.trim();
        if (note) {
            if (typeof window.sendNoteData === 'function') {
                window.sendNoteData(note);
            } else {
                console.error('sendNoteData not found');
                alert('Failed to send note.');
            }
        } else {
            alert('Please enter a note.');
        }
    });
});
