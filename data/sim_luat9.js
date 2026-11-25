/* TÌNH HUỐNG NĐ 102/2024 (đối chiếu nguyên văn NĐ 102/2024 Điều 31, 55; NĐ 226/2025). */
SCEN.push(

{id:"l_dd_cham_tien_do",role:"Pháp chế doanh nghiệp",topic:"dd",level:3,make:function(R){
  var kind=R.int(0,2),thang=R.int(13,30);
  var cases=[
   {f:"Chủ đầu tư nhận bàn giao đất trên thực địa, "+thang+" tháng sau vẫn chưa xây dựng hạng mục nào của dự án.",a:"Không đưa đất vào sử dụng 12 tháng liên tục",g:"không quá 24 tháng, tính từ ngày bắt đầu của tháng thứ 13",ok:true,x:"Điều 31 khoản 2 điểm a; NĐ 226/2025 (điểm e khoản 2)"},
   {f:"Dự án đã hết tiến độ đầu tư ghi trong dự án đã "+(R.int(25,40))+" tháng mà chưa hoàn thành toàn bộ công trình.",a:"Chậm tiến độ sử dụng đất 24 tháng",g:"không quá 24 tháng, tính từ ngày bắt đầu của tháng thứ 25 kể từ thời điểm phải kết thúc đầu tư xây dựng",ok:true,x:"Điều 31 khoản 2 điểm b"},
   {f:"Chủ đầu tư đã dùng hết thời gian gia hạn trong quyết định gia hạn mà vẫn chưa hoàn thành toàn bộ công trình.",a:"Hết thời hạn được gia hạn mà vẫn chưa đưa đất vào sử dụng",g:"đã hết thời hạn gia hạn mà đất vẫn chưa đưa vào sử dụng; xử lý tiếp theo Luật Đất đai",ok:false,x:"NĐ 226/2025 Điều 4 khoản 2 điểm b (điểm e khoản 2 Điều 31)"}];
  var c=cases[kind],other=R.pick([10,20,30]);
  return {title:"Gia hạn sử dụng đất khi không đưa đất vào sử dụng hoặc chậm tiến độ",
   facts:[c.f,"Cơ quan nhà nước đã có văn bản xác định hành vi vi phạm; không có sự kiện bất khả kháng."],
   stages:[
    simMC("Trường hợp này được xác định là:",c.a,["Bất khả kháng","Dự án chưa đến hạn sử dụng đất","Dự án đã hoàn thành"],"Điều 31 khoản 2 NĐ 102/2024 và NĐ 226/2025 Điều 4."),
    simMC("Việc gia hạn sử dụng đất đối với trường hợp này là:",c.ok?("Được xem xét gia hạn "+c.g):("Hết thời hạn gia hạn: "+c.g),c.ok?["Không được gia hạn","Gia hạn vô thời hạn","Gia hạn 12 tháng cố định"]:["Được gia hạn thêm 24 tháng","Được miễn mọi nghĩa vụ","Được gia hạn vô thời hạn"],c.x+"."),
    simMC("Nếu sau "+other+" ngày kể từ khi có văn bản xác định vi phạm mà người sử dụng đất không có văn bản đề nghị gia hạn, kết quả là:",other>15?"UBND cấp có thẩm quyền quyết định thu hồi đất (đã quá 15 ngày)":"Chưa quá thời hạn 15 ngày",other>15?["Tự động gia hạn","Chỉ bị nhắc nhở","Phải đấu giá lại"]:["Thu hồi đất ngay","Tự động gia hạn","Phạt tiền"],"Điều 31 khoản 2 điểm d: sau 15 ngày không có văn bản đề nghị gia hạn thì thu hồi.")],
   law:"NĐ 102/2024/NĐ-CP Điều 31; NĐ 226/2025/NĐ-CP Điều 4",
   lesson:"Ba mốc: 12 tháng chưa dùng đất, 24 tháng chậm tiến độ, hết thời gian gia hạn; sau văn bản xác định vi phạm có 15 ngày để đề nghị gia hạn.",
   warn:"Mốc tính tháng cụ thể phải đối chiếu ngày bàn giao đất trên thực địa và tiến độ trong dự án; bài chỉ nhận diện loại trường hợp."};}},

{id:"l_dd_dau_gia_dat_coc",role:"Pháp chế doanh nghiệp",topic:"dd",level:2,make:function(R){
  var gia=R.step(20,200,5)*1e9,coc=Math.round(gia*0.2),grp=R.int(0,1)===1;
  return {title:"Tiền đặt trước và điều kiện tham gia đấu giá quyền sử dụng đất",
   facts:["Khu đất đấu giá để thực hiện dự án có tổng giá trị theo giá khởi điểm "+R.m(gia)+" đồng.",grp?"Một tập đoàn kinh tế có hai công ty con cùng muốn tham gia đấu giá khu đất này.":"Một công ty độc lập đủ điều kiện muốn tham gia đấu giá khu đất này."],
   stages:[
    {type:"num",q:"Tiền đặt trước tổ chức phải nộp (đồng)?",ans:coc,unit:"đồng",e:"20% × "+R.m(gia)+" = "+R.m(coc)+" đồng (Điều 55 khoản 1 điểm c)."},
    simMC(grp?"Hai công ty con trong cùng tập đoàn được tham gia như thế nào?":"Công ty độc lập này, khi tham gia đấu giá, phải đáp ứng:",grp?"Chỉ được cử một công ty thuộc nhóm tham gia theo thỏa thuận":"Điều kiện khoản 3 Điều 125 Luật Đất đai, nộp tiền đặt trước 20%, không thuộc đối tượng bị cấm",grp?["Cả hai cùng tham gia độc lập","Chỉ công ty có vốn lớn hơn","Tập đoàn nộp hai lần tiền đặt trước"]:["Chỉ cần nộp tiền đặt trước 5%","Không cần điều kiện nào","Chỉ cần ý kiến UBND xã"],"Điều 55 khoản 1.")],
   law:"NĐ 102/2024/NĐ-CP Điều 55 khoản 1",
   lesson:"Tiền đặt trước 20% giá khởi điểm; nhóm công ty chỉ cử một công ty tham gia.",
   warn:"Điều kiện chi tiết và phương án đấu giá theo Điều 55 khoản 3, 4 và Điều 125 Luật Đất đai (chưa đọc hết khoản 4 trở đi)."};}}

);
