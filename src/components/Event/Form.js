import React from 'react'
import { useState } from 'react'
export default function Form({event,formModal}) {
  const [formData, setFormData] = useState({name:event.name,subtitle:event.subtitle,city:event.city,location:event.location, date:event.date,tournament_organisation_auto:event.tournament_organisation_auto,symmetrical_draw:event.symmetrical_draw,number_of_rounds:event.number_of_rounds,rest_time:event.rest_time,num_of_judges:event.num_of_judges,})
  const handleChange=(e)=>{
    const {id,value}=e.target
    setFormData({...formData, [id]: value})
  }
  const handleSumbmit= async(e)=>{
    e.preventDefault()
    console.log(formData)
    const result = await window.api.saveEvent(formData);
    if (result.success) {
      alert('Event saved successfully!');
      formModal.onClose()
    } else {
      alert('Error saving event!');
    }
  }
  return (
    <div>
      <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Event Name</label>
                <input onChange={handleChange} value={formData.name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Event Name" required="true"/>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Subtitle</label>
                <input onChange={handleChange} value={formData.subtitle} type="text" name="subtitle" id="subtitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=" Event Subtitle" required="true"/>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">City</label>
                <input onChange={handleChange} value={formData.city} type="text" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="City Name" required="true"/>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Location</label>
                <input onChange={handleChange} value={formData.location} type="text" name="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Location Name" required="true"/>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Date</label>
                <input onChange={handleChange} value={formData.date} type="date" name="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Date of Event" required="true"/>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Tournament Organisation Auto</label>
                <input onChange={handleChange} value={formData.tournament_organisation_auto} type="text" name="tournament_organisation_auto" id="tournament_organisation_auto" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Event Name" required="true"/>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Symmetrical Draw</label>
                <input onChange={handleChange} value={formData.symmetrical_draw} type="text" name="symmetrical_draw" id="symmetrical_draw" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Event Name" required="true"/>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Number of Rounds</label>
                <input onChange={handleChange} value={formData.number_of_rounds} type="number" name="number_of_rounds" id="number_of_rounds" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Event Name" required="true"/>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Rest Time</label>
                <input onChange={handleChange} value={formData.rest_time} type="number" name="rest_time" id="rest_time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Rest time in minutes" required="true"/>
              </div>
              <div className="sm:col-span-2">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Number of Judges</label>
                <input onChange={handleChange} value={formData.num_of_judges} type="number" name="num_of_judges" id="num_of_judges" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Number of Judges" required="true"/>
              </div>

              <button onClick ={handleSumbmit} type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 bg-blue-500 float-right">
             Save
          </button>

              </div>
              </form>
              </div>
  )
}
