const { MongoClient } = require('mongodb')
require('dotenv').config({path: "config.env"})

const uri = process.env.MONGODB_URI;

async function main() {
    const client = new MongoClient(uri)

    try {
        await client.connect()
        const collections = await client.db("codecommunity").collections()
        collections.forEach(collection => {console.log(collection.s.namespace.collection)})
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

main()