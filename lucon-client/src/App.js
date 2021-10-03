import Errpg from './errorpage';
import { useState } from 'react';
import LoginForm from './Components/LoginForm';
import Console from './mainconsole';

function App() {
    var [pageChanger, pageUploader] = useState(<LoginForm check_user={() => { check_user() }} />);
    var check_user = () => {
        var user_credentials = {
            username: document.getElementById('username').value,
            auth_code: document.getElementById('authcode').value,
            member_type: document.getElementById('select_desg').value
        }

        if (user_credentials.username.length < 3) {
            document.getElementById('errmsg').innerHTML = "put proper username";
            setTimeout(() => {
                document.getElementById('errmsg').innerHTML = " ";
            }, 1000);
        }
        else if (!user_credentials.member_type) {
            document.getElementById('errmsg').innerHTML = "no designation selected";
            setTimeout(() => {
                document.getElementById('errmsg').innerHTML = " ";
            }, 1000);
        }
        else {
            fetch('http://localhost:8080/check_user', {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(user_credentials)
            })
                .then(res => res.json())
                .then(response => {
                    if (response.type === "error") {
                        document.getElementById('errmsg').innerHTML = response.data.errmsg;
                        setTimeout(() => {
                            document.getElementById('errmsg').innerHTML = " ";
                        }, 1000);
                    }
                    else if (response.type === "success") {
                        console.log(response.data)
                        // store auth data (cookies aren't working properly)
                        // TODO: use JWT?
                        pageUploader(<Console userData={response.data} />)
                    }
                })
                .catch(() => {
                    pageUploader(<Errpg refresh_err={() => { pageUploader(<LoginForm check_user={() => { check_user() }} />) }} />)
                })
        }
    }


    return (
        <div className="App" >
            {pageChanger}
            {/* <LoginForm /> */}
            {/* <Console /> */}
        </div>
    );
}

export default App;