import React, { useState } from "react";
import "./card.scss";
export default function Card({ card, handleChoise , flipped,disbale}) {
  const handleClick = () => {
    if(!disbale){
      handleChoise(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped":""}>
        <img src={card.src} alt="card image front" className="front" />
        <img
          src="images/cover.png"
          alt="card image back"
          className="back"
          onClick={handleClick}
          
        />
      </div>
    </div>
  );
}
