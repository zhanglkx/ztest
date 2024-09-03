// 引入 Node.js 文件系统模块，用于文件操作
const fs = require('fs');

// 引入 Node.js 路径模块，用于处理和转换文件路径
const path = require('path');

// 定义生成 HTML 树结构的函数
function makeHtml(dir) {
  // 读取指定目录的内容，并将每个文件或目录名映射为 HTML 列表项
  const items = fs.readdirSync(dir).map(file => {
    // 初始化列表项字符串，设置为文件或目录名
    let str = file;

    // 获取文件或目录的完整路径
    const filePath = path.join(dir, file);

    // 如果当前路径是一个目录，则递归调用 makeHtml 生成其内部的 HTML 列表
    /**
     * lstatSync：用于获取文件或文件夹的状态信息，包括文件类型、大小、权限等，它会返回一个 fs.Stats 对象，
     * 可以通过这个对象获取文件或文件夹的各种属性。其对象的一个方法属性isDirectory，可以用于检查指定路径是否为一个文件夹。
     */
    if (fs.lstatSync(filePath).isDirectory()) {
      str += makeHtml(filePath);
    }

    // 将文件或目录名包装为 HTML 列表项
    return `<li>${str}</li>`;
  });

  // 将所有生成的 HTML 列表项包装为一个无序列表，并返回
  return `<ul>${items.join('')}</ul>`;
}

// 从命令行参数获取要生成目录树的路径，如果没有提供则默认使用当前目录 './'
const dirToShow = process.argv[2] || './';

// 调用 makeHtml 函数生成目录树的 HTML 字符串
const treeStr = makeHtml(path.join(__dirname, dirToShow.trim()));

// 定义容器的 CSS 类名
const containerName = 'parksben-is-just-one-single-doge';

// 定义包含样式和目录树的 HTML 内容
const htmlStr = `<style>
  .${containerName} {
    width: 90%;
    max-width: 640px;
    box-sizing: border-box;
    margin: 1em auto;
    padding: 2em;
    background: #333;
    border-radius: 5px;
    overflow: hidden;
    font: 14px/18px Helvetica, Arial, "Microsoft Yahei", Verdana, sans-serif;
    --content-color: #fff;
  }

  .${containerName} ul.tree {
    color: var(--content-color);
  }

  .${containerName} ul.tree,
  .${containerName} ul.tree ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .${containerName} ul.tree ul {
    margin-left: 1em;
  }

  .${containerName} ul.tree li {
    margin: 0;
    padding: 0 1em;
    line-height: 2em;
    font-weight: bold;
    position: relative;
  }

  .${containerName} ul.tree li::before {
    content: '';
    display: block;
    width: 1px;
    height: 100%;
    background: var(--content-color);
    position: absolute;
    left: 0;
    top: 0;
  }

  .${containerName} ul.tree li::after {
    content: '';
    display: block;
    width: 0.8em;
    height: 1px;
    background: var(--content-color);
    position: absolute;
    left: 0;
    top: 0.9em;
  }

  .${containerName} ul.tree li:last-child::before {
    height: 1em;
    bottom: 1em;
  }
</style>
<div class="${containerName}">
  <ul class="tree">${treeStr.slice(4)}
</div>
`;

// 将生成的 HTML 字符串写入 'tree.html' 文件
fs.writeFileSync(path.join(__dirname, 'tree.html'), htmlStr, 'utf8');

// 在控制台输出完成信息
console.log('==> Done: the directory tree is saved to ./tree.html');
