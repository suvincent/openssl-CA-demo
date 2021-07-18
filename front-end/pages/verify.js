import Link from 'next/link'
import Image from 'next/image'
import {Form,Container,Row,Col, Navbar,Nav,FormControl,Button} from 'react-bootstrap'
// import styled from 'styled-components'
import ReactLogo from './logo.svg';
import { useState } from 'react';

function Bbout(props) {
    const [keyname,setkeyname] = useState("");
    const [Content,setContent] = useState("");
    const [DNS,setDNS] = useState("");

    async function ViewCert(){
        var result = await fetch(`http://localhost:4000/viewCrt?path=Cert/openssl-${DNS}.crt`);
        var content = await result.text()
        setContent(content)
    }

    async function ViewKey(){
        var result = await fetch(`http://localhost:4000/viewrawfile?path=Gen/openssl-${keyname}.key`);
        var content = await result.text()
        setContent(content)
    }

    async function verifyTrustChain(){

        var result = await fetch(`http://localhost:4000/verify?ca_root_path=public/root-CA/cert-for-demo.crt&crt_path=Cert/openssl-${DNS}.crt`);
        var content = await result.text()
        setContent(content)
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
                <Row>
                <Form.Label>&nbsp;&nbsp;&nbsp;&nbsp;Key Name</Form.Label>
                </Row>
                <Row>
                <Col xs={3}>
                <FormControl as="input" value={keyname}  onChange={(e)=>{setkeyname(e.target.value)}}/>
                </Col>
                <Col>
                <Button variant="secondary" onClick={ViewKey}>View Key</Button>{' '}
                </Col>
                </Row>
                <Row>
                <Form.Label>&nbsp;&nbsp;&nbsp;&nbsp;DNS</Form.Label>
                </Row>
                <Row>
                <Col xs={3}>
                <FormControl as="input" value={DNS}  onChange={(e)=>{setDNS(e.target.value)}}/>
                </Col>
                <Col xs={2}>
                <Button variant="secondary" onClick={ViewCert}>View Certificate</Button>{' '}
                </Col>
                <Col xs={3}>
                <Button variant="secondary" onClick={verifyTrustChain}>Verify Certificate chain</Button>{' '}
                </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                {/* <Form.Label>Root CA certificate</Form.Label> */}
                <Form.Control as="textarea" rows={17} value={Content} readOnly />
            </Form.Group>
            </Form>
          </Col>
          <Col></Col>
      </Container>
      
            </>

  }
  
  export async function getStaticProps(context){
    
    var result = await fetch('http://localhost:4000/viewCrt?path=cert-for-demo.crt');
    var rootCrt = await result.text()
    return {props : { rootCAcrt : rootCrt }}
  }

  export default Bbout