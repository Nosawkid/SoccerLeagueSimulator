import { Container, Row, Col, Button } from "react-bootstrap";
import "../assets/css/HeroSection.css"; // Optional for additional styling
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-section d-flex flex-column justify-content-center align-items-center">
      <Container className="text-center">
        <Row>
          <Col>
            <h1 className="hero-title">
              Welcome to the Football League Simulator
            </h1>
            <p className="hero-description">
              A fun and basic implementation created to combat the creator&apos;
              s boredom. This project has nothing to do with real-world
              scenarios.
            </p>
            <Button variant="primary" size="lg">
              <Link
                className="text-decoration-none text-white"
                to={"/standings"}
              >
                Get Started
              </Link>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;
