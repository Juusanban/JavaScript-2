# Simple Shooting Game

JavaScriptとCanvasを使用して作成したシンプルなシューティングゲームです。

マウスで自機を操作し、クリックで弾を発射して敵を倒します。
敵や敵の弾に当たるとゲームオーバーになります。

## 遊び方

1. マウスを動かして自機を操作します
2. Canvas上をクリックして弾を発射します
3. 上から出現する敵を倒します
4. 敵を倒すとスコアが1増えます
5. 敵または敵の弾に当たるとゲームオーバーです
6. `Restart` ボタンでゲームを再開できます

## 機能

* マウスによる自機の移動
* クリックによる弾の発射
* ランダムな位置と速度で敵を生成
* 敵から自機の方向へ弾を発射
* 自機が画面の外に出ないように制御
* 弾と敵の当たり判定
* 自機と敵の当たり判定
* 自機と敵弾の当たり判定
* 画面外に出たオブジェクトの削除
* スコア表示
* ゲームオーバー表示
* Restart機能

## 使用技術

* HTML
* CSS
* JavaScript
* Canvas API

## JavaScript Files

* `game.js`：ゲーム全体の処理
* `ship.js`：自機の移動と攻撃
* `enemy.js`：敵の移動と攻撃
* `bullet.js`：弾の移動と描画
* `utils.js`：円の描画と距離の計算

## Files

* `index.html`
* `style.css`
* `game.js`
* `ship.js`
* `enemy.js`
* `bullet.js`
* `utils.js`
* `space08.png`
* `space_kaseijin.png`
* `README.md`
