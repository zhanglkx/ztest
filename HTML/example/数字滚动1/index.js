/**
 * 用于把 .ani-num 的 --num 改成动态值，并触发动画
 */
function startAnimation(targetNum) {
  const el = document.getElementById('numEl');

  // 1. 设置 --num 为后端返回的目标值
  el.style.setProperty('--num', targetNum);

  // 2. 重新触发动画
  //    因为 CSS 写着 animation: seed 2s ease forwards; 我们可以在这里手动加上
  //    为了确保每次都能重播，需要先清空 animation，再重新赋值
  el.style.animation = 'none'; // 清空
  el.offsetHeight; // 强制重绘 (reflow)
  el.style.animation = ''; // 清空之后再赋值 (避免拿到之前的状态)
  el.style.animation = 'seed 2s ease forwards';
}

/**
 * 模拟“后端接口”返回的数据，这里用定时器模拟获取到一个新数字
 * 你在真实项目中可用 fetch / ajax 等方式拿到后端传回的数值
 */
setTimeout(() => {
  // 假设后端返回了一个目标数字
  const newValueFromServer = 8888;
  startAnimation(newValueFromServer);
}, 1000);
