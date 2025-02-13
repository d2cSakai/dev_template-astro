import {
  handleScrollVideo,
  observeVideoState,
  options,
} from '@/assets/scripts/modules/common/video-state/scroll-manager';
import { elements, selectors } from '@/assets/scripts/modules/common/video-state/util';

export class VideoState {
  private observer: IntersectionObserver;

  constructor() {
    this.observer = new IntersectionObserver(handleScrollVideo.bind(this), options);

    this.init();
  }

  private init(): void {
    elements.triggers.forEach((trigger) => {
      this.observer.observe(trigger);
    });

    observeVideoState();
    this.clickEvent();
  }

  // clickイベント
  private clickEvent(): void {
    const container = document.querySelector<HTMLDivElement>(`[${selectors.container}]`);
    if (!container) return;

    const playButton = container.querySelector<HTMLButtonElement>(`[${selectors.playButton}]`);
    if (!playButton) return;

    playButton.addEventListener('click', () => {
      this.toggleEvent(container);
    });
  }

  // toggleイベント
  private toggleEvent(container: HTMLDivElement): void {
    const video = container.querySelector<HTMLVideoElement>(`[${selectors.video}]`);

    if (!video) return;
    this.toggleVideo(video);
    this.toggleButtonText(video, container);
  }

  // ビデオの再生・停止
  private toggleVideo(video: HTMLVideoElement): void {
    video.paused ? video.play() : video.pause();
  }

  // ボタンのテキスト切り替え
  private toggleButtonText(video: HTMLVideoElement, container: HTMLDivElement): void {
    const playButton = container.querySelector<HTMLButtonElement>(`[${selectors.playButton}]`);
    if (!playButton) return;

    playButton.textContent = video.paused ? '再生' : '停止';
  }
}
