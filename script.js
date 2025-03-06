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

// Animate the browser tab title
const baseTitle = "meow meow meow meow meow meow meow meow meow meow";
let shift = 0;
function animateTitle() {
    shift = (shift + 1) % baseTitle.length;
    const shiftedTitle = baseTitle.slice(shift) + baseTitle.slice(0, shift);
    document.title = shiftedTitle;
}
setInterval(animateTitle, 100); // Faster animation (100ms)

// Laser pointer effect with trail
const laser = document.querySelector('.laser-pointer');
const body = document.body;

document.addEventListener('mousemove', (e) => {
    laser.style.left = `${e.clientX}px`;
    laser.style.top = `${e.clientY}px`;

    // Create trail effect
    const trail = document.createElement('div');
    trail.classList.add('trail');
    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY}px`;
    body.appendChild(trail);

    // Remove trail after 1 second
    setTimeout(() => {
        trail.remove();
    }, 1000);
});

document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    laser.style.left = `${touch.clientX}px`;
    laser.style.top = `${touch.clientY}px`;

    // Create trail effect for touch
    const trail = document.createElement('div');
    trail.classList.add('trail');
    trail.style.left = `${touch.clientX}px`;
    trail.style.top = `${touch.clientY}px`;
    body.appendChild(trail);

    // Remove trail after 1 second
    setTimeout(() => {
        trail.remove();
    }, 1000);
}, { passive: true });
