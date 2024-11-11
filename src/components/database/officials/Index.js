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
  const [official, setOfficial] = React.useState({id:null,first_name:'',last_name:'',status_in_bout:'',gender:'',dob:'', age:'',event_id:currentEvent?.id})
  const [officials, setOfficials] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const formModal = useDisclosure()
  const deleteModal = useDisclosure()

  const handleEdit = (item) => {
    setOfficial(item)
    formModal.onOpen()
  }

  useEffect(() => {
    fetchData() 
  }, [currentEvent])

  const deleteOfficial = (id, confirm) => {   
    if (confirm) {
      window.api.deleteOfficial(deleteId).then(data => {
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
    return officials.map((item, index) => {
      return [   index+1, item.first_name+' '+item.last_name, item.status_in_bout, item.gender,item.age,
        <div className='flex justify-center items-center float-start'>
          <EditButton handleClick={()=>handleEdit(item)}/>
          <DeleteButton handleClick={()=>deleteOfficial(item.id, false)}/>
        </div>]
    })
  }
  const onSearch = (searchText) => {
    if (searchText === '') {
      fetchData()
      return
    }
    setOfficials(officials.filter(item => item.first_name.toLowerCase().includes(searchText.toLowerCase()) || item.last_name.toLowerCase().includes(searchText.toLowerCase())))
  }
  const fetchData = () => {
    if(!currentEvent) return
    const result = window.api.getOfficials(currentEvent.id)
    result.then(data => {
      setOfficials(data)
    })
  }
  const headers =['Sr No','Name','Status', 'Gender','Age', 'Action']
  return (
    <div>
      <div className='rounded-sm bg-white p-4 m-4 shadow-2xl'>
        <Table
          title={'Officials'}
          headers={headers}
          data={getData()}
          searchPlaceHolder={'Search official by name'}
          onSearch={onSearch}
          reload={fetchData}
          utilities={[currentEvent ? <Button className='p-2 bg-gray-800  text-white rounded-lg' onClick={()=>formModal.onOpen()}>Add new Official</Button> : null]}
        />
      </div>
      <ChakraModal title={ 'Add New Official'} onClose={formModal.onClose} isOpen={formModal.isOpen}>
        <Form official={official} setOfficial={setOfficial} formModal={formModal} fetchData={fetchData} />
      </ChakraModal>
      <ConfirmationBox title={'Delete Official'} onClose={deleteModal.onClose} isOpen={deleteModal.isOpen} message={'Are you sure you want to delete this Official?'} onConfirm={()=>deleteOfficial(null, true)}/>

    </div>
  )
}
