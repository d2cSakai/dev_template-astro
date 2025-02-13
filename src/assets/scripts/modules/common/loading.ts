interface DefaultOptions {
  isTop: boolean;
  isFirstTime: boolean;
}

export class Loading {
  // まず型定義
  defaultOptions: DefaultOptions;
  options: Partial<DefaultOptions>;

  loadContent: HTMLDivElement | null;
  isVisited: boolean;
  isTop: boolean;

  constructor(options: Partial<DefaultOptions>) {
    this.loadContent = document.querySelector('[data-load-content]');

    // this.isLoaded = false; //読み込み完了フラグ

    this.isTop = false; //トップページかどうか
    this.isVisited = false; //初回読み込みかどうか

    this.defaultOptions = {
      isTop: false, //trueでトップページのみ有効
      isFirstTime: false,
    };

    // Object.assign - 第一引数に指定したコピー先のオブジェクトに、第二引数以降の全てのオブジェクトのプロパティをマージ
    this.options = Object.assign(this.defaultOptions, options);

    this.init();
  }

  private init(): void {
    // 初回訪問かどうかのチェック
    if (this.options.isFirstTime) {
      // もしsessionStorageにvisitedというkey(任意)が設定されていたら、true（既に訪問した）
      this.isVisited = !!sessionStorage.getItem('visited');
    }

    // TOPページかどうか
    if (this.options.isTop) {
      this.checkUrl();
    }

    window.addEventListener('load', this.loading.bind(this));
  }

  // トップページじゃなかった場合は何も行わない。
  public loading() {
    if (!this.isVisited) {
      this.loadFunc();
      return;
    }

    if (this.isTop) {
      this.loadFunc();
      return;
    }
  }

  private checkUrl(): void {
    const topUrl: string = 'http://localhost:3000/loading';
    const currentUrl: string = window.location.href;

    if (topUrl === currentUrl) {
      this.isTop = true;
    }
  }

  private textJsAnim() {
    const textJs = document.querySelector('[data-text-js]');
    if (!textJs) return;
    return new Promise((resolve): void => {
      const anim = textJs.animate(
        {
          opacity: [0, 1, 0],
        },
        {
          fill: 'forwards',
          duration: 1500,
        },
      );

      // アニメーション完了後に解決させる
      anim.onfinish = () => {
        resolve(true);
        console.log('完了');
      };
    });
  }

  private textGbAnim() {
    const textGb = document.querySelector('[data-text-gb]');
    if (!textGb) return;
    return new Promise((resolve) => {
      const anim = textGb.animate(
        {
          opacity: [0, 1],
        },
        {
          fill: 'forwards',
          duration: 1500,
        },
      );

      anim.onfinish = () => {
        resolve(true);
        console.log('完了2');
      };
    });
  }

  private async loadFunc() {
    if (!this.loadContent) return;
    this.loadContent.setAttribute('data-load-content', 'isShow');
    await this.textJsAnim();
    await this.textGbAnim();
    this.loadContent.setAttribute('data-load-content', 'isHidden');

    sessionStorage.setItem('visited', 'true'); // セッションストレージに保存
  }
}
