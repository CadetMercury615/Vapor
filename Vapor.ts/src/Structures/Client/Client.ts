import { EventEmitter } from 'https://deno.land/std/node/events.ts';
import { WebSocketManager } from '../../Network/Gateway/WebSocketManager.ts';
import { ClientUser } from './Client.User.ts';
import { Network } from '../../Constants/Network.ts';

export class Client extends EventEmitter {
    private WS: WebSocketManager = new WebSocketManager(this)
    private _user!: ClientUser
    private _token!: string
    constructor(token: string) {
        super()
        this._token = token
        this.WS.connect(this._token)
    }
    set user(user: ClientUser) {
        this._user = user
    }
    get user() {
        return this.user
    }
    get token() {
        return this._token
    }
    public async createMessage(content : string, Channel_ID: string) {
        const data = {
            "content": content,
            "tts": false,
        }
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bot ${this._token}` }
        const res = await fetch(`${Network.API}/channels/${Channel_ID}/messages`, {
            method: "POST",
            headers,
            body: JSON.stringify(data)
        })
        const json = await res.json()
    }
    //This doesnt work :(
}