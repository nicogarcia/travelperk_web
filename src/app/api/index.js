import axios from "axios";
import store from "../store/app.store";

const instance = axios.create({
    baseURL: 'http://localhost:8000/v1',
    timeout: 4000
});

store.subscribe(() => {
    const token = store.getState().login.token;
    console.log('token = ' + token);

    if (token) {
        instance.defaults.headers.common['Authorization'] = 'JWT ' + token;
    } else {
        delete instance.defaults.headers.common['Authorization'];
    }

});

export const Api = instance;