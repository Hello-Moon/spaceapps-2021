import React from "react";
import "./css/console.css"
import "./css/tailwind.css"

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
                    <a href="#">
                        <img
                            id="luncon logo"
                            src="#"
                            alt="logo"
                            style={{ cursor: "pointer" }}
                        />
                    </a>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center align-center">
                        <h1>LuCon</h1>
                    </nav>
                </div>
            </header>

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
                            <input type="file" onClick={() => { filePusher() }} id="fileUploader" hidden />
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
                            <button className="c_panel_submit_but">
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
                            <button className="c_panel_buts">EDIT</button>
                            <button className="c_panel_buts">FIND</button>
                            <button className="c_panel_buts">CLEAR</button>
                            <button className="c_panel_buts">APPROVE</button>
                        </div>
                    </div>
                </div>
                <div id="content">
                    <h1 id="content_title">LOG CONSOLE</h1>
                    <div id="msgstore">
                    </div>
                    <div id="inputbar">
                        <input id="inpbox" type="text" placeholder="write something"/>
                        <button>
                            POST
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

export default Console;
