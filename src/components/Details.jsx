import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const Details = () => {
  const { lat, lon } = useParams();
  const [weatherObj, setWeatherObj] = useState(null);
  const [forecast, setForecast] = useState(null);

  //fetch5days
  const handleFetch5days = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ad1de00d3155168ebb8f06b114804bd1&units=metric`)
      .then((response) => response.json())
      .then((forecastObj) => {
        console.log(forecastObj);

        setForecast(forecastObj);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchFromParams = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ad1de00d3155168ebb8f06b114804bd1&units=metric`)
      .then((response) => response.json())
      .then((weather) => {
        console.log(weather);

        setWeatherObj(weather);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchFromParams();
    handleFetch5days();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  return (
    <>
      {weatherObj ? (
        <Container className="my-5 text-center">
          <Row className="justify-content-center">
            <Col xs={12} sm={8} md={6}>
              <Card className="text-center border-3 border-info shadow rounded-5">
                <Card.Body>
                  <h1 className="text-center mb-4 text-bg-light rounded-pill shadow-sm">{weatherObj.name}</h1>
                  <div className="d-flex justify-content-around align-items-center">
                    <div>
                      <img className="" src={`https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`} alt="" width={160} />
                      <h3>{weatherObj.weather[0].main}</h3>
                      <h4>Temperature: {weatherObj.main.temp}°C</h4>
                      <p>
                        Min: <strong>{weatherObj.main.temp_min}</strong> C° - Max: <strong>{weatherObj.main.temp_max}</strong>C°
                      </p>
                    </div>
                    <div className="fs-4 lh-1 text-start">
                      <p className="mb-3">Feels like: {weatherObj.main.feels_like}°C</p>
                      <p className="mb-3">Humidity: {weatherObj.main.humidity}%</p>
                      <p className="mb-3">Wind Speed: {weatherObj.wind.speed} m/s</p>
                      <p className="mb-3">Visibility: {weatherObj.visibility / 1000} km</p>
                      <p className="mb-3">Sunrise: {new Date(weatherObj.sys.sunrise * 1000).toLocaleTimeString()}</p>
                      <p className="mb-3">Sunset: {new Date(weatherObj.sys.sunset * 1000).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <Spinner animation="grow" />
      )}
      <Container className="mb-5">
        <h2 className="text-center">5 days forecast</h2>
        {forecast && forecast.list ? (
          <Row xs={2} sm={3} md={4} lg={5} className="justify-content-center">
            {forecast.list
              .filter((item, index, array) => index === 0 || new Date(item.dt * 1000).toDateString() !== new Date(array[index - 1].dt * 1000).toDateString()) //solo per impostare il filter ho onsetamente googlato e trovato consigli in rete, la comparazione tra date mi è chiara.
              .slice(1, 6) //l'unico modo logico che mi è venuto in mente per escludere il primo risultato(gia mostrato sopra) era di fare questo nello slice.
              .map((dayforecast, index) => (
                <Col key={index}>
                  <Card className="rounded-5 border-3 border-info shadow">
                    <Card.Img variant="top" src={`https://openweathermap.org/img/wn/${dayforecast.weather[0].icon}@2x.png`} />
                    <Card.Body>
                      <Card.Title>{new Date(dayforecast.dt * 1000).toLocaleDateString("it-IT")}</Card.Title>
                      <Card.Text>
                        Temp: {dayforecast.main.temp}°C
                        <br />
                        <p className="mb-0">
                          Min: <strong>{dayforecast.main.temp_min}</strong> C° - Max: <strong>{dayforecast.main.temp_max}</strong>C°
                        </p>
                        <br />
                        {dayforecast.weather[0].description.toUpperCase()}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        ) : (
          <Spinner animation="grow" />
        )}
      </Container>
      <div className="text-center mb-5">
        <Link to="/" className="btn btn-light">
          {" "}
          Go back to home
        </Link>
      </div>
    </>
  );
};
export default Details;
