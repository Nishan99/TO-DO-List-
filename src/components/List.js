import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { MdDeleteForever } from "react-icons/md";
import AllList from './allList';
import Alert from './Alert'
import './style.css'

const getLocalStorage=()=>{
    let savedData = localStorage.getItem('list')
    if(savedData){
        return JSON.parse(savedData)
    }
    else
    return []
}
const List = ()=>{
    const [data, setData] = useState(getLocalStorage())
    const [name, setName] = useState('')
    const [alert, setAlert] = useState({show:false, msg:'', type:''})
    const [isEdit, setIsEdit] = useState(false)
    const [editValue, setEditValue] = useState(null)

    const handleSubmit = (e)=>{
        e.preventDefault()  

        if(name===''){
            handleAlert(true,"value Cant be empty",'danger')
        }
        else if(name && isEdit){
            setData(data.map(each=>{
                if(each.id === editValue){
                    return {...data,title:name}
                }
               return each
            }))
            setName('')
            setEditValue(null)
            setIsEdit(false)
            handleAlert(true, 'Item Edited','sucess')
           
           
        }
        else{
            const newData = {   
                id:new Date().getTime().toString(),
                title:name
            }
            handleAlert(true,"Item Added",'sucess')
            setData([...data, newData])
            setName("")
        }
    }

    const handleAlert=(show=false,msg='',type='')=>{
        setAlert({show,msg,type})
    }

    const deleteAll = () =>{
        handleAlert(true, "Empty List", 'danger')
        setData([])
    }

    const deleteEach = (id) =>{
        handleAlert(true, 'item deleted !!', 'warning')
        const toKeep = data.filter(particular =>{
            return particular.id !== id 
        })
        setData(toKeep)
    }

    const editItem = (id)=>{
        setIsEdit(true)
        setEditValue(id)
        const toEdit = data.find(item=>{
            return item.id ===id
        })

        setName(toEdit.title)

    }

    useEffect(()=>{
        localStorage.setItem('list',JSON.stringify(data))
    },[data])

    return(
        <section className="to__do container">
            <h2>To Do List</h2>
            {
                alert && <Alert {...alert} runAlert={handleAlert} name={data}/>
            }
            
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={e=>setName(e.target.value)}/>
                <button type="submit">{isEdit ? "Edit":"Add"}</button>
            </form>
          

            {data.length > 0 && 
                <div className="row">
                <AllList items={data} deleteEach={deleteEach} editItem={editItem}/> 
                <button onClick={deleteAll} className="clear-all"><MdDeleteForever className="clear-all-icon"/>Clear All</button>
                </div>  
            }
        
            
        </section>
    )
}

export default List