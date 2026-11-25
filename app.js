"use strict";
/* ===== Cố vấn Chuyên gia VN - lõi ứng dụng ===== */
var AS_OF = "11/2026";
var DOMAINS = {ds:"Luật dân sự",dn:"Luật doanh nghiệp",tm:"Luật thương mại - cạnh tranh - trọng tài",dt:"Luật đầu tư",dd:"Luật đất đai - nhà ở - bất động sản",ld:"Luật lao động - BHXH",hs:"Luật hình sự và tố tụng hình sự",hc:"Luật hành chính - xử phạt - khiếu nại",td:"Tố tụng dân sự - thi hành án",hn:"Hôn nhân gia đình - thừa kế",sh:"Sở hữu trí tuệ",ps:"Phá sản",th:"Luật thuế",hp:"Hiến pháp - ban hành văn bản - nhà nước"};

/* ---------- tiện ích ---------- */
function $(id){return document.getElementById(id);}
function strip(s){return String(s||"").toLowerCase().replace(/đ/g,"d").normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];});}
function money(n){return Math.round(n).toLocaleString("vi-VN");}
function store(k,v){try{if(v===undefined){var x=localStorage.getItem(k);return x?JSON.parse(x):null;}localStorage.setItem(k,JSON.stringify(v));}catch(e){return null;}}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
var STOP={la:1,va:1,cua:1,cho:1,the:1,nao:1,gi:1,co:1,khong:1,bao:1,nhieu:1,duoc:1,khi:1,thi:1,mot:1,cac:1,nhung:1,de:1,trong:1,voi:1,ve:1,hay:1,hoi:1};
function tokens(s){return strip(s).split(/[^a-z0-9]+/).filter(function(w){return w.length>1&&!STOP[w];});}

/* ---------- chuẩn bị kho kiến thức ---------- */
var TOPIC_OF=[[/^ds_/,"ds"],[/^dn_/,"dn"],[/^tm_/,"tm"],[/^dt_/,"dt"],[/^dd_/,"dd"],[/^ld_/,"ld"],[/^hs_/,"hs"],[/^hc_/,"hc"],[/^td_/,"td"],[/^hn_/,"hn"],[/^sh_/,"sh"],[/^ps_/,"ps"],[/^th_/,"th"],[/^hp_/,"hp"]];
KB.forEach(function(c){
  if(c.sec){c.body=[];c.sec.forEach(function(s){s.l.forEach(function(x){c.body.push(x);});});}
  c.topic=null;TOPIC_OF.some(function(r){if(r[0].test(c.id)){c.topic=r[1];return true;}return false;});
  c.hay=strip([c.t,c.law,(c.body||[]).join(" "),c.tip||"",c.ex||"",c.warn||""].join(" "));
  c.title=strip(c.t);
});
function search(q,n){
  var qt=tokens(q),qs=strip(q),N=KB.length;
  var idf={};qt.forEach(function(w){var df=0;KB.forEach(function(c){if(c.hay.indexOf(w)>=0)df++;});idf[w]=Math.log((N+1)/(df+0.5));});
  var bi=[];for(var i=0;i<qt.length-1;i++)bi.push(qt[i]+" "+qt[i+1]);
  var qwords=strip(q).split(/[^a-z0-9]+/).filter(Boolean),bi2=[];
  for(var j=0;j<qwords.length-1;j++)bi2.push(qwords[j]+" "+qwords[j+1]);
  return KB.map(function(c){var sc=0;
    qt.forEach(function(w){if(c.hay.indexOf(w)>=0)sc+=idf[w];if(c.title.indexOf(w)>=0)sc+=2*idf[w];});
    bi2.forEach(function(b){if(c.hay.indexOf(b)>=0)sc+=2.5;if(c.title.indexOf(b)>=0)sc+=4;});
    if(qs.length>3&&c.hay.indexOf(qs)>=0)sc+=6;return {c:c,s:sc};})
   .filter(function(x){return x.s>0.5;}).sort(function(a,b){return b.s-a.s;}).slice(0,n||3).map(function(x){return x.c;});
}
function cardHTML(c){
  var h='<div class="card"><h3>'+esc(c.t)+'</h3><span class="tag">'+esc(DOMAINS[c.d])+'</span>'+
   (c.conf===2?'<span class="tag w">nên đối chiếu văn bản gốc</span>':'<span class="tag g">kiến thức ổn định</span>')+
   (c.v?'<span class="tag">đối chiếu '+esc(c.v)+'</span>':'')+'<div class="law">'+esc(c.law)+'</div>';
  if(c.sec){c.sec.forEach(function(s){h+='<h4>'+esc(s.h)+'</h4><ul>'+s.l.map(function(x){return '<li>'+esc(x)+'</li>';}).join("")+'</ul>';});}
  else h+='<ul>'+c.body.map(function(x){return '<li>'+esc(x)+'</li>';}).join("")+'</ul>';
  if(c.ex)h+='<div class="ex"><b>Ví dụ:</b> '+esc(c.ex)+'</div>';
  if(c.warn)h+='<div class="warn"><b>Lưu ý:</b> '+esc(c.warn)+'</div>';
  if(c.tip)h+='<div class="law"><b>Mẹo thực hành:</b> '+esc(c.tip)+'</div>';
  h+='<details><summary>Tự kiểm tra: '+esc(c.q)+'</summary><div class="law">Các ý chính cần có: '+esc(c.chk.join(" · "))+'</div></details>';
  h+='<button class="b alt sm" onclick="coachCard(\''+c.id+'\')">Thầy hỏi tôi về mục này</button></div>';
  return h;
}

/* ---------- hệ thống chấm năng lực ---------- */
function P(){var p=store("prog2");return p||{t:{},q:{},log:[],ex:[]};}
function record(topic,key,ok,kind){
  var p=P();
  var T=p.t[topic]||(p.t[topic]={n:0,c:0,r:[]});T.n++;if(ok)T.c++;T.r.push(ok?1:0);if(T.r.length>12)T.r.shift();
  var Q=p.q[key]||(p.q[key]={ok:0,bad:0,streak:0,last:0});
  if(ok){Q.ok++;Q.streak++;}else{Q.bad++;Q.streak=0;}Q.last=Date.now();
  p.log.push([Date.now(),topic,ok?1:0,kind||"q"]);if(p.log.length>3000)p.log.splice(0,p.log.length-3000);
  store("prog2",p);
}
function mastery(T){
  if(!T||T.r.length<3)return null;
  var w=0,s=0;T.r.forEach(function(x,i){var wt=1+i*0.35;w+=wt;s+=wt*x;});return s/w;
}
function level(m){if(m==null)return ["Chưa đủ dữ liệu","mid"];if(m<0.5)return ["Cần ôn lại","bad"];if(m<0.7)return ["Đang tiến bộ","mid"];if(m<0.85)return ["Khá","ok"];return ["Thành thạo","ok"];}
function allTopics(){return Object.keys(TOPICS);}
function overall(p){
  var ms=[],cov=0;allTopics().forEach(function(t){var m=mastery(p.t[t]);if(m!=null){ms.push(m);cov++;}});
  return {score:ms.length?Math.round(100*ms.reduce(function(a,b){return a+b;},0)/ms.length):null,cov:cov,total:allTopics().length};
}
function weakTopics(p,n){
  var arr=allTopics().map(function(t){var m=mastery(p.t[t]);return {t:t,m:m,pri:m==null?0.5:m};});
  arr.sort(function(a,b){return a.pri-b.pri;});
  return arr.filter(function(x){return x.m==null||x.m<0.75;}).slice(0,n||3);
}
function streakDays(p){
  var days={};p.log.forEach(function(l){days[new Date(l[0]).toDateString()]=1;});
  var n=0,d=new Date();while(days[d.toDateString()]){n++;d.setDate(d.getDate()-1);}return n;
}
function weeklyTrend(p){
  var now=Date.now(),W=7*86400000,out=[];
  for(var i=5;i>=0;i--){var a=now-(i+1)*W,b=now-i*W,n=0,c=0;p.log.forEach(function(l){if(l[0]>=a&&l[0]<b){n++;c+=l[2];}});out.push({n:n,pct:n?Math.round(100*c/n):0});}
  return out;
}
function topicLabel(t){return TOPICS[t]||t;}

