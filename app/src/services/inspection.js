const axios = require('axios')
const API_URL = 'http://localhost:3001/api'

const post = inspection => {

    if (!inspection) {
        console.log('Inpection not defined')
    }

    return axios.post(`${API_URL}/inspections`, {inspection})
        .then(newInspection => newInspection)
        .catch(err => err)
}

const get = id => {

    return axios.get(`${API_URL}/inspections/${id}`)
        .then(inspection => inspection)
        .catch(err => err)
}

const getAll = () => {
    
    return axios.get(`${API_URL}/inspections`)
            .then(inspections => inspections)
            .catch(err => err)
}

const edit = (id, {status, date}) => {
    return axios.put(`${API_URL}/inspections/${id}`, {status, date})
            .then(inspection => inspection)
            .catch(err => err)
}

module.exports = {
    post,
    get,
    getAll,
    edit
}