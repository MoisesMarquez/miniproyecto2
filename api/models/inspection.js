const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InspectionSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        leader: {
            type: String,
            required: true
        },
        artifactOwner: {
            type: String,
            required: true
        },
        artifact: {
            type: String,
            required: true
        },
        inspectors: [
            {
                type: String
            }
        ],
        date: {
            type: String
        },
        status: {
            type: String
        }
    }
)

module.exports = mongoose.model('Inspection', InspectionSchema)