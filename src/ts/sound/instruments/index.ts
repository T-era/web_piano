import organ from './organ';
import xylophone from './xylophone';
import piano from './piano';
import metallophone from './metallophone';
import { guiter } from './guiter';

export interface Instrument{
    title :string;
    (i :number, freq :number) :number;
    gain :number[];
};
const all :{[name:string] :Instrument} = {};
[guiter, piano, organ, xylophone, metallophone].forEach((item) => {
    all[item.title] = item;
});
const defaultInstrument = piano;
export {
    defaultInstrument, all,
};