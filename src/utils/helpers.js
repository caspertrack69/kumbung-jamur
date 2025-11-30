const generateHistory = (base, variance) => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i,
    value: parseFloat((base + Math.random() * variance - (variance / 2)).toFixed(1))
  }));
};