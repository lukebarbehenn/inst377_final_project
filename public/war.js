async function getData(){
    const playersData = await fetch('https://api.clashk.ing/global/counts').then((result) =>
    result.json());

    const warPlayers = playersData.players_in_war 
    const joinLeaves = playersData.total_join_leaves
    const legendsLeague = playersData.players_in_legends
    const totalPlayers = playersData.player_count
    const totalClans = playersData.clan_count 
    const totalWars = playersData.wars_stored 

    document.getElementById('players_war').innerHTML = `Total Players in War: ${warPlayers}`
    document.getElementById('joins_leaves').innerHTML = `Players who joined and left clans: ${joinLeaves}`
    document.getElementById('legend_leagues').innerHTML = `Players in Legend Leagues: ${legendsLeague}`
    document.getElementById('total_players').innerHTML = `Total Clash of Clans Players: ${totalPlayers}`
    document.getElementById('total_clans').innerHTML = `Total Clash of Clans Clans: ${totalClans}`
    document.getElementById('total_wars').innerHTML = `Total Clash of Clans Clan Wars: ${totalWars}`
}

window.onload = getData;