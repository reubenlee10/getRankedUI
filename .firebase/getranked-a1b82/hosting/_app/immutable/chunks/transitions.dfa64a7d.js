import{p as x,W as u}from"./scheduler.697555f3.js";function _(n){const t=n-1;return t*t*t+1}function C(n,{delay:t=0,duration:o=400,easing:a=x}={}){const r=+getComputedStyle(n).opacity;return{delay:t,duration:o,easing:a,css:s=>`opacity: ${s*r}`}}function S(n,{delay:t=0,duration:o=400,easing:a=_,x:r=0,y:s=0,opacity:f=0}={}){const i=getComputedStyle(n),c=+i.opacity,y=i.transform==="none"?"":i.transform,p=c*(1-f),[d,m]=u(r),[l,$]=u(s);return{delay:t,duration:o,easing:a,css:(e,g)=>`
			transform: ${y} translate(${(1-e)*d}${m}, ${(1-e)*l}${$});
			opacity: ${c-p*g}`}}function U(n,t){const{transition:o,params:a,enabled:r}=t;return r?o(n,a):"duration"in a?o(n,{duration:0}):{duration:0}}export{C as a,_ as c,U as d,S as f};
