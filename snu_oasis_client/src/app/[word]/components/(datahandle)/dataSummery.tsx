"use client";
import styles from '../../word.module.css'
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
  
export default function DataSummery() {
    const [summery, setsummery] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();

    const handleSearch = async () => {
        try {
          const path = pathname.split('/')
          const word = decodeURI(path[1]);
          const server = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
          const instance = '/content/summery';
          setLoading(true);
          const response = await axios.post(server + instance, { word });
          setLoading(false);
          console.log('summery :', response.data);
          setsummery(response.data.summery);
          setMessage(response.data?.message);
        } catch (error: any) {
            console.error('error 발생 in summery')
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);
    // 수정

    return (
      <div className={styles.generalText}>
        {loading && (
          <div className={styles.centerItems}>
            <h4>검색되지 않았던 keyword네요! Chat GPT가 내용을 새롭게 만드는 중입니다... 잠시만 기다려주세요</h4>
          </div>
        )}
        &nbsp;{summery && <p>{summery}</p>}
      </div>
    );
}