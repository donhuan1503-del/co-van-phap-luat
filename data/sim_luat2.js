/* Tình huống LAO ĐỘNG - BHXH đã đối chiếu nguyên văn BLLĐ 2019 và Luật BHXH 2024. Nạp sau sim_luat.js. */
SCEN.push(

{id:"l_tro_cap",role:"Chuyên viên nhân sự - lao động",topic:"ld",level:2,make:function(R){
  var nam=R.int(5,14),bhtn=R.int(1,Math.min(5,nam-1)),luong=R.step(10e6,30e6,1e6),tc=Math.round((nam-bhtn)*0.5*luong);
  return {title:"Tính trợ cấp thôi việc khi hết hạn hợp đồng",
   facts:[R.co()+" không gia hạn hợp đồng của nhân viên "+R.pick(SIM_PERSON)+".","Nhân viên làm việc thực tế "+nam+" năm, đã tham gia bảo hiểm thất nghiệp "+bhtn+" năm; lương bình quân 06 tháng liền kề "+R.m(luong)+" đồng."],
   stages:[
    simMC("Hợp đồng hết hạn có phải trả trợ cấp thôi việc không?","Có, người làm từ đủ 12 tháng (trừ khi đủ điều kiện hưởng lương hưu)",["Không, vì hết hạn tự nhiên","Chỉ trả khi nhân viên yêu cầu","Chỉ trả nếu công ty có lãi"],"Điều 46 khoản 1 áp dụng cho khoản 1 Điều 34 (hết hạn hợp đồng)."),
    {type:"num",q:"Trợ cấp thôi việc (đồng)?",ans:tc,unit:"đồng",e:"("+nam+" − "+bhtn+") × 1/2 × "+R.m(luong)+" = "+R.m(tc)+" đồng (Điều 46)."},
    simMC("Thời hạn thanh toán các khoản tiền khi chấm dứt hợp đồng?","14 ngày làm việc kể từ ngày chấm dứt",["03 ngày","30 ngày","90 ngày"],"Điều 48 khoản 1; kéo dài tối đa 30 ngày trong các trường hợp luật liệt kê.")],
   law:"Điều 34, 46, 48 BLLĐ 2019",
   lesson:"Công thức: (tổng thời gian làm việc − thời gian đóng BHTN − thời gian đã chi trả trợ cấp) × 1/2 tháng lương bình quân 06 tháng.",
   warn:"Người đủ điều kiện hưởng lương hưu và người bị chấm dứt vì tự ý bỏ việc 05 ngày liên tục không được trợ cấp thôi việc."};}},

{id:"l_ky_luat_trinh_tu",role:"Chuyên viên nhân sự - lao động",topic:"ld",level:3,make:function(R){
  var ngay=R.int(6,12),bien=R.pick(["nữ lao động mang thai ở tháng thứ 5","nhân viên đang nghỉ ốm có giấy xác nhận","nhân viên đang nghỉ phép năm"]);
  return {title:"Sa thải khi người lao động đang có thời gian không được xử lý kỷ luật",
   facts:["Nhân viên của "+R.co()+" bị phát hiện tự ý bỏ việc "+ngay+" ngày cộng dồn trong 30 ngày, không lý do chính đáng.","Hiện nhân viên đang là: "+bien+". Công ty muốn họp xử lý kỷ luật sa thải ngay."],
   stages:[
    simMC("Hành vi bỏ việc trên có đủ căn cứ sa thải theo Điều 125?","Có, vì từ 05 ngày cộng dồn trong 30 ngày không lý do chính đáng",["Không, phải đủ 15 ngày","Không, phải nghỉ liên tục","Không, chỉ khiển trách"],"Điều 125 khoản 4."),
    simMC("Có được xử lý kỷ luật ngay lúc này không?","Không được xử lý trong thời gian này; chờ hết thời gian rồi xử lý, thời hiệu có thể kéo dài tối đa 60 ngày",["Được xử lý ngay","Chỉ được khiển trách","Được xử lý nếu có đại diện công đoàn"],"Điều 122 khoản 4 và Điều 123 khoản 2."),
    simMC("Điều kiện bắt buộc của buổi họp kỷ luật?","Có đại diện tổ chức đại diện người lao động, người lao động có mặt và được tự bào chữa, lập biên bản",["Chỉ cần quản lý trực tiếp","Họp vắng mặt vẫn hợp lệ","Chỉ cần gửi email thông báo"],"Điều 122 khoản 1.")],
   law:"Điều 122, 123, 125 BLLĐ 2019",
   lesson:"Hai lớp kiểm tra: (1) căn cứ có đúng Điều 125? (2) người lao động có đang thuộc diện không được xử lý? Rồi mới đến trình tự.",
   warn:"Sa thải trái luật phải nhận lại, trả lương và bồi thường ít nhất 02 tháng lương (Điều 41)."};}},

{id:"l_lam_them",role:"Chuyên viên nhân sự - lao động",topic:"ld",level:2,make:function(R){
  var ls=R.step(30,80,5)*1000,g1=R.int(4,16),g2=R.int(2,8),g3=R.int(2,8);
  var tong=Math.round(ls*(g1*1.5+g2*2+g3*3));
  return {title:"Tính tiền làm thêm giờ trong tháng",
   facts:["Công nhân "+R.co()+" hưởng lương giờ "+R.m(ls)+" đồng. Trong tháng làm thêm: "+g1+" giờ ngày thường, "+g2+" giờ ngày nghỉ hằng tuần, "+g3+" giờ ngày lễ (chưa kể lương ngày lễ)."],
   stages:[
    {type:"num",q:"Tiền làm thêm tối thiểu trong tháng (đồng)?",ans:tong,unit:"đồng",e:ls+" × ("+g1+"×1,5 + "+g2+"×2 + "+g3+"×3) = "+R.m(tong)+" đồng (Điều 98)."},
    simMC("Giới hạn giờ làm thêm tối đa trong 01 tháng (ngành thông thường)?","40 giờ",["30 giờ","60 giờ","72 giờ"],"Điều 107 khoản 2 điểm b."),
    simMC("Tổng giờ làm thêm cả năm tối đa; riêng ngành dệt may, da giày?","200 giờ; ngành dệt may, da giày tối đa 300 giờ và phải thông báo cho cơ quan lao động cấp tỉnh",["150 giờ; 200 giờ","300 giờ; 400 giờ","Không giới hạn"],"Điều 107 khoản 2 điểm c, khoản 3, khoản 4.")],
   law:"Điều 98, 107 BLLĐ 2019",
   lesson:"Lương làm thêm: 150% - 200% - 300%; kiểm soát giờ làm thêm theo tháng và năm cho từng người.",
   warn:"Làm thêm giờ ban đêm còn cộng 30% và 20% theo Điều 98 khoản 2, 3."};}},

{id:"l_bhxh_thai_san",role:"Chuyên viên nhân sự - lao động",topic:"ld",level:2,make:function(R){
  var th=R.int(3,12),pt=R.pick(["sinh thường (con thứ nhất)","phải phẫu thuật","sinh đôi","sinh con thứ hai (từ 01/7/2026)"]);
  var ngay=pt.indexOf("thường")>=0?5:(pt==="phải phẫu thuật"?7:10);
  var dk=th>=6;
  return {title:"Chế độ thai sản của lao động nam khi vợ sinh",
   facts:["Anh Nam làm tại "+R.co()+", đã đóng BHXH bắt buộc "+th+" tháng trong 12 tháng liền kề trước khi vợ sinh con.","Vợ "+pt+"."],
   stages:[
    simMC("Số ngày làm việc được nghỉ hưởng thai sản của anh Nam?",ngay+" ngày làm việc",[(ngay+2)+" ngày",(ngay-2>0?ngay-2:3)+" ngày","14 ngày"],"Điều 53 khoản 2: 05 ngày (thường); 07 ngày (phẫu thuật hoặc dưới 32 tuần); 10 ngày (sinh đôi hoặc sinh con thứ hai theo bản hợp nhất 2026)."),
    simMC("Ngày bắt đầu nghỉ phải trong khoảng nào?","Trong 60 ngày kể từ ngày vợ sinh con",["15 ngày","30 ngày","90 ngày"],"Điều 53 khoản 3."),
    simMC(dk?"Điều kiện đóng BHXH đã đủ chưa?":"Điều kiện đóng BHXH đã đủ chưa?",dk?"Đủ: có từ đủ 06 tháng đóng BHXH bắt buộc trong 12 tháng liền kề":"Chưa đủ: cần từ đủ 06 tháng trong 12 tháng liền kề trước khi sinh",dk?["Chưa đủ vì cần 12 tháng","Chưa đủ vì cần 24 tháng","Không cần điều kiện"]:["Đủ vì có 03 tháng","Đủ vì đang làm việc","Không cần điều kiện"],"Điều 50 khoản 1 điểm g, khoản 2.")],
   law:"Điều 50, 53 Luật BHXH 41/2024/QH15",
   lesson:"Nam: 05/07/10 (và 14 ngày nếu sinh đôi phẫu thuật), bắt đầu nghỉ trong 60 ngày; điều kiện 06 tháng đóng trong 12 tháng liền kề.",
   warn:"Mức hưởng bằng 100% bình quân lương đóng BHXH 06 tháng gần nhất (Điều 59)."};}}

);
