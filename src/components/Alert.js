import React, { useEffect } from 'react';
import './style.css'
const Alert = ({msg,type,runAlert, name})=>{
    useEffect(()=>{
        const timeoutFun = setTimeout(()=>{
            runAlert()
        },3000)

        return () => clearTimeout(timeoutFun)
    },[name])   


return(
    <p className={`msg-${type}`}>{msg}</p>
)
}
export default Alert