// Analytics for tracking visits
window.sendVisitData = function() {
    console.log(`analytics.js: Visit recorded: ${window.visitCount} at ${new Date().toISOString()}`);
    // Send to Discord webhook
    if (typeof window.sendToWebhook === 'function') {
        window.sendToWebhook(`New visit recorded: Total visits ${window.visitCount}`);
    }
};

console.log('analytics.js: Analytics script loaded');
