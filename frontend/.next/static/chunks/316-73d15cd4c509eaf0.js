(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[316],{6564:function(e,t,n){"use strict";n.d(t,{z:function(){return A}});var r=n(7294),o=n(263),a=n(1759),l=n(8216);let i={context:"HoverCard component was not found in the tree",children:"HoverCard.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"},[c,s]=(0,l.R)(i.context);var u=n(9328),d=n(3259),p=Object.defineProperty,f=Object.getOwnPropertySymbols,h=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable,m=(e,t,n)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,y=(e,t)=>{for(var n in t||(t={}))h.call(t,n)&&m(e,n,t[n]);if(f)for(var n of f(t))v.call(t,n)&&m(e,n,t[n]);return e},b=(e,t)=>{var n={};for(var r in e)h.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&f)for(var r of f(e))0>t.indexOf(r)&&v.call(e,r)&&(n[r]=e[r]);return n};let O={};function g(e){let t=(0,o.N4)("HoverCardDropdown",O,e),{children:n,onMouseEnter:a,onMouseLeave:l}=t,i=b(t,["children","onMouseEnter","onMouseLeave"]),c=s(),p=(0,u.x)(a,c.openDropdown),f=(0,u.x)(l,c.closeDropdown);return r.createElement(d.J.Dropdown,y({onMouseEnter:p,onMouseLeave:f},i),n)}g.displayName="@mantine/core/HoverCardDropdown";var w=n(4241),k=Object.defineProperty,M=Object.getOwnPropertySymbols,E=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable,C=(e,t,n)=>t in e?k(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,j=(e,t)=>{for(var n in t||(t={}))E.call(t,n)&&C(e,n,t[n]);if(M)for(var n of M(t))x.call(t,n)&&C(e,n,t[n]);return e},N=(e,t)=>{var n={};for(var r in e)E.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&M)for(var r of M(e))0>t.indexOf(r)&&x.call(e,r)&&(n[r]=e[r]);return n};let S={refProp:"ref"},D=(0,r.forwardRef)((e,t)=>{let n=(0,o.N4)("HoverCardTarget",S,e),{children:a,refProp:l}=n,c=N(n,["children","refProp"]);if(!(0,w.k)(a))throw Error(i.children);let p=s(),f=(0,u.x)(a.props.onMouseEnter,p.openDropdown),h=(0,u.x)(a.props.onMouseLeave,p.closeDropdown);return r.createElement(d.J.Target,j({refProp:l,ref:t},c),(0,r.cloneElement)(a,{onMouseEnter:f,onMouseLeave:h}))});D.displayName="@mantine/core/HoverCardTarget";var P=n(7347),I=Object.defineProperty,Z=Object.getOwnPropertySymbols,H=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable,F=(e,t,n)=>t in e?I(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,R=(e,t)=>{for(var n in t||(t={}))H.call(t,n)&&F(e,n,t[n]);if(Z)for(var n of Z(t))T.call(t,n)&&F(e,n,t[n]);return e},z=(e,t)=>{var n={};for(var r in e)H.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&Z)for(var r of Z(e))0>t.indexOf(r)&&T.call(e,r)&&(n[r]=e[r]);return n};let L={openDelay:0,closeDelay:150,initiallyOpened:!1};function A(e){let t=(0,o.N4)("HoverCard",L,e),{children:n,onOpen:l,onClose:i,openDelay:s,closeDelay:u,initiallyOpened:p}=t,f=z(t,["children","onOpen","onClose","openDelay","closeDelay","initiallyOpened"]),[h,{open:v,close:m}]=(0,a.q)(p,{onClose:i,onOpen:l}),{openDropdown:y,closeDropdown:b}=(0,P.U)({open:v,close:m,openDelay:s,closeDelay:u});return r.createElement(c,{value:{openDropdown:y,closeDropdown:b}},r.createElement(d.J,R({opened:h,__staticSelector:"HoverCard"},f),n))}A.displayName="@mantine/core/HoverCard",A.Target=D,A.Dropdown=g},14:function(e,t,n){"use strict";n.d(t,{o:function(){return R}});var r=n(7294),o=n(263),a=n(2566);let l={x:0,y:0,width:0,height:0,top:0,left:0,bottom:0,right:0};var i=n(1485),c=(0,i.k)((e,{transitionDuration:t})=>({control:{},root:{position:"relative"},content:{display:"flex",flexDirection:"column",overflow:"hidden",transitionProperty:"max-height",transitionTimingFunction:e.transitionTimingFunction,transitionDuration:`${t}ms`,"@media (prefers-reduced-motion)":{transitionDuration:e.respectReducedMotion?"0ms":void 0}}})),s=n(7414),u=n(8427),d=n(5117),p=Object.defineProperty,f=Object.getOwnPropertySymbols,h=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable,m=(e,t,n)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,y=(e,t)=>{for(var n in t||(t={}))h.call(t,n)&&m(e,n,t[n]);if(f)for(var n of f(t))v.call(t,n)&&m(e,n,t[n]);return e},b=(0,i.k)((e,{color:t,underline:n})=>({root:y({backgroundColor:"transparent",cursor:"pointer",padding:0,border:0,color:function({theme:e,color:t}){return"dimmed"===t?e.fn.dimmed():e.fn.themeColor(t||e.primaryColor,"dark"===e.colorScheme?4:7,!1,!0)}({theme:e,color:t})},e.fn.hover({textDecoration:n?"underline":"none"}))})),O=Object.defineProperty,g=Object.getOwnPropertySymbols,w=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable,M=(e,t,n)=>t in e?O(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,E=(e,t)=>{for(var n in t||(t={}))w.call(t,n)&&M(e,n,t[n]);if(g)for(var n of g(t))k.call(t,n)&&M(e,n,t[n]);return e},x=(e,t)=>{var n={};for(var r in e)w.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&g)for(var r of g(e))0>t.indexOf(r)&&k.call(e,r)&&(n[r]=e[r]);return n};let C={underline:!0},j=(0,r.forwardRef)((e,t)=>{let n=(0,o.N4)("Anchor",C,e),{component:a,className:l,unstyled:i,variant:c,size:s,color:u,underline:p}=n,f=x(n,["component","className","unstyled","variant","size","color","underline"]),{classes:h,cx:v}=b({color:u,underline:p},{name:"Anchor",unstyled:i,variant:c,size:s});return r.createElement(d.x,E(E({component:a||"a",ref:t,className:v(h.root,l),size:s},"button"===a?{type:"button"}:null),f))});j.displayName="@mantine/core/Anchor";let N=(0,u.F)(j);var S=Object.defineProperty,D=Object.getOwnPropertySymbols,P=Object.prototype.hasOwnProperty,I=Object.prototype.propertyIsEnumerable,Z=(e,t,n)=>t in e?S(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,H=(e,t)=>{for(var n in t||(t={}))P.call(t,n)&&Z(e,n,t[n]);if(D)for(var n of D(t))I.call(t,n)&&Z(e,n,t[n]);return e},T=(e,t)=>{var n={};for(var r in e)P.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&D)for(var r of D(e))0>t.indexOf(r)&&I.call(e,r)&&(n[r]=e[r]);return n};let F={maxHeight:100,transitionDuration:200,initialState:!1},R=(0,r.forwardRef)((e,t)=>{let n=(0,o.N4)("Spoiler",F,e),{className:i,children:u,maxHeight:d,hideLabel:p,showLabel:f,transitionDuration:h,controlRef:v,initialState:m,classNames:y,styles:b,unstyled:O,variant:g}=n,w=T(n,["className","children","maxHeight","hideLabel","showLabel","transitionDuration","controlRef","initialState","classNames","styles","unstyled","variant"]),{classes:k,cx:M}=c({transitionDuration:h},{name:"Spoiler",classNames:y,styles:b,unstyled:O,variant:g}),[E,x]=(0,r.useState)(m),[C,j]=(0,r.useState)(m),{ref:S,height:D}=function(){let[e,{width:t,height:n}]=function(){let e=(0,r.useRef)(0),t=(0,r.useRef)(null),[n,o]=(0,r.useState)(l),a=(0,r.useMemo)(()=>"undefined"!=typeof window?new ResizeObserver(n=>{let r=n[0];r&&(cancelAnimationFrame(e.current),e.current=requestAnimationFrame(()=>{t.current&&o(r.contentRect)}))}):null,[]);return(0,r.useEffect)(()=>(t.current&&a.observe(t.current),()=>{a.disconnect(),e.current&&cancelAnimationFrame(e.current)}),[t.current]),[t,n]}();return{ref:e,width:t,height:n}}(),P=E?p:f;return(0,r.useEffect)(()=>{j(d<D)},[D,d,u]),r.createElement(s.x,H({className:M(k.root,i),ref:t},w),r.createElement("div",{className:k.content,style:{maxHeight:E?D?(0,a.h)(D):void 0:(0,a.h)(d)}},r.createElement("div",{ref:S},u)),C&&r.createElement(N,{component:"button",ref:v,onClick:()=>x(e=>!e),className:k.control},P))});R.displayName="@mantine/core/Spoiler"},9801:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var r=(0,n(853).Z)("bell","IconBell",[["path",{d:"M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6",key:"svg-0"}],["path",{d:"M9 17v1a3 3 0 0 0 6 0v-1",key:"svg-1"}]])},2158:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var r=(0,n(853).Z)("dots-vertical","IconDotsVertical",[["path",{d:"M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",key:"svg-0"}],["path",{d:"M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",key:"svg-1"}],["path",{d:"M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",key:"svg-2"}]])},297:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var r=(0,n(853).Z)("messages","IconMessages",[["path",{d:"M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10",key:"svg-0"}],["path",{d:"M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2",key:"svg-1"}]])},471:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var r=(0,n(853).Z)("pencil","IconPencil",[["path",{d:"M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4",key:"svg-0"}],["path",{d:"M13.5 6.5l4 4",key:"svg-1"}]])},3461:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var r=(0,n(853).Z)("send","IconSend",[["path",{d:"M10 14l11 -11",key:"svg-0"}],["path",{d:"M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5",key:"svg-1"}]])},7726:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var r=(0,n(853).Z)("thumb-down","IconThumbDown",[["path",{d:"M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3",key:"svg-0"}]])},4455:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var r=(0,n(853).Z)("thumb-down-filled","IconThumbDownFilled",[["path",{d:"M13 21.008a3 3 0 0 0 2.995 -2.823l.005 -.177v-4h2a3 3 0 0 0 2.98 -2.65l.015 -.173l.005 -.177l-.02 -.196l-1.006 -5.032c-.381 -1.625 -1.502 -2.796 -2.81 -2.78l-.164 .008h-8a1 1 0 0 0 -.993 .884l-.007 .116l.001 9.536a1 1 0 0 0 .5 .866a2.998 2.998 0 0 1 1.492 2.396l.007 .202v1a3 3 0 0 0 3 3z",fill:"currentColor",key:"svg-0",strokeWidth:"0"}],["path",{d:"M5 14.008a1 1 0 0 0 .993 -.883l.007 -.117v-9a1 1 0 0 0 -.883 -.993l-.117 -.007h-1a2 2 0 0 0 -1.995 1.852l-.005 .15v7a2 2 0 0 0 1.85 1.994l.15 .005h1z",fill:"currentColor",key:"svg-1",strokeWidth:"0"}]])},3184:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var r=(0,n(853).Z)("thumb-up","IconThumbUp",[["path",{d:"M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3",key:"svg-0"}]])},5500:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var r=(0,n(853).Z)("thumb-up-filled","IconThumbUpFilled",[["path",{d:"M13 3a3 3 0 0 1 2.995 2.824l.005 .176v4h2a3 3 0 0 1 2.98 2.65l.015 .174l.005 .176l-.02 .196l-1.006 5.032c-.381 1.626 -1.502 2.796 -2.81 2.78l-.164 -.008h-8a1 1 0 0 1 -.993 -.883l-.007 -.117l.001 -9.536a1 1 0 0 1 .5 -.865a2.998 2.998 0 0 0 1.492 -2.397l.007 -.202v-1a3 3 0 0 1 3 -3z",fill:"currentColor",key:"svg-0",strokeWidth:"0"}],["path",{d:"M5 10a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-1a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-7a2 2 0 0 1 1.85 -1.995l.15 -.005h1z",fill:"currentColor",key:"svg-1",strokeWidth:"0"}]])},4075:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var r=(0,n(853).Z)("trash","IconTrash",[["path",{d:"M4 7l16 0",key:"svg-0"}],["path",{d:"M10 11l0 6",key:"svg-1"}],["path",{d:"M14 11l0 6",key:"svg-2"}],["path",{d:"M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12",key:"svg-3"}],["path",{d:"M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3",key:"svg-4"}]])},8553:function(e,t,n){e.exports=function(e){"use strict";var t=e&&"object"==typeof e&&"default"in e?e:{default:e},n={active:!0,breakpoints:{},delay:4e3,playOnInit:!0,stopOnInteraction:!0,stopOnMouseEnter:!1,stopOnLastSnap:!1,rootNode:null};function r(e){var o,a,l,i=t.default.optionsHandler(),c=i.merge(n,r.globalOptions),s=0;function u(){a.off("pointerDown",l),o.stopOnInteraction||a.off("pointerUp",f),p(),s=0}function d(){p(),s=window.setTimeout(h,o.delay)}function p(){s&&window.clearTimeout(s)}function f(){s&&(p(),d())}function h(){var e=a.internalEngine().index;if(o.stopOnLastSnap&&e.get()===e.max)return u();a.canScrollNext()?a.scrollNext():a.scrollTo(0),d()}var v={name:"autoplay",options:i.merge(c,e),init:function(e){a=e,l=(o=i.atMedia(v.options)).stopOnInteraction?u:p;var t=a.internalEngine().eventStore,n=a.rootNode(),r=o.rootNode&&o.rootNode(n)||n;a.on("pointerDown",l),o.stopOnInteraction||a.on("pointerUp",f),o.stopOnMouseEnter&&(t.add(r,"mouseenter",l),o.stopOnInteraction||t.add(r,"mouseleave",f)),t.add(document,"visibilitychange",function(){if("hidden"===document.visibilityState)return p();f()}),t.add(window,"pagehide",function(e){e.persisted&&p()}),o.playOnInit&&d()},destroy:u,play:d,stop:p,reset:f};return v}return r.globalOptions=void 0,r}(n(6883))},3237:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(2752),o=n(2376),a=n(4348);let l=r.hj.create({name:"placeholder",addOptions:()=>({emptyEditorClass:"is-editor-empty",emptyNodeClass:"is-empty",placeholder:"Write something …",showOnlyWhenEditable:!0,showOnlyCurrent:!0,includeChildren:!1}),addProseMirrorPlugins(){return[new o.Sy({key:new o.H$("placeholder"),props:{decorations:({doc:e,selection:t})=>{let n=this.editor.isEditable||!this.options.showOnlyWhenEditable,{anchor:r}=t,o=[];if(!n)return null;let l=e.type.createAndFill(),i=(null==l?void 0:l.sameMarkup(e))&&null===l.content.findDiffStart(e.content);return e.descendants((e,t)=>{let n=r>=t&&r<=t+e.nodeSize,l=!e.isLeaf&&!e.childCount;if((n||!this.options.showOnlyCurrent)&&l){let r=[this.options.emptyNodeClass];i&&r.push(this.options.emptyEditorClass);let l=a.p.node(t,t+e.nodeSize,{class:r.join(" "),"data-placeholder":"function"==typeof this.options.placeholder?this.options.placeholder({editor:this.editor,node:e,pos:t,hasAnchor:n}):this.options.placeholder});o.push(l)}return this.options.includeChildren}),a.EH.create(e,o)}}})]}})}}]);