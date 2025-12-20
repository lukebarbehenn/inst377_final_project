let thChart = null;

// This function saves the data to supabase
async function supabaseSaved(player) {
  await fetch('/players', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      player_name: player.name,
      clan_name: player.clan_name,
      town_hall: player.th,
      league: player.league,
      trophies: player.trophies
    })
  });
}

// Searches any player, then uses the above function to save to supabase 
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

    supabaseSaved(player);
    
  });
  renderTHChart(playersData.items);
}

// Get players currently stored in my supabase database 
async function loadPlayersSupabase() {
  const res = await fetch('/players');
  const players = await res.json();

  const playerTable = document.getElementById('supabaseTable');

  while (playerTable.rows.length > 1) {
    playerTable.deleteRow(1);
  }

  players.forEach(player => {
    const tableRow = document.createElement('tr');
    const playerName = document.createElement('td');
    const playerClan = document.createElement('td');
    const playerTownHall = document.createElement('td');
    const playerLeague = document.createElement('td');
    const playerTrophies = document.createElement('td');

    playerName.innerHTML = player.player_name
    playerClan.innerHTML = player.clan_name
    playerTownHall.innerHTML = player.town_hall
    playerLeague.innerHTML = player.league
    playerTrophies.innerHTML = player.trophies

    tableRow.appendChild(playerName);
    tableRow.appendChild(playerClan);
    tableRow.appendChild(playerTownHall);
    tableRow.appendChild(playerLeague);
    tableRow.appendChild(playerTrophies);


    playerTable.append(tableRow);
  });
}

// Creates chart of town halls 
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

