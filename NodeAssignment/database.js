const mongoDb = require("mongodb").MongoClient;
const mongodb = require("mongodb");
const url = `mongodb+srv://Stallion:Stallion@cluster0-uwrvf.mongodb.net/test?retryWrites=true&w=majority`;
let collection = "";
let collectionBand = "";
const dbname = "Todo";
let band

function connect() {
  mongoDb.connect(
    url,
    { useNewUrlParser: true },
    { useUnifiedTopology: true },
    function(err, client) {
      console.log("connected sucessfully to the server");
      const db = client.db(dbname);
      collection = db.collection("user");
      collectionBand = db.collection("Band");
      
    }
  );
}
function registerUser(email, password,bandArray) {
  collection.insertOne({ email: email, password: password,band:bandArray }, function(
    err,
    result
  ) {
    if (!err) {
      console.log(result);
    }else{
    console.log(result);
    }
  });
}
function Login(email, password, callback) {
  collection.findOne({ email: email }, function(err, result) {
    if (!err) {
      console.log(result);
      callback(result);
    }
  });
}
function insertDocs(tasks,user, cb) {
  collectionBand.insertOne({ a: tasks,user:new mongodb.ObjectID(user)}, function(err, result) {
    if (!err) {
      console.log(result);
      cb(result.insertedId);
    }
  });
}
function deleteDocs(index, func) {
  collectionBand.deleteOne({ _id: new mongodb.ObjectID(index) }, function(
    err,
    result
  ) {
    if (!err) {
      console.log(result.insertedId);

      func(result);
    } else {
      console.log("err");
    }
  });
}
function update(index, val, funct) {
  collectionBand.updateOne(
    { _id: new mongodb.ObjectID(index) },
    { $set: { a: val } },
    function(err, result) {
      if (!err) {
        funct();
      } else {
        console.log("err");
      }
    }
  );
}
function getTask(user,items) {
  collectionBand.find({user:new mongodb.ObjectID(user)}).toArray(function(err, result) {
    items(result);
  });
}
module.exports = {
  connect,
  registerUser,
  Login,
  insertDocs,
  getTask,
  deleteDocs,
  update
};
