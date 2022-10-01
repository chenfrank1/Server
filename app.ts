import express from 'express';
const ngrok = require ('ngrok');
import net from "net"

const port = 3001
const app = express();
app.use(require('./routes'));

app.listen(port, () => {  
  console.log(`Server listening at http://localhos: ${port} `);
  getExterna();
});

async function getExterna(){ 
  const url = await ngrok.connect(port);

console.log(``)
console.log(`Please use this URL fot the git webhook:`)
 console.log(`************************************************`)
 console.log(`${url}`)
 console.log(`************************************************`)
}
