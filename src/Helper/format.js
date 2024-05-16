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
  "Dec",
];

export const formatDate = (date) => {
  const [day, month, year] = date.split(/\/|-/);
  const newDay = day.toString().padStart(2, "0");
  return `${newDay} ${allMonths[month - 1]} ${year}`;
};

export const formatDateToNumbers = (date) => {
  const [day, month, year] = date.split(" ");
  const newMonth = allMonths.indexOf(month) + 1;
  return `${year}-${newMonth}-${day}`;
};

export const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const getCurrentDateBR = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const addDate = (date, value) => {
  const newDate = new Date(date);
  const finalDate = new Date(
    newDate.setDate(newDate.getDate() + Number(value))
  );
  const day = finalDate.getDate().toString().padStart(2, "0");
  const month = (finalDate.getMonth() + 1).toString().padStart(2, "0");
  const year = finalDate.getFullYear();
  return `${year}-${month}-${day}`;
};

export const formatCurrency = (value) => {
  return value.toLocaleString("fr-MA", { style: "currency", currency: "MAD" });
};

export const formatCurrencyNotSymbol = (value) => {
  const formattedValue = parseFloat(value).toFixed(2);
  return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
