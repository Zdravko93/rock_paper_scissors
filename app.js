const choices = document.querySelectorAll(".option");
const playerScoreElement = document.querySelector(".player-score");
const computerScoreElement = document.querySelector(".computer-score");
const chooseMove = document.querySelector(".choose-move");
const movesLeft = document.querySelector(".moves-left p");
const result = document.querySelector(".result");
const resetBtn = document.querySelector(".reset");
const modal = document.querySelector(".modal");
const optionsElement = document.querySelector(".options");
const mainHeaderElement = document.querySelector("h1");

let playerScore = 0;
let computerScore = 0;
let moves = 0;

const game = () => {
    choices.forEach(choice => {
        choice.addEventListener("click", () => {
            moves++;
            if (moves === 10) {
                gameOver();
            } else if (moves > 10) {

                return;
            }
            movesLeft.textContent = `Moves Left: ${10 - moves}`;

            const playerChoice = choice.getAttribute(['data-choice']);
            const computerChoices = ['rock', 'paper', 'scissors'];
            const choiceIndex = Math.floor(Math.random() * 3);
            const computerChoice = computerChoices[choiceIndex];
            determineWinner(playerChoice, computerChoice);
            result.classList.remove("result-fade-in");
            void result.offsetWidth;
            result.classList.add("result-fade-in");
        })
    })
    resetBtn.addEventListener("click", resetGame);
};

const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === "rock" && computerChoice === "scissors" ||
        playerChoice === "scissors" && computerChoice === "paper" ||
        playerChoice === "paper" && computerChoice === "rock"
    ) {
        playerScore++;
        playerScoreElement.textContent = playerScore;
        result.textContent = "You win a point!";
    } else if (playerChoice === computerChoice) {
        result.textContent = "A Draw!";
    } else {
        computerScore++;
        computerScoreElement.textContent = computerScore;
        result.textContent = "Computer wins a point!";
    }
}

const gameOver = () => {
    result.textContent = "";
    const finalResult = playerScore === computerScore ? "Game Over! It's a draw!" :
        playerScore > computerScore ? "Game Over! You have won!" :
            "Game Over! Computer has won!"
    chooseMove.textContent = finalResult;
    chooseMove.style.marginTop = "1em";
    chooseMove.style.color = "red";
    chooseMove.style.fontSize = "2rem";
    resetBtn.style.display = "block";
    resetBtn.textContent = 'Reset Game';
    mainHeaderElement.style.opacity = "0";
    modal.removeAttribute("close");
    modal.setAttribute("open", "");
    movesLeft.style.display = "none";
    optionsElement.style.display = "none";
    result.style.display = "none";

    return;
}

const resetGame = () => {
    moves = 0;
    playerScore = 0;
    computerScore = 0;
    result.textContent = "";
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    chooseMove.style.color = "aquamarine";
    chooseMove.textContent = "Choose your move!";
    movesLeft.style.display = "block";
    movesLeft.textContent = `Moves Left: 10`;
    resetBtn.style.display = "none";
    mainHeaderElement.style.opacity = "1";
    modal.removeAttribute("open");
    modal.setAttribute("close", "");
    optionsElement.style.display = "flex";
    result.style.display = "flex";
}

game();
