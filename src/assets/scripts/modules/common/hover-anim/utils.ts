export { closestEdge, distMetric };

// Detect Closest Edge
// from https://codepen.io/johnstew/pen/zxYJZP?editors=0010
// 四角形の「上」または「下」のどちらに近いかを判断し、それに応じて 'top' または 'bottom' を返す
const closestEdge = (x: number, y: number, w: number, h: number) => {
  const topEdgeDist = distMetric(x, y, w / 2, 0);
  const bottomEdgeDist = distMetric(x, y, w / 2, h);
  const min = Math.min(topEdgeDist, bottomEdgeDist);
  return min === topEdgeDist ? 'top' : 'bottom';
};

// Distance Formula
// from https://codepen.io/johnstew/pen/zxYJZP?editors=0010
// 「距離を計算する必要がない比較や判定において、効率的に処理を行うための補助関数」
const distMetric = (x: number, y: number, x2: number, y2: number) => {
  const xDiff = x - x2;
  const yDiff = y - y2;
  return xDiff * xDiff + yDiff * yDiff;
};
