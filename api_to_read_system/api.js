const hello = require('child_process'),
      fs = require('fs');

getEnv()

function getProcesses() {
  return new Promise((resolve, reject) => {
    hello.exec('ps -e -o ppid=PPID -o pid=PID -o ucomm=UCOMM -o args=ARGS', (error, stdout, stderr) => {
      if(error) {
        console.error(`exec error: ${error}`);
        return;
      }
      let var1 = `${stdout}`;
      let var2 = `${stderr}`;
      var masterProcessInfo = [];

      tempvar1 = var1.split(/\r?\n/)
      //console.log(tempvar1);
      for(j=0;j<tempvar1.length;j++) {

      }
      let tempvarStr = JSON.stringify(tempvar1[0])
      //Indicies + num char for PID is how it's organaized
      let indexPPID = tempvarStr.indexOf('PPID')+3; //index of when PPID's stop
      let indexPID = tempvarStr.indexOf('PID', indexPPID+4);
      let indexUCOMM = tempvarStr.indexOf('UCOMM');
      let indexCMD = tempvarStr.indexOf('ARGS');
      //order = [ppid,pid,ucomm,command]
      for(i=1;i<tempvar1.length;i++){
        let processInfo = {
          "name":"",
          "ppid":"",
          "pid":"",
          "env":[],
          "cmdline":""
        }
        //Here is the magic!
        processInfo.ppid = parseInt(tempvar1[i].substring(0,6));//PPID can be no more than 99999
        processInfo.pid = parseInt(tempvar1[i].substring(indexPPID, indexUCOMM-1));
        processInfo.name = tempvar1[i].substring(indexUCOMM-1, indexCMD-1);
        if(!tempvar1[i].substring(indexCMD-1, tempvar1[i].length) ){
          processInfo.cmdline = "false"
        }
        else {
          processInfo.cmdline = tempvar1[i].substring(indexCMD-1, tempvar1[i].length);
        }
        masterProcessInfo.push(processInfo);
      }
      if(masterProcessInfo.length == (tempvar1.length-1)) {
        resolve(masterProcessInfo);
      }
      else {
        reject("The number of processes detected have not been stored correctly");
      }
    });
  })
}

function getEnv() {
  getProcesses().then((data,error) => {
    for(i=0;i<data.length;i++) {
      //console.log(data);
      if(data[i].pid != NaN) {
        console.log()
        if( hello.execSync('test -e /proc/' + data[i].pid + '/environ ; echo $?').toString('utf8') == 0) {
          let env = hello.execSync('cat /proc/' + data[i].pid + '/environ')//.toString('utf8');
          console.log(env);
          //let varName = env.match(/[A-Z*_*]+\=+/g);
          //console.log(varName);
        }
        else {
          continue;
        }
        // if(varName != null) {
        //   varValue = varName.map(x => varName.match(x))
        //   console.log(varValue.substr(varValue[i].index, varValue[i+1].index - varValue[i].index));
        // }
      }
    }
  })
}
