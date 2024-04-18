const { MongoClient } = require("mongodb");
const express = require("express");
const path = require('path');
const cors = require('cors');
const { rmSync } = require("fs");
var bodyParser = require('body-parser')

require('dotenv').config()

const app = express();
const uri = `mongodb+srv://itsseanl:${process.env.REACT_APP_MONGODB_PASS}@squadsync.6q7sw9l.mongodb.net/?retryWrites=true&w=majority&appName=squadsync`;

app.use(bodyParser.json());
app.post('/api/sendmessage', (req, res) => {
    const date = new Date().toISOString();
    console.log(req.body);
    // req.body ={
    //     "content" : "this is a test message",
    //     "timestamp" : date,
    //     "author" : "seanl"
    // };
    msgToServer(req.body);

    //TODO: insertone to mongodb 
    //then - connect to textbox in react to send
    const message = req.body
    res.json(message);
});

app.use(cors());
app.get('/api/messagestream', async (req, res) => {
    res.status(200)
    .set({ "Content-Type"  : "text/event-stream"
         , "Cache-Control" : "no-cache"
         , "Connection"    : "keep-alive"
         , "Content-Encoding" : "none"
         , "Access-Control-Allow-Origin": "*"
         })
    
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    await client.connect();
    const dbName = "Messages";
    const collectionName = "messages_home";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const changeStream = collection.watch();
let msg = '';
    changeStream.on('change', next => {
        console.log(next);
        console.log('changed');
        res.write(`data: ${JSON.stringify(next)} \n\n `);
    });
   
});
app.use(cors());
app.get('/api/messagehistory', async (req, res) => {
  const client = new MongoClient(uri, {useUnifiedTopology: true});
  await client.connect();
  const dbName = "Messages";
  const collectionName = "messages_home";
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  try {
    //find, newest to oldest, limit 50
    const cursor = await collection.find().sort({timestamp:-1}).limit(50);
    let msgs = [];
    await cursor.forEach(msg => {
      // console.log(`${msg}`);
      // console.log(`${msg.message.time}: ${msg.message.content}`);
      const message = {
        "fullDocument": {
          "author": msg.author,
          "content": msg.content,
          "timestamp": msg.timestamp
        }
    };
      console.log(message);
      msgs.push(message);
    });
    client.close();
    msgs.reverse()

    res.json(JSON.stringify(msgs));
    // add a linebreak
  } catch (err) {
    console.error(`Something went wrong trying to find the documents: ${err}\n`);
  }
});

const PORT = process.env.PORT || 5000;

async function msgToServer(msg){
    const client = new MongoClient(uri);
    await client.connect();
    const dbName = "Messages";
    const collectionName = "messages_home";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    try {
        const cursor = await collection.insertOne(msg);

    } catch (err) {
        console.error(`Something went wrong trying to find the documents: ${err}\n`);
    }
    client.close();
}
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// async function run() {
  // TODO:
  // Replace the placeholder connection string below with your
  // Altas cluster specifics. Be sure it includes
  // a valid username and password! Note that in a production environment,
  // you do not want to store your password in plain-text here.
 
  // The MongoClient is the object that references the connection to our
  // datastore (Atlas, for example)
//   const client = new MongoClient(uri);

  // The connect() method does not attempt a connection; instead it instructs
  // the driver to connect using the settings provided when a connection
  // is required.
//   await client.connect();

  // Provide the name of the database and collection you want to use.
  // If the database and/or collection do not exist, the driver and Atlas
  // will create them automatically when you first write data.
//   const dbName = "Messages";
//   const collectionName = "messages_home";

 
  // Create references to the database and collection in order to run
  // operations on them.
//   const database = client.db(dbName);
//   const collection = database.collection(collectionName);

//   const emojiDBName = "Emojis";
//   const emojiCollectionName = "emojis";
//   const emojiDB = client.db(emojiDBName);
//   const emojiCollection = emojiDB.collection(emojiCollectionName);
   /*
   *  *** INSERT DOCUMENTS ***
   *
   * You can insert individual documents using collection.insert().
   * In this example, we're going to create four documents and then
   * insert them all in one call with collection.insertMany().
   */

