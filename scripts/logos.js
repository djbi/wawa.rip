// Custom logo mapping system
const customLogos = {
    'https://www.tiktok.com/@faith.meows?_t=ZN-8uT1pCNKhvC&_r=1': 'https://cdn-icons-png.flaticon.com/512/5968/5968819.png',
    'https://open.spotify.com/user/313x5v4poeytrommnmgiutn5wmpi': 'https://cdn-icons-png.flaticon.com/512/174/174872.png',
    'https://www.roblox.com/share?code=44cb54032142d34787f1f2ad3aff1033&type=Profile&source=ProfileShare&stamp=1741364262991': 'https://cdn-icons-png.flaticon.com/512/10101/10101303.png'
};

// Function to populate social icons with auto-scaling
function loadLogos() {
    const socialIcons = document.getElementById('socialIcons');
    for (const [url, imageSrc] of Object.entries(customLogos)) {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = url.split('/')[2]; // Simplified alt text
        img.className = 'social-logo';
        // Auto-scale image to fit 50x50 while maintaining aspect ratio
        img.style.maxWidth = '50px';
        img.style.maxHeight = '50px';
        img.style.width = '100%';
        img.style.height = 'auto';
        link.appendChild(img);
        socialIcons.appendChild(link);
    }
}

// Load logos on page load
document.addEventListener('DOMContentLoaded', loadLogos);
