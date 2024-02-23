import { useEffect } from 'react';
import {useForm } from 'react-hook-form'; 
import { useNotifications } from '../store/useNotifications';
import { useMainUser } from '../store/useMainUser';
import { useNavigate } from 'react-router-dom';
interface values {
    user:string
    password:string
}
 const Login = () =>{
    const notifications = useNotifications()
    const mainUser = useMainUser()
    const navitate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors},
      } = useForm<values>();    
    const send = (data:values) =>{
        notifications.addNotification({title:"logged in correctly",data:"You will be redirected to the main window"})
        mainUser.set({name:data.user,JWT:data.password})
        navitate("/")
    }
    useEffect(()=>{
        if(Object.values(errors).length != 0) {
            Object.values(errors).map((err)=> {
                notifications.addNotification({title:"error in data", data:`field data ${err.type}`})
            })
        }
    },[errors])
    return <>
        <div className="w-full h-full flex justify-center md:items-center">
            
            <form onSubmit={handleSubmit((data) => send(data))} className="w-[80%] h-min my-4 flex flex-col items-center">
                <input {...register("user",{required:true, maxLength:20, minLength:3})} type="text" placeholder="Username" className="w-64 md:w-80 p-1 my-6 outline-none bg-transparent font-Dmsans border-b-2 border-cyan-950 placeholder:font-Dmsans placeholder:text-white-400 placeholder:-translate-y-2 focus:placeholder:translate-y-0 placeholder:transition-all text-white-100"/>
                <input {...register("password",{required:true,minLength:3,maxLength:20})} type="text" placeholder="Password" className="w-64 md:w-80 p-1 my-6 outline-none bg-transparent font-Dmsans border-b-2 border-cyan-950 placeholder:font-Dmsans placeholder:text-white-400 placeholder:-translate-y-2 focus:placeholder:translate-y-0 placeholder:transition-all text-white-100"/>
                <button className=" w-40 md:w-52 hover:bg-cyan-900 transition-all p-1 my-4 shadow-md shadow-cyan-950 bg-cyan-800 font-Dmsans font-bold text-white-50 rounded-sm">login</button>
            </form>
        
        </div>
    </>
}
export default Login