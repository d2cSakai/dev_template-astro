// npm i youtube-player でインストール
// npm install --save @types/youtube
// tsconfig.json に "types": ["youtube"] を追加

import { youtubeIdData } from './youtube-id-data';

// 使用するセレクター
const selectors = {
  modalYoutubeWrapper: 'data-modal-video',
};

// Windowオブジェクトの型拡張
declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
  }
}

// youtubeのプレイヤーを管理
const youtubePlayers: { [key: string]: YT.Player } = {};

// YouTube Iframe API がロードされるのを待つ関数
const loadYouTubeAPI = (): Promise<void> => {
  return new Promise((resolve) => {
    // 既に API がロード済みなら即座に解決
    if (typeof YT !== 'undefined' && YT.Player) {
      resolve();
    } else {
      // APIが未ロードの場合、コールバックを設定
      window.onYouTubeIframeAPIReady = () => resolve();
    }
  });
};

// youtubeのプレイヤーをセット
const setYoutubePlayer = async (youtubeIframeWrapper: HTMLDivElement): Promise<void> => {
  // 対象要素からキーを取得し、すでにプレイヤーが存在する場合は処理をスキップ
  const key = youtubeIframeWrapper.getAttribute(`${selectors.modalYoutubeWrapper}`);
  if (!key || youtubePlayers[key]) return;

  // youtubeIdDataからキーに対応するエントリを検索
  const youtubeIdEntry = youtubeIdData.find((entry) => key in entry);

  if (!youtubeIdEntry) return;

  // 再生するYouTube動画のIDを取得
  const youtubeId = youtubeIdEntry[key];
  if (!youtubeId) return;

  // 子要素（YouTubeプレイヤーの埋め込み先要素）を取得
  const youtubeTriggerChild = youtubeIframeWrapper.firstElementChild as HTMLElement;
  console.log(key);
  console.log(youtubeTriggerChild);
  if (!youtubeTriggerChild) return;

  // YouTube Iframe API の準備を待機
  await loadYouTubeAPI();
  console.log(youtubeTriggerChild);
  // 新しいYouTubeプレイヤーを生成し、管理用オブジェクトに保存
  youtubePlayers[key] = new YT.Player(youtubeTriggerChild, {
    videoId: youtubeId,
    playerVars: {
      loop: 0,
      rel: 0,
    },
  });
};
// youtubeのプレイヤーを再生
export const startYoutube = (videoId: string): void => {
  if (!youtubePlayers[videoId]) return;
  youtubePlayers[videoId].playVideo();
};

// youtubeのプレイヤーを停止
export const stopYoutube = (): void => {
  Object.values(youtubePlayers).forEach((player) => {
    // 存在チェック
    if (!player || typeof player.getPlayerState !== 'function') return;

    // 再生中かチェック
    const state = player.getPlayerState();
    if (state !== YT.PlayerState.PLAYING) return;

    // 再生停止
    player.stopVideo();
  });
};

// 生成されるiframeのスタイルを変更
export const addStyleIframe = (youtubeIframeWrapper: HTMLDivElement | null): void => {
  if (!youtubeIframeWrapper) return;

  const iframe: HTMLIFrameElement | null = youtubeIframeWrapper.querySelector('iframe');
  if (!iframe) return;

  iframe.style.setProperty('width', '100%');
  iframe.style.setProperty('height', '100%');
  iframe.setAttribute('tabindex', '0');
};

// youtubeの表示を行う
export const displayModalYoutube = (content: HTMLDialogElement | HTMLDivElement): void => {
  const youtubeIframeWrapper = content.querySelector<HTMLDivElement>(`[${selectors.modalYoutubeWrapper}]`);

  if (!youtubeIframeWrapper) return;

  // 表示させる動画のみ YouTube プレイヤーをセットする

  youtubeIframeWrapper.style.display = 'block';

  setYoutubePlayer(youtubeIframeWrapper)
    .then(() => {
      addStyleIframe(youtubeIframeWrapper);
    })
    .catch((error) => {
      console.error(error);
    });
};
