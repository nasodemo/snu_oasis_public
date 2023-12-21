'use client';
import axios from "axios";
import { useState } from "react";

export default function Questionshandel() {
    const [message, setMessage] = useState<string>('');
    const [word, setWord] = useState<string>('');
    const [questions, setquestions] = useState([{question: null, tag: null, answer: null}]);
    const handleSubmit = async () => {
      try {
        const response = await axios.post( process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/admin/rawQuestions',  {word} );
        setquestions(response.data.questions);
      } catch (error: any) {
        console.error(error);
        setMessage(error?.response.data);
      }
    }; 
    const handleDelete = async (index: number) => {
        try {
            const response = await axios.post( process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/admin/deleteQuestion',  {word, index} );
            setquestions(response.data.questions);
        } catch (error: any) {
            console.error(error);
            setMessage(error?.response.data);
        }
    }
    return (
    <div>
        <h3>Question list for target word</h3>
        <br/>
        
        <input
        placeholder="Target Word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        />
        <button onClick={handleSubmit}>검색</button>
        {questions && questions.map((item, index) => (
            <form key={item.question}>
            <div>
                <h5>{item.tag} 융합질문</h5>
                <p>{item.question}</p>
                <p>{item?.answer}</p>
                <p>{index}</p>
            </div>
            <button
                onClick={(e) => {
                e.preventDefault();
                handleDelete(index);
                }}
            >
                삭제
            </button>
            <hr/>
            </form>
        ))}
        <div>
        {message && <p>{message}</p>}
        </div>
    </div>
    );
}