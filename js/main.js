var m = new Map([
	[1, '2'],
	[2, '4'],
	[3, '8'],
	[4, '16'],
	[5, '32'],
	[6, '64'],
	[7, '128'],
	[8, '256'],
	[9, '512'],
	[10, '1024'],
	[11, '2048']
]);
var numArray = []; //存放游戏格子数据
var locArray = []; //标记该格子是否为空
var score1, score2, bestScore1, bestScore2;
$(document).ready(function() {
	init();
	randLocAndNum();
	randLocAndNum();
	$('#nowDate').text(getCurrentDate()); //显示页脚日期
	$('#newGame').on('click', function() {
		init();
		randLocAndNum();
		randLocAndNum();
	});
	$('#change').on('click', function() {
		var value = $('#change').attr('name');
		if(value == "number") {
			m = new Map([
				[1, '夏'],
				[2, '商'],
				[3, '周'],
				[4, '秦'],
				[5, '汉'],
				[6, '隋'],
				[7, '唐'],
				[8, '宋'],
				[9, '元'],
				[10, '明'],
				[11, '清']
			]);
			$('#change').attr('name', 'history');
			$('#change').text('朝代版');
			init();
			randLocAndNum();
			randLocAndNum();
		} else {
			m = new Map([
				[1, '2'],
				[2, '4'],
				[3, '8'],
				[4, '16'],
				[5, '32'],
				[6, '64'],
				[7, '128'],
				[8, '256'],
				[9, '512'],
				[10, '1024'],
				[11, '2048']
			]);
			$('#change').attr('name', 'number');
			$('#change').text('数字版');
			init();
			randLocAndNum();
			randLocAndNum();
		}
	})
});

/*
 *初始化游戏格子
 */
function init() {
	/*初始化游戏格子的位置*/
	for(var i = 1; i <= 4; i++) {
		for(var j = 1; j <= 4; j++) {
			var gird = $('#gameGird-' + i + '-' + j);
			gird.css('top', i * 20 + (i - 1) * 100); //每个格子距离顶部和左边的位置的初始化
			gird.css('left', j * 20 + (j - 1) * 100);
		}
	}
	/*初始化数字数组和位置标记数组*/
	for(var i = 1; i <= 4; i++) {
		numArray[i] = new Array();
		locArray[i] = new Array();
		for(var j = 1; j <= 4; j++) {
			numArray[i][j] = 0;
			locArray[i][j] = false;
		}
	}
	/*初始化表格*/
	updateGird();
	/*初始化成绩为0*/
	score1 = 0, score2 = 0;
	$('#score').val(0);
	$('#score').text('0');
	var value = $('#change').attr('name');
	if(value == 'number') {
		if(localStorage.bestScore1) {
			$('#bestScore').text(localStorage.bestScore1);
		} else
			localStorage.bestScore1 = score1;
	} else {
		if(localStorage.bestScore2) {
			$('#bestScore').text(localStorage.bestScore2);
		} else
			localStorage.bestScore2 = score2;
	}

}
/*
 * 随机在格子上出现一个数字(2或4)
 * */
function randLocAndNum() {
	var randLocX, randLocY, randNum;
	while(true) {
		randLocX = parseInt(Math.random() * 4, 10) + 1; //生成1-4的随机数
		randLocY = parseInt(Math.random() * 4, 10) + 1;
		if(numArray[randLocX][randLocY] == 0) { /*该格子数值为0*/
			break;
		}
	}
	randNum = Math.random() > 0.5 ? 1 : 2;
	console.log(randLocX, randLocY, randNum);
	locArray[randLocX][randLocY] = true;
	numArray[randLocX][randLocY] = randNum;

	//数字出现的颜色和动画
	var gameNum = $('#gameNum-' + randLocX + '-' + randLocY);
	gameNum.css({
		'background-color': getNumBackgroundColor(randNum),
		'color': getNumColor(randNum)
	}).text(m.get(randNum));
	gameNum.animate({
		width: 100,
		height: 100
	}, 200);
}
/**
 * 根据数字数组的变化改变格子的布局
 */
