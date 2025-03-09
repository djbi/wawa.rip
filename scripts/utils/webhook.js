// Discord webhook integration
window.sendToWebhook = function(message) {
    console.log('webhook.js: Sending message to Discord:', message);
    // Placeholder for actual Discord webhook URL
    const webhookUrl = 'https://discord.com/api/webhooks/1347623621870223390/MnshZJcOQ7UZ03aDFq8OrA1VfbmcXYK-dp8WhZqRborySSHnIbtZ1bzKgC4haBFKewED';
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: message,
        }),
    })
    .then(response => {
        if (response.ok) {
            console.log('webhook.js: Message sent to Discord successfully');
        } else {
            console.error('webhook.js: Failed to send message to Discord');
        }
    })
    .catch(error => {
        console.error('webhook.js: Error sending message to Discord:', error);
    });
};

console.log('webhook.js: Webhook script loaded');
