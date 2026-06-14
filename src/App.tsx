import { useState, useEffect, useCallback } from 'react'
import { CATEGORIES, Category, Question } from './questions'
import { Trophy, Clock, RotateCcw, ChevronRight } from 'lucide-react'

type Screen = 'home' | 'quiz' | 'result'

const TIME_PER_Q = 20

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [category, setCategory] = useState<Category | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q)
  const [showExplanation, setShowExplanation] = useState(false)

  const nextQuestion = useCallback(() => {
    setAnswers(a => { const n=[...a]; n[current]=selected; return n })
    setSelected(null)
    setShowExplanation(false)
    if (current + 1 >= questions.length) setScreen('result')
    else { setCurrent(c => c+1); setTimeLeft(TIME_PER_Q) }
  }, [current, questions.length, selected])

  useEffect(() => {
    if (screen !== 'quiz') return
    if (showExplanation) return
    if (timeLeft === 0) { setAnswers(a => { const n=[...a]; n[current]=null; return n }); setShowExplanation(true); return }
    const t = setTimeout(() => setTimeLeft(s => s-1), 1000)
    return () => clearTimeout(t)
  }, [screen, timeLeft, current, showExplanation])

  function startQuiz(cat: Category) {
    const shuffled = [...cat.questions].sort(() => Math.random()-0.5).slice(0,5)
    setCategory(cat); setQuestions(shuffled); setAnswers(new Array(shuffled.length).fill(null))
    setCurrent(0); setSelected(null); setTimeLeft(TIME_PER_Q); setShowExplanation(false)
    setScreen('quiz')
  }

  function handleSelect(i: number) {
    if (showExplanation) return
    setSelected(i); setShowExplanation(true)
  }

  const score = answers.filter((a,i) => a === questions[i]?.correct).length
  const pct = Math.round((score/questions.length)*100)

  if (screen === 'home') return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-violet-600 flex items-center justify-center mx-auto mb-4">
            <Trophy size={28} className="text-white"/>
          </div>
          <h1 className="text-4xl font-bold mb-2">Quiz App</h1>
          <p className="text-slate-400">Test your knowledge. 5 questions · 20 seconds each</p>
        </div>
        <div className="space-y-3">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => startQuiz(cat)}
              className="w-full p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 hover:bg-slate-800 transition-all text-left flex items-center gap-4">
              <span className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-sm font-bold font-mono text-violet-400 border border-slate-700">{cat.emoji}</span>
              <div>
                <p className="font-semibold">{cat.label}</p>
                <p className="text-sm text-slate-400">{cat.questions.length} questions</p>
              </div>
              <ChevronRight size={18} className="ml-auto text-slate-600"/>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  if (screen === 'quiz' && questions[current]) {
    const q = questions[current]
    const timerPct = (timeLeft/TIME_PER_Q)*100
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-slate-400 font-mono">Question {current+1} of {questions.length}</span>
            <div className="flex items-center gap-2">
              <Clock size={16} className={timeLeft <= 5 ? 'text-rose-400' : 'text-slate-400'}/>
              <span className={`font-mono font-bold text-lg w-8 text-right ${timeLeft<=5?'text-rose-400':timeLeft<=10?'text-amber-400':'text-slate-200'}`}>{timeLeft}</span>
            </div>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full mb-8">
            <div className="h-full bg-violet-500 rounded-full transition-all duration-1000" style={{width:`${timerPct}%`}}/>
          </div>
          <div className="mb-4">
            <div className="flex gap-1 mb-6">
              {questions.map((_,i)=>(
                <div key={i} className={`h-1 flex-1 rounded-full ${i<current?'bg-violet-500':i===current?'bg-slate-400':'bg-slate-800'}`}/>
              ))}
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-6 leading-relaxed">{q.question}</h2>
          <div className="space-y-3 mb-6">
            {q.options.map((opt, i) => {
              let cls = 'border-slate-700 bg-slate-900 hover:border-slate-600 hover:bg-slate-800'
              if (showExplanation) {
                if (i === q.correct) cls = 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                else if (i === selected) cls = 'border-rose-500 bg-rose-500/10 text-rose-300'
                else cls = 'border-slate-800 bg-slate-900 opacity-50'
              } else if (selected === i) cls = 'border-violet-500 bg-violet-500/10'
              return (
                <button key={i} onClick={() => handleSelect(i)}
                  className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all ${cls} ${showExplanation?'cursor-default':''}`}>
                  <span className="inline-block w-6 h-6 rounded-md bg-slate-800 text-xs text-center leading-6 mr-3 font-mono text-slate-400">
                    {String.fromCharCode(65+i)}
                  </span>
                  {opt}
                </button>
              )
            })}
          </div>
          {showExplanation && (
            <div className="mb-6 p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-sm text-slate-300">
              <span className="font-semibold text-slate-200">Explanation: </span>{q.explanation}
            </div>
          )}
          {showExplanation && (
            <button onClick={nextQuestion} className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors">
              {current+1 >= questions.length ? 'See Results' : 'Next Question'} →
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${pct>=80?'bg-emerald-500/20':pct>=50?'bg-amber-500/20':'bg-rose-500/20'}`}>
          <Trophy size={36} className={pct>=80?'text-emerald-400':pct>=50?'text-amber-400':'text-rose-400'}/>
        </div>
        <h2 className="text-3xl font-bold mb-2">{pct>=80?'Excellent!':pct>=50?'Good Job!':'Keep Practicing!'}</h2>
        <p className="text-slate-400 mb-8">{category?.label} · {score}/{questions.length} correct · {pct}%</p>
        <div className="space-y-2 mb-8 text-left">
          {questions.map((q,i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${answers[i]===q.correct?'bg-emerald-500/10 border border-emerald-500/20':'bg-rose-500/10 border border-rose-500/20'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${answers[i]===q.correct?'bg-emerald-500 text-white':'bg-rose-500 text-white'}`}>{answers[i]===q.correct?'✓':'✗'}</span>
              <span className="text-sm text-slate-300 truncate">{q.question}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={() => category && startQuiz(category)} className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors flex items-center justify-center gap-2">
            <RotateCcw size={16}/> Try Again
          </button>
          <button onClick={() => setScreen('home')} className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors">
            Change Category
          </button>
        </div>
      </div>
    </div>
  )
}
