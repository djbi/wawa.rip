// Analytics to send visitor data to Discord webhook
const webhookUrl = 'https://discord.com/api/webhooks/1347623621870223390/MnshZJcOQ7UZ03aDFq8OrA1VfbmcXYK-dp8WhZqRborySSHnIbtZ1bzKgC4haBFKewED';

async function sendVisitData() {
    try {
        // Fetch IP using a public API
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ip = ipData.ip;

        // Gather device info
        const deviceInfo = `User Agent: ${navigator.userAgent}\nPlatform: ${navigator.platform}\nScreen: ${window.screen.width}x${window.screen.height}`;

        // Prepare message
        const message = `*${deviceInfo}*\n*${ip}*\nVisit Count: ${visitCount}`;
        const payload = {
            content: message
        };

        // Send to Discord webhook
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error('Error sending visit data:', error);
    }
}

// Send initial visit data
sendVisitData();
