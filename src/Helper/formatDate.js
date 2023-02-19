
const allMonths = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
]

export const formartDate = (date) => {
  const [day, month, year] = date.split(/\/|-/);
  const newDay = day.toString().padStart(2, "0");
  return `${newDay} ${allMonths[month - 1]} ${year}`;
};