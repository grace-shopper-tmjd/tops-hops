import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap'

const BeerList = ({beers}) => {
  return (
    <Container>
      <Row>
        {beers.map(({imageUrl, name, brand, price}, i) => {
          return (
            <Col sm={3} key={i}>
              <Card>
                <CardImg top width="100%" src={imageUrl} alt={name} />
                <CardBody>
                  <CardTitle>{name}</CardTitle>
                  <CardSubtitle>{brand}</CardSubtitle>
                  <CardText>Price: {price}</CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default BeerList