import React from "react";
import './css/errpg.css'

var Errpg = (props)=>{
    return(
    <div id = "errpgdiv_outer">
        <div id = "errpgdiv_inner">
            <p id = "errpgdiv_inner_p1">We are Facing Some Issues</p>
            <p id = "errpgdiv_inner_p2">please try again</p>
            <button id = "refresh_but_login" onClick = {props.refresh_err}>RELOAD</button>
        </div>
    </div>)
}

export default Errpg;