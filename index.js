const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY; 
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.sendFile('public/players.html', { root: __dirname });
});


app.get('/players', async (req, res) => {
  console.log('Attempting to GET all players');

  const { data, error } = await supabase
    .from('players')
    .select();

  if (error) {
    console.log('Error:', error);
    res.status(500).send(error);
    return;
  }

  res.send(data);
});

app.post('/players', async (req, res) => {
  console.log('Adding player');
  console.log('Request:', req.body);

  const playerName = req.body.player_name;
  const clanName = req.body.clan_name;
  const townHall = req.body.town_hall;
  const league = req.body.league;
  const trophies = req.body.trophies;


  const { data, error } = await supabase
    .from('players')
    .insert({
      player_name: playerName,
      clan_name: clanName,
      town_hall: townHall,
      league: league,
      trophies: trophies
    })
    .select();

  if (error) {
    console.log('Error:', error);
    res.status(500).send(error);
    return;
  }

  res.send(data);
});


app.listen(port, () => {
  console.log('App is available on port:', port);
});
