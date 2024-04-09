import axios  from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewExpense = () => {
  const [expenses, setExpenses ] = useState([]);
  const navigate = useNavigate();
  const [filterDate, setFilterDate] = useState([]);
  const [name,setName]=useState("");
    const  data = fetch("http://localhost:3000/users")
    .then((response)=> response.json() )
    .catch(err=>console.log(err))
    // console.log(data);

    useEffect(()=>{
      async function convertPromiseToObject() {
        try {
          const result = await data; // Wait for the Promise to resolve
          setExpenses(result)
          setFilterDate(result)// Output the resolved object
        } catch (error) {
          console.error(error); // Handle any errors
        }
      }
      convertPromiseToObject()
    },[])

    const editHandle =(id)=>{
      console.log(id);
       navigate(`/edit_expense/${id}`)
    }

    const deleteHandle =(id)=>{
      const result = window.confirm('Are you sure you want to delete...?');
      if (result) {
        console.log('User confirmed');
        axios.delete("http://localhost:3000/users/"+id)
        window.location.reload("/view_expense")
        
      } else {
        console.log('User canceled');
        navigate("/view_expense")
      }
      
    }

    const filterByExpenseDate =()=>{
        console.log("click");
        console.log(filterDate);
        setFilterDate(filterDate.sort((a, b) => new Date(b.date) - new Date(a.date)));
        console.log(filterDate);
    }
    const filterByExpenseName = ()=>{
          console.log(name);
          setFilterDate(expenses.filter((res)=>res?.expenseName === name))
           }
    
  return (
    <div className='mt-10 py-14 border'>
     <div className='flex justify-evenly'>
      <div>
        <h1 className='font-bold text-xl'>MY EXPENSE MANAGER</h1>
      </div>
      <div className='px-2 text-sm ' >
        <button className='border p-1 px-2 rounded-md' 
        onClick={filterByExpenseDate}>Filter by Date of Expense</button>
        
        <input className='border p-1 px-2 ml-4 rounded-md' 
         placeholder='Enter Name for search' 
         onChange={(e)=>{
          setName(e.target.value)
          console.log(e.target.value);}}/>
         <button className='border p-1 px-2 ml-4 rounded-md' 
        onClick={filterByExpenseName}> Search Expense by Name </button>

        <button className='border p-1 px-2 bg-green-400 text-white ml-4 rounded-md'
        onClick={()=>{navigate('/create_expense')}}
        >New Expense</button> 
      </div>
     </div>
    <div className='flex justify-center mt-10 '>
    <table className="border border-collapse border-gray-300 ">
     <thead className='bg-gray-300'>
        <tr>
         <th className="border px-9 py-2">Name</th>
         <th className="border px-9 py-2">Category</th>
         <th className="border px-9 py-2">Date of Expense</th>
         <th className="border px-9 py-2">Amount</th>
         <th className="border px-9 py-2">Update At</th>
         <th className="border px-9 py-2">Created by</th>
         <th className="border px-9 py-2">Action</th>
        </tr>
     </thead>
     <tbody>
      {filterDate.map((expense) => (
       <tr key={expense.id} className="border">
        <td className="border px-9 py-2">{expense.expenseName}</td>
        <td className="border px-9 py-2">{expense.category}</td>
        <td className="border px-9 py-2">{expense.date}</td>
        <td className="border px-9 py-2">{expense.amount}</td>
        <td className="border px-9 py-2"></td>
        <td className="border px-9 py-2">{expense.createdBy}</td>
        <td className="border px-9 py-2">
          <button className='px-3' onClick={()=>{editHandle(expense.id)}}>Edit</button>
          <button className='' onClick={()=>{deleteHandle(expense.id)}}>Delete</button>
        </td>
      </tr>
     ))}
    </tbody>
   </table>
    </div>
    </div>
    
  );
};
export default ViewExpense;
