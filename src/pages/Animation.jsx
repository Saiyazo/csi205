import React, { useState, useEffect, useRef } from 'react';

const BouncingBall = () => {
  const [ballType, setBallType] = useState(0);
  const [running, setRunning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const boxWidth = 800;
  const boxHeight = 600;
  const ballSize = 200;
  const speedX = 5;
  const speedY = 5;

  const maxX = boxWidth - ballSize - 4;
  const maxY = boxHeight - ballSize - 4;

  const directionRef = useRef({ x: true, y: true });
  const positionRef = useRef({ x: 0, y: 0 });

  const ballImages = {
    1: './src/imgs/basketball.png', // Basketball
    2: './src/imgs/football.png', // Football
    3: './src/imgs/volleyball.png', // Volleyball
    4: './src/imgs/me.png', // Human
    5: './src/imgs/cartoon.png', // Cartoon
    6: './src/imgs/logo.png', // Logo
  };

  const ballLabels = {
    0: 'None',
    1: 'Basketball',
    2: 'Football',
    3: 'Volleyball',
    4: 'Human',
    5: 'Cartoon',
    6: 'Logo'
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        let { x, y } = positionRef.current;
        let { x: dirX, y: dirY } = directionRef.current;

        if (dirX) {
          x += speedX;
          if (x >= maxX) dirX = false;
        } else {
          x -= speedX;
          if (x <= 0) dirX = true;
        }

        if (dirY) {
          y += speedY;
          if (y >= maxY) dirY = false;
        } else {
          y -= speedY;
          if (y <= 0) dirY = true;
        }

        directionRef.current = { x: dirX, y: dirY };
        positionRef.current = { x, y };
        setPosition({ x, y });
      }
    }, 17);

    return () => clearInterval(interval);
  }, [running, maxX, maxY]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '6') {
        setBallType(parseInt(e.key));
      } else if (e.key === ' ') {
        e.preventDefault();
        setRunning(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleRunClick = () => {
    setRunning(prev => !prev);
  };

  const handleBallTypeClick = (type) => {
    setBallType(type);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4" style={{ minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ width: '60%', minWidth: '820px' }}>
        <div
          className="position-relative border border-dark border-2 rounded-3 overflow-hidden"
          style={{
            width: `${boxWidth}px`,
            height: `${boxHeight}px`,
            backgroundColor: '#d4d4d4',
            backgroundImage: 'url(./src/imgs/wood-plank.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            margin: '0 auto'
          }}
        >
          <div
            className="position-absolute rounded-circle"
            style={{
              width: `${ballSize}px`,
              height: `${ballSize}px`,
              left: `${position.x}px`,
              top: `${position.y}px`,
              backgroundColor: ballType === 0 ? '#333' : 'transparent',
              transition: 'background-color 0.3s'
            }}
          >
            {ballType !== 0 && (
              <img
                src={ballImages[ballType]}
                alt={ballLabels[ballType]}
                className="w-100 h-100 rounded-circle"
                style={{
                  objectFit: 'cover',
                  backgroundColor: '#333'
                }}
              />
            )}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center py-4">
          <button
            className={`btn ${running ? 'btn-danger' : 'btn-success'} d-flex align-items-center gap-2`}
            onClick={handleRunClick}
          >
            <i className={`bi ${running ? 'bi-pause' : 'bi-play'}`}></i>
            {running ? 'PAUSE' : 'RUN'}
          </button>

          <div className="d-flex gap-2 flex-wrap">
            <button
              className={`btn ${ballType === 0 ? 'btn-secondary' : 'btn-outline-secondary'}`}
              onClick={() => handleBallTypeClick(0)}
            >
              None
            </button>
            <button
              className={`btn ${ballType === 1 ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleBallTypeClick(1)}
            >
              Basketball
            </button>
            <button
              className={`btn ${ballType === 2 ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleBallTypeClick(2)}
            >
              Football
            </button>
            <button
              className={`btn ${ballType === 3 ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleBallTypeClick(3)}
            >
              Volleyball
            </button>
            <button
              className={`btn ${ballType === 4 ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleBallTypeClick(4)}
            >
              Human
            </button>
            <button
              className={`btn ${ballType === 5 ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleBallTypeClick(5)}
            >
              Cartoon
            </button>
            <button
              className={`btn ${ballType === 6 ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleBallTypeClick(6)}
            >
              Logo
            </button>
          </div>
        </div>
        <div className="text-center fw-bold mt-3">
          67090695 นายณชพัฒน์ สัมฤทธิ์ยากรณ์
        </div>
      </div>
    </div>
  );
};

export default BouncingBall;

//backgroundColor