import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000, // 開発サーバーのポートを指定します
    open: true, //自動でサーバーを立ち上げる
  },
});
