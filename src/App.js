import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Card from "./components/card";
import { useEffect, useState } from "react";

function App() {
  //---components
  const [cards, setCards] = useState([]);
  const [countGame, setCountGame] = useState(0);
  const flashCard = [
    { src: "images/helmet-1.png", matched:false},
    { src: "images/potion-1.png", matched:false},
    { src: "images/ring-1.png", matched:false},
    { src: "images/scroll-1.png", matched:false},
    { src: "images/shield-1.png", matched:false},
    { src: "images/sword-1.png", matched:false},
  ];

  const shuffleCard = () => {
    const suffle = [...flashCard , ...flashCard]
    .sort(()=> Math.random() - 0.5)
    .map((card)=>({...card , id : Math.floor(Math.random()*1000000)}))
    setCards(suffle);
    setChoiseOne(null);
    setChoiseTwo(null);
    setShowTurn(true);
    setCountGame(0);
  };
    //two-choise
    const[choiseOne,setChoiseOne] = useState(null);
    const[choiseTwo,setChoiseTwo] = useState(null);
    //---
  const handleChoise = (items) =>{
    choiseOne ? setChoiseTwo(items) : setChoiseOne(items)
  }
  useEffect(()=>{
    if(choiseOne && choiseTwo){
      setDisable(true)
      if(choiseOne.src === choiseTwo.src){
        setCards(prevCards=>{
          return prevCards.map(card => {
            if(card.src === choiseOne.src){
              return {...card , matched:true}
            }else{
              return card
            }
          })
        })
        console.log("Match");
        reset_increse()
      }else{
        console.log("Not Match");
        setTimeout(()=>reset_increse() , 1000)
      }
    }
  },[choiseOne,choiseTwo])  
  //reset card and increase truns
  const reset_increse = () =>{
    setChoiseOne(null);
    setChoiseTwo(null);
    setCountGame(prev=>prev+1);
    setDisable(false);
  }
  const [disbale,setDisable] = useState(false);
  const [showTrun , setShowTurn] = useState(false)

  useEffect(()=>{
    shuffleCard();
  },[])
  return (
    <div className="App">
      <div className="content-menu">
        <h4>Memory Game</h4>
        <button onClick={shuffleCard}>New Game</button>
      </div>
      <div className="card-grid container-fluid">
        {cards.map((card) => (
          <Card key={card.id} card={card} handleChoise={handleChoise} flipped = {card === choiseOne || card === choiseTwo || card.matched } disbale={disbale} />         
        ))}
      </div>
      {
        showTrun && (
          <div className="turn">
          <span>
          {countGame}
        </span>
          </div>
        )
      }
    </div>
  );
}

export default App;
