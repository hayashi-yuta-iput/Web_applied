const enemies = [
  { name: "スライム", hp: 5 },
  { name: "ゴブリン", hp: 9 },
  { name: "ドラゴン", hp: 20 }
];

let isCleared = false;

// データからリストを作る
function showEnemies() {
  const list = document.getElementById("enemyList");
  list.innerHTML = "";

  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    const li = document.createElement("li");

    // 1体ごとのデータは「enemy」を使います
    if (enemy.hp <= 0) {
      // バッククォート（`）で囲んで変数を展開
      li.innerText = `${enemy.name}（HP：0 - 討伐！）`;
      li.className = "down";
    } else {
      // バッククォート（`）で囲んで変数を展開
      li.innerText = `${enemy.name}（HP：${enemy.hp}）`;
    }
    
    list.appendChild(li);
  }
}

// 全員倒されたかチェック
function checkAllDown() {
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].hp > 0) {
      return false; // まだ生きている敵がいる
    }
  }
  return true; // 全員HPが0以下
}

// 攻撃：全員の HP を 3 減らして、リストを作り直す
function attack() {
  // すでにクリアしていたら何もしない（追加ダメージ防止）
  if (isCleared) {
    return;
  }

  // 全員に3ダメージ
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].hp -= 3;
  }

  // 画面を再描画
  showEnemies();

  // 全員倒したかチェック
  if (checkAllDown()) {
    isCleared = true;

    const clearMessage = document.getElementById("clearMessage");
    clearMessage.innerText = "クリア！！";

    const attackBtn = document.getElementById("attackBtn");
    attackBtn.disabled = true; // ボタンを押せなくする
  }
}

// 最初にリストを表示
showEnemies();