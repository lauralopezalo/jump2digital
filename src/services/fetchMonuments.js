export const fetchMonuments = async () => {
  const response = await fetch(
    "https://hackaton-map-back.vercel.app/monuments"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Monuments");
  }
  return response.json();
};
