async function windowActions() {
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
window.onload = windowActions();
