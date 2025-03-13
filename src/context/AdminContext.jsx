import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext= createContext();


const AdminContextProvider=(props)=>{

    const [aToken, setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // console.log(aToken);
    const [doctors,setDoctors]=useState([])
    const [appointments,setAppointments]=useState([])
    const [dashData,setDashdata]=useState(false)
    
    
    const getAllDoctors = async()=>{
        try{
            const {data}= await axios.post(backendUrl + '/api/admin/all-doctors',{headers:{aToken}})
            // console.log(backendUrl,'here');
           
            if(data.success){
                setDoctors(data.doctors)
             
                console.log('data::',data.doctors);
                
            }
            else{
                toast.error(data.message)
                
            }
        }
        catch(error){
            toast.error(error.message)

        }
    }


    const changeAvailability=async (docId)=>{
        try{
            const {data}=await axios.post(backendUrl+ '/api/admin/change-availability',{docId},{headers:{aToken}})
            if(data.success)
            {
                toast.success(data.message)
                getAllDoctors()
            }
            else{
                toast.error(data.message)
                // console.log(data.message);
                
            }

        }
        catch(error){
            toast.error(error.message)
            console.log(error.message);

        }

    }

    const getAllAppointments=async()=>{
        try{
            const {data}=await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})
            if(data.success)
                {
                    // toast.success(data.message)
                    setAppointments(data.appointments)
                }
                else{
                    toast.error(data.message)
                }

        }catch(error){
            toast.error(error.message)

        }

    }

    const cancelAppointment= async(appointmentId)=>
    {
        try{
            const {data}=await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
            if(data.success)
                {
                    toast.success(data.message)
                    getAllAppointments()
                    
                }
                else{
                    toast.error(data.message)
                    console.log(data.message);
                }


        }catch(error){
            toast.error(error.message + ' not working')

        }
    }
    
    // console.log(import.meta.env.VITE_BACKEND_URL);

    const getDashdata= async()=>{
        try{
            const {data}=await axios.get(backendUrl+ '/api/admin/dashboard',{headers:{aToken}})
            if(data.success)
                {
                    // toast.success(data.message)
                    setDashdata(data.dashData)
                    console.log(data.dashData);
                    
                    
                }
                else{
                    toast.error(data.message)
                    console.log(data.message);
                }
    
        }catch(error){
                toast.error(error.message + ' not working')
    
            }
    }
    

    const value={
        aToken,setAToken,backendUrl,
        doctors,getAllDoctors,
        changeAvailability,
        appointments,setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,getDashdata


    } 

    return (
       < AdminContext.Provider value={value}>
        {props.children}
       </AdminContext.Provider>
    )

}


export default AdminContextProvider