import { createRef, ReactElement, useEffect, useState } from 'react';

import Keyboard from './keyboard';
import ControlPanel from './controlpanel';
import ScoreSheet from './scoresheet/ScoreSheet';
import TitleBar from './header/TitleBar';
import lsio from './io/LocalStorageIo';

import { organ } from './sound/instruments';
import { KeyboardToneShift, scoreSheetRowHeight, wrap } from './base';
import { Model, newScoreRow, KeyListener, IoModel, SpeakerModel, PlaySuspender } from './viewmodels';

import './Overall.scss'


export default function Overall() :ReactElement {
    let ktsState = wrap(useState(KeyboardToneShift.b));
    let scoreContentsState = wrap(useState([newScoreRow()]));
    let selectedScoreRowState = wrap(useState({ row: 0, forceFocus: true }));
    let instrumentNameState = wrap(useState(organ.title));
    let playSuspenderState = wrap(useState(null as PlaySuspender|null));
    let beatSpeedState = wrap(useState(0.2));
    let titleState = wrap(useState('未定義'));
    let saveDataTitlesState = wrap(useState(lsio.fileNames));

    let scoreSheetRef = createRef<HTMLDivElement>();

    const model = new Model(
        ktsState,
        scoreContentsState,
        selectedScoreRowState,
        instrumentNameState.value);
    const soundModel = new SpeakerModel(
        playSuspenderState,
        scoreContentsState.value,
        selectedScoreRowState.value,
        instrumentNameState.value,
        beatSpeedState.value);
    const ioModel = new IoModel(
        titleState,
        saveDataTitlesState,
        scoreContentsState,
        instrumentNameState,
        beatSpeedState);
    const keyListener = new KeyListener(
        model,
        scoreContentsState,
        ktsState.value,
        selectedScoreRowState.value);

    useEffect(() => {
        const { value: selectedScoreRow } = selectedScoreRowState;
        if (selectedScoreRow.forceFocus) {
            scoreSheetRef.current?.scrollTo(0, (selectedScoreRow.row - 3) * scoreSheetRowHeight);
        }
    })
    return (<>
        <header>
            <TitleBar titleState={titleState} />
        </header>
        <main tabIndex={-1} onKeyDown={keyListener.keyboardEventHandler.bind(keyListener)}>
            <div className='scroll_container'>
                <div className='sheet' ref={scoreSheetRef}>
                    <ScoreSheet
                        scoreContents={scoreContentsState.value}
                        selectedScoreRow={selectedScoreRowState.value.row}
                        onRowSelected={(row) => model.setRowWithFocus({ row, forceFocus: true })}
                        onPlayingChord={soundModel.makeASoundChord.bind(soundModel)}
                        onPutASoundAt={(row, level) => model.putASoundAt(row, level, false)}/>
                </div>
                <div className='keyboard'>
                    <Keyboard kts={ktsState.value}
                        onToneChanging={model.onToneChanging.bind(model)}
                        onPutASound={model.putASound.bind(model)}/>
                </div>
            </div>
            <div className='controlpanel'>
                <ControlPanel
                    selectedInstrumentName={instrumentNameState.value}
                    playSuspender={playSuspenderState.value}
                    beatSpeed={beatSpeedState.value}
                    onSelectedInstrumentNameChanging={instrumentNameState.set}
                    onPlayAll={soundModel.playAll.bind(soundModel)}
                    onPlayBelow={soundModel.playBelow.bind(soundModel)}
                    onBeatSpeedChanging={(value :number) => beatSpeedState.set(value)}
                    saveDataTitles={lsio.fileNames}
                    onLoading={(loadingTitle)=>ioModel.load(loadingTitle)}
                    onSaving={()=>{ioModel.save()}}
                    />
            </div>
        </main>
    </>);
}
