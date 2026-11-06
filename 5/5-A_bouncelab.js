const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const info = document.getElementById("info");   // 5_stage.html の <p id="info">

let x = 100;          // 丸の中心の位置
let y = 80;
let vx = 180;         // 横の速さ（1秒に180px）
let vy = 140;         // 縦の速さ（1秒に140px。＋ は下へ）
let r = 14;         // 半径
const gravity=400;
let ballColor = "#ffd166"; // 初期の丸の色（黄色）
const colors = ["#ffd166", "#06d6a0", "#118ab2", "#ef476f", "#8338ec"]; // 切り替え用カラー一覧
let colorIndex = 0;
let last = performance.now();

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    vx = vx * 1.2;   // 速さを1.2倍（向きはそのまま）
    vy = vy * 1.2;
  }
  if(e.code === "ArrowDown"){
    vx=vx * 0.8;
    vy=vy * 0.8;// ここに、ほかのキーを足す
  }
  if(e.code==="ArrowRight"){
    r=r+4;
    if(r>60)r=60;
  }
   if(e.code==="ArrowLeft"){
    r=r-4;
    if(r<4)r=4;
  }
  if(e.code==="KeyC"){
    colorIndex=(colorIndex+1)% colors.length;
    ballColor=colors[colorIndex];
  }
});


function update(dt) {
  vy=vy+gravity*dt;
  x = x + vx * dt;
  y = y + vy * dt;

  // 左右の壁（丸は x が中心なので、半径 r を足し引きする）
  if (x + r > canvas.width) {
    x = canvas.width - r;
    vx = -vx;
  }
  if (x - r < 0) {
    x = r;
    vx = -vx;
  }
  // 上下の壁
  if (y + r > canvas.height) {
    y = canvas.height - r;
    vy = -vy;
  }
  if (y - r < 0) {
    y = r;
    vy = -vy;
  }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = ballColor;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

// now：今回呼ばれた時刻（ミリ秒）。requestAnimationFrame が引数で渡してくれる
function loop(now) {
  const dt = (now - last) / 1000;   // 前回からの時間（秒）
  last = now;                       // 今回の時刻を、次の「前回」として覚えておく

  info.textContent = "dt：" + dt.toFixed(4) + " 秒　／　1秒に約 " + (1 / dt).toFixed(0) + " 回";

  update(dt);
  draw();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);