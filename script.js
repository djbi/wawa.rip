// Add click event to the "CLICK TO ENTER" text
document.querySelector('.click-to-enter').addEventListener('click', enterSite);

// Enter site function to show main content and hide splash
function enterSite() {
    document.getElementById('splash').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('backgroundMusic').play().catch(function(error) {
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
