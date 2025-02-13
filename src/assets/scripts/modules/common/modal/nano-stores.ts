import { atom } from 'nanostores';

export const $isModalOpen = atom<Record<string, boolean>>({});

export const openModal = (id: string) => {
  $isModalOpen.set({ ...$isModalOpen.get(), [id]: true });
  console.log('こんにちは。');
};

export const closeModal = (id: string) => {
  $isModalOpen.set({ ...$isModalOpen.get(), [id]: false });
};
