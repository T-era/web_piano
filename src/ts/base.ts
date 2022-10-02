export const keyboardShiftWidth = 40;
export const octaveWidth = 252;    // 鍵盤幅は /7, スコアシートは /12
export const levelInAOctave = 12;
export const keyboardWhiteWidth = octaveWidth / 7;
export const keyboardBlackWidth = keyboardWhiteWidth * .7;
export const scoreButtonWidth = octaveWidth / levelInAOctave;
export const scoreSideButtonWidth = keyboardShiftWidth / 2;
export const scoreSheetRowHeight = 15;
export const aLevel = Math.pow(2, 1.0 / levelInAOctave);
export const octaves = 4;  // 4オクターブ
export const levelWidth = levelInAOctave * octaves; // 対応している音域。48

const _levelAll = [];
for (let i = 0; i < levelWidth; i ++) {
    _levelAll.push(i)
}
export const levelAll = _levelAll

export const audioContext :AudioContext = new AudioContext();

export enum ScoreItem {
    Start,
    Continue,
    None,
}
export enum HighLighting {
    ON,
    OFF,
    unknown,
}

export function newScoreRow() :ScoreItem[] {
    return levelAll.map(() => ScoreItem.None);
}