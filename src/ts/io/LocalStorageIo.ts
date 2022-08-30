import { Atom } from "../sound/Player";

// ストレージのキーとして使う際のプレフィックス。
const localStorageFileContents = 'PIANO.SAVE.';
// ストレージ内のファイルの一覧を管理するための、ストレージキー。 (値としては、上のプレフィックスがない状態で持っている)
const localStorageFileList = 'PIANO.SAVE';

export interface SaveData {
    beatSpeed :number;
    instrumentName :string;
    melody :Atom[];
}

export class LocalStorageIO {
    fileNames :string[];

    constructor() {
        this.fileNames = JSON.parse(localStorage.getItem(localStorageFileList) || '[]') as string[];
    }
    autoNaming() :string {
        const autoNamePrefix = 'ななし';
        let i = 0;
        while(this.ensureEexistsFile(`${autoNamePrefix}_(${i})`)) {
            i ++;
        }
        return `${autoNamePrefix}_(${i})`;
    }
    save(name :string, data :SaveData) {
        if (! this.ensureEexistsFile(name)) {
            this.fileNames.push(name);
            localStorage.setItem(localStorageFileList, JSON.stringify(this.fileNames));
        }
        const jsonData = JSON.stringify(data);
        localStorage.setItem(nameInStorage(name), jsonData);
    }
    load(name :string) :SaveData|null {
        if (! this.ensureEexistsFile(name)) {
            return null;
        }
        const jsonData = localStorage.getItem(nameInStorage(name));
        if (jsonData === null) return null;
        return JSON.parse(jsonData) as SaveData;
    }
    ensureEexistsFile(name :string) :boolean {
        return this.fileNames.indexOf(name) !== -1;
    }
}

function nameInStorage(name :string) {
    return `${localStorageFileContents}${name}`;
}
const lsio = new LocalStorageIO();
export default lsio;