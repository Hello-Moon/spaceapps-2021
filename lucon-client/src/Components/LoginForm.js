import "../css/login.css";
import React from "react";
import Logo from './LOGO.png';

const LoginForm = (props) => {

    return (
        <div>
            <div className="userinput">
                <img src={Logo} alt="Logo" />
                <h1>Log into your account</h1>
                <div>
                    <input id="username" placeholder="Username" type="text" onKeyDown={
                        // handleEnterPress
                        (event) => {
                            if (event.key === "Enter") {
                                props.check_user();
                            }
                        }
                    } />
                    <select id="select_desg">
                        <option value="" disabled hidden selected> Select your designation</option>
                        <option value="CAPCOM">Capsule Communicator</option>
                        <option value="PAO">Public Affairs Office</option>
                        <option value="FOD">Flight Operations Directorate</option>
                        <option value="EVA">Extravehicular Activity</option>
                        <option value = "VW">Viewer</option>
                    </select>
                    <input id="authcode" placeholder="Authcode" type="password" onKeyDown={
                        // handleEnterPress
                        (event) => {
                            if (event.key === "Enter") {
                                props.check_user();
                            }
                        }
                    } />
                    <button id="login-submit" onClick={props.check_user}>Login!</button>
                </div>
                <p style={{ textAlign: "center", color: 'red', fontSize: "20px" }} id="errmsg"></p>
            </div>
        </div>
    );
};

export default LoginForm;
