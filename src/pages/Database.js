import React from 'react'
import Index from '../components/database/Index'
import Navbar from '../components/Navbar'
export default function Database() {
  return (
    <>
      <Navbar currentPage={'Database'} />
      <Index />
    </>
  )
}