/* ---------- Tab: Hôm nay (bảng năng lực) ---------- */
function updatesRecent(days){
  var lim=Date.now()-days*86400000;return (window.UPDATES&&UPDATES.items||[]).filter(function(i){return new Date(i.d||0).getTime()>=lim;});
}
function viewHome(){
  var p=P(),o=overall(p),weak=weakTopics(p,3),tr=weeklyTrend(p),st=streakDays(p),newU=updatesRecent(3);
  var h='<div class="row"><div class="card"><label>Điểm năng lực (các chủ đề đã luyện ≥ 3 câu)</label><div class="big">'+(o.score==null?'—':o.score+'<small style="font-size:16px">/100</small>')+'</div><div class="law">Độ phủ: '+o.cov+'/'+o.total+' chủ đề · Chuỗi ngày học: '+st+'</div></div>'+
  '<div class="card"><label>Số câu đã làm 6 tuần gần nhất (cột) và % đúng</label><div class="trend" style="margin-top:18px">'+tr.map(function(x,i){var hgt=Math.max(3,x.pct*0.62);return '<div style="height:'+hgt+'px;opacity:'+(x.n?1:.25)+'"><span>'+(x.n?x.pct+'%':'')+'</span></div>';}).join("")+'</div><div class="law" style="display:flex;justify-content:space-between"><span>6 tuần trước</span><span>tuần này</span></div></div></div>';
  h+='<div class="card"><h3>Việc nên làm hôm nay</h3><ul>';
  if(weak.length)h+='<li>Ôn điểm yếu: '+weak.map(function(w){return '<a href="#" onclick="startTopic(\''+w.t+'\');return false">'+esc(topicLabel(w.t))+'</a> ('+(w.m==null?'chưa luyện':Math.round(w.m*100)+'%')+')';}).join(", ")+'</li>';
  h+='<li><button class="b sm" onclick="startPractice(\'weak\')">Luyện thích ứng (ưu tiên phần yếu)</button> <button class="b alt sm" onclick="startPractice(\'exam\')">Kiểm tra năng lực 20 câu</button> <button class="b alt sm" onclick="tab=\'dk\';render()">Luyện định khoản</button></li>';
  h+='<li>Văn bản mới trong 3 ngày: <b>'+newU.length+'</b> <a href="#" onclick="tab=\'upd\';render();return false">xem</a></li></ul></div>';
  h+='<div class="card"><h3>Bảng điểm theo chủ đề</h3><table><tr><th>Chủ đề</th><th>Mức</th><th class="n">Đã làm</th><th></th></tr>';
  allTopics().forEach(function(t){
    var T=p.t[t],m=mastery(T),lv=level(m);
    h+='<tr><td>'+esc(topicLabel(t))+'</td><td><div class="bar '+lv[1]+'"><i style="width:'+(m==null?0:Math.round(m*100))+'%"></i></div><span class="law">'+lv[0]+(m==null?'':' · '+Math.round(m*100)+'%')+'</span></td><td class="n">'+(T?T.n:0)+'</td><td><button class="b alt sm" onclick="startTopic(\''+t+'\')">Luyện</button></td></tr>';
  });
  h+='</table></div>';
  var ex=p.ex.slice(-5).reverse();
  if(ex.length)h+='<div class="card"><h3>Lịch sử bài kiểm tra</h3>'+ex.map(function(e){return '<div>'+new Date(e.ts).toLocaleDateString("vi-VN")+': <b>'+e.score+'%</b> ('+e.c+'/'+e.n+')</div>';}).join("")+'</div>';
  h+='<div class="card"><button class="b alt sm" onclick="if(confirm(\'Xóa toàn bộ lịch sử học tập?\')){store(\'prog2\',null);render();}">Đặt lại lịch sử</button> <button class="b alt sm" onclick="exportProg()">Xuất dữ liệu học (JSON)</button></div>';
  return h;
}
function exportProg(){
  var b=new Blob([JSON.stringify(P(),null,1)],{type:"application/json"}),a=document.createElement("a");
  a.href=URL.createObjectURL(b);a.download="tien_do_hoc_tap.json";a.click();
}

/* ---------- Tab: Chuyên đề ---------- */
var libFilter="all",libQ="";
/* Nhóm chủ đề: thứ tự hiển thị theo mạch học; mỗi thẻ vào nhóm đầu tiên khớp */
var THEMES=[
 {k:"ds",n:"1. Luật dân sự (BLDS 2015)",t:/^ds_/},
 {k:"dn",n:"2. Luật doanh nghiệp",t:/^dn_/},
 {k:"tm",n:"3. Thương mại, cạnh tranh, trọng tài",t:/^tm_/},
 {k:"dt",n:"4. Luật đầu tư",t:/^dt_/},
 {k:"dd",n:"5. Đất đai, nhà ở, bất động sản",t:/^dd_/},
 {k:"ld",n:"6. Lao động, bảo hiểm xã hội",t:/^ld_/},
 {k:"hs",n:"7. Hình sự và tố tụng hình sự",t:/^hs_/},
 {k:"hc",n:"8. Hành chính, xử phạt, khiếu nại, tố cáo",t:/^hc_/},
 {k:"td",n:"9. Tố tụng dân sự, thi hành án",t:/^td_/},
 {k:"hn",n:"10. Hôn nhân gia đình, thừa kế",t:/^hn_/},
 {k:"sh",n:"11. Sở hữu trí tuệ",t:/^sh_/},
 {k:"ps",n:"12. Phá sản",t:/^ps_/},
 {k:"th",n:"13. Luật thuế",t:/^th_/},
 {k:"hp",n:"14. Hiến pháp, ban hành văn bản, bản đồ luật mới",t:/^hp_/}
];
function themeOf(c){for(var i=0;i<THEMES.length;i++)if(THEMES[i].t.test(c.id))return i;return THEMES.length;}
function miniCard(c,open){
  return '<details class="lib-item"'+(open?' open':'')+'><summary>'+esc(c.t)+(c.conf===2?' <span class="tag w">đối chiếu</span>':'')+'</summary>'+cardHTML(c)+'</details>';
}
function viewLib(){
  return '<div class="row"><select onchange="libFilter=this.value;renderLib()"><option value="all">Tất cả chủ đề</option>'+THEMES.map(function(t){return '<option value="'+t.k+'"'+(libFilter===t.k?" selected":"")+'>'+esc(t.n)+'</option>';}).join("")+'</select><input placeholder="Tìm: ví dụ TNCN, thử việc, hóa đơn..." oninput="libQ=this.value;renderLib()" value="'+esc(libQ)+'"></div><div id="liblist" style="margin-top:12px"></div>';
}
function renderLib(){
  var el=$("liblist"),ti=-1;
  THEMES.forEach(function(t,i){if(t.k===libFilter)ti=i;});
  if(libQ){
    var ranked=search(libQ,60).filter(function(c){return ti<0||themeOf(c)===ti;});
    el.innerHTML=ranked.length?ranked.map(cardHTML).join(""):'<div class="card">Không có mục phù hợp.</div>';return;
  }
  var h='<div class="law" style="margin-bottom:8px">Bấm tên chủ đề để mở nhóm, bấm tên bài để đọc. Nhãn «đối chiếu» = nên so với văn bản gốc.</div>';
  THEMES.forEach(function(t,i){
    if(ti>=0&&ti!==i)return;
    var items=KB.filter(function(c){return themeOf(c)===i;}).sort(function(a,b){return a.id.localeCompare(b.id,undefined,{numeric:true});});
    if(!items.length)return;
    h+='<details class="lib-group"'+(ti>=0?' open':'')+'><summary>'+esc(t.n)+' <span class="tag">'+items.length+' bài</span></summary>'+items.map(function(c){return miniCard(c,false);}).join("")+'</details>';
  });
  el.innerHTML=h;
}

/* ---------- Tab: Hỏi đáp ---------- */
var chatHist=[],pending=null;
function addMsg(who,html,ai){chatHist.push({who:who,html:html,ai:ai});var b=$("chatbox");if(b){b.insertAdjacentHTML("beforeend",'<div class="msg '+who+'">'+html+'</div>');b.scrollTop=b.scrollHeight;}}
function gradeAnswer(c,ans){
  var a=strip(ans),hit=[],miss=[];c.chk.forEach(function(k){(a.indexOf(strip(k))>=0?hit:miss).push(k);});
  var pct=Math.round(100*hit.length/c.chk.length);
  if(c.topic)record(c.topic,"kb:"+c.id,pct>=60,"chat");
  var m=(pct===100?"Rất tốt! ":"")+"Mức bao phủ ý chính: "+pct+"% ("+hit.length+"/"+c.chk.length+").\n";
  if(miss.length)m+="Chưa thấy bạn đề cập: "+miss.join("; ")+".\n";
  m+="\nTóm tắt đáp án:\n• "+c.body.slice(0,5).join("\n• ")+(c.tip?"\n\nMẹo: "+c.tip:"");
  m+="\n\n(Kết quả đã được ghi vào điểm năng lực chủ đề «"+topicLabel(c.topic)+"».)";
  return esc(m);
}
function ask(){
  var inp=$("chatin"),q=inp.value.trim();if(!q)return;inp.value="";addMsg("u",esc(q),null);
  if(pending){var c=pending;pending=null;addMsg("a",gradeAnswer(c,q));return;}
  if(aiOn()){askAI(q);return;}
  var r=search(q,3);
  if(!r.length){addMsg("a","Chưa tìm thấy mục phù hợp. Dùng từ khóa cụ thể (hợp đồng, thừa kế, góp vốn, thử việc, thu hồi đất, khiếu nại...). Hoặc nhập khóa API ở Cài đặt AI để hỏi tự do.");return;}
  var t=r[0],h="<b>"+esc(t.t)+"</b>\n"+esc(t.law)+"\n";
  (t.sec||[{h:"",l:t.body}]).slice(0,2).forEach(function(s){h+="\n"+(s.h?"▸ "+esc(s.h)+"\n":"")+"• "+esc(s.l.slice(0,4).join("\n• "))+"\n";});
  if(t.ex)h+="\nVí dụ: "+esc(t.ex);if(t.warn)h+="\n\n⚠ "+esc(t.warn);
  if(r.length>1)h+="\n\nXem thêm: "+r.slice(1).map(function(c){return esc(c.t);}).join(" | ");
  h+="\n\n<b>Thầy hỏi lại:</b> "+esc(t.q)+"\n<i>(trả lời ở ô bên dưới, mình sẽ chấm theo ý chính và ghi điểm)</i>";
  pending=t;addMsg("a",h);
}
function coachCard(id){
  var c=KB.filter(function(x){return x.id===id;})[0];if(!c)return;pending=c;tab="chat";render();
  addMsg("a","<b>Thầy hỏi ("+esc(DOMAINS[c.d])+"):</b> "+esc(c.q)+"\n<i>Căn cứ: "+esc(c.law)+"</i>");
}
function coachWeak(){
  var w=weakTopics(P(),3),pool=KB.filter(function(c){return c.topic&&w.some(function(x){return x.t===c.topic;});});
  if(!pool.length)pool=KB;var c=pool[Math.floor(Math.random()*pool.length)];coachCard(c.id);
}
function aiOn(){var k=store("ai_key");return !!(k&&k.length>10&&store("ai_on"));}
function askAI(q){
  var weak=weakTopics(P(),3).map(function(w){return topicLabel(w.t);}).join(", ");
  var ctx=search(q,3).map(function(c){return c.t+" ("+c.law+"): "+c.body.join(" ");}).join("\n");
  var sys="Bạn là luật sư và chuyên gia pháp luật Việt Nam cao cấp, am hiểu luật dân sự, doanh nghiệp, thương mại, đầu tư, đất đai, lao động, hình sự, hành chính, tố tụng, hôn nhân gia đình, sở hữu trí tuệ, phá sản và thuế. Trả lời bằng tiếng Việt, nêu căn cứ pháp lý (tên văn bản, số hiệu, điều khoản) và ghi rõ khi cần đối chiếu văn bản hiện hành. Không thay thế tư vấn pháp lý chính thức.";
  var msgs=[];chatHist.forEach(function(m){if(m.who==="u")msgs.push({role:"user",content:m.html.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">")});else if(m.ai)msgs.push({role:"assistant",content:m.ai});});
  msgs=msgs.slice(-12);var merged=[];msgs.forEach(function(m){if(merged.length&&merged[merged.length-1].role===m.role)merged[merged.length-1].content+="\n"+m.content;else merged.push(m);});
  while(merged.length&&merged[0].role!=="user")merged.shift();
  addMsg("a","Đang suy nghĩ...");
  fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":store("ai_key"),"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:store("ai_model")||"claude-sonnet-5-5",max_tokens:1500,system:sys,messages:merged})})
  .then(function(r){return r.json();}).then(function(j){
    var t=(j.content&&j.content[0]&&j.content[0].text)||(j.error&&j.error.message)||"Không nhận được trả lời.";
    var box=$("chatbox");if(box&&box.lastChild)box.lastChild.remove();chatHist.pop();addMsg("a",esc(t),t);
  }).catch(function(e){var box=$("chatbox");if(box&&box.lastChild)box.lastChild.remove();chatHist.pop();addMsg("a","Lỗi kết nối AI: "+esc(e.message));});
}
function viewChat(){
  var h='<div class="warn">Nội dung học tập tổng hợp đến '+AS_OF+'. Mục gắn «nên đối chiếu» cần kiểm tra văn bản gốc trước khi áp dụng thực tế. Không thay thế tư vấn pháp lý/thuế chính thức.</div><div class="chat" id="chatbox"></div>';
  h+='<div class="row" style="margin-top:8px"><input id="chatin" placeholder="Hỏi một vấn đề, hoặc trả lời câu thầy hỏi..."><button class="b" style="flex:0 0 90px" onclick="ask()">Gửi</button></div>';
  h+='<div style="margin-top:6px"><button class="b alt sm" onclick="coachWeak()">Thầy ra đề về phần tôi yếu</button><button class="b alt sm" onclick="chatHist=[];pending=null;render()">Xóa hội thoại</button></div>';
  h+='<details style="margin-top:10px"><summary>Cài đặt AI (tùy chọn): hỏi tự do bằng Claude</summary><div class="card"><div class="law">Khóa API chỉ lưu trong trình duyệt này và chỉ gửi đến api.anthropic.com. Không nhập khóa trên máy dùng chung.</div><label>API key</label><input id="aikey" type="password" value="'+esc(store("ai_key")||"")+'"><label>Model</label><input id="aimodel" value="'+esc(store("ai_model")||"claude-sonnet-5-5")+'"><label><input type="checkbox" id="aion" style="width:auto" '+(store("ai_on")?"checked":"")+'> Bật chế độ AI</label><button class="b" onclick="store(\'ai_key\',$(\'aikey\').value.trim());store(\'ai_model\',$(\'aimodel\').value.trim());store(\'ai_on\',$(\'aion\').checked);alert(\'Đã lưu.\')">Lưu</button></div></details>';
  return h;
}

