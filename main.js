
const player = (name, marker) => {
	let wins = 0; 
	const getName  = () => name;
	const getMarker = () => marker; 
	const getWins = () => wins; 
	const addWin = () => {
		wins++;
	}
	return{getName, getMarker, getWins, addWin};
}

const gameBoard = (() => {
	let board = [["","",""],["","",""],["","",""]];

	function clearBoard(){
		board = [["","",""],["","",""],["","",""]];
	}

	function getField(x, y){
		return board[x][y];
	}

	function setField(x, y, mark){
		board[x][y] = mark; 
	}

	function checkWin(){

		console.log(board);

		if(!(board[0][0] === "") && board[0][0] === board[0][1] && board[0][0] === board[0][2]){
			return true;
		}
		if(!(board[1][0] === "") && board[1][0] === board[1][1] && board[1][0] === board[1][2]){
			return true;
		}
		if(!(board[2][0] === "") && board[2][0] === board[2][1] && board[2][0] === board[2][2]){
			return true;
		}
		if(!(board[0][0] === "") && board[0][0] === board[1][0] && board[0][0] === board[2][0]){
			return true; 
		}
		if(!(board[0][1] === "") && board[0][1] === board[1][1] && board[0][1] === board[2][1]){
			return true;
		}
		if(!(board[0][2] === "") && board[0][2] === board[1][2] && board[0][2] === board[2][2]){
			return true;
		}
		if(!(board[0][0] === "") && board[0][0] === board[1][1] && board[0][0] === board[2][2]){
			return true;
		}
		if(!(board[2][0] === "") && board[2][0] === board[1][1] && board[2][0] === board[0][2]){
			return true; 
		}
		return false; 
	}

	return {clearBoard, getField, setField, checkWin};
})();


const displayController = (() => {

	let player1;
	let player2;
	let turn; 
	let buttons =[];
	let gameRunning = false; 

	let div_gameBoard = document.getElementById('gameBoard');
	let player1s_turn = document.getElementById("player1s-turn");
	let player2s_turn = document.getElementById("player2s-turn");
	let btn_start = document.getElementById("start-button");

	function printGameBoard(){

		buttons = [];
		while(div_gameBoard.firstChild){
			div_gameBoard.removeChild(div_gameBoard.lastChild);
		}

		for(let i=0; i<3; i++){
		let div_row = document.createElement('div');
		div_row.classList.add("flex", "flex-row", "text-center");
		div_gameBoard.appendChild(div_row);
			for(let j=0; j<3; j++){
				let button_field = document.createElement('button');
				button_field.classList.add("input_btn", "w-full", "h-40", "border-solid", "border-2", "border-gray-600");
				button_field.value = `${i}${j}`;
				button_field.innerHTML = gameBoard.getField(i, j);
				div_row.appendChild(button_field);
				buttons.push(button_field);
				addButtonListeners();
			}
		}
	}

	printGameBoard();

	function gameEnd(){
		gameRunning = false; 
		let winner = turn;
		winner.addWin();
		document.getElementById("player1s-wins").innerHTML = `Wins: ${player1.getWins()}`;
		document.getElementById("player2s-wins").innerHTML = `Wins: ${player2.getWins()}`;
		player1s_turn.innerHTML = "";
		player2s_turn.innerHTML = "";
		turn = null; 
	}

	function makeMove(btn){
		gameBoard.setField(btn.value.charAt(0), btn.value.charAt(1), turn.getMarker());
		btn.innerHTML = turn.getMarker();

		if(gameBoard.checkWin()){
			gameEnd();
		} else {
			changeTurn();
		}
	}

	function printTurn(){
		if(turn === player1){
			player1s_turn.innerHTML = "Your turn!";
			player2s_turn.innerHTML = "";
		} else {
			player1s_turn.innerHTML = "";
			player2s_turn.innerHTML = "Your turn!";
		}
	}

	function changeTurn(){
		if(turn === player1){
			turn = player2; 
		} else {
			turn = player1;
		}
		printTurn();
	}

	function start(){
		if(!player1 && !player2){
			let name1 = prompt("Name of player1:", "player1");
			let name2 = prompt("Name of player2:", "player2");

			player1 = player(name1, "X");
			player2 = player(name2, "O");
		}

		let random_num = Math.random();

		if(random_num > .5){
			turn = player2;
		} else {
			turn = player1;
		}
		printTurn(turn);
		gameRunning = true; 
	}

	function resetGame(){
		gameBoard.clearBoard();
		printGameBoard();
		gameRunning = false;
	}

	function blinkRed(elem){
		elem.classList.add("bg-red-700", "bg-opacity-50");
		setTimeout(function(){
			elem.classList.remove("bg-red-700", "bg-opacity-50");
		}, 150);
	}

	//---------------------------------------------//
	//-------------Event Listeners-----------------//

	btn_start.addEventListener("click", (event) =>{
		if(!gameRunning){
			start();
		} else {
			blinkRed(event.target);
		}
		
	});

	function addButtonListeners(){
		Array.from(buttons).forEach((btn) => {
			btn.addEventListener("click", () => {
				if(gameRunning){
					makeMove(btn);
				} else {
					blinkRed(btn); 
				}
			});
		});
	}
	document.getElementById("reset-button").addEventListener("click", () =>{
		resetGame();
	});

})();

