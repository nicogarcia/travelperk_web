const developmentConfig = {
    API_URL: 'http://localhost:8000/v1'
};

const productionConfig = {
    API_URL: 'https://api.travelperk.tk/v1'
};

let config;

if (process.env.NODE_ENV === 'production') {
    config = productionConfig;
} else {
    config = developmentConfig;
}

export default config;