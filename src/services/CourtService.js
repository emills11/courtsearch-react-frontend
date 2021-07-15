import axios from 'axios'

const COURTS_REST_API_URL = "http://courtsearch.csproject.org:8080/api/courts"

class CourtService {

    getCourts() {
        return axios.get(COURTS_REST_API_URL)
    }
}

export default new CourtService()
