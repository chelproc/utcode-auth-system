import Axios from "axios";

export const state = () => ({
    counter: 0,
    userData: {},
    processingDialog: {
        show: false,
        completed: false,
        error: ""
    }
});
export const mutations = {
    setUserData(state, userData) {
        state.userData = userData;
    },
    increment(state) {
        state.counter++;
    }
};
export const actions = {
    async fetchUserData(context) {
        const response = await Axios.get("/api/client/profile/info");
        context.commit("setUserData", response.data);
    }
}