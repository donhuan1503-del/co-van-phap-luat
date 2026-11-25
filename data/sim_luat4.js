/* TÌNH HUỐNG theo NGHỊ ĐỊNH hướng dẫn đã đối chiếu nguyên văn: NĐ 214/2025 và NĐ 349/2026 (đấu thầu), NĐ 68/2026 và NĐ 141/2026 (hộ kinh doanh),
   NĐ 169/2026 (xử phạt hải quan), NĐ 96/2026 (thủ tục đầu tư). */
SCEN.push(

{id:"l_chi_dinh_thau",role:"Pháp chế doanh nghiệp",topic:"dth",level:3,make:function(R){
  var kinds=[{n:"dịch vụ tư vấn thuộc dự án",max:3e9,old:800e6},{n:"xây lắp thuộc dự án",max:5e9,old:2e9},{n:"mua sắm hàng hóa thuộc dự án",max:5e9,old:2e9},{n:"mua sắm thuộc dự toán mua sắm không hình thành dự án",max:1e9,old:500e6}];
  var k=R.pick(kinds),mode=R.int(0,2),g;
  if(mode===0)g=R.step(Math.round(k.old/1e6)+100,Math.round(k.max/1e6)-100,50)*1e6;       // trong hạn mức mới, vượt mức cũ
  else if(mode===1)g=R.step(Math.round(k.max/1e6)+100,Math.round(k.max/1e6)*2,100)*1e6;  // vượt hạn mức
  else g=R.step(Math.round(k.old/1e6)-300,Math.round(k.old/1e6)-50,10)*1e6;                  // dưới cả mức cũ
  var inNew=g<=k.max,inOld=g<=k.old;
  return {title:"Hạn mức chỉ định thầu theo quy định hiện hành",
   facts:["Chủ đầu tư phê duyệt kế hoạch lựa chọn nhà thầu sau ngày 09/9/2026 cho gói thầu "+k.n+", giá gói thầu "+R.m(g)+" đồng.","Gói thầu không thuộc các trường hợp chỉ định thầu cấp bách, khẩn cấp hay đặc thù khác; chủ đầu tư dự định chỉ định thầu theo hạn mức."],
   stages:[
    simMC("Hạn mức chỉ định thầu hiện hành đối với loại gói thầu này (NĐ 349/2026 sửa Điều 78 NĐ 214/2025) là:",R.m(k.max/1e9)+" tỷ đồng",["Mức cũ "+(k.old>=1e9?R.m(k.old/1e9)+" tỷ đồng":R.m(k.old/1e6)+" triệu đồng"),"10 tỷ đồng","Không có hạn mức"],"Dự toán mua sắm không hình thành dự án: 01 tỷ; tư vấn thuộc dự án: 03 tỷ; phi tư vấn, hàng hóa, xây lắp, hỗn hợp thuộc dự án: 05 tỷ đồng."),
    simMC("Gói thầu giá "+R.m(g)+" đồng có thể chỉ định thầu theo hạn mức hiện hành không?",inNew?"Có, vì không vượt hạn mức hiện hành":"Không, vì vượt hạn mức hiện hành (phải chọn hình thức khác như đấu thầu rộng rãi, chào hàng cạnh tranh...)",inNew?["Không, vì vượt hạn mức","Chỉ được nếu có bảo lãnh","Chỉ được nếu nhà thầu nước ngoài"]:["Có, vì dưới hạn mức mới","Có, nếu nhà thầu tự nguyện","Có nếu chủ đầu tư là doanh nghiệp nhà nước"],"So sánh giá gói thầu với hạn mức: "+R.m(g)+" so với "+R.m(k.max)+" đồng."),
    simMC("Nếu áp dụng nhầm mức cũ của NĐ 214/2025 ban đầu, kết luận về gói thầu này sẽ:",inNew===inOld?"Không khác kết quả":"Khác kết quả: mức cũ cho kết luận "+(inOld?"được chỉ định":"không được chỉ định")+", mức hiện hành cho kết luận "+(inNew?"được chỉ định":"không được chỉ định"),inNew===inOld?["Khác kết quả","Luôn cho kết quả ngược lại","Không thể xác định"]:["Không khác kết quả","Luôn được chỉ định","Luôn không được chỉ định"],"Mức cũ: "+(k.old>=1e9?R.m(k.old/1e9)+" tỷ đồng":R.m(k.old/1e6)+" triệu đồng")+"; mức hiện hành: "+R.m(k.max/1e9)+" tỷ đồng. Luôn dùng hạn mức có hiệu lực tại thời điểm phê duyệt kế hoạch.")],
   law:"NĐ 214/2025/NĐ-CP Điều 78; NĐ 349/2026/NĐ-CP Điều 4 (hiệu lực từ ngày ký 09/9/2026)",
   lesson:"Hạn mức chỉ định thầu do nghị định quy định và thay đổi theo thời gian: xác định đúng văn bản và ngày hiệu lực; vẫn phải đủ điều kiện và lưu hồ sơ.",
   warn:"NĐ 214/2025 còn được sửa bởi NĐ 165/2026 và 170/2026 (chưa đọc nguyên văn); bài chỉ xét hạn mức theo NĐ 349/2026."};}},

{id:"l_hkd_thue_nd68",role:"Pháp chế doanh nghiệp",topic:"th",level:3,make:function(R){
  var Rv=R.step(1100e6,2900e6,100e6),cr=R.pick([0.7,0.8,0.88]),cost=Math.round(Rv*cr/1e6)*1e6,tnA=Rv-cost,taxA=Math.round(tnA*0.15),t=R.pick([0.005,0.02,0.015,0.01]),taxB=Math.round((Rv-1000e6)*t),vat=Math.round(Rv*R.pick([0.01]));
  return {title:"Hộ kinh doanh theo NĐ 68/2026 (đã sửa bởi NĐ 141/2026)",
   facts:["Hộ kinh doanh có đăng ký, doanh thu năm "+R.m(Rv)+" đồng, chi phí hợp lý có chứng từ "+R.m(cost)+" đồng, có sổ sách đầy đủ.","Ngưỡng doanh thu theo NĐ 68/2026 sau khi NĐ 141/2026 thay '500 triệu' thành '01 tỷ đồng'."],
   stages:[
    simMC("Với doanh thu "+R.m(Rv)+" đồng, hộ có thuộc diện không chịu GTGT và không phải nộp TNCN không?","Không: vượt ngưỡng 01 tỷ đồng nên phải nộp GTGT và TNCN",["Có, vì dưới 03 tỷ đồng","Có, vì có sổ sách","Có, vì là hộ đăng ký"],"Điều 3, Điều 4 NĐ 68/2026 (sửa đổi): từ 01 tỷ đồng trở xuống mới không chịu thuế GTGT và không phải nộp TNCN."),
    {type:"num",q:"TNCN theo cách thu nhập tính thuế (doanh thu - chi phí) × 15% (đồng)?",ans:taxA,unit:"đồng",e:"Doanh thu đến 03 tỷ đồng, thuế suất 15% theo Điều 7 khoản 2 Luật TNCN: "+R.m(tnA)+" × 15% = "+R.m(taxA)+" đồng."},
    {type:"num",q:"TNCN theo cách (doanh thu - 01 tỷ) × "+(t*100)+"% (đồng)?",ans:taxB,unit:"đồng",e:"("+R.m(Rv)+" - "+R.m(1000e6)+") × "+(t*100)+"% = "+R.m(taxB)+" đồng (tỷ lệ theo ngành Điều 7 khoản 3 Luật TNCN)."},
    simMC("Hộ này có phải dùng hóa đơn điện tử không?","Có: doanh thu năm trên 01 tỷ đồng phải dùng hóa đơn điện tử có mã của cơ quan thuế hoặc hóa đơn từ máy tính tiền có kết nối dữ liệu",["Không, vì là hộ kinh doanh","Chỉ khi trên 03 tỷ đồng","Chỉ khi có yêu cầu của khách"],"Điều 8 khoản 5 NĐ 68/2026 (sửa đổi bởi NĐ 141/2026)."),
    simMC("Nếu chọn phương pháp theo thu nhập tính thuế, phải giữ phương pháp trong bao lâu?","Ổn định 02 năm liên tục kể từ năm đầu áp dụng",["Chỉ 01 năm","03 năm","Không phải ổn định"],"Điều 4 khoản 5 điểm d NĐ 68/2026.")],
   law:"NĐ 68/2026/NĐ-CP Điều 3, 4, 8; NĐ 141/2026/NĐ-CP Điều 1; Luật TNCN 109/2025 Điều 7",
   lesson:"Hộ kinh doanh vượt 01 tỷ đồng: tính cả hai cách (thu nhập hoặc doanh thu), chú ý ngưỡng 03 tỷ đồng, hóa đơn điện tử và ổn định phương pháp 02 năm.",
   warn:"GTGT của hộ vượt ngưỡng tính theo tỷ lệ % trên doanh thu (xem Luật GTGT Điều 12); kê khai, kỳ khai chi tiết theo các điều khác của NĐ 68/2026 và thông tư."};}},

{id:"l_nd96_dang_ky",role:"Pháp chế doanh nghiệp",topic:"dt",level:2,make:function(R){
  var d=new Date(2026,R.int(0,9),R.int(1,20)),f=function(x){return x.getDate()+"/"+(x.getMonth()+1)+"/"+x.getFullYear();};
  return {title:"Thời hạn cấp Giấy chứng nhận đăng ký đầu tư trực tuyến (NĐ 96/2026)",
   facts:["Nhà đầu tư nộp hồ sơ điện tử có chữ ký số đề nghị cấp Giấy chứng nhận đăng ký đầu tư ngày "+f(d)+" trên Hệ thống thông tin quốc gia về đầu tư. Hồ sơ hợp lệ, đáp ứng điều kiện.","Một dự án khác nộp hồ sơ nhưng còn thiếu thông tin."],
   stages:[
    simMC("Cơ quan đăng ký đầu tư cấp Giấy chứng nhận trong thời hạn:","10 ngày làm việc kể từ ngày nhận hồ sơ hợp lệ",["03 ngày làm việc","15 ngày làm việc","30 ngày"],"Điều 43 khoản 1 điểm đ NĐ 96/2026."),
    simMC("Với hồ sơ còn thiếu, cơ quan đăng ký đầu tư thông báo hoàn thiện trong:","05 ngày làm việc kể từ ngày nhận hồ sơ",["01 ngày làm việc","10 ngày làm việc","15 ngày làm việc"],"Điều 43 khoản 1 điểm d."),
    simMC("Giấy chứng nhận đăng ký đầu tư bị mất, nhà đầu tư nộp văn bản đề nghị. Thời hạn cấp lại là:","03 ngày làm việc kể từ ngày nhận văn bản đề nghị",["10 ngày làm việc","15 ngày làm việc","01 ngày làm việc"],"Điều 44 khoản 1."),
    simMC("Nhà đầu tư không dùng chữ ký số: sau khi được thông báo đủ điều kiện, nếu quá 30 ngày chưa nộp hồ sơ giấy đối chiếu thì:","Hồ sơ đăng ký điện tử không còn hiệu lực",["Vẫn còn hiệu lực","Cấp giấy tự động","Phải nộp phạt"],"Điều 43 khoản 2 điểm e.")],
   law:"NĐ 96/2026/NĐ-CP Điều 43, 44 hướng dẫn Luật Đầu tư 143/2025/QH15",
   lesson:"Thủ tục điện tử: 05 ngày làm việc để bổ sung hồ sơ, 10 ngày làm việc để cấp; không ký số thì có thêm bước nộp hồ sơ giấy trong 30 ngày.",
   warn:"Quy định về thẩm quyền, dự án thủ tục đặc biệt, khu công nghiệp có điều khoản riêng; đọc đủ Điều 36-50."};}}

);
