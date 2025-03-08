// Initialize analytics on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('analytics.js loaded');

    const webhookUrl = 'https://discord.com/api/webhooks/1347623621870223390/MnshZJcOQ7UZ03aDFq8OrA1VfbmcXYK-dp8WhZqRborySSHnIbtZ1bzKgC4haBFKewED';

    window.sendVisitData = async function() {
        try {
            const message = `*Visit Count: ${window.visitCount}*`;
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: message })
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            console.log('Visit data sent');
        } catch (error) {
            console.error('Error sending visit data:', error);
        }
    };

    window.sendNoteData = async function(note) {
        try {
            const message = `*Note: ${note}*`;
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: message })
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            console.log('Note sent successfully');
            alert('Note sent successfully!');
            document.getElementById('noteInput').style.display = 'none';
            document.getElementById('noteTextarea').value = '';
        } catch (error) {
            console.error('Error sending note:', error);
            alert('Failed to send note. Please try again.');
        }
    };

    sendVisitData();
});
