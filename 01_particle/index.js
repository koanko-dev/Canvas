const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";
canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;

ctx.scale(dpr, dpr);

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
  }

  update() {
    this.y += this.vy; // 랜덤한 속도로 떨어지게 하기
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
  }
}

const TOTAL = 20;
const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

let particles = [];

for (let i = 0; i < TOTAL; i++) {
  const x = randomNumBetween(0, canvasWidth);
  const y = randomNumBetween(0, canvasHeight);
  const radius = randomNumBetween(50, 100);
  const vy = randomNumBetween(1, 5);

  const particle = new Particle(x, y, radius, vy);
  particles.push(particle);
}

let interval = 1000 / 60; // 60 fps를 타겟으로 설정
let now, delta;
let then = Date.now();

function animate() {
  window.requestAnimationFrame(animate);

  now = Date.now();
  delta = now - then;

  // delta가 interval 보다 커지는 시점에만 애니메이션 로직 실행
  if (delta < interval) return;

  // 이전 모형 지우기
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    // 공이 반지름 만큼 사라진게 아니라, 모두 사라졌을 때 다시 맨 위로 올리기
    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius;
      particle.x = randomNumBetween(0, canvasWidth);
      particle.radius = randomNumBetween(50, 100);
      particle.vy = randomNumBetween(1, 5);
    }
  });
}

animate();
