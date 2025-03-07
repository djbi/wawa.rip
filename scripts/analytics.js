const webhookUrl = 'https://discord.com/api/webhooks/1347623621870223390/MnshZJcOQ7UZ03aDFq8OrA1VfbmcXYK-dp8WhZqRborySSHnIbtZ1bzKgC4haBFKewED';

async function sendVisitData() {
    try {
        const message = `*Visit Count: ${visitCount}*`;
        const payload = { content: message };
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error('Error sending visit data:', error);
    }
}

async function sendNoteData(note) {
    try {
        const message = `*Note: ${note}*`;
        const payload = { content: message };
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        alert('Note sent successfully!');
        document.getElementById('noteInput').style.display = 'none';
        document.getElementById('noteTextarea').value = '';
    } catch (error) {
        console.error('Error sending note:', error);
        alert('Failed to send note. Please try again.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('analytics.js loaded');
    sendVisitData();
});
