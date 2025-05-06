const express = require('express')
const app = express();
const cors = require('cors')
const auths = require('./models/auth')

app.use(express.json());
app.use(cors());

const port = 3000

require('./config/connection');

app.post('/post', async(req, res) => {
    let auth = new auths(req.body);
    let result = await auth.save();
    res.send(result)
})

app.get('/', (req, res) => {
    res.send('hello api')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})