import '../pug/index.scss';
import { initClickHandler } from './view/keyboard/ClickHandler';
import { KeyboardContext } from './view/keyboard/KeyboardContext';
import { headerInit } from './view/header';
import { ScoreSheet } from './view/score/ScoreSheet';
import { ScoreModel } from './model/ScoreModel';
import { soundContext } from './sound';
import { ScoreModelKeyListener } from './model/ScoreModelKeyListener';
import { initToolTip } from './view/components/WithToolTip';
import { MusicSetting } from './model/MusicSetting';

const rootDom = document.getElementById('root') as HTMLDivElement;
(() => {
    const musicSetting = new MusicSetting();
    soundContext.getPlayer(musicSetting, 0);
    const scoreModel = new ScoreModel(musicSetting, rootDom.querySelector('.sheet') as HTMLDivElement, soundContext);
    const scoreModelKeyListener = new ScoreModelKeyListener(scoreModel);
    const scoreSheet = new ScoreSheet(scoreModel);
    const keyboardContext = new KeyboardContext(scoreModel);

    initClickHandler(scoreModel, keyboardContext);
    rootDom.addEventListener('keydown', (e) => {
        keyboardContext.keyDownListener(e);
        keyboardContext.keyToneShiftListener(e);
        scoreModelKeyListener.onKeypressed(e);
    });
    rootDom.addEventListener('keyup', (e) => { keyboardContext.keyUpListener(e) });

    initToolTip();
    headerInit(scoreModel);
    scoreSheet.addNewRow();
    scoreSheet.selectRowAt(0);
})();

export {}