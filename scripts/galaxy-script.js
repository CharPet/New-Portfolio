// Store orbit configurations
const orbits = [
  {
    line: "line1",
    planets: ["html-planet", "css-planet", "js-planet"],
    speed: 0.003,
    clockwise: true,
  },
  {
    line: "line2",
    planets: ["php-planet", "mysql-planet", "wordpress-planet"],
    speed: 0.0025,
    clockwise: false, // Counter-clockwise
  },
  {
    line: "line3",
    planets: ["c-planet", "cpp-planet", "java-planet"],
    speed: 0.002,
    clockwise: true,
  },
  {
    line: "line4",
    planets: ["opengl-planet", "onshape-planet", "unreal-planet"],
    speed: 0.0018,
    clockwise: false, // Counter-clockwise
  },
  {
    line: "line5",
    planets: [
      "figma-planet",
      "inkscape-planet",
      "illustrator-planet",
      "animate-planet",
    ],
    speed: 0.0015,
    clockwise: true,
  },
  {
    line: "line6",
    planets: ["premiere-planet", "davinci-planet"],
    speed: 0.0012,
    clockwise: false, // Counter-clockwise
  },
  {
    line: "line7",
    planets: ["vscode-planet", "github-planet", "ubuntu-planet", "vs-planet"],
    speed: 0.001,
    clockwise: true,
  },
];

// Function to calculate elliptical orbit position
function getOrbitPosition(lineElement, angle) {
  const rect = lineElement.getBoundingClientRect();
  const spaceRect = document.querySelector(".space").getBoundingClientRect();

  // Get the actual dimensions of the orbit ellipse
  const a = lineElement.offsetWidth / 2; // semi-major axis
  const b = lineElement.offsetHeight / 2; // semi-minor axis

  // Calculate position on ellipse
  const x = a * Math.cos(angle);
  const y = b * Math.sin(angle);

  return { x, y };
}

// Animation loop
let angles = orbits.map(() => Math.random() * Math.PI * 2); // Start at random positions

function animate() {
  orbits.forEach((orbit, index) => {
    const line = document.querySelector(`.${orbit.line}`);
    if (!line) return;

    orbit.planets.forEach((planetClass, planetIndex) => {
      const planet = document.querySelector(`.${planetClass}`);
      if (!planet) return;

      // Calculate spacing between planets in the same orbit
      const spacing = (2 * Math.PI) / orbit.planets.length;
      const angle = angles[index] + spacing * planetIndex;

      const pos = getOrbitPosition(line, angle);

      // Position planet relative to the center of the space container
      const spaceCenter = {
        x: document.querySelector(".space").offsetWidth / 2,
        y: document.querySelector(".space").offsetHeight / 2,
      };

      planet.style.left = `${spaceCenter.x + pos.x - 24}px`; // 24 is half planet width
      planet.style.top = `${spaceCenter.y + pos.y - 24}px`; // 24 is half planet height
      planet.style.transform = "none"; // Remove the translate transform
    });

    // Update angle for next frame
    if (orbit.clockwise) {
      angles[index] += orbit.speed;
    } else {
      angles[index] -= orbit.speed; // Counter-clockwise movement
    }
  });

  requestAnimationFrame(animate);
}

// Start animation when page loads
window.addEventListener("load", () => {
  animate();
});
