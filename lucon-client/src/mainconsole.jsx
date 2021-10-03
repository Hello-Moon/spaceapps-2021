import React, { useState, useEffect } from "react";
import "./css/console.css"
import "./css/tailwind.css"
import axios from 'axios'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

var msgContainer = []
var msgNo = -1;
var targetU;
var targetT;

var Console = (props) => {
    var {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    let wsClient;
    var userData = JSON.parse(props.userData)

    wsClient = new WebSocket('ws://localhost:8080');

    //new day clock
    var Clock = () => {
        let currentTime = new Date()
        let currentHrs = currentTime.getHours()
        let currentMins = currentTime.getMinutes()
        let currentSecs = currentTime.getSeconds()

        if ((currentHrs === 23) & (currentMins === 59) & (currentSecs === 59)) {

            var newDay = document.createElement('h1')
            var newDayTime = document.createTextNode(currentTime.getDate() + "/" + currentTime.getMonth() + "/" + currentTime.getFullYear())
            newDay.append(newDayTime)
            var whiteLine = document.createElement('hr')
            newDay.setAttribute('id', 'newDayPopUp')
            document.getElementById('msgstore').appendChild(whiteLine)
            document.getElementById('msgstore').appendChild(newDay)
            document.getElementById('msgstore').appendChild(whiteLine)
        }
    }

    var time = setInterval(Clock, 1000)


    function SpeechToText(){
        if (browserSupportsSpeechRecognition) {
            mini_msg_pusher("Mic is on");
            SpeechRecognition.startListening({
                language:"en-US",
                continuous:true,
            }).then(()=>{
                console.log(transcript);
            }).catch(err=>console.error("ERROR : ",err.message));
        }
        else console.log("This Browser doesn't support Speech Synthesis");
    }

    function StopListening(){
        SpeechRecognition.stopListening();
        mini_msg_pusher("Mic is off");
        document.getElementById('inpbox').value=transcript;
        resetTranscript();
    }

    //main comm functions
    useEffect(() => {
        wsClient.onerror = () => {
            console.error('WebSocket error')
            mini_msg_pusher('Websocket error')
        }


        wsClient.onopen = () => {
            console.log("WebSocket connection established")
            mini_msg_pusher(`@${userData.username} joined`)

            // send auth data (cookies aren't working properly)
            // TODO: use JWT?
            wsClient.send(JSON.stringify({
                type: "userInfo",
                // TODO: stringify(in server), parse again stringify?
                data: JSON.parse(props.userData)
            }));
        }

        wsClient.onmessage = (message) => {
            let data = JSON.parse(message.data);
            var pepColor;

            if (data.data.User.designation == "CAPCOM") {
                pepColor = "#AC92EB"
            }
            else if (data.data.User.designation == "PAO") {
                pepColor = "#4FC1E8"
            }
            else if (data.data.User.designation == "FOD") {
                pepColor = "#FFCE54"
            }
            else if (data.data.User.designation == "EVA") {
                pepColor = "#ED5564"
            }



            //msg component made using dom

            if (data.data.dataType === 0) {
                var msgDiv = document.createElement('div')
                msgDiv.setAttribute('id', "logNo" + ++msgNo)
                msgDiv.setAttribute('class', "message-container")

                var timestampP = document.createElement('p')
                var timestampTxt = document.createTextNode("#" + data.data.createdAt.slice(0, 19) + "::");
                timestampP.setAttribute('class', "timestamp")
                timestampP.append(timestampTxt)

                var usernameP = document.createElement('p')
                var usernameTxt = document.createTextNode("@" + data.data.User.username + "::")
                usernameP.setAttribute('class', "username")
                usernameP.append(usernameTxt)
                usernameP.setAttribute('style', `color:${pepColor}`)

                var messageP = document.createElement('p')
                var messageTxt = document.createTextNode(data.data.log)
                messageP.setAttribute('class', "message")
                messageP.append(messageTxt)


                msgDiv.append(timestampP);
                msgDiv.append(usernameP);
                msgDiv.append(messageP);

                document.getElementById('msgstore').append(msgDiv)

                var contentBoxFix = document.getElementById('msgstore')
                contentBoxFix.scrollTop = contentBoxFix.scrollHeight

            }
            else if (data.data.dataType === 1) {
                var msgDiv = document.createElement('div')
                msgDiv.setAttribute('id', "logNo" + ++msgNo)
                msgDiv.setAttribute('class', "message-container")

                var timestampP = document.createElement('p')
                var timestampTxt = document.createTextNode("#" + data.data.createdAt.slice(0, 19) + "::");
                timestampP.setAttribute('class', "timestamp")
                timestampP.append(timestampTxt)

                var usernameP = document.createElement('p')
                var usernameTxt = document.createTextNode("@" + data.data.User.username + "::")
                usernameP.setAttribute('class', "username")
                usernameP.append(usernameTxt)
                usernameP.setAttribute('style', `color:${pepColor}`)

                var messageP = document.createElement('a')
                messageP.setAttribute('src', data.data.log)
                var messageTxt = document.createTextNode(data.data.log + " (audio file)")
                messageP.setAttribute('class', "audiolink")
                messageP.append(messageTxt)


                msgDiv.append(timestampP);
                msgDiv.append(usernameP);
                msgDiv.append(messageP);

                document.getElementById('msgstore').append(msgDiv)

                var contentBoxFix = document.getElementById('msgstore')
                contentBoxFix.scrollTop = contentBoxFix.scrollHeight
            }
            else if (data.data.dataType === 2) {
                var msgDiv = document.createElement('div')
                msgDiv.setAttribute('id', "logNo" + ++msgNo)
                msgDiv.setAttribute('class', "message-container")

                var timestampP = document.createElement('p')
                var timestampTxt = document.createTextNode("#" + data.data.createdAt.slice(0, 19) + "::");
                timestampP.setAttribute('class', "timestamp")
                timestampP.append(timestampTxt)

                var usernameP = document.createElement('p')
                var usernameTxt = document.createTextNode("@" + data.data.User.username + "::")
                usernameP.setAttribute('class', "username")
                usernameP.append(usernameTxt)
                usernameP.setAttribute('style', `color:${pepColor}`)

                var messageP = document.createElement('a')
                messageP.setAttribute('src', data.data.log)
                var messageTxt = document.createTextNode(data.data.log + " (video file)")
                messageP.setAttribute('class', "videolink")
                messageP.append(messageTxt)


                msgDiv.append(timestampP);
                msgDiv.append(usernameP);
                msgDiv.append(messageP);

                document.getElementById('msgstore').append(msgDiv)

                var contentBoxFix = document.getElementById('msgstore')
                contentBoxFix.scrollTop = contentBoxFix.scrollHeight
            }
            else if (data.data.dataType === 3) {
                var msgDiv = document.createElement('div')
                msgDiv.setAttribute('id', "logNo" + ++msgNo)
                msgDiv.setAttribute('class', "message-container")

                var timestampP = document.createElement('p')
                var timestampTxt = document.createTextNode("#" + data.data.createdAt.slice(0, 19) + "::");
                timestampP.setAttribute('class', "timestamp")
                timestampP.append(timestampTxt)

                var usernameP = document.createElement('p')
                var usernameTxt = document.createTextNode("@" + data.data.User.username + "::")
                usernameP.setAttribute('class', "username")
                usernameP.append(usernameTxt)
                usernameP.setAttribute('style', `color:${pepColor}`)

                var messageP = document.createElement('img')
                messageP.setAttribute('src', data.data.log)
                messageP.setAttribute('class', "imageAct")
                


                msgDiv.append(timestampP);
                msgDiv.append(usernameP);
                msgDiv.append(messageP);

                document.getElementById('msgstore').append(msgDiv)

                var contentBoxFix = document.getElementById('msgstore')
                contentBoxFix.scrollTop = contentBoxFix.scrollHeight
            }

            msgContainer.push({ username: "@" + data.data.User.username, timestamp: "#" + data.data.User.createdAt })

        }


        wsClient.onclose = () => {
            console.log("WebSocket connection closed")
        }
    }, [])

    var logout = () => {
        window.location.reload()
    }

    var clearIP = () => {
        document.getElementById('inpbox').value = ''
    }


    var mediaMsgMaker = (type, link) => {
        if (type === "audio") {

            mini_msg_pusher("audio uploaded")

            send_message(link, 1);
        }
        else if (type === "video") {

            mini_msg_pusher("Video uploaded")
            send_message(link, 2);

        }
        else if (type === 'image') {

            mini_msg_pusher("image uploaded")

            send_message(link, 3);

        }
    }

    var sendMessageFromInputBox = () => {
        const message = document.getElementById('inpbox').value;
        if (!message) {
            console.log("no message is written")
            return null;
        } else {
            send_message(message, 0);
        }
        document.getElementById('inpbox').value = ""
    }


    //sending logs through console(only text)
    var send_message = (message, dataType) => {
        if (!wsClient) {
            console.err('No WebSocket connection');
            return;
        } else {
            wsClient.send(JSON.stringify({
                type: "newLogEvent",
                data: {
                    dataType: dataType,
                    log: message,
                    fromUser: JSON.parse(props.userData).id,
                    // TODO: timestamp
                    // timestamp: datedef.getHours() + ":" + datedef.getMinutes() + ":" + datedef.getSeconds()
                }
            }))
        }
    }

    //pushes message to mini display
    var mini_msg_pusher = (msg) => {
        var msgP = document.createElement('p')
        var textNode = document.createTextNode(msg)
        msgP.appendChild(textNode)

        document.getElementById('instatsDisplay').appendChild(msgP)
        var instantDisplayFix = document.getElementById('instatsDisplay')
        instantDisplayFix.scrollTop = instantDisplayFix.scrollHeight

    }

    //loaded files comes here
    var upload_img = (event) => {
        if (!event.target.files[0]) {
            //nothing
        }
        else if (event.target.files[0].type.search("image/") !== -1) {
            const formData = new FormData();
            formData.append('FILE', event.target.files[0]);
            axios.post('http://localhost:8080/file', formData).then(res => {
                var link = res.data.webContentLink;
                mediaMsgMaker("image", link)
            }).catch(err => console.error("Error : ", err));
        }
        else if (event.target.files[0].type.search("video/") !== -1) {
            const formData = new FormData();
            formData.append('FILE', event.target.files[0]);
            axios.post('http://localhost:8080/file', formData).then(res => {
                var link = res.data.webContentLink;
                mediaMsgMaker("video", link)
            }).catch(err => console.error("Error : ", err));
        }
        else if (event.target.files[0].type.search("audio/") !== -1) {
            const formData = new FormData();
            formData.append('FILE', event.target.files[0]);
            axios.post('http://localhost:8080/file', formData).then(res => {
                var link = res.data.webContentLink;
                mediaMsgMaker("audio", link)
            }).catch(err => console.error("Error : ", err));
        }
    }



    //clear all search records and highlights
    var clearSearch = () => {
        if (targetT) {
            for (var i = 0; i < msgContainer.length; i++) {
                if (msgContainer[i].timestamp === targetT) {
                    document.getElementById("logNo" + i).style.backgroundColor = ""
                }
            }
            targetT = null;
        }
        if (targetU) {
            if (targetU) {
                for (var i = 0; i < msgContainer.length; i++) {
                    if (msgContainer[i].username === targetU) {
                        document.getElementById("logNo" + i).style.backgroundColor = ""
                    }
                }
                targetU = null;
            }
        }
    }

    //search logs using username
    var searchLogUname = (id) => {
        clearSearch()
        targetU = id.target.innerHTML

        for (var i = 0; i < msgContainer.length; i++) {
            if (msgContainer[i].username === targetU) {
                document.getElementById("logNo" + i).style.backgroundColor = "rgba(51, 255, 153,0.4)"
                document.getElementById('searchbox').style.display = "none"
                document.getElementById('searchbox').innerHTML = ''
                document.getElementById('searchbar').value = ''
            }
        }
    }


    //search logs using timestamp
    var searchLogT = (id) => {
        clearSearch()
        targetT = id.target.innerHTML

        for (var i = 0; i < msgContainer.length; i++) {
            if (msgContainer[i].timestamp === targetT) {
                document.getElementById("logNo" + i).style.backgroundColor = "rgba(51, 255, 153,0.4)"
                document.getElementById('searchbox').style.display = "none"
                document.getElementById('searchbox').innerHTML = ''
            }
        }
    }




    //filter users W.r.t name and timestamp
    var filterLog = (event) => {
        var searchValue = event.target.value
        document.getElementById('searchbox').innerHTML = ''


        if (searchValue.search("@") !== -1) {
            var similarityChecker = 0;
            var uniqueLogs = [];
            document.getElementById('searchbox').style.display = "flex"
            for (var i = 0; i < msgContainer.length; i++) {
                if (i == 0) {
                    if (msgContainer[i].username.search(searchValue) !== -1) {
                        uniqueLogs.push(msgContainer[i])
                        var searchP = document.createElement("p", 'searchboxP')
                        searchP.setAttribute('id', i);
                        searchP.setAttribute('class', "searchResult");
                        searchP.onclick = (name) => { searchLogUname(name) }
                        var searchtxtnode = document.createTextNode(msgContainer[i].username)
                        searchP.appendChild(searchtxtnode)
                        document.getElementById('searchbox').append(searchP)
                    }
                }
                else {
                    for (var j = 0; j < uniqueLogs.length; j++) {
                        if (msgContainer[i].username === uniqueLogs[j].username) {
                            similarityChecker = 1;
                            break;
                        }
                    }

                    if (similarityChecker !== 1) {
                        if (msgContainer[i].username.search(searchValue) !== -1) {
                            uniqueLogs.push(msgContainer[i])
                            var searchP = document.createElement("p", 'searchboxP')
                            searchP.setAttribute('id', i);
                            searchP.setAttribute('class', "searchResult");
                            var searchtxtnode = document.createTextNode(msgContainer[i].username)
                            searchP.appendChild(searchtxtnode)
                            document.getElementById('searchbox').append(searchP)
                            searchP.onclick = (name) => { searchLogUname(name) }
                        }
                    }

                }
                similarityChecker = 0;
            }
        }
        else if (searchValue.search("#") !== -1) {
            var similarityChecker = 0;
            var uniqueLogs = [];
            document.getElementById('searchbox').style.display = "flex"
            for (var i = 0; i < msgContainer.length; i++) {
                if (i == 0) {
                    if (msgContainer[i].timestamp.search(searchValue) !== -1) {
                        uniqueLogs.push(msgContainer[i])
                        var searchP = document.createElement("p", 'searchboxP')
                        searchP.setAttribute('id', i);
                        searchP.setAttribute('class', "searchResult");
                        var searchtxtnode = document.createTextNode(msgContainer[i].timestamp)
                        searchP.appendChild(searchtxtnode)
                        document.getElementById('searchbox').append(searchP)
                        searchP.onclick = (name) => { searchLogT(name) };
                    }
                }
                else {
                    for (var j = 0; j < uniqueLogs.length; j++) {
                        if (msgContainer[i].timestamp === uniqueLogs[j].timestamp) {
                            similarityChecker = 1;
                            break;
                        }
                    }

                    if (similarityChecker !== 1) {
                        if (msgContainer[i].timestamp.search(searchValue) !== -1) {
                            uniqueLogs.push(msgContainer[i])
                            var searchP = document.createElement("p", 'searchboxP')
                            searchP.setAttribute('id', i);
                            searchP.setAttribute('class', "searchResult");
                            var searchtxtnode = document.createTextNode(msgContainer[i].timestamp)
                            searchP.appendChild(searchtxtnode)
                            document.getElementById('searchbox').append(searchP)
                            searchP.onclick = (name) => { searchLogT(name) }
                        }
                    }

                }
                similarityChecker = 0;
            }
        }
        else {
            document.getElementById('searchbox').style.display = "none"
            document.getElementById('searchbox').innerHTML = ''
        }
    }



    setTimeout(() => {
        if (userData.designation === 'VW') {
            document.getElementById('nagv').style.display = 'none'
            document.getElementById('inputbar').style.display = 'none'
            document.getElementById('searchbar').style.display = 'none'
            document.getElementById('content').style.width = '100vw'
        }
    }, 200)

    return (
        <div
            className="docpagediv"
            style={{
                backgroundColor: "rgb(8, 18, 33)",
                height: "100%",
                width: "100%",
            }}
        >
            <header
                id="header_box"
                className="bg-gray-600 text-black body-font"
                style={{ height: "7%" }}
            >
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">

                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center align-center">
                        <input id="searchbar" onChange={filterLog} type="text" placeholder="search by name" />
                        <h1>LuCon</h1>
                    </nav>
                </div>
            </header>
            <div id="searchbox">

            </div>
            <div className="indivdocx" style={{ height: "100%", width: "100%" }}>
                <div id="nagv" style={{ color: "white" }}>
                    <h1
                        style={{
                            marginBottom: "50px",
                            marginTop: "25px",
                            fontSize: "25px",
                        }}
                    >
                        CONTROL PANEL
                    </h1>
                    <div className="sidebar-button-container">
                        <div>
                            <input type="file" onChange={upload_img} accept="image/*" id="imageUpload" hidden />
                            <label className="c_panel_buts" htmlFor="imageUpload">
                                <div className="svg-style">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                                    </svg>
                                </div>
                            </label>
                            <input type="file" onChange={upload_img} accept="video/mp4,video/x-m4v,video/*" id="videoUpload" hidden />
                            <label className="c_panel_buts" htmlFor="videoUpload">
                                <div className="svg-style">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M16 16c0 1.104-.896 2-2 2h-12c-1.104 0-2-.896-2-2v-8c0-1.104.896-2 2-2h12c1.104 0 2 .896 2 2v8zm8-10l-6 4.223v3.554l6 4.223v-12z" />
                                    </svg>
                                </div>
                            </label>
                            <input type="file" onChange={upload_img} accept="audio/*" id="audioUpload" hidden />
                            <label className="c_panel_buts" htmlFor="audioUpload">
                                <div className="svg-style">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M6 23v-11c-4.036 0-6 2.715-6 5.5 0 2.807 1.995 5.5 6 5.5zm18-5.5c0-2.785-1.964-5.5-6-5.5v11c4.005 0 6-2.693 6-5.5zm-12-13.522c-3.879-.008-6.861 2.349-7.743 6.195-.751.145-1.479.385-2.161.716.629-5.501 4.319-9.889 9.904-9.889 5.589 0 9.29 4.389 9.916 9.896-.684-.334-1.415-.575-2.169-.721-.881-3.85-3.867-6.205-7.747-6.197z" />
                                    </svg>
                                </div>
                            </label>
                            <input onClick={SpeechToText} id="fileUploader" hidden />
                            <label className="c_panel_buts" htmlFor="fileUploader">
                                <div className="svg-style">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M6 22v-16h16v7.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-10.386h-20v20h10.189c3.163 0 9.811-7.223 9.811-9.614zm-10 1.614h-5v-1h5v1zm5-4h-10v1h10v-1zm0-3h-10v1h10v-1zm2-7h-19v19h-2v-21h21v2z" />
                                    </svg>
                                </div>
                            </label>
                            <button className="c_panel_submit_but" onClick={StopListening}>
                                <div className="svg-style-submit">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z" />
                                    </svg>
                                </div>
                            </button>
                            
                            <button className="c_panel_buts" onClick={() => { logout() }}>LOGOUT</button>
                            <button className="c_panel_buts"><a href="http://localhost:8080/logs" target="blank">SAVELOG</a></button>
                            <button className="c_panel_buts" onClick={() => { clearSearch() }}>SRCH_CLR</button>
                            <button className="c_panel_buts" onClick={() => { clearIP() }}>INP_CLR</button>
                        </div>
                    </div>

                    <div className="statsDisplay">
                        <p style={{ fontSize: "18px", fontFamily: "monospace" }}>STATS TRACKER</p>
                        <hr />
                        <div id="instatsDisplay">

                        </div>
                    </div>
                </div>





                <div id="content">
                    <h1 id="content_title">LOG CONSOLE</h1>
                    <div id="msgstore">


                    </div>
                    <div id="inputbar">
                        <input id="inpbox" type="text" placeholder="write something" onKeyDown={
                            // handleEnterPress
                            (event) => {
                                if (event.key === "Enter") {
                                    sendMessageFromInputBox();
                                }
                            }
                        } />
                        <button
                            onClick={() => {
                                sendMessageFromInputBox();
                            }}
                        >
                            POST
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Console;
