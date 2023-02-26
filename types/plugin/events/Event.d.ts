declare class Event {
  cancel(): void;
  execute(): void;
  postExecute(): void;
}