import axios from 'axios';
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const CreateExpense = () => {
  const navigate = useNavigate();

    const [expenseName, setExpenseName]=useState("");
    const [description , setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [createdBy, setCreatedBy] = useState("");
   
    
  const cancelHandle =()=>{
    navigate('/view_expense')
  }

  const getLatestTime = () => {
    const now = new Date();
  }
  const CreateExpense =(e)=>{
    console.log();
    let payload={
      expenseName,category,date,amount,createdBy
     }
     if(!expenseName && !category  && !date && !amount  && !createdBy ) 
     {
      alert("Enter the input value")
      window.location.reload("/create_expense")
      return
     }
     e.preventDefault()
    //  console.log(expenseName,description,category,date,amount,createdBy)
    console.log(payload);
    axios.post(`http://localhost:3000/users`,payload)
    .then((response)=>{
        console.log("Data has been stored" + response);
        navigate("/view_expense")
    })
    .catch((response)=>{
      console.log("Data hasnt stored");
    })

  }

   return (
    <div className=' rounded-md  flex justify-center mt-16 '>
      <form className='border p-10 rounded-md border-black'>

        <label>Name</label> <br/>
        <input 
         type='text' 
         placeholder='Name the Expense '
         className='p-2 mb-2 border rounded-md w-72  bg-gray-200 '
         onChange={(e)=>{
          setExpenseName(e.target.value)}}/><br/>

         <label>Description</label> <br/>
         <input 
         type='text' 
         placeholder='Describe the expense '
         className='p-2 mb-2 border rounded-md w-72  bg-gray-200'
         onChange={(e)=>{
          setDescription(e.target.value)}}/><br/>

         <label>Category</label> <br/>
         <select className='p-2 mb-2 border rounded-lg w-72  bg-gray-200 text-gray-400'
          onChange={(e)=>{
            setCategory(e.target.value)}}>
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
         className='p-2 mb-2 border rounded-md w-72  bg-gray-200  text-gray-400'
         onChange={(e)=>{
          setDate(e.target.value)}}/><br/>

         <label>Expense Amount </label> <br/>
         <input 
         type='number' 
         placeholder='Expense Amount in INR '
         className='p-2 mb-2 border rounded-lg w-72  bg-gray-200'
         onChange={(e)=>{
          setAmount(e.target.value)}}/><br/>

          <label>Created By </label> <br/>
         <input 
         type='text' 
         placeholder='Enter Created Name  '
         className='p-2 mb-2 border rounded-lg w-72  bg-gray-200'
         onChange={(e)=>{
          setCreatedBy(e.target.value)}}/><br/><br/>
         
        <div className='flex justify-between '>
          <button  className='border p-1 px-2 rounded-md bg-gray-400 text-white hover:bg-gray-500'
          onClick={cancelHandle}>Cancel</button>
          <button className='border p-1 px-2 rounded-md bg-green-400 text-white hover:bg-green-500' 
          onClick={ CreateExpense}>CreateExpense</button>
        </div>
    </form>
    
    </div>
  )
}

export default CreateExpense