/* ---------- Tab: Luyện tập (thích ứng) ---------- */
var S={mode:"weak",topic:null,idx:null,answered:false,retry:[],asked:0,exam:null};
function qWeight(i){var Q=P().q["q"+i];if(!Q)return 1.6;return 0.3+Q.bad*1.2+(Q.streak<2?0.8:0)-Math.min(Q.streak,4)*0.12;}
function pickTopic(pool){
  var p=P(),ws=pool.map(function(t){var m=mastery(p.t[t]);return Math.max(0.08,(m==null?0.55:1-m));});
  var tot=ws.reduce(function(a,b){return a+b;},0),r=Math.random()*tot;
  for(var i=0;i<pool.length;i++){r-=ws[i];if(r<=0)return pool[i];}return pool[0];
}
function qHidden(){return store("qhide")||{};}
function qRestore(){store("qhide",{});render();}
function qHide(i){var h=qHidden();h[i]=1;store("qhide",h);}
function pickIdx(topic){
  var hid=qHidden(),cand=[],all=[];QUIZ.forEach(function(q,i){if(!topic||q.t===topic){all.push(i);if(!hid[i])cand.push(i);}});
  if(!cand.length)cand=all;
  if(!cand.length)return null;
  var ws=cand.map(function(i){return Math.max(0.05,qWeight(i));}),tot=ws.reduce(function(a,b){return a+b;},0),r=Math.random()*tot;
  for(var k=0;k<cand.length;k++){r-=ws[k];if(r<=0)return cand[k];}return cand[0];
}
function startPractice(mode){S.mode=mode;S.topic=null;S.retry=[];S.asked=0;S.exam=null;tab="quiz";if(mode==="exam")buildExam();render();}
function startTopic(t){
  if(/^dk_/.test(t)){dkTopic=t;tab="dk";render();return;}
  S.mode="topic";S.topic=t;S.retry=[];S.asked=0;S.exam=null;tab="quiz";render();
}
function buildExam(){
  var hid=qHidden(),by={};QUIZ.forEach(function(q,i){if(!hid[i])(by[q.t]=by[q.t]||[]).push(i);});
  var ids=[];Object.keys(by).forEach(function(t){ids.push(shuffle(by[t])[0]);});
  var rest=shuffle(QUIZ.map(function(_,i){return i;}).filter(function(i){return ids.indexOf(i)<0&&!hid[i];}));
  while(ids.length<20&&rest.length)ids.push(rest.shift());
  S.exam={ids:shuffle(ids).slice(0,20),pos:0,res:[]};
}
function viewQuiz(){
  var h='<div class="card"><button class="b sm'+(S.mode==="weak"?'':' alt')+'" onclick="startPractice(\'weak\')">Luyện thích ứng</button><button class="b sm'+(S.mode==="exam"?'':' alt')+'" onclick="startPractice(\'exam\')">Kiểm tra 20 câu</button>';
  h+='<select style="margin-top:6px" onchange="if(this.value)startTopic(this.value)"><option value="">Chọn chủ đề để luyện...</option>'+Object.keys(TOPICS).filter(function(t){return !/^dk_/.test(t);}).map(function(t){return '<option value="'+t+'"'+(S.topic===t?" selected":"")+'>'+esc(TOPICS[t])+'</option>';}).join("")+'</select></div><div id="qbox"></div>';
  var hc=Object.keys(qHidden()).length;if(hc)h+='<div class="law" style="margin-top:8px">Đã ẩn '+hc+' câu dễ. <button class="b alt sm" onclick="qRestore()">Khôi phục tất cả</button></div>';
  setTimeout(nextQ,0);return h;
}
function nextQ(){
  var box=$("qbox");if(!box)return;
  if(S.mode==="exam"){
    if(!S.exam)buildExam();
    if(S.exam.pos>=S.exam.ids.length){examReport(box);return;}
    S.idx=S.exam.ids[S.exam.pos];
  }else{
    var ret=null;S.retry.forEach(function(r){r.wait--;});
    S.retry=S.retry.filter(function(r){if(!ret&&r.wait<=0){ret=r.i;return false;}return true;});
    if(ret!=null)S.idx=ret;
    else{var pool=S.topic?[S.topic]:Object.keys(TOPICS).filter(function(t){return !/^dk_/.test(t)&&QUIZ.some(function(q){return q.t===t;});});
      var t=S.topic||pickTopic(pool);S.idx=pickIdx(t);}
  }
  S.answered=false;S.asked++;
  var q=QUIZ[S.idx];
  box.innerHTML='<div class="card"><span class="tag">'+esc(topicLabel(q.t))+'</span>'+(S.mode==="exam"?'<span class="tag">Câu '+(S.exam.pos+1)+'/'+S.exam.ids.length+'</span>':'')+'<h3>'+esc(q.q)+'</h3>'+q.o.map(function(o,k){return '<button class="opt" id="o'+k+'" onclick="pickAns('+k+')">'+String.fromCharCode(65+k)+'. '+esc(o)+'</button>';}).join("")+'<div id="qtools" style="margin-top:8px"><button class="b alt sm" onclick="skipQ()">Bỏ qua</button> <button class="b alt sm" onclick="hideQ()">Câu dễ, đừng hỏi lại</button></div><div id="qfb"></div></div>';
}
function skipQ(){
  if(S.mode==="exam"&&!S.answered){var q=QUIZ[S.idx];S.exam.res.push({i:S.idx,t:q.t,ok:false,skip:true});S.exam.pos++;}
  nextQ();
}
function hideQ(){
  qHide(S.idx);S.retry=S.retry.filter(function(r){return r.i!==S.idx;});
  skipQ();
}
function pickAns(k){
  if(S.answered)return;S.answered=true;var q=QUIZ[S.idx],ok=(k===q.a);
  $("o"+k).classList.add(ok?"ok":"no");$("o"+q.a).classList.add("ok");
  record(q.t,"q"+S.idx,ok,S.mode==="exam"?"exam":"q");
  if(S.mode==="exam"){S.exam.res.push({i:S.idx,t:q.t,ok:ok});S.exam.pos++;
    $("qfb").innerHTML='<p><b>'+(ok?"Đúng":"Sai")+'</b> - đáp án sẽ có ở cuối bài.</p><button class="b" onclick="nextQ()">'+(S.exam.pos>=S.exam.ids.length?"Xem kết quả":"Câu tiếp")+'</button>';return;}
  if(!ok)S.retry.push({i:S.idx,wait:3});
  $("qfb").innerHTML='<p><b>'+(ok?"Đúng!":"Chưa đúng - câu này sẽ quay lại sau vài câu.")+'</b> '+esc(q.e)+'</p><button class="b" onclick="nextQ()">Câu tiếp</button>';
}
function examReport(box){
  var by={},c=0,sk=S.exam.res.filter(function(r){return r.skip;}).length;S.exam.res.forEach(function(r){if(r.skip)return;var b=by[r.t]||(by[r.t]=[0,0]);b[1]++;if(r.ok){b[0]++;c++;}});
  var n=S.exam.res.length-sk,score=n?Math.round(100*c/n):0,p=P(),prev=p.ex.length?p.ex[p.ex.length-1].score:null;
  if(n>0){p.ex.push({ts:Date.now(),score:score,c:c,n:n});store("prog2",p);}
  var h='<div class="card"><h3>Kết quả: '+score+'% ('+c+'/'+n+')</h3>'+(sk?'<div class="law">Bạn đã bỏ qua '+sk+' câu (không tính vào điểm).</div>':'')+(prev!=null?'<div class="law">Lần trước: '+prev+'% → '+(score>prev?'tiến bộ +'+(score-prev):score<prev?'giảm '+(prev-score):'giữ nguyên')+' điểm %</div>':'')+'<table><tr><th>Chủ đề</th><th class="n">Đúng</th></tr>';
  Object.keys(by).forEach(function(t){h+='<tr><td>'+esc(topicLabel(t))+'</td><td class="n">'+by[t][0]+'/'+by[t][1]+'</td></tr>';});
  h+='</table><h4>Các câu sai - xem đáp án</h4>';
  S.exam.res.filter(function(r){return !r.ok&&!r.skip;}).forEach(function(r){var q=QUIZ[r.i];h+='<div class="card"><b>'+esc(q.q)+'</b><div class="ex">Đáp án: '+esc(q.o[q.a])+' - '+esc(q.e)+'</div></div>';});
  h+='<button class="b" onclick="startPractice(\'weak\')">Luyện lại phần yếu</button><button class="b alt" onclick="startPractice(\'exam\')">Làm đề mới</button></div>';
  box.innerHTML=h;S.exam=null;
}

