function getVisibleTextFromHTML(htmlString) {
    // 创建一个新的 DOMParser 实例
    const parser = new DOMParser();
    // 解析 HTML 字符串为一个文档对象
    const doc = parser.parseFromString(htmlString, 'text/html');

    // 创建一个递归函数来获取可见文本节点
    function extractVisibleText(node) {
        // 如果节点不可见或是样式、脚本标签，跳过
        if (node.nodeType === Node.ELEMENT_NODE &&
            (getComputedStyle(node).display === 'none' || node.tagName === 'STYLE' || node.tagName === 'SCRIPT')) {
            return '';
        }

        // 如果是文本节点，直接返回文本内容
        if (node.nodeType === Node.TEXT_NODE) {
            return node.nodeValue;
        }

        // 如果是元素节点，递归遍历其子节点
        if (node.nodeType === Node.ELEMENT_NODE) {
            let text = '';
            node.childNodes.forEach(child => {
                text += extractVisibleText(child);
            });
            return text;
        }

        return '';
    }

    // 获取整个文档的文本
    const visibleText = extractVisibleText(doc.body);

    // 去除多余的空白并返回
    return visibleText.trim().replace(/\s+/g, ' ');
}

const htmlContent = `
<html>
<head>
    <title>Example Page</title>
    <style>
        .hidden { display: none; }
    </style>
</head>
<body>
    <h1>This is a heading</h1>
    <p>This is a paragraph.</p>
    <p class="hidden">This text is hidden.</p>
    <p style="display:none;">This text is also hidden.</p>
    <p>This text is <span style="display:none;">invisible</span> visible.</p>
</body>
</html>
`;

const visibleText = getVisibleTextFromHTML(htmlContent);
console.log(visibleText);
