const COLORS = ['white', 'red', 'blue', 'orange', 'green', 'yellow'];

const CubePiece = ({ position, colors }) => (
  <div className="cube-piece" style={{
    transform: `translate3d(${position[0]}px, ${position[1]}px, ${position[2]}px)`
  }}>
    {colors.map((color, index) => (
      <div key={index} className={`face face-${index}`} style={{ backgroundColor: color }} />
    ))}
  </div>
);

const RubiksCube = () => {
  const [cubeState, setCubeState] = React.useState(() => {
    const initialState = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          initialState.push({
            position: [x, y, z],
            colors: [
              y === -1 ? COLORS[0] : COLORS[5],
              x === 1 ? COLORS[1] : COLORS[3],
              z === -1 ? COLORS[2] : COLORS[4],
              x === -1 ? COLORS[3] : COLORS[1],
              z === 1 ? COLORS[4] : COLORS[2],
              y === 1 ? COLORS[5] : COLORS[0],
            ]
          });
        }
      }
    }
    return initialState;
  });

  const [rotation, setRotation] = React.useState({ x: -30, y: 45, z: 0 });
  const [isRotating, setIsRotating] = React.useState(false);

  const rotateFace = (face, direction) => {
    if (isRotating) return;
    setIsRotating(true);

    let axis, layer;
    switch (face) {
      case 'U': axis = 'y'; layer = -1; break;
      case 'D': axis = 'y'; layer = 1; break;
      case 'F': axis = 'z'; layer = -1; break;
      case 'B': axis = 'z'; layer = 1; break;
      case 'L': axis = 'x'; layer = -1; break;
      case 'R': axis = 'x'; layer = 1; break;
    }

    const axisIndex = ['x', 'y', 'z'].indexOf(axis);
    
    setCubeState(prevState => {
      return prevState.map(piece => {
        if (piece.position[axisIndex] === layer) {
          const newPosition = [...piece.position];
          const newColors = [...piece.colors];
          
          if (axis === 'x') {
            if (direction === 'clockwise') {
              [newPosition[1], newPosition[2]] = [newPosition[2], -newPosition[1]];
              [newColors[0], newColors[2], newColors[5], newColors[4]] = [newColors[4], newColors[0], newColors[2], newColors[5]];
            } else {
              [newPosition[1], newPosition[2]] = [-newPosition[2], newPosition[1]];
              [newColors[0], newColors[2], newColors[5], newColors[4]] = [newColors[2], newColors[5], newColors[4], newColors[0]];
            }
          } else if (axis === 'y') {
            if (direction === 'clockwise') {
              [newPosition[0], newPosition[2]] = [-newPosition[2], newPosition[0]];
              [newColors[1], newColors[2], newColors[3], newColors[4]] = [newColors[4], newColors[1], newColors[2], newColors[3]];
            } else {
              [newPosition[0], newPosition[2]] = [newPosition[2], -newPosition[0]];
              [newColors[1], newColors[2], newColors[3], newColors[4]] = [newColors[2], newColors[3], newColors[4], newColors[1]];
            }
          } else if (axis === 'z') {
            if (direction === 'clockwise') {
              [newPosition[0], newPosition[1]] = [newPosition[1], -newPosition[0]];
              [newColors[0], newColors[1], newColors[5], newColors[3]] = [newColors[3], newColors[0], newColors[1], newColors[5]];
            } else {
              [newPosition[0], newPosition[1]] = [-newPosition[1], newPosition[0]];
              [newColors[0], newColors[1], newColors[5], newColors[3]] = [newColors[1], newColors[5], newColors[3], newColors[0]];
            }
          }
          
          return { ...piece, position: newPosition, colors: newColors };
        }
        return piece;
      });
    });

    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <div className="app-container">
      <div className="rubiks-cube-container">
        <style>{`
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
          }
          .app-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            min-height: 100vh;
            padding-top: 20vh;
            box-sizing: border-box;
          }
          .rubiks-cube-container {
            perspective: 1000px;
            width: 300px;
            height: 300px;
          }
          .rubiks-cube {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.5s;
          }
          .cube-piece {
            position: absolute;
            width: 50px;
            height: 50px;
            transition: transform 0.5s;
            transform-style: preserve-3d;
          }
          .face {
            position: absolute;
            width: 48px;
            height: 48px;
            border: 1px solid black;
            opacity: 0.9;
          }
          .face-0 { transform: rotateX(90deg) translateZ(25px); }
          .face-1 { transform: rotateY(90deg) translateZ(25px); }
          .face-2 { transform: translateZ(25px); }
          .face-3 { transform: rotateY(-90deg) translateZ(25px); }
          .face-4 { transform: rotateY(180deg) translateZ(25px); }
          .face-5 { transform: rotateX(-90deg) translateZ(25px); }
          .controls {
            margin-top: 20px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
          }
          button {
            padding: 5px 10px;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            border-radius: 4px;
            cursor: pointer;
          }
          button:hover {
            background-color: #e0e0e0;
          }
        `}</style>
        <div className="rubiks-cube" style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`
        }}>
          {cubeState.map((piece, index) => (
            <CubePiece key={index} position={piece.position.map(p => p * 55)} colors={piece.colors} />
          ))}
        </div>
      </div>
      <div className="controls">
        {['U', 'D', 'F', 'B', 'L', 'R'].map(face => (
          <div key={face}>
            <button onClick={() => rotateFace(face, 'clockwise')}>
              {face}
            </button>
            <button onClick={() => rotateFace(face, 'counterclockwise')}>
              {face}'
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<RubiksCube />, document.getElementById('root'));