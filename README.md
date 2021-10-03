# spaceapps-2021
Code repository for the NASA Space Apps challenge 2021
# spaceapps-2021
Code repository for the NASA Space Apps challenge 2021


  PASSCODE FOR AUTHENTICATION CODE IN LOGIN: beepb33p

                  PROJECT  ＬｕＣｏｎ
                  A solution for the challenge “ Lunar Surface Operation : Real- time collaboration by team “Hello, Moon!”
                    NASA Space App Challenge 2021 

A real-time console log for communication and event logging between between mission control and astronauts for upcoming lunar missions like ARTEMIS program. Through this medium they will be able to log data regarding mission, situational awareness, voice comm, send multimedia, get approvals from flight director real-time and even filter and future prospects to edit client side messages with date and user by using control panel feature. We have met most of the potential consideration needed for this challenge. 50 years ago we didn't had this technology but the world in Artemis program by 2024 will have it. It is very important for the citizen science.  

This console, logs EVA's communication using voice to text recognition which wasn't present 50 years ago while the flight director and other positions will be able to log events after each transmissions. CAPCOM's voice will also be converted into voice to text and be archived within the log, spacecraft telemetry, EVA Suit telemetry, can also be implemented within the project using APIs. We have also added public affair user authentication who will be able to view log and publish for scientific communities. - The design is very simple and sophisticated for mission purpose in real-time.

Lets start with the Front-end, we have used react(a JavaScript library) for a dynamic UX. For UI, we opted for a simplistic, terminal/console themed design. At first, we enter into the login page for authentication purpose, and then if authentication succeeds, react renders the Console component. In the Console component, user can enter new text/media logs. This new log is sent to the server, then it gets broadcasted to all the users in the network. Language used in front end are JavaScript, CSS, and HTML
Then comes the Back-end, 
            The backend uses NodeJS for programming. It authenticate users, receive, store and broadcast new logs. We have used libraries like express, CORS, ws(for WebSocket), HTTP etc. It has a HTTP server for authentication and all other communication is done using WebSocket. We have used the sqlite database, because of its simplicity.

                        FUTURE FEATURES TO IMPLEMENT: 
                        1. Log editing
                        2. Simultaneous creation of logs between drop down list of users ( custom logs ) 
                        3. Implementation of instrumentation data using API into the console ( eg. live lander location/ suit telemetry/ hud.)

 ##  Authors of this project 
   
<b>Anargha Bose</b> :   Project HR, Project Presentation/Documentation, Team Management and Content Design<br>
<b>Manish Das</b> :      Project Presentation/Documentation, Team Coordination, Code Tester<br>
<b>Rupak Biswas</b> :  Frontend, UI/UX Design, Client Connection<br>
<b>Adarsh Pandey</b> : Frontend, UI/UX Design<br>
<b>Saptarshi Dey</b> :  Initial Authentication, Database, Media Storage & Stream<br>
<b>Abir Ganguly</b> :    Backend, Queries, Web Socket & HTTP Connection

