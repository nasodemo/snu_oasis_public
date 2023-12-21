import {AiOutlineLoading} from 'react-icons/ai'
import styles from './loading.module.css'

export default function Loading() {
    return (
        <AiOutlineLoading className={styles.animation}></AiOutlineLoading>
    )
  }