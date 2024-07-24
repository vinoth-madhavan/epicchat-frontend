import axios from "axios";
import getConfig from '../config';

const API_URL = getConfig();

const api = {
    fetchBotsList: async () => {
        try {
            let response = await axios.get(API_URL.BOTS_LIST);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch bots list:', error);
            throw error;
        }
    },

    fetchChatResponse: async () => {
        try {
            let response = await axios.get(API_URL.CHAT);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch chat:', error);
            throw error;
        }
    }
};

export default api;