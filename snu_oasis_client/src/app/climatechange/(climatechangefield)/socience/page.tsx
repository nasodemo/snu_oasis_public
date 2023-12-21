import data from '../../../../../public/data.json'
import styles from '../climatechangefield.module.css'
import {GiPlainCircle} from 'react-icons/gi'
import Uploadcommentshow from '../../../[word]/[field]/(fieldcomponent)/(uploadcomment)/uploadcommentshow'


export default function fieldpage8(){
    const comments=[
        {username: 'username', comment: data.description.socience.comment}
    ]
    const description=[
        {title:data.description.socience.contents.title1, content:data.description.socience.contents.content1},
        {title:data.description.socience.contents.title2, content:data.description.socience.contents.content2},
        {title:data.description.socience.contents.title3, content:data.description.socience.contents.content3},
        {title:data.description.socience.contents.title4, content:data.description.socience.contents.content4},
        {title:data.description.socience.contents.title5, content:data.description.socience.contents.content5}
    ]

    return (
        <div>
            <div className={styles.container}>
                <h2>{data.description.socience.field}</h2>
                {description.map((item, index) => (
                    <div key={index}>
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.paragraph}>{item.content}</p>
                <br/>
                </div>
                ))}

            </div>
            <hr/>
        
            {comments.map((item, index) => (
                <div className={styles.commentContainer } key={index}>
                    <div className={styles.flexContainer}>
                        <GiPlainCircle className={styles.icon}/>
                        &nbsp;
                        <h3 className={styles.username}>{item.username}</h3>
                    </div>
                    <p>{item.comment}</p>
                </div>
            ))}
            <Uploadcommentshow/>
        </div>
    );
}
