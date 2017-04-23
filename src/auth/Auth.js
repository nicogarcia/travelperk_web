class Auth {
    constructor() {
        this.authenticated = false;
    }

    isAuthenticated() {
        return this.authenticated;
    }

    authenticate() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.authenticated = true;
                resolve();
            }, 10)
        });
    }
}

const instance = new Auth();

export default instance;