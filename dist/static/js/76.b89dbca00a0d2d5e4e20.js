webpackJsonp([76],{Nxvh:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("fZjL"),a=e.n(i),n=e("Xxa5"),r=e.n(n),l=e("exGp"),_=e.n(l),p={name:"MaintenanceCaseDetails",data:function(){return{title:"",renderList:[{title:"",list:[]}],renderPicList:[]}},methods:{goBack:function(){this.$router.back(-1)},getHelperRepairCaseDetail:function(){var t=this;return _()(r.a.mark(function s(){var e,i;return r.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return(e={}).token=localStorage.getItem("phpToken"),e.id=t.$route.query.id,s.next=5,t.$axios.getHelperRepairCaseDetail(e);case 5:2e4==(i=s.sent).code?t.convertData(i.data):t.dialog(i.msg);case 7:case"end":return s.stop()}},s,t)}))()},convertData:function(t){var s=this;this.title=t.title,this.renderPicList=t.case_pic||[];var e=[];a()(t).map(function(s,i){"title"==s||"case_pic"==s||e.push(t[s])}),e.map(function(t,e){var i=t.split("<br>"),a={};a.title=i[0],a.list=i.slice(1).filter(function(t,s){return t.indexOf("<img")<0&&t}),s.renderList[e]=a})}},mounted:function(){this.getHelperRepairCaseDetail()}},c={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"maintenanceCaseDetails"},[e("Header",{attrs:{title:t.title},on:{goBack:t.goBack}}),e("div",{staticClass:"details-conts"},[t._l(t.renderList,function(s,i){return e("div",{key:i,staticClass:"conts-div"},[s.list.length>0?e("div",{staticClass:"failurePhenomenon"},[e("p",{staticClass:"hd-title"},[t._v(t._s(s.title))]),e("div",{staticClass:"words_content"},t._l(s.list,function(s,i){return s?e("p",{key:i},[t._v(t._s(s))]):t._e()}))]):t._e()])}),t.renderPicList.length>0?e("div",{staticClass:"pictureList conts-div"},[e("p",{staticClass:"hd-title"},[t._v("图片列表")]),e("div",{staticClass:"picture_img"},t._l(t.renderPicList,function(t,s){return e("p",{key:s},[e("img",{attrs:{src:t}})])}))]):t._e()],2),t._m(0)],1)},staticRenderFns:[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"pswp",staticStyle:{display:"none"},attrs:{tabindex:"-1",role:"dialog","aria-hidden":"true"}},[e("div",{staticClass:"pswp__bg"}),t._v(" "),e("div",{staticClass:"pswp__scroll-wrap"},[e("div",{staticClass:"pswp__container"},[e("div",{staticClass:"pswp__item"}),t._v(" "),e("div",{staticClass:"pswp__item"}),t._v(" "),e("div",{staticClass:"pswp__item"})]),t._v(" "),e("div",{staticClass:"pswp__ui pswp__ui--hidden"},[e("div",{staticClass:"pswp__top-bar"},[e("div",{staticClass:"pswp__counter"}),t._v(" "),e("button",{staticClass:"pswp__button pswp__button--close",attrs:{title:"Close (Esc)"}}),t._v(" "),e("button",{staticClass:"pswp__button pswp__button--share",attrs:{title:"Share"}}),t._v(" "),e("button",{staticClass:"pswp__button pswp__button--fs",attrs:{title:"Toggle fullscreen"}}),t._v(" "),e("button",{staticClass:"pswp__button pswp__button--zoom",attrs:{title:"Zoom in/out"}}),t._v(" "),e("div",{staticClass:"pswp__preloader"},[e("div",{staticClass:"pswp__preloader__icn"},[e("div",{staticClass:"pswp__preloader__cut"},[e("div",{staticClass:"pswp__preloader__donut"})])])])]),t._v(" "),e("div",{staticClass:"pswp__share-modal pswp__share-modal--hidden pswp__single-tap"},[e("div",{staticClass:"pswp__share-tooltip"})]),t._v(" "),e("button",{staticClass:"pswp__button pswp__button--arrow--left",attrs:{title:"Previous (arrow left)"}}),t._v(" "),e("button",{staticClass:"pswp__button pswp__button--arrow--right",attrs:{title:"Next (arrow right)"}}),t._v(" "),e("div",{staticClass:"pswp__caption"},[e("div",{staticClass:"pswp__caption__center"})])])])])}]};var o=e("VU/8")(p,c,!1,function(t){e("lj34")},null,null);s.default=o.exports},lj34:function(t,s){}});