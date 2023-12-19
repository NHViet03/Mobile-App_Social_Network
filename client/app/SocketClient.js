import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'

export default function SocketClient() {
    const auth=useSelector(state=>state.auth);
    const socket=useSelector(state=>state.socket);
    const dispatch=useDispatch();

    // Join User

    useEffect(()=>{
        if(!socket) return;
        socket.emit('joinUser',auth.user?._id)
    },[socket,auth.user._id])

  return (
    <></>
  )
}