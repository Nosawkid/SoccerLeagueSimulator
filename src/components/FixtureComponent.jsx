import { useContext } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import FixtureContext from "../contexts/FixtureContext";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const FixtureComponent = () => {
  const { fixtures } = useContext(FixtureContext);

  return (
    <div>
      <Container>
        <Row className="mt-2">
          <Col md={1}>
            <Link to={"/standings"}>
              <FaArrowLeft style={{ fontSize: "20px" }} />
            </Link>
          </Col>
          <Col>
            <h1 className="text-center">Season Fixture</h1>
          </Col>
        </Row>
        <Row>
          {fixtures.length === 0 ? (
            <h1 className="mt-5 text-center text-danger">
              Please Generate a fixture and visit again
            </h1>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <td>Match No</td>
                  <td>Team One</td>
                  <td></td>
                  <td>Teeam Two</td>
                </tr>
              </thead>
              <tbody>
                {fixtures.map((el, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{el.teamOne.teamName}</td>
                    <td>V/S</td>
                    <td>{el.teamTwo.teamName}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default FixtureComponent;
