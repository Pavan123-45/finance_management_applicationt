import React from 'react'

const CreateExpense = () => {
  return (
    <div className=' rounded-md  flex justify-center mt-16 '>
      <form className='border p-10 rounded-md border-black'>
        <label>Name</label> <br/>
        <input 
         type='text' 
         placeholder='Name the Expense '
         className='p-2 mb-2 border rounded-md w-72  bg-gray-200 '/><br/>
         <label>Description</label> <br/>
         <input 
         type='text' 
         placeholder='Describe the expense '
         className='p-2 mb-2 border rounded-md w-72  bg-gray-200'/><br/>
         <label>Category</label> <br/>
         <select className='p-2 mb-2 border rounded-lg w-72  bg-gray-200 text-gray-400'>
           <option value="Select Category">Select Category</option>
           <option value="Health">Health</option>
           <option value="Electronics">Electronics</option>
           <option value="Travel">Travel</option>
           <option value="Education">Education</option>
           <option value="Books">Books</option>
           <option value="Others">Others</option>
         </select><br/>
         <label>Date of Expense</label> <br/>
         <input 
         type='date' 
         placeholder='Date of Expense '
         className='p-2 mb-2 border rounded-md w-72  bg-gray-200  text-gray-400'/><br/>

         <label>Expense Amount </label> <br/>
         <input 
         type='text' 
         placeholder='Expense Amount in INR '
         className='p-2 mb-2 border rounded-lg w-72  bg-gray-200'/><br/>

          <label>Created By </label> <br/>
         <input 
         type='text' 
         placeholder='Enter Created Name  '
         className='p-2 mb-2 border rounded-lg w-72  bg-gray-200'/><br/><br/>
         
        <div className='flex justify-between '>
          <button  className='border p-1 px-2 rounded-md bg-gray-400 text-white hover:bg-gray-500'>Cancel</button>
          <button className='border p-1 px-2 rounded-md bg-green-400 text-white hover:bg-green-500'>CreateExpense</button>
        </div>
    </form>
    
    </div>
  )
}

export default CreateExpense
