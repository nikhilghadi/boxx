import React,{useState} from 'react'
import SidedeNav from '../SidedeNav'
import BoxerDrawIndex from './boxers_draw/Index'
export default function RunBout() {
  const options =[{name: 'Boxers Draw',  icon: <img className='h-6 w-6' src="https://img.icons8.com/ios/50/athlete.png" alt="athlete"/>, component: <BoxerDrawIndex></BoxerDrawIndex>}]
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
