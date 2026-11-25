/* TÌNH HUỐNG: thuế xuất nhập khẩu, hải quan, đấu thầu, đầu tư công. Căn cứ đối chiếu nguyên văn các văn bản hợp nhất Công báo
   (Luật Hải quan VBHN 156/2026, Luật Đấu thầu VBHN 74, Luật Đầu tư công VBHN 03, Luật GTGT VBHN 114 Điều 7, Luật Thuế xuất khẩu, thuế nhập khẩu VBHN 96). */
SCEN.push(

{id:"l_dauthau_bd",role:"Pháp chế doanh nghiệp",topic:"dth",level:2,make:function(R){
  var kind=R.pick(["xây lắp","mua sắm hàng hóa"]),small=R.int(0,1)===1;
  var g=small?(kind==="xây lắp"?R.step(2e9,19e9,500e6):R.step(1e9,9e9,500e6)):(kind==="xây lắp"?R.step(25e9,120e9,5e9):R.step(15e9,80e9,5e9));
  var lo=Math.round(g*(small?0.01:0.015)),hi=Math.round(g*(small?0.015:0.03)),hd=Math.round(g*R.pick([0.9,0.95,1])),h2=Math.round(hd*0.02),h10=Math.round(hd*0.1);
  return {title:"Bảo đảm dự thầu và bảo đảm thực hiện hợp đồng",
   facts:["Bên mời thầu lập hồ sơ mời thầu gói thầu "+kind+" giá gói thầu "+R.m(g)+" đồng, đấu thầu rộng rãi, không phải gói thầu thuộc hạn mức chỉ định thầu.","Nhà thầu trúng thầu ký hợp đồng giá "+R.m(hd)+" đồng."],
   stages:[
    {type:"num",q:"Mức bảo đảm dự thầu THẤP NHẤT được phép quy định trong hồ sơ mời thầu (đồng)?",ans:lo,unit:"đồng",e:small?"Gói thầu "+kind+" giá không quá "+(kind==="xây lắp"?"20":"10")+" tỷ đồng: 1% đến 1,5% giá gói thầu (Điều 14 khoản 4 điểm a). 1% × "+R.m(g)+" = "+R.m(lo)+" đồng.":"Gói thầu vượt ngưỡng nhỏ: 1,5% đến 3% giá gói thầu (Điều 14 khoản 4 điểm b). 1,5% × "+R.m(g)+" = "+R.m(lo)+" đồng."},
    {type:"num",q:"Mức bảo đảm dự thầu CAO NHẤT được phép (đồng)?",ans:hi,unit:"đồng",e:(small?"1,5%":"3%")+" × "+R.m(g)+" = "+R.m(hi)+" đồng."},
    simMC("Nhà thầu có thể thực hiện bảo đảm dự thầu bằng biện pháp nào?","Đặt cọc; thư bảo lãnh của tổ chức tín dụng; hoặc giấy chứng nhận bảo hiểm bảo lãnh của doanh nghiệp bảo hiểm phi nhân thọ",["Chỉ đặt cọc tiền mặt","Chỉ thư bảo lãnh ngân hàng","Cam kết bằng văn bản"],"Điều 14 khoản 1 Luật Đấu thầu."),
    {type:"num",q:"Giá trị bảo đảm thực hiện hợp đồng THẤP NHẤT (2% giá hợp đồng) là bao nhiêu (đồng)?",ans:h2,unit:"đồng",e:"Điều 68 khoản 4: từ 2% đến 10% giá hợp đồng: 2% × "+R.m(hd)+" = "+R.m(h2)+" đồng (cao nhất 10% = "+R.m(h10)+" đồng)."}],
   law:"Luật Đấu thầu (VBHN 74/VBHN-VPQH) Điều 14, 68",
   lesson:"Bảo đảm dự thầu tính theo giá gói thầu (có hai khung theo quy mô); bảo đảm thực hiện hợp đồng tính theo giá hợp đồng 2% đến 10%.",
   warn:"Mức cụ thể trong khung do chủ đầu tư, bên mời thầu quyết định căn cứ quy mô, tính chất gói thầu; hạn mức chỉ định thầu và hướng dẫn chi tiết nằm ở nghị định."};}},

{id:"l_hai_quan_han",role:"Pháp chế doanh nghiệp",topic:"hq",level:2,make:function(R){
  var d=new Date(2026,R.int(0,8),R.int(1,25)),f=function(x){return x.getDate()+"/"+(x.getMonth()+1)+"/"+x.getFullYear();},hanNop=new Date(d.getTime()+30*86400000),tq=new Date(d.getTime()+R.int(3,10)*86400000),hanBs=new Date(tq.getTime()+60*86400000);
  var yr=tq.getFullYear()+5;
  return {title:"Mốc thời gian của một lô hàng nhập khẩu",
   facts:["Lô hàng nhập khẩu đến cửa khẩu ngày "+f(d)+". Công ty chưa nộp hồ sơ hải quan.","Hàng được thông quan ngày "+f(tq)+" (tờ khai đăng ký cùng ngày)."],
   stages:[
    simMC("Hạn chót nộp hồ sơ hải quan (tính từ ngày hàng đến cửa khẩu) là:",f(hanNop),[f(new Date(d.getTime()+15*86400000)),f(new Date(d.getTime()+60*86400000)),f(new Date(d.getTime()+90*86400000))],"Điều 25 khoản 2: nộp trước ngày hàng đến cửa khẩu hoặc trong 30 ngày kể từ ngày hàng đến cửa khẩu."),
    simMC("Công ty phát hiện khai sai số lượng sau thông quan. Hạn khai bổ sung (khi chưa có quyết định kiểm tra) là:",f(hanBs),[f(new Date(tq.getTime()+30*86400000)),f(new Date(tq.getTime()+90*86400000)),f(new Date(tq.getTime()+365*86400000))],"Điều 29 khoản 4 điểm b: trong 60 ngày kể từ ngày thông quan và trước khi có quyết định kiểm tra sau thông quan, thanh tra, kiểm tra."),
    simMC("Cơ quan hải quan có thể kiểm tra sau thông quan lô hàng này đến khi nào (ban hành quyết định kiểm tra)?","Trong 05 năm kể từ ngày đăng ký tờ khai (đến khoảng ngày này của năm "+yr+")",["Trong 01 năm","Trong 03 năm","Không giới hạn"],"Điều 77 khoản 4 Luật Hải quan."),
    simMC("Hàng cần thông quan ngay nhưng chưa nộp đủ thuế nhập khẩu. Cách xử lý hợp pháp?","Có tổ chức tín dụng bảo lãnh; thời hạn bảo lãnh tối đa 30 ngày kể từ ngày đăng ký tờ khai; nộp tiền chậm nộp từ ngày thông quan đến ngày nộp thuế",["Cam kết bằng văn bản nộp sau","Nộp thuế sau 90 ngày không phát sinh lãi","Không thể thông quan"],"Luật Thuế xuất khẩu, thuế nhập khẩu Điều 9 khoản 1 và Luật Hải quan Điều 37 khoản 2.")],
   law:"Luật Hải quan (VBHN 156/2026/VBHN-LQ-VPQH) Điều 25, 29, 37, 77; Luật Thuế xuất khẩu, thuế nhập khẩu Điều 9",
   lesson:"Ba mốc cần thuộc: 30 ngày nộp hồ sơ nhập khẩu; 60 ngày khai bổ sung sau thông quan; 05 năm kiểm tra sau thông quan.",
   warn:"Luật số 11/2026/QH16 sửa đổi Luật Hải quan có hiệu lực từ 01/3/2027 (ghi chú trong bản hợp nhất): đối chiếu khi lô hàng thuộc giai đoạn đó."};}},

{id:"l_dtc_nhom",role:"Pháp chế doanh nghiệp",topic:"dth",level:2,make:function(R){
  var S=R.pick([
   {n:"đường quốc lộ (giao thông)",a:4600,b:240},{n:"hệ thống cấp thoát nước (hạ tầng kỹ thuật)",a:3000,b:160},{n:"dự án sản xuất nông nghiệp",a:2000,b:120}]);
  var mode=R.int(0,2),amt=mode===0?R.step(S.a+100,S.a*3,100):(mode===1?R.step(S.b+10,S.a-100,50):R.step(20,S.b-10,10));
  var gr=amt>=S.a?"A":(amt>=S.b?"B":"C");
  return {title:"Phân loại dự án đầu tư công theo quy mô",
   facts:["Dự án "+S.n+" sử dụng vốn đầu tư công, tổng mức đầu tư "+R.m(amt*1e9)+" đồng ("+R.m(amt)+" tỷ đồng).","Không thuộc diện không phân biệt tổng mức đầu tư và không phải dự án quan trọng quốc gia."],
   stages:[
    simMC("Dự án thuộc nhóm nào theo Luật Đầu tư công?","Nhóm "+gr,["Nhóm A","Nhóm B","Nhóm C"].filter(function(x){return x!=="Nhóm "+gr;}).concat(["Dự án quan trọng quốc gia"]),"Lĩnh vực này: nhóm A từ "+R.m(S.a)+" tỷ đồng; nhóm B từ "+R.m(S.b)+" đến dưới "+R.m(S.a)+" tỷ đồng; nhóm C dưới "+R.m(S.b)+" tỷ đồng (Điều 9, 10, 11)."),
    simMC("Dự án quan trọng quốc gia (tiêu chí vốn) khi sử dụng vốn đầu tư công từ:","30.000 tỷ đồng trở lên",["10.000 tỷ đồng trở lên","20.000 tỷ đồng trở lên","50.000 tỷ đồng trở lên"],"Điều 8 khoản 1 Luật Đầu tư công.")],
   law:"Luật Đầu tư công (VBHN 03/VBHN-VPQH) Điều 8, 9, 10, 11",
   lesson:"Xác định lĩnh vực trước, so tổng mức đầu tư với ngưỡng của lĩnh vực đó: ngưỡng nhóm A cao hơn ở giao thông, công nghiệp điện, dầu khí, khoáng sản.",
   warn:"Thẩm quyền quyết định chủ trương đầu tư, trình tự thủ tục thay đổi theo nhóm và nguồn vốn: đọc thêm các điều sau Điều 18."};}},

{id:"l_nhap_khau_thue",role:"Pháp chế doanh nghiệp",topic:"th",level:3,make:function(R){
  var V=R.step(800e6,6000e6,100e6),t=R.pick([0.05,0.1,0.15,0.2]),nk=Math.round(V*t),base=V+nk,gtgt=Math.round(base*0.1);
  return {title:"Tính thuế nhập khẩu và GTGT hàng nhập khẩu",
   facts:["Công ty nhập khẩu lô hàng trị giá tính thuế nhập khẩu "+R.m(V)+" đồng. Thuế suất thuế nhập khẩu "+(t*100)+"%. Hàng không chịu thuế tiêu thụ đặc biệt, không chịu thuế bảo vệ môi trường, không có thuế nhập khẩu bổ sung. Thuế GTGT áp dụng 10% (bài tập).","Công ty muốn được thông quan ngay, có thư bảo lãnh ngân hàng."],
   stages:[
    {type:"num",q:"Thuế nhập khẩu phải nộp (đồng)?",ans:nk,unit:"đồng",e:R.m(V)+" × "+(t*100)+"% = "+R.m(nk)+" đồng."},
    {type:"num",q:"Giá tính thuế GTGT của hàng nhập khẩu (đồng)?",ans:base,unit:"đồng",e:"Giá tính thuế GTGT hàng nhập khẩu = trị giá tính thuế nhập khẩu + thuế nhập khẩu (+ các thuế khác nếu có) = "+R.m(V)+" + "+R.m(nk)+" = "+R.m(base)+" đồng (Luật GTGT Điều 7 khoản 1 điểm b)."},
    {type:"num",q:"Thuế GTGT hàng nhập khẩu phải nộp (đồng)?",ans:gtgt,unit:"đồng",e:"10% × "+R.m(base)+" = "+R.m(gtgt)+" đồng."},
    simMC("Thuế GTGT nộp ở khâu nhập khẩu đủ điều kiện sẽ được:","Khấu trừ khi kê khai (Nợ 133) nếu hàng dùng cho hoạt động chịu thuế và có chứng từ nộp thuế GTGT khâu nhập khẩu",["Tính vào chi phí không được khấu trừ","Được hoàn ngay","Không cần chứng từ"],"Luật GTGT Điều 14 khoản 2 điểm a: chứng từ nộp thuế GTGT ở khâu nhập khẩu là một căn cứ khấu trừ.")],
   law:"Luật GTGT (VBHN 114) Điều 7 khoản 1 điểm b, Điều 14; Luật Thuế xuất khẩu, thuế nhập khẩu Điều 9",
   lesson:"Hàng nhập khẩu: thuế nhập khẩu tính trên trị giá, GTGT tính trên (trị giá + thuế nhập khẩu + thuế khác nếu có).",
   warn:"Thuế suất thuế nhập khẩu, thuế GTGT giảm theo chính sách và ưu đãi hiệp định là các biểu thuế do Chính phủ ban hành: đối chiếu văn bản hiện hành."};}}

);
