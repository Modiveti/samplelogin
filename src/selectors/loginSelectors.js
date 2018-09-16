
export const selectAppContainer = (state) => {
    return state.containers.loginReducer;
}

// Need to use .get, beucase reducer defaulState was created by using ImmutableJS
export const selectUserInputData = (state) => {
    const myReducerData = selectAppContainer(state);
    return myReducerData.get('userDetails')
}
