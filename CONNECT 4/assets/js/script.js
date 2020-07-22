let playerOne = prompt("Please enter the name for Player One", "Player One");
let playerTwo = prompt("Please enter the name for Player Two", "Player Two");
const playerOneInfo = document.getElementById('playerOneInfo');
const playerTwoInfo = document.getElementById('playerTwoInfo');
let playerOneWins = 0;
let playerTwoWins = 0;
let playerOneTurn = true;
const columnOne = document.getElementsByClassName("columnOne");
const columnTwo = document.getElementsByClassName("columnTwo");
const columnThree = document.getElementsByClassName("columnThree");
const columnFour = document.getElementsByClassName("columnFour");
const columnFive = document.getElementsByClassName("columnFive");
const columnSix = document.getElementsByClassName("columnSix");
const columnSeven = document.getElementsByClassName("columnSeven");
const playerOneToken = 'redCircle.png';
const playerTwoToken = 'blackCircle.jpg';


playerOneInfo.textContent = playerOne + " wins: " + playerOneWins;
playerTwoInfo.textContent = playerTwo + " wins: " + playerTwoWins;



var columnOneNum = 1;
var columnTwoNum = 1;
var columnThreeNum = 1;
var columnFourNum = 1;
var columnFiveNum = 1;
var columnSixNum = 1;
var columnSevenNum = 1;


function selectColumnOne() {
    var img = document.createElement('img');
    if(playerOneTurn == true) {
        img.src = playerOneToken;}
        else {
            img.src = playerTwoToken;
        }
    columnOne[columnOne.length - columnOneNum].appendChild(img);
    columnOneNum++;
    playerOneTurn = !playerOneTurn;
  }

  function selectColumnTwo() {
    var img = document.createElement('img');
    if(playerOneTurn == true) {
        img.src = playerOneToken;}
        else {
            img.src = playerTwoToken;
        }
    columnTwo[columnTwo.length - columnTwoNum].appendChild(img);
    columnTwoNum++;
    playerOneTurn = !playerOneTurn;
  }

  function selectColumnThree() {
    var img = document.createElement('img');
    if(playerOneTurn == true) {
        img.src = playerOneToken;}
        else {
            img.src = playerTwoToken;
        }
    columnThree[columnThree.length - columnThreeNum].appendChild(img);
    columnThreeNum++;
    playerOneTurn = !playerOneTurn;
  }

  function selectColumnFour() {
    var img = document.createElement('img');
    if(playerOneTurn == true) {
        img.src = playerOneToken;}
        else {
            img.src = playerTwoToken;
        }
    columnFour[columnFour.length - columnFourNum].appendChild(img);
    columnFourNum++;
    playerOneTurn = !playerOneTurn;
  }

  function selectColumnFive() {
    var img = document.createElement('img');
    if(playerOneTurn == true) {
        img.src = playerOneToken;}
        else {
            img.src = playerTwoToken;
        }
    columnFive[columnFive.length - columnFiveNum].appendChild(img);
    columnFiveNum++;
    playerOneTurn = !playerOneTurn;
  }

  function selectColumnSix() {
    var img = document.createElement('img');
    if(playerOneTurn == true) {
        img.src = playerOneToken;}
        else {
            img.src = playerTwoToken;
        }
    columnSix[columnSix.length - columnSixNum].appendChild(img);
    columnSixNum++;
    playerOneTurn = !playerOneTurn;
  }

  function selectColumnSeven() {
    var img = document.createElement('img');
    if(playerOneTurn == true) {
        img.src = playerOneToken;}
        else {
            img.src = playerTwoToken;
        }
    columnSeven[columnSeven.length - columnSevenNum].appendChild(img);
    columnSevenNum++;
    playerOneTurn = !playerOneTurn;
  }
