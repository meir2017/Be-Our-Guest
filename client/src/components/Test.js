// // 
//  »   Warning: heroku update available from 7.5.0 to 7.15.2
//  2018-09-25T03:43:25.553957+00:00 app[api]: Release v1 created by user 66meir46@gmail.com
//  2018-09-25T03:43:25.709435+00:00 app[api]: Release v2 created by user 66meir46@gmail.com
//  2018-09-25T03:43:25.553957+00:00 app[api]: Initial release by user 66meir46@gmail.com
//  2018-09-25T03:43:25.709435+00:00 app[api]: Enable Logplex by user 66meir46@gmail.com
//  2018-09-25T03:50:01.000000+00:00 app[api]: Build started by user 66meir46@gmail.com
//  2018-09-25T03:51:17.187472+00:00 app[api]: Release v3 created by user 66meir46@gmail.com
//  2018-09-25T03:51:17.187472+00:00 app[api]: Deploy b030a3f7 by user 66meir46@gmail.com
//  2018-09-25T03:51:17.210620+00:00 app[api]: Scaled to web@1:Free by user 66meir46@gmail.com
//  2018-09-25T03:51:24.000000+00:00 app[api]: Build succeeded
//  2018-09-25T03:51:26.299106+00:00 heroku[web.1]: Starting process with command `npm start`
//  2018-09-25T03:51:28.271972+00:00 app[web.1]:
//  2018-09-25T03:51:28.271997+00:00 app[web.1]: > beourguest@1.0.0 start /app
//  2018-09-25T03:51:28.271999+00:00 app[web.1]: > node server.js
//  2018-09-25T03:51:28.272000+00:00 app[web.1]:
//  2018-09-25T03:51:30.238000+00:00 app[web.1]: module.js:550
//  2018-09-25T03:51:30.238022+00:00 app[web.1]: throw err;
//  2018-09-25T03:51:30.238024+00:00 app[web.1]: ^
//  2018-09-25T03:51:30.238026+00:00 app[web.1]:
//  2018-09-25T03:51:30.238028+00:00 app[web.1]: Error: Cannot find module './models/EventModel'
//  2018-09-25T03:51:30.238030+00:00 app[web.1]: at Function.Module._resolveFilename (module.js:548:15)
//  2018-09-25T03:51:30.238031+00:00 app[web.1]: at Function.Module._load (module.js:475:25)
//  2018-09-25T03:51:30.238033+00:00 app[web.1]: at Module.require (module.js:597:17)
//  2018-09-25T03:51:30.238034+00:00 app[web.1]: at require (internal/module.js:11:18)
//  2018-09-25T03:51:30.238036+00:00 app[web.1]: at Object.<anonymous> (/app/server.js:41:15)
//  2018-09-25T03:51:30.238037+00:00 app[web.1]: at Module._compile (module.js:653:30)
//  2018-09-25T03:51:30.238039+00:00 app[web.1]: at Object.Module._extensions..js (module.js:664:10)
//  2018-09-25T03:51:30.238041+00:00 app[web.1]: at Module.load (module.js:566:32)
//  2018-09-25T03:51:30.238042+00:00 app[web.1]: at tryModuleLoad (module.js:506:12)
//  2018-09-25T03:51:30.238044+00:00 app[web.1]: at Function.Module._load (module.js:498:3)
//  2018-09-25T03:51:30.238045+00:00 app[web.1]: at Function.Module.runMain (module.js:694:10)
//  2018-09-25T03:51:30.238047+00:00 app[web.1]: at startup (bootstrap_node.js:204:16)
//  2018-09-25T03:51:30.238049+00:00 app[web.1]: at bootstrap_node.js:625:3
//  2018-09-25T03:51:30.249722+00:00 app[web.1]: npm ERR! code ELIFECYCLE
//  2018-09-25T03:51:30.250118+00:00 app[web.1]: npm ERR! errno 1
//  2018-09-25T03:51:30.251576+00:00 app[web.1]: npm ERR! beourguest@1.0.0 start: `node server.js`
//  2018-09-25T03:51:30.251750+00:00 app[web.1]: npm ERR! Exit status 1
//  2018-09-25T03:51:30.251982+00:00 app[web.1]: npm ERR!
//  2018-09-25T03:51:30.252373+00:00 app[web.1]: npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
//  2018-09-25T03:51:30.258759+00:00 app[web.1]:
//  2018-09-25T03:51:30.258980+00:00 app[web.1]: npm ERR! A complete log of this run can be found in:
//  2018-09-25T03:51:30.259147+00:00 app[web.1]: npm ERR!     /app/.npm/_logs/2018-09-25T03_51_30_253Z-debug.log
//  2018-09-25T03:51:30.252198+00:00 app[web.1]: npm ERR! Failed at the beourguest@1.0.0 start script.
//  2018-09-25T03:51:30.325318+00:00 heroku[web.1]: State changed from starting to crashed
//  2018-09-25T03:51:30.327349+00:00 heroku[web.1]: State changed from crashed to starting
//  2018-09-25T03:51:30.307667+00:00 heroku[web.1]: Process exited with status 1
//  2018-09-25T03:51:38.176791+00:00 heroku[web.1]: Starting process with command `npm start`
//  2018-09-25T03:51:40.336884+00:00 app[web.1]:
//  2018-09-25T03:51:40.336914+00:00 app[web.1]: > beourguest@1.0.0 start /app
//  2018-09-25T03:51:40.336916+00:00 app[web.1]: > node server.js
//  2018-09-25T03:51:40.336918+00:00 app[web.1]:
//  2018-09-25T03:51:42.324347+00:00 app[web.1]: module.js:550
//  2018-09-25T03:51:42.324378+00:00 app[web.1]: throw err;
//  2018-09-25T03:51:42.324381+00:00 app[web.1]: ^
//  2018-09-25T03:51:42.324382+00:00 app[web.1]:
//  2018-09-25T03:51:42.324385+00:00 app[web.1]: Error: Cannot find module './models/EventModel'
//  2018-09-25T03:51:42.324388+00:00 app[web.1]: at Function.Module._resolveFilename (module.js:548:15)
//  2018-09-25T03:51:42.324389+00:00 app[web.1]: at Function.Module._load (module.js:475:25)
//  2018-09-25T03:51:42.324391+00:00 app[web.1]: at Module.require (module.js:597:17)
//  2018-09-25T03:51:42.324393+00:00 app[web.1]: at require (internal/module.js:11:18)
//  2018-09-25T03:51:42.324395+00:00 app[web.1]: at Object.<anonymous> (/app/server.js:41:15)
//  2018-09-25T03:51:42.324397+00:00 app[web.1]: at Module._compile (module.js:653:30)
//  2018-09-25T03:51:42.324399+00:00 app[web.1]: at Object.Module._extensions..js (module.js:664:10)
//  2018-09-25T03:51:42.324400+00:00 app[web.1]: at Module.load (module.js:566:32)
//  2018-09-25T03:51:42.324402+00:00 app[web.1]: at tryModuleLoad (module.js:506:12)
//  2018-09-25T03:51:42.324404+00:00 app[web.1]: at Function.Module._load (module.js:498:3)
//  2018-09-25T03:51:42.324406+00:00 app[web.1]: at Function.Module.runMain (module.js:694:10)
//  2018-09-25T03:51:42.324408+00:00 app[web.1]: at startup (bootstrap_node.js:204:16)
//  2018-09-25T03:51:42.324410+00:00 app[web.1]: at bootstrap_node.js:625:3
//  2018-09-25T03:51:42.341298+00:00 app[web.1]: npm ERR! code ELIFECYCLE
//  2018-09-25T03:51:42.341853+00:00 app[web.1]: npm ERR! errno 1
//  2018-09-25T03:51:42.345423+00:00 app[web.1]: npm ERR! beourguest@1.0.0 start: `node server.js`
//  2018-09-25T03:51:42.345700+00:00 app[web.1]: npm ERR! Exit status 1
//  2018-09-25T03:51:42.347241+00:00 app[web.1]: npm ERR!
//  2018-09-25T03:51:42.347619+00:00 app[web.1]: npm ERR! Failed at the beourguest@1.0.0 start script.
//  2018-09-25T03:51:42.347913+00:00 app[web.1]: npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
//  2018-09-25T03:51:42.358099+00:00 app[web.1]:
//  2018-09-25T03:51:42.358288+00:00 app[web.1]: npm ERR! A complete log of this run can be found in:
//  2018-09-25T03:51:42.358375+00:00 app[web.1]: npm ERR!     /app/.npm/_logs/2018-09-25T03_51_42_351Z-debug.log
//  2018-09-25T03:51:42.470147+00:00 heroku[web.1]: State changed from starting to crashed
//  2018-09-25T03:51:42.424230+00:00 heroku[web.1]: Process exited with status 1
//  2018-09-25T03:51:43.984184+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/" host=mytest002.herokuapp.com request_id=d1823e77-2b47-4093-aa03-e15ad6f4666d fwd="213.57.4.13" dyno= connect= service= status=503 bytes= protocol=https
//  2018-09-25T03:51:44.464130+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/favicon.ico" host=mytest002.herokuapp.com request_id=fd5e6ef7-03c2-4ce1-a66b-a7c36fe1c1ce fwd="213.57.4.13" dyno= connect= service= status=503 bytes= protocol=https
