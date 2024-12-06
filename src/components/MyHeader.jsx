import { Container, Navbar } from "react-bootstrap";

const MyHeader = () => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="https://www.noaa.gov/sites/default/files/styles/square_width_650/public/2021-02/FocusArea__Weather-02.jpg?h=5dc006f5&itok=20VGa8_F"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Wheater App
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
export default MyHeader;
