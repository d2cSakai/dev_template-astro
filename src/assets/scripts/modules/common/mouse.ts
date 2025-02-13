export class Mouse {
  constructor() {
    console.clear();
    const circleElement = <HTMLElement>document.querySelector('.circle');
    console.log(circleElement);

    // 現在のマウス位置と円の位置を追跡する変数を作成
    const mouse = { x: 0, y: 0 };
    const circle = { x: 0, y: 0 };

    // 前のフレームでマウスの位置を追跡する変数を作成
    const previousMouse = { x: 0, y: 0 };

    // スケーリングと回転を追跡するための変数の初期化
    let currentScale = 0;
    let currentAngle = 0;

    // マウスの移動で変数を更新
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    // カーソル移動速度の速度係数（0 = よりスムーズ、1 = 即座）
    const speed = 0.17;

    // 新しいフレームごとにマウスと円の位置の差を計算し、速度係数を掛ける
    const tick = () => {
      // 動き
      // マウスの位置とスムージングに基づいて円の動きを計算する
      // 速度係数を掛けて、最後に変数を更新する。
      circle.x += (mouse.x - circle.x) * speed;
      circle.y += (mouse.y - circle.y) * speed;

      // 通常のマウスストーカーのxとyの位置
      const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

      // マウス位置の変化（deltaMouse）を計算する。 delta(2つの値または状態の差分を表す用語)
      // 今のマウスの位置から前のマウスの位置を引く
      const deltaMouseX = mouse.x - previousMouse.x;
      const deltaMouseY = mouse.y - previousMouse.y;

      // 前のマウス位置を更新する
      previousMouse.x = mouse.x;
      previousMouse.y = mouse.y;

      // 2ピタゴラスの定理を使ってマウスの速度を計算
      // ただし過度に高い数値が得られる場合があるのでMath.min     *4 は調整数で自由
      const mouseVelocity = Math.min(Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 2, 150);

      // // 3マウスの速度を[0, 0.5]の範囲内の値に変換する。
      const scaleValue = (mouseVelocity / 150) * 0.5;

      // // 4.現在のスケールを滑らかに更新する
      currentScale += (scaleValue - currentScale) * speed;

      // // 5.スケーリング用の変換文字列を作成する。
      const scaleTransform = `scale(${1 + currentScale},${1 - currentScale})`;

      // // 回転
      // // 1.atan2 関数を使って角度を計算する。 マウスがどちらの報告に進んでいるのかを判断する。
      const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;

      // // 2.マウス速度が20を超えた時のみ角度を更新
      if (mouseVelocity > 20) {
        currentAngle = angle;
      }

      // // 3.回転のための変換文字列を作成する。
      const rotateTransform = `rotate(${currentAngle}deg)`;

      if (!circleElement) return;

      // 通常のマウスカーソル
      // circleElement.style.transform = translateTransform;

      // scaleTransformだけを掛けると、横にだけ潰れる
      // circleElement.style.transform = `${translateTransform}${scaleTransform}`;

      // 円要素にすべての変形を特定の順序で適用する：平行移動 -> 回転 -> 拡大縮小
      circleElement.style.transform = `${translateTransform}${rotateTransform}${scaleTransform}`;

      // アニメーションを続けるために次のフレームを要求する
      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
