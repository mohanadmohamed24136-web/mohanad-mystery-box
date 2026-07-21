import { useState, useEffect } from "react";
import "./App.css";

import {
  FaGift,
  FaLaptop,
  FaHeadphones,
  FaGamepad,
  FaMobileAlt,
  FaCode,
} from "react-icons/fa";

import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdWatch } from "react-icons/md";

function App() {
  const prizes = [
    {
      name: "MacBook Pro M4",
      description: "Powerful laptop for development and creative work.",
      icon: <FaLaptop />,
      color: "#3B82F6",
    },
    {
      name: "Dell XPS 15",
      description: "Premium Windows laptop with high performance.",
      icon: <FaLaptop />,
      color: "#2563EB",
    },
    {
      name: "AirPods Pro",
      description: "Premium wireless earbuds with immersive sound.",
      icon: <FaHeadphones />,
      color: "#8B5CF6",
    },
    {
      name: "Sony WH-1000XM6",
      description: "Industry-leading noise cancelling headphones.",
      icon: <FaHeadphones />,
      color: "#7C3AED",
    },
    {
      name: "PlayStation 5",
      description: "Next-generation gaming console.",
      icon: <FaGamepad />,
      color: "#22C55E",
    },
    {
      name: "Xbox Series X",
      description: "Experience smooth and powerful gaming.",
      icon: <FaGamepad />,
      color: "#16A34A",
    },
    {
      name: "Apple Watch Series 10",
      description: "Smart watch with advanced health features.",
      icon: <MdWatch />,
      color: "#F59E0B",
    },
    {
      name: "Galaxy Watch Ultra",
      description: "Premium smartwatch for fitness and productivity.",
      icon: <MdWatch />,
      color: "#D97706",
    },
    {
      name: "iPhone 16 Pro",
      description: "Powerful smartphone with advanced camera system.",
      icon: <FaMobileAlt />,
      color: "#EF4444",
    },
    {
      name: "Galaxy S25 Ultra",
      description: "Flagship Android smartphone.",
      icon: <FaMobileAlt />,
      color: "#DC2626",
    },
    {
      name: "Gift Card",
      description: "A surprise shopping gift card.",
      icon: <FaGift />,
      color: "#F97316",
    },
    {
      name: "Mystery Prize",
      description: "An exclusive surprise is waiting for you.",
      icon: <FaGift />,
      color: "#EC4899",
    },
  ];

  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prize, setPrize] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(4);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("mystery-box"));

    const today = new Date().toDateString();

    if (!savedData || savedData.date !== today) {
      const data = {
        date: today,
        attempts: 4,
      };

      localStorage.setItem("mystery-box", JSON.stringify(data));
      setAttemptsLeft(4);
    } else {
      setAttemptsLeft(savedData.attempts);
    }
  }, []);
  function handleBox() {

  if (loading) return;

  if (opened) {
    setOpened(false);
    setPrize(null);
    return;
  }

  if (attemptsLeft <= 0) {
    return;
  }

  setLoading(true);

  setTimeout(() => {

    let randomPrize;

    do {
      randomPrize =
        prizes[Math.floor(Math.random() * prizes.length)];
    } while (
      prize &&
      randomPrize.name === prize.name
    );

    const remainingAttempts = attemptsLeft - 1;

    setPrize(randomPrize);
    setOpened(true);
    setLoading(false);
    setAttemptsLeft(remainingAttempts);

    localStorage.setItem(
      "mystery-box",
      JSON.stringify({
        date: new Date().toDateString(),
        attempts: remainingAttempts,
      })
    );

  }, 1500);
}
return (
  <div className="container">

    <div className="header">

      <span className="title-badge">
        Amazing Lucky Draw
      </span>

      <h1>Welcome to Mystery Box</h1>

      <p>
        Open the box and discover a random premium prize.
      </p>

      <small>
        {prizes.length} Premium Prizes Available
      </small>

      <small className="attempts">
        Remaining Attempts: {attemptsLeft} of 4
      </small>

    </div>

    <div
      className="card"
      style={{
        borderColor:
          opened && prize
            ? prize.color
            : "#3B82F6",
      }}
    >

      {loading ? (
        <>
          <div className="icon gift">
            <FaGift />
          </div>

          <h1>Opening Box...</h1>

          <p className="message">
            Please wait while your prize is being selected.
          </p>
        </>
      ) : opened ? (
        <>
          <div
            className="icon"
            style={{
              color: prize.color,
            }}
          >
            {prize.icon}
          </div>

          <h1>{prize.name}</h1>

          <p className="message">
            {prize.description}
          </p>
        </>
      ) : (
        <>
          <div className="icon gift">
            <FaGift />
          </div>

          <h1>Mystery Box</h1>

          <p className="message">
            Click the button below to reveal a random prize.
          </p>
        </>
      )}

      {attemptsLeft === 0 && !opened && (
        <p className="limit-message">
          Daily limit reached. Come back tomorrow!
        </p>
      )}

      <button
        onClick={handleBox}
        disabled={loading || (!opened && attemptsLeft === 0)}
      >
        {loading
          ? "Opening..."
          : opened
          ? "Close Box"
          : attemptsLeft === 0
          ? "No Attempts Left"
          : "Open Box"}
      </button>

      <footer className="footer">

        <span>
          <FaCode /> Developed by <strong>Mohanad Mohamed</strong>
        </span>

        <div className="socials">

          <a
            href="https://www.linkedin.com/in/mohanad-mohamed-017146379"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/mohanadmohamed24136-web"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <FaGithub />
          </a>

        </div>

      </footer>

    </div>

  </div>
);
}

export default App;