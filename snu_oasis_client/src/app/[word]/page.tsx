import styles from './word.module.css'
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Pageslider from './components/(pageslider)/pageslider';
import data from '../../../public/data.json'
import DataWord from './components/(datahandle)/dataWord';
import DataSummery from './components/(datahandle)/dataSummery';


export default function Lightmain() {
    const check=0
    return (
        <div>
            <br/>
            <div className={styles.center}>
            <div className={styles.maxwidth}>
            <div className={styles.iconWithText}>
            
            <DataWord></DataWord>
                        
            {check ? (
                    <BsFillCheckCircleFill className={styles.bluecheck} />
                ) : (
                    <BsFillCheckCircleFill className={styles.redcheck} />
                )}
            </div>

            {/* <p className={styles.generalText}> */}
            {/* &nbsp;{data.summary} */}
            {/* </p> */}
            <DataSummery></DataSummery>
            {/* 수정 for Back */}
            </div>
            </div>
            <hr/>
            <Pageslider></Pageslider>
            <br/>
            <br/>
        </div>
    ); 
};
