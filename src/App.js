import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";
import "./App.css";
const cardIamges = [
  { src: "/img/helmet.jpg", matched: false },
  { src: "/img/scroll.jpeg", matched: false },
  { src: "/img/ring.jpeg", matched: false },
  { src: "/img/sword.webp", matched: false },
  { src: "/img/shield.jpg", matched: false },
  { src: "/img/potion.jpg", matched: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const shuffleCards = () => {
    const shuffledCards = [...cardIamges, ...cardIamges]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  console.log(cards);
  return (
    <div className="root">
      <div className="intru">
        <h1 className="how">How to play?</h1>
        <ul typeof="sqaure">
          <li>Firstly observe all cards.</li>

          <li>Remember the card's row & columm when you see any cartoon.</li>

          <li>Match the similar card.</li>
        </ul>
      </div>
      <div className="App">
        <h1 className="heading">Magic Match</h1>
        <button className="btnPlay" onClick={shuffleCards}></button>

        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              handleChoice={handleChoice}
              key={card.id}
              card={card}
              disabled={disabled}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          ))}
        </div>
        <p> Score: {turns}</p>
      </div>
    </div>
  );
}

export default App;
