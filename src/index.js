import express from 'express';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
const app = express()
const PORT =3000;
// Middleware setup
app.use(express.json());
app.get("/matrix",(req,res)=>{
  if(isMainThread){
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    const results = [];
  matrix.forEach((row,index)=>{
    const worker=new Worker("../workerThread.js", {workerData:row})
    worker.on('message',(result)=>{
      results[index]=result;
      if(results.length=== matrix.length){
        const finalResults=results.reduce((sum,number)=>sum+number,0)
        res.send('the results of the mtrix is :',finalResults)
      }

    })
    worker.on('error', (error) => console.error(`Worker error: ${error}`));

  })
 
 
   }
})

app.get('/', function (req, res) {
  res.status(200).send("main threads ")
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});