
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const button = document.getElementById("button");

document.getElementById("button").style.display = 'none';

let num = 0;
const box = 100;
let index;

const x = new Image();

x.src = 'img/15781_darth mauls_light sabers_star wars_icon.png';

const o = new Image();

o.src = 'img/7625337_exo_planet_space_astronomy_universe_icon.png';

class Board{
  constructor(){
    this.game = [];
  }

  fon(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 310, 310);
    ctx.strokeStyle = 'white';
    for (let y = 0; y < 310; y += box) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(300, y);
      ctx.stroke();
      ctx.restore();
    }
    for (let x = 0; x < 310; x += box) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 300);
      ctx.stroke();
      ctx.restore();
    }
  }

  getBoard(){
    this.game = this.emptyBoard();
  }

  emptyBoard(){
    return Array.from(
      {length: 3}, () => Array(3).fill(1)
    );
  }

  bot(){
    board.game.some((row, i) => {
      if (!row.includes('x')) {
        index = i;
        return row;
      }
      else if (row.includes(1) && row.includes('x')) {
        index = i;
        return row;
      }
    });

  }
}

function step() {

  if (board.game[2][0] == 0 && board.game[0][0] == 0) {
    board.game[1][0] = 0;
    draw(board.game);
  }
  if (board.game[0][1] == 0 && board.game[1][1] == 0 && board.game[2][1] != 'x' ) {
    board.game[2][1] = 0;
    draw(board.game);
  }
  if (board.game[0][2] == 0 && board.game[1][2] == 0 && board.game[2][2] != 'x' ) {
    board.game[2][2] = 0;
    draw(board.game);
  }
  if (board.game[0][0] == 0 && board.game[1][0] == 0 && board.game[2][0] != 'x' ) {
    board.game[2][0] = 0;
    draw(board.game);
  }
  if (board.game[0][1] == 'x' && board.game[1][1] == 'x' && board.game[2][1] != 0 && board.game[2][1] != 'x') {
    board.game[2][1] = 0;
    draw(board.game);
  }

  else{
    board.bot();
    emptyBox();

    while (true) {
      if (!board.game[index].includes(1)) {
        ctx.clearRect(0, 0, 300, 300);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 310, 310);
        ctx.font = "50px Lakki Reddy";
        ctx.fillStyle = 'black';
        ctx.fillText('Winner: X|O', 20, 150);
        ctx.font = "30px Lakki Reddy";
        ctx.fillStyle = 'grey';
        ctx.fillText("Game Over", 80, 200);
        document.getElementById("button").style.display = 'block';
        document.getElementById("step").style.display = 'none';
        break;
      }
      const src = board.game[index];
      const length = src.length;

      const random = Math.floor(Math.random() * length);
      let randomItem = src[random];

      if (board.game[index][random] == 1 && num === 4 || num > 4) {
        board.game[index][random] = 0;
        draw(board.game);
        break;
      }
      if (randomItem == 1) {
        board.game[index][random] = 0;
        draw(board.game);
        break;
      }
    }

    function emptyBox() {
      board.game.forEach((row, i) => {
        for (let index = 0; index < board.game[i].length; index++) {
          if (board.game[i][index] == 0) {
            ++num;
            return num;
          }
        }
      });
    }
  }
}

function draw(arr) {
  if (arr[0][0] == 0 && arr[0][0] != 'x') {
    ctx.drawImage(o, 15, 15);
  }
  if (arr[0][1] == 0 && arr[0][1] != 'x') {
    ctx.drawImage(o, 115, 15);
  }
  if (arr[0][2] == 0 && arr[0][2] != 'x') {
    ctx.drawImage(o, 215, 15);
  }
  if (arr[1][0] == 0 && arr[1][0] != 'x') {
    ctx.drawImage(o, 15, 115);
  }
  if (arr[1][1] == 0 && arr[1][1] != 'x') {
    ctx.drawImage(o, 115, 115);
  }
  if (arr[1][2] == 0 && arr[1][2] != 'x') {
    ctx.drawImage(o, 215, 115);
  }
  if (arr[2][0] == 0 && arr[2][0] != 'x') {
    ctx.drawImage(o, 15, 215);
  }
  if (arr[2][1] == 0 && arr[2][1] != 'x') {
    ctx.drawImage(o, 115, 215);
  }
  if (arr[2][2] == 0 && arr[2][2] != 'x') {
    ctx.drawImage(o, 215, 215);
  }
}

