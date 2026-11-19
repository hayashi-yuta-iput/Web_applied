// プレイヤー：決まった数・今の値・キー・動き・描き方

const GRAVITY = 2000;
const JUMP_SPEED = 700;
const MOVE_SPEED = 240;
const MAX_JUMPS = 2;          // 地面を離れてから跳べる回数（2段ジャンプ）
const FALL_GRAVITY_RATE = 2;  // 落ちるときは、重力を何倍にするか

const player = { x: 80, y: 20, w: 32, h: 32, vy: 0, isGrounded: false, jumpsLeft: MAX_JUMPS,state:"idle" };
const STATE_COLORS={idle:"#7ef5e1",run:"#6dd3ff",jump:"#ffd166",fall:"#ff9999"};
const keys = {};
document.addEventListener("keydown", (e) => {
  keys[e.code] = true;
  if (e.code === "Space" && player.jumpsLeft > 0) {
    player.vy = -JUMP_SPEED;
    player.jumpsLeft = player.jumpsLeft - 1;
  }
});
document.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

// 床とぶつかったら、位置を戻して、速さを決める
function collideWithFloor() {
  if (player.y + player.h > floor.y) {
    player.y = floor.y - player.h;
    player.vy = 0;
    player.isGrounded = true;
    player.jumpsLeft = MAX_JUMPS;
  } else {
    player.isGrounded = false;
  }
}
//状態を決める関数
function decideState(){
  if(!player.isGrounded){
    if(player.vx<0){
      return "jump";
    }
    return "fall";
  }
  if(player.vx !==0){
    return "run";
  }
  return "idle";
}
// プレイヤーを動かす（★ main.js の update から呼ばれる）
function updatePlayer(dt) {
  player.vx=0;
  if (keys["ArrowRight"]) {
    player.vx=MOVE_SPEED;
  }
  if (keys["ArrowLeft"]) {
    player.vx=-MOVE_SPEED;
  }
  player.x=player.x+player.vx*dt;
  const g = player.vy > 0 ? GRAVITY * FALL_GRAVITY_RATE : GRAVITY;
  player.vy = player.vy + g * dt;
  player.y = player.y + player.vy * dt;
  collideWithFloor();
  player.state=decideState();
}

// プレイヤーを描く（★ main.js の draw から呼ばれる）
function drawPlayer() {
  ctx.fillStyle = STATE_COLORS[player.state];
  ctx.fillRect(player.x, player.y, player.w, player.h);

  ctx.fillStyle = "#e8eeff";
  ctx.font = "14px monospace";
  ctx.fillText("vy = " + player.vy.toFixed(0) + "   jumpsLeft = " + player.jumpsLef+"state="+player.state, 10, 20);
}