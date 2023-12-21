"use client"

import React, { useState , useCallback, useEffect, useRef} from 'react';
import styles from './questions.module.css';
import data from '../../../../../public/data.json';
import { usePathname } from 'next/navigation';
import axios from 'axios';


const useForceUpdate = () => {
  const [, setTick] = useState(0);
  return useCallback(() => setTick(tick => tick + 1), []);
}

interface PopupPosition {
  top: number;
  left: number;
}

const Quesitons = () => {
  const [word, setword] = useState<string | null>(null);
  const [questions, setquestions] = useState([{question: null, tag: null, answer: null}]);
  const [message, setMessage] = useState<string | null>(null);
  const pathname = usePathname();

  const handleSearch = async () => {
    try {
      console.log('question handleSearch 돌아가는중')
      const path = pathname.split('/');
      const word = decodeURI(path[1]);
      setword(word);
      const server = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
      const instance = '/content/questions';
      const response = await axios.post(server + instance, { word });
      console.log('response :', response.data);
      setquestions(response.data.questions);
      setMessage(response.data?.message);
    } catch (error: any) {
        console.error('error 발생 in question', error)
        setMessage(error.response?.data.message);
        }
    };

    const makeQuestions = async (question: string) => {
    try {
      console.log('searchquestion \n before of question', question)
      if (question == 'loading') {
        console.log('loading..')
        setMessage('loading')
        return
      }
      
      const path = pathname.split('/');
      const word = decodeURI(path[1]);
      setword(word);
      const server = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
      const instance = '/content/answer';
      const response = await axios.post(server + instance, { word, question });
      if (response.data) {
        const index = questions.findIndex((item) => item.question === question);
        const newQuestions = [...questions];
        newQuestions[index].answer = response.data;
        console.log('newQuestions :', newQuestions);
        setquestions(newQuestions);
      }
      setMessage(response.data?.message);
    } catch (error: any) {
      console.error('error 발생 in makeQuesiton') 
      setMessage(error.response?.data.message);
    }
    };

    useEffect(() => {
    console.log('summery 작동 시작')
    handleSearch();
    }, []);

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<{question: string, tag: string, answer: string} | null>(null); ;  
    const [popupPosition, setPopupPosition] = useState<PopupPosition | null>(null);
    const forceUpdate = useForceUpdate();
    

      
  
  const updatePopupPosition = () => { 
      let top;
    
    if (window.scrollY <175) {
      top=200;
    } else {
      top = (window.scrollY - 150);
    }
    let left;
    
    if (screen.width < 800) {
        left = (screen.width * 24/10);
    } else {
        left = 2000 ;
    }
    
    setPopupPosition({ top, left });
};
  

  const handleButtonClick = (item : any) => {
    setSelectedItem(item);
    setIsPopupVisible(true);
    forceUpdate();
    updatePopupPosition(); 
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    
  };



  return (
    <div >
      <div >
      {questions && questions.map((item, index) => (
        <React.Fragment key={index}>
          <div className={styles.center}>
          <button className={styles.styledButton} onClick={() => {
              handleButtonClick(item); 
              makeQuestions(item.question || 'loading');
            }}>
            <h5>{item.tag} 융합질문</h5>
            <p>{item.question}</p>
          </button>
          </div>
        </React.Fragment>
      ))}
      <div>
      {isPopupVisible && selectedItem && popupPosition &&(
       questions.map((item, index)=>(
          <div 
          className={styles.popup} 
          style={{
          top: `${popupPosition.top}px`,
          left: `${popupPosition.left}px`,
          transform: 'translate(-50%, -50%)',
          position: 'absolute',
          zIndex: 1000}} 
          key={item.answer}>
            <div style={{display:'flex'}}>
            <h3>ChatGPT의 답변</h3>
            <button style={{position:'absolute',right:'10px',fontSize:'20px', height:'30px', border:'none',backgroundColor:'transparent'}} onClick={handleClosePopup}>x</button>
            </div>
            <p>{selectedItem && selectedItem?.answer}</p>
         </div>
        ))
      )}
      </div>
      </div>
    </div>
  );
};

export default Quesitons;
