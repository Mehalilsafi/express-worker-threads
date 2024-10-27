import { parentPort, workerData } from 'worker_threads';
  if(isMainThread){
    const row=workerData
    const result=row.reduce((sum,number)=>sum+number,0)
    parentPort.postMessage(result)
  }