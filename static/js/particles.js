const canvas = document.createElement("canvas");
document.getElementById("particle-bg").appendChild(canvas);

const ctx = canvas.getContext("2d");

let particlesArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

const mouse = {
  x: null,
  y: null,
  radius: 120
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Particle {
  constructor(x, y, dx, dy, size) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "#00ffcc";
    ctx.fill();
  }

  update() {
    if (this.x > canvas.width || this.x < 0) this.dx *= -1;
    if (this.y > canvas.height || this.y < 0) this.dy *= -1;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      this.x -= dx * 0.02;
      this.y -= dy * 0.02;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

function init() {
  particlesArray = [];

  let number = (canvas.width * canvas.height) / 9000;

  for (let i = 0; i < number; i++) {
    let size = 2;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let dx = (Math.random() - 0.5) * 1;
    let dy = (Math.random() - 0.5) * 1;

    particlesArray.push(new Particle(x, y, dx, dy, size));
  }
}

function connect() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 130) {
        ctx.strokeStyle = "rgba(0,255,204,0.12)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(p => p.update());
  connect();

  requestAnimationFrame(animate);
}

init();
animate();
