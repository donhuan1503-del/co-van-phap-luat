/* TÌNH HUỐNG BỒI THƯỜNG, GIÁ ĐẤT (đối chiếu nguyên văn NĐ 88/2024, 71/2024, 226/2025). */
SCEN.push(

{id:"l_dd_ho_tro_doi_song",role:"Pháp chế doanh nghiệp",topic:"dd",level:3,make:function(R){
  var pct=R.pick([20,40,55,65,75,85]),move=R.int(0,1)===1,far=move&&R.int(0,1)===1,n=R.int(2,6),gao=R.step(15000,26000,1000);
  var mo,over=pct>70,under=pct<30;
  if(under)mo=0;else if(!over)mo=move?(far?24:12):6;else mo=move?(far?36:24):12;
  var txt=under?"UBND cấp tỉnh quyết định":mo+" tháng";
  var tien=mo*n*30*gao;
  return {title:"Hỗ trợ ổn định đời sống khi thu hồi đất nông nghiệp",
   facts:["Hộ gia đình "+n+" nhân khẩu (có chung quyền sử dụng đất) bị thu hồi "+pct+"% diện tích đất nông nghiệp đang sử dụng, đủ điều kiện được bồi thường về đất.",move?("Hộ phải di chuyển chỗ ở"+(far?", chuyển đến vùng có điều kiện kinh tế - xã hội đặc biệt khó khăn (tính theo mức hỗ trợ tối đa)":"")+"."):"Hộ không phải di chuyển chỗ ở.","Giá gạo trung bình tại thời điểm hỗ trợ của địa phương "+R.m(gao)+" đồng/kg."],
   stages:under?[
    simMC("Hộ bị thu hồi dưới 30% đất nông nghiệp thì mức và thời gian hỗ trợ do ai quyết định?","UBND cấp tỉnh quyết định, không vượt mức quy định ở khoản 1 Điều 19",["Cố định 06 tháng","Do chủ đầu tư dự án","Hộ tự thỏa thuận"],"NĐ 88/2024 Điều 19 khoản 2.")]:[
    simMC("Thời gian hỗ trợ ổn định đời sống áp dụng cho hộ này là:",mo+" tháng",R.shuf([6,12,24,36].filter(function(x){return x!==mo;})).slice(0,3).map(function(x){return x+" tháng";}),"Điều 19 khoản 1 điểm a: thu hồi "+(over?"trên 70%":"từ 30% đến 70%")+(move?", phải di chuyển":", không di chuyển")+(far?", đến vùng khó khăn (mức tối đa)":"")+"."),
    {type:"num",q:"Tổng tiền hỗ trợ ổn định đời sống của hộ (đồng)?",ans:tien,unit:"đồng",e:n+" nhân khẩu × 30 kg × "+R.m(gao)+" đồng × "+mo+" tháng = "+R.m(tien)+" đồng (Điều 19 khoản 1 điểm c)."}],
   law:"NĐ 88/2024/NĐ-CP Điều 19; NĐ 226/2025/NĐ-CP Điều 2 khoản 4",
   lesson:"Xác định ba yếu tố: tỷ lệ thu hồi (30%/70%), có di chuyển hay không, vùng đến; rồi nhân nhân khẩu × 30 kg gạo × giá gạo × số tháng.",
   warn:"Bài giả định diện tích tính theo xã, theo dự án và số nhân khẩu đã xác định đúng; mức vùng khó khăn là mức tối đa nên bài dùng đúng mức tối đa."};}},

{id:"l_dd_ho_tro_skd",role:"Pháp chế doanh nghiệp",topic:"dd",level:3,make:function(R){
  var a=R.step(180,520,10)*1e6,b=R.step(180,520,10)*1e6,c=R.step(180,520,10)*1e6,avg=Math.round((a+b+c)/3),sup=Math.round(avg*0.3);
  var p1=R.step(50,300,10)*1e6,T1=R.pick([30,40,50]),T2=R.int(10,T1-5),P=Math.round(p1*T2/T1);
  return {title:"Hỗ trợ ổn định sản xuất kinh doanh và chi phí đầu tư vào đất còn lại",
   facts:["Công ty bị ngừng sản xuất, kinh doanh do Nhà nước thu hồi đất, đủ điều kiện được bồi thường về đất. Thu nhập sau thuế 03 năm liền kề trước đó: "+R.m(a)+", "+R.m(b)+", "+R.m(c)+" đồng.","Chi phí san lấp mặt bằng đã đầu tư vào đất (quy đổi theo giá thị trường, chưa có chi phí P2, P3, P4): "+R.m(p1)+" đồng; thời hạn sử dụng đất "+T1+" năm, còn lại "+T2+" năm."],
   stages:[
    {type:"num",q:"Thu nhập sau thuế bình quân 03 năm (đồng)?",ans:avg,unit:"đồng",e:"("+R.m(a)+" + "+R.m(b)+" + "+R.m(c)+") ÷ 3 = "+R.m(avg)+" đồng."},
    {type:"num",q:"Mức hỗ trợ ổn định sản xuất, kinh doanh bằng tiền cao nhất (đồng)?",ans:sup,unit:"đồng",e:"30% × "+R.m(avg)+" = "+R.m(sup)+" đồng (Điều 20 khoản 3 điểm b)."},
    {type:"num",q:"Chi phí đầu tư vào đất còn lại P (đồng)?",ans:P,unit:"đồng",e:"P = "+R.m(p1)+" × "+T2+" ÷ "+T1+" = "+R.m(P)+" đồng (Điều 17 khoản 4, NĐ 226/2025)."},
    simMC("Khoản P và khoản hỗ trợ ổn định sản xuất có được trừ vào tiền sử dụng đất, tiền thuê đất còn nợ không?","Chỉ P (chi phí đầu tư vào đất còn lại) được trừ; khoản hỗ trợ không được trừ",["Cả hai được trừ","Cả hai không được trừ","Chỉ khoản hỗ trợ được trừ"],"NĐ 88/2024 Điều 25 khoản 1 điểm c.")],
   law:"NĐ 88/2024/NĐ-CP Điều 17, 20, 25; NĐ 226/2025/NĐ-CP Điều 2",
   lesson:"Hỗ trợ SXKD tối đa 30% thu nhập sau thuế bình quân 03 năm; chi phí đầu tư vào đất còn lại tính theo tỷ lệ thời hạn còn lại; chỉ khoản bồi thường đất và chi phí đầu tư vào đất được trừ nợ tài chính.",
   warn:"Mức thực tế do UBND cấp tỉnh phê duyệt trong phương án; hồ sơ phải chứng minh thu nhập và chi phí."};}},

{id:"l_dd_he_so_gia_dat",role:"Pháp chế doanh nghiệp",topic:"dd",level:3,make:function(R){
  var B=R.step(10,50,1)*1e6,k=R.pick([1.5,1.8,2,2.2,2.5]),m=Math.round(B*k/1e6),ds=[m-4,m-2,m,m+2,m+4].map(function(x){return x*1e6;}),avg=Math.round((ds[0]+ds[1]+ds[2]+ds[3]+ds[4])/5),hs=Math.round(avg/B*100)/100,S=R.step(100,500,50),gia=Math.round(B*hs);
  return {title:"Xác định giá đất theo phương pháp hệ số điều chỉnh giá đất",
   facts:["Giá đất trong Bảng giá đất tại vị trí thửa đất là "+R.m(B)+" đồng/m². Thu thập 05 giá đất thị trường (đã loại giá bất thường): "+ds.map(function(x){return R.m(x);}).join("; ")+" đồng/m².","Thửa đất cần định giá có diện tích "+S+" m²."],
   stages:[
    {type:"num",q:"Giá đất thị trường bình quân tại vị trí (đồng/m²)?",ans:avg,unit:"đồng/m²",e:"Bình quân số học = "+R.m(avg)+" đồng/m² (Điều 7 khoản 3)."},
    simMC("Hệ số điều chỉnh giá đất bằng (làm tròn 2 chữ số thập phân):",String(hs).replace(".",","),[String(Math.round(B/avg*100)/100).replace(".",","),String(Math.round((hs+0.5)*100)/100).replace(".",","),String(Math.round((hs+1)*100)/100).replace(".",",")],"Hệ số = giá thị trường ÷ giá Bảng giá đất = "+R.m(avg)+" ÷ "+R.m(B)+" (Điều 7 khoản 4)."),
    {type:"num",q:"Giá đất của thửa cần định giá = Bảng giá đất × hệ số (đồng/m², làm tròn đồng)?",ans:gia,unit:"đồng/m²",e:R.m(B)+" × "+String(hs).replace(".",",")+" = "+R.m(gia)+" đồng/m² (Điều 7 khoản 5)."}],
   law:"NĐ 71/2024/NĐ-CP Điều 7, 9",
   lesson:"Hệ số = giá thị trường ÷ giá Bảng giá đất; giá thửa đất = giá Bảng giá đất × hệ số; chỉ dùng thông tin đã hoàn thành giao dịch.",
   warn:"Cách chọn và loại thông tin giá, hệ số vùng do cơ quan có thẩm quyền phê duyệt; bài dùng số liệu giả định."};}}

);
