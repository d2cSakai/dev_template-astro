import { Loading } from '@/assets/scripts/modules/common/loading';
import { Common } from '@assets/scripts/modules/common';
class App {
  constructor() {
    this.onContentLoaded = this.onContentLoaded.bind(this);
    this.onLoaded = this.onLoaded.bind(this);
    // this.onResize = this.onResize.bind(this);
    // this.pagePath = window.location.pathname;

    this.init();
  }

  private init(): void {
    window.addEventListener('DOMContentLoaded', this.onContentLoaded);
    window.addEventListener('load', this.onLoaded);
  }

  // DOMContentLoaded
  private onContentLoaded(): void {
    window.removeEventListener('DOMContentLoaded', this.onContentLoaded);
    console.log('onContentLoaded');
    // new Footer();
    new Loading({});
  }

  // load
  private onLoaded(): void {
    window.removeEventListener('load', this.onLoaded);
    console.log('onLoaded');
    new Common();
  }

  // private onResize(): void {
  //   // console.log('onResize');
  // }
}

new App();
