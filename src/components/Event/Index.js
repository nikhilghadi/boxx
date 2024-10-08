import React, { useEffect } from 'react'
import ChakraModal from '../modal/Modal'
import {
  Button,
  useDisclosure
} from '@chakra-ui/react'
import Form from './Form'
import { useState } from 'react'
export default function Index() {
  const formModal = useDisclosure()
  const [event, setEvent] = useState({name:"",subtitle:"",city:"",location:"", date:"",tournament_organisation_auto:false,symmetrical_draw:false,number_of_rounds:3,rest_time:60,num_of_judges:3 })
  const [events, setEvents] = useState([])
  useEffect(() => {
    const result =  window.api.getEvents()
    result.then(data => {
      //  console.log(data)    
      setEvents(data)
    })
  }, [])
  return (
    <div>
      <h1>Event Page</h1>
      <button className='p-3 bg-gray-800  text-white rounded-lg' onClick={()=>formModal.onOpen()}>
        Create New Event
      </button>
      <table className='table-auto w-full'>
        <thead><tr>
          <th>Event Name</th>
          <th>Subtitle</th>
          <th>City</th>
          <th>Date</th>
          </tr> </thead>
        <tbody>
          {
            events.map((event, index) => (  
              <tr key={index}> 
              <td>{event.name}</td>
              <td>{event.subtitle}</td>
              <td>{event.city}</td> 
              <td>{event.date}</td>
               </tr>))
          
        }
           </tbody>
      </table>
      <ChakraModal title={ 'Add New Event'} onClose={formModal.onClose} isOpen={formModal.isOpen}>
        <Form event={event} setEvent={setEvent} formModal={formModal} />
      </ChakraModal>
    </div>
  )
}
