import React, { useEffect } from 'react'
import ChakraModal from '../modal/Modal'
import {
  Button,
  useDisclosure
} from '@chakra-ui/react'
import Form from './Form'
import { useState } from 'react'
import Table from '../Table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { selectEvent } from '../../redux/eventSlice'
import EditButton from '../buttons/EditButton'
import PlayButton from '../buttons/PlayButton'
export default function Index() {
  const formModal = useDisclosure()
  const [event, setEvent] = useState({name:"",subtitle:"",city:"",location:"", date:"",tournament_organisation_auto:false,symmetrical_draw:false,number_of_rounds:3,rest_time:60,num_of_judges:3 })
  const [events, setEvents] = useState([])
  const dispatch = useDispatch()
  
  useEffect(() => {
   fetchData()
  }, [])
  function getData() {  
    return events.map((event, index) => {
      return [
        index+1,
        event.name,
        event.subtitle, 
        event.city,
        event.date, 

        <div className='flex justify-center items-center float-start'>
          <EditButton  handleClick={()=>handleEdit(event)} />
          <PlayButton  handleClick={()=>dispatch(selectEvent(event))} />
         
          </div>
      ]
    })
  }
  function handleEdit(event) {
    setEvent(event)
    formModal.onOpen()
  }
  function onSearch(searchText) {
    if (searchText === '') {
      fetchData()
      return
    }
    const filteredData = events.filter(event => {
      return event.name.toLowerCase().includes(searchText.toLowerCase())
    })
    setEvents(filteredData)
  }
  function fetchData() {
    const result =  window.api.getEvents()
    result.then(data => {
      //  console.log(data)    
      setEvents(data)
    })
  }
  const headers =['Sr No','Event Name', 'Subtitle','City','Date', 'Action']

  return (
    <div>
   
      <div className='rounded-sm bg-white p-4 m-4 shadow-2xl'>
        <Table
          title={'Events List'}
          headers={headers}
          data={getData()}
          searchPlaceHolder={'Search Event by name'}
          onSearch={onSearch}
          reload={fetchData}
          utilities={[<Button className='p-2 bg-gray-800  text-white rounded-lg' onClick={()=>formModal.onOpen()}>Create New Event</Button>]}
        />
      </div>
      <div></div>
      <ChakraModal title={ 'Add New Event'} onClose={formModal.onClose} isOpen={formModal.isOpen}>
        <Form event={event} setEvent={setEvent} formModal={formModal} />
      </ChakraModal>
    </div>
  )
}
