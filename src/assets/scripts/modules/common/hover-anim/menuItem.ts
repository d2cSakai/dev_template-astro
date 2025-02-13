import { gsap } from 'gsap';
import { closestEdge } from './utils';

export class MenuItem {
  DOM: {
    element: HTMLDivElement;
    link?: HTMLAnchorElement | null; //nullの可能性があるため | nullとする
    marquee?: HTMLDivElement;
    marqueeInner?: HTMLDivElement;
  };

  animationDefaults: {
    duration: number;
    ease: string;
  };

  onMouseEnterFn: ((event: MouseEvent) => void) | null;
  onMouseLeaveFn: ((event: MouseEvent) => void) | null;

  private selectors = {
    link: 'data-menu-item-link',
    marquee: 'data-marquee',
    marqueeInner: 'data-marquee-inner-wrap',
  };

  constructor(element: HTMLDivElement) {
    // data-menu-item element
    this.DOM = { element };
    this.DOM.link = <HTMLAnchorElement>this.DOM.element.querySelector(`${this.selectors.link}`);
    this.DOM.marquee = <HTMLDivElement>this.DOM.element.querySelector(`${this.selectors.marquee}`);
    this.DOM.marqueeInner = <HTMLDivElement>this.DOM.marquee.querySelector(`${this.selectors.marqueeInner}`);

    // アニメーションのデフォルト設定
    this.animationDefaults = { duration: 0.6, ease: 'expo' };

    this.onMouseEnterFn = null;
    this.onMouseLeaveFn = null;

    this.init();
  }

  private init(): void {
    if (!this.DOM.link) return;

    this.onMouseEnterFn = (event: MouseEvent) => this.mouseEnter(event);
    this.DOM.link.addEventListener('mouseenter', this.onMouseEnterFn);
    this.onMouseLeaveFn = (event: MouseEvent) => this.mouseLeave(event);
    this.DOM.link.addEventListener('mouseleave', this.onMouseLeaveFn);
  }

  private mouseEnter(event: MouseEvent): void {
    if (!this.DOM.marquee || !this.DOM.marqueeInner) return;

    const edge = this.findClosestEdge(event);
    gsap
      .timeline({ defaults: this.animationDefaults })
      .set(this.DOM.marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(this.DOM.marqueeInner, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([this.DOM.marquee, this.DOM.marqueeInner], { y: '0%' }, 0);
  }

  private mouseLeave(event: MouseEvent): void {
    if (!this.DOM.marquee || !this.DOM.marqueeInner) return;

    const edge = this.findClosestEdge(event);

    gsap
      .timeline({ defaults: this.animationDefaults })
      .to(this.DOM.marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(this.DOM.marqueeInner, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  }

  // 出入りするときにマウスに最も近い側を見つける
  private findClosestEdge(event: MouseEvent): string {
    // event.pageX, event.pageYはマウスカーソルの座標を取得する

    // this.DOM.element.offsetLeft→0 this.DOM.element.offsetTop→68
    // ページ全体の座標から要素(data-menu-item)の左端の位置を引くことで、要素内での相対的なX座標を求める
    const x = event.pageX - this.DOM.element.offsetLeft;

    // ページ全体の座標から要素(data-menu-item)の上端の位置を引くことで、要素内での相対的なY座標を求める
    const y = event.pageY - this.DOM.element.offsetTop;
    return closestEdge(x, y, this.DOM.element.clientWidth, this.DOM.element.clientHeight);
  }
}