function updateGird() {
	$('.gameNum').remove();
	for(var i = 1; i <= 4; i++) {
		for(var j = 1; j <= 4; j++) {
			$('#gameBody').append('<div id="gameNum-' + i + '-' + j + '" class="gameNum"></div>')
			gameNum = $('#gameNum-' + i + '-' + j);
			if(numArray[i][j] == 0) {
				gameNum.css({
					'width': '0px',
					'height': '0px',
					'top': i * 20 + (i - 1) * 100,
					'left': j * 20 + (j - 1) * 100
				});
			} else {
				gameNum.css({
					'width': 100,
					'height': 100,
					'top': i * 20 + (i - 1) * 100,
					'left': j * 20 + (j - 1) * 100,
					'background-color': getNumBackgroundColor(numArray[i][j]),
					'color': getNumColor(numArray[i][j])
				}).text(m.get(numArray[i][j]));
			}
		}
	}
}
/**
 * 数字的移动
 */
$(document).keydown(function(event) { //数字按下的事件
	switch(event.keyCode) { //获得按键的ascii码
		case 37: //左箭头
			if(moveToLeft()) { //移动成功
				setTimeout('updateGird()', 200); //更新格子布局
				setTimeout('randLocAndNum()', 300); //出现新的数字在空格子上
				setTimeout('gameOver()', 300); //判断游戏是否结束
			}
			break;
		case 38: //上箭头
			event.preventDefault(); //去除按键的默认事件
			if(moveToUp()) {
				setTimeout('updateGird()', 200);
				setTimeout('randLocAndNum()', 300); //出现新的数字在空格子上
				setTimeout('gameOver()', 300);
			}
			break;
		case 39: //右箭头
			if(moveToRight()) {
				setTimeout('updateGird()', 200);
				setTimeout('randLocAndNum()', 300); //出现新的数字在空格子上
				setTimeout('gameOver()', 300);
			}
			break;
		case 40: //下箭头
			event.preventDefault();
			if(moveToDown()) {
				setTimeout('updateGird()', 200);
				setTimeout('randLocAndNum()', 300); //出现新的数字在空格子上
				setTimeout('gameOver()', 300);
			}
			break;
	}
});

function moveToLeft() {
	if(!haveNumMoveToLeft()) //haveNumMoveToLeft() is in init.js 判断是否有数字可以左移
		return false;
	for(var i = 1; i <= 4; i++) {
		for(var j = 2; j <= 4; j++) {
			if(numArray[i][j] != 0) {
				for(var k = 1; k < j; k++) {
					if(numArray[i][k] == 0 && rightToLeftIsNull(i, k, j)) { //当前位置未填充且当前位置到要移动的位置之间为空
						numArray[i][k] = numArray[i][j];
						numArray[i][j] = 0;
						moveAnimation(i, j, i, k); //移动动画从(i,j)位置到(i,k)位置

						//var gameNum = $('gameNum-' + i + '-' + k);

					} else if(numArray[i][k] == numArray[i][j] && rightToLeftIsNull(i, k, j)) { //当前位置与将要移动位置的数字相同且他们之间无其他数字
						numArray[i][k] = numArray[i][j] + 1;
						numArray[i][j] = 0;
						moveAnimation(i, j, i, k); //移动动画从(i,j)位置到(i,k)位置

						//var gameNum = $('gameNum-' + i + '-' + k);
						var value = $('#change').attr('name');
						if(value == 'number') {
							score1 += Math.pow(2,numArray[i][k]);
							$('#score').text(score1);
							if(localStorage.bestScore1 < score1) {
								localStorage.bestScore1 = score1;
							}
							$('#bestScore').text(localStorage.bestScore1);
						}
						else{
							score2 += Math.pow(2,numArray[i][k]);
							$('#score').text(score2);
							if(localStorage.bestScore2 < score2) {
								localStorage.bestScore2 = score2;
							}
							$('#bestScore').text(localStorage.bestScore2);
						}
					}
				}
			}
		}
	}
	//setTimeout('updateGird()', 200);
	return true;
}

