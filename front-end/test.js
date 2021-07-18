const openssl = require('openssl-nodejs-promise')
const fs = require('fs')

const { Certificate, PrivateKey } = require('@fidm/x509')

async function verify(){
    let result = await openssl('openssl verify -verbose -CAfile ./root-CA/cert.pem ./qqtlstest/qqtlstest.tk.crt');
    console.log(result.toString())
}
const issuer = Certificate.fromPEM(fs.readFileSync('./root-CA/cert-for-demo.crt'))
const cert = Certificate.fromPEM(fs.readFileSync('./qqtlstest/qqtlstest.tk.crt'))
// console.log(cert.subject)
console.log(issuer.isCA)
console.log(cert.extensions)
console.log(cert.isIssuer(issuer)) // true
console.log(issuer.verifySubjectKeyIdentifier()) // true
console.log(cert.verifySubjectKeyIdentifier()) // true
// console.log(issuer.checkSignature(cert)) // null