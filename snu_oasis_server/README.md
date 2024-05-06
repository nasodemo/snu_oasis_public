# SNU-OASIS.com (Backend)

- Online AI-based System for Inquiry Studies

이 레포지토리는 snu-oasis의 백엔드 코드 및 서버를 위한 파일을 관리하기위해 제작되었습니다.

snu-oasis는 '질문 역량 증진 및 협력학습을 위한 중등 융합 교육 AI 플랫폼 개발 연구의 일환으로 제작되었습니다.

사용된 GPT persona는 src/routers 의 파일들을 참고해 주세요.

예시) 다음의 코드에서 messages의 "content"에 해당하는 내용이 GPT presona 입니다.
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


본 연구는 2023 학부생연구지원프로그렘의 지원으로 운영되고 있습니다.

## 연구 인원

##### 책임 연구자 :

- 조민선

##### 공동 연구자 :

- 김은빛
- 김태욱

## dev note

##### updated at 01.03.

prettier로 가독성 개선하였습니다.

## 개발 상세

FrameWork:
Express

총괄 제작:
김태욱
