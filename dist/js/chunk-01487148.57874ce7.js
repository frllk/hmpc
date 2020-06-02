(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01487148"],{"13f7":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"articles-container"},[r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("my-breadcrumb",[t._v("内容管理")])],1),r("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"状态"}},[r("el-radio-group",{model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}},[r("el-radio",{attrs:{label:null}},[t._v("全部")]),r("el-radio",{attrs:{label:0}},[t._v("草稿")]),r("el-radio",{attrs:{label:1}},[t._v("待审核")]),r("el-radio",{attrs:{label:2}},[t._v("审核通过")]),r("el-radio",{attrs:{label:3}},[t._v("审核失败")]),r("el-radio",{attrs:{label:4}},[t._v("已删除")])],1)],1),r("my-channels",{attrs:{isClearable:!0},model:{value:t.form.channel_id,callback:function(e){t.$set(t.form,"channel_id",e)},expression:"form.channel_id"}}),r("el-form-item",{attrs:{label:"日期"}},[r("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.form.date,callback:function(e){t.$set(t.form,"date",e)},expression:"form.date"}})],1),r("el-form-item",[r("el-button",{attrs:{loading:t.loading,type:"primary"},on:{click:t.hQuery}},[t._v("查询")])],1)],1)],1),r("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"10px"}},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[t._v(" 根据筛选条件查询到"),r("i",{staticStyle:{color:"#F56C6C"}},[t._v(t._s(t.total_count))]),t._v(" 条数据，当前是第 "),r("i",{staticStyle:{color:"#F56C6C"}},[t._v(t._s(t.currPage))]),t._v(" 页 ")]),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.articles}},[r("el-table-column",{attrs:{label:"ID"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.id.toString()))]}}])}),r("el-table-column",{attrs:{label:"封面"},scopedSlots:t._u([{key:"default",fn:function(t){return[r("el-image",{staticStyle:{width:"150px",height:"100px"},attrs:{lazy:"",src:t.row.cover.images[0]}})]}}])}),r("el-table-column",{attrs:{prop:"title",label:"标题"}}),r("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.status?r("el-tag",[t._v("草稿")]):1===e.row.status?r("el-tag",{attrs:{type:"info"}},[t._v("待审核")]):2===e.row.status?r("el-tag",{attrs:{type:"success"}},[t._v("审核通过")]):3===e.row.status?r("el-tag",{attrs:{type:"warning"}},[t._v("审核失败")]):4===e.row.status?r("el-tag",{attrs:{type:"danger"}},[t._v("已删除")]):t._e()]}}])}),r("el-table-column",{attrs:{prop:"pubdate",label:"发布时间"}}),r("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:"",size:"mini"},on:{click:function(r){return t.hEdit(e.row)}}}),r("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:"",size:"mini"},on:{click:function(r){return t.hDelete(e.row)}}})]}}])})],1),r("el-pagination",{staticStyle:{"margin-top":"10px"},attrs:{background:"",layout:"prev, pager, next",disabled:t.loading,"hide-on-single-page":!0,"prev-text":"上一页","next-text":"下一页",total:t.total_count},on:{"current-change":t.hPageChange}})],1)],1)},a=[],o=(r("d3b7"),r("25f0"),r("96cf"),r("1da1")),i=r("e04f"),c=r("2423"),l=r("663f"),s={name:"ArticleIndex",props:{},data:function(){return{form:{channel_id:null,date:null,status:null},articles:[],channels:[],total_count:0,currPage:1,loading:!1}},components:{MyBreadcrumb:l["a"],MyChannels:i["a"]},methods:{hQuery:function(){this.loadArticles()},loadArticles:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,r={page:t.currPage},r.status=t.form.status,r.channel_id=t.form.channel_id||null,r.begin_pubdate=t.form.date&&t.form.date[0],r.end_pubdate=t.form.date&&t.form.date[1],t.loading=!0,e.next=9,Object(c["e"])(r);case 9:n=e.sent,t.articles=n.data.data.results,t.total_count=n.data.data.total_count,t.loading=!1,e.next=20;break;case 15:e.prev=15,e.t0=e["catch"](0),console.log(e.t0),t.$message.error("获取文章失败"),t.loading=!1;case 20:case"end":return e.stop()}}),e,null,[[0,15]])})))()},hPageChange:function(t){this.currPage=t,this.loadArticles()},hEdit:function(t){console.log(t);var e=t.id.toString();this.$router.push({path:"/editArticle/"+e,query:{isDraft:0===t.status}})},hDelete:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.$confirm("确定要删除这条记录吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"});case 3:return r.prev=3,n=t.id.toString(),console.log(n),r.next=8,Object(c["b"])(n);case 8:e.$message({type:"success",message:"删除成功!"}),e.loadArticles(),r.next=16;break;case 12:r.prev=12,r.t0=r["catch"](3),console.log(r.t0),e.$message.error("删除失败!");case 16:r.next=21;break;case 18:r.prev=18,r.t1=r["catch"](0),e.$message.info("已取消删除");case 21:case"end":return r.stop()}}),r,null,[[0,18],[3,12]])})))()}},computed:{},created:function(){this.loadArticles()},mounted:function(){}},u=s,f=r("2877"),h=Object(f["a"])(u,n,a,!1,null,"7a1f6854",null);e["default"]=h.exports},"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));r("d3b7"),r("e6cf");function n(t,e,r,n,a,o,i){try{var c=t[o](i),l=c.value}catch(s){return void r(s)}c.done?e(l):Promise.resolve(l).then(n,a)}function a(t){return function(){var e=this,r=arguments;return new Promise((function(a,o){var i=t.apply(e,r);function c(t){n(i,a,o,c,l,"next",t)}function l(t){n(i,a,o,c,l,"throw",t)}c(void 0)}))}}},2423:function(t,e,r){"use strict";r.d(e,"e",(function(){return a})),r.d(e,"b",(function(){return o})),r.d(e,"f",(function(){return i})),r.d(e,"a",(function(){return c})),r.d(e,"c",(function(){return l})),r.d(e,"d",(function(){return s}));var n=r("b775"),a=function(t){return Object(n["a"])({method:"get",url:"/mp/v1_0/articles",params:t})},o=function(t){return Object(n["a"])({method:"delete",url:"/mp/v1_0/articles/"+t})},i=function(){return Object(n["a"])({method:"get",url:"/mp/v1_0/channels"})},c=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Object(n["a"])({method:"POST",url:"/mp/v1_0/articles",params:{draft:e},data:t})},l=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return Object(n["a"])({method:"PUT",url:"/mp/v1_0/articles/"+t.id,params:{draft:e},data:t})},s=function(t){return Object(n["a"])({method:"GET",url:"/mp/v1_0/articles/"+t})}},"25f0":function(t,e,r){"use strict";var n=r("6eeb"),a=r("825a"),o=r("d039"),i=r("ad6d"),c="toString",l=RegExp.prototype,s=l[c],u=o((function(){return"/a/b"!=s.call({source:"a",flags:"b"})})),f=s.name!=c;(u||f)&&n(RegExp.prototype,c,(function(){var t=a(this),e=String(t.source),r=t.flags,n=String(void 0===r&&t instanceof RegExp&&!("flags"in l)?i.call(t):r);return"/"+e+"/"+n}),{unsafe:!0})},"663f":function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[t._v("首页")]),r("el-breadcrumb-item",[t._t("default")],2)],1)},a=[],o={name:"MyBreadcrumb"},i=o,c=r("2877"),l=Object(c["a"])(i,n,a,!1,null,null,null);e["a"]=l.exports},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function l(t,e,r,n){var a=e&&e.prototype instanceof m?e:m,o=Object.create(a.prototype),i=new S(n||[]);return o._invoke=E(t,r,i),o}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}t.wrap=l;var u="suspendedStart",f="suspendedYield",h="executing",d="completed",p={};function m(){}function v(){}function g(){}var y={};y[o]=function(){return this};var b=Object.getPrototypeOf,w=b&&b(b(C([])));w&&w!==r&&n.call(w,o)&&(y=w);var _=g.prototype=m.prototype=Object.create(y);function x(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function k(t,e){function r(a,o,i,c){var l=s(t[a],t,o);if("throw"!==l.type){var u=l.arg,f=u.value;return f&&"object"===typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(f).then((function(t){u.value=t,i(u)}),(function(t){return r("throw",t,i,c)}))}c(l.arg)}var a;function o(t,n){function o(){return new e((function(e,a){r(t,n,e,a)}))}return a=a?a.then(o,o):o()}this._invoke=o}function E(t,e,r){var n=u;return function(a,o){if(n===h)throw new Error("Generator is already running");if(n===d){if("throw"===a)throw o;return P()}r.method=a,r.arg=o;while(1){var i=r.delegate;if(i){var c=L(i,r);if(c){if(c===p)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===u)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var l=s(t,e,r);if("normal"===l.type){if(n=r.done?d:f,l.arg===p)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n=d,r.method="throw",r.arg=l.arg)}}}function L(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,L(t,r),"throw"===r.method))return p;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var a=s(n,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,p;var o=a.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,p):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,p)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function C(t){if(t){var r=t[o];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var a=-1,i=function r(){while(++a<t.length)if(n.call(t,a))return r.value=t[a],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:P}}function P(){return{value:e,done:!0}}return v.prototype=_.constructor=g,g.constructor=v,g[c]=v.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},x(k.prototype),k.prototype[i]=function(){return this},t.AsyncIterator=k,t.async=function(e,r,n,a,o){void 0===o&&(o=Promise);var i=new k(l(e,r,n,a),o);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(_),_[c]="Generator",_[o]=function(){return this},_.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=C,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function a(n,a){return c.type="throw",c.arg=t,r.next=n,a&&(r.method="next",r.arg=e),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var l=n.call(i,"catchLoc"),s=n.call(i,"finallyLoc");if(l&&s){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(l){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,p):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),j(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;j(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:C(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),p}},t}(t.exports);try{regeneratorRuntime=n}catch(a){Function("r","regeneratorRuntime = r")(n)}},ad6d:function(t,e,r){"use strict";var n=r("825a");t.exports=function(){var t=n(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},e04f:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form-item",{attrs:{prop:t.prop,label:"频道"}},[r("el-select",{attrs:{clearable:t.isClearable,placeholder:"请选择频道"},on:{change:t.hSlectChange},model:{value:t.channel_id,callback:function(e){t.channel_id=e},expression:"channel_id"}},t._l(t.channels,(function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1)},a=[],o=(r("96cf"),r("1da1")),i=r("2423"),c={name:"MyChannelsVmodel",props:["value","isClearable","prop"],data:function(){return{channel_id:"",channels:[]}},methods:{hSlectChange:function(){this.$emit("input",this.channel_id)}},created:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(i["f"])();case 3:r=e.sent,t.channels=r.data.data.channels,e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()}},l=c,s=r("2877"),u=Object(s["a"])(l,n,a,!1,null,null,null);e["a"]=u.exports}}]);
//# sourceMappingURL=chunk-01487148.57874ce7.js.map