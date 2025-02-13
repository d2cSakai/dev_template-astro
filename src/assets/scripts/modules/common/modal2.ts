// ====================================
// abstractを追加する
// ====================================
export abstract class Modal2 {
  backgroundColor: string;

  // セレクター
  private selectors = {
    body: 'body',
    openButton: 'data-modal-open',
  };

  // 使用要素
  // ====================================
  // 1. protectedを使うことで、継承先のクラスでも使用できるようにする
  // ====================================
  protected elements: {
    modal: HTMLDivElement | null;
    body: HTMLBodyElement | null;
    openButton: HTMLButtonElement | null;
  };

  constructor(modal: HTMLDivElement, backgroundColor: string) {
    this.elements = {
      modal: modal,
      body: document.querySelector(this.selectors.body),
      openButton: modal.querySelector(`[${this.selectors.openButton}]`),
    };

    this.backgroundColor = backgroundColor;
    this.init();
  }

  private init(): void {
    this.openModal();
    this.closeModal();
  }

  private openModal(): void {
    if (!this.elements.openButton) return;

    // モーダルを開くボタンをクリックした時の処理
    this.elements.openButton.addEventListener('click', () => {
      if (!this.elements.modal || !this.elements.body) return;

      // data-content属性open、背景色を変更
      this.elements.modal.setAttribute('data-content', 'open');
      this.elements.body.style.backgroundColor = this.backgroundColor;
    });
  }

  private closeModal(): void {
    if (!this.elements.modal) return;
    const closeButton = this.elements.modal.querySelector('[data-modal-close]');

    if (!closeButton) return;

    // モーダルを閉じるボタンをクリックした時の処理
    closeButton.addEventListener('click', () => {
      if (!this.elements.modal || !this.elements.body) return;

      // data-content属性open、背景色を元に戻す
      this.elements.modal.setAttribute('data-content', '');
      this.elements.body.style.backgroundColor = '#fff';
    });
  }

  // 子クラスで実装する必要がある抽象メソッド
  protected abstract animation(): void;
}

// 1. 継承を使う場合は、class 新しいclass名 extends 継承するclass と記述する
export class AddAnimationModal extends Modal2 {
  // 2. コンストラクターには、継承するクラスの引数と追加で必要な引数を設定する
  // super()を使って継承するclassのコンストラクターを呼び出す
  constructor(modal: HTMLDivElement, backgroundColor: string) {
    super(modal, backgroundColor);

    this.animationInit();
  }

  private animationInit(): void {
    this.animation();
  }

  // ====================================
  // protectedを使うことで、継承元のクラスで実装したメソッドを継承先のクラスで使用できるようにする
  // ====================================
  // 3.新しい必要な機能を実装する
  protected animation(): void {
    if (!this.elements.modal) return;
    const modalText: HTMLParagraphElement | null = this.elements.modal.querySelector('[data-modal-text]');

    if (!modalText) return;
    modalText.style.transition = 'all .5s';
    modalText.style.opacity = '0';
    modalText.style.transform = 'translateY(30px)';

    if (!this.elements.openButton) return;
    this.elements.openButton.addEventListener('click', () => {
      setTimeout(() => {
        modalText.style.opacity = '1';
        modalText.style.transform = 'translateY(0)';
      }, 100);
    });
  }
}
