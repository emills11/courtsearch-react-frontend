import axios from 'axios'

const KEYS_REST_API_URL = "/api/keys"

class KeyService {

    getKeyByType(type) {
        return axios.get(KEYS_REST_API_URL, { params: { type: type }})
    }
}

export default new KeyService()
