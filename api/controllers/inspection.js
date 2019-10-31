const inspectionService = require('../services/inspection')

const post = (req, res) => {

    const { inspection } = req.body
    inspectionService.save(inspection)
        .then(newInspection => {
            if(!newInspection) {
                return res.status(500).send('Error saving inspection')
            }
            return res.status(201).send(newInspection)            
        })
}

const getAll = (req, res) => {

    inspectionService.getAll()
        .then(inspections => {
            if(!inspections) {
                return res.status(500).send('error trying fetch inspections')
            }
            return res.status(200).send(inspections)
        })
}

const get = (req, res) => {

    const { id } = req.params
    inspectionService.get(id)
        .then(inspection => {
            if(!inspection) {
                return res.status(404).send('inspection not found')
            }

            return res.status(200).send(inspection)
        })
        .catch(() => res.status(500).send('Internal server error geting inspection'))
}

const put = (req, res) => {

    const { id } = req.params
    const { date, status } = req.body
    inspectionService.put(id, {date, status} )
        .then(inspection => {
            if(!inspection) {
                return res.status(404).send('inspection not found')
            }

            return res.status(201).send(inspection)
        })
        .catch(() => res.status(500).send('Internal server error geting inspection'))
}


module.exports = {
    post,
    getAll,
    get, 
    put
}
