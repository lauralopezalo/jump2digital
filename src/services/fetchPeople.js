export const fetchPeople = async () => {
  const response = await fetch("https://hackaton-map-back.vercel.app/users");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
