//timer

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progresstext = document.getElementById("progressText");
const scoretext = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");


let CurrentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let QuestionCounter = 0;
let availableQuestions = [];
let questions = [
    {
        question : "How many teeth are in deciduous dentition ?  ",
        choice1 : "20",
        choice2 : "18",
        choice3 : "10",
        choice4 : "32",
        answer : 1
    },
    {
        question : "How many cusps are in the upper 7 ? ",
        choice1 : "5",
        choice2 : "4",
        choice3 : "3",
        choice4 : "6",
        answer : 2
    },
    {
        question : "The hardest layer of the tooth is called ?",
        choice1: "Enamel",
        choice2: "Dentine",
        choice3: "Cementum",
        choice4: "Pulp Champer",
        answer : 1
    },
    {
        question : "A depression on the lingual surface of anterior teeth ?",
        choice1 : "cingulum",
        choice2 : "Cervical ridge",
        choice3 : "Lingual fossae",
        choice4 : "Marginal ridge",
        answer : 3
    }
]
//CONSTANTS
var time_bonus = 0;
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4 ;

StartGame = () => {
   
    QuestionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    
}

getNewQuestion = () => {

    if (availableQuestions.length === 0 || QuestionCounter >=MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("/final.html");
    }
    
    QuestionCounter++;
    progresstext.innerText = "Question"+ QuestionCounter ;


  const questionIndex =  Math.floor(Math.random() * availableQuestions.length);
  CurrentQuestion = availableQuestions[questionIndex];
  question.innerText = CurrentQuestion.question;

  choices.forEach( (choice) => {
    const number = choice.dataset["number"];
    choice.innerText = CurrentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1 );

  acceptingAnswers = true;
};

choices.forEach(choice =>{
    choice.addEventListener('click', (e) => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedchoice = e.target;
        const selectedAnswer = selectedchoice.dataset["number"];

       const classToApply = selectedAnswer == CurrentQuestion.answer ? "correct" : "incorrect";

       if (classToApply === "correct") {

        incrementScore(CORRECT_BONUS);
         countdownTime+= 10
        
       }

       selectedchoice.parentElement.classList.add(classToApply);
       
       setTimeout( () =>{

        selectedchoice.parentElement.classList.remove(classToApply);
        
        getNewQuestion();
       }, 1000);

     

    });
});

incrementScore = num => {
    score += num;
    scoretext.innerText = score;
  
} 
// Set the countdown time in seconds
var countdownTime = 120;

// Function to start the countdown timer
function startCountdown() {
    var timerElement = document.getElementById('time');

    // Update the timer every second
    var countdown = setInterval(function() {
        // Display the remaining time
        timerElement.innerHTML = formatTime(countdownTime);

        // Decrease the remaining time
        countdownTime--;

        // If the countdown reaches zero, stop the timer
        if (countdownTime < 0) {
            clearInterval(countdown);
            localStorage.setItem('mostRecentScore', score);
            window.location.assign("/end.html");
        }
    }, 1000);
}

// Function to format time in MM:SS format
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    return padZero(minutes) + ":" + padZero(remainingSeconds);
}

// Function to pad single digit numbers with zero
function padZero(num) {
    return (num < 10 ? '0' : '') + num;
}

// Start the countdown timer when the page loads
window.onload = startCountdown;


StartGame();

