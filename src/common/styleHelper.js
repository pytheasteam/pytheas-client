export const removeGradientBg = () => {
  const classNames = document.body.className.split(" ");
  document.body.className = classNames
    .filter(cName => cName !== "gradient-bg")
    .join(" ");
};
