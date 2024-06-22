<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>jQuery Image Upload</title>
    <style>
        .image-preview {
            display: inline-block;
            position: relative;
            margin-right: 1rem;
            width: 100px;
            height: 100px;
            overflow: hidden;
        }
        .image-preview img {
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
        }
        .image-preview .remove-image {
            position: absolute;
            top: 0;
            right: 0;
            background-color: #f00;
            color: #fff;
            padding: 3px;
            cursor: pointer;
            opacity: 0.5;
            transition: opacity 0.2s ease-in-out;
        }
        .image-preview .remove-image:hover {
            opacity: 1;
        }
    </style>
</head>
<body>

    <!-- 选择图片按钮 -->
    <label for="upload-input" class="btn btn-primary">选择图片</label>
    <input id="upload-input" type="file" accept="image/*" multiple style="display: none">

    <!-- 图片预览区域 -->
    <div id="image-previews"></div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function () {

            // 选择图片时触发的事件
            $('#upload-input').on('change', function (event) {
                const files = event.target.files;
                handleFileSelection(files);
            });

            // 删除单张图片的回调
            function removeImageHandler(imagePreviewElement) {
                return function () {
                    imagePreviewElement.remove();
                    // 这里可以添加逻辑，将已删除图片的文件信息从上传列表中移除（如果需要）
                };
            }

            // 处理文件选择
            function handleFileSelection(files) {
                const previewsContainer = $('#image-previews');

                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    if (!file.type.startsWith('image/')) continue; // 忽略非图片文件

                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const imgElement = $('<img>', { src: e.target.result });
                        const previewContainer = $('<div>', { class: 'image-preview' });
                        const removeButton = $('<span>', { class: 'remove-image', text: 'X' });

                        previewContainer.append(imgElement);
                        previewContainer.append(removeButton);

                        removeButton.click(removeImageHandler(previewContainer));

                        previewsContainer.append(previewContainer);
                    };
                    reader.readAsDataURL(file);
                }
            }
        });
    </script>
</body>
</html>