from repositories.network_repository import create_network, get_networks

async def add_network_service(data):
    return await create_network(data)

async def get_network_service():
    return await get_networks()