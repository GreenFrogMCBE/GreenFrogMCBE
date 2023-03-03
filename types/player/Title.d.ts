/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
declare enum Titles {
  TITLE = "title",
  SUBTITLE = "subtitle",
  ACTIONBAR = "actionbar",
}

declare class Title {
  private type: Titles;
  private text: string;
  private fadeintime: number;
  private fadeouttime: number;
  private staytime: number;

  setType(type: Titles): void;
  setText(text: string): void;
  setFadeinTime(fadein: number): void;
  setStayTime(staytime: number): void;
  setFadeoutTime(fadeout: number): void;
  getType(): Titles;
  getText(): string;
  getFadeinTime(): number;
  getStayTime(): number;
  getFadeoutTime(): number;
  send(client: Object): void;
}

export = Title;
