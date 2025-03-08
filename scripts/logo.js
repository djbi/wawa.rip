// Initialize logos on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('logos.js loaded');

    // Logo sources provided by user
    const customLogos = {
        'https://www.tiktok.com/@faith.meows?_t=ZN-8uT1pCNKhvC&_r=1': {
            src: 'https://gpng.net/wp-content/uploads/Tiktok-Free-Photo-png.png',
            fallback: 'https://via.placeholder.com/50?text=TikTok'
        },
        'https://open.spotify.com/user/313x5v4poeytrommnmgiutn5wmpi': {
            src: 'https://th.bing.com/th/id/R.dd5c17cf74d017e8935c87385ed156e0?rik=0mDRr0Ob1yVmWQ&pid=ImgRaw&r=0',
            fallback: 'https://via.placeholder.com/50?text=Spotify'
        },
        'https://www.roblox.com/share?code=44cb54032142d34787f1f2ad3aff1033&type=Profile&source=ProfileShare&stamp=1741364262991': {
            src: 'https://i.imgflip.com/7nwenp.png',
            fallback: 'https://via.placeholder.com/50?text=Roblox'
        },
        'https://github.com/djbi': {
            src: 'https://tse2.mm.bing.net/th/id/OIF.fI7VRWzvOCfBNQsOCbJQyA?rs=1&pid=ImgDetMain',
            fallback: 'https://via.placeholder.com/50?text=GitHub'
        }
    };

    // Load social icons
    window.loadLogos = function() {
        const socialIcons = document.getElementById('socialIcons');
        if (!socialIcons) {
            console.error('socialIcons element not found');
            return;
        }
        console.log('Loading social logos...');
        socialIcons.innerHTML = ''; // Clear any existing content
        for (const [url, { src, fallback }] of Object.entries(customLogos)) {
            const link = document.createElement('a');
            link.href = url; // Direct link for redirection
            link.className = 'social-link';
            const img = document.createElement('img');
            img.src = src;
            img.alt = url.split('/')[2];
            img.className = 'social-logo';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            img.onerror = () => {
                console.error(`Failed to load image for ${url}: ${src}, using fallback`);
                img.src = fallback;
            };
            img.onload = () => console.log(`Loaded image for ${url}: ${src}`);
            link.appendChild(img);
            socialIcons.appendChild(link);

            // Single-click for desktop
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Clicked social link: ${url}`);
                window.location.href = url;
            });

            // Single-tap for mobile
            link.addEventListener('touchend', (e) => {
                e.preventDefault();
                console.log(`Tapped social link: ${url}`);
                window.location.href = url;
            });
        }
    };
});
