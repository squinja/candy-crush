import axios from "axios";
import { useEffect, useState } from "react";

const randomUserNames = [
  "smarmysquid",
  "runnyrabbit",
  "weepingwhale",
  "orangeorangutan",
  "sleepingsquirrel",
  "cheekycheetah",
];

const ScoreBoard = ({ score }) => {
  const [userScores, setUserScores] = useState(null);
  const [userName, setUserName] = useState(null);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:8000/scores");
    const data = Object.keys(response.data.data).map(
      (item) => response.data.data[item]
    );
    setUserScores(data);
  };

  console.log(userScores);

  const saveData = async () => {
    const data = {
      username: userName,
      score: score,
    };
    try {
      await axios.post("http://localhost:8000/addscore", data);

      await fetchData();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
    setUserName(
      randomUserNames[Math.floor(Math.random() * randomUserNames.length)]
    );
  }, []);

  const descendingUserScores = userScores?.sort((a, b) => b.score - a.score);

  return (
    <div className="score-board">
      <h2>Score: {score}</h2>
      <h3>Username: {userName}</h3>
      <h3>Get to 35 to win!</h3>
      <h3>High Scores:</h3>
      {descendingUserScores?.map((userScore, index) => (
        <div key={{ index }}>
          <h3>
            {userScore.username}: {userScore.score}
          </h3>
        </div>
      ))}
      <button onClick={saveData}>save score</button>
    </div>
  );
};

export default ScoreBoard;
