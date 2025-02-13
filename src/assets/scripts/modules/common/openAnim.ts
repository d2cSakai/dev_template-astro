import gsap from 'gsap';

interface CanvasSize {
  width: number;
  height: number;
}

interface Point {
  currentY: number;
  curveY: number;
}

interface EffectConfig {
  flag: boolean;
}

export class OpenAnim {
  // 型定義
  loader: HTMLDivElement | null;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  canvasSize: CanvasSize;
  point: Point;

  constructor() {
    this.loader = document.querySelector('[data-loader]');
    this.canvas = document.createElement('canvas');
    // getContext() canvas要素の持つ要素 '2d'を渡すと2Dグラフィックを描画するためのメソッドやプロパティをもつオブジェクトを返す
    this.ctx = this.canvas.getContext('2d');

    this.canvasSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // 現在のYの位置をcanvasの高さに指定  カーブしたYの位置をcanvasの高さに指定
    this.point = {
      currentY: this.canvas.height,
      curveY: this.canvas.height,
    };

    this.init();
  }

  private init() {
    this.setCanvas();
    this.setTextJs();
    this.timeLineCanvas();
    this.timeLineGsap();
  }

  setCanvas(): void {
    if (!(this.canvas.width && this.canvas.height && this.loader)) return;
    // devicePixelRatio デバイスのピクセル比
    // canvasの横幅を 画面横幅 * 2 もしくは 画面横幅 * デバイスのピクセル比
    this.canvas.width = this.canvasSize.width * Math.min(2, window.devicePixelRatio);
    this.canvas.height = this.canvasSize.height * Math.min(2, window.devicePixelRatio);

    // 計算結果をstyleに反映
    this.canvas.style.width = `${this.canvasSize.width}px`;
    this.canvas.style.height = `${this.canvasSize.height}px`;

    this.loader.appendChild(this.canvas);
  }

  private setTextJs(): void {
    const text = document.querySelector('[data-text]');
    const stringTexts = 'Thank you JavaScript!';
    const innerText = `<span data-text-first>${stringTexts}</span>`;

    if (!text) return;
    text.innerHTML = innerText;

    gsap.set('[data-text-first]', {
      color: '#fff',
      opacity: 0,
      y: 50,
    });
  }

  private setTextTs(): void {
    const stringTexts = 'Hello TypeScript!';
    let innerText = '';
    stringTexts.split('').forEach((stringText) => {
      innerText += `<span data-text-second>${stringText}</span>`;
    });
    const text = document.querySelector('[data-text]');
    if (!text) return;
    text.innerHTML = innerText;

    gsap.set('[data-text-second]', {
      color: '#111',
      opacity: 0,
      scale: 2,
      filter: 'blur(10px)',
    });
  }

  private randomAnim(): void {
    this.setTextTs();
    const texts = document.querySelectorAll('[data-text-second]');
    texts.forEach((text) => {
      const randomDelay = gsap.utils.random(0, 0.8, true); // 0から3秒の間のランダムな遅延
      gsap.to(text, {
        duration: 0.8,

        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',

        delay: randomDelay,
      });
    });
  }

  private curveUpdate(flag: boolean) {
    if (!this.ctx) return;
    // clearRect(x,y,幅,高さ)　キャンバス全体を消去、アニメーションの各フレームの開始時に必要
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#03031D';

    // 黒い背景を描画
    if (flag) {
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = '#fff';
    }

    this.ctx.beginPath(); // サブパスのリストを空にして新しいパスを開始
    this.ctx.moveTo(0, 0); // 指定された座標で指定されたポイントで新しいサブパスを開始
    this.ctx.lineTo(0, this.point.currentY); // サブパスの最後の点を指定された座標に接続、現在のサブパスに直線を追加
    // 現在のサブパスに2次ベジェ曲線を追加。2つのポイントが必要。最初のポイントは制御ポイント、2番目のポイントは終了ポイント。
    this.ctx.quadraticCurveTo(
      this.point.currentY,
      this.point.curveY * 1.25,
      this.canvas.width / 0.4,
      -(this.canvas.height / 10),
    );
    this.ctx.lineTo(this.canvas.width, 0);
    this.ctx.closePath(); // 現在のポイントから現在のサブパスの始点まで直線を追加
    this.ctx.fill(); // 現在のパス、または指定されたパスを現在のパスで埋める
  }

  private timeLineCanvas() {
    // アニメーションのテンプレートを作成
    gsap.registerEffect({
      name: 'curveEffect',
      defaults: {
        flag: true,
      },

      // effect registerEffectの記述作法
      // configアニメーションの内容が呼び出される
      effect: (targets: HTMLCanvasElement, config: EffectConfig) => {
        const tl = gsap
          .timeline({
            // アニメーション開始から終了までの間、処理され続ける
            onUpdate: () => {
              this.curveUpdate(config.flag);
            },
          })
          .to(targets, {
            curveY: 0,
            duration: 0.8,
            ease: 'power4.out',
          })
          .to(
            targets,
            {
              currentY: 0,
              duration: 0.8,
            },
            // 前のアニメーションの開始
            '<',
          );
        return tl;
      },
    });
  }

  private timeLineText(): gsap.core.Timeline {
    const tl = gsap
      .timeline()
      .to('[data-text-first]', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
      })
      .to(
        '[data-text-first]',
        {
          opacity: 0,
          y: -40,
          duration: 0.8,
          ease: 'power4.out',
        },
        '-=0.2',
      );
    return tl;
  }

  private timeLineGsap(): void {
    gsap
      .timeline({ delay: 1 })
      // registerEffectを呼び出し
      .add(gsap.effects.curveEffect(this.point))
      .add(this.timeLineText())
      .set(this.point, {
        currentY: this.canvas.height,
        curveY: this.canvas.height,
      })
      .add(gsap.effects.curveEffect(this.point, { flag: false }), '+=0.2')
      .from(
        '[data-visual] img',
        {
          autoAlpha: 0,
          scale: 0.96,
          y: 32,
          duration: 0.8,
        },
        '-=0.1',
      )
      .add(this.randomAnim.bind(this), '-=0.2');
  }
}
