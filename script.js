document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const scoreDisplay = document.getElementById('score-display');
    const perSecond = document.getElementById('per-second');
    const button = document.getElementById('button');
    const upgradeContainer = document.getElementById('upgrade-container');

    // Game variables
    let score = 0;
    let clickValue = 1;
    let autoClickValue = 0;
    let autoClickInterval;

    // Upgrade definitions
    const upgrades = [
        { id: 'cursor', name: 'Auto-Clicker', cost: 10, count: 0, effect: () => { autoClickValue += 0.1; startAutoClick(); } },
        { id: 'grandma', name: 'Point Generator', cost: 50, count: 0, effect: () => { autoClickValue += 0.5; } },
        { id: 'factory', name: 'Click Boost', cost: 100, count: 0, effect: () => { clickValue += 1; } },
        { id: 'mine', name: 'Super Click', cost: 500, count: 0, effect: () => { clickValue += 5; } },
        { id: 'shipment', name: 'Auto-Boost', cost: 1000, count: 0, effect: () => { autoClickValue += 10; } }
    ];

    // Function to update display
    function updateDisplay() {
        scoreDisplay.textContent = `Points: ${Math.floor(score)}`;
        perSecond.textContent = `Points per second: ${autoClickValue.toFixed(1)}`;
        upgrades.forEach(upgrade => {
            const btn = document.getElementById(upgrade.id);
            btn.textContent = `${upgrade.name} - Cost: ${upgrade.cost} (Owned: ${upgrade.count})`;
            btn.disabled = score < upgrade.cost;
        });
    }

    // Function to handle button click
    function clickButton() {
        score += clickValue;
        updateDisplay();
    }

    // Function to start or update auto-click interval
    function startAutoClick() {
        if (autoClickInterval) clearInterval(autoClickInterval);
        autoClickInterval = setInterval(() => {
            score += autoClickValue;
            updateDisplay();
        }, 1000);
    }

    // Function to purchase upgrades
    function purchaseUpgrade(upgrade) {
        if (score >= upgrade.cost) {
            score -= upgrade.cost;
            upgrade.count++;
            upgrade.effect();
            upgrade.cost = Math.floor(upgrade.cost * 1.5); // Increase cost for next purchase
            updateDisplay();
        }
    }

    // Dynamically create upgrade buttons
    upgrades.forEach(upgrade => {
        const btn = document.createElement('button');
        btn.id = upgrade.id;
        btn.className = 'upgrade-btn';
        btn.onclick = () => purchaseUpgrade(upgrade);
        upgradeContainer.appendChild(btn);
    });

    // Initialize game
    updateDisplay();
    startAutoClick();
});
