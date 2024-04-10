import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [filterDate, setFilterDate] = useState([]);
  const [name, setName] = useState("");
  const [perPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setExpenses(response.data);
        setFilterDate(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const editHandle = (id) => {
    navigate(`/edit_expense/${id}`);
  };

  const deleteHandle = async (id) => {
    const result = window.confirm('Are you sure you want to delete...?');
    if (result) {
      try {
        await axios.delete("http://localhost:3000/users/" + id);
        setExpenses(expenses.filter(expense => expense.id !== id));
        setFilterDate(filterDate.filter(expense => expense.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const filterByExpenseDate = () => {
    const sortedExpenses = [...filterDate].sort((a, b) => new Date(b.date) - new Date(a.date));
    setFilterDate(sortedExpenses);
  };

  const filterByExpenseName = () => {
    const filteredExpenses = expenses.filter(expense => expense.expenseName === name);
    setFilterDate(filteredExpenses);
  };

  const getTimeDiff = (initialTime) => {
    var givenDateString = initialTime;
    var givenDate = new Date(givenDateString);
    var currentDate = new Date();
    var timeDiff = currentDate - givenDate;
    var secondsDifference = Math.floor(timeDiff / 1000);
    var minutesDifference = Math.floor((timeDiff / 1000) / 60);
    var hoursDifference = Math.floor((timeDiff / (1000 * 60 * 60)));
    var daysDifference = Math.floor((timeDiff / (1000 * 60 * 60 * 24)));
    // var millisecondsDifference = timeDiff;

    if (daysDifference >= 1) {
      return daysDifference + " days ago";
    } else if (hoursDifference >= 1) {
      return hoursDifference + " hours ago";
    } else if (minutesDifference >= 1) {
      return minutesDifference + " minutes ago";
    } else if (secondsDifference >= 1) {
      return secondsDifference + " seconds ago";
    } else {
      return "Just now";
    }
  }

  const indexOfLastExpense = currentPage * perPage;
  const indexOfFirstExpense = indexOfLastExpense - perPage;
  const currentExpenses = filterDate.slice(indexOfFirstExpense, indexOfLastExpense);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const showNextButton = currentExpenses.length === perPage;

  return (
    <div className='mt-10 py-14 border-4 border-black m-16 rounded-md p-10 bg-green-50'>
      <div className='flex flex-col sm:flex-row justify-between items-center'>
        <h1 className='font-bold text-xl mb-4 sm:mb-0'>MY EXPENSE MANAGER</h1>
        <div className='flex flex-col sm:flex-row items-center'>
          <button 
          className='border p-1 px-2 rounded-md bg-white hover:bg-slate-100 mb-2 sm:mb-0 sm:mr-4' 
          onClick={filterByExpenseDate}> Filter by Date of Expense</button>
          <input 
          className='border p-1 px-2 mb-2 sm:mb-0 sm:mr-4 rounded-md text-sm '
           placeholder='Enter Name for search' 
           onChange={(e) => setName(e.target.value)} />
          <button 
          className='border p-1 px-2 mb-2 sm:mb-0 sm:mr-4 rounded-md bg-white  hover:bg-slate-100 ' 
          onClick={filterByExpenseName}> Search Expense by Name </button>
          <button 
          className='border p-1 px-2 bg-green-500 text-white mb-2 sm:mb-0 sm:mr-4 rounded-md hover:bg-green-600' 
          onClick={() => navigate('/create_expense')}>New Expense</button>
          <button 
          className='border p-1 px-2 bg-red-500 text-white rounded-md hover:bg-red-600' 
          onClick={() => navigate('/')}>Logout</button>
        </div>
      </div>
      <div className='overflow-x-auto mt-5 bg-white rounded-md'>
        <table className="w-full border border-collapse border-gray-300">
          <thead className='bg-gray-300'>
            <tr>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Category</th>
              <th className="border px-3 py-2">Date of Expense</th>
              <th className="border px-3 py-2">Amount</th>
              <th className="border px-3 py-2">Update At</th>
              <th className="border px-3 py-2">Created by</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentExpenses.map((expense) => (
              <tr key={expense.id} className="border">
                <td className="border px-3 py-2">{expense.expenseName}</td>
                <td className="border px-3 py-2">{expense.category}</td>
                <td className="border px-3 py-2">{expense.date}</td>
                <td className="border px-3 py-2">INR {expense.amount}</td>
                <td className="border px-3 py-2">{getTimeDiff(expense.getTime)}</td>
                <td className="border px-3 py-2">{expense.createdBy}</td>
                <td className="border px-3 py-2">
                  <button className='px-3  mb-2 sm:mr-2' onClick={() => editHandle(expense.id)}>Edit</button>
                  <button className='mb-2 sm:mr-2' onClick={() => deleteHandle(expense.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {currentPage > 1 && (
          <button 
          className="mx-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" 
          onClick={() => paginate(currentPage - 1)}>Previous</button>
        )}
        {[...Array(Math.min(5, Math.ceil(filterDate.length / perPage))).keys()].map((pageNumber) => (
          <button
            key={pageNumber + 1}
            className={`mx-1 px-4 py-1 rounded-md  hover:bg-blue-600 ${pageNumber + 1 === currentPage ? 'bg-blue-500 text-white ' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
            onClick={() => paginate(pageNumber + 1)}
          >
            {pageNumber + 1}
          </button>
        ))}
        {showNextButton && (
          <button 
          className="mx-1 px-4 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600" 
          onClick={() => paginate(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};
export default ViewExpense;
