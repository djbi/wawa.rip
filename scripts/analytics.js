document.addEventListener('DOMContentLoaded', () => {
    console.log('analytics.js loaded');

    // Analytics to send visitor data to Discord webhook
    const webhookUrl = 'https://discord.com/api/webhooks/1347623621870223390/MnshZJcOQ7UZ03aDFq8OrA1VfbmcXYK-dp8WhZqRborySSHnIbtZ1bzKgC4haBFKewED';

    window.sendVisitData = async function() { // Make globally accessible
        try {
            const message = `*Visit Count: ${visitCount}*`;
            const payload = {
                content: message
            };
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            console.log('Visit data sent successfully');
        } catch (error) {
            console.error('Error sending visit data:', error);
        }
    };

    window.sendNoteData = async function(note) { // Make globally accessible
        try {
            const message = `*Note: ${note}*`;
            const payload = {
                content: message
            };
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
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

    // Send initial visit data
    sendVisitData();
});
