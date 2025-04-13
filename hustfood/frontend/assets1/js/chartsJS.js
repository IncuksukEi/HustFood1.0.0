const ctx1 = document.getElementById("chart-1");

const mychart = new Chart(ctx1, {
  type: "polarArea",
  data: {
    labels: ["Facebook", "Youtube", "Amazon"],
    datasets: [
      {
        label: "# of Votes",
        data: [600, 800, 1000],
        borderWidth: 1,
        backgroundColor: [
          "rgba(255,99,132,0.6)",
          "rgba(54,162,235,0.6)",
          "rgba(255,206,86,0.6)",
        ],
      },
    ],
  },
  options: {
    reponsive: true,
  },
});
const ctx2 = document.getElementById("chart-2");

const mychart2 = new Chart(ctx2, {
  type: "bar",
  data: {
    labels: ["Facebook", "Youtube", "Amazon"],
    datasets: [
      {
        label: "Thu nhập",
        data: [600, 800, 1000],
        borderWidth: 1,
        backgroundColor: [
          "rgba(255,99,132,1)",
          "rgba(54,162,235,1)",
          "rgba(255,206,86,1)",
        ],
      },
    ],
  },
  options: {
    reponsive: true,
  },
});
