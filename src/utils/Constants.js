export const API_BASE_URL = "https://randomuser.me/api/";
export const USER_PER_PAGE = 10;
export const MAX_USERS = 100;
export const MAX_PAGE = Math.ceil(MAX_USERS / USER_PER_PAGE);
export const SEED = "abc"; // same seed always generate the same set of users

export const Urls = {
    //AddUser: "/add-user",
    Browse: "/browse",
    Favorites: "/favorites",
    Home: "/",
}