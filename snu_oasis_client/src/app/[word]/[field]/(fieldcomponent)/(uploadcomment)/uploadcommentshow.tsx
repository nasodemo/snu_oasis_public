'use client'

import Inputandsave from "./uploadcomment";
import { useState } from "react";


const Uploadcommentshow = () => {
    const [savedData, setSavedData] = useState<string>(''); // 'savedData' 타입 지정
  
    const handleSave = (data: string) => { // 'data'의 타입을 'string'으로 지정
      setSavedData(data);
    };

  
    return (
      <div>
        <br/>
        <Inputandsave onSave={handleSave} />
        {savedData && <div id='saveddata'> {savedData} </div>}
      </div>
    );
  };
  
  export default Uploadcommentshow;