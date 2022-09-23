import { scoreSheetRowHeight } from "../../base";
import { ScoreModel } from "../../model/ScoreModel";
import { AutomationPlayer } from "../../sound";

type Suspender = ()=>void;
export function menuPlayInit(scoreModel :ScoreModel) {
    let suspender :Suspender|undefined = undefined;
    const playAll = document.getElementById('play_all')!;
    const playBelow = document.getElementById('play_below')!;
    const playView = document.getElementById('play_view')!;
    const rec = document.getElementById('play_rec')!;
    const suspend = document.getElementById('suspend')!;
    playAll.addEventListener('click',  playIfCan(() => {
        const ap = new AutomationPlayer(scoreModel, stopped);
        return () => ap.requestStop();
    }));
    playBelow.addEventListener('click',  playIfCan(() => {
        const ap = new AutomationPlayer(scoreModel, stopped, {
            startRow: scoreModel.selectedRow
        });
        return () => ap.requestStop();
    }));
    playView.addEventListener('click',  playIfCan(() => {
        const sheetDom = document.getElementsByClassName('sheet')[0];
        const top = sheetDom.scrollTop;
        const bottom = top + sheetDom.clientHeight;
        const topRowInView = Math.floor(top / scoreSheetRowHeight);
        const bottomRowInView = Math.ceil(bottom / scoreSheetRowHeight);
        const startRow = Math.max(topRowInView, 0);
        const endRow = Math.min(bottomRowInView, scoreModel.scoreItems.length - 1);

        const ap = new AutomationPlayer(scoreModel, stopped, { startRow, endRow });
        return () => ap.requestStop();
    }));
    rec.addEventListener('click', playIfCan(() => {
        const ap = new AutomationPlayer(scoreModel, stopped, { withRec: true });
        return () => ap.requestStop();
    }))
    suspend.addEventListener('click',  () => {
        if (suspender) {
            suspend.setAttribute('visibility', 'hidden');
            suspender();
            suspender = undefined;
        }
    });

    function stopped() {
        suspender = undefined;
        suspend.setAttribute('visibility', 'hidden')
    }
    function playIfCan(f :()=>Suspender) {
        return () => {
            if (! suspender) {
                suspend.setAttribute('visibility', 'visible');
                suspender = f();
            }
        }
    }
}