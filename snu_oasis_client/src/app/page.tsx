import Searchbar from "./(Searchbar)/Searchbar";
import styles from './page.module.css';
import Link from "next/link";
import Image from "next/image";


export default function HomePage() {
    return (
        <>
            <div style={{ display:'grid', justifyItems: 'center'}}>
            <div style={{marginTop:'60px', marginBottom:'15px', height:'50px', display:'flex', position:'relative', placeItems:'center'}}>
                <p className={styles.title}>OASIS</p>&nbsp;&nbsp;
                <Image src={'/logo.png'} alt='' width={40} height={40} style={{left:0}}></Image>
            </div>
            <Searchbar />
                <br/>
                <div style={{marginTop:'300px'}}>
                    <p style={{fontSize:'11pt',fontFamily:'맑은고딕', color:'gray',  margin:'0'}}>OASIS에서 지적 갈증을 해소하세요!</p>
                </div>
            </div>
            
        </>
    );
}

