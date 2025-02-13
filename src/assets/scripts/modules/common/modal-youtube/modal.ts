import { displayModalYoutube } from './youtube-options';

export class ModalYoutube {
  private modals: NodeListOf<HTMLDivElement>;

  private selectors = {
    modal: 'data-modal',
    content: 'data-modal-content',
    openButton: 'data-modal-open-button',
    closeButton: 'data-modal-close-button',
  };

  constructor() {
    this.modals = document.querySelectorAll(`[${this.selectors.modal}]`);
    this.init();
  }

  private init(): void {
    this.modals.forEach((modal) => {
      const content = modal.querySelector<HTMLDialogElement>(`[${this.selectors.content}]`);
      const openButton = modal.querySelector<HTMLButtonElement>(`[${this.selectors.openButton}]`);
      const closeButton = modal.querySelector<HTMLButtonElement>(`[${this.selectors.closeButton}]`);

      // 要素の存在をチェック
      if (!openButton || !content || !closeButton) return;

      openButton.addEventListener('click', (): void => {
        this.openModal(content);
        displayModalYoutube(content);
      });

      content.addEventListener('click', (event: Event): void => {
        this.closeModal(event, content, closeButton);
      });

      closeButton.addEventListener('click', (event: Event): void => {
        this.closeModal(event, content, closeButton);
      });
    });
  }

  // モーダルを開く
  private openModal = (content: HTMLDialogElement): void => {
    // 要素の存在をチェック
    if (!content) return;

    content.showModal();
    // モーダルが開いた一瞬後に、data-modalをopenに変更(アニメーション実行)
    requestAnimationFrame(() => {
      content.setAttribute(`${this.selectors.content}`, 'open');
    });
  };

  // モーダルを閉じる
  private closeModal = (event: Event, content: HTMLDialogElement, closeButton: HTMLButtonElement): void => {
    // 要素の存在をチェック
    if (!content) return;

    if (event.target === content || event.currentTarget === closeButton) {
      // transitionend実行のタイミングでclose()を実行
      content.addEventListener('transitionend', () => content.close(), { once: true });
      // data-modalをcloseに変更(閉じるアニメーション実行)
      content.setAttribute(`${this.selectors.content}`, 'close');
    }
  };
}
