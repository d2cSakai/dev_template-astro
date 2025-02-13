import { Accordion } from '@/assets/scripts/modules/common/accordion';
import { CardFlipAnim } from '@/assets/scripts/modules/common/card-flip-anim';
import { Menu } from '@/assets/scripts/modules/common/hover-anim/menu.js';
import { ModalYoutube } from '@/assets/scripts/modules/common/modal-youtube/modal';
import { Modal } from '@/assets/scripts/modules/common/modal/modal';
import { AddAnimationModal } from '@/assets/scripts/modules/common/modal2';
import { Modal3 } from '@/assets/scripts/modules/common/modal3';
import { OpenAnim } from '@/assets/scripts/modules/common/openAnim';
import { ScrollAnim } from '@/assets/scripts/modules/common/scroll-anim';
import { ScrollCurrent } from '@/assets/scripts/modules/common/scroll-current';
import { VideoState } from '@/assets/scripts/modules/common/video-state/video-state';
// import { TreeView } from '@assets/scripts/modules/common/tree-view';

export class Common {
  constructor() {
    const modalElement: HTMLDivElement | null = document.querySelector('[data-modal]');
    const animModalElement: HTMLDivElement | null = document.querySelector('[data-modal="anim"]');
    const dataMenu: HTMLDivElement | null = document.querySelector('[data-menu]');
    // new TreeView();
    new Accordion();
    new CardFlipAnim();
    new Modal();
    new ModalYoutube();
    new Modal3();
    new ScrollAnim();
    new ScrollCurrent();
    new VideoState();
    // initialize the menu
    if (!dataMenu) return;
    new Menu(dataMenu);
    if (!animModalElement || !modalElement) return;
    // new Modal2(modalElement, 'rgb(255 0 0 / 0.250)');
    new AddAnimationModal(animModalElement, 'rgb(0 21 255 / 0.25)');
    new OpenAnim();
  }
}