/* ---------- Tab: Định khoản ---------- */
var dkTopic=null,dkCur=null,dkRows=5;
function dkWeight(d){var Q=P().q["dk:"+d.id];if(!Q)return 1.6;return 0.3+Q.bad*1.4+(Q.streak<2?0.8:0)-Math.min(Q.streak,4)*0.12;}
function pickDK(){
  var pool=DK.filter(function(d){return !dkTopic||d.t===dkTopic;});if(!pool.length)pool=DK;
  var ws=pool.map(function(d){return Math.max(0.05,dkWeight(d)*(1.2-(mastery(P().t[d.t])||0.5)));}),tot=ws.reduce(function(a,b){return a+b;},0),r=Math.random()*tot;
  for(var i=0;i<pool.length;i++){r-=ws[i];if(r<=0)return pool[i];}return pool[0];
}
function viewDK(){
  var h='<div class="card"><label>Phạm vi luyện</label><select onchange="dkTopic=this.value||null;dkCur=null;render()"><option value="">Tất cả (ưu tiên phần yếu)</option>'+Object.keys(TOPICS).filter(function(t){return /^dk_/.test(t);}).map(function(t){return '<option value="'+t+'"'+(dkTopic===t?" selected":"")+'>'+esc(TOPICS[t])+'</option>';}).join("")+'</select><div class="law" style="margin-top:6px">Nhập số hiệu tài khoản (ví dụ 156, 133, 331), chọn Nợ/Có và số tiền. Quy ước tài khoản theo hệ thống phổ biến (TT 200/TT 99, TT 133); các tài khoản chính dùng ở đây giống nhau.</div></div>';
  if(!dkCur)dkCur=pickDK();
  h+='<div class="card"><span class="tag">'+esc(topicLabel(dkCur.t))+'</span><h3>'+esc(dkCur.s)+'</h3><table class="dk"><tr><th>Tài khoản</th><th>Nợ/Có</th><th>Số tiền (đồng)</th></tr>';
  for(var i=0;i<dkRows;i++)h+='<tr><td><input id="dkt'+i+'" inputmode="numeric" placeholder="vd 156"></td><td><select id="dkn'+i+'"><option value="N">Nợ</option><option value="C">Có</option></select></td><td><input id="dka'+i+'" inputmode="numeric" placeholder="số tiền"></td></tr>';
  h+='</table><div style="margin-top:8px"><button class="b" onclick="checkDK()">Chấm bài</button><button class="b alt" onclick="dkRows=dkRows<8?dkRows+1:dkRows;render()">+ dòng</button><button class="b alt" onclick="dkCur=null;render()">Bỏ qua / câu khác</button></div><div id="dkfb"></div></div>';
  return h;
}
function num(s){return parseInt(String(s).replace(/[^\d]/g,""),10)||0;}
function checkDK(){
  var got=[];for(var i=0;i<dkRows;i++){var t=$("dkt"+i).value.trim(),a=num($("dka"+i).value);if(t&&a)got.push([t,$("dkn"+i).value,a]);}
  var want=dkCur.ans.map(function(x){return x.join("|");}),have=got.map(function(x){return x.join("|");});
  var missing=want.filter(function(w){return have.indexOf(w)<0;}),extra=have.filter(function(h){return want.indexOf(h)<0;});
  var ok=!missing.length&&!extra.length&&got.length===want.length;
  record(dkCur.t,"dk:"+dkCur.id,ok,"dk");
  function fmt(r){var p=r.split("|");return (p[1]==="N"?"Nợ ":"Có ")+p[0]+" "+money(+p[2]);}
  var h=ok?'<div class="ex"><b>Chính xác!</b> Bút toán đúng, đã ghi vào điểm năng lực.</div>':'<div class="warn"><b>Chưa đúng.</b>'+(missing.length?'<br>Còn thiếu/ sai: '+missing.map(fmt).map(esc).join("; "):"")+(extra.length?'<br>Dòng thừa/ sai: '+extra.map(fmt).map(esc).join("; "):"")+'<br>Gợi ý: '+esc(dkCur.h)+'<br><b>Đáp án:</b> '+dkCur.ans.map(function(x){return esc(fmt(x.join("|")));}).join("; ")+'<br>Bài này sẽ được ưu tiên xuất hiện lại.</div>';
  h+='<button class="b" onclick="dkCur=null;render()">Bài tiếp</button>';
  $("dkfb").innerHTML=h;
}

