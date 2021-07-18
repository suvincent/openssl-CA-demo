const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express')

const func = require('./functions');
const app = express()
const port = 4000

const corsOptions = {
    origin: [
      'http://localhost:3000'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/viewCrt', async(req, res) => {
  //http://localhost:4000/viewCrt?path=opensslqqtlstest.tk.crt
  console.log(req.query.path)
  let result = await func.viewCrt(req.query.path);
  if(result)
  {
      res.send(result)
  }
  else{
      res.send('fail!')
  }
})

app.get('/viewCsr', async(req, res) => {
    //http://localhost:4000/viewCsr?path=openssl-CSR.csr
    console.log(req.query.path)
    let result = await func.viewCsr(req.query.path);
    if(result)
    {
        res.send(result)
    }
    else{
        res.send('fail!')
    }
})

app.get('/viewrawfile', (req, res) => {
    //http://localhost:4000/viewrawfile?path=public/root-CA/key.pem
    console.log(req.query.path)
    let result = func.viewrawfile(req.query.path);
    if(result)
    {
        // res.send("<html><body><textarea>"+result+"</textarea></body></html>")
        res.send(result)
    }
    else{
        res.send('fail!')
    }
})

app.get('/verify', async(req, res) => {
    // http://localhost:4000/verify?ca_root_path=public/root-CA/cert-for-demo.crt&crt_path=opensslqqtlstest.tk.crt
    console.log(req.query.ca_root_path,req.query.crt_path)
    let result = await func.verify(req.query.ca_root_path,req.query.crt_path);
    if(result)
    {
        res.send(result)
    }
    else{
        res.send('fail!')
    }
})

app.post('/genKey',async(req,res)=>{
    console.log(req.body.keyname)
    let create = await func.genkey(req.body.keyname)
    if(create){
        let result = func.viewrawfile("Gen/openssl-"+req.body.keyname+".key")
        res.send(result);
    }
    else{
        res.send("fail!")
    }
});

app.post('/genCSR',async(req,res)=>{
    console.log(req.body)
    let create = await func.genCsr(req.body.cn,req.body.dns,req.body.keypath)
    if(create){
        let result = func.viewrawfile("CSR/openssl-"+req.body.cn+".csr")
        res.send(result);
    }
    else{
        res.send("fail!")
    }
});

app.post('/genCert',async(req,res)=>{
    console.log(req.body)
    let create = await func.genCert(req.body.cn,req.body.dns,req.body.days)
    if(create){
        let result = func.viewrawfile("Cert/openssl-"+req.body.dns+".crt")
        res.send(result);
    }
    else{
        res.send("fail!")
    }
});

app.get('/',(req,res) =>{
    res.send('QAQ');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})