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
  const [weightClass, setWeightClass] = useState({id:null,event_id:currentEvent?.id, label: '', class_name: '', age_group: '', gender: ''})
  const [weightClasses, setWeightClasses] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const formModal = useDisclosure()
  const deleteModal = useDisclosure()

  const handleEdit = (item) => {
    setWeightClass(item)
    formModal.onOpen()
  }

  useEffect(() => {
    fetchData() 
  }, [currentEvent])

  const deleteWeightClass = (id, confirm) => {   
    if (confirm) {
      window.api.deleteWeightClass(deleteId).then(data => {
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
    return weightClasses.map((item, index) => {
      return [   index+1, item.label, item.class_name, item.age_group, item.gender,
        <div className='flex justify-center items-center float-start'>
          <EditButton handleClick={()=>handleEdit(item)}/>
          <DeleteButton handleClick={()=>deleteWeightClass(item.id, false)}/>
        </div>]
    })
  }
  const onSearch = (searchText) => {
    if (searchText === '') {
      fetchData()
      return
    }
    setWeightClasses(weightClasses.filter(item => item.label.toLowerCase().includes(searchText.toLowerCase()) || item.class_name.toLowerCase().includes(searchText.toLowerCase())))
  }
  const fetchData = () => {
    if(!currentEvent) return
    const result = window.api.getWeightClasses(currentEvent.id)
    result.then(data => {
      setWeightClasses(data)
    })
  }
  const headers =['Sr No','Label','Class', 'Age Group','Gender', 'Action']
  return (
    <div>
      <div className='rounded-sm bg-white p-4 m-4 shadow-2xl'>
        <Table
          title={'Weight Classes'}
          headers={headers}
          data={getData()}
          searchPlaceHolder={'Search weightClass by name/code'}
          onSearch={onSearch}
          reload={fetchData}
          utilities={[currentEvent ? <Button className='p-2 bg-gray-800  text-white rounded-lg' onClick={()=>{ setWeightClass({id:null,event_id:currentEvent.id, label: '', class_name: '', age_group: '', gender: ''}); formModal.onOpen()}}>Create New weight Class</Button> : null]}
        />
      </div>
      <ChakraModal title={ 'Add New weight Class'} onClose={formModal.onClose} isOpen={formModal.isOpen}>
        <Form weightClass={weightClass} setWeightClass={setWeightClass} formModal={formModal} fetchData={fetchData} />
      </ChakraModal>
      <ConfirmationBox title={'Delete weight Class'} onClose={deleteModal.onClose} isOpen={deleteModal.isOpen} message={'Are you sure you want to delete this weight Class?'} onConfirm={()=>deleteWeightClass(null, true)}/>

    </div>
  )
}