/* ===================== TAB: MÁY TÍNH ===================== */
var TAX_OLD=[[5e6,.05],[10e6,.10],[18e6,.15],[32e6,.20],[52e6,.25],[80e6,.30],[Infinity,.35]];
var TAX_NEW=[[10e6,.05],[30e6,.10],[60e6,.20],[100e6,.30],[Infinity,.35]];
function pit(ti,table){var t=0,prev=0;for(var i=0;i<table.length;i++){var lim=table[i][0];if(ti>prev){t+=(Math.min(ti,lim)-prev)*table[i][1];}prev=lim;if(ti<=lim)break;}return t;}
function g2n(g,p){
  var capBH=20*p.luongCS,capTN=20*p.ltv;
  var bhx=Math.min(g,capBH),tn=Math.min(g,capTN);
  var ins=bhx*0.08+bhx*0.015+tn*0.01;
  var ti=Math.max(0,g-ins-p.gt-p.pt*p.nd);
  var tax=pit(ti,p.newT?TAX_NEW:TAX_OLD);
  var empIns=bhx*0.175+bhx*0.03+tn*0.01+(p.kpcd?g*0.02:0);
  return {g:g,ins:ins,ti:ti,tax:tax,net:g-ins-tax,emp:empIns,total:g+empIns,bhx:bhx,tn:tn};
}
function n2g(net,p){var lo=net,hi=net*3+1e8;for(var i=0;i<80;i++){var m=(lo+hi)/2;if(g2n(m,p).net<net)lo=m;else hi=m;}return hi;}
function viewCalc(){
  var h='<div class="warn">Các tham số (giảm trừ, lương cơ sở, vùng) có thể thay đổi — chỉnh theo văn bản hiện hành trước khi dùng cho thực tế.</div>';
  h+='<div class="card"><h3>1. Lương Gross ⇄ Net, TNCN, chi phí doanh nghiệp</h3><div class="row">'+
  '<div><label>Số tiền (đồng)</label><input id="c_amt" type="number" value="30000000"></div>'+
  '<div><label>Chiều tính</label><select id="c_dir"><option value="g2n">Gross → Net</option><option value="n2g">Net → Gross</option></select></div>'+
  '<div><label>Biểu thuế</label><select id="c_tab"><option value="1">Mới 5 bậc (từ 01/07/2026)</option><option value="0">Cũ 7 bậc (đến 30/06/2026)</option></select></div>'+
  '<div><label>Số người phụ thuộc</label><input id="c_nd" type="number" value="0" min="0"></div></div>'+
  '<div class="row"><div><label>Giảm trừ bản thân (đ/tháng)</label><input id="c_gt" type="number" value="15500000"></div>'+
  '<div><label>Giảm trừ mỗi người PT</label><input id="c_pt" type="number" value="6200000"></div>'+
  '<div><label>Lương cơ sở/mức tham chiếu (đ)</label><input id="c_cs" type="number" value="2530000"></div>'+
  '<div><label>Lương tối thiểu vùng (đ)</label><input id="c_ltv" type="number" value="5310000"></div></div>'+
  '<label style="margin-top:6px"><input type="checkbox" id="c_kp" style="width:auto"> Tính thêm KPCĐ 2% của doanh nghiệp</label>'+
  '<button class="b" style="margin-top:8px" onclick="calc1()">Tính</button><div id="r1" style="margin-top:10px"></div></div>';

  h+='<div class="card"><h3>2. Trợ cấp thôi việc / mất việc</h3><div class="row">'+
  '<div><label>Tổng số năm làm việc</label><input id="t_y" type="number" value="5" step="0.5"></div>'+
  '<div><label>Số năm đã tham gia BHTN</label><input id="t_u" type="number" value="3" step="0.5"></div>'+
  '<div><label>Lương bình quân 6 tháng cuối (đ)</label><input id="t_l" type="number" value="12000000"></div>'+
  '<div><label>Loại trợ cấp</label><select id="t_t"><option value="46">Thôi việc (Đ.46: 1/2 tháng/năm)</option><option value="47">Mất việc (Đ.47: 1 tháng/năm, tối thiểu 2 tháng)</option></select></div></div>'+
  '<button class="b" style="margin-top:8px" onclick="calc2()">Tính</button><div id="r2" style="margin-top:10px"></div></div>';

  h+='<div class="card"><h3>3. TNDN (theo bậc doanh thu) &amp; tiền chậm nộp</h3><div class="row">'+
  '<div><label>Doanh thu năm (đ)</label><input id="d_r" type="number" value="40000000000"></div>'+
  '<div><label>Thu nhập tính thuế (đ)</label><input id="d_p" type="number" value="2000000000"></div>'+
  '<div><label>Số thuế nộp chậm (đ)</label><input id="d_d" type="number" value="200000000"></div>'+
  '<div><label>Số ngày chậm</label><input id="d_n" type="number" value="15"></div></div>'+
  '<button class="b" style="margin-top:8px" onclick="calc3()">Tính</button><div id="r3" style="margin-top:10px"></div></div>';

  h+='<div class="card"><h3>4. NPV / IRR dự án</h3><div class="row">'+
  '<div><label>Vốn đầu tư ban đầu (đ)</label><input id="n_i" type="number" value="1000000000"></div>'+
  '<div><label>Dòng tiền mỗi năm, cách nhau dấu phẩy</label><input id="n_c" value="400000000,400000000,400000000"></div>'+
  '<div><label>Chi phí vốn %/năm</label><input id="n_r" type="number" value="10"></div></div>'+
  '<button class="b" style="margin-top:8px" onclick="calc4()">Tính</button><div id="r4" style="margin-top:10px"></div></div>';

  h+='<div class="card"><h3>5. DuPont &amp; tỷ số nhanh</h3><div class="row">'+
  '<div><label>Doanh thu</label><input id="f_rev" type="number" value="12000000000"></div>'+
  '<div><label>Lợi nhuận sau thuế</label><input id="f_ni" type="number" value="600000000"></div>'+
  '<div><label>Tổng tài sản BQ</label><input id="f_a" type="number" value="8000000000"></div>'+
  '<div><label>Vốn chủ sở hữu BQ</label><input id="f_e" type="number" value="3000000000"></div>'+
  '<div><label>Phải thu BQ</label><input id="f_ar" type="number" value="1500000000"></div>'+
  '<div><label>Tồn kho BQ</label><input id="f_inv" type="number" value="1000000000"></div>'+
  '<div><label>Giá vốn</label><input id="f_cogs" type="number" value="9600000000"></div>'+
  '<div><label>Phải trả NCC BQ</label><input id="f_ap" type="number" value="900000000"></div></div>'+
  '<button class="b" style="margin-top:8px" onclick="calc5()">Tính</button><div id="r5" style="margin-top:10px"></div></div>';
  return h;
}
function V(id){return parseFloat($(id).value)||0;}
function calc1(){
  var p={newT:$("c_tab").value==="1",nd:V("c_nd"),gt:V("c_gt"),pt:V("c_pt"),luongCS:V("c_cs"),ltv:V("c_ltv"),kpcd:$("c_kp").checked};
  var amt=V("c_amt"),g=$("c_dir").value==="g2n"?amt:n2g(amt,p),r=g2n(g,p);
  $("r1").innerHTML='<table><tr><td>Lương Gross</td><td class="n">'+money(r.g)+'</td></tr>'+
  '<tr><td>Bảo hiểm NLĐ (10,5%, có áp trần)</td><td class="n">'+money(r.ins)+'</td></tr>'+
  '<tr><td>Thu nhập tính thuế</td><td class="n">'+money(r.ti)+'</td></tr>'+
  '<tr><td>Thuế TNCN</td><td class="n">'+money(r.tax)+'</td></tr>'+
  '<tr><td><b>Lương Net</b></td><td class="n res">'+money(r.net)+'</td></tr>'+
  '<tr><td>Bảo hiểm doanh nghiệp đóng (21,5%'+(p.kpcd?' + KPCĐ 2%':'')+')</td><td class="n">'+money(r.emp)+'</td></tr>'+
  '<tr><td><b>Tổng chi phí DN</b></td><td class="n">'+money(r.total)+'</td></tr></table>'+
  '<div class="law">Trần đóng BHXH/BHYT = 20 × lương cơ sở = '+money(20*p.luongCS)+'; trần BHTN = 20 × lương tối thiểu vùng = '+money(20*p.ltv)+'. Giả định lương đóng BH = lương gross.</div>';
}
function calc2(){
  var y=V("t_y"),u=V("t_u"),l=V("t_l"),t=$("t_t").value,eff=Math.max(0,y-u),res;
  if(t==="46"){res=eff*0.5*l;$("r2").innerHTML='<div>Số năm tính trợ cấp = '+y+' − '+u+' = '+eff+' năm</div><div class="res">Trợ cấp thôi việc: '+money(res)+' đ</div><div class="law">Công thức: năm tính × 1/2 × lương bình quân 6 tháng cuối (Điều 46 BLLĐ). Thời gian dưới 1 tháng... làm tròn theo hướng dẫn (6 tháng trở lên làm tròn thành 1 năm...). Kiểm tra NĐ 145/2020 Điều 8.</div>';}
  else{res=Math.max(eff*l,2*l);$("r2").innerHTML='<div>Số năm tính trợ cấp = '+eff+' năm</div><div class="res">Trợ cấp mất việc: '+money(res)+' đ</div><div class="law">Mỗi năm 1 tháng lương, tối thiểu 2 tháng (Điều 47 BLLĐ). Điều kiện: từ đủ 12 tháng làm việc thường xuyên.</div>';}
}
function calc3(){
  var r=V("d_r"),p=V("d_p"),rate=r<=3e9?0.15:(r<=50e9?0.17:0.20),tax=p*rate,late=V("d_d")*0.0003*V("d_n");
  $("r3").innerHTML='<table><tr><td>Thuế suất TNDN (theo bậc doanh thu)</td><td class="n">'+(rate*100)+'%</td></tr><tr><td><b>Thuế TNDN</b></td><td class="n res">'+money(tax)+'</td></tr><tr><td>Tiền chậm nộp (0,03%/ngày)</td><td class="n">'+money(late)+'</td></tr></table><div class="law">Bậc 15%/17%/20% theo Luật TNDN 67/2025 và NĐ 320/2025 — đối chiếu điều kiện áp dụng (loại trừ lĩnh vực, DN thuộc nhóm đặc thù). Mức chậm nộp: kiểm tra theo Luật QLT 108/2025.</div>';
}
function calc4(){
  var i=V("n_i"),r=V("n_r")/100,cf=$("n_c").value.split(",").map(function(x){return parseFloat(x)||0;});
  var npv=-i;cf.forEach(function(c,k){npv+=c/Math.pow(1+r,k+1);});
  var lo=-0.99,hi=10,irr=null,f=function(rr){var s=-i;cf.forEach(function(c,k){s+=c/Math.pow(1+rr,k+1);});return s;};
  if(f(lo)*f(hi)<0){for(var k=0;k<200;k++){var m=(lo+hi)/2;if(f(lo)*f(m)<=0)hi=m;else lo=m;}irr=(lo+hi)/2;}
  var cum=-i,pb=null;cf.forEach(function(c,k){var before=cum;cum+=c;if(pb===null&&cum>=0)pb=k+(-before/c);});
  $("r4").innerHTML='<table><tr><td>NPV</td><td class="n res">'+money(npv)+'</td></tr><tr><td>IRR</td><td class="n">'+(irr==null?"không xác định":(irr*100).toFixed(2)+"%")+'</td></tr><tr><td>Thời gian hoàn vốn (năm, chưa chiết khấu)</td><td class="n">'+(pb==null?"chưa hoàn vốn":pb.toFixed(2))+'</td></tr></table><div class="law">'+(npv>0?"NPV > 0: dự án tạo giá trị ở mức chi phí vốn này.":"NPV ≤ 0: không nên chấp nhận nếu chỉ xét tiêu chí tài chính.")+'</div>';
}
function calc5(){
  var rev=V("f_rev"),ni=V("f_ni"),a=V("f_a"),e=V("f_e"),ar=V("f_ar"),inv=V("f_inv"),cogs=V("f_cogs"),ap=V("f_ap");
  var ros=ni/rev,at=rev/a,lev=a/e,roe=ros*at*lev,dso=ar/rev*365,dio=inv/cogs*365,dpo=ap/cogs*365;
  $("r5").innerHTML='<table><tr><td>ROS (LNST/Doanh thu)</td><td class="n">'+(ros*100).toFixed(2)+'%</td></tr><tr><td>Vòng quay tài sản</td><td class="n">'+at.toFixed(2)+'</td></tr><tr><td>Đòn bẩy (TS/VCSH)</td><td class="n">'+lev.toFixed(2)+'</td></tr><tr><td><b>ROE = ROS × VQ × Đòn bẩy</b></td><td class="n res">'+(roe*100).toFixed(2)+'%</td></tr><tr><td>DSO / DIO / DPO (ngày)</td><td class="n">'+dso.toFixed(0)+' / '+dio.toFixed(0)+' / '+dpo.toFixed(0)+'</td></tr><tr><td><b>Chu kỳ chuyển đổi tiền</b></td><td class="n">'+(dso+dio-dpo).toFixed(0)+' ngày</td></tr></table>';
}




