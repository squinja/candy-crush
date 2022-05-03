import axios from "axios";
import { useEffect, useState } from "react";
import HighScoresBoard from "./HighScoresBoard";

const ScoreBoard = ({ score, currentUser, setCurrentUser }) => {
  const [userScores, setUserScores] = useState([]);
  const [usernameInput, setUsernameInput] = useState("");
  const [validationError, setValidationError] = useState("");
  const [loadedData, setLoadedData] = useState(false);

  // This function handles updating the user scores from the backend on useEffect
  const fetchData = async () => {
    const { data } = await axios.get(
      // Below ternary operator handles for both production and development server
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000"
          : "https://protected-oasis-38267.herokuapp.com"
      }/users`
    );
    setUserScores(data.data.data);
    setLoadedData(true);
  };

  const saveUserScore = async () => {
    // If user is not logged in, cancel out of this function
    if (!currentUser) return;
    try {
      await axios.patch(
        `${
          process.env.NODE_ENV === "development"
            ? "http://localhost:8000"
            : "https://protected-oasis-38267.herokuapp.com"
        }/users/${currentUser}`,
        {
          highscore: score,
        }
      );
      // Update the userscore to the high score board when the user saves their score for immediate feedback
      await fetchData();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let timer;
    if (score > 34) {
      timer = setTimeout(async () => {
        await saveUserScore();
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [score]);

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

      setValidationError(data.msg);
      setCurrentUser(data.data.userName);

      await fetchData();
    } catch (error) {
      setValidationError(error.response.data);
    }
    setUsernameInput("");
  };

  // To delete users on high score board
  const deleteUser = async (username) => {
    // send delete request to backend
    try {
      await axios.delete(
        `${
          process.env.NODE_ENV === "development"
            ? "http://localhost:8000"
            : "https://protected-oasis-38267.herokuapp.com"
        }/users/${username}`
      );
      // await fetchData();
      const scoresAfterDeletion = userScores.filter(
        (user) => user.userName !== username
      );
      setUserScores(scoresAfterDeletion);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="score-board">
        <h2>{!currentUser ? "Log in to play" : `Score: ${score}`}</h2>
        {validationError && <p>{validationError}</p>}
        {!currentUser ? (
          <form onSubmit={handleUsernameSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={usernameInput}
              onChange={handleUsernameInputChange}
            />
            <button>Submit</button>
          </form>
        ) : null}
        <h3>Username: {currentUser || "Not signed in"}</h3>
        <h3>Get to 35 to win!</h3>
        <button onClick={saveUserScore}>Save your score</button>
      </div>
      <HighScoresBoard
        userScores={userScores}
        loadedData={loadedData}
        deleteUser={deleteUser}
        currentUser={currentUser}
      />
    </div>
  );
};

export default ScoreBoard;
