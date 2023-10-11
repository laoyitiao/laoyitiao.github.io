import{_ as z,l as k,o as m,g as v,F as E,p as I,q as T,m as u,J as C,Z as W}from"./chunks/framework.f67d7268.js";function _(n){var e={target:"confetti-holder",max:80,size:1,animate:!0,respawn:!0,props:["circle","square","triangle","line"],colors:[[165,104,246],[230,61,135],[0,199,228],[253,214,126]],clock:25,interval:null,rotate:!1,start_from_edge:!1,width:window.innerWidth,height:window.innerHeight};if(n&&(n.target&&(e.target=n.target),n.max&&(e.max=n.max),n.size&&(e.size=n.size),n.animate!==void 0&&n.animate!==null&&(e.animate=n.animate),n.respawn!==void 0&&n.respawn!==null&&(e.respawn=n.respawn),n.props&&(e.props=n.props),n.colors&&(e.colors=n.colors),n.clock&&(e.clock=n.clock),n.start_from_edge!==void 0&&n.start_from_edge!==null&&(e.start_from_edge=n.start_from_edge),n.width&&(e.width=n.width),n.height&&(e.height=n.height),n.rotate!==void 0&&n.rotate!==null&&(e.rotate=n.rotate)),typeof e.target!="object"&&typeof e.target!="string")throw new TypeError("The target parameter should be a node or string");if(typeof e.target=="object"&&(e.target===null||!e.target instanceof HTMLCanvasElement)||typeof e.target=="string"&&(document.getElementById(e.target)===null||!document.getElementById(e.target)instanceof HTMLCanvasElement))throw new ReferenceError("The target element does not exist or is not a canvas element");var s=typeof e.target=="object"?e.target:document.getElementById(e.target),r=s.getContext("2d"),c=[];function i(t,a){t||(t=1);var l=Math.random()*t;return a?Math.floor(l):l}var f=e.props.reduce(function(t,a){return t+(a.weight||1)},0);function g(){for(var t=Math.random()*f,a=0;a<e.props.length;++a){var l=e.props[a].weight||1;if(t<l)return a;t-=l}}function y(){var t=e.props[g()],a={prop:t.type?t.type:t,x:i(e.width),y:e.start_from_edge?e.clock>=0?-10:parseFloat(e.height)+10:i(e.height),src:t.src,radius:i(4)+1,size:t.size,rotate:e.rotate,line:Math.floor(i(65)-30),angles:[i(10,!0)+2,i(10,!0)+2,i(10,!0)+2,i(10,!0)+2],color:e.colors[i(e.colors.length,!0)],rotation:i(360,!0)*Math.PI/180,speed:i(e.clock/7)+e.clock/30};return a}function x(t){if(t){var a=t.radius<=3?.4:.8;switch(r.fillStyle=r.strokeStyle="rgba("+t.color+", "+a+")",r.beginPath(),t.prop){case"circle":{r.moveTo(t.x,t.y),r.arc(t.x,t.y,t.radius*e.size,0,Math.PI*2,!0),r.fill();break}case"triangle":{r.moveTo(t.x,t.y),r.lineTo(t.x+t.angles[0]*e.size,t.y+t.angles[1]*e.size),r.lineTo(t.x+t.angles[2]*e.size,t.y+t.angles[3]*e.size),r.closePath(),r.fill();break}case"line":{r.moveTo(t.x,t.y),r.lineTo(t.x+t.line*e.size,t.y+t.radius*5),r.lineWidth=2*e.size,r.stroke();break}case"square":{r.save(),r.translate(t.x+15,t.y+5),r.rotate(t.rotation),r.fillRect(-15*e.size,-5*e.size,15*e.size,5*e.size),r.restore();break}case"svg":{r.save();var l=new window.Image;l.src=t.src;var o=t.size||15;r.translate(t.x+o/2,t.y+o/2),t.rotate&&r.rotate(t.rotation),r.drawImage(l,-(o/2)*e.size,-(o/2)*e.size,o*e.size,o*e.size),r.restore();break}}}}var h=function(){e.animate=!1,clearInterval(e.interval),requestAnimationFrame(function(){r.clearRect(0,0,s.width,s.height);var t=s.width;s.width=1,s.width=t})},p=function(){s.width=e.width,s.height=e.height,c=[];for(var t=0;t<e.max;t++)c.push(y());function a(){r.clearRect(0,0,e.width,e.height);for(var o in c)x(c[o]);l(),e.animate&&requestAnimationFrame(a)}function l(){for(var o=0;o<e.max;o++){var d=c[o];d&&(e.animate&&(d.y+=d.speed),d.rotate&&(d.rotation+=d.speed/35),(d.speed>=0&&d.y>e.height||d.speed<0&&d.y<0)&&(e.respawn?(c[o]=d,c[o].x=i(e.width,!0),c[o].y=d.speed>=0?-10:parseFloat(e.height)):c[o]=void 0))}c.every(function(b){return b===void 0})&&h()}return requestAnimationFrame(a)};return{render:p,clear:h}}const w=n=>(I("data-v-2e1b7d76"),n=n(),T(),n),M=w(()=>u("canvas",{id:"confetti-holder",class:"abs confetti"},"浏览器不支持canvas",-1)),S=w(()=>u("canvas",{id:"animal",class:"abs animal"},"浏览器不支持canvas",-1)),B={__name:"Confetti",setup(n){return k(()=>{const e=document.getElementById("confetti-holder"),s={target:e,max:"40",size:"1.5",animate:!0,props:["circle","square","triangle"],colors:[[165,104,246],[230,61,135],[0,199,228],[253,214,126]],clock:"15",rotate:!0,start_from_edge:!1,respawn:!0},r=document.getElementById("animal"),c={target:r,max:"5",size:"1",animate:!0,props:[{type:"svg",src:"/confettiWidget/panda.png",size:40,weight:.2},{type:"svg",src:"/confettiWidget/love-birds.png",size:40,weight:.1},{type:"svg",src:"/confettiWidget/octopus.png",size:40,weight:.1}],colors:[[165,104,246],[230,61,135],[0,199,228],[253,214,126]],clock:"10",rotate:!1,start_from_edge:!1,respawn:!0};let i;window.addEventListener("resize",()=>{clearTimeout(i),i=setTimeout(()=>{e.width=document.body.clientWidth,e.height=document.body.clientHeight,e.getContext("2d").clearRect(0,0,f.width,f.height),r.width=document.body.clientWidth,r.height=document.body.clientHeight},200)});const f=new _(s),g=new _(c);f.render(),g.render()}),(e,s)=>(m(),v(E,null,[M,S],64))}},F=z(B,[["__scopeId","data-v-2e1b7d76"]]);const P=["onContextmenu"],R=JSON.parse('{"title":"首页","description":"","frontmatter":{"layout":"home","title":"首页","hero":{"name":"Jun的静态博客","text":"不积硅步无以至千里","image":{"src":"/logo/sloth512.png","alt":"VitePress"},"actions":[{"theme":"brand","text":"文章阅读","link":"/posts/"}]},"features":[{"icon":{"src":"/confettiWidget/panda.png"},"title":"完整","details":"所有知识点深入剖析，深入浅出"},{"icon":{"src":"/confettiWidget/cute.png"},"title":"全面","details":"包含frontEnd、backEnd、devops的方方面面"},{"icon":{"src":"/confettiWidget/love-birds.png"},"title":"干净","details":"Docs不会收集您的任何信息"}]},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":1696865497000}'),q={name:"index.md"},j=Object.assign(q,{setup(n){return(e,s)=>(m(),v("div",null,[u("div",{id:"Confetti",onContextmenu:W(r=>{},["right"])},[C(F)],40,P)]))}});export{R as __pageData,j as default};