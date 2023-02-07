import { useEffect } from "react";

function Message({msg,setIsMsg}) {

  const checkMsgColor=()=>{
    if(msg==="Item added to the list" || msg==="Value Changed")
    return "msgGreen";
    else
    return "msgRed";
  }

    useEffect(()=>{
        setTimeout(()=>{
            setIsMsg(false);
        },1500)
    });
    return (
      <div className={checkMsgColor()}>
       <p>{msg}</p>
      </div>
    );
  }
  
  export default Message;