/* ---------- Tab: Soát BCTC ---------- */
var BF=[
 ["B01 - Báo cáo tình hình tài chính (cuối kỳ)",[["tien","Tiền và tương đương tiền"],["phaithu","Các khoản phải thu"],["tonkho","Hàng tồn kho"],["tscd","Tài sản cố định (giá trị còn lại)"],["tskhac","Tài sản khác"],["tongts","Tổng tài sản (đã ghi trên báo cáo)"],["nophaitra","Nợ phải trả"],["vcsh","Vốn chủ sở hữu"],["tongnv","Tổng nguồn vốn (đã ghi)"],["l421dk","TK 421 đầu kỳ"],["l421ck","TK 421 cuối kỳ"],["codtuc","Cổ tức/ trích quỹ trong kỳ"]]],
 ["B02 - Báo cáo kết quả kinh doanh (cả năm)",[["dt","Doanh thu bán hàng và cung cấp dịch vụ"],["giamtru","Các khoản giảm trừ"],["gv","Giá vốn hàng bán"],["dttc","Doanh thu tài chính"],["cptc","Chi phí tài chính"],["cpbh","Chi phí bán hàng"],["cpql","Chi phí quản lý doanh nghiệp"],["tnk","Thu nhập khác"],["cpk","Chi phí khác"],["lntt","Lợi nhuận trước thuế (đã ghi)"],["thuehh","Chi phí thuế TNDN hiện hành"],["thuehl","Chi phí thuế TNDN hoãn lại (âm nếu là thu nhập)"],["lnst","Lợi nhuận sau thuế (đã ghi)"]]],
 ["B03 - Lưu chuyển tiền tệ và đối chiếu khác",[["tiendau","Tiền đầu kỳ"],["lckd","Lưu chuyển tiền thuần từ kinh doanh"],["lcdt","Lưu chuyển tiền thuần từ đầu tư"],["lctc","Lưu chuyển tiền thuần từ tài chính"],["tiencuoi","Tiền cuối kỳ (trên B03)"],["dtgtgt","Doanh thu cả năm trên các tờ khai GTGT"],["tsuat","Thuế suất TNDN dự kiến (%)"],["qluong","Quỹ lương đóng BH"],["bhdn","BHXH, BHYT, BHTN doanh nghiệp đã trích"],["dtkt","Doanh thu năm trước (không bắt buộc)"]]]
];
var BSAMPLE_OK={tien:800,phaithu:1500,tonkho:1000,tscd:2200,tskhac:500,tongts:6000,nophaitra:3000,vcsh:3000,tongnv:6000,l421dk:600,l421ck:850,codtuc:0,dt:5000,giamtru:100,gv:3800,dttc:50,cptc:120,cpbh:300,cpql:400,tnk:20,cpk:30,lntt:320,thuehh:60,thuehl:10,lnst:250,tiendau:700,lckd:150,lcdt:-100,lctc:50,tiencuoi:800,dtgtgt:4980,tsuat:20,qluong:1000,bhdn:215,dtkt:4300};
var BSAMPLE_BAD=JSON.parse(JSON.stringify(BSAMPLE_OK));BSAMPLE_BAD.tongts=6100;BSAMPLE_BAD.lnst=240;BSAMPLE_BAD.l421ck=780;BSAMPLE_BAD.tiencuoi=900;BSAMPLE_BAD.dtgtgt=3600;BSAMPLE_BAD.thuehh=5;BSAMPLE_BAD.phaithu=2900;BSAMPLE_BAD.bhdn=60;
function bv(id){var e=$("bf_"+id);return e&&e.value!==""?parseFloat(e.value):null;}
function viewBCTC(){
  var h='<div class="card"><h3>Soát BCTC: 19 phép thử logic</h3><div class="law">Nhập số liệu từ báo cáo (cùng một đơn vị tiền, ví dụ triệu đồng). Để trống chỉ tiêu nào chưa có - phép thử liên quan sẽ bỏ qua. Mục đích: chỉ ra nơi BCTC có thể sai để truy sổ; không thay thế kiểm toán.</div><button class="b sm" onclick="loadB(BSAMPLE_OK)">Nạp mẫu đúng</button><button class="b alt sm" onclick="loadB(BSAMPLE_BAD)">Nạp mẫu có lỗi</button><button class="b alt sm" onclick="loadB({})">Xóa</button></div>';
  BF.forEach(function(g){h+='<div class="card"><h4 style="margin-top:0">'+esc(g[0])+'</h4><div class="row">'+g[1].map(function(f){return '<div><label>'+esc(f[1])+'</label><input id="bf_'+f[0]+'" type="number" step="any"></div>';}).join("")+'</div></div>';});
  h+='<div class="card"><button class="b" onclick="runB()">Chạy kiểm tra</button><div id="brep" style="margin-top:10px"></div></div>';
  return h;
}
function loadB(o){BF.forEach(function(g){g[1].forEach(function(f){var e=$("bf_"+f[0]);if(e)e.value=(o[f[0]]==null?"":o[f[0]]);});});if(Object.keys(o).length)runB();else $("brep").innerHTML="";}
function runB(){
  var v={};BF.forEach(function(g){g[1].forEach(function(f){v[f[0]]=bv(f[0]);});});
  function has(){for(var i=0;i<arguments.length;i++)if(v[arguments[i]]==null)return false;return true;}
  function n(x){return x==null?0:x;}
  var R=[];function add(st,name,msg,why){R.push({st:st,name:name,msg:msg,why:why});}
  var tol=Math.max(0.5,0.0005*Math.abs(n(v.tongts)||n(v.dt)||1));
  if(has("tongts","tongnv")){var d=v.tongts-v.tongnv;add(Math.abs(d)<=tol?"ok":"bad","1. Tổng tài sản = Tổng nguồn vốn",Math.abs(d)<=tol?"Khớp.":"Lệch "+d+".","Đẳng thức kế toán bắt buộc. Lệch thường do bút toán một vế, kết chuyển sai hoặc phân loại tài khoản lưỡng tính (131, 331, 333, 334, 3388).");}
  if(has("tien","phaithu","tonkho","tscd","tskhac","tongts")){var s=v.tien+v.phaithu+v.tonkho+v.tscd+v.tskhac,d2=s-v.tongts;add(Math.abs(d2)<=tol?"ok":"bad","2. Tổng tài sản = tổng các khoản mục",Math.abs(d2)<=tol?"Khớp.":"Tổng các khoản = "+s+", báo cáo ghi "+v.tongts+".","Lỗi cộng hoặc thiếu khoản mục trên B01.");}
  if(has("nophaitra","vcsh","tongnv")){var d3=v.nophaitra+v.vcsh-v.tongnv;add(Math.abs(d3)<=tol?"ok":"bad","3. Tổng nguồn vốn = Nợ phải trả + Vốn chủ sở hữu",Math.abs(d3)<=tol?"Khớp.":"Lệch "+d3+".","Kiểm tra cách trình bày nợ và vốn.");}
  var lntt=null;
  if(has("dt","gv")){lntt=v.dt-n(v.giamtru)-v.gv+n(v.dttc)-n(v.cptc)-n(v.cpbh)-n(v.cpql)+n(v.tnk)-n(v.cpk);
    if(has("lntt")){var d4=lntt-v.lntt;add(Math.abs(d4)<=tol?"ok":"bad","4. LNTT tính lại = LNTT trên báo cáo",Math.abs(d4)<=tol?"Khớp ("+lntt+").":"Tính lại = "+lntt+", báo cáo "+v.lntt+".","Cộng trừ các khoản từ doanh thu đến lợi nhuận (B02 mã 50).");}}
  if(has("lntt","thuehh","lnst")){var calc=v.lntt-v.thuehh-n(v.thuehl),d5=calc-v.lnst;add(Math.abs(d5)<=tol?"ok":"bad","5. LNST = LNTT - thuế hiện hành - thuế hoãn lại",Math.abs(d5)<=tol?"Khớp ("+calc+").":"Tính lại = "+calc+", báo cáo "+v.lnst+".","Chi phí thuế (B02 mã 51, 52) phải được trừ đủ trước khi chuyển vào 421.");}
  if(has("l421dk","l421ck","lnst")){var exp=v.l421dk+v.lnst-n(v.codtuc),d6=exp-v.l421ck;add(Math.abs(d6)<=tol?"ok":"warn","6. 421 cuối = 421 đầu + LNST - cổ tức/ trích quỹ",Math.abs(d6)<=tol?"Khớp.":"Kỳ vọng "+exp+", thực tế "+v.l421ck+" (lệch "+d6+").","Lệch có thể do điều chỉnh sai sót năm trước, chuyển quỹ, lỗi kết chuyển 911→421. Truy sổ cái 421 để tìm bút toán.");}
  if(has("tien","tiencuoi")){var d7=v.tien-v.tiencuoi;add(Math.abs(d7)<=tol?"ok":"bad","7. Tiền cuối kỳ B03 = Tiền trên B01",Math.abs(d7)<=tol?"Khớp.":"Lệch "+d7+".","B03 phải kết thúc đúng bằng số tiền trên bảng cân đối (gồm cả tương đương tiền).");}
  if(has("tiendau","lckd","lcdt","lctc","tiencuoi")){var e8=v.tiendau+v.lckd+v.lcdt+v.lctc,d8=e8-v.tiencuoi;add(Math.abs(d8)<=tol?"ok":"bad","8. Tiền đầu + lưu chuyển thuần = Tiền cuối",Math.abs(d8)<=tol?"Khớp.":"Tính lại "+e8+", cuối kỳ ghi "+v.tiencuoi+".","Thiếu dòng chênh lệch tỷ giá hoặc phân loại dòng tiền sai.");}
  if(has("dt","dtgtgt")&&v.dt>0){var p=Math.abs(v.dt-v.dtgtgt)/v.dt*100;add(p<=2?"ok":(p<=10?"warn":"bad"),"9. Doanh thu B02 ↔ doanh thu tờ khai GTGT",p<=2?"Chênh "+p.toFixed(1)+"%.":"Chênh "+p.toFixed(1)+"% ("+(v.dt-v.dtgtgt)+").","Cơ quan thuế đối chiếu trước hết hai số này. Giải thích: doanh thu không chịu thuế, xuất khẩu, chưa tới thời điểm lập hóa đơn, hóa đơn điều chỉnh/hủy, doanh thu tài chính hoặc thu nhập khác.");}
  if(lntt!=null&&has("thuehh","tsuat")){var rate=v.tsuat/100;if(lntt>0){var etr=v.thuehh/lntt,rr=etr/rate;add(rr>=0.7&&rr<=1.4?"ok":"warn","10. Thuế suất hiệu dụng ≈ thuế suất danh nghĩa","Hiệu dụng = "+(etr*100).toFixed(1)+"% (danh nghĩa "+v.tsuat+"%).","Hiệu dụng thấp: do lỗ chuyển, ưu đãi, khoản miễn thuế (phải có hồ sơ). Cao: nhiều chi phí không được trừ - kiểm tra phần điều chỉnh tăng.");}else if(v.thuehh>0){add("warn","10. Thuế TNDN khi LNTT ≤ 0","LNTT ≤ 0 nhưng có thuế hiện hành "+v.thuehh+".","Có thể hợp lý nếu chi phí không được trừ lớn. Cần bảng điều chỉnh thu nhập tính thuế.");}}
  if(has("dt","gv")&&n(v.dt)-n(v.giamtru)>0){var dtt=v.dt-n(v.giamtru),gm=(dtt-v.gv)/dtt*100;add(gm<0?"bad":(gm<5?"warn":"ok"),"11. Biên lợi nhuận gộp",gm.toFixed(1)+"%.",gm<0?"Bán dưới giá vốn: kiểm tra giá vốn, đơn vị tính, hàng khuyến mại, trích lập dự phòng.":"Biên rất thấp so với ngành là điều cơ quan thuế quan tâm; so với ngành và kỳ trước.");}
  if(has("dt")&&v.dt>0&&(v.cpbh!=null||v.cpql!=null)){var op=(n(v.cpbh)+n(v.cpql))/v.dt*100;add(op>35?"warn":"ok","12. Chi phí bán hàng + quản lý / doanh thu",op.toFixed(1)+"%.","Tỷ lệ cao bất thường: kiểm tra chi phí không tương xứng doanh thu (tiếp khách, quảng cáo, dịch vụ mua ngoài).");}
  if(has("dt","phaithu")&&v.dt>0){var dso=v.phaithu/v.dt*365;add(dso>120?"warn":"ok","13. Số ngày thu tiền (DSO)",dso.toFixed(0)+" ngày.","Cao: kiểm tra phải thu quá hạn, dự phòng, doanh thu ghi nhận sớm cuối kỳ.");}
  if(has("gv","tonkho")&&v.gv>0){var dio=v.tonkho/v.gv*365;add(dio>180?"warn":"ok","14. Số ngày tồn kho (DIO)",dio.toFixed(0)+" ngày.","Cao: kiểm kê, dự phòng giảm giá, hàng chậm luân chuyển; đối chiếu nhập-xuất-tồn.");}
  if(has("tien","tongts")&&v.tongts>0){var tp=v.tien/v.tongts*100;add(tp>40?"warn":"ok","15. Tiền / Tổng tài sản",tp.toFixed(1)+"%.","Tỷ trọng tiền rất cao: kiểm tra quỹ tiền mặt và sổ phụ ngân hàng, tiền gửi có kỳ hạn phân loại sai.");}
  if(has("lnst","lckd")){add(v.lnst>0&&v.lckd<0?"warn":"ok","16. Lợi nhuận và dòng tiền kinh doanh",v.lnst>0&&v.lckd<0?"Lãi "+v.lnst+" nhưng dòng tiền kinh doanh "+v.lckd+".":"Không có mâu thuẫn rõ.","Lãi mà tiền kinh doanh âm: xem phải thu, tồn kho, chi phí chưa ghi, doanh thu ghi sớm (chất lượng lợi nhuận).");}
  if(has("qluong","bhdn")&&v.qluong>0){var br=v.bhdn/v.qluong*100;add(br>=17&&br<=24?"ok":"warn","17. BH doanh nghiệp / quỹ lương đóng BH (kỳ vọng ≈ 21,5%)",br.toFixed(1)+"%.","Thấp: trích thiếu hoặc lương thực tế cao hơn lương đóng BH (rủi ro BHXH, TNCN). Cao: kiểm tra có tính KPCĐ 2%.");}
  if(has("vcsh")){add(v.vcsh<0?"bad":"ok","18. Vốn chủ sở hữu",v.vcsh<0?"Âm: mất vốn chủ sở hữu.":"Dương.","VCSH âm kéo dài: đánh giá khả năng hoạt động liên tục (VSA 570), thuyết minh.");}
  if(has("dt","dtkt")&&v.dtkt>0){var g=(v.dt-v.dtkt)/v.dtkt*100;add(Math.abs(g)>50?"warn":"ok","19. Biến động doanh thu so với năm trước",g.toFixed(1)+"%.",Math.abs(g)>50?"Biến động lớn cần giải thích (hợp đồng mới, thu hẹp, doanh thu cuối kỳ, đối chiếu thuế).":"Trong mức thông thường.");}
  var cnt={ok:0,warn:0,bad:0};R.forEach(function(r){cnt[r.st]++;});
  var ico={ok:"✔",warn:"⚠",bad:"✖"},ord={bad:0,warn:1,ok:2};
  var h='<div class="card"><b>Kết quả: '+R.length+' phép thử - '+cnt.ok+' đạt, '+cnt.warn+' cảnh báo, '+cnt.bad+' lỗi.</b></div>';
  R.sort(function(a,b){return ord[a.st]-ord[b.st];});
  R.forEach(function(r){var cls=r.st==="ok"?"g":(r.st==="warn"?"w":"");var sty=r.st==="bad"?' style="background:rgba(179,38,30,.15);color:var(--bad)"':"";
    h+='<div class="card"><span class="tag '+cls+'"'+sty+'>'+ico[r.st]+' '+(r.st==="ok"?"Đạt":(r.st==="warn"?"Cảnh báo":"Lỗi"))+'</span> <b>'+esc(r.name)+'</b><div>'+esc(r.msg)+'</div>'+(r.st!=="ok"?'<div class="law"><b>Cách xử lý:</b> '+esc(r.why)+'</div>':'')+'</div>';});
  $("brep").innerHTML=h;
}

