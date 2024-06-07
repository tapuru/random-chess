export const secondsToHHMMSS = (secNumber: number) => {
  const hours = Math.floor(secNumber / 3600);
  const minutes = Math.floor((secNumber - hours * 3600) / 60);
  const seconds = secNumber - hours * 3600 - minutes * 60;

  return `
    ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}
  `;
};
