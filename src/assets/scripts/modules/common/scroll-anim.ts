export class ScrollAnim {
  // セレクター
  private selectors = {
    target: 'data-scroll',
  };

  observer: IntersectionObserver;

  options: {
    root: Element | null;
    rootMargin: string;
    threshold: number;
  };

  // 使用要素
  private elements: {
    targets: NodeListOf<Element> | [];
  };

  constructor() {
    this.elements = {
      targets: document.querySelectorAll(`[${this.selectors.target}]`),
    };

    this.options = {
      root: null,
      rootMargin: '-100px 0px',
      threshold: 0,
    };

    this.observer = new IntersectionObserver(this.fadeIn, this.options);
    this.init();
  }

  private init(): void {
    if (this.elements.targets.length === 0) return;

    this.elements.targets.forEach((target): void => {
      this.observer.observe(target);
    });
  }

  private fadeIn(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry: IntersectionObserverEntry): void => {
      if (entry.isIntersecting) {
        entry.target.setAttribute('data-scroll', 'fade-in');
      }
    });
  }
}
