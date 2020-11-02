export const convertMinutesToTime = (minutes) => {
  let s = "";
  const hours = Math.floor(minutes / 60);
  if (hours) s += `${hours}h`;
  const minutesRemaining = minutes % 60;
  if (minutesRemaining) s += ` ${minutesRemaining}min`;

  return s;
};
