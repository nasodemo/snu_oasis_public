import { QuestionEntity } from "../entities/Question";
import { Router } from "express";
const router = Router();

import OpenAIApi from "openai";
import { AppDataSource } from "../data-source";
require('dotenv').config();

const key = process.env.OPENAI_API_KEY;
const openai = new OpenAIApi({
    apiKey: key,
});

const gpt_model = "gpt-3.5-turbo";

async function makeAnswer(word: string, question: any) {
    const response = await openai.chat.completions.create({
        model: gpt_model,
        messages: [
          {
              "role": "system",
              "content": "당신의 역할은 하나의 단어로부터 비롯된 학문 융합 질문에 대하여 약 5줄의 답변을 출력하는 것입니다.",
          },
        {"role": "user", "content": "다음은" + word + "에 대해 학문들을 융합한 질문입니다." + question}
      ]});
      let content = response.choices[0].message.content;
      console.log('#####output content of GPT in makequestion process#####\n', content)
      return content;
}

router.post('/makequestions', async (req: any, res: any) => {
    try {
        const { word, question, tag } = req.body;
        let questions = (await QuestionEntity.findOne({ where: { word } })).questions;
        // console.log('word: ', word, 'question: ', question, 'questions: ', questions);
        const questionRepo = AppDataSource.getRepository(QuestionEntity);
        // 차후 태그 기능 변경 예정
        questions.push({question, answer: "", tag});
        console.log(question, '에 대한 질문 저장 완료, GPT 답변 생성중 \n');
        // res.json({ questions });
        questions[questions.length - 1].answer = await makeAnswer(word, question);
        await questionRepo.update({word}, {questions: questions});
        console.log('makequestions & update success');
        return res.json({status: true});

    } catch (err) {
        console.log(err);
        res.json({ error: err });
    }
});

export default router;
