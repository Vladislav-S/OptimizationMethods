var C = [2, 2, 1];
var A = [[4, 2, 1],[2, 5, 1],[2, 2, 1]];
var B = [2, 3, 2];



function changeBase(S, r, k){
	if(!S || r===undefined || k===undefined) return S;

	var SC = new Array(S.length);
	for(var i = 0; i < S.length; i++){
		SC[i] = new Array(S[i].length);
	}

	SC[r][k] = (1/S[r][k]).toFixed(2);

	for (var j = 0; j < S[0].length; j++){
		for (var i = 0; i < S.length; i++){
			if (j !== k) SC[r][j] = (S[r][j]/S[r][k]).toFixed(2);
			if (i !== r) SC[i][k] = -(S[i][k]/S[r][k]).toFixed(2);
			if (i !== r && j !== k) 
				SC[i][j] = (S[i][j] - ((S[i][k]*S[r][j])/S[r][k])).toFixed(2);
		}
	}

	SC = makeFixed(SC);
	//console.log(SC);
	return SC;
}

function simplex(A, B, C){
	if(!A, !B, !C) return false;
	
	var s = new Array(A.length + 1);
	for(var i = 0; i < A.length; i++){
		
		s[i] = new Array(1);
		s[i][0] = B[i];
		s[i] = s[i].concat(A[i]);
	}
	s[s.length-1] = new Array(1);
	s[s.length-1][0] = 0;
	s[s.length-1] = s[s.length-1].concat(C);

	console.log(s);
	return s;
}


function makeFixed(S){
	for(var i = 0; i < S.length; i++){
		for(var j = 0; j < S[i].length; j++){
			if(Math.abs(S[i][j] % 1).toFixed(2) <= 0.02 && 
				Math.abs(S[i][j] % 1).toFixed(2) > 0){
				S[i][j] = parseFloat(S[i][j]).toFixed();
				
			}
			if(Math.abs(S[i][j] - 0.01).toFixed(2) % 1 == 0){
				S[i][j] = parseFloat(S[i][j]).toFixed();
			}
			if(S[i][j] == 0){
				S[i][j] = 0;
			}
		}
	}
	return S;
}

function findColumn(S){
	//проверяем решение на допустимость
	var index = undefined;
	var column = undefined;
	for(var i = 0; i < S.length-1; i++){ //не проверяем строку F
		if(S[i][0] < 0){
			index = i;
			break;
		}
	}
	//если не допустимо
	if(index){
		for(var i = 1; i < S[index].length; i++){ //начало со второго элемента
			if(S[index][i] < 0){
				column = i;
				return column;
			}
			else return undefined; //решение не возможно
		}
	}
	//если допустимо, проверяем F (найдем максимальный)
	var F = S[S.length-1];
	for(var i = 1; i< F.length; i++){
		//если элемент больше 0 
		if(F[i] > 0) {
			index = i;
			break;
		}

	}
	if(index){
		for (var i = 1; i < F.length; i++) {
			if(F[i] > index) index = i;
		}
	}
	
	return index;

}

function findRow(S, column){
	if(column === 0) return undefined;
	if(S === undefined || column === undefined){
		 return undefined;
	} 

	if(S[0][0] > 0 && S[0][column] > 0){
		var min = (S[0][0] / S[0][column]).toFixed(1);
	}
	
	var k = 0;
	for (var i = 0; i < S.length-1; i++) {
		if(S[i][0]/S[i][column] < min && S[i][0]/S[i][column] > 0) {
			min=(S[i][0]/S[i][column]).toFixed(1);
			
			k = i;
		}
	}

	if(min !== undefined) return k;
	return undefined;
}


function findOptimal(S){
	var column = findColumn(S);
	var row = findRow(S, column);

	if(column === undefined ||
		row === undefined||
		S === undefined) return S;
	
	S = changeBase(S, row, column);
	
	return(findOptimal(S));
}

//simplex(A, B, C);
console.log(findOptimal(simplex(A, B, C)));

/*
function findRow(S, column){
	if(column === 0 ||
		S === undefined ||
		column === undefined) return undefined;

	var min;
	var tmp;
	var row;

	for(var i = 0; i < S.length-1; i++){
		tmp = S[i][0]/S[i][column];
		//console.log("tmp = "+tmp);
		if(tmp > 0) {
			min = tmp;
		}
	}
	for(var i = 0; i < S.length-1; i++){
		tmp = S[i][0]/S[i][column];
		if(tmp <= min) {
			min = tmp;
			row = i;
		}
	}
	console.log("ROW is: "+row);
	return row;
}



var object = {
	table: [],
	answ: {x1: , x2:, x3:},
	left:,
	right:
}
*/