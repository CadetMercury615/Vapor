import { properties } from './Properties.ts';

export const Hello = {
    op: 10,
    d: null
}
export const HeartBeat = {
    op: 1,
    d: null
}
export const Identify = {
    op: 2,
    d: {
        token: '',
        properties: properties
    }
}