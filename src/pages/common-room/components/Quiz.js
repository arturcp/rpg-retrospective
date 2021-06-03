import React from 'react';
import './quiz-styles.scss';

const quiz = (props) => {
  const { quiz } = props;

  return (
    <div className="quiz">
      <h3>Which {quiz.theme} does {quiz.playerName} prefer?</h3>
      <div>
        <input type="radio" id="quiz-option1" name="quiz-option" value={quiz.option1} data-quiz-option />
        <label htmlFor="quiz-option1">{quiz.option1}</label>
      </div>
      <div>
        <input type="radio" id="quiz-option2" name="quiz-option" value={quiz.option2} data-quiz-option />
        <label htmlFor="quiz-option2">{quiz.option2}</label>
      </div>
      <div>
        <input type="radio" id="quiz-option3" name="quiz-option" value={quiz.option3} data-quiz-option />
        <label htmlFor="quiz-option3">{quiz.option3}</label>
      </div>
      <div>
        <input type="radio" id="quiz-option4" name="quiz-option" value={quiz.option4} data-quiz-option />
        <label htmlFor="quiz-option4">{quiz.option4}</label>
      </div>
    </div>
  );
}

export default quiz;
