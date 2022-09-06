import { createRef, ReactElement, useEffect, useMemo, useState } from 'react';

import Keyboard from './keyboard';
import ControlPanel from './controlpanel';
import ScoreSheet from './scoresheet/ScoreSheet';
import lsio from './io/LocalStorageIo';

import { organ } from './sound/instruments';
import { KeyboardToneShift, newScoreRow, scoreSheetRowHeight, wrap } from './base';
import { Model, KeyListener, IoModel, SpeakerModel, PlaySuspender } from './viewmodels';

import './Overall.scss'
import { ScoreModel } from './viewmodels/ScoreModel';

export default function Overall() :ReactElement {
    const tilteUndefined = lsio.autoNaming();
    let ktsState = wrap(useState(KeyboardToneShift.b));
    let scoreContentsState = wrap(useState([newScoreRow()]));
    let selectedScoreRowState = wrap(useState({ row: 0, forceFocus: true }));
    let instrumentNameState = wrap(useState(organ.title));
    let playSuspenderState = wrap(useState(null as PlaySuspender|null));
    let beatSpeedState = wrap(useState(0.2));
    let titleState = wrap(useState(tilteUndefined));
    let saveDataTitlesState = wrap(useState(lsio.fileNames));

    let scoreSheetRef = createRef<HTMLDivElement>();

    const model = useMemo(
        () => new Model(
            ktsState,
            selectedScoreRowState),
        [ktsState.value, scoreContentsState.value]);
    const scoreModel = useMemo(
        () => new ScoreModel(
            model,
            scoreContentsState,
            selectedScoreRowState,
            instrumentNameState.value),
        [model, scoreContentsState.value, selectedScoreRowState.value, instrumentNameState.value]);
    const speakerModel = useMemo(
        () => new SpeakerModel(
            playSuspenderState,
            scoreContentsState.value,
            selectedScoreRowState.value,
            instrumentNameState.value,
            beatSpeedState.value),
        [playSuspenderState.value, scoreContentsState.value, selectedScoreRowState.value, instrumentNameState.value, beatSpeedState.value]);
    const ioModel = useMemo(
        () => new IoModel(
            titleState,
            saveDataTitlesState,
            scoreContentsState,
            instrumentNameState,
            beatSpeedState),
        [titleState.value, saveDataTitlesState.value, scoreContentsState.value, instrumentNameState.value, beatSpeedState.value]);
    const keyListener = useMemo(
        () => new KeyListener(
            model,
            scoreModel,
            scoreContentsState,
            ktsState.value,
            selectedScoreRowState.value),
        [model, scoreModel, scoreContentsState.value, ktsState.value, selectedScoreRowState.value]);

    useEffect(() => {
        // 譜面の強制スクロール
        const { value: selectedScoreRow } = selectedScoreRowState;
        if (selectedScoreRow.forceFocus) {
            scoreSheetRef.current?.scrollTo(0, (selectedScoreRow.row - 3) * scoreSheetRowHeight);
        }
    });
    return (<>
        <header>
        </header>
        <main>
            <div className='control_panel'>
                <ControlPanel
                    selectedInstrumentNameState={instrumentNameState}
                    beatSpeedState={beatSpeedState}
                    speakerModel={speakerModel}
                    playSuspender={playSuspenderState.value}
                    ioModel={ioModel}
                    saveDataTitles={lsio.fileNames}
                    titleState={titleState}
                    />
            </div>
            <div className='scroll_container' tabIndex={-1} onKeyDown={keyListener.keyboardEventHandler.bind(keyListener)}>
                <div className='sheet' ref={scoreSheetRef}>
                    <ScoreSheet
                        scoreContents={scoreContentsState.value}
                        selectedScoreRow={selectedScoreRowState.value.row}
                        onRowSelected={(row) => model.setRowWithFocus({ row, forceFocus: true })}
                        speakerModel={speakerModel}
                        model={model}
                        scoreModel={scoreModel} />
                </div>
                <div className='keyboard'>
                    <Keyboard kts={ktsState.value}
                        model={model}
                        scoreModel={scoreModel}/>
                </div>
            </div>
        </main>
    </>);
}
