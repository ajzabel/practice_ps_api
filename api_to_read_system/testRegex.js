const test = "LANG=en_US.UTF-8PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/binNOTIFY_SOCKET=/run/systemd/notifyLISTEN_PID=424LISTEN_FDS=3WATCHDOG_PID=424WATCHDOG_USEC=180000000 LANG=en_US.UTF-8PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/binLISTEN_PID=448LISTEN_FDS=1SD_ACTIVATION=1 LANG=en_US.UTF-8PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/binNOTIFY_SOCKET=/run/systemd/notifyLISTEN_PID=453LISTEN_FDS=2";

getEnvVar(test);

function getEnvVar(testString) {

  let varName = testString.match(/[A-Z*_*]+\=+/g);
  console.log(varName);
  let varValue = varName.map(x => testString.match(x))
  console.log(varValue);
  for(i=0;i<(varValue.length-1);i++){
    console.log(testString.substr(varValue[i].index, varValue[i+1].index - varValue[i].index));
  }
}
