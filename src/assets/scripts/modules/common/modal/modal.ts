import { $isModalOpen, closeModal, openModal } from './nano-stores.ts';

export class Modal {
  // まず型定義する
  modals: NodeListOf<Element>;

  private SELECTORS = {
    modal: 'data-modal',
    modalContent: 'data-modal-content',
    openButton: 'data-open-button',
    closeButton: 'data-close-button',
    modalId: 'data-modal-id',
  };

  constructor() {
    this.modals = document.querySelectorAll(`[${this.SELECTORS.modal}]`);
    this.init();
  }

  init(): void {
    this.modals.forEach((modal: Element) => {
      const dialog = modal.querySelector<HTMLDialogElement>(`[${this.SELECTORS.modalContent}]`);
      const openButton = modal.querySelector<HTMLButtonElement>(`[${this.SELECTORS.openButton}]`);
      const closeButton = modal.querySelector<HTMLButtonElement>(`[${this.SELECTORS.closeButton}]`);
      const modalId: string | null = modal.getAttribute(this.SELECTORS.modalId);

      // 要素の存在をチェック
      if (!openButton || !dialog || !closeButton || !modalId) return;

      openButton.addEventListener('click', (): void => openModal(modalId));

      closeButton.addEventListener('click', (event: Event): void => closeModal(modalId));

      // dialog.addEventListener('click', (event: Event): void => {
      //   closeModal(event, dialog, closeButton, modalId);
      // });

      this.watchModalState(dialog, modalId);
    });
  }

  private watchModalState(dialog: HTMLDialogElement, modalId: string): void {
    // Nano Stores の subscribe を利用
    $isModalOpen.subscribe((state) => {
      if (state[modalId]) {
        this.openModal(dialog);
      } else {
        this.hideModal(dialog);
      }
    });
  }

  private openModal(dialog: HTMLDialogElement): void {
    // 要素の存在をチェック
    if (!dialog) return;

    dialog.showModal();
    // モーダルが開いた一瞬後に、data-modal-contentをopenに変更(アニメーション実行)
    requestAnimationFrame(() => {
      dialog.setAttribute(`${this.SELECTORS.modalContent}`, 'open');
    });
  }

  private closeModal(event: Event, dialog: HTMLDialogElement, closeButton: HTMLButtonElement, modalId: string): void {
    if (event.target === dialog || event.currentTarget === closeButton) {
      dialog.addEventListener('transitionend', () => dialog.close(), { once: true });
      dialog.setAttribute(`${this.SELECTORS.modalContent}`, 'close');
      closeModal(modalId);
    }
  }

  private hideModal(dialog: HTMLDialogElement): void {
    dialog.setAttribute(`${this.SELECTORS.modalContent}`, 'close');
    dialog.close();
  }
}
