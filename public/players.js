let thChart = null;

async function getPlayer() {

  const playerInput = document.getElementById('playerName').value

  const playersData = await fetch(`https://api.clashk.ing/player/search/${playerInput}`).then((result) =>
    result.json());
  
  const playerTable = document.getElementById('playerDataTable');
  
    while (playerTable.rows.length > 1) {
    playerTable.deleteRow(1);
  }

  playersData.items.forEach((player) => {
    const tableRow = document.createElement('tr');
    const playerName = document.createElement('td');
    const playerClan = document.createElement('td');
    const playerTownHall = document.createElement('td');
    const playerLeague = document.createElement('td');
    const playerTrophies = document.createElement('td');

    playerName.innerHTML = player.name
    playerClan.innerHTML = player.clan_name
    playerTownHall.innerHTML = player.th
    playerLeague.innerHTML = player.league
    playerTrophies.innerHTML = player.trophies

    tableRow.appendChild(playerName);
    tableRow.appendChild(playerClan);
    tableRow.appendChild(playerTownHall);
    tableRow.appendChild(playerLeague);
    tableRow.appendChild(playerTrophies);


    playerTable.append(tableRow);
  });
  renderTHChart(playersData.items);
}

function renderTHChart(players) {
  const labels = players.map(p => p.name);
  const data = players.map(p => p.th);

  const ctx = document.getElementById("town_hall_chart");

  if (thChart) thChart.destroy();

  thChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Town Hall Level",
        data,
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 1
      }]
    }
  });
}

