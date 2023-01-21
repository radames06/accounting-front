export class Account {
    constructor(
        public id: number,
        public name: string, 
        public initial: number,
        public balance: number, 
        public user: string) {}
}

export class Movement {
    constructor(
        public id?: number, 
        public movementDate?: Date,
        public tiers?: string,
        public amount?: number, 
        public accountId?: number
    ) {}
}

export class Category {
    constructor(
        public id: number,
        public name: string
    ) {}
}

export class Subcategory {
    constructor(
        public id: number, 
        public name: string,
        public categoryId: number
    ) {}
}

export class User {
    constructor(
        public username: string, 
        private _token: string,
        private _tokenExpirationDate: Date
    ) {}

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}