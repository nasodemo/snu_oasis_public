"use client";
import styles from "../../word.module.css";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
type Description = {
  title: string;
  content: string;
};

// 문자열을 "\n"으로 분할하여 각 줄을 처리합니다.
function stringToJson(s: string) {
  const lines = s.split("\n");
  const descriptions: Description[] = [];

  for (let line of lines) {
    // 각 줄에서 ":"를 찾아 title과 content를 분할합니다.
    const splitIndex = line.indexOf(":");
    if (splitIndex !== -1) {
      const title = line.substring(0, splitIndex).trim();
      const content = line.substring(splitIndex + 1).trim();
      descriptions.push({ title, content });
    }
  }
  return descriptions;
}

export default function DataDescription() {
  const [descriptions, setdescriptions] = useState<Description[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [word, setWord] = useState<string | null>(null);
  const [catagory, setCatagory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleSearch = async () => {
      try {
        // 아래의 코드는 뭔가 골치아픈데, 차후 해결해야할 문제임.
        const path = pathname.split("/");
        const word = decodeURI(path[1]);
        setWord(word);
        const catagory = decodeURI(path[2]);
        setCatagory(catagory);
        // console.log('word :', word, 'catagory :', catagory);

        // backend call part
        const server = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
        const instance = "/content/description";
        setLoading(true);
        const response = await axios.post(server + instance, { word, catagory });
        setLoading(false);
        // console.log('response :', response.data);
        const refinedData = stringToJson(response.data);
        setdescriptions(refinedData);
        // console.log('descriptions :', descriptions);
        setMessage(response.data?.message);
      } catch (error: any) {
        console.error(error);
        setMessage(error.response?.data.message);
      }
    };
    handleSearch();
  }, []);
  // 수정

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        {catagory} 관점에서 {word}에 대한 내용
      </h2>
      {loading && (
        <div className={styles.centerItems}>
          <h3>
            Chat GPT가 {word}에 대해 {catagory} 내용을 만드는 중입니다...
          </h3>
          <h4>+ GPT가 내용을 생성하기에 사실과 다르거나, 다른 학문 분야의 내용이 섞일 수 있습니다</h4>
        </div>
      )}
      {descriptions.map((item, index) => (
        <div key={index}>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.paragraph}>{item.content}</p>
          <br />
        </div>
      ))}
    </div>
  );
}
