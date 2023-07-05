const LANDING_PAGE = "landing";
const USER_DETAILS_PAGE = "user_details";
const TOPIC_SELECT_PAGE = "topic_select";
const QUIZ_PAGE = "quiz";
const RESULTS_PAGE = "results";

const ERROR = "error";
const ERROR_CLOSE_BTN = "error-close-btn";

// defining the pages
const userSectionPage = document.getElementById(USER_DETAILS_PAGE);
const topicSelectionPage = document.getElementById(TOPIC_SELECT_PAGE);

// this will be used for navigation through different sections of the code
const navigationStack = [LANDING_PAGE];

const userNameForm = document.querySelector('#user-form');

// defining the quiz questions

const sportsQuizzes = [
    {
        question: 'Who won the 10th Italian Open title in 2021?',
        choices: ['Novack Djokovic', 'Rafael Nadal', 'Dominic Thiem', 'Stefanos Tsitsipas'],
        correctChoice: 2
    },
    {
        question: 'India won Thomas Cup on May 15, 2022, by defeating whom?',
        choices: ['Indonesia', 'Malaysia', 'China', 'Denmark'],
        correctChoice: 1
    },
    {
        question: 'Only three countries have won the Women’s Rugby World Cup- New Zealand, England, and who?',
        choices: ['USA', 'Argentina', 'Romania', 'Georgia'],
        correctChoice: 1
    },
    {
        question: 'The term ‘Dolphin Kick’ is associated with which of the following games?',
        choices: ['Badminton', 'Squash', 'Swimming', 'Golf'],
        correctChoice: 3
    },
    {
        question: 'Which of the following footballers has the world record for the highest goal scorer for a single club?',
        choices: ['Lionel Messi (Barcelona FC)', 'Pele (Santos FC)', 'Gerd Muller (Bayern Munich)', 'Fernando Payrotes (Sporting CP)'],
        correctChoice: 1
    },
];
const technologyQuizzes = [
    {
        question: 'What is part of a database that holds only one type of information?',
        choices: ['Report', 'Field', 'Record', 'File'],
        correctChoice: 3
    },
    {
        question: 'In which decade with the first transatlantic radio broadcast occur?',
        choices: ['1850s', '1860s', '1890s', '1900s'],
        correctChoice: 4
    },
    {
        question: "'.MOV' extension refers usually to what kind of file?",
        choices: ['Image File', 'Animation/movie File', 'Audio File', 'MS Office Document'],
        correctChoice: 2
    },
    {
        question: "'OS' computer abbreviation usually means ?",
        choices: ['Order of Significance', 'Open Software', 'Operating System', 'Optical Sensor'],
        correctChoice: 3
    },
    {
        question: 'In which decade was the American Institute of Electrical Engineers (AIEE) founded?',
        choices: ['1850s', '1880s', '1930s', '1950s'],
        correctChoice: 2
    },
];


// setting the global variables
let quizIndex = null;
let totalQuizzes = null;
let quizzes = null;




// defining the error close button
let playerName = null;


function closeErrorModal() {
    const errorContainer = document.getElementById(ERROR);
    errorContainer.remove();
}

function createErrorMessage(errorMsg) {
    const errorContainer = document.createElement('div');
    errorContainer.id = ERROR;

    // creating the message container
    const messageContainer = document.createElement('div');
    messageContainer.innerText = `${errorMsg}`;

    // creating the button
    const closeButton = document.createElement('button');
    closeButton.id = ERROR_CLOSE_BTN;
    closeButton.innerText = "Close";
    closeButton.setAttribute('onClick', 'closeErrorModal()')

    errorContainer.appendChild(messageContainer);
    errorContainer.appendChild(closeButton);

    return errorContainer;
}

function updateTopicSelectPageAndNavigate() {
    playerName = localStorage.getItem('username') ?? 'anonymous';

    // creating the playerDisplay section
    const playerDisplaySection = document.createElement('h2');
    playerDisplaySection.textContent = `Hi ${playerName}!`;

    const topicBody = document.getElementById('topic-body');
    topicBody.insertBefore(playerDisplaySection, topicBody.firstChild);

    // now navigating to the page
    navigate(TOPIC_SELECT_PAGE);

}

/**
 *
 * @param {*} errorMsg
 * @param {*} page
 */

function displayError(errorMsg, page) {
    const errorContainer = createErrorMessage(errorMsg);
    page.appendChild(errorContainer);
}


function navigate(nextPageId) {
    const currentPageElement = document.getElementById(navigationStack[0]);
    const userNamePageElement = document.getElementById(nextPageId);
    currentPageElement.setAttribute('style', 'display: none');
    userNamePageElement.removeAttribute('style');
    navigationStack.unshift(nextPageId);
}

const userNamePageBtn = document.getElementById('username_page_btn');
userNamePageBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // getting the page out of the picture and going to the username page
    navigate(USER_DETAILS_PAGE);

    console.log(navigationStack);
});


userNameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = userNameForm.elements.namedItem("username").value;
    if (userName.trim().length >= 5) {
        localStorage.setItem("username", userName.trim());
        updateTopicSelectPageAndNavigate();
    } else {
        displayError('username should atleast consist of 5 characters', userSectionPage);
    }
});

// TOPIC SELECTION ITEMS START HERE
const techTopicDiv = document.getElementById('tech');
const sportTopicDiv = document.getElementById('sport');

