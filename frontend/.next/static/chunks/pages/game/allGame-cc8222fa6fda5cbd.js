(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[363],{9153:function(e,t,i){"use strict";i.d(t,{Z:function(){return n}});var n=(0,i(853).Z)("search","IconSearch",[["path",{d:"M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0",key:"svg-0"}],["path",{d:"M21 21l-6 -6",key:"svg-1"}]])},5028:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/game/allGame",function(){return i(4115)}])},1576:function(e,t,i){"use strict";i.d(t,{Z:function(){return s}});var n=i(5893),r=i(2445),o=i(1485);let l=(0,o.k)((e,t)=>{let{shadow:i,borderRadius:n}=t;return{cardContainer:{boxShadow:"0px 3px ".concat(i,"px rgba(0, 0, 0, 0.2)"),borderRadius:n,margin:"0"}}});var s=function(e){let{children:t,shadow:i=10,borderRadius:o=15,className:s,...a}=e,{classes:d,cx:c}=l({shadow:i,borderRadius:o});return(0,n.jsx)(r.W,{className:c(d.cardContainer,s),...a,children:t})}},1986:function(e,t,i){"use strict";i.d(t,{Z:function(){return l}});var n=i(5893),r=i(1485);let o=(0,r.k)(e=>({container:{width:"100%",height:"100%"},tapContainer:{position:"fixed",width:"100%",height:"3rem",zIndex:50},upMainContainer:{position:"relative",top:"3rem",width:"100%"},upContainer:{aspectRatio:"20 / 7",width:"100%"},mainContainer:{width:"100%",margin:0}}));var l=function(e){let{children:t,tapSection:i,upSection:r}=e,{classes:l}=o();return(0,n.jsxs)("div",{className:l.container,children:[(0,n.jsx)("div",{className:l.tapContainer,children:i}),(0,n.jsxs)("div",{className:l.upMainContainer,children:[r&&(0,n.jsx)("div",{className:l.upContainer,children:r}),(0,n.jsx)("div",{className:l.mainContainer,children:t})]})]})}},8575:function(e,t,i){"use strict";i.d(t,{L:function(){return c}});var n=i(5893),r=i(1141),o=i(1485);let l=(0,o.k)(e=>({tabList:{position:"relative",boxSizing:"border-box",width:"100%",height:"3rem",borderBottom:"0.2rem solid white",backgroundColor:"white",boxShadow:"0px 3px 10px rgba(0, 0, 0, 0.2)"},tabItem:{width:"7rem",height:"3rem",fontSize:"1rem","&:hover":{backgroundColor:"transparent",borderBottom:"0.2rem solid white"}},tabItemActive:{color:"".concat(e.colors.blue[6]," !important"),borderBottom:"0.2rem solid ".concat(e.colors.blue[6]),"&:hover":{borderBottom:"0.2rem solid ".concat(e.colors.blue[6])}},button_B:{position:"absolute",top:"0.35rem",right:"4rem",borderColor:"black","&:hover":{backgroundColor:"transparent"},".mantine-Button-inner":{fontWeight:"normal",color:"black"}},button_S:{display:"none"}}));var s=i(7294),a=i(4065),d=i(1163);function c(e){let{active:t}=e,{classes:i,cx:o}=l(),[c,h]=(0,s.useState)(t),u=(0,d.useRouter)();return(0,a.a)("(max-width: 780px)"),(0,n.jsx)(r.m,{value:c,onTabChange:h,children:(0,n.jsxs)(r.m.List,{className:i.tabList,position:"center",children:[(0,n.jsx)(r.m.Tab,{value:"main",className:o(i.tabItem,"main"===c&&i.tabItemActive),onClick:()=>u.replace("/game"),children:"메인"}),(0,n.jsx)(r.m.Tab,{value:"develop",className:o(i.tabItem,"develop"===c&&i.tabItemActive),onClick:()=>u.replace("/game/developStory"),children:"개발 과정"}),(0,n.jsx)(r.m.Tab,{value:"allGame",className:o(i.tabItem,"allGame"===c&&i.tabItemActive),onClick:()=>u.replace("/game/allGame"),children:"전체 게임"})]})})}},3177:function(e,t,i){"use strict";i.d(t,{Z:function(){return v}});var n=i(5893),r=i(1576),o=i(263),l=i(1232),s=i(9985),a=i(7564),d=i(5117),c=function(e){let{user:t}=e;return(0,o.rZ)(),(0,n.jsxs)(l.Z,{spacing:7,children:[(0,n.jsx)(s.q,{src:"https://avatars.githubusercontent.com/u/52057157?v=4",radius:"xl",size:20}),(0,n.jsx)(a.K,{spacing:5,children:(0,n.jsx)(d.x,{size:"xs",children:t.name})})]})},h=i(434),u=i(7294),x=i(1664),m=i.n(x);function v(e){var t,i,o,s,a,x,v,g,p,f,j;let{post:y,thumbnailUrl:b}=e,[w,C]=(0,u.useState)(!1),k={marginLeft:"1rem",marginTop:"0.5rem"},Z=null===(t=y.genres)||void 0===t?void 0:t.map(e=>e.name),N=null==Z?void 0:Z.join(", ");return console.log(null===(i=y.store)||void 0===i?void 0:i.cost),(0,n.jsx)(m(),{href:"/game/".concat(y.id),style:{textDecoration:"none",color:"black"},children:(0,n.jsxs)(r.Z,{style:{transform:w?"scale(1.1)":"scale(1)",transition:"transform 0.3s ease",height:"20rem",width:"16rem",padding:"0px",overflow:"hidden"},onMouseEnter:()=>{C(!0)},onMouseLeave:()=>{C(!1)},children:[(0,n.jsx)(d.x,{size:"xs",color:"gray",style:k,children:N}),(0,n.jsx)(d.x,{"font-weight":"bold",size:20,style:k,children:y.store.title}),(0,n.jsxs)(l.Z,{position:"apart",style:k,children:[(0,n.jsx)(c,{user:y.author}),(0,n.jsx)(l.Z,{spacing:0,children:(0,n.jsxs)(l.Z,{spacing:5,style:{marginRight:"1rem"},children:[(0,n.jsx)(h.Z,{size:15,stroke:1.3}),(0,n.jsxs)(d.x,{size:"xs",children:["(",y.likeCount,")"]})]})})]}),(0,n.jsx)(l.Z,{children:(null===(o=y.store.cost)||void 0===o?void 0:o.isSale)?(0,n.jsxs)(d.x,{style:{marginLeft:"190px"},align:"right",td:"line-through",c:"gray",size:"md",children:["\\",null===(s=y.store)||void 0===s?void 0:null===(a=s.cost)||void 0===a?void 0:a.defaultPrice]}):null}),(0,n.jsx)("div",{style:{marginRight:"1rem"},children:(null===(x=y.store.cost)||void 0===x?void 0:x.isFree)?(0,n.jsx)(d.x,{align:"right",size:"lg",children:"FREE"}):(null===(v=y.store.cost)||void 0===v?void 0:v.isSale)?(0,n.jsxs)(l.Z,{style:{paddingLeft:"124px"},children:[(0,n.jsxs)(d.x,{style:{backgroundColor:"#F1A2A2"},children:["-",y.store.cost.salePercentage,"%"]}),(0,n.jsxs)(d.x,{size:"lg",children:["\\",null===(g=y.store)||void 0===g?void 0:null===(p=g.cost)||void 0===p?void 0:p.saledPrice]})]}):(0,n.jsxs)(d.x,{align:"right",size:"lg",children:["\\",null===(f=y.store)||void 0===f?void 0:null===(j=f.cost)||void 0===j?void 0:j.defaultPrice]})}),(0,n.jsxs)("div",{style:{position:"relative",width:"320px",height:"100rem",overflow:"hidden"},children:[(0,n.jsx)("img",{src:y.shortImgUrl,height:"400rem"}),w&&(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",opacity:1,transition:"opacity 0.3s ease"}}),(0,n.jsx)("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,height:"10rem",width:"16rem",color:"white",display:"flex",alignItems:"center",justifyContent:"center",opacity:1,transition:"opacity 0.3s ease"},children:(0,n.jsx)("p",{children:y.shortContent})})]})]})]})})}},4115:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return w}});var n=i(5893),r=i(61),o=i(9153),l=i(5938),s=i(7294);function a(e){let{setsearch:t}=e,[i,a]=(0,s.useState)("");return(0,n.jsx)("div",{style:{width:"80%"},children:(0,n.jsx)(r.o,{radius:"xl",onChange:e=>a(e.currentTarget.value),rightSection:(0,n.jsx)("div",{style:{borderLeft:"solid 0.5px black",paddingLeft:"10px",background:"#9E9E9E",height:"100%",display:"flex",alignContent:"center",justifyContent:"center",borderTopRightRadius:"20px",borderBottomRightRadius:"20px"},children:(0,n.jsx)(l.Z,{onClick:e=>{t(i)},children:(0,n.jsx)(o.Z,{style:{marginRight:"15px"}})})})})})}var d=i(1576),c=i(5117),h=i(3775);function u(e){let{genreList:t,setGenre:i}=e;return(0,n.jsx)(d.Z,{style:{height:"100%",width:"100%",paddingBottom:"2rem"},children:(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,n.jsx)("div",{style:{marginTop:"2rem"},children:(0,n.jsx)(c.x,{fz:"xl",fw:700,children:"장르"})}),t.map(e=>(0,n.jsx)("label",{children:(0,n.jsx)("div",{style:{display:"flex",flexDirection:"row",gap:"10rem",marginTop:"1rem"},children:(0,n.jsxs)(l.Z,{onClick:()=>{i(e.id)},children:[(0,n.jsx)("div",{children:(0,n.jsx)(h.X,{checked:e.checked})}),(0,n.jsx)("div",{style:{marginLeft:"0.5rem"},children:(0,n.jsx)(c.x,{fz:"md",children:e.id})})]})})}))]})})}var x=i(8575),m=i(3177),v=i(4593),g=i(7334),p=i(7967),f=i(8823);let j=(e,t,i)=>{let{genreNames:n,search:r}=i;if(t&&null===t.data.cursor.afterCursor)return null;let o="",l="";return""!=r&&void 0!=r&&null!=r&&(l=r),0===e?(console.log("장르",n),console.log("서치",l),o=(0,g.stringify)({genreNames:n,q:l})):o=(0,g.stringify)({afterCursor:null==t?void 0:t.data.cursor.afterCursor,genreNames:n,q:l}),"".concat("http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000","/game/search?").concat(o)};var y=function(){var e,t,i,n,r;let o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{token:l}=(0,f.Z)(),s=(0,v.ZP)((e,t)=>j(e,t,o),e=>(0,p._)(e,l));console.log(l);let a=(null===(e=null===(t=s.data)||void 0===t?void 0:null===(i=t[s.data.length-1])||void 0===i?void 0:i.data.cursor)||void 0===e?void 0:e.afterCursor)===null,d=(null===(n=s.data)||void 0===n?void 0:null===(r=n[0])||void 0===r?void 0:r.data.data.length)===0;return{...s,isLast:a,isEmpty:d}},b=i(1986);function w(){var e,t,i,r;let[o,l]=(0,s.useState)([{id:"전략",checked:!0},{id:"디펜스",checked:!0}]),[d,c]=(0,s.useState)(""),{data:h,isLoading:v,setSize:g,mutate:p,isEmpty:f}=y({genreNames:function(e){let t=[];for(let i of e)i.checked&&t.push(i.id);return t}(o),search:d});return(0,n.jsx)(b.Z,{tapSection:(0,n.jsx)(x.L,{active:"allGame"}),children:(0,n.jsx)("div",{style:{display:"flex",flexDirection:"column"},children:(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[(0,n.jsx)("div",{style:{width:"20%"},children:(0,n.jsx)(u,{genreList:o,setGenre:e=>{l(t=>t.map(t=>t.id===e?{...t,checked:!t.checked}:t))}})}),(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"column",width:"80%"},children:[(0,n.jsx)("div",{style:{display:"flex",justifyContent:"center",paddingTop:"50px"},children:(0,n.jsx)(a,{setsearch:c})}),(0,n.jsx)("div",{style:{display:"flex",justifyContent:"center",paddingTop:"2rem"},children:(0,n.jsx)("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",width:"80%"},children:(0,n.jsx)("div",{style:{display:"flex",flexDirection:"row"},children:(null===(e=null==h?void 0:null===(t=h[0])||void 0===t?void 0:null===(i=t.data)||void 0===i?void 0:i.data[0])||void 0===e?void 0:e.id)!=void 0&&(0,n.jsx)("div",{style:{width:"85%",height:"85%"},children:(0,n.jsx)(m.Z,{post:h[0].data.data[0]||null},(null===(r=h[0].data.data[0])||void 0===r?void 0:r.id)||"")})})})})]})]})})})}}},function(e){e.O(0,[723,774,888,179],function(){return e(e.s=5028)}),_N_E=e.O()}]);