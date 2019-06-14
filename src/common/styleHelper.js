export const removeBg = bgClass => {
  const classNames = document.body.className.split(" ");
  document.body.className = classNames
    .filter(cName => cName !== bgClass)
    .join(" ");
};

export const upperFistLetter = word =>
  word && word.replace(/^\w/, c => c.toUpperCase());

export const tagIcons = {
  music: "musical-notes",
  test2: "camera",
  test3: "restaurant"
};
