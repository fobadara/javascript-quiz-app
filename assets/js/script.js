/* jshint esversion: 6 */
const question = document.querySelector("#question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = -1;
let availableQuestions = [];

let questions = [{
    question: "What is JavaScript?",
    choice1: "A Web Browser",
    choice2: "A Programming/Scripting Language",
    choice3: "A Game",
    choice4: "An App",
    answer: 2,
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    choice1: "The <title> tag",
    choice2: "The <body> section",
    choice3: "The <head> section",
    choice4: "Both the <head> section and the <body> section are correct",
    answer: 4,
  },
  {
    question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    choice1: '<source = "xxx.js">',
    choice2: '<script href="xxx.js">',
    choice3: '<script name="xxx.js">',
    choice4: '<script src="xxx.js">',
    answer: 4,
  },
  {
    question: "Who created JavaScript and in what year?",
    choice1: "Brendan Eich, 1985",
    choice2: "Guido van Rossum, 1991",
    choice3: "Brendan Eich, 1995",
    choice4: "Guido van Rossum, 1995",
    answer: 3,
  },
  {
    question: 'querySelectorAll() returns all HTML Elements that match a given css selector while querySelector()......',
    choice1: 'returns the first HTML element that matches the CSS Selector',
    choice2: 'deletes all elements that match the CSS Selector',
    choice3: 'returns the last HTML element that matches the CSS Selector',
    choice4: 'returns all elements that match the CSS Selector',
    answer: 1,
  },
  {
    question: "If a variable is declared inside a function, what is that variable called and can that variable be accessed outside the function?",
    choice1: "Local Variable, Yes",
    choice2: "Internal Variable, No",
    choice3: "Internal Variable, Yes",
    choice4: "Local Variable, No",
    answer: 4,
  },
  {
    question: 'How does a WHILE loop start?',
    choice1: 'while (i <= 10; i++)',
    choice2: 'while (i <= 10)',
    choice3: 'while i = 1 to 10',
    choice4: 'while i = 10',
    answer: 2,
  },
  {
    question: 'How do you write an IF statement for executing some code if "i" is NOT equal to 5?',
    choice1: "if (i <> 5)",
    choice2: "if (i != 5)",
    choice3: "if i <> 5",
    choice4: "if i =! 5",
    answer: 2,
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    choice1: "onmouseclick",
    choice2: "onmouseover",
    choice3: "onchange",
    choice4: "onclick",
    answer: 4,
  },
  {
    question: "How does a FOR loop start?",
    choice1: "for i = 1 to 5",
    choice2: "for (i <= 5; i++)",
    choice3: "for (i = 0; i <= 5; i++)",
    choice4: "for (i = 0; i <= 5)",
    answer: 3,
  },
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = -1;
  score = 0;
  availableQuestions = [...questions];
  setNextQuestion();
};

setNextQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset.number;
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset.number;

    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      setNextQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();