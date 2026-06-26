import { useState, useEffect, useRef } from 'react'
import { INITIAL_ALUMNI } from './data'
import Header from './components/Header'
import Stepper from './components/Stepper'
import Upload from './steps/Upload'
import Enriching from './steps/Enriching'
import Review from './steps/Review'
import Export from './steps/Export'

const STEP_ORDER  = ['upload', 'enriching', 'review', 'export']
const STEP_LABELS = { upload: 'Upload', enriching: 'Enrich', review: 'Review', export: 'Export' }

function findNextPending(alumni, from) {
  const total = alumni.length
  for (let k = 1; k <= total; k++) {
    const j = (from + k) % total
    if (alumni[j].status === 'pending') return j
  }
  return -1
}

export default function App() {
  const [step, setStep]           = useState('upload')
  const [fileChosen, setFileChosen] = useState(false)
  const [progress, setProgress]   = useState(0)
  const [idx, setIdx]             = useState(0)
  const [alumni, setAlumni]       = useState(INITIAL_ALUMNI)
  const timerRef = useRef(null)

  useEffect(() => () => clearInterval(timerRef.current), [])

  const updateAlumnus = (i, patch) => {
    setAlumni(prev => prev.map((a, j) => j === i ? { ...a, ...patch } : a))
  }

  const startEnrich = () => {
    setStep('enriching')
    setProgress(0)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setProgress(prev => {
        const p = Math.min(100, prev + (prev > 70 ? 2 : 4))
        if (p >= 100) {
          clearInterval(timerRef.current)
          setTimeout(() => { setStep('review'); setIdx(0) }, 550)
        }
        return p
      })
    }, 110)
  }

  const handleApprove = () => {
    const newAlumni = alumni.map((a, i) => i === idx ? { ...a, status: 'approved' } : a)
    setAlumni(newAlumni)
    const next = findNextPending(newAlumni, idx)
    setIdx(next)
  }

  const handleReject = () => {
    const newAlumni = alumni.map((a, i) => i === idx ? { ...a, status: 'rejected' } : a)
    setAlumni(newAlumni)
    const next = findNextPending(newAlumni, idx)
    setIdx(next)
  }

  const handleSkip = () => {
    setIdx(findNextPending(alumni, idx))
  }

  const cs = STEP_ORDER.indexOf(step)
  const stepperItems = STEP_ORDER.map((k, i) => {
    const done = i < cs, active = i === cs
    return {
      key:        k,
      label:      STEP_LABELS[k],
      mark:       done ? '✓' : String(i + 1),
      opacity:    i <= cs ? 1 : 0.45,
      dotBg:      done ? '#3f7d5b' : active ? '#7b2c39' : '#fff',
      dotColor:   (done || active) ? '#fff' : '#8a8475',
      dotBorder:  done ? '#3f7d5b' : active ? '#7b2c39' : '#d9d2c2',
      labelColor: active ? '#21283b' : done ? '#3f7d5b' : '#8a8475',
      weight:     active ? 700 : 500,
      connector:  i < cs ? '#3f7d5b' : '#e6e1d6',
    }
  })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f6f4ee' }}>
      <Header batchName="Spring 2026 · 1,284 records" />
      <Stepper items={stepperItems} />

      {step === 'upload' && (
        <Upload
          fileChosen={fileChosen}
          alumni={alumni}
          onChoose={() => setFileChosen(true)}
          onReset={() => setFileChosen(false)}
          onEnrich={startEnrich}
        />
      )}

      {step === 'enriching' && <Enriching progress={progress} />}

      {step === 'review' && (
        <Review
          alumni={alumni}
          idx={idx}
          onSetIdx={setIdx}
          onUpdateAlumnus={updateAlumnus}
          onGoExport={() => setStep('export')}
          onApprove={handleApprove}
          onReject={handleReject}
          onSkip={handleSkip}
        />
      )}

      {step === 'export' && (
        <Export
          alumni={alumni}
          onBackReview={() => {
            const n = findNextPending(alumni, -1)
            setStep('review')
            setIdx(n >= 0 ? n : 0)
          }}
        />
      )}
    </div>
  )
}