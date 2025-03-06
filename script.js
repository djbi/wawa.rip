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

// Toggle profile sections (optional display)
document.querySelectorAll('.icons img').forEach((img, index) => {
    img.addEventListener('click', () => {
        document.querySelectorAll('.profile-section').forEach(section => section.classList.remove('active'));
        document.querySelectorAll('.profile-section')[index].classList.add('active');
    });
});

// Placeholder data functions (no input needed due to redirects)
function fetchRobloxData() {
    const mockRobloxData = {
        username: 'Linked Profile',
        id: '44cb5403',
        friendsCount: 50,
        status: 'Online'
    };
    displayRobloxData(mockRobloxData);
}

function displayRobloxData(data) {
    document.getElementById('robloxData').innerHTML = `
        <p><strong>Username:</strong> ${data.username}</p>
        <p><strong>ID:</strong> ${data.id}</p>
        <p><strong>Friends:</strong> ${data.friendsCount}</p>
        <p><strong>Status:</strong> ${data.status}</p>
    `;
}

function fetchTikTokData() {
    const mockTikTokData = {
        username: '@faith.meows',
        followers: 10000,
        latestVideo: 'Latest Post'
    };
    displayTikTokData(mockTikTokData);
}

function displayTikTokData(data) {
    document.getElementById('tiktokData').innerHTML = `
        <p><strong>Username:</strong> ${data.username}</p>
        <p><strong>Followers:</strong> ${data.followers}</p>
        <p><strong>Latest Video:</strong> ${data.latestVideo}</p>
    `;
}

function fetchSpotifyData() {
    const mockSpotifyData = {
        currentSong: 'Current Track',
        artist: 'Artist Name',
        playlist: 'My Favorites'
    };
    displaySpotifyData(mockSpotifyData);
}

function displaySpotifyData(data) {
    document.getElementById('spotifyData').innerHTML = `
        <p><strong>Current Song:</strong> ${data.currentSong}</p>
        <p><strong>Artist:</strong> ${data.artist}</p>
        <p><strong>Playlist:</strong> ${data.playlist}</p>
    `;
}
