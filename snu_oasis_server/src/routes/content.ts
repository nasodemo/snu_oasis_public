import { Router } from "express";
import { QuestionEntity } from "../entities/Question";
import { SummeryEntity } from "../entities/Summery";
import { DescriptionEntity } from "../entities/Description";
import { AppDataSource } from "../data-source";
const router = Router();

import OpenAIApi from "openai";
require('dotenv').config();

const key = process.env.OPENAI_API_KEY;
const openai = new OpenAIApi({
    apiKey: key,
});

const gpt_model = "gpt-3.5-turbo";

router.post('/questions', async (req: any, res: any) => {
    try {
        const { word } = req.body;
        if ( !word ) {
            console.log(req.body);
            return res.status(400).json({ message: "Word is required." });
        }
        let entry = await QuestionEntity.findOne({ where: { word } });
        if (!entry || (entry && !entry.questions)) {
          console.log(req.body, 'question 함수 실행됨 \n'
          );
            // gpt api part
          const response = await openai.chat.completions.create({
            model: gpt_model,
            messages: [
              {
                  "role": "system",
                  "content": "당신의 역할은 '교육학, 자연과학, 인문학, 사회과학, 공학, 의약학, 예술체육학, 농수해양학'의 총 8개의 학문 중에서 2~3개의 학문을 선정하여 학문융합적이고 재미있는 질문을 입력받은 단어를 주제로 하여 만드는 것입니다. 고등학생들이 참고할 수 있도록 일상생활과 관련된 질문을 만듭니다. 만들어야 하는 질문의 개수는 5개입니다. \
'@융합질문:질문내용''@태그:학문분야1/학문분야2' 의 형태로 5개의 내용을 출력합니다.  \다음은 입력값 '기후변화'에 대한 출력 예시입니다. \
@융합질문: 식품 문화와 환경 보호를 결합하여 지속 가능한 식습관을 촉진하고, 동시에 지역 농수산물을 지원하는 방법은 무엇일까?@태그: 인문학/자연과학/농수해양학@융합질문: 예술과 스포츠를 통해 다양한 세대와 문화를 연결하여 기후변화 대응에 참여하는 지역 커뮤니티 프로젝트를 기획할 때 어떤 사회적 요소를 고려해야 할까?@태그: 사회과학/예술체육학",
              },
            {"role": "user", "content": word}
          ]});
          // data input part
          const questionRepo = AppDataSource.getRepository(QuestionEntity);
          let content = response.choices[0].message.content;
          console.log('input content of GPT\n', content)
          let message = 'gpt와의 통신 중 문제가 발생했습니다. 다시 한 번 버튼을 눌러주세요'
          // 문자열을 줄 단위로 분할
          const lines = content.split('@융합질문: ');
          console.log('라인까지 진행됨 \n')
          // 데이터를 저장할 배열
          const question_l = [];
          // 각 줄을 순회하면서 데이터 추출
          for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            const parts = line.split('@태그: ');
            // console.log('파츠 나누는 중')

            if (parts.length === 2) {
              const question = parts[0].trim();
              const tag = parts[1].trim();
              const answer = '';
              question_l.push({ question, tag, answer });
            }
          }
          const questions = question_l.map(item => ({ question: item.question, tag: item.tag, answer: item.answer }));
          console.log(typeof questions, typeof question_l)
          const newQuestion = questionRepo.create({ word, questions });
          await questionRepo.save(newQuestion);
          console.log('\n newQuestion 저장됨:', newQuestion);

          return res.json(newQuestion);
        }
        console.log('자료 있음\n');
        return res.json(entry);
      } catch(error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
          if (error?.message)
          console.error(error.response.status, error.response.data);
          res.status(error.response.status).json(error.response.data);
          return res.json(error.response.data);
        } else {
          console.error(`${error.message}`);
          return res.status(500).json({
            error: {
              message: 'An error occurred during your request... Like disconect from wify or Len port',
            }
          });
        }
      }
    });

router.post('/answer', async (req: any, res: any) => {
  try {
    const { word, question } = req.body;
    let entry = await QuestionEntity.findOne({ where: { word } });
    if (!entry) {
      console.log('entry.questions 없음:', entry);
      return res.status(400).json({ message: "Entry not found." });
    };
    console.log('답변탐색시작', word, question, entry);
    
    if (entry.questions) {
      let questions = entry.questions;
      // 이런 코드들 O(n)인데 나중에 query의 SELECT 문 사용하여 시간 복잡도 세타(1)로 줄이는게 좋을 듯
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].question == question) {
          if (questions[i].answer) {
            console.log('해설 자료 있음: \n', questions[i].answer);
            return res.json(questions[i].answer);
          } else {
            console.log('해설 자료 없음\n', question, '에 대한', questions[i].tag ,' 태그로 탐색 시작 \n');
            const response = await openai.chat.completions.create({
              model: gpt_model,
              messages: [
                {
                    "role": "system",
                    "content": "당신의 역할은 하나의 단어로부터 비롯된 학문 융합 질문에 대하여 약 5줄의 답변을 출력하는 것입니다.",
                },
              {"role": "user", "content": "다음은" + word + "에 대해 다음" + questions[i].tag + "학문들을 융합한 질문입니다." + questions[i].question}
            ]});

            // data input part
            const questionRepo = AppDataSource.getRepository(QuestionEntity);
            console.log(typeof(questionRepo), '\n', questionRepo)
            let content = response.choices[0].message.content;
            console.log('input content of GPT\n', content)
            questions[i].answer = content;
            await questionRepo.update({ word }, {questions: questions});
            console.log('저장 완료', content)
            return res.json(content);
          }
        }
      }
    }
  } catch(error) {
    if (error?.message) {
      console.error(error)
      return res.json(error.message)
    } else {
      console.error(error)
      return res.status(500).json({
        error: {
          message: 'An error occurred during your request... Like disconect from wify or Len port',
        }})
    }
  }
});

