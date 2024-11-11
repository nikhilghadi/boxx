import React,{useState} from 'react'
import SidedeNav from '../SidedeNav'
import { UserGroupIcon } from '@heroicons/react/24/outline'
import Teams from './teams/Index'
import Weights from './weights/Index'
import Atheletes from './atheletes/Index'
import Official from './officials/Index'

export default function Index() {
  const options = [{name: 'Teams' , icon: <UserGroupIcon className='h-6 w-6'/>, component: <Teams />},{name:'Weights', icon: <img className='h-6 w-6' src="https://img.icons8.com/ios/50/weight-kg.png" alt="weight-kg"/>, component: <Weights />},{name:'Atheletes', icon: <img className='h-6 w-6' src="https://img.icons8.com/ios/50/athlete.png" alt="athlete"/>, component: <Atheletes />}, {name:'Officials', icon: <img className='h-6 w-6' src="https://img.icons8.com/quill/100/referee.png" alt="referee"/>, component: <Official />}]
  const [currentOption, setCurrentOption] = useState(0)
  return (
    <div className='flex flex-row'>
      <div className='basis-1/6'>
        <SidedeNav  options={options} currentOption={currentOption} setCurrentOption={setCurrentOption} />
      </div>
      <div className='basis-5/6'>
        {
          options.map((option, index) => {
            return (
              <div key={index} className='p-4' style={{display: currentOption === index ? 'block' : 'none'}}>
                  {option.component}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
