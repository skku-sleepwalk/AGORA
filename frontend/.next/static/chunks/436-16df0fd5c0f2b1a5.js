(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[436],{2445:function(e,r,t){"use strict";t.d(r,{W:function(){return g}});var a=t(7294),o=t(2566),n=t(263),l=t(1485),i=t(1434),c=(0,l.k)((e,{fluid:r,sizes:t},{size:a})=>({root:{paddingLeft:e.spacing.md,paddingRight:e.spacing.md,maxWidth:r?"100%":(0,i.a)({size:a,sizes:t}),marginLeft:"auto",marginRight:"auto"}})),s=t(7414),u=Object.defineProperty,d=Object.getOwnPropertySymbols,f=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,b=(e,r,t)=>r in e?u(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,m=(e,r)=>{for(var t in r||(r={}))f.call(r,t)&&b(e,t,r[t]);if(d)for(var t of d(r))p.call(r,t)&&b(e,t,r[t]);return e},y=(e,r)=>{var t={};for(var a in e)f.call(e,a)&&0>r.indexOf(a)&&(t[a]=e[a]);if(null!=e&&d)for(var a of d(e))0>r.indexOf(a)&&p.call(e,a)&&(t[a]=e[a]);return t};let v={sizes:{xs:(0,o.h)(540),sm:(0,o.h)(720),md:(0,o.h)(960),lg:(0,o.h)(1140),xl:(0,o.h)(1320)}},g=(0,a.forwardRef)((e,r)=>{let t=(0,n.N4)("Container",v,e),{className:o,fluid:l,size:i,unstyled:u,sizes:d,variant:f}=t,p=y(t,["className","fluid","size","unstyled","sizes","variant"]),{classes:b,cx:g}=c({fluid:l,sizes:d},{unstyled:u,name:"Container",variant:f,size:i});return a.createElement(s.x,m({className:g(b.root,o),ref:r},p))});g.displayName="@mantine/core/Container"},1141:function(e,r,t){"use strict";t.d(r,{m:function(){return e$}});var a=t(7294),o=t(263),n=t(8216);let l={context:"Tabs component was not found in the tree",value:"Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value"},[i,c]=(0,n.R)(l.context);var s=t(2566),u=t(1485),d=t(9893),f=Object.defineProperty,p=Object.getOwnPropertySymbols,b=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable,y=(e,r,t)=>r in e?f(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,v=(e,r)=>{for(var t in r||(r={}))b.call(r,t)&&y(e,t,r[t]);if(p)for(var t of p(r))m.call(r,t)&&y(e,t,r[t]);return e},g=(0,u.k)((e,r,{variant:t})=>{let a="vertical"===r.orientation;return{tabsList:v({display:"flex",flexWrap:"wrap",flexDirection:a?"column":"row",justifyContent:d.H[r.position],'& [role="tab"]':{flex:r.grow?1:void 0}},function({orientation:e,inverted:r,placement:t},a,o){let n="vertical"===e;return"default"===o?{[n?"left"===t?"borderRight":"borderLeft":r?"borderTop":"borderBottom"]:`${(0,s.h)(2)} solid ${"dark"===a.colorScheme?a.colors.dark[4]:a.colors.gray[3]}`}:"outline"===o?{[n?"left"===t?"borderRight":"borderLeft":r?"borderTop":"borderBottom"]:`${(0,s.h)(1)} solid ${"dark"===a.colorScheme?a.colors.dark[4]:a.colors.gray[3]}`}:"pills"===o?{gap:`calc(${a.spacing.sm} / 2)`}:{}}(r,e,t))}}),h=t(7414),O=Object.defineProperty,w=Object.defineProperties,j=Object.getOwnPropertyDescriptors,x=Object.getOwnPropertySymbols,k=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable,C=(e,r,t)=>r in e?O(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,N=(e,r)=>{for(var t in r||(r={}))k.call(r,t)&&C(e,t,r[t]);if(x)for(var t of x(r))P.call(r,t)&&C(e,t,r[t]);return e},T=(e,r)=>w(e,j(r)),I=(e,r)=>{var t={};for(var a in e)k.call(e,a)&&0>r.indexOf(a)&&(t[a]=e[a]);if(null!=e&&x)for(var a of x(e))0>r.indexOf(a)&&P.call(e,a)&&(t[a]=e[a]);return t};let R={grow:!1,position:"left"},S=(0,a.forwardRef)((e,r)=>{let t=(0,o.N4)("TabsList",R,e),{children:n,className:l,grow:i,position:s}=t,u=I(t,["children","className","grow","position"]),{orientation:d,variant:f,color:p,radius:b,inverted:m,placement:y,classNames:v,styles:O,unstyled:w}=c(),{classes:j,cx:x}=g({orientation:d,grow:i,color:p,position:s,radius:b,inverted:m,placement:y},{name:"Tabs",unstyled:w,classNames:v,styles:O,variant:f});return a.createElement(h.x,T(N({},u),{className:x(j.tabsList,l),ref:r,role:"tablist","aria-orientation":d}),n)});S.displayName="@mantine/core/TabsList";var $=t(7818),E=(0,u.k)((e,{orientation:r})=>({panel:{flex:"vertical"===r?1:void 0}})),L=Object.defineProperty,_=Object.defineProperties,D=Object.getOwnPropertyDescriptors,z=Object.getOwnPropertySymbols,K=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable,A=(e,r,t)=>r in e?L(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,J=(e,r)=>{for(var t in r||(r={}))K.call(r,t)&&A(e,t,r[t]);if(z)for(var t of z(r))U.call(r,t)&&A(e,t,r[t]);return e},W=(e,r)=>_(e,D(r)),B=(e,r)=>{var t={};for(var a in e)K.call(e,a)&&0>r.indexOf(a)&&(t[a]=e[a]);if(null!=e&&z)for(var a of z(e))0>r.indexOf(a)&&U.call(e,a)&&(t[a]=e[a]);return t};let M={},V=(0,a.forwardRef)((e,r)=>{let t=(0,o.N4)("TabsPanel",M,e),{value:n,children:l,sx:i,className:s}=t,u=B(t,["value","children","sx","className"]),d=c(),{classes:f,cx:p}=E({orientation:d.orientation,color:d.color,radius:d.radius,inverted:d.inverted,placement:d.placement},{name:"Tabs",unstyled:d.unstyled,classNames:d.classNames,styles:d.styles,variant:d.variant}),b=d.getPanelId(n),m=d.value===n,y=d.keepMounted?l:m?l:null;return(0,a.useEffect)(()=>(d.setMountedPanelIds(e=>[...e,b]),d.setMountedPanelIds(e=>e.filter(e=>e!==b))),[b]),a.createElement(h.x,W(J({},u),{ref:r,sx:[{display:m?void 0:"none"},...(0,$.R)(i)],className:p(f.panel,s),role:"tabpanel",id:b,"aria-labelledby":d.getTabId(n)}),y)});V.displayName="@mantine/core/TabsPanel";var q=t(6650),F=Object.defineProperty,H=Object.defineProperties,Z=Object.getOwnPropertyDescriptors,G=Object.getOwnPropertySymbols,Q=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable,Y=(e,r,t)=>r in e?F(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,ee=(e,r)=>{for(var t in r||(r={}))Q.call(r,t)&&Y(e,t,r[t]);if(G)for(var t of G(r))X.call(r,t)&&Y(e,t,r[t]);return e},er=(e,r)=>H(e,Z(r)),et=(0,u.k)((e,r,{variant:t})=>({tabLabel:{},tab:ee({position:"relative",padding:`${e.spacing.xs} ${e.spacing.md}`,paddingLeft:r.withIcon?e.spacing.xs:void 0,paddingRight:r.withRightSection?e.spacing.xs:void 0,fontSize:e.fontSizes.sm,whiteSpace:"nowrap",zIndex:0,display:"flex",alignItems:"center",justifyContent:"horizontal"===r.orientation?"center":void 0,lineHeight:1,"&:disabled":ee({opacity:.5,cursor:"not-allowed"},e.fn.hover({backgroundColor:"transparent"})),"&:focus":{zIndex:1}},function(e,{orientation:r,color:t,radius:a,inverted:o,placement:n},l){let i="vertical"===r,c=e.fn.variant({color:t,variant:"filled"}),u=(0,s.h)(e.fn.radius(a)),d="vertical"===r?"left"===n?`${u} 0 0 ${u}`:` 0 ${u} ${u} 0`:o?`0 0 ${u} ${u}`:`${u} ${u} 0 0`;return"default"===l?er(ee({[i?"left"===n?"borderRight":"borderLeft":o?"borderTop":"borderBottom"]:`${(0,s.h)(2)} solid transparent`,[i?"left"===n?"marginRight":"marginLeft":o?"marginTop":"marginBottom"]:(0,s.h)(-2),borderRadius:d},e.fn.hover({backgroundColor:"dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0],borderColor:"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3]})),{"&[data-active]":ee({borderColor:c.background,color:"dark"===e.colorScheme?e.white:e.black},e.fn.hover({borderColor:c.background}))}):"outline"===l?{borderRadius:d,border:`${(0,s.h)(1)} solid transparent`,[i?"left"===n?"borderRight":"borderLeft":o?"borderTop":"borderBottom"]:"none","&[data-active]":{borderColor:"dark"===e.colorScheme?e.colors.dark[4]:e.colors.gray[3],"&::before":{content:'""',backgroundColor:"dark"===e.colorScheme?e.colors.dark[7]:e.white,position:"absolute",bottom:i?0:o?"unset":(0,s.h)(-1),top:i?0:o?(0,s.h)(-1):"unset",[i?"width":"height"]:(0,s.h)(1),right:i?"left"===n?(0,s.h)(-1):"unset":0,left:i?"left"===n?"unset":(0,s.h)(-1):0}}}:"pills"===l?er(ee({borderRadius:e.fn.radius(a)},e.fn.hover({backgroundColor:"dark"===e.colorScheme?e.colors.dark[6]:e.colors.gray[0]})),{"&[data-active]":ee({backgroundColor:c.background,color:e.white},e.fn.hover({backgroundColor:c.background}))}):{}}(e,r,t)),tabRightSection:{display:"flex",justifyContent:"center",alignItems:"center","&:not(:only-child)":{marginLeft:(0,s.h)(7)}},tabIcon:{display:"flex",justifyContent:"center",alignItems:"center","&:not(:only-child)":{marginRight:(0,s.h)(7)}}})),ea=t(4736),eo=Object.defineProperty,en=Object.defineProperties,el=Object.getOwnPropertyDescriptors,ei=Object.getOwnPropertySymbols,ec=Object.prototype.hasOwnProperty,es=Object.prototype.propertyIsEnumerable,eu=(e,r,t)=>r in e?eo(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,ed=(e,r)=>{for(var t in r||(r={}))ec.call(r,t)&&eu(e,t,r[t]);if(ei)for(var t of ei(r))es.call(r,t)&&eu(e,t,r[t]);return e},ef=(e,r)=>en(e,el(r)),ep=(e,r)=>{var t={};for(var a in e)ec.call(e,a)&&0>r.indexOf(a)&&(t[a]=e[a]);if(null!=e&&ei)for(var a of ei(e))0>r.indexOf(a)&&es.call(e,a)&&(t[a]=e[a]);return t};let eb={},em=(0,a.forwardRef)((e,r)=>{let t=(0,o.N4)("TabsTab",eb,e),{value:n,children:l,onKeyDown:i,onClick:s,className:u,icon:d,rightSection:f,color:p}=t,b=ep(t,["value","children","onKeyDown","onClick","className","icon","rightSection","color"]),m=c(),y=!!d,v=!!f,{theme:g,classes:h,cx:O}=et({withIcon:y||v&&!l,withRightSection:v||y&&!l,orientation:m.orientation,color:p||m.color,radius:m.radius,inverted:m.inverted,placement:m.placement},{name:"Tabs",unstyled:m.unstyled,classNames:m.classNames,styles:m.styles,variant:m.variant}),w=n===m.value,j=m.getPanelId(n),x=m.mountedPanelIds.includes(n)?j:void 0;return a.createElement(ea.k,ef(ed({},b),{unstyled:m.unstyled,className:O(h.tab,u),"data-active":w||void 0,ref:r,type:"button",role:"tab",id:m.getTabId(n),"aria-selected":w,tabIndex:w||null===m.value?0:-1,"aria-controls":x,onClick:e=>{m.onTabChange(m.allowTabDeactivation&&n===m.value?null:n),null==s||s(e)},onKeyDown:(0,q.R)({siblingSelector:'[role="tab"]',parentSelector:'[role="tablist"]',activateOnFocus:m.activateTabWithKeyboard,loop:m.loop,dir:g.dir,orientation:m.orientation,onKeyDown:i})}),d&&a.createElement("span",{className:h.tabIcon},d),l&&a.createElement("span",{className:h.tabLabel},l),f&&a.createElement("span",{className:h.tabRightSection},f))});function ey(e,r){return t=>{if("string"!=typeof t||0===t.trim().length)throw Error(r);return`${e}-${t}`}}em.displayName="@mantine/core/Tab";var ev=t(3051),eg=t(5851);function eh({defaultValue:e,value:r,onTabChange:t,orientation:o,children:n,loop:c,id:s,activateTabWithKeyboard:u,allowTabDeactivation:d,variant:f,color:p,radius:b,inverted:m,placement:y,keepMounted:v=!0,classNames:g,styles:h,unstyled:O}){let w=(0,ev.M)(s),[j,x]=(0,a.useState)([]),[k,P]=(0,eg.C)({value:r,defaultValue:e,finalValue:null,onChange:t});return a.createElement(i,{value:{placement:y,value:k,orientation:o,id:w,loop:c,activateTabWithKeyboard:u,getTabId:ey(`${w}-tab`,l.value),getPanelId:ey(`${w}-panel`,l.value),onTabChange:P,setMountedPanelIds:x,mountedPanelIds:j,allowTabDeactivation:d,variant:f,color:p,radius:b,inverted:m,keepMounted:v,classNames:g,styles:h,unstyled:O}},n)}eh.displayName="@mantine/core/TabsProvider";var eO=(0,u.k)((e,{orientation:r,placement:t})=>({root:{display:"vertical"===r?"flex":void 0,flexDirection:"right"===t?"row-reverse":"row"}})),ew=Object.defineProperty,ej=Object.defineProperties,ex=Object.getOwnPropertyDescriptors,ek=Object.getOwnPropertySymbols,eP=Object.prototype.hasOwnProperty,eC=Object.prototype.propertyIsEnumerable,eN=(e,r,t)=>r in e?ew(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,eT=(e,r)=>{for(var t in r||(r={}))eP.call(r,t)&&eN(e,t,r[t]);if(ek)for(var t of ek(r))eC.call(r,t)&&eN(e,t,r[t]);return e},eI=(e,r)=>ej(e,ex(r)),eR=(e,r)=>{var t={};for(var a in e)eP.call(e,a)&&0>r.indexOf(a)&&(t[a]=e[a]);if(null!=e&&ek)for(var a of ek(e))0>r.indexOf(a)&&eC.call(e,a)&&(t[a]=e[a]);return t};let eS={orientation:"horizontal",loop:!0,activateTabWithKeyboard:!0,allowTabDeactivation:!1,unstyled:!1,inverted:!1,variant:"default",placement:"left"},e$=(0,a.forwardRef)((e,r)=>{let t=(0,o.N4)("Tabs",eS,e),{defaultValue:n,value:l,orientation:i,loop:c,activateTabWithKeyboard:s,allowTabDeactivation:u,children:d,id:f,onTabChange:p,variant:b,color:m,className:y,unstyled:v,classNames:g,styles:O,radius:w,inverted:j,keepMounted:x,placement:k}=t,P=eR(t,["defaultValue","value","orientation","loop","activateTabWithKeyboard","allowTabDeactivation","children","id","onTabChange","variant","color","className","unstyled","classNames","styles","radius","inverted","keepMounted","placement"]),{classes:C,cx:N}=eO({orientation:i,color:m,radius:w,inverted:j,placement:k},{unstyled:v,name:"Tabs",classNames:g,styles:O,variant:b});return a.createElement(eh,{activateTabWithKeyboard:s,defaultValue:n,orientation:i,onTabChange:p,value:l,id:f,loop:c,allowTabDeactivation:u,color:m,variant:b,radius:w,inverted:j,keepMounted:x,placement:k,classNames:g,styles:O,unstyled:v},a.createElement(h.x,eI(eT({},P),{className:N(C.root,y),id:f,ref:r}),d))});e$.List=S,e$.Tab=em,e$.Panel=V,e$.displayName="@mantine/core/Tabs"},7334:function(e){!function(){"use strict";var r={815:function(e){e.exports=function(e,t,a,o){t=t||"&",a=a||"=";var n={};if("string"!=typeof e||0===e.length)return n;var l=/\+/g;e=e.split(t);var i=1e3;o&&"number"==typeof o.maxKeys&&(i=o.maxKeys);var c=e.length;i>0&&c>i&&(c=i);for(var s=0;s<c;++s){var u,d,f,p,b=e[s].replace(l,"%20"),m=b.indexOf(a);(m>=0?(u=b.substr(0,m),d=b.substr(m+1)):(u=b,d=""),f=decodeURIComponent(u),p=decodeURIComponent(d),Object.prototype.hasOwnProperty.call(n,f))?r(n[f])?n[f].push(p):n[f]=[n[f],p]:n[f]=p}return n};var r=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}},577:function(e){var r=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,n,l,i){return(n=n||"&",l=l||"=",null===e&&(e=void 0),"object"==typeof e)?a(o(e),function(o){var i=encodeURIComponent(r(o))+l;return t(e[o])?a(e[o],function(e){return i+encodeURIComponent(r(e))}).join(n):i+encodeURIComponent(r(e[o]))}).join(n):i?encodeURIComponent(r(i))+l+encodeURIComponent(r(e)):""};var t=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};function a(e,r){if(e.map)return e.map(r);for(var t=[],a=0;a<e.length;a++)t.push(r(e[a],a));return t}var o=Object.keys||function(e){var r=[];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.push(t);return r}}},t={};function a(e){var o=t[e];if(void 0!==o)return o.exports;var n=t[e]={exports:{}},l=!0;try{r[e](n,n.exports,a),l=!1}finally{l&&delete t[e]}return n.exports}a.ab="//";var o={};o.decode=o.parse=a(815),o.encode=o.stringify=a(577),e.exports=o}()},4593:function(e,r,t){"use strict";t.d(r,{ZP:function(){return s}});var a=t(7294),o=t(5591),n=t(1753),l=t(1688);let i=e=>(0,n.qC)(e?e(0,null):null)[0],c=Promise.resolve(),s=(0,n.xD)(o.ZP,e=>(r,t,o)=>{let s;let u=(0,a.useRef)(!1),{cache:d,initialSize:f=1,revalidateAll:p=!1,persistSize:b=!1,revalidateFirstPage:m=!0,revalidateOnMount:y=!1,parallel:v=!1}=o;try{(s=i(r))&&(s="$inf$"+s)}catch(e){}let[g,h,O]=(0,n.JN)(d,s),w=(0,a.useCallback)(()=>{let e=(0,n.o8)(g()._l)?f:g()._l;return e},[d,s,f]);(0,l.useSyncExternalStore)((0,a.useCallback)(e=>s?O(s,()=>{e()}):()=>{},[d,s]),w,w);let j=(0,a.useCallback)(()=>{let e=g()._l;return(0,n.o8)(e)?f:e},[s,f]),x=(0,a.useRef)(j());(0,n.LI)(()=>{if(!u.current){u.current=!0;return}s&&h({_l:b?x.current:j()})},[s,d]);let k=y&&!u.current,P=e(s,async e=>{let a=g()._i,l=[],i=j(),[c]=(0,n.JN)(d,e),s=c().data,u=[],f=null;for(let e=0;e<i;++e){let[i,c]=(0,n.qC)(r(e,v?null:f));if(!i)break;let[b,y]=(0,n.JN)(d,i),g=b().data,h=p||a||(0,n.o8)(g)||m&&!e&&!(0,n.o8)(s)||k||s&&!(0,n.o8)(s[e])&&!o.compare(s[e],g);if(t&&h){let r=async()=>{y({data:g=await t(c),_k:c}),l[e]=g};v?u.push(r):await r()}else l[e]=g;v||(f=g)}return v&&await Promise.all(u.map(e=>e())),h({_i:n.i_}),l},o),C=(0,a.useCallback)(function(e,r){let t="boolean"==typeof r?{revalidate:r}:r||{},a=!1!==t.revalidate;return s?(a&&((0,n.o8)(e)?h({_i:!0}):h({_i:!1})),arguments.length?P.mutate(e,{...t,revalidate:a}):P.mutate()):c},[s,d]),N=(0,a.useCallback)(e=>{let t;if(!s)return c;let[,a]=(0,n.JN)(d,s);if((0,n.mf)(e)?t=e(j()):"number"==typeof e&&(t=e),"number"!=typeof t)return c;a({_l:t}),x.current=t;let o=[],[l]=(0,n.JN)(d,s),i=null;for(let e=0;e<t;++e){let[t]=(0,n.qC)(r(e,i)),[a]=(0,n.JN)(d,t),c=t?a().data:n.i_;if((0,n.o8)(c))return C(l().data);o.push(c),i=c}return C(o)},[s,d,C,j]);return{size:j(),setSize:N,mutate:C,get data(){return P.data},get error(){return P.error},get isValidating(){return P.isValidating},get isLoading(){return P.isLoading}}})}}]);