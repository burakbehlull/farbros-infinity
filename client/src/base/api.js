import axios from "axios"

const API = axios.create({
    baseURL: '/api'
});

const apiRequest = {
    get: async (url, params = {}, config = {}) => {
	  try {
		const response = await API.get(url, { ...config, params });
		return config.responseType === 'blob' ? response : response.data;
	  } catch (error) {
		console.error('GET Error:', error);
		throw error;
	  }
	},
    post: async (url, data, config = {}) => {
        try {
            const response = await API.post(url, data, config);
            return response.data;
        } catch (error) {
            console.error('POST Error:', error);
			return {
				status: false,
				error: error
			}
            throw error;
        }
    },
    put: async (url, data, config = {}) => {
        try {
            const response = await API.put(url, data, config);
            return response.data;
        } catch (error) {
            console.error('PUT Error:', error);
			return {
				status: false,
				error: error
			}
            throw error;
        }
    },
    patch: async (url, data, config = {}) => {
        try {
            const response = await API.patch(url, data, config);
            return response.data;
        } catch (error) {
            console.error('PATCH Error:', error);
			return {
				status: false,
				error: error
			}
			
            throw error;
        }
    },
    delete: async (url, config = {}, data) => {
        try {
            const response = await API.delete(url, {
                data,
                ...config
            });
            return response.data;
        } catch (error) {
            console.error('DELETE Error:', error);
			return {
				status: false,
				error: error
			}
            throw error;
        }
    }
};

export {
    API as BASEAPI,
	apiRequest as API	
}
