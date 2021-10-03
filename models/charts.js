const mongoose = require('mongoose');
const pointsModel = require('./points');

    const chartsSchema = new mongoose.Schema({
            name: String,
            series: [pointsModel.schema],
    });
    
    const chartsModel = mongoose.model('chartsModel', chartsSchema);
    
    module.exports = chartsModel;