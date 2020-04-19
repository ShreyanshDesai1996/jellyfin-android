define(["events","appSettings","filesystem","loading"],(function(e,o,t,i){"use strict";return function(){var t=this;window.ExoPlayer=this,t.name="ExoPlayer",t.type="mediaplayer",t.id="exoplayer",t.priority=-1,t.supportsProgress=!1,t.isLocalPlayer=!0,t._currentTime=0,t._paused=!0,t.volume=0,t._currentSrc=null,t.invokeNativeMethod=function(e,o,t,i){return window.NativeShell.invokeMethod("exoplayer."+e,o,t,i)},t.canPlayMediaType=function(e){return"Video"===e},t.checkTracksSupport=function(e,o,t){return new Promise((function(i){invokeMethod("checkTracksSupport",[e,o,t],(function(e){i({videoTracks:e.videoTracks,audioTracks:e.audioTracks,subtitleTracks:e.subtitleTracks})}),(function(){i(!1)}))}))},t.canPlayItem=function(e,o){return!0},t.currentSrc=function(){return t._currentSrc},t.play=function(e){return new Promise((function(o){t._currentTime=0,t._paused=!1,t._currentSrc=e.url,t.invokeNativeMethod("loadPlayer",[e]),t._volume=t.invokeNativeMethod("getVolume"),i.hide(),o()}))},t.setSubtitleStreamIndex=function(e){},t.canSetAudioStreamIndex=function(){return!1},t.setAudioStreamIndex=function(e){},t.currentTime=function(e){return null},t.duration=function(e){return null},t.destroy=function(){t.invokeNativeMethod("destroyPlayer")},t.pause=function(){t._paused=!0,t.invokeNativeMethod("pausePlayer")},t.unpause=function(){t._paused=!1,t.invokeNativeMethod("resumePlayer")},t.paused=function(){return t._paused},t.stop=function(e){return new Promise((function(o){t.invokeNativeMethod("stopPlayer"),e&&t.destroy(),o()}))},t.volume=function(e){},t.setMute=function(e){let o=Number(t._volume)?t._volume:"0.5";t.invokeNativeMethod("setVolume",[e?"0":o])},t.isMuted=function(){return 0==Number(t._volume)},t.notifyVolumeChange=function(o){t._volume=o,e.trigger(t,"volumechange")},t.notifyPlay=function(){e.trigger(t,"unpause")},t.notifyPlaying=function(){t._paused=!1,e.trigger(t,"playing")},t.notifyEnded=function(){let o={src:t._currentSrc};e.trigger(t,"stopped",[o]),t._currentSrc=t._currentTime=null},t.notifyPause=function(){t._paused=!0,e.trigger(t,"pause")},t.notifyTimeUpdate=function(o){o/=1e3,t._timeUpdated=t._currentTime!=o,t._currentTime=o,e.trigger(t,"timeupdate")},t.currentTime=function(){return 1e3*(t._currentTime||0)},t.getDeviceProfile=function(e,i){return new Promise((function(e,i){require(["browserdeviceprofile"],(function(i){var n=o.maxStreamingBitrate(),r={};r.MaxStreamingBitrate=n,r.MaxStaticBitrate=1e8,r.MusicStreamingTranscodingBitrate=192e3,r.SubtitleProfiles=[],r.DirectPlayProfiles=[],r.CodecProfiles=[];var a={"3gp":["h263","h264","mpeg4","hevc"],mp4:["h263","h264","mpeg4","hevc","mpeg2video","av1","mpeg1video"],ts:["h264","mpeg4"],webvm:["vp8","vp9"],mkv:["h264","mpeg4","hevc","vp8","vp9","mpeg2video","mpeg1video"],avi:["h263","h264","mpeg4","hevc","vp8","vp9","mpeg2video","mpeg1video"],flv:["h264","mpeg4"],asf:["mpeg2video","mpeg4","h263","h264","hevc","vp8","vp9","mpeg1video"],wmv:["mpeg2video","mpeg4","h263","h264","hevc","vp8","vp9"],m2ts:["mp2g2video","mpeg4","h264","mpeg1video"],vob:["mpeg1video","mpeg2video"],mov:["mpeg1video","mpeg2video","mpeg4","h263","h264","hevc"]},u={"3gp":["aac","3gpp","flac"],mp4:["aac","mp1","mp2","mp3"],ts:["aac","mp1","mp2","mp3","ac3","dts"],flac:["flac"],aac:["aac"],mkv:["aac","dts","flac","vorbis","ac3","wma","mp1","mp2","mp3"],mp3:["mp3"],ogg:["ogg","opus","vorbis"],webvm:["vorbis","opus"],avi:["flac","aac","dts","ac3","wma","pcm","mp1","mp2","mp3"],flv:["aac","mp3"],asf:["aac","ac3","dts","wma","flac","pcm"],wmv:["aac","ac3","dts","wma","flac","pcm"],m2ts:["aac","ac3","dts","pcm"],vob:["mp1"],mov:["mp3","aac","ac3","dts-hd","pcm"]};["srt","subrip","ass","ssa","pgs","pgssub","vtt","sub","idx","smi"].forEach((function(e){r.SubtitleProfiles.push({Format:e,Method:"Embed"})})),r.SubtitleProfiles.push({Format:"dvdsub",Method:"Encode"}),t.invokeNativeMethod("getSupportedFormats",null,(function(o){var t=[],i=[];for(var n in o.audioCodecs)if(o.audioCodecs.hasOwnProperty(n)){var c=o.audioCodecs[n];i.push(c.codec)}for(var n in o.videoCodecs)if(o.videoCodecs.hasOwnProperty(n)){var d=o.videoCodecs[n];t.push(d.codec);var p=d.profiles.join("|"),s=d.levels.length&&Math.max.apply(null,d.levels),m=[];p&&m.push({Condition:"EqualsAny",Property:"VideoProfile",Value:p}),s&&m.push({Condition:"LessThanEqual",Property:"VideoLevel",Value:s}),m.length&&r.CodecProfiles.push({Type:"Video",Codec:d.codec,Conditions:m})}for(var v in a)a.hasOwnProperty(v)&&r.DirectPlayProfiles.push({Container:v,Type:"Video",AudioCodec:u[v].filter((function(e){return-1!==i.indexOf(e)})).join(","),VideoCodec:a[v].filter((function(e){return-1!==t.indexOf(e)})).join(",")});for(var v in u)u.hasOwnProperty(v)&&r.DirectPlayProfiles.push({Container:v,Type:"Audio",VideoCodec:u[v].filter((function(e){return-1!==i.indexOf(e)})).join(",")});r.TranscodingProfiles=[{Container:"ts",Type:"Video",AudioCodec:u.ts.filter((function(e){return-1!==i.indexOf(e)})).join(","),VideoCodec:"h264",Context:"Streaming",Protocol:"hls",MinSegments:1},{Container:"mkv",Type:"Video",AudioCodec:u.mkv.filter((function(e){return-1!==i.indexOf(e)})).join(","),VideoCodec:"h264",Context:"Streaming"},{Container:"mp3",Type:"Audio",AudioCodec:"mp3",Context:"Streaming",Protocol:"http"}],e(r)}))}))}))}}}));