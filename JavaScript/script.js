const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');
console.log(c)

class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color;
        c.fill();
    }
}

//Ritesh start//
class Bullet {
    constructor(x, y, radius, color, velocity,speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.speed=speed;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color;
        c.fill();
    }
    update() {
        this.draw();
        this.x = this.x + this.velocity.x*this.speed;
        this.y = this.y + this.velocity.y*this.speed;
    }
}

const bullets = []

window.addEventListener('click', (event) => {
    //console.log(event);
    const angle=Math.atan2(event.clientY-canvas.height/2, event.clientX-canvas.width/2);
    const velocity={
        x:Math.cos(angle),
        y:Math.sin(angle)
    }

    const bullet = new Bullet(canvas.width/2,canvas.height/2, 5, 'red',velocity,4);
    bullets.push(bullet);
    // console.log(bullets);

})
const x = canvas.width / 2;
const y = canvas.height / 2;
const player = new Player(x, y, 30, 'blue')


function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    player.draw();
    bullets.forEach((bullet) => {
        bullet.update();
    })
}
animate();
