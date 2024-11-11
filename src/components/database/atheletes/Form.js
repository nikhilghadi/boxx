import React from 'react'
import { useState, useEffect } from 'react'
import { Select } from '@chakra-ui/react'
import { getAge, getGenders } from '../../../utilities/common.js'
export default function Form({athlete,formModal, fetchData}) {
  const [formData, setFormData] = useState({id:athlete.id,first_name:athlete.first_name,last_name:athlete.last_name,dob:athlete.dob,age:athlete.age, gender:athlete.gender,weight:athlete.weight,height:athlete.height,hand:athlete.hand,weight_class_id:athlete.weight_class_id,team_id:athlete.team_id,event_id: athlete.event_id})
  const [teams, setTeams] = useState([])
  const [weightClasses, setWeightClasses] = useState([])

  const fetchTeams = async () => {
    const result = await window.api.getTeams(athlete.event_id) || []
    setTeams(result)
  }

  const fetchWeightClasses = async () => {
    const result = await window.api.getWeightClasses(athlete.event_id) || []
    setWeightClasses(result)
  }

  useEffect(() => {
    fetchTeams()
    fetchWeightClasses()
  }, [])

  const handleChange=(e)=>{
    const {id,value}=e.target
    setFormData({...formData, [id]: value})
    if(id=="dob"){      
      setFormData((prevState)=>({...prevState, age: getAge(value)}))
    }
  }
  
  const handleSumbmit= async(e)=>{
    e.preventDefault()
    const result = await window.api.saveAthlete(formData);
    // if (result) {
      // alert('Athlete saved successfully!');
      formModal.onClose()
      fetchData()

    // } else {
    //   alert('Error saving athlete!');
    // }
  }
  console.log(formData)
  return (
    <div>
      <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
                <input onChange={handleChange} value={formData.first_name} type="text" name="first_name" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type First Name" required="true"/>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Last name</label>
                <input onChange={handleChange} value={formData.last_name} type="text" name="last_name" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=" athlete last ame" required="true"/>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Date of Birth</label>
                <input onChange={handleChange} value={formData.dob} type="date" name="dob" id="dob" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Date of birth" required="true"/>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Age</label>
                <input onChange={handleChange} value={formData.age} type="number" name="age" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Age will calculated automatically" required="true" readonly='true'/>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Gender</label>
                <Select
                id='gender'
                name='gender'
                onChange={handleChange}
                value={formData.gender} 
                _readOnly={false}
                _size='md'
                color='black'
                placeholder='Select a Gender'
                >
                {getGenders().map((c)=>{
                  return (
                    <option value={c[1]}>{c[0]}</option>
                  )
                })}
                </Select>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Weight</label>
                <input onChange={handleChange} value={formData.weight} type="number" name="weight" id="weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type athlete Name" required="true"/>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Height</label>
                <input onChange={handleChange} value={formData.height} type="number" name="height" id="height" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type athlete Name" required="true"/>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Hand</label>
                <input onChange={handleChange} value={formData.hand} type="text" name="hand" id="hand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type athlete Name" required="true"/>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Weight Class</label>
                <Select
                id='weight_class_id'
                name='weight_class_id'
                onChange={handleChange}
                value={formData.weight_class_id} 
                _readOnly={false}
                _size='md'
                color='black'
                placeholder='Select a Weight Class'
                >
                {weightClasses.map((c)=>{
                  return (
                    <option value={c.id}>{c.label}</option>
                  )
                })}
                </Select>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Team</label>
                <Select
                id='team_id'
                name='team_id'
                onChange={handleChange}
                value={formData.team_id} 
                _readOnly={false}
                _size='md'
                color='black'
                placeholder='Select a Team'
                >
                {teams.map((c)=>{
                  return (
                    <option value={c.id}>{c.name}</option>
                  )
                })}
                </Select>
              </div>

              <button onClick ={handleSumbmit} type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 bg-blue-500 float-right">
             Save
          </button>

              </div>
              </form>
              </div>
  )
}
