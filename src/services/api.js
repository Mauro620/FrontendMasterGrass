const API_URL = "http://127.0.0.1:8070/";

export async function fetchData(endpoint) {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();
}
