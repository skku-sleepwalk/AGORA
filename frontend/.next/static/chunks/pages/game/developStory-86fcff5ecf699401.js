(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[941],{8290:function(e,t,i){"use strict";i.d(t,{Z:function(){return n}});var n=(0,i(853).Z)("bookmark","IconBookmark",[["path",{d:"M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2",key:"svg-0"}]])},1209:function(e,t,i){"use strict";i.d(t,{Z:function(){return n}});var n=(0,i(853).Z)("chevron-left","IconChevronLeft",[["path",{d:"M15 6l-6 6l6 6",key:"svg-0"}]])},434:function(e,t,i){"use strict";i.d(t,{Z:function(){return n}});var n=(0,i(853).Z)("heart","IconHeart",[["path",{d:"M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572",key:"svg-0"}]])},7447:function(e,t,i){"use strict";i.d(t,{Z:function(){return n}});var n=(0,i(853).Z)("message","IconMessage",[["path",{d:"M8 9h8",key:"svg-0"}],["path",{d:"M8 13h6",key:"svg-1"}],["path",{d:"M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z",key:"svg-2"}]])},653:function(e,t,i){"use strict";i.d(t,{Z:function(){return n}});var n=(0,i(853).Z)("share","IconShare",[["path",{d:"M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",key:"svg-0"}],["path",{d:"M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",key:"svg-1"}],["path",{d:"M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",key:"svg-2"}],["path",{d:"M8.7 10.7l6.6 -3.4",key:"svg-3"}],["path",{d:"M8.7 13.3l6.6 3.4",key:"svg-4"}]])},2628:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/game/developStory",function(){return i(1683)}])},1576:function(e,t,i){"use strict";i.d(t,{Z:function(){return s}});var n=i(5893),r=i(2445),a=i(1485);let l=(0,a.k)((e,t)=>{let{shadow:i,borderRadius:n}=t;return{cardContainer:{boxShadow:"0px 3px ".concat(i,"px rgba(0, 0, 0, 0.2)"),borderRadius:n,margin:"0"}}});var s=function(e){let{children:t,shadow:i=10,borderRadius:a=15,className:s,...o}=e,{classes:d,cx:c}=l({shadow:i,borderRadius:a});return(0,n.jsx)(r.W,{className:c(d.cardContainer,s),...o,children:t})}},1986:function(e,t,i){"use strict";i.d(t,{Z:function(){return l}});var n=i(5893),r=i(1485);let a=(0,r.k)(e=>({container:{width:"100%",height:"100%"},tapContainer:{position:"fixed",width:"100%",height:"3rem",zIndex:50},upMainContainer:{position:"relative",top:"3rem",width:"100%"},upContainer:{aspectRatio:"20 / 7",width:"100%"},mainContainer:{width:"100%",margin:0}}));var l=function(e){let{children:t,tapSection:i,upSection:r}=e,{classes:l}=a();return(0,n.jsxs)("div",{className:l.container,children:[(0,n.jsx)("div",{className:l.tapContainer,children:i}),(0,n.jsxs)("div",{className:l.upMainContainer,children:[r&&(0,n.jsx)("div",{className:l.upContainer,children:r}),(0,n.jsx)("div",{className:l.mainContainer,children:t})]})]})}},8575:function(e,t,i){"use strict";i.d(t,{L:function(){return c}});var n=i(5893),r=i(1141),a=i(1485);let l=(0,a.k)(e=>({tabList:{position:"relative",boxSizing:"border-box",width:"100%",height:"3rem",borderBottom:"0.2rem solid white",backgroundColor:"white",boxShadow:"0px 3px 10px rgba(0, 0, 0, 0.2)"},tabItem:{width:"7rem",height:"3rem",fontSize:"1rem","&:hover":{backgroundColor:"transparent",borderBottom:"0.2rem solid white"}},tabItemActive:{color:"".concat(e.colors.blue[6]," !important"),borderBottom:"0.2rem solid ".concat(e.colors.blue[6]),"&:hover":{borderBottom:"0.2rem solid ".concat(e.colors.blue[6])}},button_B:{position:"absolute",top:"0.35rem",right:"4rem",borderColor:"black","&:hover":{backgroundColor:"transparent"},".mantine-Button-inner":{fontWeight:"normal",color:"black"}},button_S:{display:"none"}}));var s=i(7294),o=i(4065),d=i(1163);function c(e){let{active:t}=e,{classes:i,cx:a}=l(),[c,h]=(0,s.useState)(t),p=(0,d.useRouter)();return(0,o.a)("(max-width: 780px)"),(0,n.jsx)(r.m,{value:c,onTabChange:h,children:(0,n.jsxs)(r.m.List,{className:i.tabList,position:"center",children:[(0,n.jsx)(r.m.Tab,{value:"main",className:a(i.tabItem,"main"===c&&i.tabItemActive),onClick:()=>p.replace("/game"),children:"메인"}),(0,n.jsx)(r.m.Tab,{value:"allGame",className:a(i.tabItem,"allGame"===c&&i.tabItemActive),onClick:()=>p.replace("/game/allGame"),children:"전체 게임"})]})})}},3395:function(e,t,i){"use strict";var n=i(5591),r=i(8823),a=i(7967);t.Z=function(e){let{token:t}=(0,r.Z)(),i="".concat("http://ec2-3-112-178-120.ap-northeast-1.compute.amazonaws.com:8000","/game/").concat(e),l=(0,n.ZP)(i,e=>(0,a._)(e,t));return l}},36:function(e,t,i){"use strict";var n=i(4593),r=i(7334),a=i(7967),l=i(8823);let s=(e,t,i,n,a)=>{let{search:l,parentId:s,boardType:o}=a;if(t&&null===t.data.cursor.afterCursor)return null;let d={categoryNames:n.length>0?n.join(","):null};l&&(d.q=l),o&&(d.boardType=o),e>0&&(d.afterCursor=null==t?void 0:t.data.cursor.afterCursor);let c=(0,r.stringify)(d);return l?"".concat("http://ec2-3-112-178-120.ap-northeast-1.compute.amazonaws.com:8000","/game/").concat(i,"/board/search?").concat(c):s?"".concat("http://ec2-3-112-178-120.ap-northeast-1.compute.amazonaws.com:8000","/game/").concat(i,"/board/getChild/").concat(s,"?").concat(c):"".concat("http://ec2-3-112-178-120.ap-northeast-1.compute.amazonaws.com:8000","/game/").concat(i,"/board?").concat(c)};t.Z=function(e,t){var i,r,o,d,c;let h=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},{token:p}=(0,l.Z)(),x=(0,n.ZP)((i,n)=>s(i,n,t,e,h),e=>(0,a._)(e,p)),u=(null===(i=null===(r=x.data)||void 0===r?void 0:null===(o=r[x.data.length-1])||void 0===o?void 0:o.data.cursor)||void 0===i?void 0:i.afterCursor)===null,f=(null===(d=x.data)||void 0===d?void 0:null===(c=d[0])||void 0===c?void 0:c.data.data.length)===0;return{...x,isLast:u,isEmpty:f}}},1683:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return B}});var n=i(5893),r=i(1411),a=i(9929),l=i(2870),s=i(5117),o=i(1576),d=i(1209),c=i(434),h=i(7447),p=i(653),x=i(8290);function u(e){let{story:t}=e,i=(0,a.bu)(t.content)[0],r=(0,a.ab)(t.content);return r=r.replace(/<\/?p[^>]*>/g,""),console.log(t),(0,n.jsx)(o.Z,{style:{paddingTop:"15px",paddingLeft:"0",paddingRight:"0"},children:(0,n.jsxs)("div",{style:{height:"100%",width:"100%",display:"flex",flexDirection:"column"},children:[(0,n.jsxs)("div",{style:{height:"10%",width:"100%",display:"flex",flexDirection:"row",alignItems:"center",paddingLeft:"5px"},children:[(0,n.jsx)(d.Z,{}),(0,n.jsx)(s.x,{fw:700,fz:"ml",children:"Stardew Valley"})]}),(0,n.jsx)("div",{style:{width:"100%",height:"40%",paddingTop:"12px",minHeight:"18rem",display:"flex",alignItems:"center"},children:(0,n.jsx)(l.E,{width:"100%",height:"100%",src:""==i?"https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MTNfMTAz%2FMDAxNjg5MjUzNjY3NDQz.c6VImpgJ0qy1bRZGHiZVxfkRlqoW6UG1KY6MySFz8Acg.ZOb1WGfiq3B4pdgr8Gj272XBX_pe3BKODGBPRGMzGUUg.JPEG.wltndk97%2Foutput_4028971259.jpg&type=sc960_832":i})}),(0,n.jsxs)("div",{style:{paddingLeft:"10px",paddingRight:"10px"},children:[(0,n.jsxs)("div",{style:{height:"10%",width:"100%",display:"flex",flexDirection:"row",alignItems:"center",gap:"10px",marginTop:"5px"},children:[(0,n.jsx)("div",{style:{width:"30px",height:"30px"},children:(0,n.jsx)(l.E,{width:"100%",height:"100%",radius:"lg",src:"https://search.pstatic.net/sunny/?src=https%3A%2F%2Frepository-images.githubusercontent.com%2F201813095%2F8dced600-bd65-11e9-90e9-340ab5b2c23f&type=sc960_832"})}),(0,n.jsx)("div",{style:{width:"150px",height:"100%",display:"flex",alignItems:"center"},children:(0,n.jsx)(s.x,{fw:700,fz:"ml",children:t.author.name})})]}),(0,n.jsx)("div",{children:(0,n.jsx)(s.x,{style:{marginTop:"10px"},fw:700,fz:"ml",children:t.title})}),(0,n.jsx)("div",{children:(0,n.jsx)(s.x,{style:{marginTop:"20px",height:"100px"},fw:500,fz:"sm",children:r})}),(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-around",paddingRight:"50px",paddingBottom:"20px"},children:[(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[(0,n.jsx)(c.Z,{}),(0,n.jsx)("div",{style:{paddingTop:"5px",paddingLeft:"5px"},children:t.likeCount})]}),(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[(0,n.jsx)(h.Z,{}),(0,n.jsx)("div",{style:{paddingTop:"5px",paddingLeft:"5px"},children:t.childCount})]}),(0,n.jsx)(p.Z,{}),(0,n.jsx)(x.Z,{})]})]})]})})}var f=i(4593),g=i(7334),m=i(7967),v=i(8823);let y=(e,t)=>{if(t&&null===t.data.cursor.afterCursor)return null;let i="";if(0===e)return"".concat("http://ec2-3-112-178-120.ap-northeast-1.compute.amazonaws.com:8000","/game/best-board").concat(i);i=(0,g.stringify)({afterCursor:null==t?void 0:t.data.cursor.afterCursor})};var j=function(){var e,t,i,n,r;let{token:a}=(0,v.Z)(),l=(0,f.ZP)((e,t)=>y(e,t),e=>(0,m._)(e,a)),s=(null===(e=null===(t=l.data)||void 0===t?void 0:null===(i=t[l.data.length-1])||void 0===i?void 0:i.data.cursor)||void 0===e?void 0:e.afterCursor)===null,o=(null===(n=l.data)||void 0===n?void 0:null===(r=n[0])||void 0===r?void 0:r.data.data.length)===0;return{...l,isLast:s,isEmpty:o}},w=i(7294),b=i(1664),C=i.n(b);function Z(){let{data:e,isLoading:t,setSize:i,mutate:a,isEmpty:l}=j();return(0,w.useEffect)(()=>{i(1)},[]),(0,n.jsx)("div",{style:{display:"flex",flexDirection:"row",marginLeft:"2rem",width:"100%",maxWidth:"100%"},children:(0,n.jsx)(r.l,{style:{width:"100%",display:"flex",paddingLeft:"10px",paddingRight:"10px"},slidesToScroll:4,slideSize:"24%",slideGap:"20px",children:null==e?void 0:e.map(e=>e.data.data.map(e=>(0,n.jsx)(r.l.Slide,{children:(0,n.jsx)(C(),{href:e.game.id+"?board="+e.id,style:{textDecoration:"none",color:"black"},children:(0,n.jsx)("div",{style:{marginTop:"20px",width:"100%",height:"100%",paddingLeft:"10px",paddingRight:"10px"},children:(0,n.jsx)(u,{story:e})})})})))})})}function k(e){let{children:t,TitleProp:i}=e,[r,a]=(0,w.useState)(i);return console.log(i),(0,n.jsxs)("div",{style:{marginTop:"5rem"},children:[(0,n.jsx)(s.x,{style:{marginLeft:"40px",marginTop:"20px",marginBottom:"30px"},size:25,weight:"bold",children:r}),(0,n.jsx)("div",{style:{display:"flex",justifyContent:"center",width:"100%"},children:t})]})}function M(e){let{story:t}=e,i=(0,a.bu)(t.content)[0],r=(0,a.ab)(t.content);return r=r.replace(/<\/?p[^>]*>/g,""),(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"column",width:"100%",height:"100%"},children:[(0,n.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"12rem"},children:(0,n.jsx)(l.E,{radius:"md",width:"85%",height:"50%",src:""==i?"https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTEwMjJfMTM5%2FMDAxNjM0ODY5NDAzMjQ4.i1SXWZ0IN9-_q9dabo6H4YrwhyoWYSzne1NBYAjueDwg.I1dhjPYvame_0hh7OwYwTuT2n_8IivkicMo92vaIwWAg.JPEG.happy_mkt%2F0_%25C0%25CC%25B9%25CC%25C1%25F6%25B0%25CB%25BB%25F6_%25B1%25E2%25B4%25C9_%25C3%25DF%25B0%25A12.jpg&type=sc960_832":i})}),(0,n.jsx)("div",{children:(0,n.jsx)(s.x,{style:{marginTop:"1.25rem"},fw:700,fz:"ml",children:t.title})}),(0,n.jsx)("div",{children:(0,n.jsx)(s.x,{style:{marginTop:"1.25rem",height:"10rem"},fw:500,fz:"sm",children:r})}),(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between",paddingRight:"2rem"},children:[(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[(0,n.jsx)(c.Z,{}),(0,n.jsx)("div",{style:{paddingTop:"5px",paddingLeft:"5px"},children:t.likeCount})]}),(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[(0,n.jsx)(h.Z,{}),(0,n.jsx)("div",{style:{paddingTop:"5px",paddingLeft:"5px"},children:t.childCount})]}),(0,n.jsx)(p.Z,{}),(0,n.jsx)(x.Z,{})]})]})}var z=i(36),T=i(3395);function D(e){let{gameID:t}=e,{user:i}=(0,v.Z)(),{data:a,isLoading:d,setSize:c,mutate:h,isEmpty:p}=(0,z.Z)(["개발일지"],t,{search:"",boardType:"parent"});(0,w.useEffect)(()=>{c(1)},[]);let{data:x,isLoading:u,mutate:f}=(0,T.Z)(t);return(0,n.jsx)(o.Z,{style:{width:"90%",maxWidth:"100%"},children:(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"row",padding:"10px",maxWidth:"100%"},children:[(0,n.jsx)("div",{style:{display:"flex",flexDirection:"column",width:"25%",height:"100%"},children:(0,n.jsxs)(C(),{href:t,style:{textDecoration:"none",color:"black"},children:[(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"row",width:"12.5rem",height:"60px"},children:[(0,n.jsx)("div",{style:{width:"60px",height:"60px"},children:(0,n.jsx)(l.E,{width:"100%",height:"100%",src:"https://search.pstatic.net/sunny/?src=https%3A%2F%2Frepository-images.githubusercontent.com%2F201813095%2F8dced600-bd65-11e9-90e9-340ab5b2c23f&type=sc960_832"})}),(0,n.jsx)("div",{style:{width:"150px",height:"100%",display:"flex",alignItems:"center"},children:(0,n.jsx)(s.x,{fw:700,fz:"ml",children:null==x?void 0:x.data.title})})]}),(0,n.jsx)(l.E,{width:"100%",height:"100%",radius:"md",src:"https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MTNfMTAz%2FMDAxNjg5MjUzNjY3NDQz.c6VImpgJ0qy1bRZGHiZVxfkRlqoW6UG1KY6MySFz8Acg.ZOb1WGfiq3B4pdgr8Gj272XBX_pe3BKODGBPRGMzGUUg.JPEG.wltndk97%2Foutput_4028971259.jpg&type=sc960_832"}),(0,n.jsx)(s.x,{style:{marginTop:"20px"},fw:500,fz:"sm",children:null==x?void 0:x.data.information.description})]})}),(0,n.jsx)("div",{style:{display:"flex",flexDirection:"row",marginLeft:"2rem",width:"100%",maxWidth:"100%",borderLeft:"0.5px solid gray "},children:(0,n.jsx)(r.l,{style:{width:"100%",display:"flex",paddingLeft:"3.43rem"},slidesToScroll:3,slideSize:"33%",slideGap:"1.5rem",children:null==a?void 0:a.map(e=>(console.log("data is ",e),e.data.data.map(e=>(0,n.jsx)(r.l.Slide,{children:(0,n.jsx)(C(),{href:t+"?board="+e.id,style:{textDecoration:"none",color:"black"},children:(0,n.jsx)("div",{style:{marginTop:"20px",width:"100%",height:"100%"},children:(0,n.jsx)(M,{story:e})})})}))))})})]})})}var _=i(8575),F=i(1986);function B(){return(0,n.jsx)(F.Z,{tapSection:(0,n.jsx)(_.L,{active:"develop"}),children:(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,n.jsx)(k,{TitleProp:"임시용 개발일지 몰아보기",children:(0,n.jsx)(D,{gameID:"6a05a155-147b-4112-a95f-88e53edec2aa"})}),(0,n.jsx)(k,{TitleProp:"Best of Develop Stories",children:(0,n.jsx)(Z,{})})]})})}},9929:function(e,t,i){"use strict";function n(e){let t=new DOMParser,i=t.parseFromString(e,"text/html"),n=i.getElementsByTagName("img"),r=[];if(0==n.length)return[""];for(let e=0;e<n.length;e++){let t=n[e].getAttribute("src");if(t){let e=decodeURI(t);r.push(e)}}return r}function r(e){if(""!=n(e.content)[0])return n(e.content)[0]}function a(e){return e.replace(/<img\b[^>]*>/gi,"")}i.d(t,{Z7:function(){return r},ab:function(){return a},bu:function(){return n}})}},function(e){e.O(0,[436,411,774,888,179],function(){return e(e.s=2628)}),_N_E=e.O()}]);