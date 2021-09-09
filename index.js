import {Low, JSONFile } from 'lowdb';
import express from 'express';


const adapter = new JSONFile("./db.json");
const db = new Low(adapter);
await db.read();
db.data = db.data || { messages: [] };

const app = express();

function getLogDate(req, res, next) {
    const isoDate = new Date().toISOString();
    const arrayDate = [isoDate];
    db.data.messages.push(`${arrayDate} ${req.url} accessed`);
    db.write();
   const delayMS = Math.round(Math.random() * 4000) + 1000;
    setTimeout(next, delayMS);
    console.log("Request completed");    
}

app.use(getLogDate);


app.get("/getsecret", (req, res, next) => {
    console.log("Get Root path is active");
    res.send("get root\n");
});


app.get("/mysecret", (req, res)=> {
    console.log("GET secret 🤫");
    res.send("get secret root\n");
});


app.post('/postsecret', (req, res) => {
    console.log("POST request is active")
    res.send("post root\n");
});

app.post('/yoursecret', (req, res) => {
    console.log("secret POST 🤫");
    res.send("post secret root\n");
});


app.listen(3002, () => {
    console.log("Server running on port 3002 🚨");
   });



