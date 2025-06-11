const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`);
}
