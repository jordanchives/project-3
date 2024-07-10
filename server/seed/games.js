require('dotenv').config({ path: __dirname + '/../.env' });

const baseURL = "https://api.igdb.com/v4";
let accessToken = null;
let tokenExpiration = 0; // Timestamp for token expiry
console.log(process.env.CLIENT_ID, process.env.CLIENT_SECRET); // Debug log

async function fetchToken() {
  console.log(process.env.CLIENT_ID, process.env.CLIENT_SECRET); // Debug log
  const tokenResponse = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("Token Response:", tokenResponse); // Debug log
  const tokenData = await tokenResponse.json();
  accessToken = tokenData.access_token;
  tokenExpiration = Date.now() + tokenData.expires_in * 1000;
}

async function getToken() {
  if (!accessToken || Date.now() >= tokenExpiration) {
    await fetchToken();
  }
  return accessToken;
}

async function getGames() {
  const token = await getToken();
  console.log("Token:", token); // Debug log
  const gamesResponse = await fetch(`${baseURL}/games`, {
    method: "POST",
    headers: {
      "Client-ID": process.env.CLIENT_ID,
      Authorization: `Bearer ${token}`,
    },
    body: `fields name, storyline, summary, cover.url, release_dates.platform, release_dates.date, platforms, hypes, genres.name;
    sort hypes desc;
    limit 100;
    where (release_dates.platform=(6)) & (release_dates.date < 1720550778) & (total_rating_count > 5);`,
  });
  const gamesData = await gamesResponse.json();
  console.log("Raw Games Data:", gamesData); // Debug log

  return formatData(gamesData);
}

function formatData(data) {
  return data.map((game) => {
    const pcReleaseDateObj = game.release_dates.find(
      (date) => date.platform === 6
    );
    const pcReleaseDate = pcReleaseDateObj ? new Date(pcReleaseDateObj.date * 1000) : null;
    const coverUrl = game.cover ? `https:${game.cover.url.replace('/t_thumb/', '/t_cover_big_2x/')}` : null;
    const genres = game.genres ? game.genres.map((genre) => genre.name) : [];
    const price =
      Math.floor(Math.random() * 50) + 10 + (Math.random() > 0.5 ? 0.49 : 0.99);

    return {
      name: game.name,
      storyline: game.storyline || "",
      summary: game.summary || "",
      cover: coverUrl,
      releaseDate: pcReleaseDate,
      genres: genres,
      price: price,
    };
  });
}

function getGamesData() {
  return getGames();
}

module.exports = getGamesData;
