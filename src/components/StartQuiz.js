import React from 'react';

const StartQuiz = ({ onStart }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Quiz!</h1>
            <button
                onClick={onStart}
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
                Start Quiz
            </button>
        </div>
    );
};

export default StartQuiz;