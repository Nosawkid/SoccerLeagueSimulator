import { Container, Navbar } from "react-bootstrap";
import PremPngLogo from "/assets/images/PremierLeagueLogoPNG.png";
import { Link } from "react-router-dom";

const NavBarComponent = () => {
  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container className="py-2">
          <Navbar.Brand>
            <Link
              className="text-dark"
              style={{ textDecoration: "none" }}
              to={"/"}
            >
              <img
                src={PremPngLogo}
                alt="Premier League Logo"
                width={30}
                height={30}
                className="d-inline-block align-top"
              />{" "}
              Premier League Simulator
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBarComponent;
