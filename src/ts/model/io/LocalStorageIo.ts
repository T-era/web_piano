import { WithListener } from "../../Listener";
import { exportToJson, importFromJson, SaveData } from "./util";

// ストレージのキーとして使う際のプレフィックス。
const localStorageFileContents = 'PIANO.SAVE.';
// ストレージ内のファイルの一覧を管理するための、ストレージキー。 (値としては、上のプレフィックスがない状態で持っている)
const localStorageFileList = 'PIANO.SAVE';

class LocalStorageIO {
    private readonly  _fileNames :WithListener<string[]>;

    constructor() {
        const list = JSON.parse(localStorage.getItem(localStorageFileList) || '[]') as string[];
        this._fileNames = new WithListener(list);
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
            this.fileNames.value.push(name);
            this.fileNames.fireEvent();
            localStorage.setItem(localStorageFileList, JSON.stringify(this.fileNames.value));
        }
        const jsonData = exportToJson(data);
        localStorage.setItem(nameInStorage(name), jsonData);
    }
    load(name :string) :SaveData|null {
        if (! this.ensureEexistsFile(name)) {
            return null;
        }
        const jsonData = localStorage.getItem(nameInStorage(name));
        if (jsonData === null) return null;
        return importFromJson(jsonData);
    }
    ensureEexistsFile(name :string) :boolean {
        return this.fileNames.value.indexOf(name) !== -1;
    }
    addFileNamesListener(f :(a:string[])=>void) {
        this.fileNames.addListener(f);
    }
    get fileNames() {
        return this._fileNames;
    }
}

function nameInStorage(name :string) {
    return `${localStorageFileContents}${name}`;
}

const lsio = new LocalStorageIO();
export default lsio;