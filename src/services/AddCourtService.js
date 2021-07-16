import axios from 'axios'

const ADD_COURTS_REST_API_URL = "/api/add_courts"

class AddCourtService {

    getNewCourts() {
        return axios.get(ADD_COURTS_REST_API_URL)
    }

    createNewCourt(address, coordinates) {
        const body = {
            'address': address,
            'location': {
                'type': 'Point',
                'coordinates': coordinates
            }
        }

        return axios.post(ADD_COURTS_REST_API_URL, body)
    }
}

export default new AddCourtService()
