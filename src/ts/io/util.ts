import { Atom } from "../sound/Player";

export interface SaveData {
    beatSpeed :number;
    instrumentName :string;
    melody :Atom[];
}
