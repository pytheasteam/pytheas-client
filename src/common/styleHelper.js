export const removeBg = bgClass => {
  const classNames = document.body.className.split(" ");
  document.body.className = classNames
    .filter(cName => cName !== bgClass)
    .join(" ");
};
