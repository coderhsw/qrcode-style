# qrcode-style

基于 fabric.js 的艺术二维码生成插件，可以使用图片素材自定义二维码样式。

![](./image/doc/qrcode.png '例子')

### 安装方法

```
npm install qrcode-style --save
```

### 使用方法

-   生成普通黑白二维码

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
src | 中间 logo 图片路径
imgWidth | logo 图片宽度
imgHeight | logo 图片高度

-   生成艺术二维码

```js
qrcode.createStyle((qrcode: QRCode), (options: Object));
```

**option：**
参数 | 说明
:-:|:-:
canvasId | 生成艺术二维码的容器 ID，需要是一个 canvas
grid | 是否显示格子底色
eyeList | 码眼素材
imgList | 码字素材

**eyeList 对象格式**

```js
{
    type: 'eye',
    eye1: {
        url: '', // 素材路径
        options: {
            name: '',   // 素材标识
            opacity: 1, // 素材透明度，控制显示隐藏
            type: '',   // 素材类型 png | jpg | svg
        },
    },
    eye2: {
        // 同上...
    }
    eye3: {
        // 同上...
    }
}
```

**imgList 对象格式** </br>
目前支持的素材类型有：2 : 3，3 : 2，3 : 1，4 : 1，2 : 2，1 : 2，1 : 1

```js
{
    type: 'img',
    row2col3: [],
    row3col2: [],
    row3: [],
    row4: [],
    row2col2: [],
    corner: [],     // 2:2特殊款，右下角镂空
    col2: [],
    single: [
            {
                url: '',    //素材路径
                options: {
                    name: 'single-0',   // 素材标识
                    opacity: 1,     // 素材透明度，控制显示隐藏
                    type: 'png',    // 素材类型 png | jpg | svg
                },
                limit: Infinity,    // 数量上限，默认Infinity
                count: 0,           // 数量控制，默认为0，则不控制个数
            },
        ],
}
```

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
	grid: true,
});
```
