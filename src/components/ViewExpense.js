import React, { useEffect, useState } from 'react';

const ViewExpense = () => {
  const [expenses, setExpenses ] = useState([]);

    const  data = fetch(" http://localhost:3000/users")
    .then((response)=> response.json() )
    .catch(err=>console.log(err))
    // console.log(data);

    useEffect(()=>{
      async function convertPromiseToObject() {
        try {
          const result = await data; // Wait for the Promise to resolve
          // console.log(result); 
          setExpenses(result)// Output the resolved object
        } catch (error) {
          console.error(error); // Handle any errors
        }
      }
      convertPromiseToObject()
    },[])

    const editHandle =()=>{

    }

    const deleteHandle =()=>{
      alert("Are you sure you want to delete this expense?")
    }
  return (
    <div className=' border mt-10 py-14 border'>
     <div className='flex justify-evenly'>
      <div>
        <h1 className='font-bold text-xl'>MY EXPENSE MANAGER</h1>
      </div>
      <div className='px-2 text-sm ' >
        <button className='border p-1 px-2 rounded-md'>Filter by Date of Expense</button>
        <button className='border p-1 px-2 ml-4 rounded-md'> Search Expense by Name </button>
        <button className='border p-1 px-2 bg-green-400 text-white ml-4 rounded-md'>New Expense</button> 
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
         <th className="border px-9 py-2">Created by</th>
         <th className="border px-9 py-2">Action</th>
        </tr>
     </thead>
     <tbody>
      {expenses.map((expense) => (
       <tr key={expense.id} className="border">
        <td className="border px-9 py-2">{expense.name}</td>
        <td className="border px-9 py-2">{expense.category}</td>
        <td className="border px-9 py-2">{expense.date}</td>
        <td className="border px-9 py-2">{expense.amount}</td>
        <td className="border px-9 py-2">{expense.createdBy}</td>
        <td className="border px-9 py-2">
          <button className='px-3' onClick={editHandle}>Edit</button>
          <button className='' onClick={deleteHandle}>Delete</button>
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