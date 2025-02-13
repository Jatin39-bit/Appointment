/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { gsap } from 'gsap'
import {useGSAP} from '@gsap/react'
import { useEffect, useRef,useState } from 'react'
import AllAppointments from '../components/AllAppointments'
import AllDoctors from '../components/AllDoctors'
import AllUsers from '../components/AllUsers'

const AdminHome = () => {
  const AllDoctorsComponentRef= useRef(null)
  const [AllDoctorsComponent, setAllDoctorsComponent] = useState(true)
  const [doctors, setDoctors] = useState([])

  const [users, setUsers] = useState([])
  const AllUsersComponentRef= useRef(null)
  const [AllUsersComponent, setAllUsersComponent] = useState(false)

  const [AllAppointmentsComponent, setAllAppointmentsComponent] = useState(false)
  const AllAppointmentsComponentRef= useRef(null)
  const [appointments, setAppointments] = useState([])

  const Navigate = useNavigate()

  useEffect(()=>{
    getAllDoctors()
  },[])

  async function getAllDoctors(){
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}admin/alldoctors`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.status === 200){
        setDoctors(response.data)
      }
    }
    catch(err){
      console.error(err)
    }
  }

  async function getAllUsers(){
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}admin/allusers`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.status === 200){
        setUsers(response.data)
      }
    }
    catch(err){
      console.error(err)
    }
  }


  async function getAllAppointments(){
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}admin/allappointments`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.status === 200){
        setAppointments(response.data)
      }
    }
    catch(err){
      console.error(err)
    }
  }


  async function deleteUser(id){
    try{
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}admin/deleteuser/${id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.status === 200){
        setUsers(users.filter(user => user._id !== id))
      }
    }
    catch(err){
      console.error(err)
    }
  }

  async function deleteDoctor(id){
    try{
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}admin/deletedoctor/${id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.status === 200){
        setDoctors(doctors.filter(doctor => doctor._id !== id))
      }
    }
    catch(err){
      console.error(err)
    }
  }



  async function logout(){
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/logout`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.status === 200){
        localStorage.removeItem('token')
        Navigate('/admin/login')
      }
    }catch(err){
      console.error(err)
    }
  }

useGSAP(
  function(){
    if(AllDoctorsComponent){
      gsap.to(AllDoctorsComponentRef.current,{display:'block',duration:0.5})
  }else{
    gsap.to(AllDoctorsComponentRef.current,{display:'none',duration:0})
  }
},[AllDoctorsComponent])

useGSAP(
  function(){
    if(AllUsersComponent){
      gsap.to(AllUsersComponentRef.current,{display:'block',duration:0.5})
  }
  else{
    gsap.to(AllUsersComponentRef.current,{display:'none',duration:0})
  }
}
,[AllUsersComponent])

useGSAP(
  function(){
    if(AllAppointmentsComponent){
      gsap.to(AllAppointmentsComponentRef.current,{display:'block',duration:0.5})
  }
  else{
    gsap.to(AllAppointmentsComponentRef.current,{display:'none',duration:0})
  }
}
,[AllAppointmentsComponent])

  return (
    <div className='px-32'>
          <div className="pt-4 pb-4 flex justify-between  items-center border-b-[2px] border-gray-300 border-solid">
        <Link to="/admin/home" className="text-4xl font-semibold">Logo</Link>
        <div className="flex gap-4 items-center">
            <h2 onClick={async ()=>{
              await getAllDoctors()
              setAllDoctorsComponent(true)
              setAllUsersComponent(false)
              setAllAppointmentsComponent(false)
              }} className='cursor-pointer'>
              ALL DOCTORS
            </h2>
            <h2 onClick={async ()=>{
              await getAllUsers()
              setAllDoctorsComponent(false)
              setAllAppointmentsComponent(false)
              setAllUsersComponent(true)
              }} className='cursor-pointer'>
              ALL USERS
            </h2>
            <h2 onClick={async ()=>{
              await getAllAppointments()
              setAllDoctorsComponent(false)
              setAllUsersComponent(false)
              setAllAppointmentsComponent(true)
              }} className='cursor-pointer'>
              ALL APPOINTMENTS
            </h2>
        </div>
        <button onClick={()=>logout()} className='bg-gray-500 rounded-lg p-2'>LOGOUT
        </button>
    </div>


    {/* All doctors pannel */}
    <div ref={AllDoctorsComponentRef} className='hidden p-4'>
      <AllDoctors doctors={doctors} deleteDoctor={deleteDoctor}/>
    </div>

    {/* All users pannel */}
    <div ref={AllUsersComponentRef} className='hidden p-4'>
      <AllUsers users={users} deleteUser={deleteUser}/>
    </div>

    {/* All appointments pannel */}
    <div ref={AllAppointmentsComponentRef} className='hidden p-4'>
      <AllAppointments appointments={appointments}/>
      </div>


    </div>
  )
}

export default AdminHome