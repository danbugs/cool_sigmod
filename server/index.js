let express = require('express');
let cors = require('cors');
let fft = require('fourier-transform');

let app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send({"message": "ok"});
})

app.post("/fft", (req, res) => {
    console.log(Object.values(req.body.x));
    res.status(200).send(fft(Object.values(req.body.x)));
})

app.listen(3000);