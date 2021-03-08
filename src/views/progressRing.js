const editText = (text) => {
  const circleText = document.querySelector(".sidebar-progress-ring__text");
  circleText.innerHTML = text;
};

const setProgressRing = (completedCount, totalCount) => {
  //   debugger;
  const circle = document.querySelector(".sidebar-progress-ring__circle");
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;

  const percent =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  editText(`${completedCount} out of ${totalCount}`);
};

const Init = (completedCount, totalCount) => {
  const sidebar = document.querySelector(".sidebar");
  const heading = document.createElement("h3");
  heading.textContent = "Completed Todos";
  const progressRing = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  progressRing.classList = "sidebar-progress-ring";
  progressRing.setAttribute("height", 220);
  progressRing.setAttribute("width", 220);
  progressRing.innerHTML =
    '<circle class="sidebar-progress-ring__circle" stroke-width="4" fill="#00adb5" r="98" cx="110" cy="110" stroke="white"></circle> <text class="sidebar-progress-ring__text" x="50%" y="52%" fill="black" font-size="x-large" text-anchor="middle">3 out of 3</text>';
  sidebar.append(heading, progressRing);
  setProgressRing(completedCount, totalCount);
};

export default {
  Init,
  setProgressRing,
};
