import { Client } from './src/Structures/Client/Client.ts';
import  Message  from './src/Structures/Messages/Message.ts';
import { WebSocketManager } from './src/Network/Gateway/WebSocketManager.ts';
const API = "https://discord.com/api/v6"
const client = new Client("TOKEN & json isnt working with deno for sum reason");
var WS = new WebSocketManager(client)
WS.connect(client.token)
client.on('ready', async() => {
    console.log(`Vapor.ts client logged`)
})
client.on('messageCreate', async(message : Message) => {
    if(message.content === '?help') {
        await client.createMessage("Welcome\n?help - Get help on commands", message.channel_id)
        return;
    }
})
