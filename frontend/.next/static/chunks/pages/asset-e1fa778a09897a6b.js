(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[89],{470:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/asset",function(){return r(4127)}])},1576:function(e,t,r){"use strict";r.d(t,{Z:function(){return i}});var a=r(5893),n=r(2445),s=r(1485);let o=(0,s.k)((e,t)=>{let{shadow:r,borderRadius:a}=t;return{cardContainer:{boxShadow:"0px 3px ".concat(r,"px rgba(0, 0, 0, 0.2)"),borderRadius:a,margin:"0"}}});var i=function(e){let{children:t,shadow:r=10,borderRadius:s=15,className:i,...c}=e,{classes:l,cx:d}=o({shadow:r,borderRadius:s});return(0,a.jsx)(n.W,{className:d(l.cardContainer,i),...c,children:t})}},4127:function(e,t,r){"use strict";r.r(t),r.d(t,{AssetContext:function(){return es},default:function(){return eo}});var a=r(5893),n=r(263),s=r(7564),o=r(3523),i=r(5117),c=r(1232),l=r(966),d=r(7414),h=r(61),x=r(1485);let u=(0,x.k)(e=>({wrapper:{display:"flex",width:"100%",height:"4rem",backgroundColor:"#fcfcfe",alignItems:"center",justifyContent:"center"},group:{display:"flex",flexWrap:"nowrap",boxSizing:"border-box",width:"80%",padding:"0.2rem 0.8rem",borderRadius:e.radius.sm,backgroundColor:e.colors.gray[2],alignItems:"center",gap:"0.2rem"},textInput:{flexGrow:1,".mantine-TextInput-input":{border:"none",backgroundColor:"transparent"}}}));var p=r(9153),m=r(7283),g=r(7248),f=r(5938),j=r(6154);async function w(e,t){let{data:r}=await j.Z.post("".concat("http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000","/asset/searchHistory"),e,{headers:{"Content-Type":"application/json",Authorization:"".concat(t)}});return r}async function b(e,t){try{await j.Z.delete("".concat("http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000","/asset/searchHistory/").concat(e),{headers:{"Content-Type":"application/json",Authorization:t}})}catch(e){console.error(e)}}async function y(e){try{await j.Z.delete("".concat("http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000","/asset/searchHistory"),{headers:{"Content-Type":"application/json",Authorization:e}})}catch(e){console.error(e)}}var v=r(8823),C=r(7294);function k(e){let{onSubmit:t,MovingUp:r}=e,{classes:s,cx:o}=u(),i=(0,n.rZ)(),{token:c}=(0,v.Z)(),{mutateSearchHistory:l}=(0,C.useContext)(es),x=(0,g.c)({initialValues:{searchKeyword:""}});return(0,a.jsx)("form",{className:s.wrapper,onSubmit:x.onSubmit(e=>{t(e.searchKeyword),""!==e.searchKeyword&&w({keyword:e.searchKeyword},c).then(()=>{x.reset(),l(),r()})}),onReset:x.onReset,children:(0,a.jsxs)(d.x,{className:s.group,children:[(0,a.jsx)(p.Z,{stroke:1.5}),(0,a.jsx)(h.o,{className:s.textInput,placeholder:"원하는 에셋을 검색해 보세요.",onSubmit:()=>{},...x.getInputProps("searchKeyword"),rightSection:(0,a.jsx)(f.Z,{type:"reset",children:(0,a.jsx)(m.Z,{size:"1.2rem",stroke:1.2,color:i.colors.gray[6]})})})]})})}let N=(0,x.k)(e=>({container:{display:"flex",flexWrap:"wrap",width:"100%",height:"100%"},searchcontainer:{position:"sticky",top:"4.313rem",width:"100%",height:"4rem",zIndex:50},searchRecordContainer:{boxSizing:"border-box",width:"100%",height:"4rem",paddingTop:"0.2rem"},tabContainer:{position:"sticky",top:"8.313rem",width:"100%",height:"2.5rem",zIndex:50},mainContainer:{width:"100%",minHeight:"calc(100vh - 14.813rem)",padding:"2rem 0rem"},movingUpButtonContainer:{position:"fixed",right:"1rem",bottom:"1rem",width:"3rem",height:"3rem"}}));function Z(e){let{searchSection:t,searchRecordSection:r,tabSection:n,children:s,movingUpButtonSection:o}=e,{classes:i,cx:c}=N();return(0,a.jsxs)("div",{className:i.container,children:[(0,a.jsx)("div",{className:i.searchcontainer,children:t}),(0,a.jsx)("div",{className:i.searchRecordContainer,children:r}),(0,a.jsx)("div",{className:i.tabContainer,children:n}),(0,a.jsx)("div",{className:i.mainContainer,children:s}),(0,a.jsx)("div",{className:i.movingUpButtonContainer,children:o})]})}var z=r(2128),S=r(4736);let I=(0,x.k)(e=>({button:{display:"flex",width:"3rem",height:"3rem",backgroundColor:e.colors.gray[2],borderRadius:"50%",alignItems:"center",justifyContent:"center"},displayNone:{display:"none"}}));var R=r(9655);function _(e){let{MovingUp:t,scrollY:r}=e,{classes:n,cx:s}=I();return(0,a.jsx)(S.k,{className:s(n.button,0===r&&n.displayNone),onClick:t,children:(0,a.jsx)(R.Z,{stroke:1.3})})}let B=(0,x.k)(e=>({wrapper:{display:"flex",width:"100%",height:"1.5rem",alignItems:"center",justifyContent:"center"},group:{boxSizing:"border-box",width:"78%",fontSize:14,alignItems:"center"},text:{marginRight:"0.2rem"},badge:{padding:"0.3rem 0.5rem",backgroundColor:e.colors.teal[4],borderRadius:e.radius.sm,color:"white",fontSize:14},badgeBg:{backgroundColor:"".concat(e.colors.teal[2]," !important")}}));var T=r(1163);function K(e){let{data:t,isLoading:r}=e,{classes:s,cx:o}=B(),h=(0,n.rZ)(),{token:x}=(0,v.Z)(),u=(0,T.useRouter)(),{mutateSearchHistory:p}=(0,C.useContext)(es);(0,C.useEffect)(()=>{p()},[t]);let g=null==t?void 0:t.map(e=>(0,a.jsx)(f.Z,{onClick:()=>u.push("?search=".concat(e.keyword)),children:(0,a.jsxs)(c.Z,{className:s.badge,spacing:"0.3rem",children:[(0,a.jsx)(i.x,{children:e.keyword}),(0,a.jsx)(f.Z,{onClick:t=>{t.stopPropagation(),b(e.keyword,x).then(()=>{p()})},children:(0,a.jsx)(m.Z,{size:"0.8rem",stroke:1.8,color:h.colors.teal[1]})})]})}));return(0,a.jsx)(d.x,{className:s.wrapper,children:(0,a.jsxs)(c.Z,{className:s.group,position:"apart",children:[(0,a.jsxs)(c.Z,{children:[(0,a.jsx)(i.x,{className:s.text,children:"최근 검색 기록"}),g,r&&(0,a.jsx)(l.a,{color:"teal",variant:"dots"})]}),(0,a.jsx)(f.Z,{className:o(s.badge,s.badgeBg),onClick:async()=>{y(x).then(()=>{p()})},children:(0,a.jsx)(i.x,{children:"모두 삭제"})})]})})}var P=r(7841);let D=(0,x.k)(e=>({wrapper:{display:"flex",width:"100%",height:"100%",paddingBottom:"0.375rem",backgroundColor:"#fcfcfe",justifyContent:"center",transition:"box-shadow 0.5s ease-in"},shadow:{boxShadow:"0px 6px 7px rgba(0, 0, 0, 0.1)",transition:"0.5s ease-in"},group:{width:"80%",height:"100%"},buttonOn:{backgroundColor:e.colors.teal[4],border:"none",color:"white","&:hover":{backgroundColor:e.colors.teal[5]}}}));function E(e){let{onTabChange:t,MovingUp:r,scrollY:n}=e,{classes:s,cx:o}=D(),[i,l]=(0,C.useState)("3D");(0,C.useEffect)(()=>{t(i)},[i]);let h=["3D","2D","Add-on","Code","Music"].map(e=>(0,a.jsx)(P.z,{className:o(i===e&&s.buttonOn),variant:"default",color:"teal",radius:"xl",onClick:()=>{l(e),r()},children:e}));return(0,a.jsx)(d.x,{className:o(s.wrapper,n>64&&s.shadow),children:(0,a.jsx)(c.Z,{className:s.group,position:"apart",children:(0,a.jsx)(c.Z,{spacing:"sm",children:h})})})}let A=(0,x.k)(e=>({container:{display:"flex",flexDirection:"column",width:"100%",alignItems:"center",gap:"0.5rem"},text:{display:"flex",width:"80%",fontSize:"1.5rem",justifyContent:"flex-start"},wrapper:{width:"80%"},carousel:{".mantine-Carousel-viewport":{paddingLeft:"0.5rem"},".mantine-Carousel-container":{alignItems:"center"},".mantine-Carousel-control":{"&[data-inactive]":{opacity:0,cursor:"default"}}}}));var H=r(1411),M=r(1220),U=r(9985),W=r(2870),L=r(1576),O=r(6483);let q=(0,x.k)(e=>({link:{textDecoration:"none !important",color:e.black},wrapper:{width:"10rem",height:"16.9rem",padding:"0.5rem",["&:hover .".concat((0,O.A)("infoBox"))]:{visibility:"visible"}},infoBox:{ref:(0,O.A)("infoBox"),display:"flex",visibility:"hidden",width:"100%",height:"100%",padding:"0.3rem",backgroundColor:"rgba(0, 0, 0, 0.35)",borderRadius:e.radius.md,alignItems:"center",justifyContent:"center"},saleBox:{backgroundColor:e.colors.pink[1],borderRadius:e.radius.sm,color:e.colors.pink[6],fontSize:12,fontWeight:"bold"},button:{display:"flex",height:"1.6rem",padding:"0rem 0.4rem",backgroundColor:"white",border:"1px solid ".concat(e.colors.gray[4]),borderRadius:e.radius.md,alignItems:"center"},saleText:{color:e.colors.pink[6],fontWeight:"bold"}}));var X=r(434),G=r(1664),Y=r.n(G);function F(e){let{assetData:t}=e,{classes:r,cx:o}=q(),l=(0,n.rZ)(),h=t.cost.isSale;return(0,a.jsx)(Y(),{href:"/asset/".concat(t.id),className:r.link,children:(0,a.jsx)(L.Z,{className:r.wrapper,children:(0,a.jsxs)(s.K,{spacing:"xs",children:[(0,a.jsx)(M.X,{src:t.thumbnail?t.thumbnail:"/images/nonImage.svg",h:"10rem",radius:"md",children:(0,a.jsx)(d.x,{className:r.infoBox,children:(0,a.jsx)(i.x,{color:"#fff",lineClamp:4,children:t.description})})}),(0,a.jsxs)(s.K,{spacing:"0.2rem",children:[(0,a.jsxs)(c.Z,{spacing:"xs",children:[(0,a.jsx)(i.x,{fz:12,c:l.colors.teal[5],children:t.category.name}),h&&(0,a.jsxs)(d.x,{className:r.saleBox,children:["-",t.cost.salePercentage,"%"]})]}),(0,a.jsx)(i.x,{fz:14,fw:"bold",lineClamp:1,children:t.title}),(0,a.jsxs)(c.Z,{spacing:"0.2rem",children:[(0,a.jsx)(U.q,{radius:"xl",size:"xs"}),(0,a.jsx)(i.x,{fz:12,lineClamp:1,children:t.author.name})]})]}),(0,a.jsxs)(c.Z,{position:"apart",children:[(0,a.jsx)(c.Z,{spacing:"0.3rem",children:(0,a.jsx)(d.x,{className:r.button,w:"auto",children:(0,a.jsxs)(c.Z,{spacing:"0.3rem",children:[(0,a.jsx)(X.Z,{size:"1rem",stroke:1.2}),(0,a.jsx)(i.x,{fz:12,children:t.likeCount})]})})}),(0,a.jsx)(d.x,{className:r.button,w:"auto",children:(0,a.jsxs)(c.Z,{spacing:"0.3rem",children:[(0,a.jsx)(W.E,{src:"/images/token.svg",width:"0.85rem",height:"0.85rem"}),(0,a.jsx)(i.x,{fz:12,fw:"bold",className:o(h&&r.saleText),children:h?t.cost.saledPrice:t.cost.defaultPrice})]})})]})]})})})}function V(e){let{onSlideChange:t,assetData:r,isAssetLoading:n,title:s}=e,{classes:c,cx:h}=A(),x=null==r?void 0:r.map(e=>e.data.data.map(e=>(0,a.jsx)(H.l.Slide,{children:(0,a.jsx)(F,{assetData:e})})));return(0,a.jsxs)(d.x,{className:c.container,children:[(0,a.jsx)(d.x,{className:c.text,children:(0,a.jsx)(i.x,{children:s})}),(0,a.jsx)(d.x,{className:c.wrapper,children:(0,a.jsxs)(H.l,{className:c.carousel,slideSize:"16.66%",w:"100%",height:"19rem",align:"start",slideGap:"xl",controlsOffset:"xs",onSlideChange:t,children:[x,n&&(0,a.jsx)(o.M,{w:"10rem",h:"16.9rem",children:(0,a.jsx)(l.a,{color:"teal",variant:"dots"})})]})})]})}let J=(0,x.k)(e=>({container:{display:"flex",flexDirection:"column",width:"100%",alignItems:"center",gap:"2rem"},text:{display:"flex",width:"80%",fontSize:"1.3rem",justifyContent:"flex-start"},wrapper:{display:"flex",flexWrap:"wrap",width:"80%",justifyContent:"space-between",gap:"2rem"}}));function Q(e){let{searchKeyword:t,children:r}=e,{classes:s,cx:o}=J(),l=(0,n.rZ)();return(0,a.jsxs)(d.x,{className:s.container,children:[(0,a.jsx)(d.x,{className:s.text,children:(0,a.jsxs)(c.Z,{spacing:"xs",children:[(0,a.jsxs)(i.x,{children:["'",t,"'"]}),(0,a.jsx)(i.x,{fz:"1rem",c:l.colors.gray[6],children:"의 검색결과"})]})}),(0,a.jsx)(d.x,{className:s.wrapper,children:r})]})}var $=r(4593),ee=r(7967),et=r(7334);let er=(e,t,r,a)=>{let{search:n}=a;if(t&&null===t.data.cursor.afterCursor)return null;let s={categoryNames:r};n&&(s.q=n),e>0&&(s.afterCursor=null==t?void 0:t.data.cursor.afterCursor);let o=(0,et.stringify)(s);return n?"".concat("http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000","/asset/search?").concat(o):"".concat("http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000","/asset?").concat(o)};var ea=function(e){var t,r,a,n,s;let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{token:i}=(0,v.Z)(),c=(0,$.ZP)((t,r)=>er(t,r,e,o),e=>(0,ee._)(e,i),{initialSize:2}),l=(null===(t=null===(r=c.data)||void 0===r?void 0:null===(a=r[c.data.length-1])||void 0===a?void 0:a.data.cursor)||void 0===t?void 0:t.afterCursor)===null,d=(null===(n=c.data)||void 0===n?void 0:null===(s=n[0])||void 0===s?void 0:s.data.data.length)===0;return{...c,isLast:l,isEmpty:d}},en=r(5591);let es=(0,C.createContext)({mutateSearchHistory:()=>{}});var eo=function(){let e=(0,n.rZ)(),t=(0,T.useRouter)(),r=t.query.search,[d,h]=(0,C.useState)(""),{data:x,isLoading:u,size:p,setSize:m,mutate:g,isEmpty:f}=ea(d,{search:r?r.toString():void 0}),[j,w]=(0,z.b)(),[b,y]=(0,C.useState)(0);(0,C.useEffect)(()=>{r&&j.y>=b&&(m(e=>e+1),y(e=>e+1e3))},[r,j.y]);let{data:N,isLoading:S,mutate:I}=function(){let{token:e}=(0,v.Z)(),t=(0,en.ZP)("".concat("http://ec2-43-207-85-73.ap-northeast-1.compute.amazonaws.com:8000","/asset/searchHistory"),t=>(0,ee._)(t,e));return t}();return(0,a.jsx)(es.Provider,{value:{mutateSearchHistory:I},children:(0,a.jsx)(Z,{searchSection:(0,a.jsx)(k,{onSubmit:e=>{""===e?t.replace("/asset"):t.push("?search=".concat(e)),I()},MovingUp:()=>{window.scrollTo(0,0)}}),searchRecordSection:(0,a.jsx)(K,{data:null==N?void 0:N.data,isLoading:S}),tabSection:(0,a.jsx)(E,{onTabChange:e=>{h(e)},MovingUp:()=>{window.scrollTo(0,0)},scrollY:j.y}),movingUpButtonSection:(0,a.jsx)(_,{MovingUp:()=>w({y:0}),scrollY:j.y}),children:r?(0,a.jsxs)(s.K,{spacing:"2rem",children:[(0,a.jsx)(Q,{searchKeyword:"string"==typeof r?r:r[0],children:(0,a.jsxs)(a.Fragment,{children:[null==x?void 0:x.map(e=>e.data.data.map(e=>(0,a.jsx)(F,{assetData:e}))),f&&(0,a.jsx)(o.M,{w:"100%",h:"5rem",children:(0,a.jsx)(i.x,{c:e.colors.gray[6],children:"검색 결과가 없습니다."})})]})}),u&&(0,a.jsx)(c.Z,{position:"center",children:(0,a.jsx)(l.a,{color:"teal",variant:"dots"})})]}):(0,a.jsx)(s.K,{spacing:"4rem",children:(0,a.jsx)(V,{onSlideChange:e=>{e>p-6&&m(e=>e+1)},assetData:x,isAssetLoading:u,title:"신규 에셋"})})})})}}},function(e){e.O(0,[411,369,774,888,179],function(){return e(e.s=470)}),_N_E=e.O()}]);