/* ---------- Tab: Văn bản mới ---------- */
var updQ="",updTag="",updOfficial=false;
function viewUpd(){
  var U=window.UPDATES||{items:[],generated:null},gen=U.generated?new Date(U.generated):null;
  var stale=!gen||(Date.now()-gen.getTime()>2*86400000);
  var h='<div class="card"><b>Cập nhật văn bản pháp luật</b><div class="law">Lần cập nhật gần nhất: '+(gen?gen.toLocaleString("vi-VN"):'chưa chạy')+' · '+U.items.length+' mục. Nguồn: Công báo Chính phủ, Cổng thông tin Chính phủ, Bộ Tài chính, Cục Thuế, Bộ Tư pháp (vbpl.vn) và các trang chuyên ngành.</div>';
  if(stale)h+='<div class="warn">Dữ liệu đã cũ hoặc chưa có. Chạy <b>cap_nhat_van_ban.bat</b> trên máy tính (hoặc để lịch tự chạy hằng ngày), rồi bấm «Tải lại».</div>';
  h+='<button class="b sm" onclick="reloadUpd()">Tải lại</button></div>';
  h+='<div class="row"><input placeholder="Lọc theo từ khóa (đất đai, doanh nghiệp, lao động...)" value="'+esc(updQ)+'" oninput="updQ=this.value;renderUpd()"><select onchange="updTag=this.value;renderUpd()"><option value="">Mọi chủ đề</option>'+Object.keys(TOPICS).filter(function(t){return !/^dk_/.test(t);}).map(function(t){return '<option value="'+t+'"'+(updTag===t?" selected":"")+'>'+esc(TOPICS[t])+'</option>';}).join("")+'</select></div><label style="margin-top:6px"><input type="checkbox" style="width:auto" '+(updOfficial?"checked":"")+' onchange="updOfficial=this.checked;renderUpd()"> Chỉ nguồn chính thống (cơ quan nhà nước)</label><div id="updlist" style="margin-top:8px"></div>';
  setTimeout(renderUpd,0);return h;
}
function renderUpd(){
  var items=(window.UPDATES&&UPDATES.items||[]).slice(),q=strip(updQ);
  items=items.filter(function(i){return (!updTag||(i.g||[]).indexOf(updTag)>=0)&&(!updOfficial||i.o)&&(!q||strip(i.t+" "+i.s).indexOf(q)>=0);});
  items.sort(function(a,b){return new Date(b.d||0)-new Date(a.d||0);});
  var box=$("updlist");if(!box)return;
  box.innerHTML=items.length?items.slice(0,150).map(function(i){return '<div class="card up"><a href="'+esc(i.u)+'" target="_blank" rel="noopener">'+esc(i.t)+'</a><div class="meta">'+(i.d?new Date(i.d).toLocaleDateString("vi-VN")+' · ':'')+esc(i.s||"")+(i.o?' · <span class="tag g">chính thống</span>':'')+(i.g||[]).map(function(g){return ' <span class="tag">'+esc(topicLabel(g))+'</span>';}).join("")+'</div></div>';}).join(""):'<div class="card">Không có mục phù hợp.</div>';
}
function reloadUpd(){
  fetch("data/updates.json?"+Date.now()).then(function(r){return r.json();}).then(function(j){window.UPDATES=j;render();}).catch(function(){alert("Không tải được. Hãy mở ứng dụng qua máy chủ (chay_may_chu.bat) hoặc chạy cap_nhat_van_ban.bat rồi tải lại trang.");});
}

