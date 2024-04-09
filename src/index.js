import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ViewExpense from './components/ViewExpense';
import CreateExpense from './components/CreateExpense';
import UpdateExpense from './components/UpdateExpense';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// reportWebVitals();
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: < App/>
  },
  {
    path: "/login",
    element: < App/>
  },
  {
    path: "/view_expense",
    element: < ViewExpense/>
  },
  {

    path: "/create_expense",
    element: < CreateExpense/>
  },
  {
    path: "/edit_expense/:id",
    element:<UpdateExpense/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router ={appRouter} />);
