import WithToolTip from "../../components/WithToolTip";
import { exportToJson } from "../../io/Text";
import { IoModel } from "../../viewmodels";
import { ExportToJsonIcon } from "./IOIcons";

import './LoadDialog.scss';

interface Props {
    ioModel :IoModel;
}
export default function ExportToJson({ ioModel } :Props) {
    return (
        <WithToolTip toolTipLabel={<ExportToJsonIcon/>}>
            <textarea defaultValue={exportToJson(ioModel.export())} />
        </WithToolTip>
    )
}
