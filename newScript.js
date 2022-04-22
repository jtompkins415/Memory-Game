const gameContainer = document.getElementById("game");
let FlippedCard = 0;
let firstCard = null; 
let secondCard = null;
let lockBoard = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

    function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
    
      return array;
    }
    
    let shuffledColors = shuffle(COLORS);

    function createDivsForColors(colorArray) {
        for (let color of colorArray) {
            const newDiv = document.createElement("div");
            newDiv.classList.add(color);
            newDiv.addEventListener("click", handleCardClick);
            gameContainer.append(newDiv); 
        }
      }


    function handleCardClick(event) {
     if (lockBoard) return;
     if(event.target.classList.contains('flipped')) return;

     let card = event.target;
     card.style.backgroundColor = card.classList[0];

     if(!firstCard || !secondCard){
       card.classList.add('flipped');
       firstCard = firstCard || card;
       secondCard = card === firstCard ? null : card;
     }

     if(firstCard && secondCard){
       lockBoard = true;
       let firstMove = firstCard.className;
       let secondMove = secondCard.className;

       if (firstMove === secondMove){
         FlippedCard +=2;
         firstCard.removeEventListener('click', handleCardClick);
         secondCard.removeEventListener('click', handleCardClick);
         firstCard = null;
         secondCard = null;
         lockBoard = false;
       }
     } else {
       setTimeout(function(){
         firstCard.style.backgroundColor = "";
         secondCard.style.backgroundColor = "";
         firstCard.classList.remove('flipped');
         secondCard.classList.remove('flipped');
         firstCard = null;
         secondCard = null;
         lockBoard = false;
       }, 1000);
     }
    }

    if(FlippedCard === COLORS.length){
      alert('YOU DID IT!!');
    }
  
    createDivsForColors(shuffledColors);
