// api/new-meetup
import { MongoClient } from 'mongodb';

async function handler(req, res) {
    console.log('new meetup js')
    if(req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://daninch:Spagh00ps@mindhorn0.pri4c8e.mongodb.net/');

        const db = client.db();

        const meetupCollection = db.collection('meetups');

        const result = await meetupCollection.insertOne(data);

        client.close();

        res.status(201).json({ message: 'Funky Chicken' });
    }
};

export default handler;