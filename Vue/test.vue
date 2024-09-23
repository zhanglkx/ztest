<template>
    <div :style="{ opacity: breadcrumbOpacity }" class="breadcrumbWrap">
        <div ref="breadcrumb" class="breadcrumb"
            :style="{ justifyContent: breadcrumbAlignment, opacity: breadcrumbOpacity }">
            <div v-for="(item, index) in breadcrumbList" :key="index" ref="breadcrumbItem" class="breadcrumbItem"
                :data-index="breadcrumbList.length - index" :data-isLast="breadcrumbList.length - 1 === index"
                @click="breadcrumbBack">
                <span :class="['itemText', breadcrumbList.length - 1 !== index ? 'breadcrumbColor' : '']">{{ item
                    }}</span>
                <span v-if="breadcrumbList.length - 1 !== index" class="clifont anticon-cli-angle-right arrow"></span>
            </div>
        </div>
        <div class="fixedElement">
            <span @click="_openSearch" class="sortIcon clifont anticon-cli-search"
                :style="categoryType === 'normal_new' ? 'height: 16px;width: 16px;margin-left: 8px;font-size: 16px;' : ''"></span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            breadcrumbOpacity: 1,
            breadcrumbAlignment: 'center',
            breadcrumbList: ['Home', 'Category', 'Item'], // 根据需要初始化
            categoryType: 'normal' // 根据需要初始化
        };
    },
    mounted() {
        this.adjustBreadcrumbAlignment();
        window.addEventListener('resize', this.adjustBreadcrumbAlignment);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.adjustBreadcrumbAlignment);
    },
    methods: {
        breadcrumbBack(event) {
            // 在此处理 breadcrumbBack 事件
            console.log(event);
        },
        _openSearch() {
            // 在此处理 _openSearch 事件
            console.log('Search icon clicked');
        },
        adjustBreadcrumbAlignment() {
            this.$nextTick(() => {
                const breadcrumb = this.$refs.breadcrumb;
                const breadcrumbItems = this.$refs.breadcrumbItem;
                if (breadcrumb && breadcrumbItems) {
                    const breadcrumbWidth = breadcrumb.getBoundingClientRect().width;
                    const itemsWidth = Array.from(breadcrumbItems).reduce((sum, item) => {
                        return sum + item.getBoundingClientRect().width;
                    }, 0);

                    // Adjust alignment based on content width
                    if (itemsWidth <= breadcrumbWidth) {
                        this.breadcrumbAlignment = 'flex-start';
                        this.breadcrumbOpacity = 1;
                    } else {
                        this.breadcrumbAlignment = 'flex-end';
                        this.breadcrumbOpacity = 1;
                    }
                }
            });
        }
    }
};
</script>

<style scoped>
.breadcrumbWrap {
    /* 在此添加样式 */
}

.breadcrumb {
    /* 在此添加样式 */
}

.breadcrumbItem {
    /* 在此添加样式 */
}

.itemText {
    /* 在此添加样式 */
}

.breadcrumbColor {
    /* 在此添加样式 */
}

.clifont {
    /* 在此添加样式 */
}

.anticon-cli-angle-right {
    /* 在此添加样式 */
}

.arrow {
    /* 在此添加样式 */
}

.fixedElement {
    /* 在此添加样式 */
}

.sortIcon {
    /* 在此添加样式 */
}

.anticon-cli-search {
    /* 在此添加样式 */
}
</style>