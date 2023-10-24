const color = [
  "hsl(113, 70%, 50%)",
  "hsl(340, 70%, 50%)",
  "hsl(97, 70%, 50%)",
  "hsl(328, 70%, 50%)",
  "hsl(184, 70%, 50%)",
];

function getColors(size) {
  const counter = Math.ceil(size / color.length) - 1;

  let colors = color;
  for (let i = 0; i < counter; i++) {
    colors = colors.concat(color);
  }

  return colors.slice(0, size);
}

export default getColors;
