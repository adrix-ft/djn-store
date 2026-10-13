async function test() {
  const games = [
    'Grand Theft Auto V',
    'God of War',
    'Hogwarts Legacy',
    'Red Dead Redemption II',
    'Cyberpunk 2077',
    'Resident Evil 4',
    'FIFA 23',
    'EA SPORTS FC 24'
  ];

  for (const game of games) {
    const url = 'https://store.steampowered.com/api/storesearch/?term=' + encodeURIComponent(game) + '&l=english&cc=US';
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        const item = data.items[0];
        const boxArt = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${item.id}/library_600x900.jpg`;
        const headerArt = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${item.id}/header.jpg`;
        const headBox = await fetch(boxArt, { method: 'HEAD' });
        const imgUrl = headBox.status === 200 ? boxArt : headerArt;
        console.log(`[MATCH] ${game} -> AppID ${item.id} (${item.name}) -> ${imgUrl}`);
      } else {
        console.log(`[NO MATCH] ${game}`);
      }
    } catch (e) {
      console.error(game, e.message);
    }
  }
}

test();
