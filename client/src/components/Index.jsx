
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import indexCss from "../CSS/index.module.css"

 
const Index = () =>{
  // notice that we pass a callback function to initialize the socket
  // we don't need to destructure the 'setSocket' function since we won't be updating the socket state
  const [results, setResults] = useState([])
  const [send, setSend] = useState("")
  const [yourMessages, setYourMessages] = useState([])

  const yourMsgsRev = yourMessages.slice().reverse();
  const resultsRev = results.slice().reverse()

  


  const [socket] = useState(() => io(':8000'));
 


  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  

 
  useEffect(() => {
    // we need to set up all of our event listeners
    // in the useEffect callback function
    console.log('Is this running?');
     socket.on("send_data_to_all_other_clients", data =>{
        setResults(prevResults =>{
            
            return [data, ...prevResults]

        })
    });
    socket.on("console", data =>{
      console.log(data)
  });
  }, []);


  const submitHandler = (e) => {
    e.preventDefault()
    socket.emit("event_from_client", Object.values(send))
    

    setYourMessages(prevResults =>{
        

        return [Object.values(send)[0], ...prevResults]

    })

    console.log(yourMessages)

   
    
}

const onChangeHandler = (e) => {
    setSend({
       send,
       [e.target.name]: e.target.value
    })
    

}
  
 
  return (
    <div className={indexCss.container}>
      <div className={indexCss.messageContainer}>


      
      
        <div className={indexCss.yours}>
          {
                        yourMsgsRev.map((vals, idx) => {
                            return(
                        <div key={idx}>
                            <h3 className={indexCss.yourTexts}>{vals}</h3>
                            <AlwaysScrollToBottom/>
                        </div>
                        
                        
                        
                    
                            )
                        })
                      }
                      
                      </div>
                        
                      <div className={indexCss.theirs}>
                          {
                        resultsRev.map((val, idx) => {
                            return(
                      
                        <div key={idx}>
                            <h3 className={indexCss.theirTexts}>{val}</h3>
                            <AlwaysScrollToBottom/>
                        </div>
                        
 
                            )
                        })
                        }
                      </div>
                  
                  
        

      </div>
      
      
      <form id={indexCss.flex} onSubmit={submitHandler}>
          <input type="text" name='send' onChange={onChangeHandler} />
          <button type='submit'>send</button>
      </form>
    </div>
  );
}
 
export default Index;



