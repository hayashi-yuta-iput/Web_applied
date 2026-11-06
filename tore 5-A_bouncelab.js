[1mdiff --git a/5/5-A_bouncelab.js b/5/5-A_bouncelab.js[m
[1mindex 8196045..678c914 100644[m
[1m--- a/5/5-A_bouncelab.js[m
[1m+++ b/5/5-A_bouncelab.js[m
[36m@@ -6,10 +6,39 @@[m [mlet x = 100;          // 丸の中心の位置[m
 let y = 80;[m
 let vx = 180;         // 横の速さ（1秒に180px）[m
 let vy = 140;         // 縦の速さ（1秒に140px。＋ は下へ）[m
[31m-const r = 14;         // 半径[m
[32m+[m[32mlet r = 14;         // 半径[m
[32m+[m[32mconst gravity=400;[m
[32m+[m[32mlet ballColor = "#ffd166"; // 初期の丸の色（黄色）[m
[32m+[m[32mconst colors = ["#ffd166", "#06d6a0", "#118ab2", "#ef476f", "#8338ec"]; // 切り替え用カラー一覧[m
[32m+[m[32mlet colorIndex = 0;[m
 let last = performance.now();[m
 [m
[32m+[m[32mdocument.addEventListener("keydown", (e) => {[m
[32m+[m[32m  if (e.code === "ArrowUp") {[m
[32m+[m[32m    vx = vx * 1.2;   // 速さを1.2倍（向きはそのまま）[m
[32m+[m[32m    vy = vy * 1.2;[m
[32m+[m[32m  }[m
[32m+[m[32m  if(e.code === "ArrowDown"){[m
[32m+[m[32m    vx=vx * 0.8;[m
[32m+[m[32m    vy=vy * 0.8;// ここに、ほかのキーを足す[m
[32m+[m[32m  }[m
[32m+[m[32m  if(e.code==="ArrowRight"){[m
[32m+[m[32m    r=r+4;[m
[32m+[m[32m    if(r>60)r=60;[m
[32m+[m[32m  }[m
[32m+[m[32m   if(e.code==="ArrowLeft"){[m
[32m+[m[32m    r=r-4;[m
[32m+[m[32m    if(r<4)r=4;[m
[32m+[m[32m  }[m
[32m+[m[32m  if(e.code==="KeyC"){[m
[32m+[m[32m    colorIndex=(colorIndex+1)% colors.length;[m
[32m+[m[32m    ballColor=colors[colorIndex];[m
[32m+[m[32m  }[m
[32m+[m[32m});[m
[32m+[m
[32m+[m
 function update(dt) {[m
[32m+[m[32m  vy=vy+gravity*dt;[m
   x = x + vx * dt;[m
   y = y + vy * dt;[m
 [m
[36m@@ -35,7 +64,7 @@[m [mfunction update(dt) {[m
 [m
 function draw() {[m
     ctx.clearRect(0, 0, canvas.width, canvas.height);[m
[31m-ctx.fillStyle = "#ffd166";[m
[32m+[m[32mctx.fillStyle = ballColor;[m
   ctx.beginPath();[m
   ctx.arc(x, y, r, 0, Math.PI * 2);[m
   ctx.fill();[m
