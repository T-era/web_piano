import { levelAll, levelWidth, octaveWidth, scoreButtonWidth, scoreSheetRowHeight } from "../../base";
import { ScoreModel } from "../../model/ScoreModel";
import { SoundContext } from "../../sound";
import { SvgG, SvgRect } from "../components/SvgTags";
import CurrentRowMark from "./CurrentRowMark";
import { NoteMark } from "./NoteMark";
import { AddPrevRowButton, RemoveRowButton } from "./RowControl";
import { ScoreSheetCell } from "./ScoreSheetCell";

interface Props {
    parent :SvgG;
    rowAt :number;
    soundContext :SoundContext;
    rowRemoving :(row :number)=>void;
    rowAdding :(row :number)=>void;
}

export class ScoreSheetRow {
    private readonly rowAt :number;
    private readonly cells :ScoreSheetCell[] = [];
    private readonly gridRect :SvgRect;
    private readonly crmController :CurrentRowMark;
    private readonly scoreModel :ScoreModel;

    constructor(scoreModel :ScoreModel, props :Props) {
        scoreModel.addSelectedRowListener((row) => {
            const isSelected = row === props.rowAt;
            if (isSelected) {
                this.gridRect.show()
                this.crmController.show();
            } else {
                this.gridRect.hide()
                this.crmController.hide();
            }
        })
        this.scoreModel = scoreModel;

        const rowG = new SvgG().addTo(props.parent);

        this.rowAt = props.rowAt;
        this.gridRect = new SvgRect(
            {
                x: 0,
                y: props.rowAt * scoreSheetRowHeight,
                width: scoreButtonWidth * 2 + octaveWidth * 4,
                height: scoreSheetRowHeight },
            ['is_selected'],
            {},
            true).addTo(rowG);


        rowG.add(
            new NoteMark({ y: props.rowAt * scoreSheetRowHeight, playARow: () => {
                return scoreModel.playARow(this.rowAt);
            }})
        );
        this.crmController = new CurrentRowMark({ y: props.rowAt * scoreSheetRowHeight, onClick: ()=> {
            return scoreModel.setSelectedRow(this.rowAt, false);
        } }).addTo(rowG);

        rowG.addAll(levelAll.map((level)=>{
            const newCell = new ScoreSheetCell(scoreModel, {
                rowAt: props.rowAt,
                levelAt: level,
                onClicked: () => {
                    this.scoreModel.putAShortSoundAt(this.rowAt, level);
                }
            });
            this.cells[level] = newCell;
            return newCell;
        }));

        if (props.rowAt > 0) {
            rowG.add(
                new AddPrevRowButton(
                    { y: props.rowAt * scoreSheetRowHeight }
                ).addListener('click', () => props.rowAdding(props.rowAt))
            );
        }
        rowG.add(
            new RemoveRowButton(
                { y: props.rowAt * scoreSheetRowHeight }
            ).addListener('click', () => props.rowRemoving(props.rowAt))
        );
    }

    select() {
        this.gridRect.show();
        this.crmController.show();
    }
    unselect() {
        this.gridRect.hide();
        this.crmController.hide();
    }
}