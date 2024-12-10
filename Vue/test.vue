<template>
    <div ref="subMenuScroll" class="subMenuScroll" @scroll="loadMore">
        <!-- 内容 -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            scrollTop: 0
        }
    },
    methods: {
        scrollToPosition() {
            this.$refs.subMenuScroll.scrollTo({
                top: this.scrollTop - 4,
                behavior: 'smooth'
            })
        }
    }
}
</script>