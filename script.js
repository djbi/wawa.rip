// Toggle profile sections
document.querySelectorAll('.icons img').forEach((img, index) => {
    img.addEventListener('click', () => {
        document.querySelectorAll('.profile-section').forEach(section => section.classList.remove('active'));
        document.querySelectorAll('.profile-section')[index].classList.add('active');
    });
});

// Roblox Data Fetch (Mock)
function fetchRobloxData() {
    const username = document.getElementById('robloxUsername').value;
    if (!username) {
        alert('Please enter a Roblox username');
        return;
    }
    const mockRobloxData = {
        username: username,
        id: '12345678',
        friendsCount: 50,
        status: 'Playing My Awesome Game'
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

// Brawl Stars Data Fetch (Mock)
function fetchBrawlStarsData() {
    const tag = document.getElementById('brawlStarsTag').value;
    if (!tag) {
        alert('Please enter a Brawl Stars player tag');
        return;
    }
    const mockBrawlStarsData = {
        tag: tag,
        name: 'PlayerOne',
        trophies: 25000,
        club: 'Cool Club'
    };
    displayBrawlStarsData(mockBrawlStarsData);
}

function displayBrawlStarsData(data) {
    document.getElementById('brawlStarsData').innerHTML = `
        <p><strong>Tag:</strong> ${data.tag}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Trophies:</strong> ${data.trophies}</p>
        <p><strong>Club:</strong> ${data.club}</p>
    `;
}

// TikTok Data Fetch (Mock)
function fetchTikTokData() {
    const username = document.getElementById('tiktokUsername').value;
    if (!username) {
        alert('Please enter a TikTok username');
        return;
    }
    const mockTikTokData = {
        username: username,
        followers: 10000,
        latestVideo: 'Funny Dance Video'
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

// Spotify Data Fetch (Mock)
function fetchSpotifyData() {
    const mockSpotifyData = {
        currentSong: 'Song Title',
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
        <p><strong>Playlist:</strong> ${data.playlist}</p>
    `;
}
