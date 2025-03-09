// Basic analytics
window.sendVisitData = function() {
    console.log(`Visit recorded: ${window.visitCount} at ${new Date().toISOString()}`);
    // Placeholder for actual analytics (e.g., fetch to a server)
};
