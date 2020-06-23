const colors = [
  '#349A89',
  '#F1C40F',
  '#289cc1',
  '#f49b57',
  '#08457c',
];
const color = {
  getRandomColor() {
    let numberColor = Math.floor(
      (Math.random() * 100) % colors.length,
    );

    return colors[numberColor];
  },
};
export default color;
