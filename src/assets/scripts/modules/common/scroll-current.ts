export class ScrollCurrent {
  // セレクター
  private selectors = {
    section: 'data-section',
  };

  observer: IntersectionObserver;

  options: {
    root: Element | null;
    rootMargin: string;
    threshold: number;
  };

  // 使用要素
  private elements: {
    sections: NodeListOf<HTMLDivElement> | [];
  };

  constructor() {
    this.elements = {
      sections: document.querySelectorAll(`[${this.selectors.section}]`),
    };

    this.options = {
      root: null,
      rootMargin: '-50% 0px', // ビューポートの中心を判定基準にする
      threshold: 0,
    };

    this.observer = new IntersectionObserver(this.doWhenIntersect.bind(this), this.options);
    this.init();
  }

  private init(): void {
    this.elements.sections.forEach((section) => {
      this.observer.observe(section);
    });
  }

  private doWhenIntersect(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.currentIndex(entry.target);
      }
    });
  }

  private currentIndex(element: Element): void {
    const nav: HTMLElement | null = document.querySelector('[data-nav]');
    console.log('🚀 ~ file: scroll-current.ts ~ line 158 ~ ScrollCurrent ~ currentIndex ~ nav', nav);

    if (!nav) return;
    const currentActiveIndex: HTMLAnchorElement | null = nav.querySelector('[data-nav-link="active"]');

    // すでにアクティブになっているものが0個の時以外は、data-nav-link属性を除去
    if (currentActiveIndex !== null) {
      currentActiveIndex.removeAttribute('data-nav-link');
    }

    // 引数で渡されたDOMが飛び先のaタグを選択し、data-nav-link属性にactiveを追加
    const newActiveIndex: HTMLAnchorElement | null = nav.querySelector(`a[href='#${element.id}']`);
    if (!newActiveIndex) return;
    newActiveIndex.setAttribute('data-nav-link', 'active');
  }
}
