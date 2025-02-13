import { MenuItem } from './menuItem';

export class Menu {
  DOM: {
    element: HTMLDivElement;
    menuItems?: NodeListOf<HTMLDivElement>; //動的にプロパティを追加する場合は、?をつける
  };
  menuItems: MenuItem[];

  private selectors = {
    menuItem: 'data-menu-item',
  };

  constructor(element: HTMLDivElement) {
    // 起点要素を格納するthis.DOMを作成
    this.DOM = { element };

    // this.DOMにmenuItemsを動的に追加→this.DOM.menuItemsとして取得できるようになる
    // this.DOM.menuItemsはthis.DOM.elementから取得するので、最初からthis.DOMには格納しない
    this.DOM.menuItems = this.DOM.element.querySelectorAll(`${this.selectors.menuItem}`);

    // 空の配列を作成
    // this.menuItems = [];
    // this.DOM.menuItems.forEach((menuItem) => {
    //   this.menuItems.push(new MenuItem(menuItem));
    // });
    // 上記のコードを短縮 クラスMenuItemのインスタンス化
    this.menuItems = Array.from(this.DOM.menuItems).map((menuItem) => new MenuItem(menuItem));

    // ここでインスタンス化した事によって、
    // forEachでmenuItemsを回す必要がなくなった。initの肥大化を防ぐことができる
  }
}
