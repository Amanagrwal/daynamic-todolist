import React, { useState } from 'react';
import "./Todolist.css"



 const list = "list";
function Todolist() {
  const [todo, settodo] = useState(()=>{
    const data = localStorage.getItem(list);
 if(!data)   return [];
     return JSON.parse(data);

  });
  const [input, setinput] = useState("");
   const [undo , setundo] = useState(false);


  const addbtn = (e) => {
    e.preventDefault();
     
   input?
      settodo((preval) => {
        const allitems = {id: new Date().getTime().toString(), name :input , isdone : false }
        return [...preval, allitems];
      })
      :
      alert("enter the list ");
      setinput(""); 
      setundo(false);
  };

  const inputEvent = (event) => {
    setinput(event.target.value);
  };

  const deletetodo = (id)=>{
    settodo((preval)=>
      todo.filter((preval)=>
       preval.id != id))
  }
  const deletetodoall = ()=>{
    settodo([]);
    setundo(false);
     
  }
  const markasdone = (id)=>{
     settodo((pretodo) =>
      pretodo.map((curtodo)=>{
        if(curtodo.id === id ){
          return{
            ...curtodo , 
            isdone : true ,
          };
        }
        else {
          return curtodo;
        }
      })
    )
  }

const markasall = ()=>{
    settodo((pretodo)=>
    pretodo.map((curtodo)=>{
        return {
          ...curtodo , 
          isdone : true,
        };
    })
    )
    setundo(true);
  }



  localStorage.setItem(list, JSON.stringify(todo));
  return (
    <>
      <div className='container'>
        <h1 className='heading'>Todolist</h1>
        <form onSubmit={addbtn}>
        <input
          type='text'
          placeholder='Enter the text'
          className='inputbtn'
          onChange={inputEvent}
          value={input} 
        />
        <button type='submit'>Add</button>
        </form>

        <ul>
          {todo.map((curval) => (
            <li key={curval.id} 
             style={{textDecoration : curval.isdone ? "line-through" : "none" }}>
                   {curval.name}
               <div className='divbtn'>
                <button onClick={()=>{deletetodo(curval.id)}} className='deletebtn'>delete</button>
                <button onClick={()=>{markasdone(curval.id)}} className='markasdonebtn'  
                style={{backgroundColor : curval.isdone ? "  cadetblue" : "none" }}>
                
                  {curval.isdone?"done":"mark as done" }
                  </button>
                  </div>
                  </li> 
              
          ))}
        </ul>
        <br/>
       
        <div className="allbtn">
        <button onClick={deletetodoall} className='uppercaseallbtn'> Clear all</button>
        <button onClick={markasall} 
        className='markasdoneall'
        style={{backgroundColor : undo? "  cadetblue" : "#007bff" }}
        >
           {undo?"done":"mark as done" } </button>
        </div>
       
      </div>
    </>
  );
}

export default Todolist;
