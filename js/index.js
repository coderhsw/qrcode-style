$(function () {
	var qrcode = new QRCode(document.getElementById('qrcode'), {
		text: 'https://kt.fkw.com/',
		width: 500,
		height: 500,
		colorDark: '#000000',
		colorLight: '#ffffff',
		correctLevel: QRCode.CorrectLevel.H,
	});

	// 素材列表
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
	var imgList = {
		type: 'img',
		list: {
			row2col3: [],
			row3col2: [],
			row3: [
				{
					url: './image/row3.png',
					options: {
						name: 'row3-0',
						opacity: 1,
						type: 'png',
					},
				},
			],
			row4: [],
			row2col2: [],
			corner: [
				{
					url: './image/corner.png',
					options: {
						name: 'corner-0',
						opacity: 1,
						type: 'png',
					},
				},
			],
			col2: [
				{
					url: './image/col2.png',
					options: {
						name: 'col2-0',
						opacity: 1,
						type: 'png',
					},
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
});
