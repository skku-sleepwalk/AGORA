(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[587],{9858:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/mypage",function(){return n(4329)}])},1576:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var i=n(5893),r=n(2445),a=n(1485);let l=(0,a.k)((e,t)=>{let{shadow:n,borderRadius:i}=t;return{cardContainer:{boxShadow:"0px 3px ".concat(n,"px rgba(0, 0, 0, 0.2)"),borderRadius:i,margin:"0"}}});var s=function(e){let{children:t,shadow:n=10,borderRadius:a=15,className:s,...o}=e,{classes:c,cx:d}=l({shadow:n,borderRadius:a});return(0,i.jsx)(r.W,{className:d(c.cardContainer,s),...o,children:t})}},114:function(e,t,n){"use strict";n.d(t,{Cm:function(){return y},gB:function(){return b},XM:function(){return j}});var i=n(5893),r=n(263),a=n(7564),l=n(5117),s=n(6787),o=n(7414),c=n(8823),d=n(1576),m=n(1485);let h=(0,m.k)(e=>({container:{display:"flex",flexWrap:"wrap",justifyContent:"space-between"},stack:{flexGrow:1,padding:"2rem 0rem"},ringProcess:{},playtimeBar:{paddingLeft:"2rem",paddingTop:"1.5rem"},totalPlaytimeText:{paddingLeft:"2rem"}}));var u=n(2464),x=n(8949),f=n(1232),p=n(9985);let g=(0,m.k)(e=>({listItem:{width:"30rem",".mantine-List-itemWrapper":{width:"100%"}},line:{width:"1.5rem",height:"0.4rem",borderRadius:e.radius.xs},group:{width:"27rem"}}));function v(){let{classes:e,cx:t}=g();(0,r.rZ)();let n=b(),{data:a}=(0,u.e)(),s=null==a?void 0:a.data.playtimes.map((t,r)=>(0,i.jsx)(x.a.Item,{className:e.listItem,icon:(0,i.jsx)(o.x,{className:e.line,bg:r<=8?n[r]:n[9]}),children:(0,i.jsxs)(f.Z,{className:e.group,position:"apart",children:[(0,i.jsxs)(f.Z,{children:[(0,i.jsx)(p.q,{size:"2.5rem",radius:"20%",src:"https://play-lh.googleusercontent.com/He92papZcOmkgTi1sLHXQQb02aoyRtJ8ml96njM_cSAcpHhILvxMjhLix4mYEIKXPq4=s96-rw"}),(0,i.jsx)(l.x,{fz:"lg",children:t.game.title})]}),(0,i.jsx)(l.x,{fz:"lg",children:j(t.playtime)})]})}));return(0,i.jsx)(x.a,{spacing:"sm",size:"sm",center:!0,children:s})}function j(e){let t=Math.floor(e/60),n=e%60;return 0===t?"".concat(n,"분"):0===n?"".concat(t,"시간"):"".concat(t,"시간 ").concat(n,"분")}function b(){let e=(0,r.rZ)();return[e.colors.cyan[6],e.colors.orange[6],e.colors.grape[6],e.colors.lime[6],e.colors.teal[6],e.colors.pink[6],e.colors.indigo[6],e.colors.yellow[6],e.colors.red[6],e.colors.gray[4]]}function y(){let{classes:e,cx:t}=h(),n=(0,r.rZ)(),m=b(),{user:x,token:f}=(0,c.Z)(),{data:p}=(0,u.e)(),g=null==p?void 0:p.data.playtimes.map((e,t)=>{let n=e.playtime/p.data.totalPlaytime*100,i=t<=8?m[t]:m[9],r=e.game.title;return t<=8?{value:n,color:i,tooltip:r}:{value:n,color:i}});return console.log(g),(0,i.jsx)(d.Z,{bg:"white",w:"100%",children:(0,i.jsxs)(a.K,{className:e.stack,spacing:0,children:[(0,i.jsx)(l.x,{className:e.totalPlaytimeText,fz:"1.6rem",children:"총 게임 시간"}),(0,i.jsxs)("div",{className:e.container,children:[g&&(0,i.jsx)(s.T,{size:370,thickness:40,label:(0,i.jsx)(l.x,{size:"xl",align:"center",children:void 0!==p?j(p.data.totalPlaytime):null}),sections:g}),!g&&(0,i.jsx)(s.T,{className:e.ringProcess,size:370,thickness:40,label:(0,i.jsx)(l.x,{size:"xl",align:"center",children:"플레이 기록 없음"}),sections:[{value:100,color:n.colors.gray[2]}]}),(0,i.jsx)(o.x,{className:e.playtimeBar,children:(0,i.jsx)(v,{})})]})]})})}},2464:function(e,t,n){"use strict";n.d(t,{e:function(){return l}});var i=n(5591),r=n(7967),a=n(8823);function l(){let{user:e,token:t}=(0,a.Z)();if(!e)return{data:void 0};let n="".concat("http://ec2-3-112-178-120.ap-northeast-1.compute.amazonaws.com:8000","/users/").concat(null==e?void 0:e.id),l=(0,i.ZP)(n,e=>(0,r._)(e,t));return l}},4329:function(e,t,n){"use strict";n.r(t),n.d(t,{MypageTabClicklContext:function(){return U},default:function(){return X}});var i=n(5893),r=n(7294),a=n(4065),l=n(1485);let s=(0,l.k)(e=>({tabList:{position:"relative",boxSizing:"border-box",width:"100%",height:"3rem",borderBottom:"0.2rem solid #fcfcfe",paddingLeft:"2.3rem",backgroundColor:"white",boxShadow:"0px 6px 7px rgba(0, 0, 0, 0.2)"},tabItem_B:{width:"8rem",height:"3rem",fontSize:"1rem","&:hover":{backgroundColor:"transparent",borderBottom:"0.2rem solid #fcfcfe"}},tabItem_S:{width:"5rem",height:"3rem",fontSize:"0.8rem","&:hover":{backgroundColor:"transparent",borderBottom:"0.2rem solid #fcfcfe"}},tabItemActive:{color:"".concat(e.colors.blue[6]," !important"),borderBottom:"0.2rem solid ".concat(e.colors.blue[6]),"&:hover":{borderBottom:"0.2rem solid ".concat(e.colors.blue[6])}}}));var o=n(1141);function c(e){let{activeTab:t,setActiveTab:n}=e,{classes:l,cx:c}=s(),d=(0,a.a)("(max-width: 780px)"),m=(0,r.useContext)(U);return(0,i.jsx)(o.m,{value:t,onTabChange:n,children:(0,i.jsxs)(o.m.List,{className:l.tabList,position:"left",children:[(0,i.jsx)(o.m.Tab,{value:"playtimes",className:c(d?l.tabItem_S:l.tabItem_B,"playtimes"===t&&l.tabItemActive),onClick:m.ontabClickFast,children:"플레이한 게임"}),(0,i.jsx)(o.m.Tab,{value:"purchasedAssets",className:c(d?l.tabItem_S:l.tabItem_B,"purchasedAssets"===t&&l.tabItemActive),onClick:m.ontabClickFast,children:"구매한 애셋"}),(0,i.jsx)(o.m.Tab,{value:"myPosts",className:c(d?l.tabItem_S:l.tabItem_B,"myPosts"===t&&l.tabItemActive),onClick:m.ontabClickFast,children:"내가 올린 글"}),(0,i.jsx)(o.m.Tab,{value:"uploadedGames",className:c(d?l.tabItem_S:l.tabItem_B,"uploadedGames"===t&&l.tabItemActive),onClick:m.ontabClickFast,children:"업로드한 게임"}),(0,i.jsx)(o.m.Tab,{value:"uploadedAssets",className:c(d?l.tabItem_S:l.tabItem_B,"uploadedAssets"===t&&l.tabItemActive),onClick:m.ontabClickFast,children:"업로드한 애셋"})]})})}var d=n(7414),m=n(1220),h=n(1232),u=n(9985),x=n(7564),f=n(5117);let p=(0,l.k)(e=>({box:{width:"100%",height:"100%"},backgroundImage:{display:"flex",alignItems:"center"},group:{marginLeft:"3.5rem",gap:"1.5rem",[e.fn.smallerThan(1e3)]:{marginLeft:"2.9rem",gap:"1.25rem"},[e.fn.smallerThan(820)]:{marginLeft:"2.3rem",gap:"1rem"},[e.fn.smallerThan(720)]:{marginLeft:"1.53rem",gap:"0.7rem"},[e.fn.smallerThan(540)]:{marginLeft:"1.15rem",gap:"0.5rem"}},avatar:{width:"9rem",height:"9rem",[e.fn.smallerThan(1e3)]:{width:"7.5rem",height:"7.5rem"},[e.fn.smallerThan(820)]:{width:"6rem",height:"6rem"},[e.fn.smallerThan(720)]:{width:"4rem",height:"4rem"},[e.fn.smallerThan(540)]:{width:"3rem",height:"3rem"}},username:{fontSize:"2.5rem",[e.fn.smallerThan(1e3)]:{fontSize:"2rem"},[e.fn.smallerThan(820)]:{fontSize:"1.6rem"},[e.fn.smallerThan(720)]:{fontSize:"1rem"},[e.fn.smallerThan(540)]:{fontSize:"0.8rem"}},userinfo:{fontSize:"1.4rem",[e.fn.smallerThan(1e3)]:{fontSize:"1.16rem"},[e.fn.smallerThan(820)]:{fontSize:"0.9rem"},[e.fn.smallerThan(720)]:{fontSize:"0.6rem"},[e.fn.smallerThan(820)]:{fontSize:"0.45rem"}}}));var g=n(8823);function v(){let{classes:e,cx:t}=p(),{user:n,token:r}=(0,g.Z)();return(0,i.jsx)(d.x,{className:e.box,children:(0,i.jsx)(m.X,{className:e.backgroundImage,h:"100%",radius:0,src:"https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbQro8K%2FbtqDvh5lVQm%2FO765YYrxZwDO8mtY59Zo80%2Fimg.jpg",children:(0,i.jsxs)(h.Z,{className:e.group,children:[(0,i.jsx)(u.q,{className:e.avatar,src:"https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F1Tg4y%2FbtqDurHhxax%2FrFjK7yUIuO0fwMsZsvubU0%2Fimg.jpg",radius:"50%"}),(0,i.jsxs)(x.K,{children:[(0,i.jsx)(f.x,{className:e.username,color:"white",children:null==n?void 0:n.name}),(0,i.jsx)(f.x,{className:e.userinfo,color:"white",children:"팔로워 7명"})]})]})})})}let j=(0,l.k)(e=>({container:{display:"flex",flexWrap:"wrap",width:"100%"},userInfoContainer:{width:"100%",aspectRatio:"45 / 8",height:"auto"},tabBottomContainer:{position:"relative",width:"100%",height:"100%"},anchor:{position:"absolute",top:"-4.2rem"},tabContainer:{position:"sticky",top:"4.313rem",width:"100%",height:"3rem",zIndex:50},bottomContainer:{display:"flex",flexWrap:"nowrap",width:"100%",height:"100%",padding:40,gap:40},mainContainer:{display:"flex",flexGrow:1,width:700,margin:0,justifyContent:"center"}}));var b=function(e){let{userInfoSection:t,anchorSection:n,tabSection:r,children:a}=e,{classes:l,cx:s}=j();return(0,i.jsxs)("div",{className:l.container,children:[(0,i.jsx)("div",{className:l.userInfoContainer,children:t}),(0,i.jsxs)("div",{className:l.tabBottomContainer,children:[(0,i.jsx)("div",{className:l.anchor,children:n}),(0,i.jsx)("div",{className:l.tabContainer,children:r}),(0,i.jsx)("div",{className:l.bottomContainer,children:(0,i.jsx)("div",{className:l.mainContainer,children:a})})]})]})},y=n(114),w=n(4593),C=n(7334),k=n(7967);let T=(e,t,n)=>{if(t&&null===t.data.cursor.afterCursor)return null;let i="";if(0===e)return"".concat("http://ec2-3-112-178-120.ap-northeast-1.compute.amazonaws.com:8000","/users/").concat(n,"/profile/written-game-board").concat(i);i=(0,C.stringify)({afterCursor:null==t?void 0:t.data.cursor.afterCursor})};var N=function(){var e,t,n,i,r;let{user:a,token:l}=(0,g.Z)(),s=(0,w.ZP)((e,t)=>T(e,t,null==a?void 0:a.id),e=>(0,k._)(e,l)),o=(null===(e=null===(t=s.data)||void 0===t?void 0:null===(n=t[s.data.length-1])||void 0===n?void 0:n.data.cursor)||void 0===e?void 0:e.afterCursor)===null,c=(null===(i=s.data)||void 0===i?void 0:null===(r=i[0])||void 0===r?void 0:r.data.data.length)===0;return{...s,isLast:o,isEmpty:c}},z=n(2870),I=n(434),Z=n(7447),F=n(653),_=n(8290),A=n(9929),S=n(1576);let P="나는 침대가 너무 좋다. 그래서 하루종일 침대에서 보내는 것만이 나의 소망이다. 밥도 침대에서 먹고 싶고 공부는 침대에서도 별로 하고 싶지는 않다. 그냥 쉬고 싶은 마음이 크다. 하지만 사회적인 틀과 생활 패턴, 의무에 밀려 이런 소망은 이루어질 수 없는 것 같아서 너무나도 아쉽다. 침대는 나의 피난처이자, 안식처인 것 같은데 여기서 벗어나야 한다는 게 너무나도 힘들다. 난 행복하게 쉬면서 휴식을 취하는 것이 이렇게 어려울 줄은 몰랐다. 물론 쉬는 것이 일에 비해 쉬운 일은 아닌 것 같다. 쉬는 것에도 방법이 있고, 필요한 것 같다. 그런데 그 방법을 찾는 것도 힘들다. 그래서 난 이런 생각에 빠져버렸다. 어쩌면 나의 쉬는 방법은 오롯이 침대에서 보내는 것일지도 모른다는 것을.<br/><br/>내가 편안하게 쉬고 휴식을 취하는 방법은 단순히 침대에서 푹 쉬는 것이지만, 그것을 계속 실천하기란 쉽지 않다. 이 사회의 노동 중심적 패러다임은 우리에게 언제나 쉬지 말고 일하라고 말한다. 그런데 왜 우리는 그렇게 피곤해지지 않아도 되는 상황에서도 그렇게까지 해야 할까? 이런 생각을 하면서 나는 더욱더 휴식에 대한 필요성을 느꼈다.<br/><br/>그러나 사실, 이 세상 모든 사람이 모두 침대에서 쉬는 것을 원하는 것은 아니다. 어떤 사람들은 산에서 쉬는 것을 좋아하고, 어떤 사람들은 바다에서 쉬는 것을 좋아한다. 또 어떤 사람들은 조용한 카페에서 책을 읽으며 쉬는 것을 좋아한다. 이처럼 각자에게는 자신만의 휴식 방식이 있으며, 그것이 우리에게 힘과 에너지를 다시 찾게 해준다.";function D(e){let{myPost:t}=e,n=(0,A.bu)(t.content)[0];console.log("hm",t.content);let r=P;return r=function(e,t){if(!(e.length<=t))return e.slice(0,t)+"...";{let n=t-e.length,i="\xa0".repeat(n);return console.log((e+i).length),e+i}}(r,120),(0,i.jsx)(S.Z,{style:{padding:"0",height:"12rem",overflow:"hidden"},children:(0,i.jsxs)("div",{style:{display:"flex",flexDirection:"row",width:"100%",height:"100%"},children:[(0,i.jsx)("div",{style:{display:"flex",alignItems:"center",minHeight:"12rem"},children:(0,i.jsx)(z.E,{radius:"15px",width:"85%",height:"50%",src:""==n?"https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxODEwMjRfNDEg%2FMDAxNTQwMzUzNTAwMTQ0.wxjl7nnlaOr8DUuka8JmPxatZa2_KA4kzVHJNebMJb4g.JoZyVWkEpXmbU668fWGJYvNJ67jrR83IUfA1P1XRbc4g.JPEG.225prima%2FexternalFile.jpg&type=sc960_832":n})}),(0,i.jsxs)("div",{style:{display:"flex",flexDirection:"column",width:"100%",height:"100%"},children:[(0,i.jsx)("div",{children:(0,i.jsx)(f.x,{style:{marginTop:"2rem"},fw:700,fz:"ml",children:t.title})}),(0,i.jsx)("div",{children:(0,i.jsx)(f.x,{style:{marginTop:"20px",height:"4rem",paddingRight:"40px"},fw:500,fz:"sm",children:r})}),(0,i.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-around",paddingRight:"50px"},children:[(0,i.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[(0,i.jsx)(I.Z,{}),(0,i.jsx)("div",{style:{paddingTop:"5px",paddingLeft:"5px"},children:t.likeCount})]}),(0,i.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[(0,i.jsx)(Z.Z,{}),(0,i.jsx)("div",{style:{paddingTop:"5px",paddingLeft:"5px"},children:t.childCount})]}),(0,i.jsx)(F.Z,{}),(0,i.jsx)(_.Z,{})]})]})]})})}var L=n(7841),E=n(1664),R=n.n(E);function B(e){let{myPost:t}=e,n=(0,A.bu)(t.content)[0];console.log("hm",t.content);let r=P;return r=function(e,t){if(!(e.length<=t))return e.slice(0,t)+"...";{let n=t-e.length,i="\xa0".repeat(n);return console.log((e+i).length),e+i}}(r,120),(0,i.jsx)(R(),{href:"community/"+t.id,style:{textDecoration:"none",color:"black"},children:(0,i.jsx)(S.Z,{style:{padding:"0",height:"12rem",overflow:"hidden"},children:(0,i.jsxs)("div",{style:{display:"flex",flexDirection:"row",width:"100%",height:"100%"},children:[(0,i.jsx)("div",{style:{display:"flex",alignItems:"center",minHeight:"12rem"},children:(0,i.jsx)(z.E,{radius:"15px",width:"85%",height:"50%",src:""==n?"https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxODEwMjRfNDEg%2FMDAxNTQwMzUzNTAwMTQ0.wxjl7nnlaOr8DUuka8JmPxatZa2_KA4kzVHJNebMJb4g.JoZyVWkEpXmbU668fWGJYvNJ67jrR83IUfA1P1XRbc4g.JPEG.225prima%2FexternalFile.jpg&type=sc960_832":n})}),(0,i.jsxs)("div",{style:{display:"flex",flexDirection:"column",width:"100%",height:"100%"},children:[(0,i.jsx)("div",{children:(0,i.jsx)(f.x,{style:{marginTop:"2rem"},fw:700,fz:"ml",children:t.title})}),(0,i.jsx)("div",{children:(0,i.jsx)(f.x,{style:{marginTop:"20px",height:"4rem",paddingRight:"40px"},fw:500,fz:"sm",children:r})}),(0,i.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-around",paddingRight:"50px"},children:[(0,i.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[(0,i.jsx)(I.Z,{}),(0,i.jsx)("div",{style:{paddingTop:"5px",paddingLeft:"5px"},children:t.likeCount})]}),(0,i.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[(0,i.jsx)(Z.Z,{}),(0,i.jsx)("div",{style:{paddingTop:"5px",paddingLeft:"5px"},children:t.childCount})]}),(0,i.jsx)(F.Z,{}),(0,i.jsx)(_.Z,{})]})]})]})})})}let M=(e,t,n)=>{if(t&&null===t.data.cursor.afterCursor)return null;let i="";if(0===e)return"".concat("http://ec2-3-112-178-120.ap-northeast-1.compute.amazonaws.com:8000","/users/").concat(n,"/profile/written-community-board").concat(i);i=(0,C.stringify)({afterCursor:null==t?void 0:t.data.cursor.afterCursor})};var J=function(){var e,t,n,i,r;let{user:a,token:l}=(0,g.Z)(),s=(0,w.ZP)((e,t)=>M(e,t,null==a?void 0:a.id),e=>(0,k._)(e,l)),o=(null===(e=null===(t=s.data)||void 0===t?void 0:null===(n=t[s.data.length-1])||void 0===n?void 0:n.data.cursor)||void 0===e?void 0:e.afterCursor)===null,c=(null===(i=s.data)||void 0===i?void 0:null===(r=i[0])||void 0===r?void 0:r.data.data.length)===0;return{...s,isLast:o,isEmpty:c}};function O(){let{user:e,token:t}=(0,g.Z)(),{data:n,isLoading:a,setSize:l,mutate:s,isEmpty:o}=N(),{data:c,isLoading:d,setSize:m,mutate:h}=J();(0,r.useEffect)(()=>{l(1)},[]);let[u,x]=(0,r.useState)("게임");return(0,i.jsxs)("div",{style:{width:"100%"},children:[(0,i.jsxs)("div",{style:{display:"flex",flexDirection:"row",width:"100%"},children:[(0,i.jsx)(L.z,{onClick:()=>{x("게임")},style:{background:"#9AE3EB",color:"white",marginRight:"10px"},children:"게임"}),(0,i.jsx)(L.z,{onClick:()=>{x("커뮤니티")},style:{background:"#9AE3EB",color:"white"},children:"커뮤니티"})]}),"게임"===u&&(null==n?void 0:n.map(e=>(console.log("data is ",e),e.data.data.map(e=>(0,i.jsx)("div",{style:{marginTop:"20px",width:"100%",paddingLeft:"10px",paddingRight:"10px",display:"flex",justifyContent:"center"},children:(0,i.jsx)(D,{myPost:e})}))))),"커뮤니티"===u&&(null==c?void 0:c.map(e=>(console.log("data is ",e),e.data.data.map(e=>(0,i.jsx)("div",{style:{marginTop:"20px",width:"100%",display:"flex",justifyContent:"center",paddingLeft:"10px",paddingRight:"10px"},children:(0,i.jsx)(B,{myPost:e})})))))]})}let U=(0,r.createContext)({ontabClick:()=>{},ontabClickFast:()=>{}});var X=function(){let[e,t]=(0,r.useState)("playtimes"),n=(0,r.useRef)(null);return(0,i.jsx)(U.Provider,{value:{ontabClick:()=>{var e;null===(e=n.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"nearest"})},ontabClickFast:()=>{var e;null===(e=n.current)||void 0===e||e.scrollIntoView({behavior:"instant",block:"nearest"})}},children:(0,i.jsxs)(b,{userInfoSection:(0,i.jsx)(v,{}),anchorSection:(0,i.jsx)("div",{ref:n}),tabSection:(0,i.jsx)(c,{activeTab:e,setActiveTab:t}),children:["playtimes"===e&&(0,i.jsx)(y.Cm,{}),"myPosts"===e&&(0,i.jsx)(O,{}),"purchasedAssets"===e&&(0,i.jsx)(d.x,{h:"40rem"}),"uploadedGames"===e&&(0,i.jsx)(d.x,{h:"40rem"}),"uploadedAssets"===e&&(0,i.jsx)(d.x,{h:"40rem"})]})})}},9929:function(e,t,n){"use strict";function i(e){let t=new DOMParser,n=t.parseFromString(e,"text/html"),i=n.getElementsByTagName("img"),r=[];if(0==i.length)return[""];for(let e=0;e<i.length;e++){let t=i[e].getAttribute("src");if(t){let e=decodeURI(t);r.push(e)}}return r}function r(e){if(""!=i(e.content)[0])return i(e.content)[0]}function a(e){return e.replace(/<img\b[^>]*>/gi,"")}n.d(t,{Z7:function(){return r},ab:function(){return a},bu:function(){return i}})}},function(e){e.O(0,[436,830,617,774,888,179],function(){return e(e.s=9858)}),_N_E=e.O()}]);