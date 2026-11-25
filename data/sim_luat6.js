/* TÌNH HUỐNG NGHỊ ĐỊNH ĐẤT ĐAI (đối chiếu nguyên văn NĐ 103/2024, 291/2025, 123/2024, 281/2026). */
SCEN.push(

{id:"l_dd_chuyen_muc_dich",role:"Pháp chế doanh nghiệp",topic:"dd",level:3,make:function(R){
  var S=R.step(80,300,10),Go=R.step(8,40,1)*1e6,Gn=R.step(300,900,50)*1e3,src=R.int(0,2);
  var after=S*Go,before,why;
  if(src===0){before=S*Gn;why="đất nông nghiệp được giao không thu tiền: diện tích × giá đất nông nghiệp";}
  else if(src===1){before=0;why="đất nông nghiệp thuê trả tiền hằng năm: tiền đất trước chuyển bằng 0";}
  else{before=S*Go*R.pick([2,3]);before=Math.min(before,after*1.4);before=Math.round(before);why="giả định tiền đất trước chuyển (đã xác định) cao hơn tiền đất sau";}
  if(src===2){before=Math.round(after*1.2);why="giả định tiền đất trước chuyển là "+R.m(before)+" đồng, lớn hơn tiền đất sau chuyển";}
  var due=Math.max(0,after-before);
  var srcTxt=["Đất nông nghiệp Nhà nước giao không thu tiền sử dụng đất, giá đất nông nghiệp trong Bảng giá đất "+R.m(Gn)+" đồng/m²","Đất nông nghiệp Nhà nước cho thuê trả tiền hằng năm","Đất có tiền đất trước chuyển đã được xác định là "+R.m(before)+" đồng"][src];
  return {title:"Tiền sử dụng đất khi hộ gia đình chuyển mục đích sang đất ở (NĐ 103/2024 Điều 8)",
   facts:["Hộ gia đình được phép chuyển "+S+" m² sang đất ở; giá đất ở trong Bảng giá đất "+R.m(Go)+" đồng/m². Nguồn gốc đất trước chuyển: "+srcTxt+".","Giả định diện tích và giá đất tính tiền sử dụng đất đúng như nêu (không có miễn, giảm)."],
   stages:[
    {type:"num",q:"Tiền sử dụng đất của loại đất sau khi chuyển (đồng)?",ans:after,unit:"đồng",e:S+" × "+R.m(Go)+" = "+R.m(after)+" đồng."},
    {type:"num",q:"Tiền đất trước khi chuyển mục đích (đồng)?",ans:before,unit:"đồng",e:"Trường hợp "+why+": "+R.m(before)+" đồng."},
    {type:"num",q:"Tiền sử dụng đất hộ phải nộp (đồng)?",ans:due,unit:"đồng",e:due>0?R.m(after)+" - "+R.m(before)+" = "+R.m(due)+" đồng.":"Tiền đất sau nhỏ hơn hoặc bằng tiền đất trước nên phải nộp 0 đồng (Điều 8 khoản 1)."}],
   law:"NĐ 103/2024/NĐ-CP Điều 8",
   lesson:"Tiền sử dụng đất chuyển mục đích = tiền đất sau - tiền đất trước; không âm; nguồn gốc đất trước chuyển quyết định cách tính.",
   warn:"Bài giả định giá đất và diện tích đã đúng; thực tế phải xác định giá đất theo Điều 5 và diện tích theo Điều 4 (chưa đọc kỹ)."};}},

{id:"l_dd_cap_gcn_ty_le",role:"Pháp chế doanh nghiệp",topic:"dd",level:3,make:function(R){
  var cases=[
   {n:"sử dụng đất từ trước ngày 18/12/1980, không giấy tờ, không vi phạm; phần diện tích vượt hạn mức công nhận đất ở",p:20,a:"Điều 10 khoản 1 điểm a"},
   {n:"sử dụng đất từ năm 1990 (từ 18/12/1980 đến trước 15/10/1993), không giấy tờ, không vi phạm; phần vượt hạn mức công nhận đất ở",p:40,a:"Điều 10 khoản 2 điểm a"},
   {n:"sử dụng đất từ năm 2000 (từ 15/10/1993 đến trước 01/7/2004), không giấy tờ, không vi phạm; phần vượt hạn mức giao đất ở",p:50,a:"Điều 10 khoản 3 điểm b"},
   {n:"sử dụng đất từ năm 2001 (từ 15/10/1993 đến trước 01/7/2004), không giấy tờ, không vi phạm; phần trong hạn mức giao đất ở",p:20,a:"Điều 10 khoản 3 điểm a"},
   {n:"được giao đất không đúng thẩm quyền, không có giấy tờ chứng minh đã nộp tiền, phần đất ở được cấp Giấy chứng nhận theo điểm a, b khoản 3 Điều 140 Luật Đất đai",p:70,a:"Điều 12 khoản 3 điểm a (sửa đổi bởi NĐ 291/2025)"},
   {n:"sử dụng đất trước 18/12/1980 có vi phạm trước 01/7/2014; phần trong hạn mức công nhận đất ở",p:10,a:"Điều 11 khoản 1 điểm a"}];
  var c=R.pick(cases),S=R.step(40,200,10),G=R.step(6,35,1)*1e6,tien=Math.round(S*G*c.p/100);
  var wr=[10,20,30,40,50,60,70,100].filter(function(x){return x!==c.p;});
  return {title:"Tiền sử dụng đất khi cấp Giấy chứng nhận theo nhóm trường hợp",
   facts:["Hộ gia đình đề nghị cấp Giấy chứng nhận vào mục đích đất ở: "+c.n+".","Diện tích tính tiền sử dụng đất của phần này "+S+" m²; giá đất ở trong Bảng giá đất "+R.m(G)+" đồng/m²."],
   stages:[
    simMC("Tỷ lệ % giá đất ở thu tiền sử dụng đất cho trường hợp này là:",c.p+"%",R.shuf(wr).slice(0,3).map(function(x){return x+"%";}),"Căn cứ NĐ 103/2024 "+c.a+"."),
    {type:"num",q:"Tiền sử dụng đất phải nộp (đồng)?",ans:tien,unit:"đồng",e:S+" × "+R.m(G)+" × "+c.p+"% = "+R.m(tien)+" đồng."}],
   law:"NĐ 103/2024/NĐ-CP "+c.a,
   lesson:"Xác định đúng nhóm hồ sơ và mốc thời gian trước khi áp tỷ lệ phần trăm.",
   warn:"Bài chỉ cho các nhóm đã đọc nguyên văn; hồ sơ thực tế còn phải xác định hạn mức, giấy tờ đã nộp tiền (nếu có thì được trừ hoặc không phải nộp)."};}},

{id:"l_dd_xu_phat_dang_ky",role:"Pháp chế doanh nghiệp",topic:"dd",level:2,make:function(R){
  var org=R.int(0,1)===1,kind=R.int(0,1),lo=kind?1e6:2e6,hi=kind?2e6:3e6,mul=org?2:1;
  var name=kind?"không thực hiện đăng ký đất đai lần đầu":"không thực hiện đăng ký biến động đất đai (nhận chuyển nhượng, tặng cho, thừa kế)";
  return {title:"Xử phạt không đăng ký đất đai (NĐ 123/2024 Điều 16, NĐ 281/2026)",
   facts:[(org?"Một công ty":"Một cá nhân")+" có hành vi "+name+" theo quy định của Luật Đất đai; hành vi còn trong thời hiệu xử phạt.","Không có tình tiết giảm nhẹ, tăng nặng."],
   stages:[
    {type:"num",q:"Mức phạt tiền TỐI THIỂU áp dụng cho chủ thể này (đồng)?",ans:lo*mul,unit:"đồng",e:"Mức đối với cá nhân "+R.m(lo)+" đồng"+(org?", tổ chức gấp 02 lần = "+R.m(lo*mul)+" đồng":"")+"."},
    {type:"num",q:"Mức phạt tiền TỐI ĐA áp dụng cho chủ thể này (đồng)?",ans:hi*mul,unit:"đồng",e:"Mức đối với cá nhân tối đa "+R.m(hi)+" đồng"+(org?", tổ chức gấp 02 lần = "+R.m(hi*mul)+" đồng":"")+"."},
    simMC("Thời hiệu xử phạt vi phạm hành chính trong lĩnh vực đất đai là:","02 năm",["01 năm","03 năm","05 năm"],"NĐ 123/2024 Điều 3 khoản 1."),
    simMC("Biện pháp khắc phục hậu quả đối với hành vi này là:","Buộc thực hiện đăng ký đất đai theo quy định",["Buộc tháo dỡ công trình","Thu hồi đất","Không có biện pháp nào"],"Điều 16 khoản 3.")],
   law:"NĐ 123/2024/NĐ-CP Điều 3, 5, 16; NĐ 281/2026/NĐ-CP Điều 4",
   lesson:"Xác định chủ thể (cá nhân hay tổ chức) rồi nhân hệ số; luôn kèm biện pháp khắc phục.",
   warn:"Mức phạt đối với một số điều khoản không nhân đôi cho tổ chức (xem Điều 5 khoản 2); hành vi khác ngoài Điều 16 cần tra riêng."};}}

);
