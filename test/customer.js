$(function () {
	var qrcode = new QRCode(document.getElementById('qrcode'), {
		text: 'https://kt.fkw.com/',
		width: 500,
		height: 500,
		colorDark: '#000000',
		colorLight: '#ffffff',
		correctLevel: QRCode.CorrectLevel.H,
	});

	var _htOption = qrcode._htOption;
	var nCount = qrcode._oQRCode.getModuleCount();
	var nWidth = _htOption.width / nCount;
	var nHeight = _htOption.height / nCount;
	var top = _htOption.top || 0;
	var left = _htOption.left || 0;

	var canvas = new fabric.Canvas('canvas');
	canvas.selection = false;
	canvas.hoverCursor = 'default';

	countObj = {
		row2col3Count: [],
		row3col2Count: [],
		row4Count: [],
		row2col2Count: [],
		cornerCount: [],
		row3Count: [],
		col2Count: [],
		singleCount: [],
	};

	arrayObj = {
		row2col3: [],
		row3col2: [],
		row4: [],
		row2col2: [],
		corner: [],
		row3: [],
		col2: [],
		single: [],
	};

	// 创建艺术二维码
	function create() {
		createArtCode(eyeList);
		createArtCode(imgList);
	}
	function createArtCode(imgList) {
		var isDraw = JSON.parse(JSON.stringify(qrcode._oQRCode.modules));

		if (imgList.type === 'eye') {
			drawEyes(isDraw, imgList);
		}

		if (imgList.type === 'img') {
			// 排除码眼的位置
			isDraw = filterEyeGrid();
			drawImg(isDraw, imgList);
		}
	}

	// 画码眼
	function drawEyes(isDraw, imgList) {
		for (var row = 0; row < nCount; row++) {
			for (var col = 0; col < nCount; col++) {
				var nLeft = col * nWidth + left;
				var nTop = row * nHeight + top;

				if (isDraw[row][col]) {
					// 绘制左上码眼
					if (imgList.eye1 && row == 0 && col == 0) {
						setImage(imgList.eye1.url, nLeft, nTop, nWidth * 7, nHeight * 7, imgList.eye1.options);
						// 码眼占7个码字
						for (var i = 0; i < 7; i++) {
							for (var j = 0; j < 7; j++) {
								isDraw[row + i][col + j] = false;
							}
						}
					}
					// 绘制右上码眼
					else if (imgList.eye2 && row + 7 == nCount && col == 0) {
						setImage(imgList.eye2.url, nLeft, nTop, nWidth * 7, nHeight * 7, imgList.eye2.options);
						// 码眼占7个码字
						for (var i = 0; i < 7; i++) {
							for (var j = 0; j < 7; j++) {
								isDraw[row + i][col + j] = false;
							}
						}
					}
					// 绘制左下码眼
					else if (imgList.eye3 && row == 0 && col + 7 == nCount) {
						setImage(imgList.eye3.url, nLeft, nTop, nWidth * 7, nHeight * 7, imgList.eye3.options);
						// 码眼占7个码字
						for (var i = 0; i < 7; i++) {
							for (var j = 0; j < 7; j++) {
								isDraw[row + i][col + j] = false;
							}
						}
					}
				}
			}
		}
	}

	// 画码眼以外的格子
	function drawImg(isDraw, imgList) {
		var nLeft, nTop, arr, row, col, nLeft, nTop, average;

		//row2col3
		var list = imgList.list;
		if (list.row2col3.length > 0) {
			var row2col3Len = list.row2col3.length;
			var arrIndex = 0;
			average = arrayObj.row2col3.length / row2col3Len;

			for (var i = 0; i < row2col3Len; i++) {
				while (
					list.row2col3[i].count < average &&
					list.row2col3[i].count < list.row2col3[i].limit &&
					arrIndex < arrayObj['row2col3'].length
				) {
					row = arrayObj['row2col3'][arrIndex][0];
					col = arrayObj['row2col3'][arrIndex][1];
					if (
						isDraw[row][col] &&
						row + 1 < nCount &&
						col + 2 < nCount &&
						isDraw[row + 1][col] &&
						isDraw[row][col + 1] &&
						isDraw[row + 1][col + 1] &&
						isDraw[row][col + 2] &&
						isDraw[row + 1][col + 2]
					) {
						list.row2col3[i].count++;
						nLeft = col * nWidth + left;
						nTop = row * nHeight + top;
						setImage(list.row2col3[i].url, nLeft, nTop, nWidth * 3, nHeight * 2, list.row2col3[i].options);
						isDraw[row][col] = isDraw[row + 1][col] = isDraw[row][col + 1] = isDraw[row + 1][
							col + 1
						] = isDraw[row][col + 2] = isDraw[row + 1][col + 2] = false;
					}
					arrIndex++;
				}
			}
		}

		// row3col2
		if (list.row3col2.length > 0) {
			var row3col2Len = list.row3col2.length;
			var arrIndex = 0;
			average = arrayObj.row3col2.length / row3col2Len;

			for (var i = 0; i < row3col2Len; i++) {
				while (
					list.row3col2[i].count < average &&
					list.row3col2[i].count < list.row3col2[i].limit &&
					arrIndex < arrayObj['row3col2'].length
				) {
					row = arrayObj['row3col2'][arrIndex][0];
					col = arrayObj['row3col2'][arrIndex][1];

					if (
						isDraw[row][col] &&
						row + 2 < nCount &&
						col + 1 < nCount &&
						isDraw[row + 1][col] &&
						isDraw[row + 2][col] &&
						isDraw[row + 1][col + 1] &&
						isDraw[row + 2][col + 1] &&
						isDraw[row][col + 1]
					) {
						list.row3col2[i].count++;
						nLeft = col * nWidth + left;
						nTop = row * nHeight + top;
						setImage(list.row3col2[i].url, nLeft, nTop, nWidth * 2, nHeight * 3, list.row3col2[i].options);
						isDraw[row][col] = isDraw[row + 1][col] = isDraw[row + 2][col] = isDraw[row + 1][
							col + 1
						] = isDraw[row + 2][col + 1] = isDraw[row][col + 1] = false;
					}

					arrIndex++;
				}
			}
		}

		// row4的时候
		if (list.row4.length > 0) {
			var row4Len = list.row4.length;
			var arrIndex = 0;
			average = arrayObj.row4.length / row4Len;

			for (var i = 0; i < row4Len; i++) {
				while (
					list.row4[i].count < average &&
					list.row4[i].count < list.row4[i].limit &&
					arrIndex < arrayObj['row4'].length
				) {
					row = arrayObj['row4'][arrIndex][0];
					col = arrayObj['row4'][arrIndex][1];

					if (
						isDraw[row][col] &&
						row + 3 < nCount &&
						isDraw[row + 1][col] &&
						isDraw[row + 2][col] &&
						isDraw[row + 3][col]
					) {
						list.row4[i].count++;
						nLeft = col * nWidth + left;
						nTop = row * nHeight + top;
						setImage(list.row4[i].url, nLeft, nTop, nWidth * 2, nHeight, list.row4[i].options);
						isDraw[row][col] = isDraw[row + 1][col] = isDraw[row + 2][col] = isDraw[row + 3][col] = false;
					}

					arrIndex++;
				}
			}
		}

		//正方形的时候
		if (list.row2col2.length > 0) {
			var row2col2Len = list.row2col2.length;
			var arrIndex = 0;
			average = arrayObj.row2col2.length / row2col2Len;

			for (var i = 0; i < row2col2Len; i++) {
				while (
					list.row2col2[i].count < average &&
					list.row2col2[i].count < list.row2col2[i].limit &&
					arrIndex < arrayObj['row2col2'].length
				) {
					row = arrayObj['row2col2'][arrIndex][0];
					col = arrayObj['row2col2'][arrIndex][1];

					if (
						isDraw[row][col] &&
						col + 1 < nCount &&
						row + 1 < nCount &&
						isDraw[row][col + 1] &&
						isDraw[row + 1][col] &&
						isDraw[row + 1][col + 1]
					) {
						list.row2col2[i].count++;
						nLeft = col * nWidth + left;
						nTop = row * nHeight + top;
						setImage(list.row2col2[i].url, nLeft, nTop, nWidth * 2, nHeight, list.row2col2[i].options);
						isDraw[row][col] = isDraw[row + 1][col] = isDraw[row][col + 1] = isDraw[row + 1][
							col + 1
						] = false;
					}

					arrIndex++;
				}
			}
		}

		// corner的时候
		if (list.corner.length > 0) {
			var cornerLen = list.corner.length;
			var arrIndex = 0;
			average = arrayObj.corner.length / cornerLen;

			for (var i = 0; i < cornerLen; i++) {
				while (
					list.corner[i].count < average &&
					list.corner[i].count < list.corner[i].limit &&
					arrIndex < arrayObj['corner'].length
				) {
					row = arrayObj['corner'][arrIndex][0];
					col = arrayObj['corner'][arrIndex][1];

					if (
						isDraw[row][col] &&
						col + 1 < nCount &&
						row + 1 < nCount &&
						isDraw[row][col + 1] &&
						isDraw[row + 1][col]
					) {
						list.corner[i].count++;
						nLeft = col * nWidth + left;
						nTop = row * nHeight + top;
						setImage(list.corner[i].url, nLeft, nTop, nWidth * 2, nHeight, list.corner[i].options);
						isDraw[row][col] = isDraw[row + 1][col] = isDraw[row][col + 1] = false;
					}

					arrIndex++;
				}
			}
		}

		// row3的时候
		if (list.row3.length > 0) {
			var row3Len = list.row3.length;
			var arrIndex = 0;
			average = arrayObj.row3.length / row3Len;

			for (var i = 0; i < row3Len; i++) {
				while (
					list.row3[i].count < average &&
					list.row3[i].count < list.row3[i].limit &&
					arrIndex < arrayObj['row3'].length
				) {
					row = arrayObj['row3'][arrIndex][0];
					col = arrayObj['row3'][arrIndex][1];

					if (isDraw[row][col] && row + 2 < nCount && isDraw[row + 1][col] && isDraw[row + 2][col]) {
						list.row3[i].count++;
						nLeft = col * nWidth + left;
						nTop = row * nHeight + top;
						setImage(list.row3[i].url, nLeft, nTop, nWidth, nHeight * 3, list.row3[i].options);
						isDraw[row][col] = isDraw[row + 1][col] = isDraw[row + 2][col] = false;
					}

					arrIndex++;
				}
			}
		}

		//col2的时候
		if (list.col2.length > 0) {
			var col2Len = list.col2.length;
			var arrIndex = 0;
			average = arrayObj.col2.length / col2Len;

			for (var i = 0; i < col2Len; i++) {
				while (
					list.col2[i].count < average &&
					list.col2[i].count < list.col2[i].limit &&
					arrIndex < arrayObj['col2'].length
				) {
					row = arrayObj['col2'][arrIndex][0];
					col = arrayObj['col2'][arrIndex][1];

					if (isDraw[row][col] && col + 1 < nCount && isDraw[row][col + 1]) {
						list.col2[i].count++;
						nLeft = col * nWidth + left;
						nTop = row * nHeight + top;
						setImage(list.col2[i].url, nLeft, nTop, nWidth * 2, nHeight, list.col2[i].options);
						isDraw[row][col] = isDraw[row][col + 1] = false;
					}

					arrIndex++;
				}
			}
		}

		// 还是用es6吧
		var rest = isDraw.reduce(
			(total, line) =>
				total +
				line.reduce((lineTotal, curr) => {
					return curr ? lineTotal + 1 : lineTotal;
				}, 0),
			0
		);

		// single的时候
		if (list.single.length > 0) {
			var singleLen = list.single.length;
			var arrIndex = 0;
			average = rest / singleLen;

			for (var i = 0; i < singleLen; i++) {
				while (
					list.single[i].count < average &&
					list.single[i].count < list.single[i].limit &&
					arrIndex < arrayObj['single'].length
				) {
					row = arrayObj['single'][arrIndex][0];
					col = arrayObj['single'][arrIndex][1];

					if (isDraw[row][col]) {
						list.single[i].count++;
						nLeft = col * nWidth + left;
						nTop = row * nHeight + top;
						setImage(list.single[i].url, nLeft, nTop, nWidth, nHeight, list.single[i].options);
						isDraw[row][col] = false;
					}

					arrIndex++;
				}
			}
		}
	}

	// 乱序算法
	function shuffle(arr) {
		var i = arr.length,
			t,
			j;

		while (i) {
			j = Math.floor(Math.random() * i--);

			t = arr[i];

			arr[i] = arr[j];

			arr[j] = t;
		}
	}

	// 获取每种类型图片的位置数组
	function getArray() {
		var isDraw;
		// row3col2
		isDraw = filterEyeGrid();
		for (var row = 0; row < nCount; row++) {
			for (var col = 0; col < nCount; col++) {
				if (
					row + 1 < nCount &&
					col + 2 < nCount &&
					isDraw[row + 1][col] &&
					isDraw[row][col + 1] &&
					isDraw[row + 1][col + 1] &&
					isDraw[row][col + 2] &&
					isDraw[row + 1][col + 2] &&
					isDraw[row][col]
				) {
					arrayObj.row2col3.push([row, col]);
					isDraw[row][col] = isDraw[row + 1][col] = isDraw[row][col + 1] = isDraw[row + 1][col + 1] = isDraw[
						row
					][col + 2] = isDraw[row + 1][col + 2] = false;
				}
			}
		}
		// row3col2
		isDraw = filterEyeGrid();
		for (var row = 0; row < nCount; row++) {
			for (var col = 0; col < nCount; col++) {
				if (
					row + 2 < nCount &&
					col + 1 < nCount &&
					isDraw[row + 1][col] &&
					isDraw[row + 2][col] &&
					isDraw[row + 1][col + 1] &&
					isDraw[row + 2][col + 1] &&
					isDraw[row][col + 1] &&
					isDraw[row][col]
				) {
					arrayObj.row3col2.push([row, col]);
					isDraw[row][col] = isDraw[row + 1][col] = isDraw[row + 2][col] = isDraw[row + 1][col + 1] = isDraw[
						row + 2
					][col + 1] = isDraw[row][col + 1] = false;
				}
			}
		}
		// row4
		isDraw = filterEyeGrid();
		for (var row = 0; row < nCount; row++) {
			for (var col = 0; col < nCount; col++) {
				if (
					row + 3 < nCount &&
					isDraw[row + 1][col] &&
					isDraw[row + 2][col] &&
					isDraw[row + 3][col] &&
					isDraw[row][col]
				) {
					arrayObj.row4.push([row, col]);
					isDraw[row][col] = isDraw[row + 1][col] = isDraw[row + 2][col] = isDraw[row + 3][col] = false;
				}
			}
		}
		// row2col2
		isDraw = filterEyeGrid();
		for (var row = 0; row < nCount; row++) {
			for (var col = 0; col < nCount; col++) {
				if (
					col + 1 < nCount &&
					row + 1 < nCount &&
					isDraw[row][col + 1] &&
					isDraw[row + 1][col] &&
					isDraw[row + 1][col + 1] &&
					isDraw[row][col]
				) {
					arrayObj.row2col2.push([row, col]);
					isDraw[row][col] = isDraw[row + 1][col] = isDraw[row][col + 1] = isDraw[row + 1][col + 1] = false;
				}
			}
		}
		//corner
		isDraw = filterEyeGrid();
		for (var row = 0; row < nCount; row++) {
			for (var col = 0; col < nCount; col++) {
				if (
					col + 1 < nCount &&
					row + 1 < nCount &&
					isDraw[row][col + 1] &&
					isDraw[row + 1][col] &&
					isDraw[row][col]
				) {
					arrayObj.corner.push([row, col]);
					isDraw[row][col] = isDraw[row + 1][col] = isDraw[row][col + 1] = false;
				}
			}
		}
		//row3
		isDraw = filterEyeGrid();
		for (var row = 0; row < nCount; row++) {
			for (var col = 0; col < nCount; col++) {
				if (row + 2 < nCount && isDraw[row + 1][col] && isDraw[row + 2][col] && isDraw[row][col]) {
					arrayObj.row3.push([row, col]);
					isDraw[row][col] = isDraw[row + 1][col] = isDraw[row + 2][col] = false;
				}
			}
		}
		//col2
		isDraw = filterEyeGrid();
		for (var row = 0; row < nCount; row++) {
			for (var col = 0; col < nCount; col++) {
				if (col + 1 < nCount && isDraw[row][col + 1] && isDraw[row][col]) {
					arrayObj.col2.push([row, col]);
					isDraw[row][col] = isDraw[row][col + 1] = false;
				}
			}
		}
		//single
		isDraw = filterEyeGrid();
		for (var row = 0; row < nCount; row++) {
			for (var col = 0; col < nCount; col++) {
				if (isDraw[row][col]) {
					arrayObj.single.push([row, col]);
					isDraw[row][col] = false;
				}
			}
		}

		Object.keys(arrayObj).forEach(function (key) {
			shuffle(arrayObj[key]);
		});
	}

	// 排除码眼的位置
	function filterEyeGrid() {
		var isDraw = JSON.parse(JSON.stringify(qrcode._oQRCode.modules));
		for (var row = 0; row < nCount; row++) {
			for (var col = 0; col < nCount; col++) {
				if (isDraw[row][col]) {
					if ((row == 0 && col == 0) || (row + 7 == nCount && col == 0) || (row == 0 && col + 7 == nCount)) {
						// 码眼占7个码字
						for (var i = 0; i < 7; i++) {
							for (var j = 0; j < 7; j++) {
								isDraw[row + i][col + j] = false;
							}
						}
					}
				}
			}
		}

		return isDraw;
	}

	// 初始化每个格子的背景色
	function initGridBackground() {
		var isDraw = JSON.parse(JSON.stringify(qrcode._oQRCode.modules));
		var nLeft, nTop;

		for (var row = 0; row < nCount; row++) {
			for (var col = 0; col < nCount; col++) {
				nLeft = col * nWidth + left;
				nTop = row * nHeight + top;

				if (isDraw[row][col]) {
					var rect = new fabric.Rect({
						width: nWidth,
						height: nHeight,
						fill: '#aaa',
						left: nLeft,
						top: nTop,
					});

					canvas.add(rect);
				}
			}
		}
	}

	// 绘制canvas
	function setImage(url, left, top, width, height, options) {
		if (url.includes('base64') || /(.svg)$/.test(url)) {
			// url = URL.createObjectURL(base64ToBlob(url));
			fabric.loadSVGFromURL(url, (result) => {
				var shape = fabric.util.groupSVGElements(result);
				var scaleX = Math.abs((width / shape.width) * 0.7);	
				var scaleY = Math.abs((height / shape.width) * 0.7);

				left = left + Math.abs(width - shape.width * scaleX) / 2 + 0.3;
				top = top + Math.abs(height - shape.height * scaleY) / 2 + 0.5;

				shape.set({
					hasControls: false,
					selectable: false,
					left: left,
					top: top,
					originLeft: left,
					originTop: top,
					scaleX: scaleX,
					scaleY: scaleY,
					originScaleX: scaleX,
					originScaleY: scaleY,
					name: options.name,
					type: options.type,
				});

				canvas.add(shape);
			});
		} else {
			fabric.Image.fromURL(url, (img) => {
				img.set({
					hasControls: false,
					selectable: false,
					left: left,
					top: top,
					originLeft: left,
					originTop: top,
					scaleX: width / img._element.width,
					scaleY: height / img._element.height,
					originScaleX: width / img._element.width,
					originScaleY: height / img._element.height,
					name: options.name,
					type: options.type,
				});

				canvas.add(img);
			});
		}
	}

	// 清空画布
	function clearCanvas() {
		canvas.clear();
	}

	// 素材列表
	var eyeList = {
		type: 'eye',
		eye1: {
			url: '../image/eye1.png',
			options: {
				name: 'eye1',
				opacity: 1,
				type: 'png',
			},
		},
		eye2: {
			url: '../image/eye1.png',
			options: {
				name: 'eye2',
				opacity: 1,
				type: 'png',
			},
		},
		eye3: {
			url: '../image/eye1.png',
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
			row3: [],
			row4: [],
			row2col2: [],
			corner: [],
			col2: [
				{
					url: '../image/col2.png',
					options: {
						name: 'col2-0',
						opacity: 1,
						type: 'png',
					},
					limit: Infinity,
					count: 0,
				},
				{
					url: '../image/col2-1.png',
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
					url: '../image/single.png',
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

	getArray();
	initGridBackground();
	create();

	// 隐藏
	$('.hide').on('click', function (event) {
		var name = event.target.dataset.name;

		handleVisibility('hide', name);
	});
	
	// 显示
	$('.show').on('click', function (event) {
		var name = event.target.dataset.name;

		handleVisibility('show', name);
	});

	// 显示隐藏控制方法
	function handleVisibility(visible, name) {
		$(event.target).hide();
		$(event.target).siblings('.visibility').show();

		canvas.getObjects().forEach((item) => {
			if (item.name === name) {
				item.set({
					opacity: visible === 'show' ? 1 : 0,
				});
			}
		});
		canvas.requestRenderAll();
	}

	// 边距
	var $rangeValue = $('.range-value');
	var $range = $('.range');
	var $rangeCheckBox = $('.range-check-box');
	var maxPadding = 0.5;
	var maxRange = 100;
	var step = maxPadding / maxRange;
	var isScaleCenter = false;
	var rangeOption = {
		originX: 'left',
		originY: 'top',
	};

	$range.each(function () {
		$(this).val(0);
	});

	// 边距值
	$rangeValue.each(function () {
		var value = $(this).siblings('.range').val();

		value = (value * step).toFixed(2);

		$(this).html(value);
	});

	// 中心缩放，暂时用中心缩放代替上下左右同边距的两种情况
	$rangeCheckBox.on('change', function (event) {
		isScaleCenter = event.target.checked;
	});

	// 调边距
	$range.on('change', function (event) {
		var value = ($(this).val() * step).toFixed(2);
		var name = event.target.dataset.name;

		$(this).siblings('.range-value').html(value);

		canvas.getObjects().forEach((item) => {
			if (item.name === name) {
				if (isScaleCenter) {
					rangeOption = {
						originX: 'center',
						originY: 'center',
						left: item.originLeft + (item.width * item.originScaleX) / 2,
						top: item.originTop + (item.height * item.originScaleY) / 2,
					};
				} else {
					rangeOption = {
						originX: 'left',
						originY: 'top',
					};
				}

				rangeOption.scaleY = item.originScaleY - (item.originScaleY / maxPadding) * value;
				item.set(rangeOption);
			}
		});
		canvas.requestRenderAll();
	});

	// 初始化素材个数
	initCount();

	// 修改素材数量最大值
	$('.limit-input').on('change', function (event) {
		var type = event.target.dataset.type;
		var name = event.target.dataset.name;
		var index = imgList.list[type].findIndex(function (item) {
			return item.options.name === name;
		});

		imgList.list[type][index].limit = event.target.value ? parseInt(event.target.value) : Infinity;
	});

	// 重新加载
	$('.reload-btn').on('click', function () {
		resetCountObj();
		clearCanvas();
		initGridBackground();
		create();
		initCount();
	});

	function resetCountObj() {
		Object.keys(imgList.list).forEach(function (key) {
			imgList.list[key].forEach(function (item, index) {
				item.count = 0;
			});
		});
	}

	function initCount() {
		Object.keys(imgList.list).forEach(function (key) {
			imgList.list[key].forEach(function (item, index) {
				$('.setting .count[data-type="' + key + '"]')
					.eq(index)
					.html(item.count);
			});
		});
	}

	// 更换显示类型
	$('.type-select').on('change', function (event) {
		const type = event.target.dataset.type;
		const name = event.target.dataset.name;
		const value = event.target.value;

		event.target.dataset.type = value;
		event.target.dataset.name = `${value}-${imgList.list[value].length}`;

		const index = imgList.list[type].findIndex(function (item) {
			return item.options.name === name;
		});
		const url = imgList.list[type][index].url;

		imgList.list[type].splice(index, 1);

		imgList.list[value].push({
			url: url,
			options: {
				name: `${value}-${imgList.list[value].length}`,
				opacity: 1,
			},
			limit: Infinity,
			count: 0,
		});
	});

	// 变换图片样式
	$('.style-select').on('change', function (event) {
		var name = event.target.dataset.name;
		var value = event.target.value;

		canvas.getObjects().forEach((item) => {
			if (item.name === name) {
				if (value === 'horizon') {
					item.set({
						scaleX: -item.scaleX,
					});
				} else {
					item.set({
						scaleY: -item.scaleY,
					});
				}
			}
		});
		canvas.requestRenderAll();
	});

	// 设置svg颜色
	$('.color').on('change', '.style-input', function (event) {
		setSvgColor(event);
	});

	// 上传图片
	$('.file-input').on('change', function (event) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];

			if (file.type.indexOf('svg') > 0) {
				readSvgColor(event, file);
			} else {
				readImg(event, file);
			}
		}
	});

	// 读取svg字符串
	function readSvgColor(event, file) {
		const reader = new FileReader();
		reader.onload = function (result) {
			handleSvgNode(result.target.result);
			drawSvg(event, result.target.result);
		};
		reader.readAsText(file);
	}

	// 读取svg图片
	function drawSvg(event, str) {
		if (str) {
			const url = 'data:image/svg+xml;base64,' + window.btoa(decodeURIComponent(encodeURIComponent(str)));

			$(event.target).siblings('.img-box').addClass('image-item').find('.img').attr('src', url);

			imgList.list.single.push({
				url: url,
				options: {
					name: `single-${imgList.list.single.length}`,
					opacity: 1,
					type: 'svg',
				},
				limit: Infinity,
				count: 0,
			});

			console.log(imgList);
		}
	}

	function handleSvgNode(node) {
		fabric.loadSVGFromString(node, (svg) => {
			const $colorBox = $('.color');
			const fragment = document.createDocumentFragment();
			console.log(svg);

			// 获取svg颜色
			svg.forEach((klass, index) => {
				let $input = $('<input>');
				if (klass.fill) {
					$input
						.attr('type', 'text')
						.attr('data-index', index)
						.attr('data-name', `single-${imgList.list.single.length}`)
						.addClass('style-input')
						.val(klass.fill);
					fragment.appendChild($input[0]);
				} else {
					$input
						.attr('type', 'text')
						.attr('data-index', index)
						.attr('data-name', `single-${imgList.list.single.length}`)
						.addClass('style-input')
						.val('#000');
					fragment.appendChild($input[0]);
				}
			});

			$colorBox.append(fragment);
		});
	}

	// 设置svg颜色
	function setSvgColor(event) {
		const index = event.target.dataset.index;
		const name = event.target.dataset.name;
		const value = event.target.value;

		canvas.getObjects().forEach((item) => {
			if (item.type === 'svg' && item.name === name) {
				if (item._objects) {
					item._objects[index].set({
						fill: value,
					});
				} else {
					item.set({
						fill: value,
					});
				}
			}
		});

		canvas.requestRenderAll();
	}

	// 上传图片，添加到img标签
	function readImg(event, file) {
		const reader = new FileReader();

		reader.onload = function (result) {
			const type = result.target.result.split(';')[0].split('/')[1];

			$(event.target).siblings('img').attr('src', result.target.result);

			imgList.list.single.push({
				url: result.target.result,
				options: {
					name: `single-${imgList.list.single.length}`,
					opacity: 1,
					type: type,
				},
				limit: Infinity,
				count: 0,
			});
		};
		reader.readAsDataURL(file);
	}

	// base64转blob
	function base64ToBlob(base64) {
		const arr = base64.split(',');

		const mime = arr[0].match(/:(.*?);/)[1];
		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		console.log(mime);
		return new Blob([u8arr], {
			type: mime,
		});
	}
});
