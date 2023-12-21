'use client'
import { useEffect, useState } from 'react';
import styles from '../../word.module.css'
import { usePathname } from "next/navigation";

export default function DataWord() {
    const [word, setWord] = useState<string>("");
    const pathname = usePathname();

    useEffect(() => {
        const path = pathname.split('/')
        setWord(decodeURI(path[1]));
    }, []);
    // useEffect의 기본동작은 렌더링이 끝난 후 실행되는 것이다.
    // 그런데, 무한 렌더링이 발생하기도 한다. 왜냐하면 setState를 다시 렌더링 하여 콜백함수가 실행된다.
    // 이때, 두번째 인자로 빈 배열을 넣어주면, 렌더링이 끝난 후 한번만 실행되고 끝난다.
    // 왜냐하면 useEffect의 두 번쨰 인자는 그 인자가 변경될 시 콜백함수를 실행 시키는 것인데,
    // 관찰 대상이 없으므로 걍 1회만 실행되는 것이다.

    return (
        <div>
            &nbsp;&nbsp;{word && <h1>{word}</h1>}
        </div>
    );
}