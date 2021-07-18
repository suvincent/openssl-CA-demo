

### csr => crt
```
openssl x509 -req -in qqtlstest.tk.csr -CA cert-for-demo.crt -CAkey key.pem -CAcreateserial -out qqtlstest.tk.crt -days 500 -sha256 -extfile qqtlstest.conf -extensions v3_req
```