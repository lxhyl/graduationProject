(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-81cbca56"],{"057f":function(t,e,r){var n=r("fc6a"),a=r("241c").f,o={}.toString,i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return a(t)}catch(e){return i.slice()}};t.exports.f=function(t){return i&&"[object Window]"==o.call(t)?s(t):a(n(t))}},5530:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r("a4d3"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("159b");function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}},6272:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-card",[r("div",{attrs:{slot:"header"},slot:"header"},[r("span",[t._v("创建任务")])]),r("el-form",{ref:"task",attrs:{model:t.formData,rules:t.rules,inline:"",size:"small","label-width":"90px"}},[r("el-form-item",{attrs:{label:"任务名称:",prop:"title"}},[r("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"请输入任务名称"},model:{value:t.formData.title,callback:function(e){t.$set(t.formData,"title",e)},expression:"formData.title"}})],1),r("br"),r("el-form-item",{attrs:{label:"日期:",prop:"date"}},[r("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","picker-options":t.pickerOptions,"start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.formData.date,callback:function(e){t.$set(t.formData,"date",e)},expression:"formData.date"}})],1),r("br"),r("el-form-item",{attrs:{label:"工作流:"}},[r("el-steps",{attrs:{direction:"vertical",space:"20"}},t._l(t.worlFlowList,(function(e,n){return r("el-step",{key:n,attrs:{title:e,status:"success"}},[r("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e)+" "),r("i",{staticClass:"el-icon-delete icon",on:{click:function(e){return t.deleteFlow(n)}}}),n>0?r("i",{staticClass:"el-icon-upload2 icon",on:{click:function(e){return t.changeFlowIndex(n-1,n)}}}):t._e(),n<t.worlFlowList.length-1?r("i",{staticClass:"el-icon-download icon",on:{click:function(e){return t.changeFlowIndex(n,n+1)}}}):t._e()])])})),1),r("div",[r("el-input",{attrs:{placeholder:"请逐步输入工作流"},model:{value:t.workFlowName,callback:function(e){t.workFlowName=e},expression:"workFlowName"}},[r("el-button",{attrs:{slot:"append"},on:{click:t.addFlow},slot:"append"},[t._v("添加")])],1)],1)],1),r("br"),r("el-form-item",{attrs:{label:"成本(元):",prop:"cost"}},[r("el-input",{attrs:{placeholder:"请输入单个成本"},model:{value:t.formData.cost,callback:function(e){t.$set(t.formData,"cost",e)},expression:"formData.cost"}})],1),r("br"),r("el-form-item",{attrs:{label:"数量:",prop:"quantity"}},[r("el-input",{attrs:{placeholder:"请输入数量"},model:{value:t.formData.quantity,callback:function(e){t.$set(t.formData,"quantity",e)},expression:"formData.quantity"}})],1),r("br"),r("el-form-item",{attrs:{label:"执行者:",prop:"responsePerson"}},[r("el-select",{model:{value:t.formData.responsePerson,callback:function(e){t.$set(t.formData,"responsePerson",e)},expression:"formData.responsePerson"}},t._l(t.resPersonList,(function(t){return r("el-option",{key:t.id,attrs:{value:t.id,label:t.name+"(账号:"+t.account+")"}})})),1)],1),r("br"),r("el-form-item",{attrs:{label:"描述:"}},[r("el-input",{staticStyle:{width:"400px"},attrs:{type:"textarea",autosize:{minRows:3},placeholder:"请简要描述任务"},model:{value:t.formData.description,callback:function(e){t.$set(t.formData,"description",e)},expression:"formData.description"}})],1),r("br"),r("el-form-item",{attrs:{label:"相关资料:"}},[r("el-upload",{staticClass:"upload-demo",attrs:{drag:"",multiple:"",action:"/bsapi/files","before-upload":t.beforeUpload,"on-success":t.onSuccess}},[r("i",{staticClass:"el-icon-upload"}),r("div",{staticClass:"el-upload__text"},[t._v(" 将文件拖到此处，或"),r("em",[t._v("点击上传")])]),r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("文件应不超过20M")])])],1),r("br"),r("el-form-item",{attrs:{label:"标签:"}},[t._l(t.formData.tags,(function(e,n){return r("el-tag",{key:e.name,staticStyle:{margin:"0 5px"},attrs:{effect:"dark",type:e.type,closable:""},on:{close:function(e){return t.deleteTag(n)}}},[t._v(" "+t._s(e.name)+" ")])})),r("el-tag",{on:{click:t.openAddTag}},[t._v("+新增标签")]),r("el-dialog",{attrs:{title:"新建标签",visible:t.tagsVisible,modal:!1,width:"500px"},on:{"update:visible":function(e){t.tagsVisible=e}}},[r("el-form",{ref:"tags",staticStyle:{"padding-bottom":"30px"},attrs:{inline:"",size:"small","label-width":"90px"}},[r("el-form-item",{attrs:{label:"标签名"}},[r("el-input",{attrs:{placeholder:"输入一个标签名"},model:{value:t.tagForm.name,callback:function(e){t.$set(t.tagForm,"name",e)},expression:"tagForm.name"}})],1),r("el-form-item",{attrs:{label:"类型"}},[r("el-select",{model:{value:t.tagForm.type,callback:function(e){t.$set(t.tagForm,"type",e)},expression:"tagForm.type"}},t._l(t.tagsTypeOptions,(function(t){return r("el-option",{key:t.type,attrs:{value:t.type,label:t.name}})})),1)],1),r("br"),r("el-button",{staticClass:"submit-button",attrs:{type:"primary"},on:{click:t.addTag}},[t._v("添加标签")])],1)],1)],2),r("br"),r("el-form-item",{attrs:{label:"备注:"}},[r("el-input",{staticStyle:{width:"400px"},attrs:{type:"textarea",autosize:{minRows:3},placeholder:"请添加任务备注"},model:{value:t.formData.comment,callback:function(e){t.$set(t.formData,"comment",e)},expression:"formData.comment"}})],1),r("br"),r("el-form-item",{attrs:{label:"联系方式:"}},[r("el-input",{attrs:{placeholder:"请输入联系方式"},model:{value:t.formData.phone,callback:function(e){t.$set(t.formData,"phone",e)},expression:"formData.phone"}})],1),r("br"),r("el-form-item",{attrs:{label:"联系地址:"}},[r("el-input",{attrs:{placeholder:"请输入联系地址"},model:{value:t.formData.address,callback:function(e){t.$set(t.formData,"address",e)},expression:"formData.address"}})],1),r("br"),r("br"),r("el-button",{staticClass:"submit-button",attrs:{type:"primary"},on:{click:t.submit}},[t._v("创建")])],1)],1)],1)},a=[],o=(r("99af"),r("a15b"),r("d81d"),r("a434"),r("b0c0"),r("5530")),i=(r("96cf"),r("1da1")),s=r("5723"),c=r("ea7f"),l=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"blur";return{required:!0,message:"".concat(t,"是必须的"),trigger:e}},u={props:["fatherTask"],data:function(){return{formData:{tags:[],fileIds:[]},tagsVisible:!1,tagsTypeOptions:[{type:"success",name:"正常"},{type:"info",name:"决议中"},{type:"warning",name:"可能会变动"},{type:"danger",name:"紧急"}],tagForm:{},rules:{title:[l("名称","change")],date:[l("日期","change")],cost:[l("成本","change")],quantity:[l("数量","change")],responsePerson:[l("任务执行者","change")]},resPersonList:[],pickerOptions:{disabledDate:function(t){return t.getTime()<Date.now()-864e5}},workFlowName:"",worlFlowList:[]}},methods:{changeFlowIndex:function(t,e){var r=this.worlFlowList[t];this.$set(this.worlFlowList,t,this.worlFlowList[e]),this.$set(this.worlFlowList,e,r)},deleteFlow:function(t){this.worlFlowList.splice(t,1)},addFlow:function(){""!==this.workFlowName&&(this.worlFlowList.push(this.workFlowName),this.workFlowName="")},getResponsiblePersonList:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(s["d"])();case 2:if(r=e.sent,200===r.code){e.next=6;break}return t.$message.error(r.msg),e.abrupt("return");case 6:t.resPersonList=r.data;case 7:case"end":return e.stop()}}),e)})))()},beforeUpload:function(t){var e=t.size/1024/1024;return!(e>20)||(this.$message.warning("文件过大"),!1)},onSuccess:function(t){200===t.code?this.formData.fileIds.push(t.data.fileId):this.$message.error("文件上传失败")},openAddTag:function(){this.tagForm={},this.tagsVisible=!0},addTag:function(){this.formData.tags.push(this.tagForm),this.tagsVisible=!1},deleteTag:function(t){this.formData.tags.splice(t,1)},formatDate:function(){var t=Object(o["a"])({},this.formData),e=new Date(t.date[0]).getTime(),r=new Date(t.date[1]).getTime();return t.startDate=e,t.endDate=r,t.fileIds=t.fileIds.join(","),t.flow=this.worlFlowList.join(";"),t.tags=t.tags.map((function(t){return"".concat(t.name,",").concat(t.type)})).join(";"),delete t.date,this.fatherTask&&(t.fatherTask=this.fatherTask),t},submit:function(){var t=this;this.$refs.task.validate(function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(r){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r){e.next=2;break}return e.abrupt("return");case 2:return n=t.formatDate(),e.next=5,Object(c["e"])(n);case 5:if(a=e.sent,200===a.code){e.next=9;break}return t.$message.error("创建失败"),e.abrupt("return");case 9:t.$message.success("创建任务成功"),t.$router.push("/todo");case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},created:function(){this.getResponsiblePersonList()}},f=u,d=(r("a79c"),r("2877")),p=Object(d["a"])(f,n,a,!1,null,"36b41d88",null);e["default"]=p.exports},"746f":function(t,e,r){var n=r("428f"),a=r("5135"),o=r("e538"),i=r("9bf2").f;t.exports=function(t){var e=n.Symbol||(n.Symbol={});a(e,t)||i(e,t,{value:o.f(t)})}},"7f49":function(t,e,r){},a15b:function(t,e,r){"use strict";var n=r("23e7"),a=r("44ad"),o=r("fc6a"),i=r("a640"),s=[].join,c=a!=Object,l=i("join",",");n({target:"Array",proto:!0,forced:c||!l},{join:function(t){return s.call(o(this),void 0===t?",":t)}})},a434:function(t,e,r){"use strict";var n=r("23e7"),a=r("23cb"),o=r("a691"),i=r("50c4"),s=r("7b0b"),c=r("65f0"),l=r("8418"),u=r("1dde"),f=r("ae40"),d=u("splice"),p=f("splice",{ACCESSORS:!0,0:0,1:2}),m=Math.max,b=Math.min,h=9007199254740991,g="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!d||!p},{splice:function(t,e){var r,n,u,f,d,p,w=s(this),v=i(w.length),y=a(t,v),k=arguments.length;if(0===k?r=n=0:1===k?(r=0,n=v-y):(r=k-2,n=b(m(o(e),0),v-y)),v+r-n>h)throw TypeError(g);for(u=c(w,n),f=0;f<n;f++)d=y+f,d in w&&l(u,f,w[d]);if(u.length=n,r<n){for(f=y;f<v-n;f++)d=f+n,p=f+r,d in w?w[p]=w[d]:delete w[p];for(f=v;f>v-n+r;f--)delete w[f-1]}else if(r>n)for(f=v-n;f>y;f--)d=f+n-1,p=f+r-1,d in w?w[p]=w[d]:delete w[p];for(f=0;f<r;f++)w[f+y]=arguments[f+2];return w.length=v-n+r,u}})},a4d3:function(t,e,r){"use strict";var n=r("23e7"),a=r("da84"),o=r("d066"),i=r("c430"),s=r("83ab"),c=r("4930"),l=r("fdbf"),u=r("d039"),f=r("5135"),d=r("e8b5"),p=r("861d"),m=r("825a"),b=r("7b0b"),h=r("fc6a"),g=r("c04e"),w=r("5c6c"),v=r("7c73"),y=r("df75"),k=r("241c"),O=r("057f"),D=r("7418"),j=r("06cf"),x=r("9bf2"),F=r("d1e7"),P=r("9112"),S=r("6eeb"),_=r("5692"),$=r("f772"),T=r("d012"),L=r("90e3"),C=r("b622"),N=r("e538"),R=r("746f"),E=r("d44e"),I=r("69f3"),q=r("b727").forEach,z=$("hidden"),A="Symbol",V="prototype",J=C("toPrimitive"),M=I.set,U=I.getterFor(A),Q=Object[V],W=a.Symbol,B=o("JSON","stringify"),G=j.f,H=x.f,K=O.f,X=F.f,Y=_("symbols"),Z=_("op-symbols"),tt=_("string-to-symbol-registry"),et=_("symbol-to-string-registry"),rt=_("wks"),nt=a.QObject,at=!nt||!nt[V]||!nt[V].findChild,ot=s&&u((function(){return 7!=v(H({},"a",{get:function(){return H(this,"a",{value:7}).a}})).a}))?function(t,e,r){var n=G(Q,e);n&&delete Q[e],H(t,e,r),n&&t!==Q&&H(Q,e,n)}:H,it=function(t,e){var r=Y[t]=v(W[V]);return M(r,{type:A,tag:t,description:e}),s||(r.description=e),r},st=l?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof W},ct=function(t,e,r){t===Q&&ct(Z,e,r),m(t);var n=g(e,!0);return m(r),f(Y,n)?(r.enumerable?(f(t,z)&&t[z][n]&&(t[z][n]=!1),r=v(r,{enumerable:w(0,!1)})):(f(t,z)||H(t,z,w(1,{})),t[z][n]=!0),ot(t,n,r)):H(t,n,r)},lt=function(t,e){m(t);var r=h(e),n=y(r).concat(mt(r));return q(n,(function(e){s&&!ft.call(r,e)||ct(t,e,r[e])})),t},ut=function(t,e){return void 0===e?v(t):lt(v(t),e)},ft=function(t){var e=g(t,!0),r=X.call(this,e);return!(this===Q&&f(Y,e)&&!f(Z,e))&&(!(r||!f(this,e)||!f(Y,e)||f(this,z)&&this[z][e])||r)},dt=function(t,e){var r=h(t),n=g(e,!0);if(r!==Q||!f(Y,n)||f(Z,n)){var a=G(r,n);return!a||!f(Y,n)||f(r,z)&&r[z][n]||(a.enumerable=!0),a}},pt=function(t){var e=K(h(t)),r=[];return q(e,(function(t){f(Y,t)||f(T,t)||r.push(t)})),r},mt=function(t){var e=t===Q,r=K(e?Z:h(t)),n=[];return q(r,(function(t){!f(Y,t)||e&&!f(Q,t)||n.push(Y[t])})),n};if(c||(W=function(){if(this instanceof W)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=L(t),r=function(t){this===Q&&r.call(Z,t),f(this,z)&&f(this[z],e)&&(this[z][e]=!1),ot(this,e,w(1,t))};return s&&at&&ot(Q,e,{configurable:!0,set:r}),it(e,t)},S(W[V],"toString",(function(){return U(this).tag})),S(W,"withoutSetter",(function(t){return it(L(t),t)})),F.f=ft,x.f=ct,j.f=dt,k.f=O.f=pt,D.f=mt,N.f=function(t){return it(C(t),t)},s&&(H(W[V],"description",{configurable:!0,get:function(){return U(this).description}}),i||S(Q,"propertyIsEnumerable",ft,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:W}),q(y(rt),(function(t){R(t)})),n({target:A,stat:!0,forced:!c},{for:function(t){var e=String(t);if(f(tt,e))return tt[e];var r=W(e);return tt[e]=r,et[r]=e,r},keyFor:function(t){if(!st(t))throw TypeError(t+" is not a symbol");if(f(et,t))return et[t]},useSetter:function(){at=!0},useSimple:function(){at=!1}}),n({target:"Object",stat:!0,forced:!c,sham:!s},{create:ut,defineProperty:ct,defineProperties:lt,getOwnPropertyDescriptor:dt}),n({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:pt,getOwnPropertySymbols:mt}),n({target:"Object",stat:!0,forced:u((function(){D.f(1)}))},{getOwnPropertySymbols:function(t){return D.f(b(t))}}),B){var bt=!c||u((function(){var t=W();return"[null]"!=B([t])||"{}"!=B({a:t})||"{}"!=B(Object(t))}));n({target:"JSON",stat:!0,forced:bt},{stringify:function(t,e,r){var n,a=[t],o=1;while(arguments.length>o)a.push(arguments[o++]);if(n=e,(p(e)||void 0!==t)&&!st(t))return d(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!st(e))return e}),a[1]=e,B.apply(null,a)}})}W[V][J]||P(W[V],J,W[V].valueOf),E(W,A),T[z]=!0},a79c:function(t,e,r){"use strict";r("7f49")},b0c0:function(t,e,r){var n=r("83ab"),a=r("9bf2").f,o=Function.prototype,i=o.toString,s=/^\s*function ([^ (]*)/,c="name";n&&!(c in o)&&a(o,c,{configurable:!0,get:function(){try{return i.call(this).match(s)[1]}catch(t){return""}}})},b64b:function(t,e,r){var n=r("23e7"),a=r("7b0b"),o=r("df75"),i=r("d039"),s=i((function(){o(1)}));n({target:"Object",stat:!0,forced:s},{keys:function(t){return o(a(t))}})},dbb4:function(t,e,r){var n=r("23e7"),a=r("83ab"),o=r("56ef"),i=r("fc6a"),s=r("06cf"),c=r("8418");n({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(t){var e,r,n=i(t),a=s.f,l=o(n),u={},f=0;while(l.length>f)r=a(n,e=l[f++]),void 0!==r&&c(u,e,r);return u}})},e439:function(t,e,r){var n=r("23e7"),a=r("d039"),o=r("fc6a"),i=r("06cf").f,s=r("83ab"),c=a((function(){i(1)})),l=!s||c;n({target:"Object",stat:!0,forced:l,sham:!s},{getOwnPropertyDescriptor:function(t,e){return i(o(t),e)}})},e538:function(t,e,r){var n=r("b622");e.f=n},ea7f:function(t,e,r){"use strict";r.d(e,"e",(function(){return a})),r.d(e,"i",(function(){return o})),r.d(e,"h",(function(){return i})),r.d(e,"b",(function(){return s})),r.d(e,"a",(function(){return c})),r.d(e,"g",(function(){return l})),r.d(e,"d",(function(){return u})),r.d(e,"f",(function(){return f})),r.d(e,"c",(function(){return d}));var n=r("8daa"),a=function(t){return Object(n["a"])({url:"/createTask",method:"post",data:t})},o=function(t){return Object(n["a"])({url:"/taskList",method:"get",params:t})},i=function(t){return Object(n["a"])({url:"/task/detail",method:"get",params:t})},s=function(t){return Object(n["a"])({url:"/task/changTaskStatus",method:"post",data:t})},c=function(t){return Object(n["a"])({url:"/task/changeLog",method:"post",data:t})},l=function(t){return Object(n["a"])({url:"/task/getChangeLogs",method:"get",params:t})},u=function(t){return Object(n["a"])({url:"/task/changeResPerson",method:"post",data:t})},f=function(){return Object(n["a"])({url:"/task/allList",method:"get"})},d=function(t){return Object(n["a"])({url:"/task/ing/changeFlow",method:"post",data:t})}}}]);
//# sourceMappingURL=chunk-81cbca56.08b88ea2.js.map