class Bullet {
    constructor(x, y, sx, sy, isPlayer) {
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
        this.isPlayer = isPlayer;
        this.radius = 5;
    }

    move() {
        this.x += this.sx;
        this.y += this.sy;
    }

    draw() {
        if (this.isPlayer) {
            drawCircle(this.x, this.y, this.radius, "cyan");
        } else {
            drawCircle(this.x, this.y, this.radius, "red");
        }
    }

    isOutside() {
        if (this.x < -20 || this.x > 620 || this.y < -20 || this.y > 620) {
            return true;
        }
        return false;
    }
}