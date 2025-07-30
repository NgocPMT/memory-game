export default async function fetchCards() {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=12&api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const cards = await response.json();
  return cards.map((card) => {
    return { id: card.id, url: card.url };
  });
}
