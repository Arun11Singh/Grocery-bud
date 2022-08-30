
import './App.css';
import List from './List';
import { useEffect, useState } from 'react';
import Alert from './Alert';
const getlocalStorage=()=>{
  let list =localStorage.getItem("list")
  if(list){
    return(list =JSON.parse(localStorage.getItem("list")))
  }else{
    return[];
  }
 }
function App() {
 const [name, setName]= useState("")
 const [list, setList]=useState(getlocalStorage())
 const [isEditing, setIsEditing]=useState(false)
 const [editId, setEditId]=useState(null);
const  [alert,setAlert] = useState({show:false ,msg:"", type:""})
console.log(name)
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!name){
      showAlert(true, 'danger','please enter a value')
    }else if(name && isEditing){
      setList(
        list.map((item)=>{
          if(item.id ===editId){
            return {...item ,title:name}
          }
          return item
        })
      );
      
      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true,"success","value changed")
    }else{
      showAlert(true,"success","item added to the list")
      const newItem ={id:new Date().getTime().toString(),title:name}
      setList([...list,newItem]);
      setName('');
      console.log("item added")
    }
  }

  const showAlert=(show=false,type="",msg="")=>{
     setAlert({show ,type,msg})
  }

  const clearList=()=>{
     showAlert(true,'danger','empty list')
     setList([])
  }

  const editItem=(id)=>{
    //logice to clear all of the item
    const specificItem=list.find((item)=>item.id ===id)
    setIsEditing(true)
    setEditId(id)
    setName(specificItem.title)
  }

  const removeItem=(id)=>{
    showAlert(true,"danger","item is removed")
    setList(list.filter((item)=>item.id !==id))
  }

  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list))
  },[list])


  return (
    <div className="App">
       <section className="section-center">
          <form onSubmit={handleSubmit} className="grocery-form">
         {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
          <h2>Grocery Bud</h2>
          <div className="form-control">
            <input onChange={e=>setName(e.target.value)}
             type="text"  
             className='grocery' 
             placeholder="e.g.eggs"
          />
            <button type='submit' className='submit-btn'>
            {" "}
            {isEditing ?'edit': "submit"}
           </button>
            </div>
           </form>
           {list.length>0 &&(
            <div className="gracery-container">
            <List items={list} editItem={editItem} removeItem={removeItem}/>
            <button className='clear-btn' onClick={clearList}>
            {" "}
            clear item
            </button>
           </div>
           )}
           
          
        
       </section>

    </div>
  );
}

export default App;
