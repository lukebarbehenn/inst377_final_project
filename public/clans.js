async function getTopPlayers() {

  const rankInput = document.getElementById('leaderboard').value

  const playersData = await fetch(`https://api.clashk.ing/ranking/live/legends?top_ranking=1&lower_ranking=${rankInput}`).then((result) =>
    result.json());
  
  const playerTable = document.getElementById('playerDataTable');
  
    while (playerTable.rows.length > 1) {
    playerTable.deleteRow(1);
  }

  playersData.forEach((player) => {
    const tableRow = document.createElement('tr');
    const playerRank = document.createElement('td');
    const playerName = document.createElement('td');
    const playerTownHall = document.createElement('td');
    const playerTrophies = document.createElement('td');

    playerRank.innerHTML = player.rank
    playerName.innerHTML = player.name
    playerTownHall.innerHTML = player.townhall
    playerTrophies.innerHTML = player.trophies

    tableRow.appendChild(playerRank);
    tableRow.appendChild(playerName);
    tableRow.appendChild(playerTownHall);
    tableRow.appendChild(playerTrophies);


    playerTable.append(tableRow);

    document.getElementById("message").innerHTML= `The top ${rankInput} players in Clash of Clans!`
  });
}