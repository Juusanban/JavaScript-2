class Enemy {
    constructor() {
        this.img = document.getElementById("enemy");
        this.x = Math.random() * 500 + 50;
        this.y = -40;
        this.width = 80;
        this.height = 80;
        this.speed = Math.random() * 3 + 2;
        this.shot = false;
    }

    move() {
        this.y += this.speed;
    }

    draw() {
        ctx.drawImage(this.img, this.x - 40, this.y - 40, this.width, this.height);
    }

    shoot() {
        let dx = ship.x - this.x;
        let dy = ship.y - this.y;
        let len = Math.sqrt(dx * dx + dy * dy);

        if (len === 0) {
            len = 1;
        }

        let sx = dx / len * 6;
        let sy = dy / len * 6;

        bullets.push(new Bullet(this.x, this.y, sx, sy, false));
    }

    isOutside() {
        if (this.y > 650) {
            return true;
        }
        return false;
    }
}