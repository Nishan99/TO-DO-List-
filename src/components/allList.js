import React from 'react';
import { AiFillEdit } from "react-icons/ai"; // edit icon
import { AiFillDelete } from "react-icons/ai"; // delete icon
import './style.css'
const AllList = ({items, deleteEach, editItem})=>{
    return(
        <div>
           {items.map((element)=>{
               const {id,title} = element
               return <article key={id} className="list-container col-md-12">
                   <h3>{title}</h3>
                   <div className="btn-group">
                        <button className=" btn-edit"onClick={()=>editItem(id)}><AiFillEdit className="btn-edit-icon"/></button>
                        <button className=" btn-delete"onClick={()=>deleteEach(id)}><AiFillDelete className="btn-delete-icon"/></button>
                   </div>
               </article>
           })}
        </div>
    )
}

export default AllList