(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(3),c=n.n(r),u=n(5),l=n(2),i=function(e){var t=e.note,n=e.toggleImportance,a=t.important?"make not important":"make important";return o.a.createElement("li",{className:"note"},t.content,o.a.createElement("button",{onClick:n},a))},m=i,s=function(e){var t=e.message;return console.log(t),null===t?null:o.a.createElement("div",{className:"error"},t)},f=n(4),p=n.n(f),d=function(){return p.a.get("/api/notes").then((function(e){return e.data}))},g=function(e){return p.a.post("/api/notes",e).then((function(e){return e.data}))},b=function(e,t){return p.a.put("".concat("/api/notes","/").concat(e),t).then((function(e){return e.data}))},E=function(){return o.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},o.a.createElement("br",null),o.a.createElement("em",null,"Note app, Department of Computer Science, University of Helsinki 2020"))},v=function(e){var t=Object(a.useState)([]),n=Object(l.a)(t,2),r=n[0],c=n[1],i=Object(a.useState)("a new note..."),f=Object(l.a)(i,2),p=f[0],v=f[1],h=Object(a.useState)(!0),O=Object(l.a)(h,2),j=O[0],S=O[1],k=Object(a.useState)("some error happened..."),y=Object(l.a)(k,2),w=y[0],N=y[1];Object(a.useEffect)((function(){d().then((function(e){c(e)}))}),[]),console.log("render",r.length,"notes");var C=j?r:r.filter((function(e){return e.important}));return o.a.createElement("div",null,o.a.createElement("h1",null,"Notes"),o.a.createElement(s,{message:w}),o.a.createElement("div",null,o.a.createElement("button",{onClick:function(){return S(!j)}},"show ",j?"important":"all")),o.a.createElement("ul",null,C.map((function(e){return o.a.createElement(m,{key:e.id,note:e,toggleImportance:function(){return function(e){var t=r.find((function(t){return t.id===e})),n=Object(u.a)(Object(u.a)({},t),{},{important:!t.important});b(e,n).then((function(t){c(r.map((function(n){return n.id!==e?n:t})))})).catch((function(e){N("Note '".concat(t.content,"' was already removed from server")),setTimeout((function(){console.log("clear"),N(null)}),5e3)})),console.log("importance of ".concat(e," needs to be toggled"))}(e.id)}})}))),o.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={content:p,date:(new Date).toISOString(),important:Math.random()<.5};g(t).then((function(e){c(r.concat(e)),v("")}))}},o.a.createElement("input",{value:p,onChange:function(e){console.log(e.target.value),v(e.target.value)}}),o.a.createElement("button",{type:"submit"},"save")),o.a.createElement(E,null))};n(37);c.a.render(o.a.createElement(v,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.3510005f.chunk.js.map