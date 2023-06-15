// make AJAX requests to fetch user data.
export function fetchUsersFromAPI(url, params) {
  const apiUrl = new URL(url);
  const searchParams = new URLSearchParams(params);

  apiUrl.search = searchParams.toString();

  return fetch(apiUrl.toString())
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => {
      console.log(error);
      return [];
    });
}
