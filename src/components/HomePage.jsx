import { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  //funzione fetch (da nome citta recuper lat e long e inserisce in parametri dinamici di details con usenavigate)
  const handleSearch = (e) => {
    e.preventDefault();

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=ad1de00d3155168ebb8f06b114804bd1`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((cityObj) => {
        console.log(cityObj);
        const { lat, lon } = cityObj[0];

        navigate(`/details/${lat}/${lon}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
          <Form onSubmit={handleSearch}>
            <Form.Group controlId="cityInput">
              <Form.Control type="text" placeholder="Insert city name and search" value={city} onChange={(e) => setCity(e.target.value)} />
            </Form.Group>
            <Button variant="primary" className="mt-3" type="submit">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default HomePage;
