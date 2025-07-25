const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://vscode-internal-575-dev.dev01.cloud.kavia.ai:3001";

// PUBLIC_INTERFACE
export async function fetchOffers(params = {}) {
  let url = API_URL + "/offers";
  const query = [];
  if (params.category) query.push(`category=${encodeURIComponent(params.category)}`);
  if (query.length) url += `?${query.join("&")}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error("Failed to fetch offers");
  return await resp.json();
}

// PUBLIC_INTERFACE
export async function fetchCategories() {
  const resp = await fetch(API_URL + "/categories");
  if (!resp.ok) throw new Error("Failed to fetch categories");
  return await resp.json();
}
