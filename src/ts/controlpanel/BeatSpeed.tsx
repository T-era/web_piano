import { State } from "../base";
import MenuDetail from "../components/MenuDetail";

interface Props {
    beatSpeedState :State<number>;
}
export default function BeatSpeed({beatSpeedState} :Props) {
    const { value, set } = beatSpeedState;
    return (
        <>
            <MenuDetail menu='テンポ'>
                <div className='beat_speed'>
                    <input type='number'
                        min={0}
                        step={0.1}
                        value={value}
                        onChange={(e) => {
                            const value  = e.target.valueAsNumber;
                            if (value === 0 || value !== value) {
                                return false;
                            } else {
                                set(value)
                            }
                        }}
                    />
                </div>
            </MenuDetail>
        </>
    )
}