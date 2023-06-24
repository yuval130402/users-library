import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_BASE_URL, MAX_USERS, SEED } from "Constants";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "features/users/usersSlice";

// make AJAX requests to fetch user data.
const HandleAPIRequests = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersStart());
    fetchUsers(API_BASE_URL, { results: MAX_USERS, seed: SEED});
  }, []);

  const fetchUsers = async (url, params) => {
    try {
      // set url API according to the search params.
      const apiUrl = new URL(url);
      const searchParams = new URLSearchParams(params);
      apiUrl.search = searchParams.toString();

      // fetch ajax request to the provided API.
      const response = await fetch(apiUrl.toString());
      const data = await response.json();
      const users = data.results?.map((user) => ({
        id: user.login.uuid,
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        picture: user.picture.medium,
        email: user.email,
        location: `${user.location.country}, ${user.location.city}, ${user.location.street.name}, ${user.location.street.number}`,
      }));
      // send action to userReducer in order to update the global state.
      dispatch(fetchUsersSuccess(users));
    } catch (error) {
      console.log("Error fetching users:", error.message);
      // send action to userReducer in order to update the global state.
      dispatch(fetchUsersFailure(error.message));
    }
  };

  return null; // No UI rendering in this component
};

export default HandleAPIRequests;
