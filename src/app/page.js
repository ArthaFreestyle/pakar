"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Laptop, Brain, ArrowRight, HelpCircle } from "lucide-react"
import RecommendationResult from "@/components/recomendation-result"
import { getNextQuestion, calculateConfidence, hasEnoughInformation } from "@/lib/fuzzy-sugeno"

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [answers, setAnswers] = useState({})
  const [askedQuestions, setAskedQuestions] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [thinking, setThinking] = useState(false)
  const [confidence, setConfidence] = useState(0)
  const [isInitializing, setIsInitializing] = useState(true)

  // Initialize with the first question
  useEffect(() => {
    if (isInitializing) {
      const firstQuestion = getNextQuestion({}, [])
      setCurrentQuestion(firstQuestion)
      setIsInitializing(false)
    }
  }, [isInitializing])

  // Update confidence whenever answers change
  useEffect(() => {
    const newConfidence = calculateConfidence(answers)
    setConfidence(newConfidence)
  }, [answers])

  const handleAnswer = (questionId, value) => {
    // Update answers
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    // Update asked questions
    const newAskedQuestions = [...askedQuestions, questionId]
    setAskedQuestions(newAskedQuestions)

    // Simulate thinking like Akinator
    setThinking(true)

    setTimeout(() => {
      // Check if we have enough information
      const enoughInfo = hasEnoughInformation(newAnswers)
      const currentConfidence = calculateConfidence(newAnswers)

      // If we have high confidence or enough questions, show result
      if (currentConfidence >= 85 || newAskedQuestions.length >= 8) {
        setThinking(false)
        setShowResult(true)
        return
      }

      // Get next question
      const nextQuestion = getNextQuestion(newAnswers, newAskedQuestions)

      if (!nextQuestion) {
        // No more questions, show result
        setThinking(false)
        setShowResult(true)
      } else {
        setThinking(false)
        setCurrentQuestion(nextQuestion)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    setAnswers({})
    setAskedQuestions([])
    setCurrentQuestion(getNextQuestion({}, []))
    setShowResult(false)
    setConfidence(0)
  }

  const skipToResults = () => {
    if (Object.keys(answers).length >= 2) {
      setThinking(true)
      setTimeout(() => {
        setThinking(false)
        setShowResult(true)
      }, 1500)
    }
  }

  // Calculate progress based on confidence
  const progress = confidence

  if (showResult) {
    return <RecommendationResult answers={answers} onReset={resetQuiz} />
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Laptop className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">Laptop Recommendation System</h1>
          </div>
          <Button variant="outline" onClick={resetQuiz}>
            Mulai Ulang
          </Button>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm text-gray-500">Keyakinan: {confidence.toFixed(0)}%</div>
          {Object.keys(answers).length >= 2 && (
            <Button variant="link" size="sm" onClick={skipToResults} className="text-purple-600">
              Lihat hasil sekarang
            </Button>
          )}
        </div>
        <Progress value={progress} className="h-2 mb-8" />

        {thinking ? (
          <Card className="mb-8 border-purple-200 shadow-md">
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
              <div className="animate-pulse flex flex-col items-center">
                <Brain className="h-16 w-16 text-purple-500 mb-4" />
                <p className="text-lg font-medium text-gray-700">Sedang berpikir...</p>
              </div>
            </CardContent>
          </Card>
        ) : currentQuestion ? (
          <Card className="mb-8 border-purple-200 shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">{currentQuestion.question}</h2>
              <div className="grid gap-3">
                {currentQuestion.options.map((option) => (
                  <Button
                    key={option.value}
                    variant="outline"
                    className="justify-between h-auto py-3 px-4 text-left hover:bg-purple-50 hover:border-purple-300 transition-all"
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  >
                    <span>{option.label}</span>
                    <ArrowRight className="h-4 w-4 ml-2 text-purple-500" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8 border-purple-200 shadow-md">
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
              <div className="flex flex-col items-center">
                <HelpCircle className="h-16 w-16 text-purple-500 mb-4" />
                <p className="text-lg font-medium text-gray-700">Memuat pertanyaan...</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center text-sm text-gray-500">
          Pertanyaan {askedQuestions.length + 1} • {askedQuestions.length} pertanyaan dijawab
        </div>
      </div>
    </div>
  )
}
