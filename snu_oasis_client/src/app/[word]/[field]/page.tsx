import data from '../../../../public/data.json'
import styles from './field.module.css'
import {GiPlainCircle} from 'react-icons/gi'
// import userdata from '../../../../public/userdata.json'
import Uploadcommentshow from './(fieldcomponent)/(uploadcomment)/uploadcommentshow'
import DataDescription from './(fieldcomponent)/dataDescription'

export default function fieldpage(){
    // const comments=[
    //     {username: userdata.user1.username, comment: userdata.user1.comment},
    //     {username: userdata.user2.username, comment: userdata.user2.comment}
    // ]

    return (
        <div>
        <DataDescription/>
        <hr/>
        
{/*         {comments.map((item, index) => (
            <div className={styles.commentContainer } key={index}>
                <div className={styles.flexContainer}>
                    <GiPlainCircle className={styles.icon}/>
                    &nbsp;
                    <h3 className={styles.username}>{item.username}</h3>
                </div>
                <p>{item.comment}</p>
            </div>
        ))} */}
        <Uploadcommentshow/>
        </div>
    );
}
