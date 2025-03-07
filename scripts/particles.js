class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20;
        this.life = 1.5;
        this.alpha = 1;
    }

    update() {
        this.life -= 1 / 60;
        this.alpha = this.life / 1.5;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = `rgba(255, 105, 180, ${this.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff69b4';
        ctx.font = `${this.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText('♡', this.x, this.y + this.size / 2);
        ctx.shadowBlur = 0;
        ctx.restore();
    }
}

class Square {
    constructor(canvas) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 50 + 20;
        this.rotation = 0;
        this.speed = Math.random() * 0.1 + 0.05;
        this.alpha = 1;
    }

    update() {
        this.rotation += this.speed;
        this.alpha = Math.sin(Date.now() * 0.01) * 0.5 + 0.5;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}
