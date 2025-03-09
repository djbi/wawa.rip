let trail = [];
function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    textSize(20);
}
function draw() {
    clear();
    trail.forEach((t, index) => {
        let col = color(t.col);
        col.setAlpha(t.alpha);
        fill(col);
        noStroke();
        push();
        translate(t.x, t.y);
        rotate(-45 * (PI / 180));
        text('♡', 0, 0);
        pop();
        t.alpha -= 255 / (1.2 * 60);
        if (t.alpha <= 0) trail.splice(index, 1);
    });
}
function mouseMoved() {
    const cursor = document.getElementById('custom-cursor');
    const cursorColor = window.getComputedStyle(cursor).color;
    trail.push({
        x: mouseX,
        y: mouseY,
        col: cursorColor,
        alpha: 255
    });
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