//   const recipes = [
//     {
//       name: "elotes",
//       ingredients: [
//         "corn",
//         "mayonnaise",
//         "cotija cheese",
//         "sour cream",
//         "lime",
//       ],
//       prepTimeInMinutes: 35,
//     },
//     {
//       name: "loco moco",
//       ingredients: [
//         "ground beef",
//         "butter",
//         "onion",
//         "egg",
//         "bread bun",
//         "mushrooms",
//       ],
//       prepTimeInMinutes: 54,
//     },
//     {
//       name: "patatas bravas",
//       ingredients: [
//         "potato",
//         "tomato",
//         "olive oil",
//         "onion",
//         "garlic",
//         "paprika",
//       ],
//       prepTimeInMinutes: 80,
//     },
//     {
//       name: "fried rice",
//       ingredients: [
//         "rice",
//         "soy sauce",
//         "egg",
//         "onion",
//         "pea",
//         "carrot",
//         "sesame oil",
//       ],
//       prepTimeInMinutes: 40,
//     },
//   ];

//   try {
//     const insertManyResult = await collection.insertMany(recipes);
//     console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
//   } catch (err) {
//     console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
//   }

  /*
   * *** FIND DOCUMENTS ***
   *
   * Now that we have data in Atlas, we can read it. To retrieve all of
   * the data in a collection, we call Find() with an empty filter.
   * The Builders class is very helpful when building complex
   * filters, and is used here to show its most basic use.
   */

//   const findQuery = { message: { $_id: 0 } };

//   try {
//     const cursor = await collection.find({});
//     await cursor.forEach(recipe => {
//       console.log(`${recipe.message.time}: ${recipe.message.content}`);
//     });
//     // add a linebreak
//     console.log();
//   } catch (err) {
//     console.error(`Something went wrong trying to find the documents: ${err}\n`);
//   }

//   try {
//     const cursor = await emojiCollection.find({});
//     await cursor.forEach(recipe => {
//       console.log(`${recipe.emoji.name}: ${recipe.emoji.content}`);
//     });
//     // add a linebreak
//     console.log();
//   } catch (err) {
//     console.error(`Something went wrong trying to find the documents: ${err}\n`);
//   }

  // We can also find a single document. Let's find the first document
  // that has the string "potato" in the ingredients list.
//   const findOneQuery = { ingredients: "potato" };

//   try {
//     const findOneResult = await collection.findOne(findOneQuery);
//     if (findOneResult === null) {
//       console.log("Couldn't find any recipes that contain 'potato' as an ingredient.\n");
//     } else {
//       console.log(`Found a recipe with 'potato' as an ingredient:\n${JSON.stringify(findOneResult)}\n`);
//     }
//   } catch (err) {
//     console.error(`Something went wrong trying to find one document: ${err}\n`);
//   }

  /*
   * *** UPDATE A DOCUMENT ***
   *
   * You can update a single document or multiple documents in a single call.
   *
   * Here we update the PrepTimeInMinutes value on the document we
   * just found.
   */
//   const updateDoc = { $set: { prepTimeInMinutes: 72 } };

  // The following updateOptions document specifies that we want the *updated*
  // document to be returned. By default, we get the document as it was *before*
  // the update.
//   const updateOptions = { returnOriginal: false };

//   try {
//     const updateResult = await collection.findOneAndUpdate(
//       findOneQuery,
//       updateDoc,
//       updateOptions,
//     );
//     console.log(`Here is the updated document:\n${JSON.stringify(updateResult.value)}\n`);
//   } catch (err) {
//     console.error(`Something went wrong trying to update one document: ${err}\n`);
//   }

  /*      *** DELETE DOCUMENTS ***
   *
   *      As with other CRUD methods, you can delete a single document
   *      or all documents that match a specified filter. To delete all
   *      of the documents in a collection, pass an empty filter to
   *      the DeleteMany() method. In this example, we'll delete two of
   *      the recipes.
   */


//   const deleteQuery = { name: { $in: ["elotes", "fried rice"] } };
//   try {
//     const deleteResult = await collection.deleteMany(deleteQuery);
//     console.log(`Deleted ${deleteResult.deletedCount} documents\n`);
//   } catch (err) {
//     console.error(`Something went wrong trying to delete documents: ${err}\n`);
//   }

  // Make sure to call close() on your client to perform cleanup operations
//   await client.close();
// }
// run().catch(console.dir);