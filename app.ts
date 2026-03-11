import express from 'express';
import type { Application } from 'express';
import cors from 'cors';
import { IndexRouter } from './src/routes/main/main';
import { LogInRouter } from './src/routes/log-in/log-in'
import { SignUpRouter } from './src/routes/sign-up/sign-up'


const app: Application = express();

const allowedOrigins: string[] = [''];

interface DynamicCorsOptionsType {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void;
}

const DynamicCorsOptions: DynamicCorsOptionsType = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1){
      callback(null, true);
    } else{
      callback(new Error('Unauthorized origin'));
    }
  }
}

app.use(cors(DynamicCorsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", IndexRouter)
app.use("/log-in", LogInRouter)
app.use("/sign-up", SignUpRouter)


const PORT = 8080;
app.listen(PORT, (error: any) => {
  if (error) {
    return error
  }
  console.log(`Members-Only Application - listening on port ${PORT}!`);
});