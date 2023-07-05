# Quizzer

Get your knowledge quizzed on sports and technology and receive a score!

## Features

In order to keep in the spirit of Single Page Applications (SPA), only one HTML file has been used. The various sections as we can see below represent a section in this HTML page which is being handled by CSS and JS. These respective sections are handled by the routing-stack that is present in the the JS section of the code.

- **Personification**
Here, the application takes in the name of the user which will be used for playing the quiz. The name of the user is stored in localstorage of the browser as a result, the user name gets displayed in the next section as well.
   ![image](https://github.com/Greg-GJE/quiz/assets/130982904/1b18ec2c-af9f-4cb5-ae9d-963782e15c51)

- **Topic Selection**

Here the user can select the topic of the quiz they want to proceed with. Currently there are two sections, *Technology* and *Sports*.

![image](https://github.com/Greg-GJE/quiz/assets/130982904/e6339b0a-0c10-4570-bb82-addc4b0db59e)

- **Instantly see the correct/incorrect-ness of your answer**

The quiz application uses a timer of 10 seconds for each quiz, it comes up with three different messages
    - Correct Answer: If the user selects correct answer
    - Incorrect Answer: If the user selects incorrect answer
    - Not Attempted: If the user has not attempted the question
  ![image](https://github.com/Greg-GJE/quiz/assets/130982904/a2f71387-fc93-4ad6-b956-89c15a10bb46), ![image](https://github.com/Greg-GJE/quiz/assets/130982904/b6a55bb1-406c-49f0-9269-724ef4da041b), ![image](https://github.com/Greg-GJE/quiz/assets/130982904/1e5d1a62-316a-4cab-a286-9dfbc70513de)

- Have a timer counting down ![image](https://github.com/Greg-GJE/quiz/assets/130982904/6020d74b-faaf-47e6-bb8b-7e29166dd094)

- See your final score ![image](https://github.com/Greg-GJE/quiz/assets/130982904/359d44f1-203a-4c22-9136-a53da86ed7a1)

### Features Left to Implement

- Some illustrations can be add to make the website look more user-intuitive
- Can add the option to shuffle the quiz questions, currently the questions are coming in a predefined order
- Can add an external service so that the quiz questions come from there, in this way the questions are always updated
- Leaderboard section where users can see their performance over time
- Best score section for the user

#### Validator Testing

- HTML
  - No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/)
- CSS
  - No errors were found when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/)
- JavaScript
  - No errors were found when passing through the official [Jshint validator](https://jshint.com/)
    - The following metrics were returned:
      - There are 24 functions in this file.
      - Function with the largest signature take 3 arguments, while the median is 1.
      - Largest function has 15 statements in it, while the median is 3.
      - The most complex function has a cyclomatic complexity value of 5 while the median is 1.

#### Unfixed Bugs

Currently when the user reloads the page, the application resets itself to the previous stage. This is owing to the fact that since all the navigation is handled by the JS itself and there is no persistance implemented as a result the routing stack is emptied.

Persistance of the routing stack will solve this issue.

## Installation and Deployment

To run the project locally, follow these steps:

1. Clone the repository: `git https://github.com/Greg-GJE/quiz`
2. Open the `index.html` file in your web browser.

Alternatively, you can access the live deployment on [GitHub Pages](https://greg-gje.github.io/quiz).

## Attribution

The code for this project is original and written by the project owner.

## Contact

For any questions, suggestions, or feedback, please reach out to at <gjegreg@gmail.com>.
