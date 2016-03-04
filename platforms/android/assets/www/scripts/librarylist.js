define(["appSettings"],function(e){function t(e){var t=e.target;t.classList.contains("card")&&(H&&(clearTimeout(H),H=null),t=t.querySelector(".cardOverlayTarget"),t&&a(t))}function a(e){e.classList.contains("hide")||requestAnimationFrame(function(){var t=[{height:"100%",offset:0},{height:"0",offset:1}],a={duration:300,iterations:1,fill:"forwards",easing:"ease-out"};e.animate(t,a).onfinish=function(){e.classList.add("hide")}})}function r(e){e.classList.contains("hide")&&(e.classList.remove("hide"),requestAnimationFrame(function(){e.style.display="block";var t=[{height:"0",offset:0},{height:"100%",offset:1}],a={duration:300,iterations:1,fill:"forwards",easing:"ease-out"};e.animate(t,a)}))}function n(e,t,a,r){var n="";n+='<div class="cardOverlayInner">';var i=a.className.toLowerCase(),o=-1!=i.indexOf("mini"),s=o||-1!=i.indexOf("small"),l=-1!=i.indexOf("portrait"),c=(-1!=i.indexOf("square"),s||o||l?null:e.SeriesName),d=LibraryBrowser.getPosterViewDisplayName(e,!0);n+='<div style="margin-bottom:1em;">';var u,m=s||o?20:26;c&&e.ParentLogoItemId?(u=ApiClient.getScaledImageUrl(e.ParentLogoItemId,{maxHeight:m,type:"logo",tag:e.ParentLogoImageTag}),n+='<img src="'+u+'" style="max-height:'+m+'px;max-width:100%;" />'):e.ImageTags.Logo?(u=ApiClient.getScaledImageUrl(e.Id,{maxHeight:m,type:"logo",tag:e.ImageTags.Logo}),n+='<img src="'+u+'" style="max-height:'+m+'px;max-width:100%;" />'):n+=c||d,n+="</div>",c?(n+="<p>",n+=d,n+="</p>"):s||o||(n+='<p class="itemMiscInfo" style="white-space:nowrap;">',n+=LibraryBrowser.getMiscInfoHtml(e),n+="</p>"),o||(n+='<div style="margin:1em 0 .75em;">',l?(n+='<div class="itemCommunityRating">',n+=LibraryBrowser.getRatingHtml(e,!1),n+="</div>",n+='<div class="userDataIcons" style="margin:.5em 0 0em;">',n+=LibraryBrowser.getUserDataIconsHtml(e),n+="</div>"):(n+='<span class="itemCommunityRating" style="vertical-align:middle;">',n+=LibraryBrowser.getRatingHtml(e,!1),n+="</span>",n+='<span class="userDataIcons" style="vertical-align:middle;">',n+=LibraryBrowser.getUserDataIconsHtml(e),n+="</span>"),n+="</div>"),n+="<div>";var p=0;if(MediaController.canPlay(e)){var f=(e.UserData||{}).PlaybackPositionTicks||0;n+='<paper-icon-button icon="play-circle-outline" class="btnPlayItem" data-itemid="'+e.Id+'" data-itemtype="'+e.Type+'" data-isfolder="'+e.IsFolder+'" data-mediatype="'+e.MediaType+'" data-resumeposition="'+f+'"></paper-icon-button>',p++}return-1!=r.indexOf("trailer")&&(n+='<paper-icon-button icon="videocam" class="btnPlayTrailer" data-itemid="'+e.Id+'"></paper-icon-button>',p++),n+='<paper-icon-button icon="'+AppInfo.moreIcon+'" class="btnMoreCommands"></paper-icon-button>',p++,n+="</div>",n+="</div>"}function i(){var e=this.getAttribute("data-itemid");return ApiClient.getLocalTrailers(Dashboard.getCurrentUserId(),e).then(function(e){MediaController.play({items:e})}),!1}function o(){var e=this,t=e.getAttribute("data-itemid"),a=e.getAttribute("data-itemtype"),r="true"==e.getAttribute("data-isfolder"),n=e.getAttribute("data-mediatype"),i=parseInt(e.getAttribute("data-resumeposition"));return LibraryBrowser.showPlayMenu(this,t,a,r,n,i),!1}function s(){var e=$(this).parents(".card")[0];return c(e,{showPlayOptions:!1}),!1}function l(e){var t=f(e.target,"card");if(t){var a=t.querySelector(".itemSelectionPanel");return a||c(t,{}),e.preventDefault(),!1}}function c(t,a){var r=t;t.classList.contains("card")||t.classList.contains("listItem")||(t=$(t).parents(".listItem,.card")[0]);var n=t.getAttribute("data-itemid"),i=t.getAttribute("data-playlistitemid"),o=t.getAttribute("data-commands").split(","),s=t.getAttribute("data-itemtype"),l=t.getAttribute("data-mediatype"),c=parseInt(t.getAttribute("data-positionticks")||"0"),d=t.getAttribute("data-playaccess"),u=t.getAttribute("data-locationtype"),m=t.getAttribute("data-index"),p=t.getAttribute("data-albumid"),f=t.getAttribute("data-artistid");Dashboard.getCurrentUser().then(function(g){var h=[];-1!=o.indexOf("addtocollection")&&h.push({name:Globalize.translate("ButtonAddToCollection"),id:"addtocollection",ironIcon:"add"}),-1!=o.indexOf("playlist")&&h.push({name:Globalize.translate("ButtonAddToPlaylist"),id:"playlist",ironIcon:"playlist-add"}),g.Policy.EnableContentDownloading&&AppInfo.supportsDownloading&&l&&h.push({name:Globalize.translate("ButtonDownload"),id:"download",ironIcon:"file-download"}),-1!=o.indexOf("delete")&&h.push({name:Globalize.translate("ButtonDelete"),id:"delete",ironIcon:"delete"}),g.Policy.IsAdministrator&&(-1!=o.indexOf("edit")&&h.push({name:Globalize.translate("ButtonEdit"),id:"edit",ironIcon:"mode-edit"}),-1!=o.indexOf("editimages")&&h.push({name:Globalize.translate("ButtonEditImages"),id:"editimages",ironIcon:"photo"}),-1!=o.indexOf("editsubtitles")&&h.push({name:Globalize.translate("ButtonEditSubtitles"),id:"editsubtitles",ironIcon:"closed-caption"})),-1!=o.indexOf("instantmix")&&h.push({name:Globalize.translate("ButtonInstantMix"),id:"instantmix",ironIcon:"shuffle"}),h.push({name:Globalize.translate("ButtonOpen"),id:"open",ironIcon:"folder-open"}),a.showPlayOptions!==!1&&(MediaController.canPlayByAttributes(s,l,d,u)&&(h.push({name:Globalize.translate("ButtonPlay"),id:"play",ironIcon:"play-arrow"}),-1!=o.indexOf("playfromhere")&&h.push({name:Globalize.translate("ButtonPlayAllFromHere"),id:"playallfromhere",ironIcon:"play-arrow"})),"Video"==l&&AppInfo.supportsExternalPlayers&&e.enableExternalPlayers()&&h.push({name:Globalize.translate("ButtonPlayExternalPlayer"),id:"externalplayer",ironIcon:"airplay"}),c&&"Audio"!=l&&h.push({name:Globalize.translate("ButtonResume"),id:"resume",ironIcon:"play-arrow"}),-1!=o.indexOf("trailer")&&h.push({name:Globalize.translate("ButtonPlayTrailer"),id:"trailer",ironIcon:"play-arrow"})),MediaController.canQueueMediaType(l,s)&&(h.push({name:Globalize.translate("ButtonQueue"),id:"queue",ironIcon:"playlist-add"}),-1!=o.indexOf("queuefromhere")&&h.push({name:Globalize.translate("ButtonQueueAllFromHere"),id:"queueallfromhere",ironIcon:"playlist-add"})),-1!=o.indexOf("shuffle")&&h.push({name:Globalize.translate("ButtonShuffle"),id:"shuffle",ironIcon:"shuffle"}),-1!=o.indexOf("record")&&h.push({name:Globalize.translate("ButtonRecord"),id:"record",ironIcon:"videocam"}),-1!=o.indexOf("removefromcollection")&&h.push({name:Globalize.translate("ButtonRemoveFromCollection"),id:"removefromcollection",ironIcon:"remove"}),-1!=o.indexOf("removefromplaylist")&&h.push({name:Globalize.translate("ButtonRemoveFromPlaylist"),id:"removefromplaylist",ironIcon:"remove"}),g.Policy.EnablePublicSharing&&h.push({name:Globalize.translate("ButtonShare"),id:"share",ironIcon:"share"}),-1!=o.indexOf("sync")&&h.push({name:Globalize.translate("ButtonSync"),id:"sync",ironIcon:"sync"}),p&&h.push({name:Globalize.translate("ButtonViewAlbum"),id:"album",ironIcon:"album"}),f&&h.push({name:Globalize.translate("ButtonViewArtist"),id:"artist",ironIcon:"person"});var b=t.getAttribute("data-href")||t.href;if(!b){var y=t.getElementsByTagName("a");y.length&&(b=y[0].href)}require(["actionsheet"],function(e){e.show({items:h,positionTo:r,callback:function(e){switch(e){case"addtocollection":require(["collectioneditor"],function(e){(new e).show([n])});break;case"playlist":require(["playlistManager"],function(e){e.showPanel([n])});break;case"delete":LibraryBrowser.deleteItems([n]);break;case"download":var a=ApiClient.getUrl("Items/"+n+"/Download",{api_key:ApiClient.accessToken()});window.location.href=a;break;case"edit":LibraryBrowser.editMetadata(n);break;case"refresh":ApiClient.refreshItem(n,{Recursive:!0,ImageRefreshMode:"FullRefresh",MetadataRefreshMode:"FullRefresh",ReplaceAllImages:!1,ReplaceAllMetadata:!0});break;case"instantmix":MediaController.instantMix(n);break;case"shuffle":MediaController.shuffle(n);break;case"open":Dashboard.navigate(b);break;case"album":Dashboard.navigate("itemdetails.html?id="+p);break;case"record":require(["components/recordingcreator/recordingcreator"],function(e){e.show(n)});break;case"artist":Dashboard.navigate("itemdetails.html?context=music&id="+f);break;case"play":MediaController.play(n);break;case"playallfromhere":q(m,$(t).parents(".itemsContainer"),"play");break;case"queue":MediaController.queue(n);break;case"trailer":ApiClient.getLocalTrailers(Dashboard.getCurrentUserId(),n).then(function(e){MediaController.play({items:e})});break;case"resume":MediaController.play({ids:[n],startPositionTicks:c});break;case"queueallfromhere":q(m,$(t).parents(".itemsContainer"),"queue");break;case"sync":require(["syncDialog"],function(e){e.showMenu({items:[{Id:n}]})});break;case"editsubtitles":LibraryBrowser.editSubtitles(n);break;case"editimages":LibraryBrowser.editImages(n);break;case"externalplayer":LibraryBrowser.playInExternalPlayer(n);break;case"share":require(["sharingmanager"],function(){SharingManager.showMenu(Dashboard.getCurrentUserId(),n)});break;case"removefromplaylist":$(t).parents(".itemsContainer").trigger("removefromplaylist",[i]);break;case"removefromcollection":$(t).parents(".collectionItems").trigger("removefromcollection",[n])}}})})})}function d(e,t){var a=e.target;a.classList.contains("card")||a.classList.contains("listItem")||(a=$(a).parents(".listItem,.card")[0]);var r=a.getAttribute("data-itemid"),n=a.getAttribute("data-itemtype"),i="true"==a.getAttribute("data-isfolder"),o=a.getAttribute("data-mediatype"),s=parseInt(a.getAttribute("data-positionticks"));return("MusicAlbum"==n||"MusicArtist"==n||"MusicGenre"==n||"Playlist"==n)&&(i=!0),"Program"==n&&(r=a.getAttribute("data-channelid")),LibraryBrowser.showPlayMenu(t,r,n,i,o,s),e.preventDefault(),!1}function u(e){for(;null!=e;){var t=e.tagName||"";return"A"==t||-1!=t.indexOf("BUTTON")||-1!=t.indexOf("INPUT")?!0:!1}return!1}function m(e){var t=f(e.target,"cardOverlayPlayButton");if(t)return d(e,t);var a=f(e.target,"listviewMenuButton")||f(e.target,"cardOverlayMoreButton");if(a)return c(a,{}),e.preventDefault(),!1;var r=f(e.target,"btnUserItemRating");if(r)return e.stopPropagation(),e.preventDefault(),!1;var n=f(e.target,"card");if(n){var i=n.querySelector(".itemSelectionPanel");if(i)return C(e,i);if(n.classList.contains("groupedCard"))return p(e,n)}}function p(e,t){var a=t.getAttribute("data-itemid"),r=t.getAttribute("data-context"),n=Dashboard.getCurrentUserId(),i={Limit:parseInt($(".playedIndicator",t).html()||"10"),Fields:"PrimaryImageAspectRatio,DateCreated",ParentId:a,GroupItems:!1},o=e.target;return u(o)?void 0:(ApiClient.getJSON(ApiClient.getUrl("Users/"+n+"/Items/Latest",i)).then(function(e){if(1==e.length)return void Dashboard.navigate(LibraryBrowser.getHref(e[0],r));var t="itemdetails.html?id="+a;r&&(t+="&context="+r),Dashboard.navigate(t)}),e.stopPropagation(),e.preventDefault(),!1)}function f(e,t){for(;!e.classList||!e.classList.contains(t);)if(e=e.parentNode,!e)return null;return e}function g(e){if(e.classList.contains("itemsContainer"))return void h(e);for(var t=e.querySelectorAll(".itemsContainer"),a=0,r=t.length;r>a;a++)h(t[a])}function h(e){LibraryBrowser.allowSwipe(e)&&(e.classList.contains("hasTapHold")||(require(["hammer"],function(t){var a=new t.Manager(e),r=new t.Press({time:500});a.add(r),e.classList.add("hasTapHold"),a.on("press",v),a.on("pressup",I)}),b(e)))}function b(e){var t=$(e).parents(".page")[0];if(t&&!(t.classList.contains("homePage")||t.classList.contains("itemDetailPage")||t.classList.contains("liveTvPage"))){var a="8";appStorage.getItem("tapholdhelp")!=a&&(appStorage.setItem("tapholdhelp",a),Dashboard.alert({message:Globalize.translate("TryMultiSelectMessage"),title:Globalize.translate("HeaderTryMultiSelect")}))}}function y(e){return e.preventDefault(),e.stopPropagation(),!1}function v(e){var t=f(e.target,"card");return t?(S(t),e.stopPropagation&&e.stopPropagation(),e.preventDefault(),!1):(e.preventDefault(),e.stopPropagation(),!1)}function I(e){var t=f(e.target,"itemSelectionPanel");if(t){if(!f(e.target,"chkItemSelect")){var a=t.querySelector(".chkItemSelect");a&&(a.checked=!a.checked)}return e.preventDefault(),!1}}function C(e,t){if(!f(e.target,"chkItemSelect")){var a=t.querySelector(".chkItemSelect");if(a){var r=!a.checked;a.checked=r,M(a,r)}}return e.preventDefault(),e.stopPropagation(),!1}function A(){M(this,this.checked)}function P(e){var t=e.querySelector(".itemSelectionPanel");if(!t){t=document.createElement("div"),t.classList.add("itemSelectionPanel"),e.querySelector(".cardContent").appendChild(t);var a=document.createElement("paper-checkbox");a.classList.add("chkItemSelect"),$(a).on("change",A),t.appendChild(a)}}function L(){var e=document.querySelector(".selectionCommandsPanel");if(!e){e=document.createElement("div"),e.classList.add("selectionCommandsPanel"),document.body.appendChild(e);var t="";t+='<div style="float:left;">',t+='<paper-icon-button class="btnCloseSelectionPanel" icon="close"></paper-icon-button>',t+='<span class="itemSelectionCount"></span>',t+="</div>",t+='<paper-icon-button class="btnSelectionPanelOptions" icon="more-vert" style="margin-left:auto;"></paper-icon-button>',e.innerHTML=t,e.querySelector(".btnCloseSelectionPanel").addEventListener("click",k);var a=e.querySelector(".btnSelectionPanelOptions");a.addEventListener("click",x),browserInfo.mobile||w(a,1)}}function w(e,t){var a=[{transform:"translate3d(0, 0, 0)",offset:0},{transform:"translate3d(-10px, 0, 0)",offset:.1},{transform:"translate3d(10px, 0, 0)",offset:.2},{transform:"translate3d(-10px, 0, 0)",offset:.3},{transform:"translate3d(10px, 0, 0)",offset:.4},{transform:"translate3d(-10px, 0, 0)",offset:.5},{transform:"translate3d(10px, 0, 0)",offset:.6},{transform:"translate3d(-10px, 0, 0)",offset:.7},{transform:"translate3d(10px, 0, 0)",offset:.8},{transform:"translate3d(-10px, 0, 0)",offset:.9},{transform:"translate3d(0, 0, 0)",offset:1}],r={duration:900,iterations:t};return e.animate(a,r)}function S(e){require(["paper-checkbox"],function(){for(var t=document.querySelectorAll(".card"),a=0,r=t.length;r>a;a++)P(t[a]);L(),e.querySelector(".chkItemSelect").checked=!0,M(e,!0)})}function k(){var e=document.querySelector(".selectionCommandsPanel");if(e){e.parentNode.removeChild(e),N=[];for(var t=document.querySelectorAll(".itemSelectionPanel"),a=0,r=t.length;r>a;a++)t[a].parentNode.removeChild(t[a])}}function M(e,t){var a=f(e,"card").getAttribute("data-itemid");if(t){var r=N.filter(function(e){return e==a});r.length||N.push(a)}else N=N.filter(function(e){return e!=a});if(N.length){var n=document.querySelector(".itemSelectionCount");n&&(n.innerHTML=N.length)}else k()}function x(e){Dashboard.getCurrentUser().then(function(t){var a=[];a.push({name:Globalize.translate("ButtonAddToCollection"),id:"addtocollection",ironIcon:"add"}),a.push({name:Globalize.translate("ButtonAddToPlaylist"),id:"playlist",ironIcon:"playlist-add"}),t.Policy.EnableContentDeletion&&a.push({name:Globalize.translate("ButtonDelete"),id:"delete",ironIcon:"delete"}),t.Policy.EnableContentDownloading&&AppInfo.supportsDownloading,a.push({name:Globalize.translate("HeaderGroupVersions"),id:"groupvideos",ironIcon:"call-merge"}),a.push({name:Globalize.translate("ButtonRefresh"),id:"refresh",ironIcon:"refresh"}),a.push({name:Globalize.translate("ButtonSync"),id:"sync",ironIcon:"sync"}),require(["actionsheet"],function(t){t.show({items:a,positionTo:e.target,callback:function(e){var t=N.slice(0);switch(e){case"addtocollection":require(["collectioneditor"],function(e){(new e).show(t)}),k();break;case"playlist":require(["playlistManager"],function(e){e.showPanel(t),k()});break;case"delete":LibraryBrowser.deleteItems(t).then(function(){Dashboard.navigate("index.html")}),k();break;case"groupvideos":D($($.mobile.activePage)[0],t);break;case"refresh":t.map(function(e){ApiClient.refreshItem(e,{Recursive:!0,ImageRefreshMode:"FullRefresh",MetadataRefreshMode:"FullRefresh",ReplaceAllImages:!1,ReplaceAllMetadata:!0})}),k();break;case"sync":require(["syncDialog"],function(e){e.showMenu({items:t.map(function(e){return{Id:e}})})}),k()}}})})})}function D(e,t){if(t.length<2)return void Dashboard.alert({message:Globalize.translate("MessagePleaseSelectTwoItems"),title:Globalize.translate("HeaderError")});var a=Globalize.translate("MessageTheSelectedItemsWillBeGrouped");require(["confirm"],function(r){r(a,Globalize.translate("HeaderGroupVersions")).then(function(){Dashboard.showLoadingMsg(),ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Videos/MergeVersions",{Ids:t.join(",")})}).then(function(){Dashboard.hideLoadingMsg(),k(),$(".itemsContainer",e).trigger("needsrefresh")})})})}function B(e){var t=f(e.target,"itemWithAction");if(t){var a=t.getAttribute("data-action"),r=t;if(a)for(;!r.getAttribute("data-itemid");)r=r.parentNode;var n,i,o=r.getAttribute("data-itemid");return"play"==a?MediaController.play(o):"playallfromhere"==a?(n=r.getAttribute("data-index"),i=$(t).parents(".itemsContainer"),q(n,i,"play")):"instantmix"==a&&MediaController.instantMix(o),e.stopPropagation(),e.preventDefault(),!1}}function q(e,t,a){var r=$(".mediaItem",t).get().map(function(e){for(var t=e,a=t.getAttribute("data-itemid");!a;)t=t.parentNode,a=t.getAttribute("data-itemid");return a});r=r.slice(e),ApiClient.getItems(Dashboard.getCurrentUserId(),{Ids:r.join(","),Fields:"MediaSources,Chapters",Limit:100}).then(function(e){MediaController[a]({items:e.Items})})}function T(e){var t=window.ApiClient;t&&t.getCurrentUserId()&&Dashboard.getCurrentUser().then(function(t){var a={SupportsSync:!0};LibraryBrowser.enableSync(a,t)?$(".categorySyncButton",e).removeClass("hide"):$(".categorySyncButton",e).addClass("hide")})}function G(e,t){var a=t.getAttribute("data-category"),r=LibraryMenu.getTopParentId();require(["syncDialog"],function(e){e.showMenu({ParentId:r,Category:a})})}function E(e,t){if(t.Played){var a=e.querySelector(".playedIndicator");a||(a=document.createElement("div"),a.classList.add("playedIndicator"),e.querySelector(".cardContent").appendChild(a)),a.innerHTML='<iron-icon icon="check"></iron-icon>'}else if(t.UnplayedItemCount){var a=e.querySelector(".playedIndicator");a||(a=document.createElement("div"),a.classList.add("playedIndicator"),e.querySelector(".cardContent").appendChild(a)),a.innerHTML=t.UnplayedItemCount}var r=LibraryBrowser.getItemProgressBarHtml(t);if(r){var n=e.querySelector(".cardProgress");n||(n=document.createElement("div"),n.classList.add("cardProgress"),$(".cardFooter",e).append(n)),n.innerHTML=r}else $(".cardProgress",e).remove()}function O(e){$(document.querySelectorAll("*[data-itemid='"+e.ItemId+"']")).each(function(){var t=this.getAttribute("data-mediatype");"Video"==t&&(this.setAttribute("data-positionticks",e.PlaybackPositionTicks||0),$(this).hasClass("card")&&E(this,e))})}function z(e,t){var a=t;if("UserDataChanged"===a.MessageType&&a.Data.UserId==Dashboard.getCurrentUserId())for(var r=0,n=a.Data.UserDataList.length;n>r;r++)O(a.Data.UserDataList[r])}function U(e){Events.off(e,"websocketmessage",z),Events.on(e,"websocketmessage",z)}function R(){$(".hasrefreshtime").removeClass("hasrefreshtime").removeAttr("data-lastrefresh")}var H;$.fn.createCardMenus=function(){function e(e){if(e=e.querySelector("a"),!e.querySelector(".itemSelectionPanel")){var t=e.querySelector(".cardOverlayTarget");t||(t=document.createElement("div"),t.classList.add("hide"),t.classList.add("cardOverlayTarget"),f(e,"cardContent").appendChild(t));for(var a=e;a&&!a.getAttribute("data-itemid");)a=a.parentNode;var l=a.getAttribute("data-itemid"),c=a.getAttribute("data-commands").split(","),d=ApiClient.getItem(Dashboard.getCurrentUserId(),l),u=Dashboard.getCurrentUser();Promise.all([d,u]).then(function(a){for(var r=a[0],l=a[1],d=e;!d.classList.contains("card");)d=d.parentNode;t.innerHTML=n(r,l,d,c),$(".btnPlayItem",t).on("click",o),$(".btnPlayTrailer",t).on("click",i),$(".btnMoreCommands",t).on("click",s)}),$(t).show(),r(t)}}function a(t){var a=t.target;if(a.classList.contains("cardImage")){if(d===!0)return void(d=!1);for(H&&(clearTimeout(H),H=null);!a.classList.contains("card");)a=a.parentNode;H=setTimeout(function(){e(a)},1200)}}function c(){d=!0}for(var d=!1,u=0,p=this.length;p>u;u++){var h=this[u];h.removeEventListener("click",m),h.addEventListener("click",m),AppInfo.isTouchPreferred?(h.removeEventListener("contextmenu",y),h.addEventListener("contextmenu",y)):(h.removeEventListener("contextmenu",l),h.addEventListener("contextmenu",l),h.removeEventListener("mouseenter",a),h.addEventListener("mouseenter",a,!0),h.removeEventListener("mouseleave",t),h.addEventListener("mouseleave",t,!0),h.removeEventListener("touchstart",c),h.addEventListener("touchstart",c)),g(h)}return this};var N=[];pageClassOn("pageinit","libraryPage",function(){var e=this;e.addEventListener("click",B);for(var t=e.querySelectorAll(".itemsContainer:not(.noautoinit)"),a=0,r=t.length;r>a;a++)$(t[a]).createCardMenus();$(".categorySyncButton",e).on("click",function(){G(e,this)})}),pageClassOn("pageshow","libraryPage",function(){var e=this;Dashboard.isServerlessPage()||T(e)}),pageClassOn("pagebeforehide","libraryPage",function(){k()}),window.ApiClient&&U(window.ApiClient),Events.on(ConnectionManager,"apiclientcreated",function(e,t){U(t)}),Events.on(ConnectionManager,"localusersignedin",R),Events.on(ConnectionManager,"localusersignedout",R)});