(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"8b24":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-page",{attrs:{padding:""}},[r("q-editor",{model:{value:e.editor,callback:function(t){e.editor=t},expression:"editor"}})],1)},a=[],o=(r("8e6e"),r("8a81"),r("ac6a"),r("cadf"),r("06db"),r("456d"),r("967e")),c=r.n(o),i=(r("96cf"),r("fa84")),s=r.n(i),d=r("c47a"),u=r.n(d),p=r("2ef0"),f=r.n(p);function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){u()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var O={name:"PageIndex",data:function(){return{editor:"",data:{},debounce:null}},computed:{note:function(){return this.$store.state.notes.note}},watch:{editor:function(){this.debounce()},note:function(e){e&&(this.data=l({},e),this.editor=e.body||"")}},methods:{createOrUpdate:function(){var e=this;return s()(c.a.mark((function t(){var r,n;return c.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.editor){t.next=2;break}return t.abrupt("return");case 2:if(e.data.body=e.editor,e.data.id){t.next=10;break}return t.next=6,e.$store.dispatch("notes/create",e.data);case 6:r=t.sent,e.data.id=r,t.next=12;break;case 10:n=l({},e.data),e.$store.dispatch("notes/update",n);case 12:case"end":return t.stop()}}),t)})))()}},created:function(){this.debounce=f.a.debounce(this.createOrUpdate,300)}},h=O,w=r("2877"),y=Object(w["a"])(h,n,a,!1,null,null,null);t["default"]=y.exports}}]);