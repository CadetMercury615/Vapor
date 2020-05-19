import { Client } from '../Client/Client.ts';
import { Payload } from '../../Interfaces/Payload.ts';
export class Channel {
    public type!: number;
    constructor(client: Client, payload: Payload) {
    }
}