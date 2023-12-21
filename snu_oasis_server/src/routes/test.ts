import { Router } from "express";
import { Entry } from '../entities/TestEntry';
import { AppDataSource } from "../data-source";
const router = Router();

require('dotenv').config();
import OpenAIApi from "openai";
const key = process.env.OPENAI_API_KEY;
const openai = new OpenAIApi({
    apiKey: key,
});


router.post('/add', async (req, res) => {
    const { word, summery, questions } = req.body;
    console.log(req.body);
    if (!word || !summery || !questions) {
      return res.status(400).json({ message: 'Word and other things are required.' });
    }
  
    try {
      const description = 'test';
      const entryRepo = AppDataSource.getRepository(Entry);
      const newEntry = entryRepo.create({ word, summery, questions, description});
      await entryRepo.save(newEntry);
      res.status(201).json({ message: 'Word added successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });

router.post('/divide', async (req: any, res: any) => {
    try {
        const { word } = req.body;
        let message = '';
        if ( !word ) {
            console.log(req.body);
            return res.status(400).json({ message: "Word is required." });
        }
        let entry = await Entry.findOne({ where: { word } });
        if (!entry) {
          console.log(req.body);
            // gpt api part
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                  "role": "system",
                  "content": "당신의 역할은 입력받은 단어에 대하여 설명하고, 학문융합적 질문 3개를 만드는 것입니다. 각 질문 앞에는 '@'를 붙여 각 질문을 구분할 수 있도록 합니다. 각 질문에는 질문과 관련된 학문들을 '@태그: '로 표시합니다. 요약과 질문, 상세설명 사이에는 '$'를 붙여 구분할 수 있도록 합니다. 상세설명을 할 때, 시기순으로 설명하고, 각 시기의 기준은 세기로 잡습니다. 각 세기는 하이픈 '-'를 붙여 출력합니다. 다음은 입력값 '농경'에 대한 출력 예시입니다. $요약: 농경은 대표적인 생산활동 입니다.$융합질문들: @융합질문: 농경은 우리의 정서 체계에 어떻게 영향을 주고 있을까요?@태그: 인문학 / 농축산학$상세설명: -기원전 30세기: 농경이 시작되었습니다. -기원전 10세기: 간석기를 사용한 농경이 시작되었습니다."
              },
            {"role": "user", "content": word}
          ]});
            // data input part
          const entryRepo = AppDataSource.getRepository(Entry);
          let content = response.choices[0].message.content;
          console.log('input content of GPT\n', content)
          // const description = content.split('$')[0];
          // const summery = content.split('$')[1];
          // const question = content.split('$')[2];
          message = 'gpt와의 통신 중 문제가 발생했습니다. 다시 한 번 버튼을 눌러주세요'
          const description = content.split('$상세설명: ')[1];
          console.log('디스까진 됨')
          const summery = (content.split('$요약:')[1]).split('$융합질문들:')[0];
          console.log('일단 서머까지')
          const questions_string = (content.split('$융합질문들: ')[1]).split('$상세설명:')[0];

          // 문자열을 줄 단위로 분할
          const lines = questions_string.split('@융합질문: ');
          console.log('라인까지')
          // // 데이터를 저장할 배열
          const question_l = [];
          // // 각 줄을 순회하면서 데이터 추출
          for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            const parts = line.split('@태그: ');
            // console.log('파츠 나누는 중')

            if (parts.length === 2) {
              const question = parts[0].trim();
              const tag = parts[1].trim();
              question_l.push({ question, tag });
            }
          }
          const questions = question_l.map(item => ({ question: item.question, tag: item.tag }));
          // const questions = question_l.map(item => item.question);
          // let jsonArr_string = "[";
          // for(let i=0; i < question_l.length; i++){
          //   jsonArr_string += JSON.stringify(question_l[i]);
          //   if(i < question_l.length-1){
          //       jsonArr_string += ",";
          //   }
          // }
          // jsonArr_string += "]";
          // const questions = jsonArr_string;
          console.log(typeof questions, typeof question_l)
          // const questions = questions_string.split('@융합질문');
          // 필수 필드인 tag를 확인하고 누락되지 않도록 보장
          if (questions.some(item => !item.tag)) {
            return res.status(400).json({ message: 'Tag is required for all questions.' });
          }


          const newEntry = entryRepo.create({ word, summery, questions, description});

          
          console.log('저장 요청 보냄', questions)
          await entryRepo.save(newEntry);
          console.log('newEntry 저장됨 \n', newEntry);
          // let entry = await Entry.findOne({ where: { word } });
          // return res.status(201).json({entry});
          return res.json({ word, summery, questions, description});
        }
        console.log('자료 있음');
        return res.json(entry);
      } catch(error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
          if (error?.message)
          console.error(error.response.status, error.response.data);
          res.status(error.response.status).json(error.response.data);
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
          res.status(500).json({
            error: {
              message: 'An error occurred during your request... Like disconect from wify or Len port',
            }
          });
        }
      }
    });
export default router;