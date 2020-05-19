export class ClientUser {
    constructor(
        private username: string,
        private discriminator: string,
        private tag: string,
        private verified: boolean,
        private id: string,
        private bot: boolean,
        private avatar: string
        ){}
}