import { Client } from '../Structures/Client/Client.ts';
import { Payload } from '../Interfaces/Payload.ts';
import Message from '../Structures/Messages/Message.ts';
export default function(client: Client, payload: Payload) {
    var message = new Message(
        payload.d.content,
        payload.d.channel_id,
        payload.d.author,
        payload.d.id,
    )
    client.emit('messageCreate', payload.d)   
}