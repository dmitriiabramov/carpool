export default class Event {
    constructor(payload) {
        this.name = payload.name;
        this.date = payload.date;
        this.time = payload.time;
        this.description = payload.description;
        this.id = payload.id;
        this.address = payload.address;
    }
}
