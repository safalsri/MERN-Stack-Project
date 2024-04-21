import  axios  from 'axios'
import { Heart, Trash } from 'lucide-react'
import React, { useContext, useState } from 'react'
import '../App.css'
import UserContext from '../context/Usercontext'


export function Cart() {

  let [user,setUser]=useState([])
let {setCart} = useContext(UserContext)
  async function viewcart(){
    let response = await axios.get('http://localhost:3000/cartdata')
    setUser(response.data) 
    setCart(response.data.length)
   
  }
  viewcart()

  let {cart} = useContext(UserContext)


  async function deletedata(id){
    await axios.delete(`http://localhost:3000/removecart/${id}`,user)
  }


  return (
    <div className="mx-auto max-w-7xl px-2 lg:px-0 absolute mt-6">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <form id='cart-main' className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section id='cart-data' aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
            {/* <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2> */}
            <ul role="list" className="divide-y divide-gray-200">
            {user.map((data)=>(
                <div  className="">
                  <li className="flex py-6 sm:py-6 ">
                    <div className="flex-shrink-0">
                      <img
                        src=''
                        alt='not found'
                        className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:pr-0" id='cart-data-section2'>
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <a className="font-semibold text-black">
                                Product Name :- {data.product_name}
                              </a>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-sm text-gray-500">Product Type :- {data.product_type}</p>
                            
                          </div>
                          <div className="mt-1 flex items-end">
                            
                            <p className="text-sm font-medium text-gray-900">
                              &nbsp;&nbsp;Product Price :- {data.product_price}
                            </p>
                            &nbsp;&nbsp;
                          </div>
                      <button
                      
                      onClick={()=>deletedata(data.ID)}
                      type="button" className="flex items-center space-x-1 px-2 py-1 pl-0">
                        <Trash size={20} className="text-red-500" id='cart-remove-icon'/>
                        <span className="text-xs font-medium text-red-500" id='cart-remove-btn'>Remove</span>
                      </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <div className="mb-2 flex">
                    <div className="min-w-24 flex">
                      <button type="button" className="h-7 w-7">
                        -
                      </button>
                      <input
                        type="text"
                        className="mx-1 h-7 w-9 rounded-md border text-center"
                        defaultValue={1}
                      />
                      <button type="button" className="flex h-7 w-7 items-center justify-center">
                        +
                      </button>
                    </div>
                    <div className="ml-6 flex text-sm">
                    </div>
                  </div>
                </div>
               ))} 
            </ul>
          </section>
          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
            id='cart-details'
          >
            <h2
              id="summary-heading"
              className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
            >
              Price Details
            </h2>
            <div>
              <dl className=" space-y-1 px-2 py-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-800">Price of all {cart} item432</dt>
                  <dd className="text-sm font-medium text-gray-900">₹ 52,398</dd>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <dt className="flex items-center text-sm text-gray-800">
                    <span>Discount</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">- ₹ 3,431</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="flex text-sm text-gray-800">
                    <span>Delivery Charges</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">Free</dd>
                </div>
                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                  <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                  <dd className="text-base font-medium text-gray-900">₹ 48,967</dd>
                </div>
              </dl>
              <div className="px-2 pb-4 font-medium text-green-700">
                You will save ₹ 3,431 on this order
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}
