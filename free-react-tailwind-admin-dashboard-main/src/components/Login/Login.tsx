import React from 'react';

interface Props {
  // Define prop types here
}

const Login: React.FC<Props> = ({ }) => {
  return (
    <div className='flex justify-center items-center w-full h-screen '>
      <div className='bg-slate-800	 w-2/5 h-96 rounded-lg flex items-center justify-center flex-col	gap-10'>
      <h1 className='text-5xl	font-semibold text-white'>Login</h1>
      <form action="">
<div className='flex flex-col gap-5'>
        <div ><input className='w-80	 px-5  py-5 focus:outline-none rounded' type="text" placeholder='Enter your name' /></div>
        <div><input className='w-80	 px-5 py-5 focus:outline-none rounded' type="text" placeholder='Enter your password' /></div>
    <button className='px-36 py-5 text-white	bg-black rounded'>Login</button></div>
        </form></div>

    </div>
  );
}

export default Login;
