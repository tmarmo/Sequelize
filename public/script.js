async function getData() {
  const fetchData = await fetch("/api/dining");
  const jsonData = await fetchData.json();
  const dataArray = jsonData.fetchData;
  const target = document.querySelector(".target");

  dataArray.forEach((hall) => {
    const halls = document.createElement("tr");
    halls.innerHTML = `
        <td>${hall.hall_id}</td>
        <td>${hall.hall_name}</td>
        <td>${hall.hall_address}</td>
        `;
    target.append(halls);
  });
}

async function getMeals() {
  const mealRequest = await fetch("api/allMeal");
  const mealData = await mealRequest.json();
  return mealData;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function windowActions() {
  const results = await getMeals();
  const meals = results.data;
  console.table(meals.data);
  const mealArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const selectedMeals = mealArray.map((element) => {
    const random = getRandomIntInclusive(0, meals.length - 1);
    return meals[random];
  });
  getData();

  console.table(selectedMeals);

  const datapoint_fullmeals = [];
  selectedMeals.forEach((element) => {
    const appendItem = [
      element.meal_name,
      element.calories,
      element.cholesterol,
      element.sodium,
      element.carbs,
      element.protein,
      element.fat,
    ];
    datapoint_fullmeals.push(appendItem);
  });

  const datapoints_calories = [];
  const datapoints_cholesterol = [];
  const datapoints_sodium = [];
  const datapoints_carbs = [];
  const datapoints_protein = [];
  const datapoints_fat = [];

  let chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
      text: "UMD MEAL MACROS",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries,
    },
    data: [
      {
        type: "stackedBar",
        name: "Calories",
        showInLegend: "true",
        dataPoints: datapoints_calories,
      },
      {
        type: "stackedBar",
        name: "Cholesterol",
        showInLegend: "true",
        dataPoints: datapoints_cholesterol,
      },
      {
        type: "stackedBar",
        name: "Sodium",
        showInLegend: "true",
        dataPoints: datapoints_sodium,
      },
      {
        type: "stackedBar",
        name: "Carbs",
        showInLegend: "true",
        dataPoints: datapoints_carbs,
      },
      {
        type: "stackedBar",
        name: "Protein",
        showInLegend: "true",
        dataPoints: datapoints_protein,
      },
      {
        type: "stackedBar",
        name: "Fat",
        showInLegend: "true",
        dataPoints: datapoints_fat,
      },
    ],
  });

  async function addDatapoints() {
    datapoint_fullmeals.forEach((value) => {
      datapoints_calories.push({ label: value[0], y: value[1] }),
        datapoints_cholesterol.push({ label: value[0], y: value[2] }),
        datapoints_sodium.push({ label: value[0], y: value[3] }),
        datapoints_carbs.push({ label: value[0], y: value[4] }),
        datapoints_protein.push({ label: value[0], y: value[5] }),
        datapoints_fat.push({ label: value[0], y: value[6] });
    });
  }
  await addDatapoints();

  chart.render();

  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    }
    else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
}

window.onload = windowActions;