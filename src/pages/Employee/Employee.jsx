import React, { useState } from 'react'
import Employeetable from './Employetable'
import Employeeform from './Employeeform'
const Employee = () => {
  // to create form
// on submitting form data goes to redux and by redux it goes to host api 
// for the table i have to show the data from api



 const [table, settable] = useState(true)
  return (
    <div>
      <button onClick={()=>settable(false)}  className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Create</button>
      {table?<Employeetable />:<Employeeform  settable={settable}/>
      } 
    </div>
)
}

export default Employee