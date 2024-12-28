import React, { useState } from 'react'
import Employee from './Employee'
import { useDispatch } from 'react-redux'
import employeeReducer from '../../slice/employee'
const Employeeform = ({settable}) => {
  const dispatch=useDispatch();

    const [form, setform] = useState(true)
   let [formdata, setformdata] = useState({
      name:'',
      position:'',
      age:'',
      contact:''
    })
const onhandlechange=(e)=>{
const {name,value}=e.target
console.log(value)
setformdata((elem) => ({
  ...elem, // Spread the previous data
  [name]: value, // Update only the field that changed
}));
 
} 
const onsubmithandler=(e)=>{
e.preventDefault()
  dispatch(employee(formdata))
setform(false)
}
return (
    <div>



   {form?(
    <div>
      <form action="" onSubmit={onsubmithandler}>
    <label className="mb-3 block text-black dark:text-white">
                  Name
                </label>
                <input
                name='name'
                value={formdata.name}
                  type="text"
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                onChange={onhandlechange}
                />
<label className="mb-3 block text-black dark:text-white">
                 Position
                </label>
                <input
                name='position'
                value={formdata.position}
                  type="text"
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={onhandlechange}
               />
                <label className="mb-3 block text-black dark:text-white">
                Age
                </label>
                <input
                value={formdata.age}
                name='age'
                  type="text"
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={onhandlechange}
              />
                <label className="mb-3 block text-black dark:text-white">
                  Contact
                </label>
                <input
                value={formdata.contact}
                name='contact'
                  type="number"
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={onhandlechange} />
              
                  <button className="mt-4 inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-white"
                  onClick={()=>{setform(false)}}>Cancel</button>
                  <button className="mt-4 inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-white" type='submit'>Submit</button>
                  </form>
                  </div>
):(settable(true))}
    </div>
  )
}
export default Employeeform;