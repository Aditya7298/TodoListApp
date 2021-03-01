const dateSpan = document.querySelector("#date");

export const displayDate = () => {
  const currDate = new Date();
  const dateString = currDate.toDateString().slice(4);
  dateSpan.innerHTML = dateString;
};
