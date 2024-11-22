import React, { useEffect, useState } from 'react'
import ChakraModal from '../../modal/Modal'
import {
  Button,
  useDisclosure
} from '@chakra-ui/react'
import Table from '../../Table/Table'
import Form from './Form'
import { useSelector } from 'react-redux'
import EditButton from '../../buttons/EditButton'
import DeleteButton from '../../buttons/DeleteButton'
import ConfirmationBox from '../../modal/ConfirmationBox'
export default function Index() {
  const {currentEvent} = useSelector(state => state.event)
  const [athlete, setAthlete] = React.useState({id:null,event_id:currentEvent?.id, first_name: '', last_name: '', dob: '', age: '', gender:'', weight:'', height:'',hand:'', weight_class_id:'', team_id:'',event_id:currentEvent?.id})
  const [athletes, setAthletes] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const formModal = useDisclosure()
  const deleteModal = useDisclosure()

  const handleEdit = (item) => {
    setAthlete(item)
    formModal.onOpen()
  }

  useEffect(() => {
    fetchData() 
  }, [currentEvent])

  const deleteAthlete = (id, confirm) => {   
    if (confirm) {
      window.api.deleteAthlete(deleteId).then(data => {
        fetchData()
        setDeleteId(null)
        deleteModal.onClose()
      })
    }
    else {      
      setDeleteId(id)
      deleteModal.onOpen()
    }
  }
  const getData = () => {
    return athletes.map((item, index) => {
      return [   index+1, item.first_name + " " + item.last_name, item.age, item.gender, item.weight,item.weight_class,item.team_name,
        <div className='flex justify-center items-center float-start'>
          <EditButton handleClick={()=>handleEdit(item)}/>
          <DeleteButton handleClick={()=>deleteAthlete(item.id, false)}/>
        </div>]
    })
  }
  const onSearch = (searchText) => {
    if (searchText === '') {
      fetchData()
      return
    }
    setAthletes(athletes.filter(item => item.first_name.toLowerCase().includes(searchText.toLowerCase()) || item.last_name.toLowerCase().includes(searchText.toLowerCase())))
  }
  const fetchData = () => {
    if(!currentEvent) return
    const result = window.api.getAthletes(currentEvent.id)
    result.then(data => {
      setAthletes(data || [])
      setAthlete({event_id:currentEvent?.id})
    })
  }
  const headers =['Sr No','Name', 'Age', 'Gender', 'Weight', 'Class','Team', 'Action']
  return (
    <div>
      <div className='rounded-sm bg-white p-4 m-4 shadow-2xl'>
        <Table
          title={'Athletes'}
          headers={headers}
          data={getData()}
          searchPlaceHolder={'Search athlete by name'}
          onSearch={onSearch}
          reload={fetchData}
          utilities={[currentEvent ? <Button className='p-2 bg-gray-800  text-white rounded-lg' onClick={()=>formModal.onOpen()}>Add Athlete</Button> : null]}
        />
      </div>
      <ChakraModal title={ 'Add New Athlete'} onClose={formModal.onClose} isOpen={formModal.isOpen}>
        <Form athlete={athlete} setAthlete={setAthlete} formModal={formModal} fetchData={fetchData} />
      </ChakraModal>
      <ConfirmationBox title={'Delete athlete'} onClose={deleteModal.onClose} isOpen={deleteModal.isOpen} message={'Are you sure you want to delete this athlete?'} onConfirm={()=>deleteAthlete(null, true)}/>

    </div>
  )
}
