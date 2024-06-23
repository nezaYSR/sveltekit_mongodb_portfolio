import { json } from '@sveltejs/kit'
import { connectToDatabase } from './dbconn'
import type { Profile } from './model'

export async function get_profile() {
    const client = await connectToDatabase()
    try {
        const database = client.db('portfolio_001')
        const collection = database.collection('profile_skill')
        const data = await collection.find({})
            .toArray()

        return data
    } catch (error) {
        console.error("Error fetching data: ", error)
        throw error
    }
}

export async function post_profile(receivedData: Profile) {
    const client = await connectToDatabase()
    const database = client.db('portfolio_001')
    const collection = database.collection('profile_skill')

    try {
        const insertQuery = await collection
            .insertOne(receivedData);

            let result:string
            if(insertQuery.acknowledged){
                result="Profile successfully posted"
            }
        return insertQuery.acknowledged
    } catch (error) {
        console.error("Error fetching data: ", error)
        throw error
    }
}
