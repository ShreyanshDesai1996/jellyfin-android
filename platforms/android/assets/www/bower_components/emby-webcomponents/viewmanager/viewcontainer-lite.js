define(["browser"],function(n){function e(){return n.tv?!1:!0}function t(n){if(!n.cancel){f();var e=w,t=-1==e?null:p[e],o=e+1;o>=g&&(o=0);var s=document.createElement("div");n.type&&s.setAttribute("data-type",n.type),s.innerHTML=n.view;var u=p[o],c=s;return s.classList.add("mainAnimatedPage"),u?(d(u),v.replaceChild(s,u)):v.appendChild(s),p[o]=s,h&&h(s,!1,n),i(p,o,e),a(c,t,n.transition,n.isBack).then(function(){return w=o,y[o]=n.url,!n.cancel&&t&&r(p,o),s})}}function i(n,e,t){for(var i=0,r=n.length;r>i;i++)e==i||t==i||n[i].classList.add("hide")}function r(n,e){for(var t=0,i=n.length;i>t;t++)e==t||n[t].classList.add("hide")}function a(n,t,i,r){if(e()&&t&&n.animate){if("slide"==i)return o(n,t,i,r);if("fade"==i)return s(n,t,i,r)}return Promise.resolve()}function o(n,e,t,i){return new Promise(function(t){var r={duration:450,iterations:1,easing:"ease-out",fill:"both"},a=[];if(e){var o=i?"100%":"-100%";a.push(e.animate([{transform:"none",offset:0},{transform:"translate3d("+o+", 0, 0)",offset:1}],r))}var s=i?"-100%":"100%";a.push(n.animate([{transform:"translate3d("+s+", 0, 0)",offset:0},{transform:"none",offset:1}],r)),L=a,a[a.length-1].onfinish=t})}function s(n,e){return new Promise(function(t){var i={duration:200,iterations:1,easing:"ease-out",fill:"both"},r=[];e&&r.push(e.animate([{opacity:1,offset:0},{opacity:0,offset:1}],i)),r.push(n.animate([{opacity:0,offset:0},{opacity:1,offset:1}],i)),L=r,r[r.length-1].onfinish=t})}function f(){for(var n=L,e=0,t=n.length;t>e;e++)u(n[e])}function u(n){try{n.cancel()}catch(e){}}function c(n){h=n}function l(n){var e=n.url,t=y.indexOf(e);if(-1!=t){var o=p[t],s=o;if(s){if(n.cancel)return;f();var u=w,c=-1==u?null:p[u];return h&&h(s,!0,n),i(p,t,u),o.classList.remove("hide"),a(o,c,n.transition,n.isBack).then(function(){return w=t,!n.cancel&&c&&r(p,t),s})}}return Promise.reject()}function d(n){n.dispatchEvent(new CustomEvent("viewdestroy",{}))}function m(){p=[],y=[],v.innerHTML="",w=-1}var h,v=document.querySelector(".mainAnimatedPages"),p=[],y=[],g=3,w=-1,L=[];return e()&&!document.documentElement.animate&&require(["webAnimations"]),{loadView:t,tryRestoreView:l,reset:m,setOnBeforeChange:c}});