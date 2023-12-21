import { Router, query } from "express";
import { QuestionEntity } from "../entities/Question";
import { SummeryEntity } from "../entities/Summery";
import { DescriptionEntity } from "../entities/Description";
import { AppDataSource } from "../data-source";
const router = Router();


router.post('/deleteWord', async (req, res) => {
    try {
        const { word } = req.body;
        let questionentry = await QuestionEntity.findOne({ where: { word } });
        let summery = await SummeryEntity.findOne({ where: { word } });
        let description = await DescriptionEntity.findOne({ where: { word } });
        if (questionentry) {
            await QuestionEntity.delete({ word });
        }
        if (summery) {
            await SummeryEntity.delete({ word });
        }
        if (description) {
            await DescriptionEntity.delete({ word });
        }
        return res.status(200).json({ message: '{word} delete success' });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/resetAll', async (req, res) => {
    try {
        const { password } = req.body;
        if (password !== '2112') {
            throw new Error('Password incorrect')
        }
        await QuestionEntity.delete({});
        await SummeryEntity.delete({});
        await DescriptionEntity.delete({});
        
        return res.status(200).json({ message: 'db clear success' });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post('/rawQuestions', async (req, res) => {
    try {
        const { word } = req.body;
        let questionentry = await QuestionEntity.findOne({ where: { word } });
        return res.status(200).json({ questions: questionentry.questions });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });    
    }
});

router.post('/deleteQuestion', async (req, res) => {
    try {
        const { word, index } = req.body;
        // let questionentry = await QuestionEntity.findOne({ where: { word } });
        // console.log(questionentry.questions[index], '변경 전', index);
        // await QuestionEntity.delete({ word, questions: questionentry.questions[index] });

 
        AppDataSource.query('DELETE FROM questions WHERE word = $1 AND questions @> $2 RETURNING *', 
            [ word, `{${index}}`]);
        let newQuestionEntry = await QuestionEntity.findOne({ where: { word } });
        console.log(newQuestionEntry.questions[index], '변경 후');

        return res.status(200).json({ message: 'delete success' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });    
    }
});

export default router;