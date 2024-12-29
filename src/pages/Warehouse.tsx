import React from 'react'
import TableThree from '../components/Tables/TableThree'
import { Link } from 'react-router-dom'
const Warehouse = () => {
  return (
<div>
<Link to={'/form'}><button className='bg-indigo-900 text-white rounded px-7 py-1 absolute left-180'  > Create </button></Link>
    <TableThree   fieldone='WarehouseName' fieldtwo='Location' fieldthree='Total Employees' fieldfour='General Details' />
</div>
  )
}

export default Warehouse