/* ---------- điều hướng ---------- */
/* ---------- Tab: Tình huống (số liệu ngẫu nhiên, đóng vai chuyên gia) ---------- */
var simRole="all",simCur=null,simCh=null,simChRes=null;
function simPick(){
  var p=P(),seen=store("simseen")||[],weak={};
  weakTopics(p,5).forEach(function(w){weak[w.t]=1;});
  var pool=SCEN.filter(function(t){return simRole==="all"||t.role===simRole;});
  if(simCh){var np=pool.filter(function(t){return simCh.roles.indexOf(t.role)<0;});if(np.length)pool=np;}
  var fresh=pool.filter(function(t){return seen.indexOf(t.id)<0;});
  if(!fresh.length){seen=[];fresh=pool;}
  var bag=[];fresh.forEach(function(t){bag.push(t);if(weak[t.topic])bag.push(t);});
  var t=bag[Math.floor(Math.random()*bag.length)];
  seen.push(t.id);if(seen.length>SCEN.length)seen.shift();store("simseen",seen);
  return t;
}
function simChStart(){simCh={k:0,ok:0,tot:0,t0:Date.now(),roles:[]};simChRes=null;simRole="all";simNew();}
function simNew(){
  if(simCh&&simCh.k>=5){simChRes=simCh;simCh=null;simCur=null;simRender();return;}
  var t=simPick();if(!t){simCur=null;simRender();return;}
  simCur={t:t,s:t.make(SR()),i:0,res:[],fb:null};simRender();
}
function viewSim(){
  var roles=["all"].concat(SIM_ROLES);
  return '<div class="row"><select onchange="simRole=this.value;simNew()">'+roles.map(function(r){return '<option value="'+r+'"'+(simRole===r?" selected":"")+'>'+(r==="all"?"Tất cả vai trò":"Vai trò: "+r)+'</option>';}).join("")+'</select><button class="b" onclick="simCh=null;simChRes=null;simNew()">Tình huống mới</button><button class="b alt" onclick="simChStart()">Thử thách 5 tình huống</button></div><div class="law" style="margin:8px 0">Mỗi tình huống có số liệu và hoàn cảnh khác nhau mỗi lần. Bạn đóng vai chuyên gia, trả lời từng bước; kết quả ghi vào điểm năng lực, chủ đề yếu được ưu tiên ra nhiều hơn.</div><div id="simbox" style="margin-top:8px"></div>';
}
function simRender(){
  var el=$("simbox");if(!el)return;
  if(!simCur&&simChRes){var r=simChRes,pc=Math.round(100*r.ok/r.tot),mn=Math.max(1,Math.round((Date.now()-r.t0)/60000));el.innerHTML='<div class="card"><h3>Tổng kết thử thách</h3><div class="ex"><b>'+r.ok+'/'+r.tot+' bước đúng ('+pc+'%) trong khoảng '+mn+' phút, qua '+r.roles.length+' vai trò: '+esc(r.roles.join(", "))+'.</b></div><div class="law">'+(pc>=80?"Rất vững. Hãy thử mức khó hơn bằng cách lọc từng vai trò.":pc>=60?"Khá. Xem lại các bước sai trong tab «Hôm nay» (chủ đề yếu sẽ được lặp lại).":"Cần ôn thêm: mở «Chuyên đề» rồi làm lại thử thách.")+'</div><p><button class="b" onclick="simChStart()">Chơi lại</button></p></div>';return;}
  if(!simCur){el.innerHTML='<div class="card">Chưa có tình huống phù hợp vai trò này.</div>';return;}
  var c=simCur,s=c.s,st=s.stages[c.i],n=s.stages.length,h=(simCh?'<div class="law">Thử thách: tình huống '+(simCh.k+1)+'/5</div>':'')+'<div class="card"><span class="tag">'+esc(c.t.role)+'</span><span class="tag">Mức '+c.t.level+'/3</span><span class="tag">'+esc(topicLabel(c.t.topic))+'</span><h3>'+esc(s.title)+'</h3>';
  h+='<ul>'+s.facts.map(function(f){return '<li>'+esc(f)+'</li>';}).join("")+'</ul>';
  if(c.i>=n){
    var ok=c.res.filter(Boolean).length,sk=c.res.filter(function(x){return x===null;}).length,nn=n-sk;
    if(simCh&&!c.counted){c.counted=true;simCh.k++;simCh.ok+=ok;simCh.tot+=nn;simCh.roles.push(c.t.role);}
    h+='<div class="ex"><b>Kết quả: '+ok+'/'+nn+' bước đúng'+(sk?' (bỏ qua '+sk+' bước)':'')+'.</b></div>';
    h+='<h4>Bài học của chuyên gia</h4><div>'+esc(s.lesson)+'</div><div class="law">Căn cứ: '+esc(s.law)+'</div>'+(s.warn?'<div class="warn"><b>Lưu ý:</b> '+esc(s.warn)+'</div>':'');
    h+='<p><button class="b" onclick="simNew()">'+(simCh&&simCh.k>=5?'Xem tổng kết thử thách':simCh?'Tình huống tiếp theo ('+(simCh.k+1)+'/5)':'Tình huống tiếp theo')+'</button></p></div>';el.innerHTML=h;return;
  }
  h+='<h4>Bước '+(c.i+1)+'/'+n+'</h4><div><b>'+esc(st.q)+'</b></div>';
  if(c.fb){
    h+='<div class="'+(c.fb.ok?'ex':'warn')+'" style="margin-top:8px"><b>'+(c.fb.ok?'Đúng.':'Chưa đúng.')+'</b> '+esc(c.fb.msg)+'</div>';
    if(c.fb.model)h+='<ul>'+c.fb.model.map(function(m){return '<li>'+esc(m)+'</li>';}).join("")+'</ul>';
    h+='<p><button class="b" onclick="simNext()">'+(c.i+1>=n?'Xem bài học':'Bước tiếp theo')+'</button></p></div>';el.innerHTML=h;return;
  }
  h+='<p style="margin:8px 0 0"><button class="b alt sm" onclick="simSkip()">Bỏ qua bước này</button> <button class="b alt sm" onclick="simCh=null;simNew()">Bỏ qua tình huống</button></p>';
  if(st.type==="mc")h+=st.o.map(function(o,i){return '<button class="b alt" style="display:block;width:100%;text-align:left;margin:6px 0" onclick="simAns('+i+')">'+esc(o)+'</button>';}).join("");
  else if(st.type==="num")h+='<div class="row" style="margin-top:8px"><input id="simin" inputmode="numeric" placeholder="Nhập số ('+esc(st.unit||"")+')"><button class="b" onclick="simAns()">Trả lời</button></div>';
  else h+='<textarea id="simin" rows="4" style="width:100%;margin-top:8px" placeholder="Viết câu trả lời của bạn..."></textarea><p><button class="b" onclick="simAns()">Trả lời</button></p>';
  h+='</div>';el.innerHTML=h;
}
function simAns(v){
  var c=simCur,s=c.s,st=s.stages[c.i],ok=false,msg="",model=null;
  if(st.type==="mc"){ok=(v===st.a);msg=(ok?"":"Đáp án đúng: "+st.o[st.a]+". ")+st.e;}
  else if(st.type==="num"){
    var raw=($("simin").value||"").replace(/[^0-9]/g,"");if(!raw)return;var x=+raw,tol=st.tol!=null?st.tol:(st.ans>=100000?Math.max(1000,st.ans*0.005):0);
    ok=Math.abs(x-st.ans)<=tol;msg=(ok?"":"Bạn nhập "+money(x)+"; đáp án "+money(st.ans)+". ")+st.e;
  }else{
    var a=strip($("simin").value||"");if(a.length<5)return;
    var hit=st.chk.filter(function(k){return a.indexOf(strip(k))>=0;});
    var pct=Math.round(100*hit.length/st.chk.length);ok=pct>=50;
    msg="Mức bao phủ ý chính "+pct+"% ("+hit.length+"/"+st.chk.length+")."+(pct<100?" Còn thiếu: "+st.chk.filter(function(k){return hit.indexOf(k)<0;}).join("; ")+".":"");
    model=st.model;
  }
  record(c.t.topic,"sc:"+c.t.id+":"+c.i,ok,"sim");
  c.res.push(ok);c.fb={ok:ok,msg:msg,model:model};simRender();
}
function simNext(){simCur.i++;simCur.fb=null;simRender();window.scrollTo(0,0);}
function simSkip(){if(simCur.fb)return;simCur.res.push(null);simCur.i++;simRender();window.scrollTo(0,0);}

var TABS=[["home","Hôm nay",viewHome],["lib","Chuyên đề",viewLib],["chat","Hỏi đáp",viewChat],["quiz","Luyện tập",viewQuiz],["sim","Tình huống",viewSim],["upd","Văn bản mới",viewUpd]];
var tab="home";
function render(){
  var nu=updatesRecent(3).length;
  $("nav").innerHTML=TABS.map(function(t){return '<button class="'+(t[0]===tab?"on":"")+'" onclick="tab=\''+t[0]+'\';render()">'+t[1]+(t[0]==="upd"&&nu?'<span class="dot">'+nu+'</span>':'')+'</button>';}).join("");
  $("main").innerHTML=TABS.filter(function(x){return x[0]===tab;})[0][2]();
  window.scrollTo(0,0);
  if(tab==="lib")renderLib();
  if(tab==="bl"){if(blCur)blRender();else blNew();}
  if(tab==="sim"){if(simCur)simRender();else simNew();}
  if(tab==="chat"){
    if(!chatHist.length)chatHist.push({who:"a",html:esc("Chào bạn! Mình là cố vấn pháp luật Việt Nam (đối chiếu đến "+AS_OF+"): dân sự, doanh nghiệp, thương mại, đầu tư, đất đai, lao động, hình sự, hành chính, tố tụng, hôn nhân gia đình, sở hữu trí tuệ, phá sản, thuế.\n\nHỏi một chủ đề, mình trả lời theo văn bản rồi hỏi ngược để bạn tự kiểm tra; kết quả được ghi vào điểm năng lực. Nội dung chỉ để học tập, không thay thế tư vấn pháp lý chính thức."),ai:false});
    var b=$("chatbox");chatHist.forEach(function(m){b.insertAdjacentHTML("beforeend",'<div class="msg '+m.who+'">'+m.html+'</div>');});b.scrollTop=b.scrollHeight;
    $("chatin").addEventListener("keydown",function(e){if(e.key==="Enter")ask();});
  }
}
$("asof").textContent="Đối chiếu pháp luật đến "+AS_OF;
render();
if("serviceWorker" in navigator&&/^https?:$/.test(location.protocol)){navigator.serviceWorker.register("sw.js").catch(function(){});}
