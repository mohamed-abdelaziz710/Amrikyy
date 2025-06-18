require('dotenv').config();

const { Client } = require('@notionhq/client');
const admin = require('firebase-admin');

let notionClient;
let firebaseDb;

const provider = process.env.DATA_PROVIDER;
if (!provider) {
  console.warn('DATA_PROVIDER not set. Tool sync disabled.');
}

if (provider === 'notion') {
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    console.warn('Notion configuration missing.');
  } else {
    notionClient = new Client({ auth: process.env.NOTION_API_KEY });
  }
} else if (provider === 'firebase') {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON && process.env.FIREBASE_DATABASE_URL) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
    firebaseDb = admin.firestore();
  } else {
    console.warn('Firebase configuration missing.');
  }
} else if (provider) {
  console.warn(`Unsupported DATA_PROVIDER: ${provider}`);
}

async function fetchAITools() {
  if (process.env.DATA_PROVIDER === 'notion' && notionClient) {
    const databaseId = process.env.NOTION_DATABASE_ID;
    const response = await notionClient.databases.query({ database_id: databaseId });
    return response.results.map(page => ({
      id: page.id,
      name: page.properties.Name?.title?.[0]?.plain_text || '',
      description: page.properties.Description?.rich_text?.[0]?.plain_text || '',
      url: page.properties.URL?.url || ''
    }));
  }

  if (process.env.DATA_PROVIDER === 'firebase' && firebaseDb) {
    const snapshot = await firebaseDb.collection('tools').get();
    return snapshot.docs.map(doc => doc.data());
  }

  return [];
}

module.exports = { fetchAITools };
