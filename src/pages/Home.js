import React from 'react'
import Index from '../components/Event/Index'
import { useSelector } from'react-redux'
export default function Home() {

  const currentEvent = useSelector((state) => state.event.currentEvent); // Access current event from Redux state
  console.log(currentEvent)
  return (
    <>    
    <Index />
    </>

  )
}
