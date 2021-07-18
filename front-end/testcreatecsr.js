const openssl = require('openssl-nodejs-promise')
const fs = require('fs')

async function genkey(){
    /// test gen key
    let result = await openssl('openssl genrsa -out -test.key 2048');
    // result filename  = openssl-test.key
    console.log(result.toString())

}

async function genCsr(){
    
    let BufferVariable = fs.readFileSync('./qqtlstest.conf')
    let keybuff = fs.readFileSync('./opensslprivateKey.key')
    await openssl(['req','-extensions', 'v3_req', '-config', { name:'qqtlstest.conf', buffer: BufferVariable }, '-out', '-CSR.csr', '-new', '-key', {name:'opensslprivatekey', buffer:keybuff}])
    .then((buffer) => console.log(buffer.toString()))
    .catch(e => console.error(e.stack))
    // test gen csr
}

async function genCert(){
    let buff1 = fs.readFileSync('./openssl-CSR.csr');
    let buff2 = fs.readFileSync('./root-CA/cert-for-demo.crt');
    let buff3 = fs.readFileSync('./root-CA/key.pem');
    let buff4 = fs.readFileSync('./qqtlstest.conf');
    await openssl(['x509','-req', '-in' ,{name:'qqtlstest.tk.csr',buffer:buff1},
                     '-CA' ,{name:'cert-for-demo.crt',buffer:buff2},
                     '-CAkey',{name: 'key.pem',buffer:buff3} ,'-CAcreateserial' ,'-out', 'qqtlstest.tk.crt', '-days', '500' ,'-sha256' ,
                     '-extfile',{name:'qqtlstest.conf',buffer:buff4} ,'-extensions', 'v3_req',
                     '-passin','pass:123456'])
    .then((buffer) => console.log(buffer.toString()))
    .catch(e => console.error(e.stack))
}

async function verify(){
    let result = await openssl('openssl verify -verbose -CAfile ./root-CA/cert.pem ./qqtlstest/qqtlstest.tk.crt');
    console.log(result.toString())
}

async function viewCrt(){
    let buff = fs.readFileSync('./opensslqqtlstest.tk.crt');
    await openssl(['x509', '-in' ,{name:'opensslqqtlstest.tk.crt',buffer:buff},
                     '-noout','-text'])
    .then((buffer) => console.log(buffer.toString()))
    .catch(e => console.error(e.stack))
}

async function viewCsr(){
    let buff = fs.readFileSync('./openssl-CSR.csr');
    await openssl(['req', '-in' ,{name:'openssl-CSR.csr',buffer:buff},
                     '-noout','-text'])
    .then((buffer) => console.log(buffer.toString()))
    .catch(e => console.error(e.stack))
}
genCsr().then(
viewCsr())