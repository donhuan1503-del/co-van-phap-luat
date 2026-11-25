/* TÌNH HUỐNG NGHỊ ĐỊNH THUẾ (đối chiếu nguyên văn NĐ 398/2026, 252/2026, 181/2025, 253/2026). */
SCEN.push(

{id:"l_giam30_tndn",role:"Pháp chế doanh nghiệp",topic:"th",level:3,make:function(R){
  var ban=R.step(6000e6,10200e6,100e6),tc=R.pick([0,20e6,60e6,150e6]),tk=R.pick([0,50e6,120e6,300e6]),gt=R.pick([0,30e6,80e6]);
  var rev=ban-gt+tc+tk,ok=rev<=10000e6,T=R.step(120e6,520e6,10e6),red=ok?Math.round(T*0.3):0,pay=T-red;
  return {title:"Giảm 30% thuế TNDN năm 2026 theo NĐ 398/2026",
   facts:["Doanh nghiệp Việt Nam nộp thuế TNDN năm 2026: doanh thu bán hàng, dịch vụ "+R.m(ban)+" đồng, các khoản giảm trừ doanh thu "+R.m(gt)+" đồng, doanh thu hoạt động tài chính "+R.m(tc)+" đồng, thu nhập khác "+R.m(tk)+" đồng.","Thuế TNDN phải nộp của năm 2026 (đã trừ ưu đãi, nếu có) là "+R.m(T)+" đồng."],
   stages:[
    {type:"num",q:"Doanh thu để xét điều kiện 10 tỷ đồng (đồng)?",ans:rev,unit:"đồng",e:"Bán hàng, dịch vụ trừ giảm trừ doanh thu, cộng doanh thu tài chính và thu nhập khác: "+R.m(ban)+" - "+R.m(gt)+" + "+R.m(tc)+" + "+R.m(tk)+" = "+R.m(rev)+" đồng (NĐ 398/2026 Điều 3 khoản 3)."},
    simMC("Doanh nghiệp có được giảm 30% thuế TNDN năm 2026 không?",ok?"Có: doanh thu không quá 10 tỷ đồng":"Không: doanh thu vượt 10 tỷ đồng",ok?["Không, vì phải dưới 05 tỷ đồng","Chỉ được nếu có ưu đãi","Không, vì chỉ áp dụng doanh nghiệp mới thành lập"]:["Có, vì chỉ tính doanh thu bán hàng","Có, vì còn nợ thuế","Có, giảm 15%"],"So sánh "+R.m(rev)+" đồng với 10 tỷ đồng (NĐ 398/2026 Điều 3)."),
    {type:"num",q:"Số thuế TNDN thực nộp sau khi áp dụng quy định giảm thuế (đồng)?",ans:pay,unit:"đồng",e:ok?"Giảm 30% = "+R.m(red)+" đồng; thực nộp "+R.m(T)+" - "+R.m(red)+" = "+R.m(pay)+" đồng.":"Không được giảm nên nộp đủ "+R.m(T)+" đồng."}],
   law:"NĐ 398/2026/NĐ-CP Điều 3; Nghị quyết 43/2026/QH16",
   lesson:"Điều kiện 10 tỷ tính cả doanh thu tài chính và thu nhập khác; giảm 30% tính trên số thuế sau ưu đãi.",
   warn:"Nếu tạm nộp theo mức đã giảm mà cuối năm vượt 10 tỷ: nộp đủ số thiếu, tiền chậm nộp theo khoản 3 Điều 24 NĐ 252/2026."};}},

{id:"l_tam_nop_80",role:"Pháp chế doanh nghiệp",topic:"th",level:2,make:function(R){
  var T=R.step(300e6,1200e6,10e6),f=R.pick([0.55,0.7,0.78,0.8,0.85,0.95]),paid=Math.round(T*f/1e6)*1e6,min=Math.round(T*0.8),short=Math.max(0,min-paid);
  return {title:"Tạm nộp thuế TNDN 04 quý và mức tối thiểu 80%",
   facts:["Doanh nghiệp kê khai quyết toán thuế TNDN năm 2026 phải nộp "+R.m(T)+" đồng.","Tổng số đã tạm nộp của 04 quý năm 2026 là "+R.m(paid)+" đồng."],
   stages:[
    {type:"num",q:"Mức tạm nộp tối thiểu 04 quý theo NĐ 252/2026 Điều 24 (đồng)?",ans:min,unit:"đồng",e:"80% × "+R.m(T)+" = "+R.m(min)+" đồng."},
    {type:"num",q:"Số tiền nộp thiếu so với mức tối thiểu (đồng, nhập 0 nếu không thiếu)?",ans:short,unit:"đồng",e:short>0?R.m(min)+" - "+R.m(paid)+" = "+R.m(short)+" đồng.":"Đã tạm nộp từ mức tối thiểu trở lên nên không thiếu."},
    simMC("Doanh nghiệp có bị tính tiền chậm nộp theo Điều 24 không?",short>0?"Có: tính trên số thiếu từ ngày liền sau hạn tạm nộp quý 04 đến ngày nộp đủ":"Không: tổng tạm nộp đã đạt 80%",short>0?["Không, vì quyết toán nộp sau","Có, tính trên toàn bộ số thuế","Chỉ bị phạt không tính chậm nộp"]:["Có, tính trên số quyết toán","Có, vì hạn là 20 tháng sau","Có nếu tạm nộp quý IV muộn"],"So "+R.m(paid)+" với "+R.m(min)+" đồng; còn phải nộp phần quyết toán còn lại đúng hạn quyết toán.")],
   law:"NĐ 252/2026/NĐ-CP Điều 24 khoản 3",
   lesson:"Dự phóng lợi nhuận sát thực tế để tổng tạm nộp 04 quý không thấp hơn 80% số quyết toán.",
   warn:"Quyết toán xong mà bị truy thu tăng: tiền chậm nộp theo khoản 2 Điều 26 NĐ 252/2026 (chưa đọc nội dung điều này)."};}},

{id:"l_chung_tu_5tr",role:"Pháp chế doanh nghiệp",topic:"th",level:2,make:function(R){
  var base=R.step(3.9e6,6.2e6,0.1e6),rate=0.1,vat=Math.round(base*rate),gross=base+vat,cash=R.pick([true,false]);
  var must=gross>=5e6,ded=(must&&cash)?0:vat;
  return {title:"Khấu trừ VAT đầu vào và ngưỡng 05 triệu đồng",
   facts:["Doanh nghiệp mua hàng hóa giá chưa VAT "+R.m(base)+" đồng, thuế suất VAT 10%, có hóa đơn hợp lệ.","Hình thức thanh toán: "+(cash?"tiền mặt cho người bán":"chuyển khoản từ tài khoản của doanh nghiệp tới tài khoản người bán")+"."],
   stages:[
    {type:"num",q:"Giá thanh toán đã gồm VAT (đồng)?",ans:gross,unit:"đồng",e:R.m(base)+" + "+R.m(vat)+" = "+R.m(gross)+" đồng."},
    simMC("Khoản mua này có thuộc diện phải có chứng từ thanh toán không dùng tiền mặt không?",must?"Có: giá đã gồm VAT từ 05 triệu đồng trở lên":"Không: giá đã gồm VAT dưới 05 triệu đồng",must?["Không, vì giá chưa thuế dưới 05 triệu","Chỉ khi trên 20 triệu","Chỉ khi hàng nhập khẩu"]:["Có, vì có hóa đơn","Có, vì thuế suất 10%","Có với mọi khoản mua"],"Ngưỡng tính trên giá ĐÃ gồm VAT (NĐ 181/2025 Điều 26)."),
    {type:"num",q:"Số VAT đầu vào được khấu trừ (đồng)?",ans:ded,unit:"đồng",e:ded>0?"Đủ điều kiện, được khấu trừ "+R.m(vat)+" đồng.":"Từ 05 triệu mà trả tiền mặt nên không được khấu trừ "+R.m(vat)+" đồng (phần này không đủ điều kiện, cũng xem xét chi phí TNDN)."}],
   law:"NĐ 181/2025/NĐ-CP Điều 26; Luật GTGT Điều 14",
   lesson:"Ngưỡng 05 triệu tính trên giá đã gồm VAT của từng hàng hóa, dịch vụ mua vào; tiền mặt nộp vào tài khoản bên bán không được tính.",
   warn:"Khoản thanh toán qua bên thứ ba, bù trừ, vay mượn có điều kiện riêng tại khoản 2 Điều 26; NĐ 144/2026 chưa đọc."};}},

{id:"l_giam_tru_yte_gd",role:"Pháp chế doanh nghiệp",topic:"th",level:2,make:function(R){
  var yt=R.step(8e6,40e6,1e6),gd=R.step(10e6,45e6,1e6),other=R.pick([false,false,true]),yd=other?0:Math.min(yt,23e6),gdd=Math.min(gd,24e6);
  return {title:"Giảm trừ chi y tế, giáo dục khi quyết toán TNCN",
   facts:["Người lao động cư trú, có hóa đơn đúng tên người phụ thuộc, chi khám chữa bệnh trong nước thuộc danh mục bảo hiểm y tế chi trả (có bảng kê) "+R.m(yt)+" đồng"+(other?", nhưng toàn bộ khoản này do công ty trả thay":"")+".","Chi học phí giáo dục - đào tạo trong nước "+R.m(gd)+" đồng, hóa đơn đúng tên, không có nguồn khác chi trả."],
   stages:[
    {type:"num",q:"Mức giảm trừ chi y tế được tính (đồng)?",ans:yd,unit:"đồng",e:other?"Khoản chi do nguồn khác trả thay nên không được giảm trừ (Điều 49 khoản 3 điểm c).":"Tối đa 23 triệu đồng/năm: min("+R.m(yt)+"; 23.000.000) = "+R.m(yd)+" đồng."},
    {type:"num",q:"Mức giảm trừ chi giáo dục được tính (đồng)?",ans:gdd,unit:"đồng",e:"Tối đa 24 triệu đồng/năm: min("+R.m(gd)+"; 24.000.000) = "+R.m(gdd)+" đồng."},
    {type:"num",q:"Tổng hai khoản giảm trừ (đồng)?",ans:yd+gdd,unit:"đồng",e:R.m(yd)+" + "+R.m(gdd)+" = "+R.m(yd+gdd)+" đồng."}],
   law:"NĐ 253/2026/NĐ-CP Điều 49 khoản 2, 3",
   lesson:"Giảm trừ y tế tối đa 23 triệu, giáo dục tối đa 24 triệu; chứng từ đúng tên, không nguồn khác chi hộ.",
   warn:"Chỉ giảm trừ vào thu nhập từ tiền lương, tiền công của cá nhân cư trú; các điều kiện khác ở Luật TNCN và Điều 48, 49 đầy đủ."};}}

);
