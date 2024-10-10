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
  const [team, setTeam] = React.useState({id:null,event_id:currentEvent?.id, name: '', code: '', nation: '', head_coach: ''})
  const [teams, setTeams] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const formModal = useDisclosure()
  const deleteModal = useDisclosure()

  const handleEdit = (item) => {
    setTeam(item)
    formModal.onOpen()
  }

  useEffect(() => {
    fetchData() 
  }, [currentEvent])

  const deleteTeam = (id, confirm) => {   
    if (confirm) {
      window.api.deleteTeam(deleteId).then(data => {
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
    return teams.map((item, index) => {
      return [   index+1, item.code, item.name, item.nation, item.head_coach,
        <div className='flex justify-center items-center float-start'>
          <EditButton handleClick={()=>handleEdit(item)}/>
          <DeleteButton handleClick={()=>deleteTeam(item.id, false)}/>
        </div>]
    })
  }
  const onSearch = (searchText) => {
    if (searchText === '') {
      fetchData()
      return
    }
    setTeams(teams.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.code.toLowerCase().includes(searchText.toLowerCase())))
  }
  const fetchData = () => {
    if(!currentEvent) return
    const result = window.api.getTeams(currentEvent.id)
    result.then(data => {
      setTeams(data)
    })
  }
  const headers =['Sr No','Team Code','Team Name', 'Nation','Head Coach', 'Action']
  return (
    <div>
      <div className='rounded-sm bg-white p-4 m-4 shadow-2xl'>
        <Table
          title={'Teams'}
          headers={headers}
          data={getData()}
          searchPlaceHolder={'Search Team by name/code'}
          onSearch={onSearch}
          reload={fetchData}
          utilities={[currentEvent ? <Button className='p-2 bg-gray-800  text-white rounded-lg' onClick={()=>formModal.onOpen()}>Create New Team</Button> : null]}
        />
      </div>
      <ChakraModal title={ 'Add New Team'} onClose={formModal.onClose} isOpen={formModal.isOpen}>
        <Form team={team} setTeam={setTeam} formModal={formModal} fetchData={fetchData} />
      </ChakraModal>
      <ConfirmationBox title={'Delete team'} onClose={deleteModal.onClose} isOpen={deleteModal.isOpen} message={'Are you sure you want to delete this team?'} onConfirm={()=>deleteTeam(null, true)}/>

    </div>
  )
}
