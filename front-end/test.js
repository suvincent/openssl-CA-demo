// const openssl = require('openssl-nodejs-promise')
// const fs = require('fs')

// const { Certificate, PrivateKey } = require('@fidm/x509')

// async function verify(){
//     let result = await openssl('openssl verify -verbose -CAfile ./root-CA/cert.pem ./qqtlstest/qqtlstest.tk.crt');
//     console.log(result.toString())
// }
// const issuer = Certificate.fromPEM(fs.readFileSync('./root-CA/cert-for-demo.crt'))
// const cert = Certificate.fromPEM(fs.readFileSync('./qqtlstest/qqtlstest.tk.crt'))
// // console.log(cert.subject)
// console.log(issuer.isCA)
// console.log(cert.extensions)
// console.log(cert.isIssuer(issuer)) // true
// console.log(issuer.verifySubjectKeyIdentifier()) // true
// console.log(cert.verifySubjectKeyIdentifier()) // true
// // console.log(issuer.checkSignature(cert)) // null

const dns2 = require('dns2');
const publicIp = require('public-ip');
const options = {
  // available options
  // dns: dns server ip address or hostname (string),
  dns:"1.1.1.1"
  // port: dns server port (number),
  // recursive: Recursion Desired flag (boolean, default true, since > v1.4.2)
};
const dns = new dns2(options);

(async () => {
  const result = await dns.resolveCNAME('wwwww.qqtlstest.tk');  
  console.log(await publicIp.v4());
  console.log(result);
})();