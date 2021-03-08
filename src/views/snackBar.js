const showSnackbar = () => {
  const snackbar = document.querySelector(".snackbar");
  snackbar.classList.toggle("show");

  setTimeout(() => {
    snackbar.classList.toggle("show");
  }, 3000);
};

export default {
  showSnackbar,
};
