import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    isLoading: false,
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsersStart(state) {
            state.isLoading = true;
            state.error = null;
        },

        fetchUsersSuccess(state, action) {
            state.users = action.payload;
            state.error = null;
        },
        
        fetchUsersFailure(state, action) {
            state.users = [];
            state.error = action.payload;
        },

        updateUser(state, action) {
            const { id, name, email, location } = action.payload;
            const user = state.users.find((user) => user.id === id);
            if (user) {
              user.name = name;
              user.email = email;
              user.location = location;
            }
        },
          
        addUser(state, action) {
            state.users.push(action.payload);
        },
          
        deleteUser(state, action) {
            const id = action.payload;
            state.users = state.users.filter((user) => user.id !== id);
        },
    },
});

export const {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    updateUser,
    addUser,
    deleteUser,
} = usersSlice.actions;


export default usersSlice.reducer;