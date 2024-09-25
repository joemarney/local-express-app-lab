const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 3000;

// DUMMY DATABASE
const songs = [
  { id: 1, title: "Black Roses", artist: "Barrington Levy" },
  { id: 2, title: "Part-Time Lover", artist: "Stevie Wonder" },
  { id: 3, title: "Let's Groove", artist: "Earth, Wind & Fire" },
  { id: 4, title: "He's the Greatest Dancer", artist: "Sister Sledge" },
];

// MIDDLEWARE
app.use(morgan("dev"));
app.use(express.json()); // converts into JS

// INDEX
app.get("/songs", (req, res) => {
  try {
    return res.send(songs);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
});
// SHOW
app.get("/songs/:songId", (req, res) => {
  try {
    const songId = Number(req.params.songId);
    const retrievedSong = songs.find((song) => {
      return song.id === songId;
    });
    if (retrievedSong) {
      return res.send(retrievedSong);
    } else {
      return res.status(404).send("Song couldn't be found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
});
// CREATE
app.post("/songs", (req, res) => {
  try {
    req.body.id = songs.length + 1;
    songs.push(req.body);
    return res.send(req.body);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
});
// UPDATE
app.put("/songs/:songId", (req, res) => {
  try {
    const songId = Number(req.params.songId);
    const songIndex = songs.findIndex(({ id }) => id === songId);
    if (songId >= 0 && songId <= songs.length) {
      songs.splice(songIndex, 1, req.body);
      req.body.id = songId;
      return res.send(`Song ${songId} updated!`);
    } else {
      return res
        .status(404)
        .send(`Song you wanted to update could not be found`);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
});
// DELETE
app.delete("/songs/:songId", (req, res) => {
  try {
    const songId = Number(req.params.songId);
    const songIndex = songs.findIndex(({ id }) => id === songId);
    if (songId >= 0 && songId <= songs.length) {
      songs.splice(songIndex, 1);
      return res.send(`Song id: ${songId} deleted.`);
    } else {
      return res
        .status(404)
        .send(`Song you wanted to delete could not be found`);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
});
// 404 HANDLER
app.use("*", (req, res) => {
  return res.status(404).send("Route Not Found");
});

// SERVER
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
