const customLogos = {
    'https://www.tiktok.com/@faith.meows?_t=ZN-8uT1pCNKhvC&_r=1': 'https://cdn-icons-png.flaticon.com/512/5968/5968819.png',
    'https://open.spotify.com/user/313x5v4poeytrommnmgiutn5wmpi': 'https://cdn-icons-png.flaticon.com/512/174/174872.png',
    'https://www.roblox.com/share?code=44cb54032142d34787f1f2ad3aff1033&type=Profile&source=ProfileShare&stamp=1741364262991': 'https://cdn-icons-png.flaticon.com/512/10101/10101303.png',
    'https://github.com/djbi': 'https://cdn-icons-png.flaticon.com/512/25/25231.png'
};

const doubleTapDelay = 300;
let lastTapTimes = {};

function loadLogos() {
    const socialIcons = document.getElementById('socialIcons');
    for (const [url, imageSrc] of Object.entries(customLogos)) {
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'social-link';
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = url.split('/')[2];
        img.className = 'social-logo';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        link.appendChild(img);
        socialIcons.appendChild(link);

        link.addEventListener('dblclick', (e) => {
            e.preventDefault();
            window.location.href = url;
        });

        link.addEventListener('touchend', (e) => {
            e.preventDefault();
            const currentTime = new Date().getTime();
            const linkId = url;
            lastTapTimes[linkId] = lastTapTimes[linkId] || 0;
            const tapLength = currentTime - lastTapTimes[linkId];
            if (tapLength < doubleTapDelay && tapLength > 0) {
                window.location.href = url;
            }
            lastTapTimes[linkId] = currentTime;
        });
    }
}

document.addEventListener('DOMContentLoaded', loadLogos);
