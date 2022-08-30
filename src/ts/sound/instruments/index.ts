import organ from './organ';
import xylophone from './xylophone';
import piano from './piano';

export interface Instrument{
    title :string
    (i :number, freq :number, len:number) :number
};
const all :{[name:string] :Instrument} = {};
[piano, organ, xylophone].forEach((item) => {
    all[item.title] = item;
});
export {
    organ, xylophone, piano,
    all
};