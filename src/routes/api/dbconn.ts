import { MongoClient, ServerApiVersion } from 'mongodb';
import { DB_USERNAME, DB_PASSWORD, DB_HOST } from '$env/static/private'
import { PUBLIC_DB_APP_NAME } from '$env/static/public'
import { decrypt } from './crypt';

const username = encodeURIComponent(decrypt(DB_USERNAME));
const password = encodeURIComponent(decrypt(DB_PASSWORD));
const db_host = encodeURIComponent(decrypt(DB_HOST));
const db_app_name = encodeURIComponent(`${PUBLIC_DB_APP_NAME}`);
const uri: string = `mongodb+srv://${username}:${password}@${db_host}/?retryWrites=true&w=majority&appName=${db_app_name}`

let client: MongoClient

export async function connectToDatabase(): Promise<MongoClient> {
    if (!client) {
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true
            },
            family: 4
        })
        await client.connect()
    }
    return client
}