function user() {

  if (event.offsetX < 100 && event.offsetY < 100) {
    if (board.game[0][0] === 1) {
      ctx.drawImage(x, 15, 15);
      board.game[0].splice(0,1,'x');
      chekVictory();
      step();
      chekVictory();
      return board.game;
    }
  }
  if (200 > event.offsetX && event.offsetX > 100 &&  event.offsetY < 100) {
    if (board.game[0][1] === 1) {
      ctx.drawImage(x, 115, 15);
      board.game[0].splice(1,1,'x');
      chekVictory();
      step();
      chekVictory();
      return board.game;
    }
  }
  if (300 > event.offsetX && event.offsetX > 200 &&  event.offsetY < 100) {
    if (board.game[0][2] === 1) {
      ctx.drawImage(x, 215, 15);
      board.game[0].splice(2,1,'x');
      chekVictory();
      step();
      chekVictory();
      return board.game;
    }
  }
  if (event.offsetX < 100 && event.offsetY > 100 && event.offsetY < 200) {
    if (board.game[1][0] === 1) {
      ctx.drawImage(x, 15, 115);
      board.game[1].splice(0,1,'x');
      chekVictory();
      step();
      chekVictory();
      return board.game;
    }
  }
  if (100 < event.offsetX && event.offsetX < 200 && 200 > event.offsetY && event.offsetY > 100) {
    if (board.game[1][1] === 1) {
      ctx.drawImage(x, 115, 115);
      board.game[1].splice(1,1,'x');
      chekVictory();
      step();
      chekVictory();
      return board.game;
    }
  }
  if (200 < event.offsetX && event.offsetX < 300 && 200 > event.offsetY && event.offsetY > 100) {
    if (board.game[1][2] === 1) {
      ctx.drawImage(x, 215, 115);
      board.game[1].splice(2,1,'x');
      chekVictory();
      step();
      chekVictory();
      return board.game;
    }
  }
  if (event.offsetX < 100 && event.offsetY < 300 && event.offsetY > 200) {
    if (board.game[2][0] === 1) {
      ctx.drawImage(x, 15, 215);
      board.game[2].splice(0,1,'x');
      chekVictory();
      step();
      chekVictory();
      return board.game;
    }
  }
  if (100 < event.offsetX && event.offsetX < 200 && 300 > event.offsetY && event.offsetY > 200) {
    if (board.game[2][1] === 1) {
      ctx.drawImage(x, 115, 215);
      board.game[2].splice(1,1,'x');
      chekVictory();
      step();
      chekVictory();
      return board.game;
    }
  }
  if (200 < event.offsetX && event.offsetX < 300 && 300 > event.offsetY && event.offsetY > 200) {
    if (board.game[2][2] === 1) {
      ctx.drawImage(x, 215, 215);
      board.game[2].splice(2,1,'x');
      chekVictory();
      step();
      chekVictory();
      return board.game;
    }
  }
}

function chekVictory() {
  if (board.game[0][0] == 0 && board.game[0][1] == 0 && board.game[0][2] == 0) {
    let value = 0;

    gameOv(value);
  }
  if (board.game[1][0] == 0 && board.game[1][1] == 0 && board.game[1][2] == 0) {
    let value = 0;

    gameOv(value);
  }
  if (board.game[2][0] == 0 && board.game[2][1] == 0 && board.game[2][2] == 0) {
    let value = 0;

    gameOv(value);
  }
  if (board.game[0][0] == 0 && board.game[1][0] == 0 && board.game[2][0] == 0) {
    let value = 0;

    gameOv(value);
  }
  if (board.game[0][1] == 0 && board.game[1][1] == 0 && board.game[2][1] == 0) {
    let value = 0;

    gameOv(value);
  }
  if (board.game[0][2] == 0 && board.game[1][2] == 0 && board.game[2][2] == 0) {
    let value = 0;

    gameOv(value);
  }
  if (board.game[0][0] == 'x' && board.game[0][1] == 'x' && board.game[0][2] == 'x') {
    let value = 'X';

    gameOv(value);
  }
  if (board.game[1][0] == 'x' && board.game[1][1] == 'x' && board.game[1][2] == 'x') {
    let value = 'X';

    gameOv(value);
  }
  if (board.game[2][0] == 'x' && board.game[2][1] == 'x' && board.game[2][2] == 'x') {
    let value = 'X';

    gameOv(value);
  }
  if (board.game[0][0] == 'x' && board.game[1][0] == 'x' && board.game[2][0] == 'x') {
    let value = 'X';

    gameOv(value);
  }
  if (board.game[0][1] == 'x' && board.game[1][1] == 'x' && board.game[2][1] == 'x') {
    let value = 'X';

    gameOv(value);
  }
  if (board.game[0][2] == 'x' && board.game[1][2] == 'x' && board.game[2][2] == 'x') {
    let value = 'X';

    gameOv(value);
  }
  if (board.game[0][2] == 0 && board.game[1][1] == 0 && board.game[2][0] == 0) {
    let value = 0;

    gameOv(value);
  }
  if (board.game[0][0] == 0 && board.game[1][1] == 0 && board.game[2][2] == 0) {
    let value = 0;

    gameOv(value);
  }
  if (board.game[0][2] == 'x' && board.game[1][1] == 'x' && board.game[2][0] == 'x') {
    let value = 'X';

    gameOv(value);
  }
  if (board.game[0][0] == 'x' && board.game[1][1] == 'x' && board.game[2][2] == 'x') {
    let value = 'X';

    gameOv(value);
  }
}

function gameOv(who) {
  ctx.clearRect(0, 0, 300, 300);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 310, 310);
  ctx.font = "60px Lakki Reddy";
  ctx.fillStyle = 'black';
  ctx.fillText('Winner: ' + who, 20, 150);
  ctx.font = "30px Lakki Reddy";
  ctx.fillStyle = 'grey';
  ctx.fillText("Game Over", 80, 200);
  document.getElementById("button").style.display = 'block';
  document.getElementById("step").style.display = 'none';
}

const board = new Board();

board.fon();
board.getBoard();
canvas.addEventListener('click', user);
console.log(board.game);
