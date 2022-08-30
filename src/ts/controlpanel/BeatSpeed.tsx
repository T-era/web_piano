interface Props {
    beatSpeed :number
    onChanging :(beatSpeed :number)=>void;
}
export default function BeatSpeed({beatSpeed, onChanging} :Props) {
    return (
        <input type='number'
            min={0}
            step={0.1}
            value={beatSpeed}
            onChange={(e) => {
                const value  = e.target.valueAsNumber;
                if (value === 0 || value !== value) {
                    return false;
                } else {
                    onChanging(value)
                }
            }}
        />
    )
}