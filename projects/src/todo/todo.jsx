import React, { useEffect } from "react";
import { useState } from "react";
import API from "./service/API";

import './todo.css'
function Todo(){
    const [input, setInput] = useState({});
    const [list,setList] = useState([])
    const handleChange = e => setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));


    const handleSubmit= async(data)=>{
        try {
            const { data: res } = await API.post('https://62a00597a9866630f80561eb.mockapi.io/v1/todos', data);
            console.log(res)
            setInput({})
            handleGetList()
            
        } catch (error) {
            
            console.error(error);
        }
    }
    const handleGetList = async()=>{
        try{
            const {data: res}= await API.get('https://62a00597a9866630f80561eb.mockapi.io/v1/todos')
            setList(res)
           
        }catch(error){
            console.error(error);
        }
    }
    useEffect(()=>{
        handleGetList()
    },[])
     
    // console.log(list)
    const handleDel =async(id)=>{
        
        try{
        const { data: res } = await API.delete(`https://62a00597a9866630f80561eb.mockapi.io/v1/todos/${id}`)
        handleGetList()
        
        }catch(error){
            console.log(error)
        }
    }

    const handleCom =async(id, isCompleted)=>{
      console.log( id, isCompleted)
        try{
            const com ={
                isCompleted: isCompleted
            }
            const { data: res } = await API.put(`https://62a00597a9866630f80561eb.mockapi.io/v1/todos/${id}`,com)
            handleGetList()
          
        }catch(error){
            console.log(error)
        }
    }
    
    return(
        
        <div className="todo">
            <h1 className="title">todos</h1>
            <div className="container">
                <div className="input">
                    <input 
                        className="box-input"
                        type="text" 
                        placeholder="Enter your todo"
                        value={input.name || ''}
                        name ='name'
                        onChange={handleChange}
                        
                    />
                    <button className='add'
                        onClick={()=>handleSubmit(input)}
                    >Add</button> 
                </div >
                <div className="box-list">
                {list.map((e, index) => (
                  
                    <div className='item' key={index} >
                        
                        <p className= {e.isCompleted && 'content-completed'||'content'}
                           
                           onClick={()=>handleCom(e.id , !e.isCompleted)}
                        >{e.name} </p>
                        
                        <button onClick={()=>handleDel(e.id)} className='button-del'>del</button>
                        {/* <button onClick={()=>handleCom(e.id , !e.isCompleted)}>com</button> */}
                        
                    </div>
                   
                    
                ))}
               </div>


            </div>
        </div>
    )
}
export default Todo;