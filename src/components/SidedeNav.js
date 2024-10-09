import React from 'react'
export default function SidedeNav({options, currentOption, setCurrentOption}) {
  return (
    <ul>
      {
        options.map((option, index) => 
        
          <li onClick={() => setCurrentOption(index)}>
          <a
            href="#"
            className={"flex items-center gap-2 border-s-[3px]  bg-blue-50 px-4 py-3" + (currentOption === index? " border-blue-500 text-blue-700" : "")}
          >
            {option.icon}
            <span className="text-sm font-medium"> {option.name} </span>
          </a>
        </li>
        )
      }
      
    </ul>
  )
}
