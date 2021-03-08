const displayDate = () => {
  const dateSpan = document.querySelector(".navbar-date");
  const currDate = new Date();
  const dateString = currDate.toDateString().slice(4);
  dateSpan.innerHTML = dateString;
};

export default {
  displayDate,
};
