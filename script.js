// Enter site function to show main content, hide splash, and start/repeat music
function enterSite() {
    document.getElementById('splash').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    const audio = document.getElementById('backgroundMusic');
    audio.currentTime = 0; // Reset to start
    audio.play().catch(function(error) {
        console.log("Audio playback failed: ", error);
    });
}

// Redirect functions
function redirectRoblox() {
    window.location.href = 'https://www.roblox.com/share?code=44cb54032142d34787f1f2ad3aff1033&type=Profile&source=ProfileShare&stamp=1741296009841';
}

function redirectTikTok() {
    window.location.href = 'https://www.tiktok.com/@faith.meows?_t=ZN-8uT1pCNKhvC&_r=1';
}

function redirectSpotify() {
    window.location.href = 'https://open.spotify.com/user/313x5v4poeytrommnmgiutn5wmpi?si=HMZBKe2NT9yL35EynPjtzw';
}

// Laser pointer effect (moved to CSS with pseudo-element for better performance)
