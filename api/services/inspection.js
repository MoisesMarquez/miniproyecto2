const { Inspection } = require('../models')

const save = inspection => {
    inspection.status = 'Pendiente'
    return Inspection.create(inspection)
        .then(newInspection => newInspection)
        .catch(err => err)
}

const getAll = () => {
    return Inspection.find()
        .then(inspections => inspections)
        .catch(err => err)
}

const get = (id) => {
    return Inspection.findById(id)
        .then(inspection => {
            if(!inspection){
                return null
            }
            return inspection
        })
        .catch(err => err)
}

const put = (id, obj) => {
    const { date, status } = obj
    return Inspection.findById(id)
        .then(inspection => {
            inspection.date = date
            inspection.status = status
            return inspection.save()
        })
        .catch(err => err)
}

module.exports = {
    save,
    get,
    getAll,
    put
}