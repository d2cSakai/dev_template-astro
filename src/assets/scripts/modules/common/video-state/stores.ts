import { atom } from 'nanostores';

export const $isVideoPlaying = atom<Record<string, boolean>>({});

export const playVideo = (id: string) => {
  $isVideoPlaying.set({ ...$isVideoPlaying.get(), [id]: true });
};
