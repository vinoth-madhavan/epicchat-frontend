
const config = {
    development: {
      CHAT: 'http://localhost:3001/api/chat',
      BOTS_LIST: 'http://localhost:3001/api/botsList',
    },
    production: {
      CHAT: 'https://api.vinothmadhavan.com/api/chat',
      BOTS_LIST: 'https://api.vinothmadhavan.com/api/botsList',
    },
  };
  
  const getConfig = () => {
    return config[process.env.NODE_ENV] || config.development;
  };
  
  export default getConfig;
  