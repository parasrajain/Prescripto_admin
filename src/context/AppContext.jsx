import { createContext } from "react";
import React, { useState } from 'react'

export const AppContext= createContext()

const AppContextProvider=(props)=>{
    const currency = '₹'

    const calculateAge=(dob)=>{
        const today = new Date()
        const birthdate=new Date(dob)

        let age = today.getFullYear() - birthdate.getFullYear()

        return age;

    }
    const [appointments,setAppointments]=useState([]);
      const months=[" ","Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]
    
    //   const navigate = useNavigate()
    
      const slotDateFormat=(slotDate)=>{
        const dateArray=slotDate.split('_')
        return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2];
      }

    const value={
        calculateAge,slotDateFormat
        ,currency
    }

    return (
       < AppContext.Provider value={value}>
        {props.children}
       </AppContext.Provider>
    )

}

export default AppContextProvider