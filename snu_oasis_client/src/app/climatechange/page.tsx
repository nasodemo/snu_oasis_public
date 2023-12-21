import styles from './climatechange.module.css'
import { BsFillCheckCircleFill } from 'react-icons/bs';
import ClimatePageslider from './climatecomponent/climatepageslider/climatepageslider';
import data from '../../../public/data.json'



export default function Lightmain() {
    const check=data.check
    return (
        <div>
            <br/>
            <div className={styles.center}>
            <div className={styles.maxwidth}>
            <div className={styles.iconWithText}>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <p className={styles.heading}>기후변화 </p>      
            {check ? (
                    <BsFillCheckCircleFill className={styles.bluecheck} />
                ) : (
                    <BsFillCheckCircleFill className={styles.redcheck} />
                )}
            </div>

            <p className={styles.generalText}>
            &nbsp;{data.summary} 
           </p>

            </div>
            </div>
            <hr/>
                <ClimatePageslider></ClimatePageslider>
            <br/>
            <br/>
        </div>
    ); 
};
