export class Accordion {
  // まず型定義する。
  private accordions: NodeListOf<HTMLDetailsElement>;
  private ANIMATION_TIME: number;
  private OFFSET_TIME: number;

  private titleHeight: number;
  private contentHeight: number;

  constructor(titleHeight: number, contentHeight: number) {
    this.ANIMATION_TIME = 250;
    this.OFFSET_TIME = 5;
    this.accordions = document.querySelectorAll('[data-accordion-open]');

    this.titleHeight = titleHeight;
    this.contentHeight = contentHeight;

    this.init();
  }

  init() {
    this.accordions.forEach((accordion: HTMLDetailsElement): void => {
      const title: HTMLElement | null = accordion.querySelector('summary');

      // 要素の存在チェック
      if (!title) return;
      title.addEventListener('click', (e: Event) => {
        // すぐにopen属性が切り替わらないようにする。
        e.preventDefault();
        const content: HTMLElement | null = accordion.querySelector('[data-accordion-content]');
        if (!(title && content)) return;
        // タイトルと中身の高さを取得 (必ずクリック後)
        this.titleHeight = title.offsetHeight;
        this.contentHeight = content.offsetHeight;

        // 閉じる時の高さ 初期値height :autoをsetPropertyでCSSを直接書き換え
        // クリックしたらまず、アコーディオンの高さをタイトルの高さにする。
        accordion.style.setProperty('--acc-height--closed', `${this.titleHeight}px`);

        this.toggle(accordion);
      });
    });
  }

  private toggle(accordion: HTMLDetailsElement) {
    const hasOpenAttribute: boolean = !accordion.getAttribute('data-accordion-open');
    if (!accordion.open && !hasOpenAttribute) {
      this.accordionOpen(accordion);
    } else if (accordion.open) {
      this.accordionClose(accordion);
    }

    // details 'toggle' イベント
    accordion.addEventListener('toggle', () => {
      if (!accordion.open && !hasOpenAttribute) {
        accordion.setAttribute('data-accordion-open', 'false');
      } else if (accordion.open && hasOpenAttribute) {
        accordion.setAttribute('data-accordion-open', 'true');
      }
    });
  }

  private setHeightAccordion(accordion: HTMLDetailsElement): void {
    accordion.style.setProperty('--acc-height--opened', `${this.titleHeight + this.contentHeight}px`);
  }

  private accordionClose(accordion: HTMLDetailsElement): void {
    this.setHeightAccordion(accordion);

    setTimeout((): void => {
      accordion.setAttribute('data-accordion-open', 'false');
    }, this.OFFSET_TIME);

    setTimeout((): void => {
      accordion.open = false;
    }, this.ANIMATION_TIME + this.OFFSET_TIME);
  }

  private accordionOpen(accordion: HTMLDetailsElement): void {
    // open属性を最初にセット
    accordion.open = true;

    // コンテンツの高さはopenをつけた後で取得しないと iOSで0になる。
    this.setHeightAccordion(accordion);

    //open付与から少し遅らせることで動作が安定する
    setTimeout((): void => {
      accordion.setAttribute('data-accordion-open', 'true');
    }, this.OFFSET_TIME);
  }
}
