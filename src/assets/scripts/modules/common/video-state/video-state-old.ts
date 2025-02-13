import { $isVideoPlaying, playVideo } from '@/assets/scripts/modules/common/video-state/stores';

export class VideoState {
  private observer: IntersectionObserver;

  private options = {
    root: null,
    rootMargin: '0px 0px',
    threshold: 0.5,
  };

  private selectors = {
    container: 'data-video-container',
    video: 'data-video',
    videoId: 'data-video-id',
    playButton: 'data-play-button',
    trigger: 'data-video-state-trigger',
  };

  private elements = {
    triggers: document.querySelectorAll<HTMLDivElement>(`[${this.selectors.trigger}]`),
    videos: document.querySelectorAll<HTMLVideoElement>(`[${this.selectors.video}]`),
  };

  constructor() {
    this.observer = new IntersectionObserver(this.scrollStateVideo.bind(this), this.options);

    this.init();
  }

  private init(): void {
    const container = document.querySelector<HTMLDivElement>(`[${this.selectors.container}]`);
    if (!container) return;

    const playButton = container.querySelector<HTMLButtonElement>(`[${this.selectors.playButton}]`);
    if (!playButton) return;

    this.elements.triggers.forEach((trigger) => {
      this.observer.observe(trigger);
    });

    playButton.addEventListener('click', () => {
      this.toggleEvent(container);
    });

    this.stateVideo();
  }

  // toggle系の処理
  private toggleEvent(container: HTMLDivElement): void {
    const videos = container.querySelectorAll<HTMLVideoElement>(`[${this.selectors.video}]`);
    if (videos.length === 0) return;

    videos.forEach((video) => {
      this.togglePlay(video);
      this.toggleButtonText(video, container);
    });
  }

  // ビデオの再生・停止
  private togglePlay(video: HTMLVideoElement): void {
    if (video.paused) {
      this.playVideo(video);
    } else {
      video.pause();
    }
  }

  private playVideo(video: HTMLVideoElement): void {
    video.play();
  }

  // ボタンのテキスト切り替え
  private toggleButtonText(video: HTMLVideoElement, container: HTMLDivElement): void {
    const playButton = container.querySelector<HTMLButtonElement>(`[${this.selectors.playButton}]`);
    if (!playButton) return;

    playButton.textContent = video.paused ? '再生' : '停止';
  }

  private scrollStateVideo(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.elements.videos.forEach((video) => {
          const videoId = video.getAttribute(this.selectors.videoId);

          if (!videoId) return;

          playVideo(videoId);
        });
      }
    });
  }

  private stateVideo(): void {
    this.elements.videos.forEach((video) => {
      const videoId = video.getAttribute(this.selectors.videoId);

      if (!videoId) return;

      $isVideoPlaying.subscribe((state) => {
        if (state[videoId]) {
          this.playVideo(video);
        }
      });
    });
  }
}
