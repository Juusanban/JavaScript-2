class Ship {
    constructor() {
        this.img = document.getElementById("ship");
        this.x = 300;
        this.y = 500;
        this.width = 80;
        this.height = 80;
    }

    move(mouseX, mouseY) {
        this.x = mouseX;
        this.y = mouseY;

        if (this.x < 40) {
            this.x = 40;
        }
        if (this.x > 560) {
            this.x = 560;
        }
        if (this.y < 40) {
            this.y = 40;
        }
        if (this.y > 560) {
            this.y = 560;
        }
    }

    draw() {
        ctx.drawImage(this.img, this.x - 40, this.y - 40, this.width, this.height);
    }

    shoot() {
        bullets.push(new Bullet(this.x, this.y - 35, 0, -12, true));
    }
}