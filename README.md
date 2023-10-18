<h1 align="center">Back-end SPA application: Comments</h1>

<h2>Server capabilities</h2>
<ul>
  <li>REST API server architecture is built</li>
  <li>There is a function to create a JWT and a function that checks the validity of the Token</li>
  <li>Can accept and process an image or text file using a multer</li>
  <li>Has flexible bbcode parser</li>
  <li>Function that checks closing tags</li>
  <li>Has WebSocket providing real-time two-way communication</li>
  <li>Uses ORM Sequelize to work with postgreSQL</li>
  <li>Parts are isolated in Docker containers</li>
</ul>

<h3>Clone repositorie</h3>
<div class="highlight highlight-source-shell notranslate position-relative overflow-auto" dir="auto">
  <pre>https://github.com/EraChanZ01/Task-dZENcode.git</pre>
</div>
<p>OR</p>
<div class="highlight highlight-source-shell notranslate position-relative overflow-auto" dir="auto">
  <pre>git@github.com:EraChanZ01/Task-dZENcode.git</pre>
</div>

<h3>Build Docker containers</h3>
<div class="highlight highlight-source-shell notranslate position-relative overflow-auto" dir="auto">
  <pre>docker compose --file docker-compose-dev.yaml up --build</pre>
</div>

<h4>There is no front end on the project, I used the socketClientTest.js file to test socket operation</h4>
<div class="highlight highlight-source-shell notranslate position-relative overflow-auto" dir="auto">
  <pre>
    const io = require('socket.io-client');
    const CONSTANTS = require('./constants');

       const socket = io.connect('http://localhost:3000/comment');

       socket.on('connect', () => {
         console.log('Connected to the server');
       });

       socket.on(CONSTANTS.NEW_COMMENT, (data) => {
          console.log(data)
       })
  </pre>
</div>

# Task-dZENcode
