import React from 'react'
import TableThree from '../components/Tables/TableThree';
import { Link } from 'react-router-dom';



const Employees = () => {
 
 
  return (
    <div className='relative'>
<Link to={'/form'}><button className='bg-indigo-900 text-white rounded px-7 py-1 absolute left-180'  > Create </button></Link>

<TableThree fieldone='Name' fieldtwo='Position'
  fieldthree='Age' fieldfour='Contact'  />

    </div>
  )
}

export default Employees