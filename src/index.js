import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ViewExpense from './components/ViewExpense';
import CreateExpense from './components/CreateExpense';

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
    path: "/view_expens",
    element: < ViewExpense/>
  },
  {

    path: "/create_expense",
    element: < CreateExpense/>
  },
  {
    path: "/edit_expense",
    element: < CreateExpense/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router ={appRouter} />);
