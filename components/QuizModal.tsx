import React, { useState } from 'react';
import { Quiz } from '../types';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface QuizModalProps {
  quiz: Quiz;
  onClose: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ quiz, onClose }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quiz.questions[currentQIndex];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex < quiz.questions.length - 1) {
      setCurrentQIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <div className="text-6xl mb-6">🏆</div>
          <p className="text-lg text-slate-700 mb-6">
            You scored <span className="font-bold text-blue-600">{score}</span> out of <span className="font-bold">{quiz.questions.length}</span>
          </p>
          <button 
            onClick={onClose}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Estuary
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
          <h3 className="font-bold text-lg">Knowledge Check</h3>
          <span className="text-sm bg-blue-500 px-2 py-1 rounded">Q{currentQIndex + 1}/{quiz.questions.length}</span>
        </div>

        <div className="p-6 overflow-y-auto">
          <p className="text-lg font-medium text-slate-800 mb-6">{currentQuestion.question}</p>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              let btnClass = "w-full p-4 text-left rounded-xl border transition-all duration-200 ";
              
              if (isAnswered) {
                if (idx === currentQuestion.correctAnswer) {
                  btnClass += "bg-green-100 border-green-500 text-green-800";
                } else if (idx === selectedOption) {
                  btnClass += "bg-red-100 border-red-500 text-red-800";
                } else {
                  btnClass += "bg-slate-50 border-slate-200 opacity-60";
                }
              } else {
                btnClass += "bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50";
              }

              return (
                <button 
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  disabled={isAnswered}
                  className={btnClass}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {isAnswered && idx === currentQuestion.correctAnswer && <CheckCircle className="w-5 h-5 text-green-600"/>}
                    {isAnswered && idx === selectedOption && idx !== currentQuestion.correctAnswer && <XCircle className="w-5 h-5 text-red-600"/>}
                  </div>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="mt-6 p-4 bg-slate-100 rounded-lg text-sm text-slate-700 border-l-4 border-blue-500">
              <p className="font-bold mb-1">Explanation:</p>
              {currentQuestion.explanation}
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-slate-50 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-slate-600 font-medium hover:text-slate-800">
                Cancel
            </button>
            <button 
                onClick={nextQuestion}
                disabled={!isAnswered}
                className={`px-6 py-2 rounded-lg font-semibold text-white transition-colors ${isAnswered ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-300 cursor-not-allowed'}`}
            >
                {currentQIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
