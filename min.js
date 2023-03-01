const state_expressions=[{type:"folder",id:"Windows Folder",title:"Windows",collapsed:!0},{type:"folder",id:"Javascript Folder",title:"JS",collapsed:!0},{type:"expression",id:"Mouse Position",folderId:"Javascript Folder",color:"#c74440",latex:"M_{ousePosition}=(0,0)",hidden:!0},{type:"expression",id:"Keyboard Press",folderId:"Javascript Folder",color:"#2d70b3",latex:"K_{eyPress}(0)"},{type:"expression",id:"Keyboard Down",folderId:"Javascript Folder",color:"#388c46",latex:"K_{eyDown}(0)"},{type:"expression",id:"Keyboard Up",folderId:"Javascript Folder",color:"#6042a6",latex:"K_{eyUp}()"},{type:"folder",id:"Cursor Folder",title:"Cursor",collapsed:!0},{type:"expression",id:"Cursor Caller",folderId:"Cursor Folder",color:"#c74440",latex:"C_{ursor}\\left(M_{ousePosition}\\right)"},{type:"expression",id:"Cursor",folderId:"Cursor Folder",color:"#000000",latex:"C_{ursor}\\left(p\\right)=\\operatorname{polygon}\\left(\\left(p.x,0.5+p.y-0.5\\right),\\left(p.x,p.y-0.5\\right),\\left(0.11+p.x,0.166+p.y-0.5\\right),\\left(0.33+p.x,0.083+p.y-0.5\\right)\\right)"},{type:"folder",id:"Graph Data",title:"Graph Data",collapsed:!0},{type:"expression",id:"Runtime",folderId:"Graph Data",color:"#c74440",latex:"R_{untime}=0",hidden:!0},{type:"folder",id:"Async Folder",title:"Async"},{type:"expression",id:"Thread Count",folderId:"Async Folder",color:"#2d70b3",latex:"T_{hreadCount}=4"},{type:"expression",id:"Current Thread",folderId:"Async Folder",color:"#6042a6",latex:"C_{urrentThread}=1"},{type:"folder",id:"Thread Functions",title:"Threads"},{type:"expression",id:"Thread1",folderId:"Thread Functions",color:"#6042a6",latex:"T_{hreadOne}=a->0"},{type:"expression",id:"Thread2",folderId:"Thread Functions",color:"#6042a6",latex:"T_{hreadTwo}=a->1"},{type:"expression",id:"Thread3",folderId:"Thread Functions",color:"#6042a6",latex:"T_{hreadThree}=a->2"},{type:"expression",id:"Thread4",folderId:"Thread Functions",color:"#6042a6",latex:"T_{hreadFour}=a->3"},{type:"expression",id:"a",folderId:"",color:"#6042a6",latex:"a=0"}],default_state={version:10,randomSeed:"b3e5a2cef0ea7db249a9a32b01b14901",graph:{viewport:{xmin:-10,ymin:-10,xmax:10,ymax:10}},expressions:{list:state_expressions}},blank_expression={type:"expression",id:"",color:"#c74440",latex:"",hidden:!0};let Root=Calc._calc.rootElt,Rect=Root.getBoundingClientRect(),Default_Image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAYAAAAbvf3sAAAAAXNSR0IArs4c6QAAAPVJREFUKFNNUsF2wzAMAu///7Vt7N5i9kBWNp0cWyAQ4Wd+BQhdJAARN4Tx3AIUcA+Cn7nSvdNA96a4BZLYJCghPL7/XCtfdPOZtIGwB7yFESAgEbzmklmMN1NBG1zfBj5v77XULDV4H1mWUnL2MNmIbMa0BOWS2CDGmRSnR9qIPoGvuVR6i00sYFVvzwaizhOmfIpRn85br8H+PPDHiAKsGuY0Ru37f9XbH9ORVPqM9JSISVMSqVw6h/eaejQfnSc6kMKtyqQ98TW/GtbXkmym0669HPYaHQ8VTPM67xZQYrI5Rx3T1xKHo8hyT6qP4me1/bv8AgnkrfkQkwgFAAAAAElFTkSuQmCC",HelperFuncs=[],TickData={done:!1,runtime:0,thread:1,previous_time:0,current_time:0,tps:1e3/60};function addFolder(e){let t=Calc.getState();t.expressions.list.push({type:"folder",id:e.id,title:e.title,collapsed:e.collapsed||!1}),Calc.setState(t)}function idToIndex(e){let t=Calc.getState();for(let o=0;o<t.expressions.list.length;o++)if(t.expressions.list[o].id==e)return o}function fireAction(e){Calc.controller.dispatcher.dispatch({type:"action-single-step",id:e})}function addState(e,t){let o=Calc.getState(),i=o.expressions.list;i.splice(i.findIndex((e=>e.id===t))+1,0,{type:"expression",id:e.id,folderId:t,latex:e.latex}),Calc.setState(o)}Root.style.cursor="none",addState({id:"My Window Data",latex:"x=1"},"Windows Folder");let window_objects=[{name:"window 1",index:1,position:[0,0],sides:[3,3,3,3],opacity:0,minimized:0,fullscreen:0}],Mos17Sys={memory:{},functions:{graphics:function(e){"-n"==(e=e.split(","))[0]&&(e=e.slice(2,e.length),window_objects.push({name:e[0],index:1,position:[0,0],sides:[3,3,3,3],opacity:0,minimized:0,fullscreen:0})),"-lw"!=e[0]||load_window(e=e.slice(1,e.length))},int:function(e){return parseInt(e)},str:function(e){return e.toString()},bool:function(e){return"true"==e}},file_system:{"~":{}},data:{cwd:["~"]}};function executeCommand(cmd){let tokens=cmd.split(" ");if("@"==tokens[0].charAt(0)){let func=tokens[0].substring(1),args=tokens.slice(1,tokens.length);return void eval(`Mos17Sys.functions['${func}']('${args}')`)}let fs=Mos17Sys.file_system,cwd=Mos17Sys.data.cwd,value,temp;switch(tokens[0]){case"set":if("@"==tokens[2].charAt(0)){let func=tokens[2].substring(1),args=tokens.slice(3,tokens.length),value=eval(`Mos17Sys.functions['${func}']('${args}')`);Mos17Sys.memory[tokens[1]]=value}else value=tokens.slice(2,tokens.length).join(" "),Mos17Sys.memory[tokens[1]]=value;return;case"goto":value=tokens[1].split("/");for(let e=0;e<value.length;e++)".."==value[e]?"~"==cwd?console.log("Your at the ~ dir, no going past this!"):cwd=cwd.slice(0,-1):cwd.push(value[e]);Mos17Sys.data.cwd=cwd;break;case"pwd":break;case"addfile":value=tokens[1].split("/"),temp=fs;for(let e=0;e<cwd.length;e++)temp=temp[cwd[e]];console.log(temp)}}executeCommand("goto hello/hi");let DefaultCursorLatex="C_{ursor}\\left(p\\right)=\\operatorname{polygon}\\left(\\left(p.x,0.5+p.y-0.5\\right),\\left(p.x,p.y-0.5\\right),\\left(0.11+p.x,0.166+p.y-0.5\\right),\\left(0.33+p.x,0.083+p.y-0.5\\right)\\right)";Calc.setState(default_state);let AngFunc="a_{ng}\\left(A,B\\right)=\\arctan\\left(A.xB.y\\ -\\ A.yB.x,A.xB.x\\ +\\ A.yB.y\\right)",InPolyFunc="i_{nsidePoly}\\left(p_{1},P_{ts}\\right)=\\operatorname{sign}\\left(\\left|\\operatorname{round}\\left(\\operatorname{total}\\left(\\left[a_{ng}\\left(P_{ts}\\left[i\\right]-p_{1},\\ \\ \\ P_{ts}\\left[i+1\\right]-p_{1}\\right)\\operatorname{for}i=\\left[1...\\operatorname{length}\\left(P_{ts}\\right)-1\\right]\\right]\\right)\\right)\\right|\\right)";Calc.setExpression({id:"Angle Function",latex:AngFunc}),Calc.setExpression({id:"Inside Poly Function",latex:InPolyFunc});class custom_window{constructor(e){e=e.split(","),this.name=e[0],this.position=e[1]||"(0,0)"}}function load_window(e){Mos17Sys.memory[e];let t=window_objects[window_objects.length-1],o=`${t.name.charAt(0)}_{${t.name.substring(1)}}`,i=`${t.name.charAt(0)}_{${t.name.substring(1)}Points}`,r=`${o}=[${t.position[0]},${t.position[1]},${t.sides[0]},${t.sides[1]},${t.sides[2]},${t.sides[3]},${t.opacity},${t.minimized},${t.fullscreen}]`,s=`\\operatorname{polygon}\\left(\\left(${o}\\left[1\\right]-${o}\\left[5\\right],${o}\\left[2\\right]-${o}\\left[4\\right]\\right),\\left(${o}\\left[1\\right]+${o}\\left[6\\right],${o}\\left[2\\right]-${o}\\left[4\\right]\\right),\\left(${o}\\left[1\\right]+${o}\\left[6\\right],${o}\\left[2\\right]+${o}\\left[3\\right]\\right),\\left(${o}\\left[1\\right]-${o}\\left[5\\right],${o}\\left[2\\right]+${o}\\left[3\\right]\\right)\\right)`,l=`${i}=\\left[\\left(${o}\\left[1\\right]-${o}\\left[5\\right],${o}\\left[2\\right]-${o}\\left[4\\right]\\right),\\left(${o}\\left[1\\right]+${o}\\left[6\\right],${o}\\left[2\\right]-${o}\\left[4\\right]\\right),\\left(${o}\\left[1\\right]+${o}\\left[6\\right],${o}\\left[2\\right]+${o}\\left[3\\right]\\right),\\left(${o}\\left[1\\right]-${o}\\left[5\\right],${o}\\left[2\\right]+${o}\\left[3\\right]\\right)\\right]`;addState({id:`${t.name} Data`,latex:r},"Windows Folder"),addState({id:`${t.name} Hitbox`,latex:s},"Windows Folder"),addState({id:`${t.name} PointList`,latex:l},"Windows Folder"),HelperFuncs.push({name:t.name,func:Calc.HelperExpression({latex:`i_{nsidePoly}\\left(M_{ousePosition},${i}\\right)`})})}function tick(){}function updateFrame(e){TickData.runtime=e,Calc.setExpression({id:"Runtime",latex:"R_{untime}="+Math.floor(e)/1e3,hidden:!0}),TickData.current_time=window.performance.now(),TickData.current_time-TickData.previous_time>=TickData.tps&&(TickData.previous_time=TickData.current_time,tick()),TickData.done||window.requestAnimationFrame(updateFrame)}executeCommand("set MyWindow @graphics -n window Main"),executeCommand("@graphics -lw MyWindow"),Root.addEventListener("mousemove",(e=>{var t=Calc.pixelsToMath({x:e.clientX-Rect.left,y:e.clientY-Rect.top});Calc.setExpression({id:"Mouse Position",latex:`M_{ousePosition}=(${Math.floor(100*t.x)/100},${Math.floor(100*t.y)/100})`})})),document.addEventListener("keypress",(e=>{Calc.setExpression({id:"Keyboard Press",latex:`K_{eyPress}(${e.keyCode-32})`})})),document.addEventListener("keydown",(e=>{Calc.setExpression({id:"Keyboard Down",latex:`K_{eyDown}(${e.keyCode})`}),Calc.setExpression({id:"Keyboard Up",latex:"K_{eyUp}(0)"})})),document.addEventListener("keyup",(e=>{Calc.setExpression({id:"Keyboard Up",latex:`K_{eyUp}(${e.keyCode})`}),Calc.setExpression({id:"Keyboard Down",latex:"K_{eyDown}(0)"})})),Root.addEventListener("contextmenu",(e=>{e.preventDefault()})),Root.addEventListener("mousedown",(e=>{for(let e=0;e<HelperFuncs.length;e++)console.log(HelperFuncs[e])})),window.requestAnimationFrame(updateFrame);
