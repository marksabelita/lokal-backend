// const { setup: setupDevServer } = require('jest-dev-server')
// const { exec, spawn } = require('child_process')


// const spawnChild = async ()  => {
//   const cmdArr = 'offline start --skipCacheInvalidation --port 3001 --stage dev'.split(' ');
//   const child = spawn('sls', cmdArr, { shell: true, cwd: process.cwd() });
//   let data = "";
//   for await (const chunk of child.stdout) {
//       console.log('stdout chunk: '+chunk);
//       data += chunk;
//   }
//   let error = "";
//   for await (const chunk of child.stderr) {
//       console.error('stderr chunk: '+chunk);
//       error += chunk;
//   }
//   const exitCode = await new Promise( (resolve, reject) => {
//       child.on('close', resolve);
//   });

//   if( exitCode) {
//       throw new Error( `subprocess error exit ${exitCode}, ${error}`);
//   }

//   return data;
// }
// module.exports = async function globalSetup() {
//   return new Promise((resolve, reject) => {

//     spawnChild().then(
//       data=> {console.log("async result:\n" + data);},
//       err=>  {console.error("async error:\n" + err);}
//     );
//   //   const ps = exec('pwd', (error, stdout, stderro) => {
//   //     console.log('-')
//   //     console.log(stdout);
//   //     resolve(stdout);
//   //   })
//   // })

//   // const ps = spawn('sls', cmdArr, { shell: true, cwd: process.cwd() })
  
//     //   .then(error, stdout, stderr => {
//     //     console.log('******** run sls offline ********')
//     //     if (error) {
//     //       console.error(`exec error: ${error}`)
//     //       reject()
//     //       return
//     //     }
    
//     //     if (stderr) {
//     //       console.error(`stderr: ${stderr}`)
//     //       reject()
//     //       return
//     //     }
    
//     //     console.log(`stdout: ${stdout}`)
//     //     console.log('**** resolve promise *****')
//     //     resolve(ps)
//     //   }
//     // )
//   })
// }

// // async function spawnChild() {
// //   const { spawn } = require('child_process');
// //   const child = spawn('node', ["child.js"]);

  
// // }






const { spawn } = require('child_process');

let slsOfflineProcess;

module.exports = async () => {
	console.log('[Tests Bootstrap] Start');
	await startSlsOffline().catch((e) => {
		console.error(e);
		return;
	});
	global.__SERVERD__ = slsOfflineProcess;
};

function startSlsOffline() {
	slsOfflineProcess = slsOfflineProcess = spawn('serverless', [ 'offline' ]);

  // console.log(slsOfflineProcess);
	return finishLoading();
}

const finishLoading = () =>
	new Promise((resolve, reject) => {
		slsOfflineProcess.stdout.on('data', (data) => {
      const outputString = data.toString();

			if (outputString.includes('Serverless: Offline [HTTP] listening on')) {
				console.log(`Serverless: Offline started with PID : ${slsOfflineProcess.pid}`);
				resolve('ok');
        return;
			}

			if (outputString.includes('address already in use')) {
				reject(data.toString().trim());
			}
		});

		slsOfflineProcess.stderr.on('data', (errData) => {
      console.log(errData.toString());
			console.log(`Error starting Serverless Offline:\n${errData}`);
			reject(errData);
		});
	});