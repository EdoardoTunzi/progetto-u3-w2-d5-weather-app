import { Button, Col, Container, Row, Form } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container className="text-center mt-5">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/008/854/797/small/sunny-and-rainy-cloudy-day-weather-forecast-icon-meteorological-sign-3d-render-png.png"
        alt=""
        width={400}
      />
      <h1>Welcome on Weather App</h1>
      <p>Insert a city name below to see the forecast</p>
      <Row className="justify-content-center mt-4">
        <Col xs={12} sm={8} md={6}>
          <Form>
            <Form.Group controlId="cityInput">
              <Form.Control type="text" placeholder="Insert city name and search" />
            </Form.Group>
            <Button variant="primary" className="mt-3">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default HomePage;
