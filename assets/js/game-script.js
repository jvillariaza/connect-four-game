jQuery(document).ready(function($) {
	var className, playerCells, player1, player2, activePlayer, activeCell, isGameOver, checkWins, checkDraws, checkCellBase;
	$('td').click(function(e) {
		className = e.currentTarget.className;
		cname = className.split(' ');
		player1 = $('.player1GameCell').length;
		player2 = $('.player2GameCell').length;
		cells = $('.'+cname[0]+'.inactive');
		activeCell = $('.'+cname[0]+'.cell'+cells.length);
		activeCell.removeClass('inactive').addClass(activePlayer(player1, player2));
		isGameOver(activePlayer(player1, player2));
	});

	$('#playerTrigger').change(function(e) {
		return (this.value == 'human') 
				? $('#player2Container').show()
				: $('#player2Container').hide();
	});

	$('.startGameBtn').click(function() {
		window.open('game.html');
	});

	activePlayer = function(player1, player2) {
		if (player1 < player2 || player1 == player2) {
			activeCell.css('background-color', 'red');
			return 'player1GameCell';
		}

		activeCell.css('background-color', 'black');
		return 'player2GameCell';
	};

	isGameOver = function(player) {
		checkWins(player);
		checkDraws(player);
	};

	checkCellBase = function (baseCell, player) {
		switch (baseCell[0]) {
			case '1':
				if (baseCell[1] == 2 && baseCell[2] == 3 && baseCell[3] == 4) {
					alert(player + " wins!");
					window.location = 'game.html';
				} else {
					baseCell[0] = baseCell[1];
					checkCellBase(_.uniq(baseCell));
				}

			break;
			case '2':
				if (baseCell[1] == 3 && baseCell[2] == 4 && baseCell[3] == 5) {
					alert(player + " wins!");
					window.location = 'game.html';
				} else {
					baseCell[0] = baseCell[1];
					checkCellBase(_.uniq(baseCell));
				}

			break;
			case '3':
				if (baseCell[1] == 4 && baseCell[2] == 5 && baseCell[3] == 6) {
					alert(player + " wins!");
					window.location = 'game.html';
				} else {
					baseCell[0] = baseCell[1];
					checkCellBase(_.uniq(baseCell));
				}

			break;
			case '4':
				if (baseCell[1] == 5 && baseCell[2] == 6 && baseCell[3] == 7) {
					alert(player + " wins!");
					window.location = 'game.html';
				} else {
					baseCell[0] = baseCell[1];
					checkCellBase(_.uniq(baseCell));
				}

			break;
		}
	};

	checkWins = function(player) {
		playerCells = $('.'+player);
		var trCellArray = [];
		var cellTrArray = [];
		var trArray = [];
		var cellArray = [];
		var winnerAlert = false;
		var trs = []
		var cells = []

		curPlayer = (player == 'player1GameCell') ? 'Player 1' : 'Player 2';
		
		$.each(playerCells, function(i, v) {
			var classes = v.className.split(' ');
			trCellArray.push([classes[0], classes[1]]);
			cellTrArray.push([classes[1], classes[0]]);

			// trs.push(classes[0]);
			// cells.push(classes[1]);
		});

		// Horizontal || Redo code to avoid repetition
		var ctr = 1;
		var prevCell = 0;
		$.each(cellTrArray.sort(), function(i, v){
			var currentCell = v[0].split('cell')[1];
			var currentTr = v[1].split('tr')[1];
			if (i != 0 && currentCell != prevCell) {
				ctr = 2;
				trArray = [];
				trArray.push(currentTr);
			} else {
				if (i == 0)
					prevCell = currentCell;

				if (currentCell == prevCell) {
					trArray.push(currentTr);
					ctr++;
				}
			}

			if (ctr > 4) {
				var baseCell = trArray.sort();
				checkCellBase(baseCell, curPlayer);
			}

			prevCell = currentCell;
		});

		// Vertical || Redo code to avoid repetition
		var ctr = 1;
		var prevTr = 0;
		$.each(trCellArray.sort(), function(i, v) {
			var currentCell = v[1].split('cell')[1];
			var currentTr = v[0].split('tr')[1];
			trs.push(currentTr);
			cells.push(currentCell);

			if (i != 0 && currentTr != prevTr) {
				ctr = 2;
				cellArray = [];
				cellArray.push(currentCell);
			} else {
				if (i == 0)
					prevTr = currentTr;

				if (currentTr == prevTr) {
					cellArray.push(currentCell);
					ctr++;
				}
			}

			if (ctr > 4) {
				var baseCell = cellArray.sort();
				checkCellBase(baseCell, curPlayer);
			}

			prevTr = currentTr;
		});

		// Diagonal
		uTrs = _.uniq(trs);
		checkDiagonalPositions(uTrs, trCellArray, curPlayer);
	};

	var checkDiagonalPositions = function(arr, trCellArray, player) {
		if (arr.length > 3) {
			var ctr = 0;
			var ccell = 0;
			var cellsOfTrArray = [];
			$.each(arr, function(i, v) {
				if (i == 0 || v == (arr[i-1]*1)+1) {
					$.each(trCellArray, function(i2, v2) {
						if ('tr'+v == v2[0]) 
							cellsOfTrArray.push(v2[1]);
					});
					var newCells = [];
					$.each(cellsOfTrArray, function(i, v) {
						newCells.push(v.split('cell')[1]);
					});
					ccell = checkCellPositions(_.uniq(newCells.sort()));
					console.log(ccell);
					ctr++;
				} else {
					arr[0] = arr[1];
					checkDiagonalPositions(_.uniq(arr), trCellArray);
				}

				if (ctr >= 4 && ccell >= 4) {
					alert(player + " wins!");
					window.location = 'game.html';
				}
			});
		}
	};

	var checkCellPositions = function(uCells) {
		var ctr = 0;
		if (uCells.length > 3) {
			$.each(uCells, function(i, v) {
				if (i == 0 || v == (uCells[i-1]*1)+1) {
					ctr++;
				} else {
					uCells[0] = uCells[1];
					checkCellPositions(_.uniq(uCells));
				}
			});
		}
		return ctr;
	};

	checkDraws = function() {
		player1Cells = $('.player1GameCell');
		player2Cells = $('.player2GameCell');
		if (player1Cells.length == 21 && player2Cells.length == 21) {
			alert("This game has reached a draw.");
			window.location = 'game.html';
		}
	};
});

function mouseOver(td) {
	$('.inactive').css('background-color', 'white');
	$('.inactive.'+td).css('background-color', 'rgb(215, 255, 208)');
}