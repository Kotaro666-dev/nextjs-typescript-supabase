export const convertTimestamptz = (timestamptz: string): string => {
  // 2021-10-10T13:04:27.353279+00:00
  const firstSplit = timestamptz.split("T");
  console.log(firstSplit);
  let date = firstSplit[0];
  const secondSplit = firstSplit[1].split(".");
  date += " " + secondSplit[0];
  return date;
};
