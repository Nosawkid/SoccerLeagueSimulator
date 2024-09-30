import { useContext, useEffect, useState } from "react";
import { premierLeagueTeams } from "../assets/data/Teams";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import "../assets/css/Standings.css";
import { Link } from "react-router-dom";
import FixtureContext from "../contexts/FixtureContext";

const Standings = () => {
  const [teams, setTeams] = useState([]);
  const { fixtures, setFixtures } = useContext(FixtureContext);
  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[rand];
      arr[rand] = temp;
    }
    return arr;
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

    teamOne.matchesPlayed++;
    teamOne.goalsScored += teamOneScore;
    teamOne.goalsConceded += teamTwoScore;
    teamOne.goalDifference = teamOne.goalsScored - teamOne.goalsConceded;

    teamTwo.matchesPlayed++;
    teamTwo.goalsScored += teamOneScore;
    teamTwo.goalsConceded += teamTwoScore;
    teamTwo.goalDifference = teamOne.goalsScored - teamOne.goalsConceded;

    if (teamOneScore > teamTwoScore) {
      teamOne.points += 3;
      teamOne.wins += 1;
      teamTwo.loses += 1;
    } else if (teamTwoScore > teamOneScore) {
      teamTwo.points += 3;
      teamTwo.wins += 1;
      teamOne.loses += 1;
    } else {
      teamOne.points++;
      teamTwo.points++;
      teamOne.draws++;
      teamTwo.draws++;
    }
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
  };

  useEffect(() => {
    setTeams(premierLeagueTeams);
  }, [teams]);
  return (
    <div>
      <Container>
        <Row className="mt-2">
          <Col>
            <Button
              onClick={() => {
                if (fixtures.length == 0) {
                  generateFixture();
                } else if (teams[0].matchesPlayed != 38) {
                  simulateLeage();
                } else {
                  clearArray();
                }
              }}
            >
              {fixtures.length === 0
                ? "Generate Fixture"
                : teams[0].matchesPlayed != 38
                ? "Simulate League"
                : "Try Again"}
            </Button>
          </Col>

          <Col>
            <Link to={"/fixtures"}>
              <Button>View Fixtures</Button>
            </Link>
          </Col>
        </Row>
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
                <td className="text-sm">{idx + 1 + " " + " " + el.teamName}</td>
                <td className="text-sm">{el.matchesPlayed}</td>
                <td className="text-sm d-none d-sm-table-cell">{el.wins}</td>
                <td className="text-sm d-none d-sm-table-cell">{el.draws}</td>
                <td className="text-sm d-none d-sm-table-cell">{el.loses}</td>
                <td className="text-sm">{el.goalsScored}</td>
                <td className="text-sm">{el.goalsConceded}</td>
                <td className="text-sm">{el.goalDifference}</td>
                <td className="text-sm">{el.points}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Standings;
