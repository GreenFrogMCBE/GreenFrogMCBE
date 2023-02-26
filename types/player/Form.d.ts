interface IFormAction {
  type: string;
  text: string;
  placeholder?: string;
  options?: JSON;
  min?: number;
  max?: number;
  step?: number;
}

declare class Form {
  type: any;
  title: string;
  buttons: Array<{ text: string; image?: { type: string; data: string } }>;
  id: number;
  actions: IFormAction[];

  addAction(action: IFormAction): void;
  addInput(text: string, placeholder?: string): void;
  addText(text: string): void;
  addDropdown(text: string, options: JSON): void;
  addToggle(text: string): void;
  addSlider(text: string, min: number, max: number, step?: number): void;
  send(client: Object): void;
}

export default Form;
