import React, {useState, useEffect} from 'react'
import { getDraw, isPowerOfTwo } from '../../../utilities/common'
// import { Bracket, RoundProps } from 'react-brackets';
import Bracket from '../../draw_table/Bracket'
import { useSelector } from 'react-redux'
export default function Index() {
  const [numberOfPlayers, setNumberOfPlayers] = useState(0)
  const [byes, setByes] = useState(0)
  const [bouts, setBouts] = useState(0)
  const [rounds, setRounds] = useState(0)
  const [draws, setDraws] = useState( {})  
  const [weightClasses, setWeightClasses] = useState([])
  const [currentWeightClass, setCurrentWeightClass] = useState({})
  const {currentEvent} = useSelector(state=> state.event)
  const [atheletes, setAthletes] = useState([])
  const [shuffledPlayers, setShuffledPlayers] = useState([])
  const [atheleteIndex, setAthleteIndex] = useState(0) 
  const fetchWeights =()=>{
    if(!currentEvent) return
    const result = window.api.getWeightClasses(currentEvent.id)
    result.then(data => {
      setWeightClasses(data)
      setCurrentWeightClass(data[0])
    })
  }

  const fetchAtheletes=()=>{
    if(currentWeightClass){
      if(!currentEvent) return
      const result = window.api.getAthletes(currentEvent.id,currentWeightClass.id)
      result.then(data => {
        setAthletes(data || [])
        setNumberOfPlayers(data.length)
      })
    }
  }
  

  useEffect(()=>{
    setShuffledPlayers([...atheletes.slice().sort(() => Math.random() - 0.5)]);
  },[atheletes])  
  useEffect(()=>{
    fetchAtheletes()
  },[currentWeightClass])
  useEffect(()=>{
    fetchWeights()
  },[])

  const getPlayerName = (index,color)=>{
    let obj = (shuffledPlayers[index-1] || {first_name: color, last_name: ''})
    // console.log("plae",index-1,shuffledPlayers[index-1], shuffledPlayers )
    setAthleteIndex(atheleteIndex+1)
    return obj
  }
  const createRound=(roundNumber, bouts, byes,next_round_start)=>{
    let seeds = []
    let round = {roundName: `Round ${roundNumber}`}
    let isByePresent = (byes > 0 && roundNumber == 2 && !(numberOfPlayers%2==0))
    // console.log("df ",roundNumber,atheleteIndex,next_round_start)
    let counter = 0
    for(let i = 0; i < bouts; i++){
      let seed =  {
          id: 1,
          players:((isByePresent && i == bouts-1) ? [getPlayerName(next_round_start+counter,'Red')] : [getPlayerName(next_round_start+counter,'Red') , getPlayerName(next_round_start+counter+1,'Blue')])
        }
       seeds.push(seed)
       counter += seed.players.length
    }
    round['matches'] = seeds
    return {cRound: round, winners: bouts}
  }
  const createDraw=(e)=>{
    let {byes, bouts, rounds}= getDraw(numberOfPlayers)
    setBouts(bouts)
    setByes(byes)
    setRounds(rounds)
    let matches = []
    let tempByes = byes
    let next_round_start = 1
    console.log(shuffledPlayers,atheletes)
    setShuffledPlayers([...atheletes.slice().sort(() => Math.random() - 0.5)]);

    for(let round = 1; round <= rounds; round++){
      let {cRound, winners} = createRound(round, bouts,byes, next_round_start)
      bouts = (winners+tempByes)/2
      next_round_start = next_round_start+(winners*2)
      tempByes = 0
      matches.push(cRound)
    }
    setDraws((ps)=>({...ps, [currentWeightClass.id]:matches }))
  }
  return (
    <div>
      <div className='flex justify-between mb-3'>
        <div className='flex'>
        {
          weightClasses.map((weightClass, index)=>{
            return <div onClick={()=>setCurrentWeightClass(weightClass)} key={`weight_class_${index}`} className={`p-1 m-1 cursor-pointer shadow-lg rounded-lg bg-gray-500 font-bold text-white border-2  ${weightClass.id == currentWeightClass.id ? 'border-blue-700' : '' }`}>
              {weightClass.label}-{weightClass.class_name}
            </div>
          })
        }</div>
          {currentEvent && <button className='border-2 border-rose-500 rounded-lg p-1' onClick={createDraw}>Create Draw</button>}
      </div>
    
      <div className='flex '>
        
        <div className="h-svh bg-gray-200 p-8 overflow-scroll w-4/5 bg-blue-200 p-4">
          <div className=' text-right font-bold '>
            {currentWeightClass.label} KG
          </div>
          <Bracket rounds={draws[currentWeightClass.id]||[]} />
        </div>
        <div className='w-1/5 bg-green-200 p-4 text-left'>
          <div className='text-center font-bold'>Atheletes</div>
          {
            atheletes.map((athelete, index)=>{
              return <div key={`athelete_${index}`}>
               {athelete.team_name}: {athelete.first_name + " " + athelete.last_name}
              </div>
            })
          }
        </div>
      </div>
      
    </div>
  )
}
