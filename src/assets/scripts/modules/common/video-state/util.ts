export const selectors = {
  container: 'data-video-container',
  video: 'data-video',
  videoId: 'data-video-id',
  playButton: 'data-play-button',
  trigger: 'data-video-state-trigger',
};

export const elements = {
  triggers: document.querySelectorAll<HTMLDivElement>(`[${selectors.trigger}]`),
  videos: document.querySelectorAll<HTMLVideoElement>(`[${selectors.video}]`),
};
