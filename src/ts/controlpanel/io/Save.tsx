interface Props {
    onSaving :()=>void;
}
export default function Save({ onSaving } :Props) {
   return (
        <div className='menuitem' onClick={() => onSaving()}>Save</div>
   );
}