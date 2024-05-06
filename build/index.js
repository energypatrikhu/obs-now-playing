"use strict";var Q=Object.create;var j=Object.defineProperty;var G=Object.getOwnPropertyDescriptor;var z=Object.getOwnPropertyNames;var K=Object.getPrototypeOf,U=Object.prototype.hasOwnProperty;var V=(t,e,n,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of z(e))!U.call(t,i)&&i!==n&&j(t,i,{get:()=>e[i],enumerable:!(o=G(e,i))||o.enumerable});return t};var d=(t,e,n)=>(n=t!=null?Q(K(t)):{},V(e||!t||!t.__esModule?j(n,"default",{value:t,enumerable:!0}):n,t));var f=d(require("express")),x=d(require("moment")),M=require("socket.io"),T=require("http"),P=d(require("cors")),N=require("node:path");var A=require("express"),O=require("node:path"),h=(0,A.Router)();h.get("/",(t,e)=>{e.sendFile("index.min.html",{root:(0,O.join)(__dirname,"../static")})});var w=h;var E=require("express");var D=d(require("user-agents"));function g(){return new D.default().toString()}var B=require("youtube-dl-exec");async function m(t,e,n){return(0,B.create)("./utils/yt-dlp.exe")(t,e,n)}var L=[" - ",": "," \u2013 "],I=[" x "," & ",", "],p={ytm:"https://music.youtube.com/watch?v=",yt:"https://www.youtube.com/watch?v="};function F(t,e){let n=[];for(let o of t)n.push(...o.split(e));return n}function Z(t,e){let n=[t];for(let o of e){let i=[];for(let s of F(n,o))i.push(s);n=i}return n}function q(t,e){let n;for(let o of t)o.height!==void 0&&o.width!==void 0&&o.height===o.width&&(n===void 0||n.height<o.height)&&(n=o);return n?.url??e}async function u(t,e){try{let n=(e??p.ytm)+t,o={dumpSingleJson:!0,callHome:!1,noCheckCertificates:!0,noPlaylist:!0,noWarnings:!0,userAgent:g(),youtubeSkipDashManifest:!0},{title:i,channel:s,artist:a,creator:b,track:l,album:J,thumbnails:S,thumbnail:k}=await m(n,{...o,referer:n}),R=L.find(c=>i.includes(c));if([a,l]=!a&&R?i.split(R):[a||b||s,l||J||i],a){let c=[],X=[...new Set(Z(a,I))].sort();for(let H of X)(l??"").toLowerCase().includes((H??"").toLowerCase())||c.push(H);a=c.join(", ")||s}return{artist:a,track:l,thumbnail:q(S,k)}}catch{return p.yt===e?null:await u(t,p.yt)}}var y=(0,E.Router)();y.post("/nowPlaying",async(t,e)=>{let{videoId:n,time:o}=t.body;if(!n)return e.status(400).json({error:"No videoId provided"});if(!o)return e.status(400).json({error:"No time provided"});let{io:i}=t.app.locals;if(i.engine.clientsCount===0)return e.status(400).json({error:"No clients connected"});let s=await u(n);return s?(t.app.locals.ytPlayingNext={reAlert:o,artist:s.artist,track:s.track,thumbnail:s.thumbnail},JSON.stringify(t.app.locals.ytPlayingCurrent)!==JSON.stringify(t.app.locals.ytPlayingNext)&&(t.app.locals.ytPlayingCurrent=t.app.locals.ytPlayingNext,i.emit("nowPlaying",t.app.locals.ytPlayingCurrent)),e.sendStatus(202)):e.status(400).json({error:"Invalid videoId"})});y.get("/nowPlaying",async(t,e)=>e.status(200).json(t.app.locals.ytPlayingCurrent));var v=y;var Y=process.env.PORT||2442,r=(0,f.default)(),C=(0,T.createServer)(r);r.locals.io=new M.Server(C);r.locals.ytPlayingCurrent={reAlert:(0,x.default)().add(60,"seconds").unix()*1e3,artist:"No Artist",track:"No Track",thumbnail:"data:image/png;base64,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"};var W={origin:"*",methods:["GET","POST"],preflightContinue:!1,optionsSuccessStatus:204};r.use(f.default.static((0,N.join)(__dirname,"../static")));r.use(f.default.json());r.use(f.default.urlencoded({extended:!0}));r.use((0,P.default)(W));r.use("/",w);r.use("/api/",v);r.locals.io.on("connection",t=>{t.emit("nowPlaying",r.locals.ytPlayingCurrent)});C.listen(Y,()=>{let t=`OBS Now Playing App is running @ http://127.0.0.1:${Y}`;t+=`
Press CTRL+C or close this window to stop the App`,t+=`

`,t+=`
> = = = = = = = = = = = < Usage : OBS > = = = = = = = = = = = <`,t+=`
 > You only need to do this once!`,t+=`
 - Open your OBS Studio`,t+=`
 - Add a new Browser Source`,t+=`
 - Set URL to http://127.0.0.1:${Y}/`,t+=`
 - Set Width to your monitor width`,t+=`
 - Set Height to 96 px`,t+=`
 - Click OK`,t+=`
 - Done!`,t+=`
> = = = = = = = = = = = < Usage : OBS > = = = = = = = = = = = <`,t+=`

`,t+=`
> = = = = = = = = = = < Usage : Extension > = = = = = = = = = <`,t+=`
 > You only need to do this once!`,t+=`
 - Open your Browser`,t+=`
 - Go to your Extensions`,t+=`
 - Enable Developer Mode`,t+=`
 - Click 'Load Unpacked Extension'`,t+=`
 - Select the 'extension' folder`,t+=`
 - Done!`,t+=`
> = = = = = = = = = = < Usage : Extension > = = = = = = = = = <`,t+=`

`,t+=`
The extension will detect the now playing video/music from YouTube & YT Music and display it on OBS through the OBS Browser Source.`,t+=`

`,t+=`
> App & Extension by EnergyPatrikHU <`,console.log(t)});
