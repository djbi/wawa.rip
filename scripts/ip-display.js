document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('ip-display');
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#008000', '#FF4500', '#00CED1', '#FF69B4'];

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip || 'IP Not Found';
            const spans = [];
            ip.split('').forEach(char => {
                const span = document.createElement('span');
                span.innerText = char;
                display.appendChild(span);
                spans.push(span);
            });
            function updateColors() {
                let usedColors = new Set();
                spans.forEach(span => {
                    let newColor;
                    do {
                        newColor = colors[Math.floor(Math.random() * colors.length)];
                    } while (usedColors.has(newColor));
                    usedColors.add(newColor);
                    span.style.color = newColor;
                });
            }
            updateColors();
            setInterval(updateColors, 1000);
        })
        .catch(error => {
            console.error('IP Fetch Error:', error);
            display.innerText = 'Failed to load IP';
        });
});
