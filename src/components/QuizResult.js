import React from 'react';

const QuizResult = ({ score, totalQuestions, onRestart }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Quiz Completed!</h1>
            <p>Your Score: {score} / {totalQuestions}</p>
            <button
                onClick={onRestart}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Restart Quiz
            </button>
        </div>
    );
};

export default QuizResult;