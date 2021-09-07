import express from 'express';

const app = express();

app.use(express.json());

app.use(getLogDate);
//custom middlewere here
function getLogDate(req, res, next) {
    const isoDate = [new Date().toISOString()];
    const arrayDate = [isoDate];
    
    console.log( arrayDate + req.method  + " " + req.path + " /secret accessed" );
    next();
    console.log("Request completed");
}



app.get("/getsecret", (req, res, next) => {
    console.log("Get Root path is active");
    res.send("root\n");
});


app.get("/mysecret", (req, res)=> {
    console.log("GET secret");
    res.send("secret root\n");
});


app.post('/postsecret', (req, res) => {
    console.log("POST request is active")
    res.send("root\n");
});

app.post('/yoursecret', (req, res) => {
    console.log("secret POST");
    res.send("secret root\n");
});


app.listen(3002, () => {
    console.log("Server running on port 3002");
   });