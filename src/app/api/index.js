import axios from "axios";
import store from "../App.store";
import config from "../env/env.config";

const instance = axios.create({
    baseURL: config.API_URL,
    timeout: 4000
});

store.subscribe(() => {
    const token = store.getState().signIn.token;

    if (token) {
        instance.defaults.headers.common['Authorization'] = 'JWT ' + token;
    } else {
        delete instance.defaults.headers.common['Authorization'];
    }

});

export const Api = instance;