router.post('/summery', async (req: any, res: any) => {
  try {
      const { word } = req.body;
      let message = '';
      if ( !word ) {
          console.log(req.body);
          return res.status(400).json({ message: "Word is required." });
      }
      let entry = await SummeryEntity.findOne({ where: { word } });
      console.log('Summery를 위해 DB 저장된 값 확인 \n');
      if (!entry || (entry && !entry.summery)) {
        console.log(req.body);
        // gpt api part
        const response = await openai.chat.completions.create({
          model: gpt_model,
          messages: [
            {
                "role": "system",
                "content": "당신의 역할은 입력받은 단어에 대하여 한글로 100자 이내의 짧은 설명을 출력하는 것입니다.",
            },
          {"role": "user", "content": word}
        ]});
        // data input part
        const entryRepo = AppDataSource.getRepository(SummeryEntity);
        let summery = response.choices[0].message.content;
        console.log('output content of GPT\n', summery)
        message = 'gpt와의 통신 중 문제가 발생했습니다. 다시 한 번 버튼을 눌러주세요'
        const newEntry = entryRepo.create({ word, summery });
        console.log('저장 요청 보냄', summery)
        await entryRepo.save(newEntry);
        console.log('newEntry 저장됨 \n', newEntry);
        return res.json(newEntry);
      }
      console.log('자료 있음');
      return res.json(entry);
    } catch(error) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        if (error?.message)
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
        return res.json(error.response.data);
      } else {
        console.error(`${error.message}`);
        return res.status(500).json({
          error: {
            message: 'An error occurred during your request... Like disconect from wify or Len port',
          }
        });
      }
    }
  });

router.post('/description', async (req: any, res: any) => {
  try {
      const { word, catagory } = req.body;
      let message = '';
      if ( !word ) {
          console.log(req.body);
          return res.status(400).json({ message: "Word is required." });
      }
      let entry = await DescriptionEntity.findOne({ where: { word } });
      if (entry?.descriptions) {
        for (let i = 0; i < entry?.descriptions.length; i++) {
          if (entry.descriptions[i].catagory == catagory) {
            console.log('설명 자료 있음');
            const content = entry.descriptions[i].content;
            return res.json(content);
          }
        }
      }
      console.log(req.body);

      // gpt api part
      const response = await openai.chat.completions.create({
        model: gpt_model,
        messages: [
          {
              "role": "system",
              "content": "당신의 역할은 입력받은 단어를, 입력받은 학문의 관점으로 분석하여 시기순으로 설명하는 것입니다. 맨 위에는 출력물을 읽는 데 걸릴 시간을 '예상 독서 시간: 00분'으로 출력합니다.\
설명 시, 각 시기에는 '-'를 붙여야 합니다. 시기 사이에 너무 큰 간격이 존재하지 않도록 하고, 출력값을 '-'으로 슬라이싱 하기에 '-'이 출력에 들어가지 않도록 합니다. 다음은 입력값 '빛'에 대한 설명 예시입니다. \
-기원후 18세기:빛이 파동 현상을 보인다는 가설이 제기되었습니다. -기원후 20세기: 양자역학의 발전이 광학에 혁명적인 영향을 미쳤습니다. \
더불어, 관련된 내용을 더 찾아볼 수 있는 웹 사이트가 있다면 추천해주세요. \
-관련 링크: 더 구체적이고 자세한 정보는 https://ko.wikipedia.org/ 에서 확인하실 수 있습니다. "
          },
        {"role": "user", "content":  catagory + '의 관점으로' + word + '를 설명해주세요'}
      ]});
      // data input part
      const descriptonRepo = AppDataSource.getRepository(DescriptionEntity);
      let content = response.choices[0].message.content;
      console.log('output content of GPT\n', content)
      message = 'gpt와의 통신 중 문제가 발생했습니다. 다시 한 번 버튼을 눌러주세요'
      if (!entry) {
        const newEntry = descriptonRepo.create({ word, descriptions: [{content: content, catagory: catagory}]});
        console.log('저장 요청 보냄', content)
        await descriptonRepo.save(newEntry);
        console.log('newEntry 저장됨 \n', newEntry);
        return res.json(content);
      } else {
        if (!entry.descriptions) {
          entry.descriptions = [{content: content, catagory: catagory}];
          console.log('entry에 값 생성됨 \n', content);
        } else {
          entry.descriptions.push({content: content, catagory: catagory});
          console.log('entry에 값 추가됨 \n', content);
        }
        await descriptonRepo.save(entry);
        return res.json(content);
      }
    } catch(error) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        if (error?.message)
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
        return res.json(error.response.data);
      } else {
        console.error(`${error.message}`);
        return res.status(500).json({
          error: {
            message: 'error occurred in backend works... Like disconect from wify or Len port',
          }
        });
      }
    }
  });

export default router;
