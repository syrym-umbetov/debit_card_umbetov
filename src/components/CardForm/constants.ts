export const currentYear = new Date().getFullYear();

export const monthsArr = Array.from({ length: 12 }, (x, i) => {
  const month = i + 1;
  return month <= 9 ? '0' + month : month;
});

export const yearsArr = Array.from({ length: 9 }, (_x, i) => currentYear + i);
