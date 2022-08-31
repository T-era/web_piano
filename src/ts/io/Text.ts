import { Atom } from "../sound/Player";
import { SaveData } from "./util";



export function exportToJson(data :SaveData) :string {
    return JSON.stringify(data);
}
export function importFromJson(jsonData :string) :SaveData|null {
    return JSON.parse(jsonData) as SaveData;
}
