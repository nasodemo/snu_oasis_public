import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";

// import authRoutes from './routes/auth'
import testRoutes from './routes/test'
import contentRoutes from './routes/content'
import questionRoutes from './routes/question'
import adminRoutes from './routes/admin'
import cors from "cors";
import dotenv from 'dotenv';

// import cookieParser from 'cookie-parser';
// 최상위 함수인 express를 호출하여 app에 저장
const app = express();

// app에 cors와 express와 morgan 사용 선언
app.use(cors({  
    origin: process.env.ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200
})) 
// app.use(cors());
// express에서 제공하는 json 파싱 미들웨어.  데이터를 받아올 수 있게 해줌
app.use(express.json());
// morgan("dev") : 개발용으로 dev 사용 (+ 종류: combined, common, short, tiny, dev)
app.use(morgan("dev"));
// app.use(cookieParser());

dotenv.config();

// api 생성.
// root로 가면 200을 띄워 로드 벨런서 healty check 를 통과시킴.
app.get("/", (_, res) => res.send(200));

// app.use("/api/auth", authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/questionRoutes', questionRoutes);
app.use('/api/admin', adminRoutes);

let port = process.env.PORT;
app.listen(port, async () => {
    console.log(`server running at ${port}`);

    AppDataSource.initialize().then( () => {
        console.log("database initialized");
    }).catch(error => console.log(error));
});

// app.get('/', (req, res) => {
//     res.status(200).send('200');
//   });
  
//   // 서버를 시작하고, 지정된 포트에서 수신 대기합니다.
//   app.listen(80, () => {
//     console.log(`server check through 80 port`);
//   });