'use client';
import { useState } from 'react';
import axios from 'axios';

const AddWord = () => {
  const [word, setWord] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const handleSubmit = async () => {
    try {
      await axios.post( process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/admin/deleteWord', { word });
      setMessage('Word deleted successfully!');
      setWord('');
    } catch (error: any) {
      console.error(error);
      setMessage(error.response.data.message);
    }
  };  
  return (
    <>
      <h2>Delete a Word</h2>
      <input
        placeholder="Word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>
      <div>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default AddWord;