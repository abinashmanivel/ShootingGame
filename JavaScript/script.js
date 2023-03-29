const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");
console.log(c);

class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}

class Bullet {
  constructor(x, y, radius, color, velocity, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.speed = speed;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x * this.speed;
    this.y = this.y + this.velocity.y * this.speed;
  }
}

class Enemy {
  constructor(x, y, radius, color, velocity, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.speed = speed;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x * this.speed;
    this.y = this.y + this.velocity.y * this.speed;
  }
}
const bullets = [];
const enemies = [];

function spawnEnemies() {
  setInterval(() => {
    const radius = Math.random() * (38 - 5) + 5;
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
      x = Math.random() * canvas.width;
    }
    const color = `rgb(${Math.random() * (200 - 50) + 50},${
      Math.random() * (200 - 50) + 50
    },${Math.random() * (200 - 50) + 50})`;
    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    const speed = 1;

    enemies.push(new Enemy(x, y, radius, color, velocity, speed));
  }, 1000);
}
spawnEnemies();

window.addEventListener("click", (event) => {
  //console.log(event);
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };

  const bullet = new Bullet(
    canvas.width / 2,
    canvas.height / 2,
    5,
    "red",
    velocity,
    4
  );
  bullets.push(bullet);
  // console.log(bullets);
});
const x = canvas.width / 2;
const y = canvas.height / 2;
const player = new Player(x, y, 30, "blue");
let animationid;
function animate() {
  animationid = requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();

  bullets.forEach((bullet, bindex) => {
    bullet.update();
    if (
      bullet.x - bullet.radius < 0 ||
      bullet.x - bullet.radius > canvas.width ||
      bullet.y - bullet.radius < 0 ||
      bullet.y - bullet.radius > canvas.height
    ) {
      setTimeout(() => {
        bullets.splice(bindex, 1);
        enemies.splice(eindex, 1);
      }, 0);
    }
  });
  enemies.forEach((enemy, eindex) => {
    enemy.update();
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (dist - enemy.radius - player.radius < 1) {
      cancelAnimationFrame(animationid);
    }

    bullets.forEach((bullet, bindex) => {
      const dist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y);
      if (dist - enemy.radius - bullet.radius < 1) {
        setTimeout(() => {
          bullets.splice(bindex, 1);
          enemies.splice(eindex, 1);
        }, 0);
      }
    });
  });
}
animate();
