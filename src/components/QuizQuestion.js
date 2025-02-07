import React from 'react';

const QuizQuestion = ({ question, options, onAnswer, timeLeft }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>{question}</h2>
            <p>Time Left: {timeLeft} seconds</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {options.map((option, index) => (
                    <li key={index} style={{ margin: '10px 0' }}>
                        <button
                            onClick={() => onAnswer(option)}
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                backgroundColor: '#008CBA',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                width: '100%',
                            }}
                        >
                            {option}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizQuestion;