import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Layout from './Layout.jsx'
import Table from './components/Table'
import Signup from './components/Signup'
import View from './components/View'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Update from './components/Update.jsx'
import Card from './client/Card.jsx'
import Signin from './components/Signin.jsx'
import Protected from './components/Protected.jsx'
import { Cart } from './client/Cart.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
<>
<Route path='/' element={<App/>}>
  <Route path='' element={<Card/>}/>
  <Route path='cart' element={<Cart/>}/>

</Route>


    <Route path='/admin' element={<Layout/>}>
    <Route path='' element={
      <Protected>
        <Table/>
      </Protected>
    }/>
    <Route path='/admin/signup' element={
      <Protected>
        <Signup/>
      </Protected>
    }/>
    <Route path='/admin/signin' element={<Signin/>}/>
     <Route path='/admin/view/:ID' element={<View/>}/>
     <Route path='/admin/update/:ID' element={<Update/>}/>
    </Route>
</>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
