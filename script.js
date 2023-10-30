const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');


startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
   quizSection.classList.add('active');
   popupInfo.classList.remove('active');
   main.classList.remove('active');
   quizBox.classList.add('active');

   showQuestions(0);
   questionCounter(1);
   headerScore();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

     questionCount = 0;
     questionNumb = 1;
     userScore = 0;
     showQuestions(questionCount);
     questionCounter(questionNumb);

     headerScore();

}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

     questionCount = 0;
     questionNumb = 1;
     userScore = 0;
     showQuestions(questionCount);
     questionCounter(questionNumb);

}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if(questionCount < questoes.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    }
    else{ 
        showResultBox();
    }
}

const optionList = document.querySelector('.option-list');



function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questoes[index].numb}. ${questoes[index].questao}`;

   let optionTag = `<div class="option"><span>${questoes[index].opcoes[0]}</span></div>
                    <div class="option"><span>${questoes[index].opcoes[1]}</span></div>
                    <div class="option"><span>${questoes[index].opcoes[2]}</span></div>
                    <div class="option"><span>${questoes[index].opcoes[3]}</span></div>`;
    
   optionList.innerHTML = optionTag;

   const option = document.querySelectorAll('.option'); 
   for(let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
   }
}

function optionSelected(resposta) {
    let userResposta = resposta.textContent;
    let correctResposta = questoes[questionCount].resposta;
    let allOptions = optionList.children.length;

    if (userResposta === correctResposta) {
        resposta.classList.add('correta');
        userScore += 1;
        headerScore();
    } else {
        resposta.classList.add('incorreta');

        for (let i = 0; i < allOptions; i++) {
            if(optionList.children[i].textContent == correctResposta) {
               optionList.children[i].setAttribute('class', 'opcoes correta');
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled'); 
    }

    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} de ${questoes.length} Questões`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Pontos: ${userScore} / ${questoes.length}`;
}
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Seus Pontos são ${userScore} de ${questoes.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questoes.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#f05227 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        if (progressStartValue == progressEndValue){
            clearInterval(progress);
        }

    },speed)
}