var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.random() * 1000 * -1 - 100;
    this.y = 50 + ((Math.floor(Math.random() * 3)) * 83);
    this.cxa = this.x;
    this.cxb = this.x + 101;
};

Enemy.prototype.update = function(dt) {
    this.random = Math.floor(Math.random() * 3);
    if (this.random == 0) {
        this.x += dt * 1;
    } else if (this.random == 1) {
        this.x += dt * 160;
    } else {
        this.x += dt * 240;
    }
    if (this.x > 500) {
        this.x = Math.random() * 1000 * -1 - 100;
    }
    this.cxa = this.x;
    this.cxb = this.x + 101;
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 101 * 2;
    this.y = 50 + 83 * 4;
    this.cxa = this.x;
    this.cxb = this.x + 101;
};

Player.prototype.update = function(dt) {
    this.cxa = this.x;
    this.cxb = this.x + 101;
};

Player.prototype.handleInput = function(moveKey) {
    switch (moveKey) {
        case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x += 101;
            }
            break;
        case 'up':
            if (this.y > 50) {
                this.y -= 83;
            } else {
                mark += 1;
                this.x = 101 * 2;
                this.y = 50 + 83 * 4;
            }
            break;
        case 'down':
            if (this.y < 382) {
                this.y += 83;
            }
            break;
    }
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var enemy5 = new Enemy();
var enemy6 = new Enemy();
var enemy7 = new Enemy();
var enemy8 = new Enemy();

allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8];
var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function checkCollisions() {
    allEnemies.forEach(function(enemy) {
        if (enemy.y == player.y) {
            if ((player.cxb > enemy.cxa && player.cxb < enemy.cxa) || (player.cxb > enemy.cxa && player.cxa < enemy.cxb)) {
                player.x = 101 * 2;
                player.y = 50 + 83 * 4;
            }
        }
    });
}
var mark = 0;

function score() {
    ctx.fillStyle = "gold";
    ctx.font = "20px roboto ";
    ctx.fillText("Score: " + mark, 300, 100);
}
