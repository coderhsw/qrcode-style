# qrcode-style

基于 fabric.js 的艺术二维码生成插件，可以使用图片素材自定义二维码样式。

![](./image/doc/qrcode.png '例子')

### 安装方法

```
npm install qrcode-style --save
```

### 使用方法
- 生成普通黑白二维码
```js
new QRCode(dom: HTMLElement, options: Object, callback?: function);
```
**option：**
参数 | 说明
:-:|:-:
text | 生成二维码的链接
width | 二维码宽度
height | 二维码高度
colorDark | 二维码前景色
colorLight | 二维码后景色
correctLevel | 二维码容错级别（L: 低, M: 中, Q: 较高, H: 高）
src | 中间logo图片路径
imgWidth | logo图片宽度
imgHeight | logo图片高度


### 示例

```js
// 生成普通二维码
var qrcode = new QRCode(document.getElementById('qrcode'), {
    text: 'https://xxx.com/',
    width: 500,
    height: 500,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
});

// 素材列表（码眼）
var eyeList = {
    type: 'eye',
    eye1: {
        url: './image/eye1.png',
        options: {
            name: 'eye1',
            opacity: 1,
            type: 'png',
        },
    },
    eye2: {
        url: './image/eye1.png',
        options: {
            name: 'eye2',
            opacity: 1,
            type: 'png',
        },
    },
    eye3: {
        url: './image/eye1.png',
        options: {
            name: 'eye3',
            opacity: 1,
            type: 'png',
        },
    },
};
// 素材列表（码字）
var imgList = {
    type: 'img',
    list: {
        row2col3: [],
        row3col2: [],
        row3: [],
        row4: [],
        row2col2: [],
        corner: [],
        col2: [
            {
                url: './image/col2.png',
                options: {
                    name: 'col2-0',
                    opacity: 1,
                    type: 'png',
                },
                limit: Infinity,
                count: 0,
            },
            {
                url: './image/col2-1.png',
                options: {
                    name: 'col2-1',
                    opacity: 1,
                    type: 'png',
                },
                limit: Infinity,
                count: 0,
            },
        ],
        single: [
            {
                url: './image/single.png',
                options: {
                    name: 'single-0',
                    opacity: 1,
                    type: 'png',
                },
                limit: Infinity,
                count: 0,
            },
        ],
    },
};

qrcode.createStyle(qrcode, {
    eyeList,
    imgList,
    canvasId: 'canvas',
    grid: true
});
```
