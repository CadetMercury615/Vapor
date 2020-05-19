import { ClientUser } from "../Client/Client.User.ts";
import { EventEmitter } from 'https://deno.land/std/node/events.ts';
const API = "https://discord.com/api/v6"
export default class Message extends EventEmitter {
    public CHANNEL_ID!: string
    constructor(
        public content: string,
        private Channel_id: string,
        private author: ClientUser,
        private id: string,
        ){super()}

    public get channel_id(){
        return this.CHANNEL_ID
    }
}