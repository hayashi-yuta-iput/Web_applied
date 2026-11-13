[1mdiff --git a/6/6-A_tuning.js b/6/6-A_tuning.js[m
[1mindex 99a573b..116e791 100644[m
[1m--- a/6/6-A_tuning.js[m
[1m+++ b/6/6-A_tuning.js[m
[36m@@ -7,7 +7,7 @@[m [mconst CONFIG = {[m
   JUMP_SPEED: 900,[m
   MOVE_SPEED: 640,[m
   MAX_JUMPS: 2,[m
[31m-  FALL_GRAVITY_RATE: 2,[m
[32m+[m[32m  FALL_GRAVITY_RATE: 0.5,[m
 };[m
 [m
 const TARGET_HEIGHT = 64;   // 目印の線の高さ（床から64px＝キャラ2つ分）。ぶつからない[m
