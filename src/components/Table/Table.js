import {useState,useEffect} from 'react'
// import Loader from '../commonComponents/Loader'
import { Center } from '@chakra-ui/react'
import { forwardRef, useImperativeHandle } from 'react'
const Table = forwardRef((props, ref)=> {
  const {title,headers, data, searchPlaceHolder="Search",onSearch, reload, loadAll= false,searchColumns=[],utilities=[]} = props
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState(data)
  const [serachData, setSerachData] = useState(data)
  const [serachKey, setSerachKey] = useState('')

  const handleReload=()=>{
    setLoading(true)
    reload()
  }
  useEffect(()=>{
    setTableData([...data])

    setLoading(false)
    // if(serachKey){
    //   let serachData = data
    //   serachData = serachData.filter((dt,i)=>dt.filter((dt1,j)=> searchColumns.includes(j) && dt1.toLowerCase().includes(serachKey.toLowerCase())).length> 0)      
    //   setTableData([...serachData])
    // }
    // else
  },[data])
  const handleSearch=(e)=>{
    setLoading(true)
    const {value} = e.target
    setSerachKey(value)
    if (loadAll){
      let serachData = data
      serachData = serachData.filter((dt,i)=>dt.filter((dt1,j)=> searchColumns.includes(j) && dt1.toLowerCase().includes(value.toLowerCase())).length> 0)      
      if( value){
        setTableData([...serachData])
        setSerachData([...serachData])
      }
      else
        setTableData([...data])

      setLoading(false)
    }else{
      onSearch(value)
    }
  }
  return (

  <div class="relative   sm:rounded-lg ">
    <div className='flex justify-between items-center '>
    <div className='float-left text-xl '>
      {title}
    </div>
    <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 float-right pb-4">
       
        <div className='mr-2'>
        {
          utilities.length ?
          utilities.map((a)=>a)
          : ''
        }

        </div>

        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input  onChange={handleSearch} type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={searchPlaceHolder}/>

        </div>
        {reload&&
          <div class="relative mr-10" onClick={handleReload}>
          <div className='absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 cursor-pointer' >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </div>
        </div>}

    </div>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-black-500 ">
        <thead class="text-md text-black uppercase bg-gray-50 border-b border-gray-300">
          <tr> {headers.map((header,index)=>{
            return (
              <th scope="col" class="px-6 py-3">
                  {header}
              </th>
            )
          })}
          </tr>
        </thead>
        {
          loading ?
          <tbody>
            <tr>
              <td colSpan={headers.length} className='h-12 h-96'>
              Loading....
              </td>
              </tr>
          </tbody>
        :
        <tbody>

          {tableData.length ? tableData.map((dt, index)=>{
            return (<tr key={`tr_${index}`} class="text-sm bg-white border-b dark:bg-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-300">{dt.map((d,j)=>{
              return <td key={`td_${j}`} class="px-6 py-2">
              {d}
              </td>
            })} </tr>)
          })
            :
            <tr>
              <td colSpan={headers.length} className='h-18 h-96'>
              No Data Available
              </td>
            </tr>
          }
        </tbody>
        }
    </table>
</div>

  )
})

export default Table