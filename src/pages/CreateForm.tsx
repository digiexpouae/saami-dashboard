import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addForm } from '../slice/employeeSlice'
import type { RootState } from '../redux/store'


// import TableThree from '../components/Tables/TableThree';
const CreateForm = () => {
const [inputone, setinputone] = useState('');
const [inputtwo, setinputtwo] = useState('');
const [inputthree, setinputthree] = useState('');
const [inputfour, setinputfour] = useState('');
const dispatch = useDispatch()
const formData = useSelector((state: RootState) => state.counter)
console.log(formData);

const handler=(e: React.ChangeEvent<HTMLInputElement>)=>{
const valueone=e.target.value
  return setinputone(valueone)
  }
const handlertwo=(e: React.ChangeEvent<HTMLInputElement>)=>{
    return setinputtwo(e.target.value)
      }
      console.log(addForm);
      
 const handlerthree=(e: React.ChangeEvent<HTMLInputElement>)=>{
        return setinputthree(e.target.value)
          }

          const handleSubmit = (e) => {
            e.preventDefault()

            const formData = {
              inputone,
              inputtwo,
              inputthree,
              inputfour,
            }
            dispatch(addForm(formData))
            // Optionally, clear the form inputs
            setinputone('')
            setinputtwo('')
            setinputthree('')
            setinputfour('')
          }

const handlerfour =(e: React.ChangeEvent<HTMLInputElement>)=>{
            return setinputfour(e.target.value)
              }

// const arr=[{inputone},{inputtwo},{inputthree},{inputfour}]


  return (
    <div> 
      <form onSubmit={handleSubmit}>
        <table>
          <tr>
<th>Name</th>
<th>Position</th>
<th>Age</th>
<th>Contact</th></tr>
          <tbody>
            <tr>
<td><input className='w-48 h-10 flex items-center justify-center	' type="text" value={inputone}  onChange={handler}   placeholder='Enter Your Name'  /></td>
<td><input className='w-48 h-10 flex items-center justify-center	' type="text" value={inputtwo}   onChange={handlertwo} placeholder=' Position'  /></td>
<td><input className='w-48 h-10 flex items-center justify-center	' type="text" value={inputthree}  onChange={handlerthree} placeholder='Age'    /></td>
<td><input className='w-48 h-10 flex items-center justify-center	' type="text" value={inputfour}  onChange={handlerfour}  placeholder='Contact'  /></td>
</tr>


          </tbody>
          
          
          </table>   
          <button className='px-10 py-4 bg-gray-800 text-white'>Add</button>  
          </form>
    </div>
  )
}

export default CreateForm;