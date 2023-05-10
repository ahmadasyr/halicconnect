import React from 'react'
import logoBlack from '../media/logoBlack.svg'
import { Col, Row, Container } from 'reactstrap'

export default function Footer() {
  return (
    <footer className="py-2 text-black">
        <Container>
          <Row>
            <Col lg='2' sm='9'>
              <img style={{width: '90%'}} src={logoBlack}/>
            </Col>
            <Col lg='8'/>
            {/* <Col lg='2' sm='12'>
                <p>By Ahmad Abboud</p>
            </Col> */}
          </Row>
        </Container>
      </footer>
  )
}
