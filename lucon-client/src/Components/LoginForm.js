import "../css/login.css";
import React from "react";
const LoginForm = (props) => {

    return (
        <div>
            <div className="userinput">
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
                        <option value="astro">Astronaut</option>
                        <option value="gcrew">Ground Crew</option>
                        <option value="viewer">Viewer</option>
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
