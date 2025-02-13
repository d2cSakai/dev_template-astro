import { $isVideoPlaying, playVideo } from '@/assets/scripts/modules/common/video-state/stores';
import { elements, selectors } from '@/assets/scripts/modules/common/video-state/util';

export const options = {
  root: null,
  rootMargin: '0px 0px',
  threshold: 0.5,
};

// ビデオの状態を監視
export const observeVideoState = (): void => {
  if (elements.videos.length === 0) return;

  elements.videos.forEach((video) => {
    const videoId = video.getAttribute(selectors.videoId);

    if (!videoId) return;

    $isVideoPlaying.subscribe((state) => {
      if (state[videoId]) video.play();
    });
  });
};

// スクロール時の処理
export const handleScrollVideo = (entries: IntersectionObserverEntry[]): void => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      elements.videos.forEach((video) => {
        const videoId = video.getAttribute(selectors.videoId);

        if (!videoId) return;

        playVideo(videoId);
      });
    }
  });
};
