const api = import.meta.env.VITE_API_BASE_URL;

export const getCurrentUser = async () => {
  const res = await fetch(`${api}/users/current`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};
