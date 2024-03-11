const { MongoClient } = require('mongodb');
const MONGODB_URI = 'mongodb://localhost:27017?replicaSet=rs0';
const dbName = 'grocerystore';
const collectionName = 'drinks';

const client = new MongoClient(MONGODB_URI);

const pipeline = [
  {
    $match: {
      $and: [
        { 'updateDescription.updatedFields.quantity': { $lt: 5 } },
        { operationType: 'update' }
      ]
    },
  }
];

let resumeToken;

const options = {
  fullDocument: 'updateLookup',
  ...(resumeToken ? { resumeAfter: resumeToken } : {}),
}

let changeStream;
async function run() {
  try {
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    changeStream = collection.watch(pipeline, options);

    console.log('\nListening for `update` events where quantity is less than 5 \n');

    for await (const change of changeStream) {
      console.log(JSON.stringify(change, null, 2)+ '\n');
      console.log(`Will order more ${change.fullDocument.name}, as quantity is now ${change.updateDescription.updatedFields.quantity}!`);
    }
    
  } catch(e) {
    console.error(e);
  }
}

run().catch(console.error);
