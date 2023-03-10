import { useEffect, useState } from "react";
import bear from './cartoon-imgs/bear.svg'
import bunny from './cartoon-imgs/bunny.svg'
import cat from './cartoon-imgs/cat.svg'
import dog from './cartoon-imgs/dog.svg'
import fox from './cartoon-imgs/fox.svg'
import koala from './cartoon-imgs/koala.svg'
import monkey from './cartoon-imgs/monkey.svg'
import panda from './cartoon-imgs/panda.svg'
import raccoon from './cartoon-imgs/raccoon.svg'
import rat from './cartoon-imgs/rat.svg'
import squirrel from './cartoon-imgs/squirrel.svg'
import tiger from './cartoon-imgs/tiger.svg'

function App() {
  const [highScore,setHighScore] = useState(0)
  const [score,setScore] = useState(0)
  const [usedCards,setUsedCards] = useState([])
  const [gameStatus,setGameStatus] = useState('start screen')
  const [allCards,setAllCards] = useState([ 
    {name: 'bear', link: bear},
    {name: 'bunny', link: bunny},
    {name: 'cat', link: cat},
    {name: 'dog', link: dog},
    {name: 'fox', link: fox},
    {name: 'koala', link: koala},
    {name: 'monkey', link: monkey},
    {name: 'panda', link: panda},
    {name: 'raccoon', link: raccoon},
    {name: 'rat', link: rat},
    {name: 'squirrel', link: squirrel},
    {name: 'tiger', link: tiger}
  ])
  function shuffleArray(oldArray) {
    let array = oldArray
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }
  function handleCardClick(animal){
    if(usedCards.includes(animal)){
      setGameStatus('end screen')
      setUsedCards([])
    } else {
      setScore(score+1)
      setAllCards(shuffleArray(allCards))
      setUsedCards([...usedCards,animal])
    }
  }
  useEffect(()=>{
    if(localStorage.getItem('high-score')){ 
      setHighScore(localStorage.getItem('high-score'))
    } else {
      localStorage.setItem('high-score',0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(()=>{
    if(score > highScore){
      setHighScore(score)
      localStorage.setItem('high-score',score)
    }
    if(score === 12){
      setGameStatus('end screen')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[score])
  return (
    <>
      <div className="grid">
        <div className={`bg-C-light-gray grid columns-2 w-96 text-lg gap-x-4 gap-2 place-items-center absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 p-4 rounded-md shadow-xl ${gameStatus === 'start screen' ? '':'hidden'}`}>
          <span className="col-span-2 font-bold text-3xl">Memory Game</span>
          <p className="col-span-2 leading-tight mb-4 text-sm">Get points by clicking each image, if you click the same image twice the game is over!</p>
          <span>High Score: {highScore}</span>
          <button onClick={()=>setGameStatus('play screen')} className="bg-gray-700 py-1 px-6 rounded-lg shadow-md font-bold text-gray-300 can-hover:hover:bg-gray-900 transition-colors">Play</button>
        </div>
        <span className={`font-bold ${gameStatus === 'play screen' ? '':'hidden'} mx-auto mt-8 text-lg`}>High Score: {highScore}</span>
        <span className={`font-bold ${gameStatus === 'play screen' ? '':'hidden'} mx-auto mt-2 mb-8 text-3xl`}>Score: {score}</span>
        <div className={`grid w-11/12 md:w-4/5 lg:w-1/2 my-6 place-self-center place-items-center gap-4 md:gap-8 grid-cols-3 md:grid-cols-4 ${gameStatus === 'play screen' ? '':'hidden'}`}>
          {
            allCards.map(character => <img onClick={()=>handleCardClick(character.name)} key={character.name} className="can-hover:hover:bg-gray-800 can-hover:can-hover:cursor-pointer transition-all h-28 md:h-32 lg:h-40 aspect-square shadow-lg bg-C-light-gray p-2 rounded-xl" src={character.link} alt='cartoon animal'></img>)
          }
        </div>
        <div className={`bg-C-light-gray grid w-96 text-lg place-items-center absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 p-4 rounded-md shadow-xl ${gameStatus === 'end screen' ? '':'hidden'}`}>
          <span className="text-3xl">Score: {score}</span>
          <span>High Score: {highScore}</span>
          <button onClick={()=>{
            setGameStatus('start screen')
            setScore(0)
          }} className="bg-gray-700 py-1 px-6 rounded-lg shadow-md font-bold text-gray-300 can-hover:hover:bg-gray-900 transition-colors mt-4">Play Again</button>
        </div>
      </div>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm">Cartoon Animals by: <a href="https://www.vecteezy.com/members/herupujiutomo480266" className="can-hover:hover:text-gray-800 transition-colors">herupujiutomo480266</a></span>
    </>
  );
}

export default App;
