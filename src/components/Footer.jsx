import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-tertiary text-dark py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              Premier League Simulator &copy; {new Date().getFullYear()}
            </p>
            <small>Created for educational purposes</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
