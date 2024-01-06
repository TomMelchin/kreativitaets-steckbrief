import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'
import confetti from 'canvas-confetti';

const cardImages = [
  { source: "berit.jpg", matched: false },
  { source: "HS.png", matched: false },
  { source: "MoodMoon.png", matched: false },
  { source: "App.png", matched: false },
  { source: "inspiration.jpg", matched: false },
  { source: "brainstorming.jpg", matched: false },
  { source: "kreativ.png", matched: false },
  { source: "KIBild.jpg", matched: false },
  { source: "Mondrahmen.jpg", matched: false },
]

function App() {

  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [turns, setTurns] = useState(0)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const restartGame = () => {
    cards.forEach(card => {
      card.matched = false
    })
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
    setTimeout(() => shuffleCards(), 300)
  }

  const handleChoice = (card) => {
    if (card.id === choiceOne?.id) {
      return
    }
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (!choiceOne || !choiceTwo) {
      return
    }
    setDisabled(true)
    if (choiceOne.source === choiceTwo.source) {
      if (cards.filter(c => c.matched === false).length === 2) {
        shootConfetti()
      }

      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.source === choiceOne.source) {
            return { ...card, matched: true }
          }
          return card
        })
      })
      resetTurn()
    }
    else {
      setTimeout(() => resetTurn(), 1000)
    }
    // eslint-disable-next-line
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="app">
      <div className="header-box">
        <h2 className="header">Kreativitäts-Steckbrief</h2>
        <div className="flexbox">
          <button className="new-game" onClick={restartGame}>neues Spiel</button>
          <span className="turns">Züge: {turns}</span>
        </div>
      </div>

      <div className="card-grid">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  )

  function shootConfetti(){
    var count = 300;
        var defaults = {
          origin: { y: 1.0 }
        }

        function fire(particleRatio, opts) {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
          });
        }

        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        })
        fire(0.2, {
          spread: 60,
        })
        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8
        })
        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2
        })
        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        })
  }
}

export default App