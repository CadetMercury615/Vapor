import * as WS from 'https://deno.land/std/ws/mod.ts'
import { connectWebSocket } from 'https://deno.land/std/ws/mod.ts';
import {OPCASE} from '../../Constants/OPCASE.ts'
import { Identify } from '../../Constants/Payload.ts';
import { Client } from '../../Structures/Client/Client.ts';
import { Payload } from '../../Interfaces/Payload.ts';
import { EventEmitter } from 'https://deno.land/std/node/events.ts';
import {Network} from '../../Constants/Network.ts'
export class WebSocketManager extends EventEmitter {
    private WS!: WS.WebSocket;
    private Interval: number = 0
    constructor(private client: Client) {
        super();
      }
      async connect(token: string) {
        try {
          this.WS = await connectWebSocket(Network.GATEWAY);
          for await (const msg of this.WS) {
            const payload: Payload = JSON.parse(msg.toString());
            const { t: event, op, d } = payload;
            switch (op) {
              case OPCASE.HELLO:
                const { heartbeat_interval } = payload.d;
                this.Interval = this.heartbeat(heartbeat_interval);
                await this.identify(token);
                break;
              case OPCASE.HEARTBEAT_ACK:
                console.log('Gateway Heartbeat ACK');
                break;
            }
            if (event) {
              try {
                const { default: module } = await import(`../../Events/${event.toUpperCase()}.ts`);
                module(this.client, payload);
              } catch (err) {
                console.log(err);
              }
            }
          }
        } catch (err) {
          console.log(err);
          return err;
        }
      }
    
      private heartbeat(ms: number): number {
        return setInterval(() => {
          console.log('Sending Heartbeat.');
          this.WS.send(JSON.stringify(this.heartbeat));
        }, ms);
      }
    
      private async identify(token: string) {
        Identify.d.token = token;
        this.WS.send(JSON.stringify(Identify));
      }
    }