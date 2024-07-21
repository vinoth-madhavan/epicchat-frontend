
const config = {
    development: {
      API_URL: 'http://localhost:3001/api/chat',
    },
    production: {
      API_URL: 'https://api.vinothmadhavan.com/api/chat',
    },
  };
  
  const getConfig = () => {
    return config[process.env.NODE_ENV] || config.development;
  };
  
  export default getConfig;
  