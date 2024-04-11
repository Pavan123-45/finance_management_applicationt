import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateExpense = () => {
  const navigate = useNavigate();
  const [expenseName, setExpenseName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const { id } = useParams();

  const cancelHandle = () => {
    navigate('/view_expense')
  }

  const updateExpense = (e) => {
    let payload = {
      expenseName, category, date, amount, createdBy
    }
    e.preventDefault()
    axios.put(`http://localhost:3000/users/${id}`, payload)
      .then((response) => {
        console.log("Data has been stored" + response);
        navigate("/view_expense")
      })
      .catch((response) => {
        console.log("Data hasnt stored");
      })
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${id}`)
      .then((response) => {
        console.log("Data has been stored");
        const data = response.data;
        setExpenseName(data.expenseName);
        setDescription(data.description);
        setCategory(data.category);
        setDate(data.date);
        setAmount(data.amount);
        setCreatedBy(data.createdBy);
      })
      .catch((response) => {
        console.log("Data hasn't stored");
      })
  }, [id]);

  return (
    <div className='rounded-md flex justify-center mt-8 '>
      <form className='border p-5 md:p-10 rounded-md border-black w-96 bg-green-50'>

        <label>Name</label> <br />
        <input
          type='text'
          placeholder='Name the Expense'
          value={expenseName}
          className='p-2 mb-4 border rounded-md w-full bg-gray-200'
          onChange={(e) => { setExpenseName(e.target.value) }} /><br />

        <label>Description</label> <br />
        <input
          type='text'
          placeholder='Describe the expense'
          value={description}
          className='p-2 mb-4 border rounded-md w-full bg-gray-200'
          onChange={(e) => { setDescription(e.target.value) }} /><br />

        <label>Category</label> <br />
        <select className='p-2 mb-4 border rounded-lg w-full bg-gray-200 text-gray-400' value={category}
          onChange={(e) => {
            setCategory(e.target.value)
          }}>
           <option value="Health">Health</option>
          <option value="Electronics">Electronics</option>
          <option value="Travel">Travel</option>
          <option value="Education">Education</option>
          <option value="Books">Books</option>
          <option value="Others">Others</option>
          <option value="Food">Food</option>
          <option value="Home">Home</option>
          <option value="Cloth">Cloth</option>
        </select><br />

        <label>Date of Expense</label> <br />
        <input
          type='date'
          placeholder='Date of Expense'
          value={date}
          className='p-2 mb-4 border rounded-md w-full bg-gray-200 text-gray-400'
          onChange={(e) => { setDate(e.target.value) }} /><br />

        <label>Expense Amount</label> <br />
        <input
          type='text'
          placeholder='Expense Amount in INR'
          value={amount}
          className='p-2 mb-4 border rounded-lg w-full bg-gray-200'
          onChange={(e) => { setAmount(e.target.value) }} /><br />

        <label>Created By</label> <br />
        <input
          type='text'
          placeholder='Enter Created Name'
          value={createdBy}
          className='p-2 mb-4 border rounded-lg w-full bg-gray-200'
          onChange={(e) => { setCreatedBy(e.target.value) }} /><br /><br />

        <div className='flex flex-col md:flex-row'>
          <button className='border p-1 px-2 rounded-md bg-red-500 text-white hover:bg-red-600 md:mr-2 mb-2 md:mb-0'
            onClick={cancelHandle}>Cancel</button>
          <button className='border p-1 px-2 rounded-md bg-green-500 text-white hover:bg-green-600'
            onClick={updateExpense}>Update Expense</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateExpense
