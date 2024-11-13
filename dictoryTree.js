// 假设editor是你的CKEditor实例
editor.on('paste', (evt) => {
  const clipboardData = evt.data.dataTransfer || evt.data.clipboardData;
  if (clipboardData && clipboardData.files.length) {
    const file = clipboardData.files[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const imgElement = editor.document.createElement('img');
        imgElement.setAttribute('src', evt.target.result);

        // 获取当前选中位置的range
        const range = editor.getSelection().getRanges()[0];
        range.deleteContents(); // 删除选中内容
        range.insertNode(imgElement); // 插入图片
      };
      reader.readAsDataURL(file);
    }
  }
});
