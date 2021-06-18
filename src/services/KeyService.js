import axios from 'axios'

const KEYS_REST_API_URL = "http://localhost:8080/api/keys"

class KeyService {

    getKeyByType(type) {
        return axios.get(KEYS_REST_API_URL, { params: { type: type }})
    }
}

export default new KeyService()
