import { Client } from '../Structures/Client/Client.ts';
import { Payload } from '../Interfaces/Payload.ts';
import { ClientUser } from '../Structures/Client/Client.User.ts';
export default function(client: Client, payload: Payload) {
    const { user } = payload.d
    client.user = new ClientUser(
        user.username,
        user.discriminator,
        user.username + "#" + user.discriminator,
        user.verified,
        user.id,
        user.bot,
        user.avatar
    );
    client.emit('ready')
}