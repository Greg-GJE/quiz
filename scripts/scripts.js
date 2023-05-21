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
const quizPage = document.getElementById(QUIZ_PAGE);

// this will be used for navigation through different sections of the code
const navigationStack = [LANDING_PAGE];

const userNameForm = document.querySelector('#user-form');

// defining the error close button


/*
<div id="error">
        <div>Error occurred</div>
        <button id="error-close-btn">X</button>
    </div>
*/

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
    if (userName.length > 0) {
        // adding the username to the localstorage
        console.log('Will add to localstorage and then work on the next page');
    } else {
        displayError('username cannot be empty', userSectionPage);
    }
});
