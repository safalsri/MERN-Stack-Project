import React, { useState } from "react";
import UserContext from "./Usercontext";

export default function UserContextPRovider2({children}){
    let [cart,setCart]=useState('')
    return(
       <UserContext.Provider value={{cart,setCart}}>
         {children}
       </UserContext.Provider>
    )
}