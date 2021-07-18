// import fs from 'fs';
import Link from 'next/link'
import Image from 'next/image'
import {Form,Container,Row,Col, Navbar,Nav} from 'react-bootstrap'
// import styled from 'styled-components'
import ReactLogo from './logo.svg';
// const WhiteLink = styled.a`  color: #FFF;`

function HomePage(props) {
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
                <Form.Label>Root CA key modulus in sha256</Form.Label>
                <Form.Control as="textarea" rows={1} value={"360f65e267ee40dbf41ebe0eeb294eab27502c4436f1303877af42bfcdf2516c"} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Root CA certificate</Form.Label>
                <Form.Control as="textarea" rows={18} value={props.rootCAcrt} readOnly />
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
  
  export default HomePage