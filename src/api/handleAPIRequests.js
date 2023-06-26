import { API_BASE_URL, USER_PER_PAGE, SEED } from "utils/Constants";

// make AJAX requests to fetch user data.
export const fetchUsers = async (
  url = API_BASE_URL,
  params = { results: USER_PER_PAGE, seed: SEED }
) => {
  try {
    // set url API according to the search params.
    const apiUrl = new URL(url);
    const searchParams = new URLSearchParams(params);
    apiUrl.search = searchParams.toString();

    // fetch ajax request to the provided API.
    const response = await fetch(apiUrl.toString()); // wait till the async operations will be finished.
    const data = await response.json(); // wait till the async operations will be finished.
    const users = data.results?.map((user) => ({
      id: user.login.uuid,
      name: `${user.name.title} ${user.name.first} ${user.name.last}`,
      picture: user.picture.medium,
      email: user.email,
      location: `${user.location.country}, ${user.location.city}, ${user.location.street.name}, ${user.location.street.number}`,
    }));
    console.log(users);
    return { apiResponse: "Success", fetchedUsers: users };
  } catch (error) {
    console.log("Error fetching users:", error.message);
    return { apiResponse: error.message, fetchedUsers: {} };
  }
};
