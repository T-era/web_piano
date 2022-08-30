interface Props {
    onSaving :()=>void;
}
export default function Save({ onSaving } :Props) {
   return <button onClick={() => onSaving()}>Save</button>
}