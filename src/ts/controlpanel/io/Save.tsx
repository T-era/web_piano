import { useState } from "react";
import { wrap } from "../../base";
import WithToolTip from "../../components/WithToolTip";
import { IoModel } from "../../viewmodels";
import { SaveIcon } from "./IOIcons";
import NamePlate from "./NamePlate";

import './Save.scss';

interface Props {
    ioModel :IoModel;
}
export default function Save({ ioModel } :Props) {
    const isOpenState = wrap(useState(false));
   return (
        <WithToolTip toolTipLabel={<SaveIcon/>} modalIsOpenState={isOpenState}>
            <span className='menuitem save'>Save as <NamePlate titleState={ioModel.title}/></span>
            <button onClick={() => ioModel.save()}>OK</button>
        </WithToolTip>
   );
}