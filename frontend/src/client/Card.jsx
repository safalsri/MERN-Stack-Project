import axios from 'axios'
import '../App.css'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../context/Usercontext'

export default function Card() {
  let [user, setUser] = useState([])
  let [inp, setInp] = useState('')

  useEffect(()=>{
    viewdata()
  },[])

  let { ID } = useParams()

  

  
  

  async function viewdata() {
    let response = await axios.get('http://localhost:3000/api/products')
    setUser(response.data)
   
  }


  let {setCart} = useContext(UserContext)

  async function printCartNumber(){
    let result = await axios.get('http://localhost:3000/cartdata')
    // setUser(response.data)
    setCart(result.data.length)
  }
  // printCartNumber()

  
  function All(){
   viewdata()
  }
 
  async function onetothree(){
    let response = await axios.get('http://localhost:3000/getdata')

   let result = response.data.filter((item)=>item.product_price>=1000 && item.product_price<=3000)
    setUser(result)
    
  }
 async function threetofive(){
  let response = await axios.get('http://localhost:3000/getdata')
  
   let result = response.data.filter((item)=>item.product_price>3000 && item.product_price<=5000)
    setUser(result)
    
  }
  async function fivetoseven(){
    let response = await axios.get('http://localhost:3000/getdata')

   let result = response.data.filter((item)=>item.product_price>5000 && item.product_price<=7000)
    setUser(result)
    
  }
  async function aboveseven(){
    let response = await axios.get('http://localhost:3000/getdata')

   let result = response.data.filter((item)=>item.product_price>7000)
    setUser(result)
    
  }
 async function adidas(){
    let response = await axios.get('http://localhost:3000/getdata')

   let result = response.data.filter((item)=>item.product_name=='adidas')
    setUser(result)
    
  }
 async function denim(){
    let response = await axios.get('http://localhost:3000/getdata')

   let result = response.data.filter((item)=>item.product_name=='denim')
    setUser(result)
    
  }
 async function puma(){
    let response = await axios.get('http://localhost:3000/getdata')

   let result = response.data.filter((item)=>item.product_name=='puma')
    setUser(result)
    
  }

  async function search() {

    let response = await axios.get(`http://localhost:3000/api/productSearch/${inp}`)
    setUser(response.data)
  }


  const addcart = async(user)=>{
    try{
    const response = await axios.post('http://localhost:3000/submitCart',{
      product_name:user.product_name,
      product_type:user.product_type,
      product_rating:user.product_rating,
      product_price:user.product_price
    });
    console.log('Product added to mysql' , response.data)
    let result = await axios.get('http://localhost:3000/cartdata')
    // setUser(response.data)
    setCart(result.data.length)
 
  }
  catch(error){
    console.log('err in saving product',error)
  }
  }

  return (
    <>
      {/* sidebar */}
      <div id='sidebar'>

        <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8">
          
          <div className="mt-6 flex flex-1 flex-col justify-between" id='sidebar-local'>
            <nav className="-mx-3 space-y-6 ">
              <div className="space-y-3 ">
                <label className="px-3 text-xs font-semibold uppercase text-white">analytics</label>
                
                
<form className="max-w-md mx-auto">   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search"
        name='inp'
        value={inp}
        onChange={(e) => setInp(e.target.value)}   
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search items" required />
       
    </div>
</form>



                <button
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                onClick={search}
                >
                  <span className="mx-2 text-sm font-medium">search</span>
                </button>
                <a
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <span className="mx-2 text-sm font-medium">Sales</span>
                </a>
              </div>
              <div className="space-y-3 ">
                <label className="px-3 text-xs font-semibold uppercase text-white">Price</label>
                <button
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                 onClick={All}
                >
                  <span className="mx-2 text-sm font-medium">All</span>
                </button>
                <button
                onClick={onetothree}
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  
                >
                  <span className="mx-2 text-sm font-medium">1000 Rs - 3000Rs</span>
                </button>
                <button
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                 onClick={threetofive}
                >
                  <span className="mx-2 text-sm font-medium">3000 Rs - 5000 Rs</span>
                </button>
                <button
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  onClick={fivetoseven}
                >
                  <span className="mx-2 text-sm font-medium">5000 Rs - 7000 Rs</span>
                </button>
                <button
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                 onClick={aboveseven}
                >
                  <span className="mx-2 text-sm font-medium">Above Rs 7000 </span>
                </button>
              </div>

              <div className="space-y-3 ">
                <label className="px-3 text-xs font-semibold uppercase text-white">Brands</label>
                <button
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  onClick={adidas}
                >
                  <span className="mx-2 text-sm font-medium">Adidas</span>
                </button>
                <button
                onClick={denim}
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <span className="mx-2 text-sm font-medium">Denim</span>
                </button>
                <button
                onClick={puma}
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                  href="#"
                >
                  <span className="mx-2 text-sm font-medium">Puma</span>
                </button>

                
              </div>
            </nav>
          </div>
        </aside>
      </div>


      {/* Card */}
      <div id='card'>
        {user.map((data, key) => (
          <div className="flex max-w-2xl flex-col items-center rounded-md border md:flex-row" id='main' key={key}>
            <div className="h-full w-full md:h-[200px] md:w-[300px]">
              <img
                src={`http://localhost:3000/${data.productImage}`}
                alt="Laptop"
                className="h-full w-full rounded-md object-cover"
              />
            </div>
            <div>
              <div className="p-4">
                
                <div >
                <h1 className="inline-flex items-center text-lg font-semibold" id='card_div_p'>
                  Product Brand:-{data.productBrand}
                </h1>
                <h1 className="inline-flex items-center text-lg font-semibold" id='card_div_p'>
                  Product Type:-{data.productType}
                </h1>
                <h1 className="inline-flex items-center text-lg font-semibold" id='card_div_p'>
                  Product Rating:-{data.productRating}
                </h1>
                <h1 className="inline-flex items-center text-lg font-semibold" id='card_div_p'>
                  Product Price:-{data.productPrice}
                </h1>
                </div>
                <div className="mt-3 flex items-center space-x-2">
              <button type='submit'
              onClick={()=>addcart(data)}
              
              id='button-card'>Add to cart</button>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

