// const { teardown: teardownDevServer } = require('jest-dev-server')

// module.exports = async function globalTeardown() {
//   await teardownDevServer()

//   // Your global teardown
//   console.log("globalTeardown.js was invoked");
// }


module.exports = async function() {
  let slsOfflineProcess = global.__SERVERD__;
  slsOfflineProcess.stdin.write('q\n');
  slsOfflineProcess.stdin.pause();
  await slsOfflineProcess.kill('SIGINT');
  console.log('Serverless Offline stopped');
};