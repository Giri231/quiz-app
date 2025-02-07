import React, { useEffect, useState, useCallback } from "react";
import StartQuiz from "./components/StartQuiz";
import QuizQuestion from "./components/QuizQuestion";
import QuizResult from "./components/QuizResult";

const fetchQuizData = async () => {
    try {
      const response = await fetch("/quizData.json"); 
      console.log("reponse",response);

        if (!response.ok) throw new Error("Failed to fetch quiz data");

        const data = await response.json();
        console.log("data",data); 

        if (!data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
            throw new Error("No quiz data available.");
        }

        return data.questions.map(q => ({
            id: q.id,
            question: q.description, 
            options: q.options.map(opt => ({
                id: opt.id,
                text: opt.description, 
                isCorrect: opt.is_correct,
            })),
        }));
    } 
    catch (error) {
        console.error("Error fetching quiz data:", error);
        return [];
    }
};

const App = () => {
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
        const loadQuizData = async () => {
            const data = await fetchQuizData();
            if (data.length === 0) {
                setError("No quiz data available.");
            } else {
                setQuizData(data);
            }
            setLoading(false);
        };
        loadQuizData();
    }, []);


    //option click to check true or false
    const handleAnswer = useCallback(
        (selectedOption) => {
            if (currentQuestionIndex >= quizData.length) return;

            const currentQuestion = quizData[currentQuestionIndex];

            // Check if the selected option is correct
            if (selectedOption === currentQuestion.options.find(opt => opt.isCorrect)?.text) {
                setScore(prevScore => prevScore + 4); // ✅ Correct answer (+4)
            } else {
                setScore(prevScore => prevScore - 1); // ❌ Wrong answer (-1)
            }

            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setTimeLeft(10); // Reset timer
        },
        [currentQuestionIndex, quizData]
    );


    //last question
    useEffect(() => {
        if (!quizStarted || currentQuestionIndex >= quizData.length) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev === 0) {
                    handleAnswer(null); // Auto-submit if time runs out
                    return 10;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [quizStarted, currentQuestionIndex, handleAnswer, quizData.length]);



//restart 
    const restartQuiz = () => {
        setQuizStarted(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setTimeLeft(10);
    };

    if (loading) return <div>Loading quiz...</div>;
    if (error) return <div>Error: {error}</div>;



    return (
        <div>
            {!quizStarted ? (
                <StartQuiz onStart={() => setQuizStarted(true)} />
            ) : currentQuestionIndex < quizData.length ? (
                <>
                    {/* Progress Bar */}
                    <div style={{ width: "100%", backgroundColor: "#ddd", marginBottom: "20px" }}>
                        <div
                            style={{
                                width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%`,
                                backgroundColor: "green",
                                height: "10px",
                            }}
                        ></div>
                    </div>

                    <QuizQuestion
                        question={quizData[currentQuestionIndex].question} // Display correct question
                        options={quizData[currentQuestionIndex].options.map(opt => opt.text)} //  Show correct options
                        onAnswer={handleAnswer}
                        timeLeft={timeLeft}
                    />
                </>
            ) : (
                <QuizResult
                    score={score}
                    totalQuestions={quizData.length}
                    onRestart={restartQuiz}
                />
            )}
        </div>
    );
};

export default App;
