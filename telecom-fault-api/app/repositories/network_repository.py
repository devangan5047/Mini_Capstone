from core.database import network_collection

async def create_network(data):
    return await network_collection.insert_one(data)

async def get_networks():
    return await network_collection.find().to_list(100)
