'use client';
import { useState } from 'react';
import axios from 'axios';

export default function DeleteAll () {
  const [message, setMessage] = useState<string>('');
  const [password, setWord] = useState<string>('');
  const handleSubmit = async () => {
    try {
      const response = await axios.post( process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/admin/resetAll',  { password } );
      setMessage('deleted successfully!');
    } catch (error: any) {
      console.error(error);
      setMessage(error?.response.data);
    }
  };  
  return (
    <>
      <h2>Delete ALL</h2>
      <button onClick={handleSubmit}>RESET</button>
      <input
        placeholder="Password"
        value={password}
        onChange={(e) => setWord(e.target.value)}
      />
      <div>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};