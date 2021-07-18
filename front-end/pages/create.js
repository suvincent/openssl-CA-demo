import Link from 'next/link'
import Image from 'next/image'
import {Form,Container,Row,Col, Navbar,Nav,Button, FormControl} from 'react-bootstrap'
// import styled from 'styled-components'
import ReactLogo from './logo.svg';
import { useState} from 'react';

  
  

function About(props) {
    const [PrivateKey,setSK] = useState("");
    const [keyname,setkeyname] = useState("");
    const [CSR,setCSR] = useState("");
    const [CN,setCN] = useState("");
    const [DNS,setDNS] = useState("");
    const [Cert,setCert] = useState("");
    const [Days,setDays] = useState(365);


    async function gensK(){
        if(!keyname){
            alert("please enter key name")
            return
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ keyname: keyname })
        };
        console.log(requestOptions)
        fetch('http://localhost:4000/genKey', requestOptions)
            .then(async response => {
                let result = await response.text()
                console.log(result)
                setSK(result)
        })
    }

    async function genCSR(){
        if(!keyname || !DNS || !CN){
            alert("please enter key name and DNS and CN")
            return
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cn: CN , dns:DNS, keypath:keyname })
        };
        console.log(requestOptions)
        fetch('http://localhost:4000/genCSR', requestOptions)
            .then(async response => {
                let result = await response.text()
                console.log(result)
                setCSR(result)
        })
    }

    async function genCert(){
        if(!Days  || !DNS || !CN){
            alert("please enter days and DNS and CN")
            return
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cn: CN , dns:DNS, days:Days.toString() })
        };
        console.log(requestOptions)
        fetch('http://localhost:4000/genCert', requestOptions)
            .then(async response => {
                let result = await response.text()
                console.log(result)
                setCert(result)
        })
    }

    return  <>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous"/>
      
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <Image
            src={ReactLogo}
            width="30"
            height="30"
          />
        </Navbar.Brand>
        <Nav>
            <Nav.Item>
              <Link href="/" passHref><a style={{color:'#FFF'}}>Home</a></Link>
            </Nav.Item>
            &nbsp;&nbsp;
            <Nav.Item>
              <Link href="/create" passHref><a  style={{color:'#FFF'}}>Create certificate</a></Link>
            </Nav.Item>
            &nbsp;&nbsp;
            <Nav.Item>
              <Link href="/verify" passHref><a  style={{color:'#FFF'}}>Verify Certificate</a></Link>
            </Nav.Item>
        </Nav>
      </Navbar>
      <br/>
      <Container>
          <Col></Col>
          <Col>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Generate Key in 2048 bits</Form.Label>
                <br/>
                <Row>
                <Col xs={3}>
                <FormControl as="input" value={keyname}  onChange={(e)=>{setkeyname(e.target.value)}}/>
                </Col>
                <Button variant="secondary" onClick={gensK}>Gen</Button>
                &nbsp;
                <Button variant="secondary" onClick={async ()=>{await navigator.clipboard.writeText(PrivateKey)}}>Copy</Button>{' '}
                </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                {/* <Form.Label>Root CA certificate</Form.Label> */}
                <Form.Control as="textarea" rows={18} value={PrivateKey} readOnly />
            </Form.Group>
            </Form>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Generate CSR by Generated Key</Form.Label>
                <br/>
                <Row>
                <Col xs={3}>
                <Form.Label>CN</Form.Label>
                <FormControl as="input" value={CN}  onChange={(e)=>{setCN(e.target.value)}}/>
                </Col>
                </Row>
                <Row>
                <Col xs={3}>
                <Form.Label>DNS</Form.Label>
                <FormControl as="input" value={DNS}  onChange={(e)=>{setDNS(e.target.value)}}/>
                </Col>
                </Row>
                <Row>
                    
                <Col>
                <br />
                <Button variant="secondary" onClick={genCSR}>Gen</Button>
                &nbsp;
                <Button variant="secondary" onClick={async ()=>{await navigator.clipboard.writeText(CSR)}}>Copy</Button>{' '}
                </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                {/* <Form.Label>Root CA certificate</Form.Label> */}
                <Form.Control as="textarea" rows={18} value={CSR} readOnly />
            </Form.Group>
            </Form>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Generate Certificate</Form.Label>
                <br/>
                <Row>
                <Col xs={3}>
                <FormControl as="input" type="number" value={Days}  onChange={(e)=>{setDays(e.target.value)}}/>
                </Col>
                <Button variant="secondary" onClick={genCert}>Sign</Button>
                &nbsp;
                <Button variant="secondary" onClick={async ()=>{await navigator.clipboard.writeText(Cert)}}>Copy</Button>{' '}
                </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                {/* <Form.Label>Root CA certificate</Form.Label> */}
                <Form.Control as="textarea" rows={18} value={Cert} readOnly />
            </Form.Group>
            </Form>
          </Col>
          <Col></Col>
      </Container>
      
            </>

  }
  
  export async function getStaticProps(context){
    
    return {props:{}}
  }

  export default About