function moveToUp() {
	if(!haveNumMoveToUp())
		return false;
	for(var i = 2; i <= 4; i++) {
		for(var j = 1; j <= 4; j++) {
			if(numArray[i][j] != 0) {
				for(var k = 1; k < i; k++) {
					if(numArray[k][j] == 0 && downToUpIsNull(i, k, j)) {
						numArray[k][j] = numArray[i][j];
						numArray[i][j] = 0;
						moveAnimation(i, j, k, j);
					} else if(numArray[k][j] == numArray[i][j] && downToUpIsNull(i, k, j)) {
						numArray[k][j] = numArray[i][j] + 1;
						numArray[i][j] = 0;
						moveAnimation(i, j, k, j);
						
						var value = $('#change').attr('name');
						if(value == 'number') {
							score1 += Math.pow(2,numArray[k][j]);
							$('#score').text(score1);
							if(localStorage.bestScore1 < score1) {
								localStorage.bestScore1 = score1;
							}
							$('#bestScore').text(localStorage.bestScore1);
						}
						else{
							score2 += Math.pow(2,numArray[k][j]);
							$('#score').text(score2);
							if(localStorage.bestScore2 < score2) {
								localStorage.bestScore2 = score2;
							}
							$('#bestScore').text(localStorage.bestScore2);
						}
					}
				}
			}
		}
	}
	//setTimeout('updateGird()', 200);
	return true;
}

function moveToRight() {
	if(!haveNumMoveToRight())
		return false;
	for(var i = 1; i <= 4; i++) {
		for(var j = 3; j >= 1; j--) {
			if(numArray[i][j] != 0) {
				for(var k = 4; k > j; k--) {
					if(numArray[i][k] == 0 && leftToRightIsNull(i, k, j)) {
						numArray[i][k] = numArray[i][j];
						numArray[i][j] = 0;
						moveAnimation(i, j, i, k);
					} else if(numArray[i][k] == numArray[i][j] && leftToRightIsNull(i, k, j)) {
						numArray[i][k] = numArray[i][j] + 1;
						numArray[i][j] = 0;
						moveAnimation(i, j, i, k);
						var value = $('#change').attr('name');
						if(value == 'number') {
							score1 += Math.pow(2,numArray[i][k]);
							$('#score').text(score1);
							if(localStorage.bestScore1 < score1) {
								localStorage.bestScore1 = score1;
							}
							$('#bestScore').text(localStorage.bestScore1);
						}
						else{
							score2 += Math.pow(2,numArray[i][k]);
							$('#score').text(score2);
							if(localStorage.bestScore2 < score2) {
								localStorage.bestScore2 = score2;
							}
							$('#bestScore').text(localStorage.bestScore2);
						}
					}
				}
			}
		}
	}
	//setTimeout('updateGird()', 200);
	return true;
}

function moveToDown() {
	if(!haveNumMoveToDown())
		return false;
	for(var i = 3; i >= 1; i--) {
		for(var j = 1; j <= 4; j++) {
			if(numArray[i][j] != 0) {
				for(var k = 4; k > i; k--) {
					if(numArray[k][j] == 0 && upToDownIsNull(i, k, j)) {
						numArray[k][j] = numArray[i][j];
						numArray[i][j] = 0;
						moveAnimation(i, j, k, j);
					} else if(numArray[k][j] == numArray[i][j] && upToDownIsNull(i, k, j)) {
						numArray[k][j] = numArray[i][j] + 1;
						numArray[i][j] = 0;
						moveAnimation(i, j, k, j);
						var value = $('#change').attr('name');
						if(value == 'number') {
							score1 += Math.pow(2,numArray[k][j]);
							$('#score').text(score1);
							if(localStorage.bestScore1 < score1) {
								localStorage.bestScore1 = score1;
							}
							$('#bestScore').text(localStorage.bestScore1);
						}
						else{
							score2 += Math.pow(2,numArray[k][j]);
							$('#score').text(score2);
							if(localStorage.bestScore2 < score2) {
								localStorage.bestScore2 = score2;
							}
							$('#bestScore').text(localStorage.bestScore2);
						}
					}
				}
			}
		}
	}
	//setTimeout('updateGird()', 200);
	return true;
}

function getCurrentDate() {
	var now = new Date();
	var year = now.getFullYear(); //得到年份
	var month = now.getMonth(); //得到月份
	var date = now.getDate(); //得到日期
	var day = now.getDay(); //得到周几
	var hour = now.getHours(); //得到小时
	var minu = now.getMinutes(); //得到分钟
	var sec = now.getSeconds(); //得到秒
	month = month + 1;
	if(month < 10) month = "0" + month;
	if(date < 10) date = "0" + date;
	if(hour < 10) hour = "0" + hour;
	if(minu < 10) minu = "0" + minu;
	if(sec < 10) sec = "0" + sec;
	var time = "";
	time = year + "-" + month + "-" + date;
	return time;
}