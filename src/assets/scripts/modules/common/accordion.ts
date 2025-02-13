interface AnimOptions {
  duration: number;
  easing: string;
}

export class Accordion {
  // セレクター
  private selectors = {
    accordion: 'data-accordion',
  };

  // 使用要素
  private elements: {
    accordions: NodeListOf<HTMLDetailsElement> | [];
    isAnimating: boolean; //連打防止フラグ
    animOptions: AnimOptions;
  };

  constructor() {
    this.elements = {
      accordions: document.querySelectorAll(`[${this.selectors.accordion}]`),
      isAnimating: false, //連打防止フラグ
      animOptions: {
        duration: 300,
        easing: 'ease-in-out',
      },
    };

    this.init();
  }

  private init(): void {
    this.elements.accordions.forEach((accordion: HTMLDetailsElement): void => {
      const title: HTMLElement | null = accordion.querySelector('[data-accordion-title]');
      const content: HTMLDivElement | null = accordion.querySelector('[data-accordion-content]');

      if (!(title && content)) return; // 要素の存在チェック

      title.addEventListener('click', async (event) => {
        event.preventDefault(); // アニメーション付与のため、デフォルトの挙動を無効化

        if (this.elements.isAnimating) return; // trueだったら以降アニメーションしない。
        this.elements.isAnimating = true; // trueにする

        if (accordion.getAttribute('open') === null) {
          await this.openFunc(accordion, content); // awaitを使用して、非同期処理の完了を待つ。
        } else {
          await this.closeFunc(accordion, content);
        }

        this.elements.isAnimating = false;
      });
    });
  }

  private async openFunc(detail: HTMLDetailsElement, content: HTMLDivElement) {
    return new Promise((resolve): void => {
      detail.setAttribute('open', 'true'); // open属性を付与
      const openingAnim = this.openingAnimation(content); // アコーディオンを開くアニメーション

      // openingAnimが完了したらresolve(解決)する onfinishはアニメーション終了時に実行されるイベントハンドラ
      openingAnim.onfinish = (): void => {
        resolve(true);
      };
    });
  }

  private async closeFunc(detail: HTMLDetailsElement, content: HTMLDivElement) {
    return new Promise((resolve): void => {
      const closingAnim = this.closingAnimation(content); // アコーディオンを閉じるときの処理

      closingAnim.onfinish = (): void => {
        resolve(true);
        detail.removeAttribute('open');
      };
    });
  }

  // アコーディオンを閉じるときのキーフレーム
  private closingAnimation(content: HTMLDivElement) {
    return content.animate(
      [
        {
          height: content.scrollHeight + 'px',
        },
        {
          height: 0,
        },
      ],
      this.elements.animOptions,
    );
  }

  // アコーディオンを開くときのキーフレーム
  private openingAnimation(content: HTMLDivElement) {
    return content.animate(
      [
        {
          height: 0,
        },
        {
          height: content.scrollHeight + 'px',
        },
      ],
      this.elements.animOptions,
    );
  }
}
