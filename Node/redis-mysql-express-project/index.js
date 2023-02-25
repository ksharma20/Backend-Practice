const express = require('express')
const app = express()
const port = 3000

const Routes=require('./routes/routes.js');

app.use(express.json());

app.use('/', Routes);  // use the routes.js file to handle the end points starting with '/'

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})