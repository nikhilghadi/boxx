import React from 'react'

export default function Form({team,formModal, fetchData}) {
  const [formData, setFormData] = React.useState({id: team.id, code: team.code, name: team.name, nation: team.nation, head_coach: team.head_coach, event_id: team.event_id})
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleSumbmit = async(e) => {
    e.preventDefault()
    const result = await window.api.saveTeam(formData);
    debugger
    // if (result) {
      alert('Team saved successfully!');
      formModal.onClose()
      fetchData()
    // } else {
    //   alert('Error saving team!');
    // }
  }
  return (
    <div>
      <form>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <label for="code" className="block mb-2 text-sm font-medium text-gray-900 ">Team Code</label>
          <input onChange={handleChange} value={formData.code} type="text" name="code" id="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Team code" required="true"/>
        </div>
        <div className="sm:col-span-2">
          <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Team Name</label>
          <input onChange={handleChange} value={formData.name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Team Name" required="true"/>
        </div>
        <div className="sm:col-span-2">
          <label for="nation" className="block mb-2 text-sm font-medium text-gray-900 ">Nation</label>
          <input onChange={handleChange} value={formData.nation} type="text" name="nation" id="nation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Team Nation" required="true"/>
        </div>
        <div className="sm:col-span-2">
          <label for="head_coach" className="block mb-2 text-sm font-medium text-gray-900 ">Team Head Coach</label>
          <input onChange={handleChange} value={formData.head_coach} type="text" name="head_coach" id="head_coach" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Head Coach  Name" required="true"/>
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
