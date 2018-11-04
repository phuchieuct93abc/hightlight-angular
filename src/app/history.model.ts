export class History {
    key: string
    constructor(public id:string,public code: string) {
        this.key = this.code.split('\n')[0];
    }
}