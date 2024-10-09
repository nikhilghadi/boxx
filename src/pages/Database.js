import React from 'react'
import Index from '../components/database/Index'
import Navbar from '../components/Navbar'
import { useSelector } from'react-redux'
export default function Database() {
  const currentEvent = useSelector((state) => state.event.currentEvent); // Access current event from Redux state
  console.log(currentEvent)
  return (
    <>
      <Index />
    </>
  )
}
