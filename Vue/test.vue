<template>
    <div class="container">
      <!-- 吸顶按钮区域 -->
      <div class="sticky-buttons" :class="{ 'is-sticky': isSticky }">
        <button 
          v-for="(item, index) in sections" 
          :key="index"
          @click="scrollToTarget(item.id)"
          :class="{ 'active': currentSection === item.id }"
        >
          {{ item.name }}
        </button>
      </div>
  
      <!-- 内容区域 -->
      <div 
        v-for="(item, index) in sections" 
        :key="index" 
        :id="item.id" 
        class="section"
      >
        <h2>{{ item.name }}</h2>
        <div class="content">{{ item.content }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StickyScroll',
    data() {
      return {
        isSticky: false,
        currentSection: 'section1',
        sections: [
          { id: 'section1', name: '第一部分', content: '内容1...' },
          { id: 'section2', name: '第二部分', content: '内容2...' },
          { id: 'section3', name: '第三部分', content: '内容3...' }
        ],
        scrollThrottle: null
      }
    },
    mounted() {
      // 添加滚动监听
      window.addEventListener('scroll', this.handleScroll)
      // 获取按钮区域的初始位置
      this.$nextTick(() => {
        const buttonsEl = document.querySelector('.sticky-buttons')
        this.initialButtonsTop = buttonsEl.offsetTop
      })
    },
    beforeDestroy() {
      // 移除滚动监听
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      // 滚动到目标位置
      scrollToTarget(id) {
        const element = document.getElementById(id)
        const buttonsHeight = document.querySelector('.sticky-buttons').offsetHeight
        const targetPosition = element.offsetTop - buttonsHeight
  
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      },
  
      // 节流函数
      throttle(func, wait = 100) {
        let timeout
        return function() {
          const context = this
          const args = arguments
          if (!timeout) {
            timeout = setTimeout(() => {
              timeout = null
              func.apply(context, args)
            }, wait)
          }
        }
      },
  
      // 处理滚动事件
      handleScroll() {
        // 处理吸顶效果
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        this.isSticky = scrollTop > this.initialButtonsTop
  
        // 处理当前section的激活状态
        if (!this.scrollThrottle) {
          this.scrollThrottle = this.throttle(() => {
            const buttonsHeight = document.querySelector('.sticky-buttons').offsetHeight
            const scrollPosition = window.scrollY + buttonsHeight + 10
  
            this.sections.forEach(section => {
              const element = document.getElementById(section.id)
              const { offsetTop, offsetHeight } = element
  
              if (
                scrollPosition >= offsetTop && 
                scrollPosition < offsetTop + offsetHeight
              ) {
                this.currentSection = section.id
              }
            })
          }, 100)
        }
        this.scrollThrottle()
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    padding-top: 20px;
  }
  
  .sticky-buttons {
    padding: 15px;
    background: white;
    text-align: center;
    transition: all 0.3s;
    z-index: 1000;
  }
  
  .sticky-buttons.is-sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  button {
    margin: 0 10px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background: #f0f0f0;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  button:hover {
    background: #e0e0e0;
  }
  
  button.active {
    background: #007bff;
    color: white;
  }
  
  .section {
    min-height: 100vh;
    padding: 20px;
    border-bottom: 1px solid #eee;
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  .content {
    padding: 20px;
  }
  
  /* 移动端适配 */
  @media (max-width: 768px) {
    .sticky-buttons {
      padding: 10px;
    }
  
    button {
      margin: 5px;
      padding: 6px 12px;
      font-size: 14px;
    }
  }
  </style>
  