import { Select } from '@chakra-ui/react'
import React from 'react'
import { getGenders } from '../../../utilities/common'
export default function Form({weightClass,formModal, fetchData}) {
  const [formData, setFormData] = React.useState({id: weightClass.id, label: weightClass.label, class_name: weightClass.class_name, age_group: weightClass.age_group, gender: weightClass.gender, event_id: weightClass.event_id})
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleSumbmit = async(e) => {
    e.preventDefault()
    const result = await window.api.saveWeightClass(formData);
    // if (result) {
      // alert('Weight saved successfully!');
      formModal.onClose()
      fetchData()
    // } else {
    //   alert('Error saving weightClass!');
    // }
  }
  return (
    <div>
      <form>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <label for="code" className="block mb-2 text-sm font-medium text-gray-900 ">Label</label>
          <input onChange={handleChange} value={formData.label} type="text" name="label" id="label" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type weight label" required="true"/>
        </div>
        <div className="sm:col-span-2">
          <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Class</label>
          <input onChange={handleChange} value={formData.class_name} type="text" name="class_name" id="class_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Class Name" required="true"/>
        </div>
        <div className="sm:col-span-2">
          <label for="age_group" className="block mb-2 text-sm font-medium text-gray-900 ">Age group</label>
          <input onChange={handleChange} value={formData.age_group} type="text" name="age_group" id="age_group" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type weight age group" required="true"/>
        </div>
        <div className="sm:col-span-2">
          <label for="gender" className="block mb-2 text-sm font-medium text-gray-900 ">Gender</label>
        
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
        <button onClick ={handleSumbmit} type="submit" className="float-right px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 bg-blue-500 float-right">
             Save
          </button>

          
        </div>
        
        </div>
      </form>
    </div>
  )
}
