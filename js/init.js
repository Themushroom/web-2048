/**
 * 获取数字背景颜色
 * @param {Object} number
 */
function getNumBackgroundColor(number) {
	switch(number) {
		case 1:
			return "#eee4da";
			break;
		case 2:
			return "#ede0c8";
			break;
		case 3:
			return "#f2b179";
			break;
		case 4:
			return "#f59563";
			break;
		case 5:
			return "#f67c5f";
			break;
		case 6:
			return "#f65e3b";
			break;
		case 7:
			return "#edcf72";
			break;
		case 8:
			return "#edcc61";
			break;
		case 9:
			return "#9c0";
			break;
		case 10:
			return "#33b5e5";
			break;
		case 11:
			return "#09c";
			break;
		case 12:
			return "#a6c";
			break;
        case 13:
        	return "#93c";
        	break;
		default:"black";
			break;
	}
}
/**
 * 获取数字颜色
 * @param {Object} number
 */
function getNumColor(number) {
	if(number <= 4) {
		return "#776a65";
	}
	return "white";
}
/**
 * 判断是否有数字可以移动
 */
function haveNumMoveToLeft() {
	for(var i = 1; i <= 4; i++) {
		for(var j = 2; j <= 4; j++) {
			if(numArray[i][j] != 0 && (numArray[i][j - 1] == 0 || numArray[i][j - 1] == numArray[i][j])) //当前位置有数字且前一位为空或者前一位与当前位置的数字相同
				return true;
		}
	}
	return false;
}

function haveNumMoveToUp() {
	for(var i = 2; i <= 4; i++) {
		for(var j = 1; j <= 4; j++) {
			if(numArray[i][j] != 0 && (numArray[i - 1][j] == 0 || numArray[i - 1][j] == numArray[i][j]))
				return true;
		}
	}
	return false;
}

function haveNumMoveToRight() {
	for(var i = 1; i <= 4; i++) {
		for(var j = 1; j <= 3; j++) {
			if(numArray[i][j] != 0 && (numArray[i][j + 1] == 0 || numArray[i][j + 1] == numArray[i][j]))
				return true;
		}
	}
	return false;
}

function haveNumMoveToDown() {
	for(var i = 1; i <= 3; i++) {
		for(var j = 1; j <= 4; j++) {
			if(numArray[i][j] != 0 && (numArray[i + 1][j] == 0 || numArray[i + 1][j] == numArray[i][j]))
				return true;
		}
	}
	return false;
}

function rightToLeftIsNull(i, k, j) { //判断水平移动两位置间是否有数字，无数字返回true
	for(var n = k + 1; n < j; n++) {
		if(numArray[i][n] != 0)
			return false;
	}
	return true;
}

function downToUpIsNull(i, k, j) { //判断垂直移动俩位置之间是否有数字，无数字返回true
	for(var n = k + 1; n < i; n++) {
		if(numArray[n][j] != 0)
			return false;
	}
	return true;
}

function leftToRightIsNull(i, k, j) {
	for(var n = j + 1; n < k; n++) {
		if(numArray[i][n] != 0)
			return false;
	}
	return true;
}

function upToDownIsNull(i, k, j) {
	for(var n = i + 1; n < k; n++) {
		if(numArray[n][j] != 0)
			return false;
	}
	return true;
}

function moveAnimation(x1, y1, x2, y2) { //从(x1,y1)点移动到(x2,y2)点的动画
	var gameNum = $('#gameNum-' + x1 + '-' + y1);
	gameNum.animate({
		top: (x2 + (x2 - 1) * 5)*4+'%',
		left: (y2 + (y2 - 1) * 5)*4+'%'
	},200);
}

function haveSpace() {//判断格子是否还有空格
	for(var i = 1; i <= 4; i++) {
		for(var j = 1; j <= 4; j++) {
			if(numArray[i][j] == 0) {
				return true;
			}
		}
	}
	return false;
}

function gameOver() { //表格上没有空间且不能上下左右都不能再移动
	if(!haveSpace() && !haveNumMoveToUp() && (!haveNumMoveToDown()) && (!haveNumMoveToLeft()) && (!haveNumMoveToRight()))
		alert("很遗憾，你没有找到千岁忧/(ㄒoㄒ)/~~");
}
function gameSuccess(){
	for(var i=1;i<=4;i++){
		for(var j=1;j<=4;j++){
			if(numArray[i][j]=="11"){
				$('.gameGird').css({
					'display':'none',
				});
				$('.gameNum').css({
					'display':'none'
				});
				$('#gameBody').css('background-image','url(./img/yibo/0.jpg)');
				alert("恭喜你！成功解锁千岁忧！把小老头抱回家吧(●'◡'●)");
			}
		}
	}
}