function toggleTopics(selectTopic, unselectTopic, topicName) {
    let isSelected = selectTopic.getAttribute('aria-checked');
    if (isSelected == true) {
        selectTopic.setAttribute('aria-checked', !isSelected);
    } else {
        selectTopic.setAttribute('aria-checked', true);
        unselectTopic.setAttribute('aria-checked', false);
        localStorage.setItem('topic', `${topicName}`)
    }
}


techTopicDiv.addEventListener('click', (e) => {
    e.preventDefault();
    toggleTopics(techTopicDiv, sportTopicDiv, 'tech');
});

sportTopicDiv.addEventListener('click', (e) => {
    e.preventDefault();
    toggleTopics(sportTopicDiv, techTopicDiv, 'sports');
});

// on clicking the start quiz button
const quizPageButton = document.getElementById('quiz_start_btn');

// this is the starting point of the quiz button
quizPageButton.addEventListener('click', (e) => {
    e.preventDefault();
    // here first of all checking if the aria-checked field of either of the fields are true or not
    if (sportTopicDiv.getAttribute('aria-checked') === 'false' &&
        techTopicDiv.getAttribute('aria-checked') === 'false') {
        displayError("Please select a topic!", topicSelectionPage);
    } else {
        navigate(QUIZ_PAGE);
        // setting the score of the player
        localStorage.setItem('score', 0);

        content = localStorage.getItem('topic');

        if (content.toUpperCase() === 'TECH') {
            quizzes = technologyQuizzes;
        } else {
            quizzes = sportsQuizzes;
        }

        quizIndex = 0;
        totalQuizzes = quizzes.length;
        // here we gotta start the quiz
        playQuiz();
    }
});



function selectChoice(selectedIdx) {
    console.log('Idx to select' + selectedIdx);
    for (let choiceIdx = 1; choiceIdx <= 4; choiceIdx++) {
        const curId = `choice${choiceIdx}`;
        const curChoiceElement = document.getElementById(curId);
        if (choiceIdx === selectedIdx) {
            curChoiceElement.setAttribute('aria-checked', 'true');
        } else {
            curChoiceElement.setAttribute('aria-checked', 'false');
        }
    }
}

// adding the event listeners for all the choices
for (let i = 1; i <= 4; i++) {
    document.getElementById(`choice${i}`).addEventListener('click', () => {
        selectChoice(i);
        localStorage.setItem('choice', i);
    });
}





function populateQuizSection(quizContent, index) {
    document.getElementById('timer').innerText = '10';
    document.getElementById('quiz-question-id').innerText = `Question ${index}`;
    document.getElementById('question').innerText = quizContent.question;
    quizContent.choices.forEach((choice, idx) => {
        document.getElementById(`choice${idx + 1}`).innerText = `${choice}`;
    });
}

function clearChoices() {
    for (let index = 1; index <= 4; index++) {
        document.getElementById(`choice${index}`).removeAttribute('style');
        document.getElementById(`choice${index}`).setAttribute('aria-checked', 'false');
    }
}

// now implementing the quiz section



function displayTimer(timer) {
    document.getElementById('timer').innerText = `${timer}`;
}

function displayAnswer(message) {
    document.getElementById('timer').innerText = `${message}`;
    displayNextButton();
}

function hideNextButton() {
    document.getElementById('next-quiz-btn').setAttribute('style', 'visibility: hidden');
}

function displayNextButton() {
    document.getElementById('next-quiz-btn').removeAttribute('style');
}

function checkForCorrectAnswer(index, userChoice) {
    const correctChoice = quizzes[index].correctChoice;
    document.getElementById(`choice${correctChoice}`).setAttribute(
        'style',
        `
            background-color: green;
            color: #fff;
        `
    );
    if (userChoice > 0 && userChoice != correctChoice) {
        document.getElementById(`choice${userChoice}`).setAttribute(
            'style',
            `
            background-color: red;
            color: #fff;
        `
        );
        displayAnswer('Incorrect Answer');
    } else if (userChoice == correctChoice) {
        // here set the score of the player
        const prevScore = parseInt(localStorage.getItem('score') ?? '0');
        localStorage.setItem('score', prevScore + 1);
        displayAnswer('Correct Answer');
    } else {
        displayAnswer('You did not attempt this question');
    }
}

function playQuiz() {
    let nInterval;
    let timer = 10;


    if (quizIndex < totalQuizzes) {
        document.getElementById('quiz_container').removeAttribute('style');
        localStorage.setItem('choice', 0);
        const currentQuiz = quizzes[quizIndex];
        clearChoices();
        // here I need to remove the next button
        hideNextButton();
        populateQuizSection(currentQuiz, quizIndex + 1);
        do {
            let nInterval = setInterval(function () {
                if (timer < 1) {
                    clearInterval(nInterval);
                    const userChoice = parseInt(localStorage.getItem('choice') ?? '0');
                    checkForCorrectAnswer(quizIndex, userChoice);
                    nInterval = null;
                    quizIndex++;

                    // checking for the quizIndex
                    if (quizIndex == totalQuizzes) {
                        document.getElementById('next-quiz-btn').innerText = 'Show Results';
                    }
                } else {
                    displayTimer(timer-1);
                    timer--;
                }
            }, 1000);
        } while (nInterval != null);
    } else {
        navigate(RESULTS_PAGE);
        const totalQuestions = quizzes.length;
        const playerScore = parseInt(localStorage.getItem('score') ?? 0);
        document.getElementById('results_section').innerText =
            `You scored ${playerScore} out of ${totalQuestions}`;
    }
}


document.getElementById('next-quiz-btn').addEventListener('click', (e) => {
    e.preventDefault();
    playQuiz();
})
