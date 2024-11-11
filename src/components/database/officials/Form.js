import React from 'react'
import { useState } from 'react'
import { Select } from '@chakra-ui/react'
import { getAge, getGenders } from '../../../utilities/common.js'
export default function Form({official,formModal, fetchData}) {
  const [formData, setFormData] = useState({id:official.id,first_name:official.first_name,last_name:official.last_name,dob:official.dob,age:official.age, gender:official.gender,status_in_bout:official.status_in_bout,event_id: official.event_id})


  const handleChange=(e)=>{
    const {id,value}=e.target
    setFormData({...formData, [id]: value})
    if(id=="dob"){      
      setFormData((prevState)=>({...prevState, age: getAge(value)}))
    }
  }
  
  const handleSumbmit= async(e)=>{
    e.preventDefault()
    const result = await window.api.saveOfficial(formData);
    // if (result) {
      formModal.onClose()
      fetchData()

    // } else {
    //   alert('Error saving official!');
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
                <input onChange={handleChange} value={formData.last_name} type="text" name="last_name" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=" official last ame" required="true"/>
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
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Status</label>
                <Select
                id='status_in_bout'
                name='status_in_bout'
                onChange={handleChange}
                value={formData.status_in_bout} 
                _readOnly={false}
                _size='md'
                color='black'
                placeholder='Select a status_in_bout'
                >
                {[['Referee','referee'],['Judge','judge']].map((c)=>{
                  return (
                    <option value={c[1]}>{c[0]}</option>
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
