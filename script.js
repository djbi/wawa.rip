document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const enterScreen = document.getElementById('enter-screen');
    const coinScreen = document.getElementById('coin-screen');
    const clickerScreen = document.getElementById('clicker-screen');
    const enterBtn = document.getElementById('enter-btn');
    const headsBtn = document.getElementById('heads-btn');
    const tailsBtn = document.getElementById('tails-btn');
    const eyeIcon = document.getElementById('eye-icon');
    const creepyImage = document.getElementById('creepy-image');
    const screamAudio = document.getElementById('scream-audio');
    const clickerIp = document.getElementById('clicker-ip');
    const clickerScore = document.getElementById('clicker-score');
    const multiplierCounter = document.getElementById('multiplier-counter');
    const perSecond = document.getElementById('per-second');
    const ipDisplay = document.getElementById('ip-display');
    const ipDisplayCoin = document.getElementById('ip-display-coin');
    const ipDisplayClicker = document.getElementById('ip-display-clicker');
    const sidebar = document.getElementById('sidebar');

    // Neon colors for IP address effect
    const colors = [
        '#FF00FF', '#00FFFF', '#FF00AA', '#00FF00',
        '#FFFF00', '#FF6600', '#FF0099', '#00CCFF',
        '#FF3366', '#33FF33', '#FFCC00', '#FF0066'
    ];

    // Function to get a random color for IP digits
    function getRandomColor(excludeColors = []) {
        const availableColors = colors.filter(c => !excludeColors.includes(c));
        return availableColors[Math.floor(Math.random() * availableColors.length)];
    }

    // Function to generate a random IP address
    function generateRandomIP() {
        return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    }

    // Function to display IP with colorful changing effects
    function displayIP(element, ip) {
        try {
            element.innerHTML = '';
            const chars = ip.split('');
            let usedColors = [];
            chars.forEach(char => {
                const span = document.createElement('span');
                span.className = 'digit';
                span.textContent = char;
                const color = getRandomColor(usedColors);
                span.style.color = color;
                usedColors.push(color);
                element.appendChild(span);
            });
            setInterval(() => {
                usedColors = [];
                element.childNodes.forEach(span => {
                    const color = getRandomColor(usedColors);
                    span.style.color = color;
                    usedColors.push(color);
                });
            }, 300);
        } catch (error) {
            console.error('Error displaying IP:', error);
            element.textContent = ip; // Fallback to plain text
        }
    }

    // Fetch IP or use a random one if fetching fails
    async function fetchIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            const ip = data.ip;
            displayIP(ipDisplay, ip);
            displayIP(ipDisplayCoin, ip);
            displayIP(ipDisplayClicker, ip);
        } catch (error) {
            console.error('Error fetching IP:', error);
            const randomIP = generateRandomIP();
            displayIP(ipDisplay, randomIP);
            displayIP(ipDisplayCoin, randomIP);
            displayIP(ipDisplayClicker, randomIP);
        }
    }

    // Update visit counter
    function updateVisitCount() {
        try {
            let count = localStorage.getItem('visitCount');
            if (!count) count = 567;
            else count = parseInt(count) + 1;
            localStorage.setItem('visitCount', count);
            document.getElementById('count').textContent = count;
            return count;
        } catch (error) {
            console.error('Error updating visit count:', error);
            document.getElementById('count').textContent = '567';
        }
    }

    // Function to go directly to the clicker screen
    function goToClickerScreen() {
        enterScreen.style.display = 'none';
        coinScreen.style.display = 'none';
        clickerScreen.style.display = 'flex';
        canClick = true; // Enable clicking on the clicker screen
    }

    // Game over function for coin flip (used only if user goes through coin screen)
    function gameOver(choice) {
        try {
            const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
            headsBtn.style.display = 'none';
            tailsBtn.style.display = 'none';
            const coinChoice = document.getElementById('coin-choice');
            coinChoice.innerHTML = `<div class="coin-btn">${result}</div>`;
            document.body.style.animation = 'flash 0.2s 10';
            screamAudio.play().catch(err => console.error('Error playing audio:', err));
            setTimeout(() => {
                document.body.style.animation = '';
                creepyImage.style.display = 'block';
                coinScreen.style.display = 'none';
                setTimeout(() => {
                    creepyImage.style.display = 'none';
                    clickerScreen.style.display = 'flex';
                    canClick = true; // Enable clicking on the clicker screen
                }, 2000);
            }, 2000);
        } catch (error) {
            console.error('Error in gameOver:', error);
        }
    }

    // Cycle browser title to "meow meow"
    function cycleTitle() {
        const titleText = "meow meow";
        let index = 0;
        setInterval(() => {
            const start = index % titleText.length;
            const end = (index + titleText.length) % titleText.length;
            let displayText = titleText.slice(start) + titleText.slice(0, end);
            document.title = displayText;
            index = (index + 1) % titleText.length;
        }, 500);
    }

    // Function to format large numbers
    function formatNumber(num) {
        if (num >= 1e33) return (num / 1e33).toFixed(2) + ' De';
        if (num >= 1e30) return (num / 1e30).toFixed(2) + ' No';
        if (num >= 1e27) return (num / 1e27).toFixed(2) + ' Oc';
        if (num >= 1e24) return (num / 1e24).toFixed(2) + ' Sp';
        if (num >= 1e21) return (num / 1e21).toFixed(2) + ' Sx';
        if (num >= 1e18) return (num / 1e18).toFixed(2) + ' Qt';
        if (num >= 1e15) return (num / 1e15).toFixed(2) + ' Qn';
        if (num >= 1e12) return (num / 1e12).toFixed(2) + ' T';
        if (num >= 1e9) return (num / 1e9).toFixed(2) + ' B';
        if (num >= 1e6) return (num / 1e6).toFixed(2) + ' M';
        if (num >= 1e3) return (num / 1e3).toFixed(2) + ' K';
        return num.toFixed(2);
    }

    // Upgrade definitions (ordered by cost)
    const upgrades = {
        'power-tap': { button: document.getElementById('power-tap'), countDisplay: document.getElementById('power-tap-count'), value: 1, count: 0, costBase: 10, costMultiplier: 1.5, effect: () => clickValue += 0.5 },
        'swift-finger': { button: document.getElementById('swift-finger'), countDisplay: document.getElementById('swift-finger-count'), value: 1, count: 0, costBase: 25, costMultiplier: 1.5, effect: () => clickMultiplier += 0.01 },
        'flush-power': { button: document.getElementById('flush-power'), countDisplay: document.getElementById('flush-power-count'), value: 1, count: 0, costBase: 50, costMultiplier: 1.5, effect: () => clickValue += 0.3 },
        'ghost-clicker': { button: document.getElementById('ghost-clicker'), countDisplay: document.getElementById('ghost-clicker-count'), value: 0, count: 0, costBase: 100, costMultiplier: 2, effect: () => autoClickValue += 0.2 },
        'plunger-master': { button: document.getElementById('plunger-master'), countDisplay: document.getElementById('plunger-master-count'), value: 1, count: 0, costBase: 150, costMultiplier: 1.5, effect: () => clickValue += 0.5 },
        'lucky-streak': { button: document.getElementById('lucky-streak'), countDisplay: document.getElementById('lucky-streak-count'), value: 0, count: 0, costBase: 200, costMultiplier: 2, effect: () => luckBonus += 0.1 },
        'sewer-rush': { button: document.getElementById('sewer-rush'), countDisplay: document.getElementById('sewer-rush-count'), value: 0, count: 0, costBase: 250, costMultiplier: 2, effect: () => autoClickValue += 0.1 },
        'golden-poop': { button: document.getElementById('golden-poop'), countDisplay: document.getElementById('golden-poop-count'), value: 0, count: 0, costBase: 500, costMultiplier: 2, effect: () => goldenPoopBonus += 0.01 },
        'swift-multiplier': { button: document.getElementById('swift-multiplier'), countDisplay: document.getElementById('swift-multiplier-count'), value: 1, count: 0, costBase: 750, costMultiplier: 2, effect: () => swiftMultiplier += 0.005 },
        'poop-cannon': { button: document.getElementById('poop-cannon'), countDisplay: document.getElementById('poop-cannon-count'), value: 1, count: 0, costBase: 1000, costMultiplier: 2, effect: () => clickValue += 1 },
        'flush-frenzy': { button: document.getElementById('flush-frenzy'), countDisplay: document.getElementById('flush-frenzy-count'), value: 0, count: 0, costBase: 1500, costMultiplier: 2, effect: () => autoClickValue += 0.2 },
        'hyper-multiplier': { button: document.getElementById('hyper-multiplier'), countDisplay: document.getElementById('hyper-multiplier-count'), value: 1, count: 0, costBase: 2000, costMultiplier: 2, effect: () => hyperMultiplier += 0.01 },
        'toilet-upgrade': { button: document.getElementById('toilet-upgrade'), countDisplay: document.getElementById('toilet-upgrade-count'), value: 0, count: 0, costBase: 2500, costMultiplier: 2, effect: () => toiletUpgrade += 0.01 },
        'cosmic-multiplier': { button: document.getElementById('cosmic-multiplier'), countDisplay: document.getElementById('cosmic-multiplier-count'), value: 1, count: 0, costBase: 3000, costMultiplier: 2, effect: () => cosmicMultiplier += 0.015 },
        'toilet-titan': { button: document.getElementById('toilet-titan'), countDisplay: document.getElementById('toilet-titan-count'), value: 1, count: 0, costBase: 3500, costMultiplier: 2, effect: () => clickValue += 1.5 },
        'stink-wave': { button: document.getElementById('stink-wave'), countDisplay: document.getElementById('stink-wave-count'), value: 0, count: 0, costBase: 4000, costMultiplier: 2, effect: () => luckBonus += 0.2 },
        'poop-king': { button: document.getElementById('poop-king'), countDisplay: document.getElementById('poop-king-count'), value: 0, count: 0, costBase: 5000, costMultiplier: 2, effect: () => poopKing += 0.01 },
        'toilet-flush': { button: document.getElementById('toilet-flush'), countDisplay: document.getElementById('toilet-flush-count'), value: 1, count: 0, costBase: 6000, costMultiplier: 2, effect: () => toiletFlush += 0.01 },
        'septic-surge': { button: document.getElementById('septic-surge'), countDisplay: document.getElementById('septic-surge-count'), value: 0, count: 0, costBase: 7000, costMultiplier: 2, effect: () => autoClickValue += 0.3 },
        'golden-flush': { button: document.getElementById('golden-flush'), countDisplay: document.getElementById('golden-flush-count'), value: 1, count: 0, costBase: 8000, costMultiplier: 2, effect: () => goldenFlush += 0.02 },
        'poop-blaster': { button: document.getElementById('poop-blaster'), countDisplay: document.getElementById('poop-blaster-count'), value: 1, count: 0, costBase: 9000, costMultiplier: 2, effect: () => clickValue += 2 },
        'stormy-flush': { button: document.getElementById('stormy-flush'), countDisplay: document.getElementById('stormy-flush-count'), value: 1, count: 0, costBase: 10000, costMultiplier: 2, effect: () => stormyFlush += 0.025 },
        'flush-fury': { button: document.getElementById('flush-fury'), countDisplay: document.getElementById('flush-fury-count'), value: 1, count: 0, costBase: 12000, costMultiplier: 2, effect: () => clickValue += 2.5 },
        'kingly-boost': { button: document.getElementById('kingly-boost'), countDisplay: document.getElementById('kingly-boost-count'), value: 1, count: 0, costBase: 15000, costMultiplier: 2, effect: () => kinglyBoost += 0.03 },
        'bomb-burst': { button: document.getElementById('bomb-burst'), countDisplay: document.getElementById('bomb-burst-count'), value: 1, count: 0, costBase: 20000, costMultiplier: 2, effect: () => bombBurst += 0.04 },
        'stink-bomb': { button: document.getElementById('stink-bomb'), countDisplay: document.getElementById('stink-bomb-count'), value: 0, count: 0, costBase: 25000, costMultiplier: 2, effect: () => stinkBomb += 0.01 },
        'sewer-boost': { button: document.getElementById('sewer-boost'), countDisplay: document.getElementById('sewer-boost-count'), value: 1, count: 0, costBase: 30000, costMultiplier: 2, effect: () => sewerBoost += 0.05 },
        'poop-storm': { button: document.getElementById('poop-storm'), countDisplay: document.getElementById('poop-storm-count'), value: 1, count: 0, costBase: 35000, costMultiplier: 2, effect: () => poopStormMultiplier += 0.005 },
        'plunger-flush': { button: document.getElementById('plunger-flush'), countDisplay: document.getElementById('plunger-flush-count'), value: 1, count: 0, costBase: 40000, costMultiplier: 2, effect: () => plungerFlush += 0.06 },
        'stink-multiplier': { button: document.getElementById('stink-multiplier'), countDisplay: document.getElementById('stink-multiplier-count'), value: 1, count: 0, costBase: 50000, costMultiplier: 2, effect: () => stinkMultiplier += 0.07 },
        'cannon-boost': { button: document.getElementById('cannon-boost'), countDisplay: document.getElementById('cannon-boost-count'), value: 1, count: 0, costBase: 60000, costMultiplier: 2, effect: () => cannonBoost += 0.08 },
        'frenzy-multiplier': { button: document.getElementById('frenzy-multiplier'), countDisplay: document.getElementById('frenzy-multiplier-count'), value: 1, count: 0, costBase: 70000, costMultiplier: 2, effect: () => frenzyMultiplier += 0.09 },
        'titan-boost': { button: document.getElementById('titan-boost'), countDisplay: document.getElementById('titan-boost-count'), value: 1, count: 0, costBase: 80000, costMultiplier: 2, effect: () => titanBoost += 0.1 },
        'wave-multiplier': { button: document.getElementById('wave-multiplier'), countDisplay: document.getElementById('wave-multiplier-count'), value: 1, count: 0, costBase: 90000, costMultiplier: 2, effect: () => waveMultiplier += 0.11 },
        'blaster-boost': { button: document.getElementById('blaster-boost'), countDisplay: document.getElementById('blaster-boost-count'), value: 1, count: 0, costBase: 100000, costMultiplier: 2, effect: () => blasterBoost += 0.12 },
        'surge-multiplier': { button: document.getElementById('surge-multiplier'), countDisplay: document.getElementById('surge-multiplier-count'), value: 1, count: 0, costBase: 120000, costMultiplier: 2, effect: () => surgeMultiplier += 0.13 },
        'fury-boost': { button: document.getElementById('fury-boost'), countDisplay: document.getElementById('fury-boost-count'), value: 1, count: 0, costBase: 150000, costMultiplier: 2, effect: () => furyBoost += 0.14 },
        'poop-vortex': { button: document.getElementById('poop-vortex'), countDisplay: document.getElementById('poop-vortex-count'), value: 1, count: 0, costBase: 200000, costMultiplier: 2, effect: () => poopVortex += 0.15 },
        'flush-chaos': { button: document.getElementById('flush-chaos'), countDisplay: document.getElementById('flush-chaos-count'), value: 1, count: 0, costBase: 250000, costMultiplier: 2, effect: () => flushChaos += 0.16 },
        'septic-storm': { button: document.getElementById('septic-storm'), countDisplay: document.getElementById('septic-storm-count'), value: 1, count: 0, costBase: 300000, costMultiplier: 2, effect: () => septicStorm += 0.17 },
        'prestige-btn': { button: document.getElementById('prestige-btn'), countDisplay: document.getElementById('prestige-btn-count'), value: 0, count: 0, costBase: 1e12, costMultiplier: 1e12, effect: () => prestige() }
    };

    // Dynamically add upgrade containers to sidebar
    function populateUpgrades() {
        sidebar.innerHTML = ''; // Clear existing content
        for (const key in upgrades) {
            const container = document.createElement('div');
            container.className = 'upgrade-container';
            container.innerHTML = `
                <button class="upgrade-btn" id="${key}"><span><span class="icon"></span>${upgrades[key].button.textContent.split('<')[0]}</span><span class="cost"><span>${formatNumber(upgrades[key].costBase)}</span><div class="cost-icon"></div></span></button>
                <button class="max-btn" data-upgrade="${key}">Max</button>
                <span class="upgrade-count" id="${key}-count">0</span>
            `;
            sidebar.appendChild(container);
            upgrades[key].button = container.querySelector(`#${key}`);
            upgrades[key].countDisplay = container.querySelector(`#${key}-count`);
        }
    }

    // Clicker game variables
    let score = 0;
    let clickValue = 1;
    let autoClickValue = 0;
    let clickMultiplier = 1;
    let autoSpeed = 0;
    let luckBonus = 0;
    let goldenPoopBonus = 0;
    let poopStormMultiplier = 1;
    let toiletUpgrade = 0;
    let poopKing = 0;
    let stinkBomb = 0;
    let swiftMultiplier = 1;
    let hyperMultiplier = 1;
    let cosmicMultiplier = 1;
    let toiletFlush = 1;
    let goldenFlush = 1;
    let stormyFlush = 1;
    let kinglyBoost = 1;
    let bombBurst = 1;
    let sewerBoost = 1;
    let plungerFlush = 1;
    let stinkMultiplier = 1;
    let cannonBoost = 1;
    let frenzyMultiplier = 1;
    let titanBoost = 1;
    let waveMultiplier = 1;
    let blasterBoost = 1;
    let surgeMultiplier = 1;
    let furyBoost = 1;
    let poopVortex = 1;
    let flushChaos = 1;
    let septicStorm = 1;
    let prestigeLevel = 0;
    let canClick = false;

    // Prestige function
    function prestige() {
        if (score >= upgrades['prestige-btn'].costBase * Math.pow(100, prestigeLevel)) {
            score = 0;
            clickValue = 1;
            autoClickValue = 0;
            clickMultiplier = 1;
            autoSpeed = 0;
            luckBonus = 0;
            goldenPoopBonus = 0;
            poopStormMultiplier = 1;
            toiletUpgrade = 0;
            poopKing = 0;
            stinkBomb = 0;
            swiftMultiplier = 1;
            hyperMultiplier = 1;
            cosmicMultiplier = 1;
            toiletFlush = 1;
            goldenFlush = 1;
            stormyFlush = 1;
            kinglyBoost = 1;
            bombBurst = 1;
            sewerBoost = 1;
            plungerFlush = 1;
            stinkMultiplier = 1;
            cannonBoost = 1;
            frenzyMultiplier = 1;
            titanBoost = 1;
            waveMultiplier = 1;
            blasterBoost = 1;
            surgeMultiplier = 1;
            furyBoost = 1;
            poopVortex = 1;
            flushChaos = 1;
            septicStorm = 1;
            for (const key in upgrades) {
                upgrades[key].count = 0;
                upgrades[key].value = key.includes('multiplier') || key.includes('boost') || key.includes('flush') || key.includes('storm') || key.includes('vortex') || key.includes('chaos') ? 1 : 0;
            }
            prestigeLevel++;
            updateScore();
        }
    }

    // Calculate total multiplier
    function calculateTotalMultiplier() {
        try {
            const prestigeMultiplier = Math.pow(2.50, prestigeLevel);
            const baseMultiplier = clickMultiplier * poopStormMultiplier * swiftMultiplier * hyperMultiplier * cosmicMultiplier * toiletFlush * goldenFlush * stormyFlush * kinglyBoost * bombBurst * sewerBoost * plungerFlush * stinkMultiplier * cannonBoost * frenzyMultiplier * titanBoost * waveMultiplier * blasterBoost * surgeMultiplier * furyBoost * poopVortex * flushChaos * septicStorm * (goldenPoopBonus > 0 ? 1.01 : 1) * (toiletUpgrade > 0 ? 1.01 : 1) * (poopKing > 0 ? 1.01 : 1) * (stinkBomb > 0 ? 1.01 : 1);
            return parseFloat((prestigeMultiplier * baseMultiplier).toFixed(2));
        } catch (error) {
            console.error('Error calculating multiplier:', error);
            return 1;
        }
    }

    // Update score and UI
    function updateScore() {
        try {
            clickerScore.textContent = `Poop: ${formatNumber(Math.floor(score))}`;
            const totalMultiplier = calculateTotalMultiplier();
            multiplierCounter.textContent = `Multiplier: x${totalMultiplier.toFixed(2)} (Prestige x${Math.pow(2.50, prestigeLevel).toFixed(2)})`;
            const perSecondValue = (autoClickValue + (canClick ? clickValue : 0)) * totalMultiplier;
            perSecond.textContent = `Poop per second: ${formatNumber(perSecondValue.toFixed(1))}`;
            for (const key in upgrades) {
                if (key === 'prestige-btn') {
                    upgrades[key].button.querySelector('.cost span').textContent = formatNumber(Math.floor(upgrades[key].costBase * Math.pow(100, prestigeLevel)));
                    upgrades[key].button.innerHTML = `<span><span class="icon"></span>Prestige</span><span class="cost"><span>${formatNumber(Math.floor(upgrades[key].costBase * Math.pow(100, prestigeLevel)))}</span><div class="cost-icon"></div></span>`;
                } else {
                    const cost = upgrades[key].value > 0 ? Math.floor((upgrades[key].value - 1) * upgrades[key].costMultiplier + upgrades[key].costBase) : Math.floor(upgrades[key].count * upgrades[key].costMultiplier + upgrades[key].costBase);
                    upgrades[key].button.querySelector('.cost span').textContent = formatNumber(cost);
                }
                upgrades[key].countDisplay.textContent = upgrades[key].count;
            }
        } catch (error) {
            console.error('Error updating score:', error);
        }
    }

    // Purchase upgrade function
    function purchaseUpgrade(upgradeKey, max = false) {
        try {
            const upgrade = upgrades[upgradeKey];
            let purchased = 0;
            if (max) {
                let remainingScore = score;
                let cost = upgrade.value > 0 ? Math.floor((upgrade.value - 1) * upgrade.costMultiplier + upgrade.costBase) : Math.floor(upgrade.count * upgrade.costMultiplier + upgrade.costBase);
                while (remainingScore >= cost) {
                    remainingScore -= cost;
                    upgrade.effect();
                    upgrade.count++;
                    if (upgrade.value > 0) {
                        upgrade.value = upgradeKey.includes('multiplier') || upgradeKey.includes('boost') || upgradeKey.includes('flush') || upgradeKey.includes('storm') || upgradeKey.includes('vortex') || upgradeKey.includes('chaos') ? upgrade.value + (upgradeKey === 'swift-finger' ? 0.01 : upgradeKey === 'poop-storm' ? 0.005 : upgradeKey === 'swift-multiplier' ? 0.005 : upgradeKey === 'hyper-multiplier' ? 0.01 : upgradeKey === 'cosmic-multiplier' ? 0.015 : upgradeKey === 'toilet-flush' ? 0.01 : upgradeKey === 'golden-flush' ? 0.02 : upgradeKey === 'stormy-flush' ? 0.025 : upgradeKey === 'kingly-boost' ? 0.03 : upgradeKey === 'bomb-burst' ? 0.04 : upgradeKey === 'sewer-boost' ? 0.05 : upgradeKey === 'plunger-flush' ? 0.06 : upgradeKey === 'stink-multiplier' ? 0.07 : upgradeKey === 'cannon-boost' ? 0.08 : upgradeKey === 'frenzy-multiplier' ? 0.09 : upgradeKey === 'titan-boost' ? 0.1 : upgradeKey === 'wave-multiplier' ? 0.11 : upgradeKey === 'blaster-boost' ? 0.12 : upgradeKey === 'surge-multiplier' ? 0.13 : upgradeKey === 'fury-boost' ? 0.14 : upgradeKey === 'poop-vortex' ? 0.15 : upgradeKey === 'flush-chaos' ? 0.16 : 0.17) : upgrade.value + (upgradeKey === 'power-tap' ? 0.5 : upgradeKey === 'flush-power' ? 0.3 : upgradeKey === 'plunger-master' ? 0.5 : upgradeKey === 'poop-cannon' ? 1 : upgradeKey === 'toilet-titan' ? 1.5 : upgradeKey === 'poop-blaster' ? 2 : 2.5);
                    } else {
                        upgrade.count = upgradeKey === 'ghost-clicker' ? autoClickValue / 0.2 : upgradeKey === 'time-warp' ? autoSpeed / 2 : upgradeKey === 'lucky-streak' ? luckBonus / 0.1 : upgradeKey === 'golden-poop' ? goldenPoopBonus / 0.01 : upgradeKey === 'toilet-upgrade' ? toiletUpgrade / 0.01 : upgradeKey === 'poop-king' ? poopKing / 0.01 : upgradeKey === 'stink-bomb' ? stinkBomb / 0.01 : upgradeKey === 'sewer-rush' ? autoClickValue / 0.1 : upgradeKey === 'flush-frenzy' ? autoClickValue / 0.2 : upgradeKey === 'stink-wave' ? luckBonus / 0.2 : upgradeKey === 'septic-surge' ? autoClickValue / 0.3 : upgrade.count + 1;
                    }
                    cost = upgrade.value > 0 ? Math.floor((upgrade.value - 1) * upgrade.costMultiplier + upgrade.costBase) : Math.floor(upgrade.count * upgrade.costMultiplier + upgrade.costBase);
                    purchased++;
                }
                if (purchased > 0) {
                    score = remainingScore;
                }
            } else {
                const cost = upgrade.value > 0 ? Math.floor((upgrade.value - 1) * upgrade.costMultiplier + upgrade.costBase) : Math.floor(upgrade.count * upgrade.costMultiplier + upgrade.costBase);
                if (score >= cost) {
                    score -= cost;
                    upgrade.effect();
                    upgrade.count++;
                    if (upgrade.value > 0) {
                        upgrade.value = upgradeKey.includes('multiplier') || upgradeKey.includes('boost') || upgradeKey.includes('flush') || upgradeKey.includes('storm') || upgradeKey.includes('vortex') || upgradeKey.includes('chaos') ? upgrade.value + (upgradeKey === 'swift-finger' ? 0.01 : upgradeKey === 'poop-storm' ? 0.005 : upgradeKey === 'swift-multiplier' ? 0.005 : upgradeKey === 'hyper-multiplier' ? 0.01 : upgradeKey === 'cosmic-multiplier' ? 0.015 : upgradeKey === 'toilet-flush' ? 0.01 : upgradeKey === 'golden-flush' ? 0.02 : upgradeKey === 'stormy-flush' ? 0.025 : upgradeKey === 'kingly-boost' ? 0.03 : upgradeKey === 'bomb-burst' ? 0.04 : upgradeKey === 'sewer-boost' ? 0.05 : upgradeKey === 'plunger-flush' ? 0.06 : upgradeKey === 'stink-multiplier' ? 0.07 : upgradeKey === 'cannon-boost' ? 0.08 : upgradeKey === 'frenzy-multiplier' ? 0.09 : upgradeKey === 'titan-boost' ? 0.1 : upgradeKey === 'wave-multiplier' ? 0.11 : upgradeKey === 'blaster-boost' ? 0.12 : upgradeKey === 'surge-multiplier' ? 0.13 : upgradeKey === 'fury-boost' ? 0.14 : upgradeKey === 'poop-vortex' ? 0.15 : upgradeKey === 'flush-chaos' ? 0.16 : 0.17) : upgrade.value + (upgradeKey === 'power-tap' ? 0.5 : upgradeKey === 'flush-power' ? 0.3 : upgradeKey === 'plunger-master' ? 0.5 : upgradeKey === 'poop-cannon' ? 1 : upgradeKey === 'toilet-titan' ? 1.5 : upgradeKey === 'poop-blaster' ? 2 : 2.5);
                    } else {
                        upgrade.count = upgradeKey === 'ghost-clicker' ? autoClickValue / 0.2 : upgradeKey === 'time-warp' ? autoSpeed / 2 : upgradeKey === 'lucky-streak' ? luckBonus / 0.1 : upgradeKey === 'golden-poop' ? goldenPoopBonus / 0.01 : upgradeKey === 'toilet-upgrade' ? toiletUpgrade / 0.01 : upgradeKey === 'poop-king' ? poopKing / 0.01 : upgradeKey === 'stink-bomb' ? stinkBomb / 0.01 : upgradeKey === 'sewer-rush' ? autoClickValue / 0.1 : upgradeKey === 'flush-frenzy' ? autoClickValue / 0.2 : upgradeKey === 'stink-wave' ? luckBonus / 0.2 : upgradeKey === 'septic-surge' ? autoClickValue / 0.3 : upgrade.count + 1;
                    }
                }
            }
            updateScore();
        } catch (error) {
            console.error('Error purchasing upgrade:', error);
        }
    }

    // Auto-click function
    function autoClick() {
        try {
            const totalMultiplier = calculateTotalMultiplier();
            score += autoClickValue * totalMultiplier;
            updateScore();
        } catch (error) {
            console.error('Error in autoClick:', error);
        }
    }

    // Event Listeners
    enterBtn.addEventListener('click', () => {
        enterScreen.style.display = 'none';
        coinScreen.style.display = 'flex';
    });

    headsBtn.addEventListener('click', () => gameOver('Heads'));
    tailsBtn.addEventListener('click', () => gameOver('Tails'));

    ipDisplay.addEventListener('click', () => {
        goToClickerScreen();
    });

    eyeIcon.addEventListener('click', () => {
        goToClickerScreen();
    });

    clickerIp.addEventListener('click', () => {
        if (!canClick) return;
        const totalMultiplier = calculateTotalMultiplier();
        const luckChance = Math.random() < (luckBonus * 0.05);
        const additionalScore = luckChance ? clickValue * 2 : clickValue;
        score += additionalScore * totalMultiplier;
        updateScore();
    });

    // Add event listeners for upgrade buttons
    for (const key in upgrades) {
        upgrades[key].button.addEventListener('click', () => purchaseUpgrade(key));
    }

    // Add event listeners for max buttons
    document.querySelectorAll('.max-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const upgradeKey = btn.getAttribute('data-upgrade');
            if (upgradeKey && !btn.disabled) {
                purchaseUpgrade(upgradeKey, true);
            }
        });
    });

    // Initialize game
    fetchIP();
    updateVisitCount();
    populateUpgrades(); // Populate upgrades in order
    cycleTitle();
    updateScore();

    // Start auto-click interval
    setInterval(autoClick, 1000 - autoSpeed * 100);
});
