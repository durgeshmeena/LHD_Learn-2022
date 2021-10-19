const express = require('express');
const session = require('express-session')
const dotenv = require('dotenv')
dotenv.config()

const Keycloak = require('keycloak-connect')
var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({store: memoryStore});

app = express()
const PORT = 5001;

// session
app.use(session({
    secret:process.env.APP_SECRETE2,
    resave:false,
    saveUninitialized:true,
    store:memoryStore
}));

app.get('/', (req, res)=>{
    res.send('Hello World server 2')
});


app.use(keycloak.middleware());

app.get('/test', keycloak.protect(), (req, res)=>{
    res.send('protect route server 2')
});

app.use(keycloak.middleware({
    logout: '/auth/logout',
    admin: '/'
}));

app.listen(PORT, ()=>{
    console.log(`Example app listening on port ${PORT}!`)
})

