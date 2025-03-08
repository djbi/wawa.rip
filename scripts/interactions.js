// Handle all click and tap interactions
document.addEventListener('DOMContentLoaded', () => {
    console.log('interactions.js loaded');

    const faithText = document.getElementById('faithText');
    const cocaineText = document.getElementById('cocaineText');
    const heartText = document.querySelector('.heart-text');
    const socialIcons = document.getElementById('socialIcons');
    const sendNoteButton = document.getElementById('sendNote');

    if (!faithText || !cocaineText || !heartText || !socialIcons || !sendNoteButton) {
        console.error('Interaction elements not found');
        return;
    }

    let faithTapCount = 0;
    let lastTapFaith = 0;
    let lastTapCocaine = 0;
    let lastTapHeart = 0;
    const tripleTapDelay = 300;
    const doubleTapDelay = 300;

    // Triple-tap/click on Faith to show note input
    const handleFaithInteraction = (e) => {
        e.preventDefault();
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapFaith;
        console.log('Faith interacted, tapLength:', tapLength, 'count:', faithTapCount + 1);
        if (tapLength < tripleTapDelay && tapLength > 0) {
            faithTapCount++;
            if (faithTapCount === 3) {
                document.getElementById('noteInput').style.display = 'block';
                faithTapCount = 0;
                console.log('Note input shown');
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
    };

    faithText.addEventListener('click', handleFaithInteraction);
    faithText.addEventListener('touchend', handleFaithInteraction);

    // Single-tap/click on Cocaine Woman to redirect
    const handleCocaineInteraction = (e) => {
        e.preventDefault();
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapCocaine;
        if (tapLength < doubleTapDelay && tapLength > 0) {
            console.log('Interacted with Cocaine Woman');
            window.location.href = 'https://youtu.be/FMw_EXe18Qg?si=uXcD2Kykxww0JJGO';
        }
        lastTapCocaine = currentTime;
    };

    cocaineText.addEventListener('click', handleCocaineInteraction);
    cocaineText.addEventListener('touchend', handleCocaineInteraction);

    // Single-tap/click on <3 to redirect
    const handleHeartInteraction = (e) => {
        e.preventDefault();
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapHeart;
        if (tapLength < doubleTapDelay && tapLength > 0) {
            console.log('Interacted with heart');
            window.location.href = 'https://discordapp.com/users/1265799421417754664';
        }
        lastTapHeart = currentTime;
    };

    heartText.addEventListener('click', handleHeartInteraction);
    heartText.addEventListener('touchend', handleHeartInteraction);

    // Single-tap/click on social logos to redirect
    socialIcons.addEventListener('click', (e) => {
        const link = e.target.closest('.social-link');
        if (link) {
            e.preventDefault();
            const url = link.href;
            console.log(`Clicked social link: ${url}`);
            window.location.href = url;
        }
    });

    socialIcons.addEventListener('touchend', (e) => {
        const link = e.target.closest('.social-link');
        if (link) {
            e.preventDefault();
            const url = link.href;
            console.log(`Tapped social link: ${url}`);
            window.location.href = url;
        }
    });

    // Send note
    const handleSendNote = (e) => {
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
    };

    sendNoteButton.addEventListener('click', handleSendNote);
    sendNoteButton.addEventListener('touchend', handleSendNote);
});
