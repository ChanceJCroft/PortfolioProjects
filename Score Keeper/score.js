const p1Btn = document.querySelector('#p1Btn');
const p2Btn = document.querySelector('#p2Btn');
const p1Display = document.querySelector('#p1Display');
const p2Display = document.querySelector('#p2Display');
const resetBtn = document.querySelector('#resetBtn');
const winningScoreSelect = document.querySelector('#playto');

let p1Score = 0;
let p2Score = 0;
let winningScore = 3;
let gameOver = false;

//press player one score button to add a point, or win the game if at winning score
p1Btn.addEventListener('click', function(){
    if(!gameOver){
        p1Score++;
        p1Display.textContent = p1Score;
        if(p1Score === winningScore){
        gameOver = true;
        p1Display.classList.add('has-text-success');
        p2Display.classList.add('has-text-danger');
        p1Btn.disabled = true;
        p2Btn.disabled = true;
        }
    }
});

//press player two score button to add a point, or win the game if at winning score
p2Btn.addEventListener('click', function(){
    if(!gameOver){
        p2Score++;
        p2Display.textContent = p2Score;
        if(p2Score === winningScore){
        gameOver = true;
        p2Display.classList.add('has-text-success');
        p1Display.classList.add('has-text-danger');
        p1Btn.disabled = true;
        p2Btn.disabled = true;
        }
    }
});

//select winning score
winningScoreSelect.addEventListener('click', function(){
    winningScore = parseInt(this.value);
    reset();
});

//reset button everything to zero
resetBtn.addEventListener('click', reset);

function reset(){
    p1Score = 0;
    p1Display.textContent = 0;
    p2Score = 0;
    p2Display.textContent = 0;
    gameOver = false;
    p1Display.classList.remove('has-text-success', 'has-text-danger');
    p2Display.classList.remove('has-text-success', 'has-text-danger');
    p1Btn.disabled = false;
    p2Btn.disabled = false;
}