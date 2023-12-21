import React, { useState, useEffect } from 'react';
import {  AiOutlineClose } from 'react-icons/ai'; 
import styles from './uploadcomment.module.css'
import {GiPlainCircle} from 'react-icons/gi'

type UploadcommentProps = {
  onSave: (data: string) => void;
};

type uploadcommentEntry = {
  id: number;
  value: string;
};

const Uploadcomment: React.FC<UploadcommentProps> = ({ onSave }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputHistory, setInputHistory] = useState<uploadcommentEntry[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('inputHistory');
    if (savedHistory) {
      setInputHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inputHistory', JSON.stringify(inputHistory));
  }, [inputHistory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSaveClick = () => {
    const lastEntry = inputHistory[inputHistory.length - 1];
    const newId = lastEntry ? lastEntry.id + 1 : 1;
  
    const newuploadcommentEntry: uploadcommentEntry = { id: newId, value: inputValue };
    setInputHistory([...inputHistory, newuploadcommentEntry]);
    setInputVisible(false);
    setInputValue('');
  };

  const handleClearClick = () => {
    setInputHistory([]);
    localStorage.removeItem('inputHistory');
  };


  const handleEntryDelete = (id: number) => {
    const newHistory = inputHistory.filter(entry => entry.id !== id);
    setInputHistory(newHistory);
  };

  return (
    <div>
      <div>

        {inputHistory.map((entry) => (
          <div className={styles.entryStyle} key={entry.id}>
                <div style={{display:'flex', lineHeight:'0.7'}}>
                <GiPlainCircle style={{color:'purple', width:'45px', height:'45px'}}/>
                &nbsp;<h3>username</h3>
                </div>
                <p>{entry.value}</p>
           
            <span className={styles.deleteEntryButton} onClick={() => handleEntryDelete(entry.id)}>
              <AiOutlineClose size={10} /> 
            </span>
          </div>
        ))}
        <h3 className={styles.entryStyle}>댓글 작성하기</h3>
        {!inputVisible && (
          <div>
            <textarea
              id='textarea2'
              rows={4}
              value={inputValue}
              onChange={handleInputChange}
              className={styles.textareaStyle}
            />
            <div className={styles.placesidetoside}>
                <div>
                <button 
                    type="button"
                    title='question'
                    id='question'
                    onClick={handleSaveClick}
                    className={styles.saveButtonStyle}
                >
                    댓글 저장
                </button>
                </div>
                &nbsp;                 
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploadcomment;
