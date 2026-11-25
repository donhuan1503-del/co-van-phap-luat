/* TÌNH HUỐNG GIAO ĐẤT, CHUYỂN MỤC ĐÍCH (đối chiếu nguyên văn NĐ 102/2024 Điều 60, 61, NĐ 226/2025 Điều 4). */
SCEN.push(

{id:"l_dd_nhan_chuyen_nhuong_du_an",role:"Pháp chế doanh nghiệp",topic:"dd",level:2,make:function(R){
  var hanTh=R.pick([6,9,12]),dai=R.int(0,2);
  return {title:"Thỏa thuận nhận quyền sử dụng đất để thực hiện dự án (NĐ 102/2024 Điều 60, 61)",
   facts:["Công ty gửi văn bản đề nghị (Mẫu số 07) và trích lục khu đất cho UBND cấp tỉnh để nhận chuyển nhượng, thuê, góp vốn bằng quyền sử dụng đất thực hiện dự án.","UBND tỉnh chấp thuận và ghi thời hạn hoàn thành thỏa thuận là "+hanTh+" tháng. Đến hết "+hanTh+" tháng, công ty chỉ thỏa thuận được một phần diện tích."],
   stages:[
    {type:"num",q:"UBND tỉnh giao cơ quan quản lý đất đai thẩm định trong không quá bao nhiêu ngày làm việc kể từ ngày nhận văn bản đề nghị?",ans:3,unit:"ngày",e:"Điều 60 khoản 2: không quá 03 ngày làm việc."},
    {type:"num",q:"Thời hạn để cơ quan quản lý đất đai cấp tỉnh có văn bản thẩm định trình UBND tỉnh (ngày)?",ans:15,unit:"ngày",e:"Điều 60 khoản 3: 15 ngày kể từ khi nhận chỉ đạo."},
    {type:"num",q:"Thời hạn tối đa để UBND tỉnh ra văn bản chấp thuận hoặc không chấp thuận sau khi nhận văn bản thẩm định (ngày làm việc)?",ans:5,unit:"ngày",e:"Điều 60 khoản 4: không quá 05 ngày làm việc."},
    {type:"num",q:"Nhà đầu tư được xem xét gia hạn thêm tối đa bao nhiêu tháng (một lần, không quá thời hạn trong văn bản chấp thuận)?",ans:hanTh,unit:"tháng",e:"Điều 61 khoản 1: gia hạn 01 lần, không quá thời gian phải hoàn thành thỏa thuận ghi trong văn bản chấp thuận = "+hanTh+" tháng."},
    simMC("Hết thời hạn gia hạn mà vẫn chưa hoàn thành thỏa thuận toàn bộ, nhà đầu tư có thể:","Đề nghị điều chỉnh phạm vi dự án cho phù hợp phần đã thỏa thuận nếu dự án đủ điều kiện để UBND tỉnh xem xét cho thực hiện",["Gia hạn thêm lần hai không giới hạn","Mặc nhiên được giao toàn bộ khu đất","Thu hồi toàn bộ khu đất ngay"],"Điều 61 khoản 2 điểm a.")],
   law:"NĐ 102/2024/NĐ-CP Điều 60, 61",
   lesson:"Thời hạn: 3 ngày làm việc giao thẩm định, 15 ngày thẩm định, 5 ngày làm việc chấp thuận; gia hạn thỏa thuận một lần.",
   warn:"Phần diện tích đã thỏa thuận mà không đủ điều kiện làm dự án được xử lý theo khoản 3 Điều 61 (một phần chưa đọc hết)."};}},

{id:"l_dd_dau_gia_khong_nop_tien",role:"Pháp chế doanh nghiệp",topic:"dd",level:3,make:function(R){
  var gia=R.step(20,150,5)*1e9,coc=Math.round(gia*0.2),nop=R.int(0,1)===1,thieu=R.step(1,9,1)*1e9;
  return {title:"Trúng đấu giá quyền sử dụng đất nhưng không nộp đủ tiền (NĐ 102/2024 Điều 55, NĐ 226/2025)",
   facts:["Doanh nghiệp nộp tiền đặt trước theo giá khởi điểm khu đất "+R.m(gia)+" đồng và trúng đấu giá.",nop?"Doanh nghiệp nộp đủ tiền trúng đấu giá trong thời hạn ghi trong phương án đấu giá đã được phê duyệt.":"Doanh nghiệp không nộp đủ tiền trúng đấu giá đến hết thời hạn ghi trong phương án; còn thiếu "+R.m(thieu)+" đồng."],
   stages:[
    {type:"num",q:"Tiền đặt trước doanh nghiệp đã nộp (đồng)?",ans:coc,unit:"đồng",e:"20% × "+R.m(gia)+" = "+R.m(coc)+" đồng (Điều 55 khoản 1 điểm c)."},
    simMC("Kể từ khi công bố kết quả trúng đấu giá, tiền đặt trước (và lãi nếu có) được xử lý là:","Chuyển thành tiền đặt cọc để bảo đảm nghĩa vụ tài chính",["Hoàn trả ngay","Tính thành tiền phạt","Sung quỹ của tổ chức đấu giá"],"NĐ 226/2025 Điều 4 khoản 9 điểm e."),
    simMC("Hậu quả đối với doanh nghiệp là:",nop?"Hoàn thành nghĩa vụ; tiếp tục thủ tục giao đất, cho thuê đất":"Quyết định công nhận kết quả trúng đấu giá bị hủy và không được nhận lại tiền đặt cọc",nop?["Bị hủy kết quả","Mất tiền đặt cọc","Phải đấu giá lại"]:["Được hoàn lại tiền đặt cọc","Chỉ bị phạt 5%","Được gia hạn tự động"],"Cơ quan thuế thông báo cho cơ quan quản lý đất đai trình Chủ tịch UBND cấp có thẩm quyền hủy quyết định công nhận khi không nộp đủ (NĐ 226/2025).")],
   law:"NĐ 102/2024/NĐ-CP Điều 55; NĐ 226/2025/NĐ-CP Điều 4 khoản 9",
   lesson:"Tiền đặt trước 20% chuyển thành tiền đặt cọc; không nộp đủ đến hạn thì hủy kết quả và mất cọc.",
   warn:"Cách khấu trừ tiền đặt cọc vào tiền trúng đấu giá phải đọc điểm b khoản 9 Điều 55 (chưa đọc), bài không tính phần này."};}}

);
