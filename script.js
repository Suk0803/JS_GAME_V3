const canvas = document.getElementById('game_canvas');

// get context
const ctx = canvas.getContext('2d');

ctx.strokeStyle = 'black';

class GameObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  update() {
    this.x += 1;
    if (this.x > canvas.width) {
      this.x = 0;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, 10, 10);
    ctx.stroke();
  }
}

class Player extends GameObject {
  update() {}
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
  }
}
class Game {
  constructor() {
    this.width = canvas.width;
    this.height = canvas.height;
    console.log(this.width, this.height);
    this.game_object = new GameObject(100, 100);
    this.Player = new Player(this.width / 2, this.height / 2);
  }

  update() {
    //console.log('update' + new Date());
    this.game_object.update();
    this.Player.update();
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();
    ctx.clearRect(0, 0, this.width, this.height);
    this.game_object.draw();
    this.Player.draw();
  }

  onKeyDown(key) {
    if (key == 'ArrowLeft') {
      this.Player.x -= 1;
      if (this.Player.x < 0) this.Player.x = this.width;
    } else if (key == 'ArrowRight') {
      this.Player.x += 1;
      if (this.Player.x > this.width) this.Player.x = 0;
    } else if (key == 'ArrowUp') {
      this.Player.y -= 1;
      if (this.Player.y < 0) this.Player.y = this.height;
    } else if (key == 'ArrowDown') {
      this.Player.y += 1;
      if (this.Player.y > this.height) this.Player.y = 0;
    }
  }
}

const game = new Game();

function gameLoop() {
  game.update();
  game.draw();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

document.addEventListener('keydown', function (event) {
  // console.log(event.key);
  game.onKeyDown(event.key);
});
