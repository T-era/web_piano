import { ScoreModel } from "./ScoreModel";

export class ScoreModelKeyListener {
    private readonly scoreModel :ScoreModel
    constructor(scoreModel :ScoreModel) {
        this.scoreModel = scoreModel;
    }
    onKeypressed(e :KeyboardEvent) {
        if (e.key === 'Enter') {
            this.scoreModel.addNewRow(! e.shiftKey);
        } else if (e.key === 'ArrowUp') {
            this.scoreModel.scrollUp();
        } else if (e.key === 'ArrowDown') {
            this.scoreModel.scrollDown();
        } else if (e.key === ' ') {
            this.scoreModel.continueRow();
        }
    }
}
