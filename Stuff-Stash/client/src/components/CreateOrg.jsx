//data link
//https://api-dot-techstack-demo-deployment.ue.r.appspot.com

//frontend link
//https://techstack-demo-deployment.ue.r.appspot.com

//import "../App.css";

import { useState } from "react";
import { ReactSession } from 'react-client-session';
import { useHistory } from "react-router-dom";
import React from "react";

const CreateOrg = () => {
  const [name, setorgname] = useState("");
  const [OrgAccessCode, setorgCode] = useState("");

  let history = useHistory();
    

  // Adds new Org
  const addOrg = async (e) => {
    e.preventDefault();
    //const res = await fetch('https://api-dot-techstack-demo-deployment.ue.r.appspot.com/api/v1/users/createOrg', {
    const res = await fetch("http://localhost:3000/api/v1/org/createOrg", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        OrgAccessCode,
      }),
    });

    const data = res.json();
    console.log("data -- ", data);
    console.log(res.status);
    if(res.status==200){
        data.then((vars)=>{
           ReactSession.set("orgname",vars.newOrg.name);
           data.then((response)=>{alert(response.msg);})
    });
      history.push("/CreateStockRoom");
    }
    else{
      data.then((response)=>{alert(response.msg);})
    }
  };

  const handlename=(e)=>{
    setorgname((e.target.value).trimStart())
  
  }
  
  const handleaccess=(e)=>{
    setorgCode((e.target.value).trimStart())
  
  }
  
  
  
  const resetInput = () => {
    setorgname("");
    setorgCode("");
  };

  return (
  <React.Fragment>
     <div className="bg fill d-flex align-items-center justify-content-center area p-5">
 
          <div className="col d-flex align-items-center text-center justify-content-center">
        <form>
          <h1>Enter an organization name:</h1>
          <input
            type="text"
            value={name} size="50"
            onChange={handlename}
          />
          <h1>Enter an organization AccessCode:</h1>
          <input
            type="text"
            value={OrgAccessCode} size="50"
            onChange={handleaccess}
          /><br /><br />
          <button onClick={addOrg}>Submit</button>&nbsp;&nbsp;
          <button onClick={resetInput}>Reset</button>
        </form>
      </div>
    </div>
    </React.Fragment>
  );
};

export default CreateOrg;
