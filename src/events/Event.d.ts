export = Event;
declare class Event {
    cancel(): void;
    execute(): void;
    _execute(event: any): any;
}
