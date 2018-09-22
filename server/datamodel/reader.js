var dataModel = require("./model");
exports.reader = function(req, res) {
  const symptoms = req.body.symptoms;
  let complicationName = null;
  if (symptoms.length >= 3) {
    dataModel.complications.forEach(element => {
      complicationName = getComplicationName(element, symptoms);
      if (complicationName != "none") {
        res.status(200).json({ complication: complicationName });
      }
    });
    if (complicationName == null) {
      res.status(500).json({ error: "no complication found" });
    }
  } else res.status(500).json({ error: "please include at least 3 symptoms" });
};
function getComplicationName(modelObject, symptoms) {
  let count = 0;
  modelObject.symptoms.forEach(el => {
    if (symptoms.includes(el)) {
      count = count + 1;
    }
  });
  if (count >= 3) {
    return modelObject.name;
  } else {
    return "none";
  }
}

exports.getAllSymptoms = function(req, res) {
  let outPutArr = [];
  dataModel.complications.forEach(element => {
    element.symptoms.forEach(e => {
      if(outPutArr.indexOf(e)==-1){
        outPutArr.push(e);
      }
    })
  });
  res.status(200).json(({"symptoms" : outPutArr.sort()}));
};
