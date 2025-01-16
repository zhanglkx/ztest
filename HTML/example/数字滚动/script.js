function updateAnimation() {
  const numElement = document.querySelector('.ani-num');
  const targetNum = document.getElementById('targetNum').value;
  const duration = document.getElementById('duration').value;
  
  // 重置动画
  numElement.style.animation = 'none';
  numElement.offsetHeight; // 触发重排
  
  // 更新配置
  numElement.style.setProperty('--num', targetNum);
  numElement.style.setProperty('--duration', `${duration}s`);
  
  // 重新启动动画
  numElement.style.animation = `
    seed ${duration}s var(--easing) forwards,
    fadeIn 0.5s ease-out forwards
  `;
}

function toggleInfinite() {
  const numElement = document.querySelector('.ani-num');
  numElement.classList.toggle('infinite');
  updateAnimation(); // 重新启动动画
}

// 初始化动画
document.addEventListener('DOMContentLoaded', updateAnimation); 