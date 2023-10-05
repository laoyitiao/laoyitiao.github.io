import{_ as k,q as b,o as _,g as w,F as T,v as W,x as I,s as f,k as C,Z as E}from"./chunks/framework.4e7d56ce.js";function m(i){var e={target:"confetti-holder",max:80,size:1,animate:!0,respawn:!0,props:["circle","square","triangle","line"],colors:[[165,104,246],[230,61,135],[0,199,228],[253,214,126]],clock:25,interval:null,rotate:!1,start_from_edge:!1,width:window.innerWidth,height:window.innerHeight};if(i&&(i.target&&(e.target=i.target),i.max&&(e.max=i.max),i.size&&(e.size=i.size),i.animate!==void 0&&i.animate!==null&&(e.animate=i.animate),i.respawn!==void 0&&i.respawn!==null&&(e.respawn=i.respawn),i.props&&(e.props=i.props),i.colors&&(e.colors=i.colors),i.clock&&(e.clock=i.clock),i.start_from_edge!==void 0&&i.start_from_edge!==null&&(e.start_from_edge=i.start_from_edge),i.width&&(e.width=i.width),i.height&&(e.height=i.height),i.rotate!==void 0&&i.rotate!==null&&(e.rotate=i.rotate)),typeof e.target!="object"&&typeof e.target!="string")throw new TypeError("The target parameter should be a node or string");if(typeof e.target=="object"&&(e.target===null||!e.target instanceof HTMLCanvasElement)||typeof e.target=="string"&&(document.getElementById(e.target)===null||!document.getElementById(e.target)instanceof HTMLCanvasElement))throw new ReferenceError("The target element does not exist or is not a canvas element");var s=typeof e.target=="object"?e.target:document.getElementById(e.target),n=s.getContext("2d"),c=[];function o(t,a){t||(t=1);var d=Math.random()*t;return a?Math.floor(d):d}var g=e.props.reduce(function(t,a){return t+(a.weight||1)},0);function u(){for(var t=Math.random()*g,a=0;a<e.props.length;++a){var d=e.props[a].weight||1;if(t<d)return a;t-=d}}function p(){var t=e.props[u()],a={prop:t.type?t.type:t,x:o(e.width),y:e.start_from_edge?e.clock>=0?-10:parseFloat(e.height)+10:o(e.height),src:t.src,radius:o(4)+1,size:t.size,rotate:e.rotate,line:Math.floor(o(65)-30),angles:[o(10,!0)+2,o(10,!0)+2,o(10,!0)+2,o(10,!0)+2],color:e.colors[o(e.colors.length,!0)],rotation:o(360,!0)*Math.PI/180,speed:o(e.clock/7)+e.clock/30};return a}function y(t){if(t){var a=t.radius<=3?.4:.8;switch(n.fillStyle=n.strokeStyle="rgba("+t.color+", "+a+")",n.beginPath(),t.prop){case"circle":{n.moveTo(t.x,t.y),n.arc(t.x,t.y,t.radius*e.size,0,Math.PI*2,!0),n.fill();break}case"triangle":{n.moveTo(t.x,t.y),n.lineTo(t.x+t.angles[0]*e.size,t.y+t.angles[1]*e.size),n.lineTo(t.x+t.angles[2]*e.size,t.y+t.angles[3]*e.size),n.closePath(),n.fill();break}case"line":{n.moveTo(t.x,t.y),n.lineTo(t.x+t.line*e.size,t.y+t.radius*5),n.lineWidth=2*e.size,n.stroke();break}case"square":{n.save(),n.translate(t.x+15,t.y+5),n.rotate(t.rotation),n.fillRect(-15*e.size,-5*e.size,15*e.size,5*e.size),n.restore();break}case"svg":{n.save();var d=new window.Image;d.src=t.src;var r=t.size||15;n.translate(t.x+r/2,t.y+r/2),t.rotate&&n.rotate(t.rotation),n.drawImage(d,-(r/2)*e.size,-(r/2)*e.size,r*e.size,r*e.size),n.restore();break}}}}var h=function(){e.animate=!1,clearInterval(e.interval),requestAnimationFrame(function(){n.clearRect(0,0,s.width,s.height);var t=s.width;s.width=1,s.width=t})},x=function(){s.width=e.width,s.height=e.height,c=[];for(var t=0;t<e.max;t++)c.push(p());function a(){n.clearRect(0,0,e.width,e.height);for(var r in c)y(c[r]);d(),e.animate&&requestAnimationFrame(a)}function d(){for(var r=0;r<e.max;r++){var l=c[r];l&&(e.animate&&(l.y+=l.speed),l.rotate&&(l.rotation+=l.speed/35),(l.speed>=0&&l.y>e.height||l.speed<0&&l.y<0)&&(e.respawn?(c[r]=l,c[r].x=o(e.width,!0),c[r].y=l.speed>=0?-10:parseFloat(e.height)):c[r]=void 0))}c.every(function(z){return z===void 0})&&h()}return requestAnimationFrame(a)};return{render:x,clear:h}}const v=i=>(W("data-v-8c002d23"),i=i(),I(),i),F=v(()=>f("canvas",{id:"confetti-holder",class:"abs confetti"},"浏览器不支持canvas",-1)),M=v(()=>f("canvas",{id:"animal",class:"abs animal"},"浏览器不支持canvas",-1)),B={__name:"Confetti",setup(i){return b(()=>{const e=document.getElementById("confetti-holder"),s={target:e,max:"30",size:"1.5",animate:!0,props:["circle","square","triangle"],colors:[[165,104,246],[230,61,135],[0,199,228],[253,214,126]],clock:"15",rotate:!0,start_from_edge:!1,respawn:!0},n=document.getElementById("animal"),c={target:n,max:"5",size:"1",animate:!0,props:[{type:"svg",src:"/confettiWidget/panda.png",size:40,weight:.2},{type:"svg",src:"/confettiWidget/corgi.png",size:40,weight:.1},{type:"svg",src:"/confettiWidget/cute.png",size:40,weight:.1},{type:"svg",src:"/confettiWidget/hamster.png",size:40,weight:.1},{type:"svg",src:"/confettiWidget/happy-face.png",size:40,weight:.1},{type:"svg",src:"/confettiWidget/love-birds.png",size:40,weight:.1},{type:"svg",src:"/confettiWidget/octopus.png",size:40,weight:.1},{type:"svg",src:"/confettiWidget/workout.png",size:40,weight:.1}],colors:[[165,104,246],[230,61,135],[0,199,228],[253,214,126]],clock:"10",rotate:!1,start_from_edge:!1,respawn:!0};let o;window.addEventListener("resize",()=>{clearTimeout(o),o=setTimeout(()=>{e.width=document.body.clientWidth,e.height=document.body.clientHeight,e.getContext("2d").clearRect(0,0,g.width,g.height),n.width=document.body.clientWidth,n.height=document.body.clientHeight},200)});const g=new m(s),u=new m(c);g.render(),u.render()}),(e,s)=>(_(),w(T,null,[F,M],64))}},S=k(B,[["__scopeId","data-v-8c002d23"]]);const P=["onContextmenu"],L=JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"Jun的静态博客","text":"不积硅步无以至千里","tagline":"b.2023","image":{"src":"/logo/sloth512.png","alt":"VitePress"},"actions":[{"theme":"brand","text":"瞄一哈","link":"/posts/"},{"theme":"alt","text":"在GitHub上查看","link":"https://github.com/laoyitiao/docs"}]},"features":[{"icon":{"src":"/confettiWidget/panda.png"},"title":"Feature A","details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit","linkText":"百度","link":"http://www.baidu.com","rel":"external"},{"icon":{"src":"/confettiWidget/cute.png"},"title":"Feature B","details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit","linkText":"前往查看","link":"http://www.baidu.com","rel":"external"},{"icon":{"src":"/confettiWidget/love-birds.png"},"title":"Feature C","details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit","linkText":"百度","link":"http://www.baidu.com","rel":"external"}]},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":1696338709000}'),q={name:"index.md"},R=Object.assign(q,{setup(i){return(e,s)=>(_(),w("div",null,[f("div",{id:"Confetti",onContextmenu:E(n=>{},["right"])},[C(S)],40,P)]))}});export{L as __pageData,R as default};