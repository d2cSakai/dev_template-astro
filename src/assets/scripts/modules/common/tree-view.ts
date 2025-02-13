// // ツリービューを動作させるためのクラス
// export class TreeView {
//   constructor(root) {
//     // console.log('ツリービュー');
//     this.elements = {
//       root,
//       subtrees: root.querySelectorAll("[role='group']"),
//     };

//     this.init();
//   }

//   // サブツリーの深さを取得
//   getSubtreeDepth(subtree) {
//     // 初期化に0を使用
//     let depth = 0;
//     let current = subtree;

//     // currentがrootでは無かったら、繰り返す
//     while (current !== this.elements.root) {
//       // roleがgroupだったらdepthを追加していく
//       if (current.getAttribute('role') === 'group') {
//         depth++;
//       }

//       current = current.parentElement;
//     }

//     return depth;
//   }

//   // --subtree-depthを変更するメソッド
//   initNestedStyle() {
//     for (const subtree of this.elements.subtrees) {
//       // サブツリーの深さを取得
//       const depth = this.getSubtreeDepth(subtree);

//       // setPropertyでcssを書き換える toStringで文字列に変更
//       subtree.style.setProperty('--subtree-depth', depth.toString());
//     }
//   }

//   init() {
//     this.initNestedStyle();
//   }
// }

// // 対象にツリービューを適用する
// const targets = document.querySelectorAll('.js-treeView');
// targets.forEach((componentRoot) => {
//   new TreeView(componentRoot);
// });
