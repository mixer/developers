$ wscat --connect "$wsServer"
connected (press CTRL+C to quit)
> {"type": "method","method": "auth","arguments":[CHANNELID, USERID,"AUTHKEY"],"id":0}
< {"type":"event","event":"UserJoin","data":{"username":"USERNAME","roles":[,"User"],"id":345}}
< {"type":"reply","error":null,"id":0,"data":{"authenticated":true,"roles":["User"]}}
