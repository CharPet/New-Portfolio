new FinisherHeader({
  count: 100,
  size: {
    min: 2,
    max: 16,
    pulse: 0.1,
  },
  speed: {
    x: {
      min: 0,
      max: 0.03,
    },
    y: {
      min: 0,
      max: 0.03,
    },
  },
  colors: {
    background: "#222223",
    particles: ["#fbfcca", "#d7f3fe", "#ffd0a7"],
  },
  blending: "overlay",
  opacity: {
    center: 0.8,
    edge: 0,
  },
  skew: 0,
  shapes: ["c"],
});
