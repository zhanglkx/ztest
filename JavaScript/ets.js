Page({
  data: {
    containerClass: 'bottom-fix-shadow',
    childElementsCount: 0
  },

  onLoad: function (options) {
    this.queryContainerChildren();
  },

  queryContainerChildren: function () {
    const query = wx.createSelectorQuery().in(this);
    query.select('#codeFixedBottomContainer').boundingClientRect()
      .selectViewport().scrollOffset()
      .exec((res) => {
        console.log('Bounding rect of #codeFixedBottomContainer:', res[0]);

        // 获取子元素信息
        query.select('#codeFixedBottomContainer').fields(
          {
            dataset: true,
            size: true,
            scrollOffset: true,
            properties: ['children']
          },
          (res) => {
            console.log('Children info:', res);
            this.setData({
              childElementsCount: res.children.length
            });
            this.updateContainerClass(res.children.length);
          }
        ).exec();
      });
  },

  updateContainerClass: function (childCount) {
    if (childCount === 1) {
      this.setData({
        containerClass: ''
      });
    } else {
      this.setData({
        containerClass: 'bottom-fix-shadow'
      });
    }
  }
});