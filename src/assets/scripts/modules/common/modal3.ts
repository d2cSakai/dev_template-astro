export class Modal3 {
  // セレクター
  private selectors = {
    modal: 'data-modal',
  };

  // 使用要素
  private elements: {
    modals: NodeListOf<HTMLDivElement> | [];
  };

  constructor() {
    this.elements = {
      modals: document.querySelectorAll(`[${this.selectors.modal}]`),
    };

    this.init();
  }

  private init(): void {
    this.elements.modals.forEach((modal: HTMLDivElement) => {
      const content: HTMLDialogElement | null = modal.querySelector('[data-modal-content]');
      const openButton: HTMLAnchorElement | HTMLButtonElement | null = modal.querySelector('[data-modal-open]');
      const closeButton: HTMLButtonElement | null = modal.querySelector('[data-close-button]');

      // 要素の存在をチェック
      if (!(openButton && content && closeButton)) return;

      // 開くボタンをクリックしたときの処理
      openButton.addEventListener('click', (): void => {
        this.openModal(content);
      });

      // モーダルの背景をクリックしたときの処理
      content.addEventListener('click', (event: Event): void => {
        // event.targetがcontentの場合、背景がクリックされたと判断する
        if (event.target === content) {
          this.closeModal(event, content, closeButton);
        }
      });

      // 閉じるボタンをクリックしたときの処理
      closeButton.addEventListener('click', (event: Event): void => {
        this.closeModal(event, content, closeButton);
        // イベントの伝搬をキャンセルする
        event.stopPropagation();
      });
    });
  }

  private openModal(content: HTMLDialogElement): void {
    // 要素の存在をチェック
    if (!content) return;

    content.showModal();
    // モーダルが開いた一瞬後に、data-modal-contentをopenに変更(アニメーション実行)
    requestAnimationFrame(() => {
      content.setAttribute('data-modal-content', 'open');
    });
  }

  private closeModal(event: Event, content: HTMLDialogElement, closeButton: HTMLButtonElement): void {
    // 要素の存在をチェック
    if (!content) return;

    if (event.target === content || event.target === closeButton) {
      // transitionend実行のタイミングでclose()を実行
      content.addEventListener('transitionend', () => content.close(), {
        once: true,
      });
      // data-modalをcloseに変更(閉じるアニメーション実行)
      content.setAttribute('data-modal-content', 'close');
    }
  }
}
