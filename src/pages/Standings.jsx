import { useContext, useEffect, useState } from "react";
import { premierLeagueTeams } from "../assets/data/Teams";
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import "../assets/css/Standings.css";
import { Link } from "react-router-dom";
import FixtureContext from "../contexts/FixtureContext";

const Standings = () => {
  const [teams, setTeams] = useState([]);
  const { fixtures, setFixtures } = useContext(FixtureContext);
  const [leagueSimulated, setLeagueSimulated] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [winner, setWinner] = useState("");
  const [results, setResults] = useState([]);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Simulated Result
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Title Winner:</h4>
          <p className="fw-bold fs-3"> {winner} 🎉</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[rand];
      arr[rand] = temp;
    }
    return arr;
  };

  const scrollToResults = () => {
    const resultsSection = document.getElementById("results");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const rotateArray = (arr) => {
    const lastElement = arr.pop();
    arr.unshift(lastElement);
    return arr;
  };

  function clearArray() {
    teams.forEach((el) => {
      el.matchesPlayed = 0;
      el.points = 0;
      el.draws = 0;
      el.wins = 0;
      el.loses = 0;
      el.goalsScored = 0;
      el.goalsConceded = 0;
      el.goalDifference = 0;
      setLeagueSimulated(false);
      setResults([]);
      setIsFixtureGenerated(false);
    });
    teams.sort((a, b) => {
      if (a.teamName < b.teamName) {
        return -1;
      }
      if (a.teamName > b.teamName) {
        return 1;
      }
      return 0;
    });
    setTeams([...teams]);
    setFixtures([]);
  }

  const generateFixture = () => {
    const array = shuffleArray([...teams]);
    const fixtures = [];
    const totalRounds = array.length - 1;
    const teamOne = array[0];
    let remainingTeams = array.slice(1);

    for (let matches = 0; matches <= 1; matches++) {
      for (let i = 0; i < totalRounds; i++) {
        const lastTeam = remainingTeams[remainingTeams.length - 1];
        fixtures.push({ teamOne: teamOne, teamTwo: lastTeam });
        for (let j = 0; j < array.length / 2 - 1; j++) {
          fixtures.push({
            teamOne: remainingTeams[j],
            teamTwo: remainingTeams[remainingTeams.length - j - 2],
          });
        }

        remainingTeams = rotateArray(remainingTeams);
      }
      setFixtures(fixtures);
    }
  };

  function determineMatchResult(teamOne, teamTwo) {
    const teamOneScore = Math.floor(Math.random() * 5);
    const teamTwoScore = Math.floor(Math.random() * 5);
    const result = {};
    teamOne.matchesPlayed++;
    teamOne.goalsScored += teamOneScore;
    teamOne.goalsConceded += teamTwoScore;
    teamOne.goalDifference = teamOne.goalsScored - teamOne.goalsConceded;

    teamTwo.matchesPlayed++;
    teamTwo.goalsScored += teamTwoScore;
    teamTwo.goalsConceded += teamOneScore;
    teamTwo.goalDifference = teamTwo.goalsScored - teamTwo.goalsConceded;

    if (teamOneScore > teamTwoScore) {
      teamOne.points += 3;
      teamOne.wins += 1;
      teamTwo.loses += 1;
      result.winner = teamOne.teamName;
      result.winnerScore = teamOneScore;
      result.loser = teamTwo.teamName;
      result.loserScore = teamTwoScore;
    } else if (teamTwoScore > teamOneScore) {
      teamTwo.points += 3;
      teamTwo.wins += 1;
      teamOne.loses += 1;
      result.winner = teamTwo.teamName;
      result.winnerScore = teamTwoScore;
      result.loser = teamOne.teamName;
      result.loserScore = teamOneScore;
    } else {
      teamOne.points++;
      teamTwo.points++;
      teamOne.draws++;
      teamTwo.draws++;
      result.winner = teamTwo.teamName;
      result.winnerScore = teamTwoScore;
      result.loser = teamOne.teamName;
      result.loserScore = teamOneScore;
    }
    results.push(result);
  }

  const simulateLeage = () => {
    for (let i = 0; i < fixtures.length; i++) {
      determineMatchResult(fixtures[i].teamOne, fixtures[i].teamTwo);
    }
    teams.sort((a, b) => {
      if (b.points === a.points) {
        return b.goalDifference - a.goalDifference;
      }
      return b.points - a.points;
    });
    setTeams([...teams]);
    setLeagueSimulated(true);
    setModalShow(true);
    setWinner(teams[0].teamName);
    setResults([...results]);
  };

  useEffect(() => {
    setTeams(premierLeagueTeams);
  }, [teams]);
  return (
    <div>
      <Container>
        <Row className="mt-3">
          <Col>
            <Button
              onClick={() => {
                if (fixtures.length == 0) {
                  generateFixture();
                } else if (!leagueSimulated) {
                  simulateLeage();
                } else if (leagueSimulated) {
                  clearArray();
                }
              }}
            >
              {fixtures.length === 0
                ? "Generate Fixture"
                : !leagueSimulated
                ? "Simulate League"
                : leagueSimulated && "Try Again"}
            </Button>
          </Col>

          {leagueSimulated && (
            <Col>
              <Button onClick={scrollToResults}>View Match Results</Button>
            </Col>
          )}
          <Col>
            <Link to={"/fixtures"}>
              <Button>View Fixtures</Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table responsive hover className="mt-5">
              <thead>
                <tr>
                  <th>Club</th>
                  <th>MP</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th className="d-none d-sm-table-cell">GF</th>
                  <th className="d-none d-sm-table-cell">GA</th>
                  <th className="d-none d-sm-table-cell">GD</th>
                  <th>Pts</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {teams.map((el, idx) => (
                  <tr key={idx}>
                    <td className="text-sm">
                      {idx + 1 + " " + " " + el.teamName}
                    </td>
                    <td className="text-sm">{el.matchesPlayed}</td>
                    <td className="text-sm d-none d-sm-table-cell">
                      {el.wins}
                    </td>
                    <td className="text-sm d-none d-sm-table-cell">
                      {el.draws}
                    </td>
                    <td className="text-sm d-none d-sm-table-cell">
                      {el.loses}
                    </td>
                    <td className="text-sm">{el.goalsScored}</td>
                    <td className="text-sm">{el.goalsConceded}</td>
                    <td className="text-sm">{el.goalDifference}</td>
                    <td className="text-sm">{el.points}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Container id="results">
          {results.length > 0 &&
            results.map((el, idx) => (
              <Card key={idx} className="mt-2">
                <Card.Header>
                  Match No {idx + 1} Result:&nbsp;
                  <p className="fw-bold">
                    {el.winnerScore > el.loserScore
                      ? `Winner: ${el.winner}`
                      : "Match Drawn"}
                  </p>
                </Card.Header>
                <Card.Body>
                  <blockquote className="blockquote"></blockquote>

                  <div>
                    <p>
                      Winner: {el.winner} - {el.winnerScore}
                    </p>
                    <p>
                      {" "}
                      Loser: {el.loser} - {el.loserScore}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            ))}
        </Container>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Container>
    </div>
  );
};

export default Standings;
