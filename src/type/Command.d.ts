import Server from "../../../types/Server";
import { Client } from "frog-protocol";

export interface ArgOptions {
	name: string;
	type: "int" | "float" | "value" | "wildcard_int" | "wildcard_target" | "operator" | "command_operator" | "target" | "file_path" | "integer_range" | "equipment_slots" | "string" | "block_position" | "position" | "message" | "raw_text" | "json" | "block_states" | "command";
	optional?: boolean;
}

export interface Options {
	name: string;
	description: string;
	aliases: string[];
	arguments?: ArgOptions[];
	maxArg: number;
	minArg: number;
}

export interface Command {
	data: Options;
	run(server: Server, player: Client, args: Array): void;
	throwError(player: Client): void;
}
