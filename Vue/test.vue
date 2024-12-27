<template>
    <div>
        <h4 style="color: red;" id="head-image">Hello world!</h4>
        <button @click="saveImage">screenshots</button>
    </div>
</template>

<script>
import html2canvas from "html2canvas";
import axios from "axios";

export default {
    methods: {
        async saveImage() {
            const res = await this.html2canvasAndUploadFile("#head-image");
            console.log(res);
        },

        // 传入元素id,获取服务器返回的结果
        async html2canvasAndUploadFile(selector) {
            const canvas = await html2canvas(document.querySelector(selector));
            // 将canvas转成base64
            let dataURL = canvas.toDataURL("image/png");

            // 打印的是图片的base64编码
            let blob = this.dataUrlToBlob(dataURL);
            return await this.uploadFile(blob);
        },

        // 将base64转成图片文件流
        dataUrlToBlob(dataUrl) {
            let arr = dataUrl.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                // arr[0]是data:image/png;base64
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);

            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }

            let imgFile = new Blob([u8arr], {
                type: mime
            });
            return imgFile;
        },

        // 上传二进制文件
        async uploadFile(blob) {
            const formData = new FormData();
            formData.append("image", blob);

            const res = await axios({
                method: "post",
                url: "/uploadurl",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            return res.data;
        }
    }
};
</script>