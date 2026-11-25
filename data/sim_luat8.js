/* TÌNH HUỐNG ĐĂNG KÝ ĐẤT ĐAI, CẤP GCN (đối chiếu nguyên văn NĐ 101/2024 Điều 22, 39). */
SCEN.push(

{id:"l_dd_thoi_han_dang_ky",role:"Pháp chế doanh nghiệp",topic:"dd",level:2,make:function(R){
  var all=[["nhận chuyển nhượng quyền sử dụng đất",10,"Điều 22 khoản 2 điểm a"],["nhận thừa kế quyền sử dụng đất",10,"Điều 22 khoản 2 điểm a"],["đổi tên người sử dụng đất",5,"Điều 22 khoản 2 điểm đ"],["nhận quyền sử dụng đất do xử lý tài sản thế chấp",8,"Điều 22 khoản 2 điểm l"],["thay đổi do thỏa thuận của vợ và chồng",8,"Điều 22 khoản 2 điểm i"],["tách thửa đất",15,"Điều 22 khoản 4"],["đính chính Giấy chứng nhận",10,"Điều 22 khoản 8"],["cấp đổi do Giấy chứng nhận rách",5,"Điều 22 khoản 3 điểm a"]];
  var a=R.pick(all),b=R.pick(all.filter(function(x){return x!==a;})),tot=a[1]+b[1];
  return {title:"Thời hạn giải quyết thủ tục đăng ký đất đai, cấp Giấy chứng nhận",
   facts:["Thủ tục thứ nhất: "+a[0]+". Thủ tục thứ hai (làm sau khi xong thủ tục thứ nhất): "+b[0]+".","Hồ sơ mỗi thủ tục đầy đủ, thống nhất, nộp đúng nơi quy định; không có thời gian được loại trừ."],
   stages:[
    {type:"num",q:"Thời hạn tối đa của thủ tục thứ nhất (ngày làm việc)?",ans:a[1],unit:"ngày",e:a[0]+": "+a[1]+" ngày làm việc ("+a[2]+" NĐ 101/2024)."},
    {type:"num",q:"Thời hạn tối đa của thủ tục thứ hai (ngày làm việc)?",ans:b[1],unit:"ngày",e:b[0]+": "+b[1]+" ngày làm việc ("+b[2]+")."},
    {type:"num",q:"Tổng thời gian tối đa của hai thủ tục nối tiếp (ngày làm việc)?",ans:tot,unit:"ngày",e:a[1]+" + "+b[1]+" = "+tot+" ngày làm việc."}],
   law:"NĐ 101/2024/NĐ-CP Điều 22",
   lesson:"Mỗi loại thủ tục có thời hạn riêng; thời hạn tính từ ngày nhận hồ sơ đầy đủ, thống nhất.",
   warn:"Thời hạn thực tế còn bị ảnh hưởng bởi thời gian không tính (xác định giá đất, ký hợp đồng thuê, niêm yết) và nghĩa vụ tài chính."};}},

{id:"l_dd_mat_gcn",role:"Pháp chế doanh nghiệp",topic:"dd",level:2,make:function(R){
  var isOrg=R.int(0,1)===1,pledged=R.int(0,2)===0;
  return {title:"Cấp lại Giấy chứng nhận bị mất (NĐ 101/2024 Điều 39)",
   facts:[(isOrg?"Một công ty":"Một hộ gia đình")+" làm mất Giấy chứng nhận quyền sử dụng đất và nộp Đơn Mẫu số 11/ĐK để cấp lại.",pledged?"Văn phòng đăng ký đất đai kiểm tra thấy thửa đất hiện đang thế chấp tại tổ chức tín dụng.":"Thửa đất không chuyển quyền và không đang thế chấp."],
   stages:pledged?[
    simMC("Văn phòng đăng ký đất đai xử lý hồ sơ này như thế nào?","Thông báo và trả lại hồ sơ cho người nộp",["Vẫn cấp lại ngay","Cấp lại sau khi xóa thế chấp tự động","Chuyển cho ngân hàng quyết định"],"NĐ 101/2024 Điều 39 khoản 2 điểm b.")]:[
    simMC(isOrg?"Việc thông báo mất Giấy chứng nhận của công ty được thực hiện bằng cách:":"UBND cấp xã niêm yết công khai việc mất Giấy chứng nhận trong:",isOrg?"Đăng tin 03 lần trên phương tiện thông tin đại chúng địa phương trong 15 ngày, chi phí do công ty trả":"15 ngày tại trụ sở UBND cấp xã và điểm dân cư nơi có đất",isOrg?["Niêm yết 15 ngày tại UBND xã","Chỉ gửi văn bản cho cơ quan thuế","Không cần thông báo"]:["07 ngày","10 ngày","30 ngày"],isOrg?"Điều 39 khoản 2 điểm c (tổ chức, người gốc Việt Nam định cư ở nước ngoài).":"Điều 39 khoản 3 điểm a (hộ gia đình, cá nhân)."),
    {type:"num",q:"Thời hạn cấp lại tối đa, không tính thời gian niêm yết, đăng tin (ngày làm việc)?",ans:10,unit:"ngày",e:"Không quá 10 ngày làm việc (Điều 22 khoản 5)."},
    simMC("UBND cấp xã lập biên bản kết thúc niêm yết gửi Văn phòng đăng ký trong:","Không quá 05 ngày kể từ ngày kết thúc niêm yết",["Ngay trong ngày kết thúc","Không quá 10 ngày","Không quá 15 ngày"],"Điều 39 khoản 3 điểm b.")],
   law:"NĐ 101/2024/NĐ-CP Điều 22 khoản 5, Điều 39",
   lesson:"Mất Giấy chứng nhận: kiểm tra thế chấp, chuyển quyền; thông báo khác nhau giữa hộ gia đình, cá nhân và tổ chức; 10 ngày không tính thời gian thông báo.",
   warn:"Trường hợp mất trang bổ sung và các thủ tục đặc thù khác ở khoản 4 trở đi của Điều 39 chưa đọc hết."};}}

);
