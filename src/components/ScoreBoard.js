import axios from "axios";
import { useEffect, useState } from "react";
import HighScoresBoard from "./HighScoresBoard";

const ScoreBoard = ({ score, currentUser, setCurrentUser }) => {
  const [userScores, setUserScores] = useState(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [validationError, setValidationError] = useState("");

  const fetchData = async () => {
    const { data } = await axios.get(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000"
          : "https://protected-oasis-38267.herokuapp.com"
      }/users`
    );
    console.log("data", data.data.data);
    setUserScores(data.data.data);
  };

  // const saveData = async () => {
  //   const data = {
  //     username: userName,
  //     score: score,
  //   };
  //   try {
  //     await axios.post("http://localhost:8000/addscore", data);

  //     await fetchData();
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const saveUserScore = async () => {
    if (!currentUser) return;
    try {
      const response = await axios.patch(
        `${
          process.env.NODE_ENV === "development"
            ? "http://localhost:8000"
            : "https://protected-oasis-38267.herokuapp.com"
        }/users/${currentUser}`,
        {
          highscore: score,
        }
      );
      await fetchData();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUsernameInputChange = (event) => {
    const { value } = event.target;
    setUsernameInput(value);
  };

  const handleUsernameSubmit = async (event) => {
    event.preventDefault();
    if (!usernameInput) return;

    // Send username to backend
    try {
      const { data } = await axios.post(
        `${
          process.env.NODE_ENV === "development"
            ? "http://localhost:8000"
            : "https://protected-oasis-38267.herokuapp.com"
        }/users`,
        {
          username: usernameInput,
        }
      );
      console.log("data", data);
      setValidationError(data.msg);
      setCurrentUser(data.data.userName);
      await fetchData();
    } catch (error) {
      console.log("error", error);
    }
    setUsernameInput("");
  };

  return (
    <div>
      <div className="score-board">
        <h2>{!currentUser ? "Log in to play" : `Score: ${score}`}</h2>
        {validationError && <p>{validationError}</p>}
        <form onSubmit={handleUsernameSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={usernameInput}
            onChange={handleUsernameInputChange}
          />
          <button>Submit</button>
        </form>
        <h3>Username: {currentUser || "Not signed in"}</h3>
        <h3>Get to 35 to win!</h3>
        <button onClick={saveUserScore}>Save your score</button>
      </div>
      <HighScoresBoard userScores={userScores} />
    </div>
  );
};

export default ScoreBoard;
