const openssl = require('openssl-nodejs-promise')
const fs = require('fs')

async function genkey(outputfilename){
    /// test gen key
    try{
        let qq = await openssl('openssl genrsa -out -'+outputfilename+'.key 2048',{dir:"Gen"});
        // console.log(qq)
        return true
    }
    // result filename  = openssl-test.key
    catch(e){
        // console.log(e)
        return true
    }

}

async function genCsr(CN,DNS,keypath){
    let conf = `[req]
    distinguished_name = req_distinguished_name
    x509_extensions = v3_req
    prompt = no
    [req_distinguished_name]
    CN  = ${CN}
    [v3_req]
    subjectAltName = @alt_names
    [alt_names]
    DNS.1 = ${DNS}`;
    let BufferVariable = Buffer.from(conf)
    // console.log(BufferVariable)
    let keybuff = fs.readFileSync("./Gen/openssl-"+keypath+'.key')
    try{
    await openssl(['req','-extensions', 'v3_req', '-config', { name:'temp.conf', buffer: BufferVariable }, '-out', `-${CN}.csr`, '-new', '-key', {name:'tempkey', buffer:keybuff}],{dir:"CSR"})
    .then((buffer) => console.log(buffer.toString()))
    .catch(e => console.error(e.stack))
    }
    finally{
        return true
    }
    // test gen csr
}

async function genCert(CN,DNS,days){
    let conf = `[req]
    distinguished_name = req_distinguished_name
    x509_extensions = v3_req
    prompt = no
    [req_distinguished_name]
    CN  = ${CN}
    [v3_req]
    subjectAltName = @alt_names
    [alt_names]
    DNS.1 = ${DNS}`;

    let buff1 = Buffer.from(conf)
    let buff2 = fs.readFileSync('./public/root-CA/cert-for-demo.crt');
    let buff3 = fs.readFileSync('./public/root-CA/key.pem');
    let buff4 = fs.readFileSync('./CSR/openssl-'+CN+".csr");
    try{
        await openssl(['x509','-req', '-in' ,{name:'temp.csr',buffer:buff4},
                        '-CA' ,{name:'cert-for-demo.crt',buffer:buff2},
                        '-CAkey',{name: 'key.pem',buffer:buff3} ,'-CAcreateserial' ,'-out', `-${DNS}.crt`, '-days', days ,'-sha256' ,
                        '-extfile',{name:'temp.conf',buffer:buff1} ,'-extensions', 'v3_req',
                        '-passin','pass:123456'],{dir:"Cert"})
        // .then((buffer) => console.log(buffer.toString()))
        // .catch(e => console.error(e.stack))
    }
    finally{
        return true;
    }
}


async function verify(CA_path, cert_path){
    console.log(CA_path, cert_path)
    let result = await openssl('openssl verify -verbose -CAfile '+CA_path+' '+cert_path);
    return result.toString()
}

async function viewCrt(path){
    if(!path)return null
    let return_result;
    let buff = fs.readFileSync(path);
    await openssl(['x509', '-in' ,{name:"temp.crt",buffer:buff},
                     '-noout','-text'])
    .then((buffer) => return_result = buffer.toString())
    .catch(e => console.error(e.stack))

    return return_result;
}

async function viewCsr(path){
    if(!path)return null
    let return_result;
    let buff = fs.readFileSync(path);
    await openssl(['req', '-in' ,{name:path,buffer:buff},
                     '-noout','-text'])
    .then((buffer) => return_result = buffer.toString())
    .catch(e => console.error(e.stack))

    return return_result;
}

function viewrawfile(path){
    if(!path)return null
    try{
        let buff = fs.readFileSync(path);
        // console.log(buff.toString())
        return buff.toString()
    }
    catch(e){
        return null
    }
    
}

module.exports.viewCsr = viewCsr
module.exports.viewCrt = viewCrt
module.exports.verify = verify
module.exports.viewrawfile = viewrawfile
module.exports.genCert = genCert
module.exports.genCsr = genCsr
module.exports.genkey = genkey