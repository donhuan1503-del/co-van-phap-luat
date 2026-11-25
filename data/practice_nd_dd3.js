/* Câu luyện tập ĐĂNG KÝ, CẤP GCN: đối chiếu nguyên văn NĐ 101/2024, 226/2025 (Công báo). Thêm vào CUỐI bảng QUIZ. */
(function(){
function sh(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function uniq(a){var s={},r=[];a.forEach(function(x){if(!s[x]){s[x]=1;r.push(x);}});return r;}
function Q(t,q,right,wrongs,e){wrongs=uniq(wrongs).filter(function(w){return w!==right;});
  var o=sh([{t:right,ok:1}].concat(wrongs.slice(0,3).map(function(w){return {t:w,ok:0};})));
  QUIZ.push({t:t,q:q,o:o.map(function(x){return x.t;}),a:o.findIndex(function(x){return x.ok;}),e:(e||"")+" [đã đối chiếu nguyên văn nghị định đăng Công báo]"});}

Q("dd","Đăng ký đất đai lần đầu: thời gian giải quyết tối đa theo NĐ 101/2024 là:","20 ngày làm việc",["10 ngày làm việc","30 ngày làm việc","15 ngày làm việc"],"NĐ 101/2024 Điều 22 khoản 1.");
Q("dd","Cấp Giấy chứng nhận lần đầu (sau khi đăng ký) tối đa:","03 ngày làm việc",["05 ngày làm việc","10 ngày làm việc","01 ngày làm việc"],"NĐ 101/2024 Điều 22 khoản 1.");
Q("dd","Đăng ký biến động do chuyển nhượng, thừa kế, tặng cho quyền sử dụng đất: tối đa","10 ngày làm việc",["05 ngày làm việc","15 ngày làm việc","20 ngày làm việc"],"NĐ 101/2024 Điều 22 khoản 2 điểm a.");
Q("dd","Đổi tên hoặc thay đổi thông tin về người sử dụng đất: thời gian giải quyết tối đa","05 ngày làm việc",["03 ngày làm việc","10 ngày làm việc","15 ngày làm việc"],"NĐ 101/2024 Điều 22 khoản 2 điểm đ.");
Q("dd","Thay đổi quyền sử dụng đất do thỏa thuận của vợ và chồng hoặc thành viên hộ gia đình: tối đa","08 ngày làm việc",["05 ngày làm việc","10 ngày làm việc","15 ngày làm việc"],"NĐ 101/2024 Điều 22 khoản 2 điểm i.");
Q("dd","Nhận quyền sử dụng đất do xử lý tài sản thế chấp: thời gian đăng ký biến động tối đa","08 ngày làm việc",["03 ngày làm việc","10 ngày làm việc","20 ngày làm việc"],"NĐ 101/2024 Điều 22 khoản 2 điểm l.");
Q("dd","Thay đổi hạn chế quyền sử dụng đất hoặc quyền đối với thửa đất liền kề: tối đa","07 ngày làm việc",["05 ngày làm việc","10 ngày làm việc","15 ngày làm việc"],"NĐ 101/2024 Điều 22 khoản 2 điểm e.");
Q("dd","Xóa ghi nợ tiền sử dụng đất, lệ phí trước bạ: thời gian giải quyết là:","Trong ngày làm việc nhận đủ hồ sơ (nhận sau 15 giờ có thể giải quyết ngày làm việc tiếp theo)",["03 ngày làm việc","05 ngày làm việc","10 ngày làm việc"],"NĐ 101/2024 Điều 22 khoản 2 điểm o.");
Q("dd","Tách thửa đất, hợp thửa đất: thời gian thực hiện tối đa","15 ngày làm việc",["10 ngày làm việc","20 ngày làm việc","05 ngày làm việc"],"NĐ 101/2024 Điều 22 khoản 4.");
Q("dd","Cấp lại Giấy chứng nhận do mất: tối đa 10 ngày làm việc, và thời gian niêm yết:","Không tính vào thời gian 10 ngày",["Tính vào thời gian 10 ngày","Chỉ tính với tổ chức","Chỉ tính với hộ gia đình"],"NĐ 101/2024 Điều 22 khoản 5.");
Q("dd","Cấp đổi Giấy chứng nhận do ố, nhòe, rách, hư hỏng: thời gian tối đa","05 ngày làm việc",["10 ngày làm việc","15 ngày làm việc","03 ngày làm việc"],"NĐ 101/2024 Điều 22 khoản 3 điểm a, Điều 38 khoản 1 điểm b.");
Q("dd","Cấp đổi do đo đạc làm thay đổi kích thước, diện tích mà ranh giới không đổi (điểm i): tối đa","10 ngày làm việc",["05 ngày làm việc","15 ngày làm việc","20 ngày làm việc"],"NĐ 101/2024 Điều 22 khoản 3 điểm b.");
Q("dd","Đính chính Giấy chứng nhận đã cấp: thời gian tối đa","10 ngày làm việc",["05 ngày làm việc","15 ngày làm việc","20 ngày làm việc"],"NĐ 101/2024 Điều 22 khoản 8.");
Q("dd","Thu hồi và hủy Giấy chứng nhận đã cấp: thời gian tối đa","25 ngày làm việc",["10 ngày làm việc","15 ngày làm việc","30 ngày làm việc"],"NĐ 101/2024 Điều 22 khoản 9.");
Q("dd","Xác định lại diện tích đất ở: thời gian tối đa","20 ngày làm việc",["10 ngày làm việc","15 ngày làm việc","30 ngày làm việc"],"NĐ 101/2024 Điều 22 khoản 7.");
Q("dd","UBND cấp xã niêm yết công khai việc mất Giấy chứng nhận trong:","15 ngày",["07 ngày","10 ngày","30 ngày"],"NĐ 101/2024 Điều 39 khoản 3 điểm a.");
Q("dd","Sau khi kết thúc niêm yết mất Giấy chứng nhận, UBND cấp xã lập biên bản kết thúc niêm yết gửi Văn phòng đăng ký đất đai trong:","Không quá 05 ngày",["Không quá 10 ngày","Ngay trong ngày","Không quá 15 ngày"],"NĐ 101/2024 Điều 39 khoản 3 điểm b.");
Q("dd","Giấy chứng nhận mất của tổ chức, người gốc Việt Nam định cư ở nước ngoài thì thông báo bằng cách:","Đăng tin 03 lần trên phương tiện thông tin đại chúng địa phương trong 15 ngày; chi phí do người sử dụng đất trả",["Chỉ niêm yết tại UBND xã","Không cần thông báo","Đăng báo toàn quốc 01 lần"],"NĐ 101/2024 Điều 39 khoản 2 điểm c.");
Q("dd","Văn phòng đăng ký đất đai phát hiện thửa đất đã được cấp Giấy chứng nhận bị mất nay đang thế chấp hoặc đã chuyển quyền thì:","Thông báo, trả lại hồ sơ cho người nộp",["Vẫn cấp lại Giấy chứng nhận","Hủy hợp đồng thế chấp","Chuyển hồ sơ cho tòa án"],"NĐ 101/2024 Điều 39 khoản 2 điểm b.");
Q("dd","Trường hợp nào dưới đây PHẢI cấp mới Giấy chứng nhận theo Điều 23 NĐ 101/2024?","Hợp thửa hoặc tách thửa đất",["Đổi tên người sử dụng đất","Thay đổi địa chỉ thửa đất","Xóa đăng ký thế chấp"],"NĐ 101/2024 Điều 23 khoản 1.");
Q("dd","Giấy chứng nhận hết dòng trống để xác nhận thay đổi khi đăng ký biến động thì:","Cấp mới Giấy chứng nhận",["Cấp trang bổ sung","Không giải quyết","Cấp lại do mất"],"NĐ 101/2024 Điều 23 khoản 6.");
Q("dd","Giấy chứng nhận ghi tên hộ gia đình, nay các thành viên có chung quyền muốn ghi đầy đủ tên thành viên: thủ tục là:","Cấp đổi Giấy chứng nhận",["Cấp lại","Đính chính","Tách thửa"],"NĐ 101/2024 Điều 38 khoản 1 điểm g.");
Q("dd","Giấy chứng nhận cấp trước 01/8/2024 muốn đổi sang Giấy chứng nhận mới: đây là trường hợp:","Cấp đổi Giấy chứng nhận theo nhu cầu người sử dụng đất",["Bắt buộc cấp mới trong năm","Cấp lại do mất","Không được đổi"],"NĐ 101/2024 Điều 38 khoản 1 điểm a.");
Q("dd","Văn phòng đăng ký đất đai trả hồ sơ tách thửa vì không đủ điều kiện tách thửa trong thời hạn:","03 ngày làm việc kể từ ngày nhận đủ hồ sơ",["05 ngày làm việc","10 ngày làm việc","15 ngày làm việc"],"NĐ 101/2024 Điều 7 khoản 3 điểm a.");
Q("dd","Điều kiện tách thửa, hợp thửa được đối chiếu với điều nào của Luật Đất đai?","Điều 220",["Điều 45","Điều 137","Điều 160"],"NĐ 101/2024 Điều 7 khoản 3.");
Q("dd","Theo NĐ 226/2025, đối tượng được ghi nợ tiền sử dụng đất khi cấp Giấy chứng nhận lần đầu là:","Cá nhân, hộ gia đình đang sử dụng đất có nhu cầu ghi nợ",["Mọi tổ chức","Chỉ hộ nghèo","Chỉ người có công"],"NĐ 226/2025 Điều 3 khoản 3 điểm a (sửa Điều 18 khoản 11 NĐ 101/2024).");
Q("dd","Hộ đang ghi nợ tiền sử dụng đất muốn chuyển nhượng quyền sử dụng đất thì:","Phải nộp đủ tiền sử dụng đất còn nợ trước khi thực hiện quyền",["Chuyển nhượng rồi nộp sau","Được xóa nợ","Chỉ cần xin gia hạn"],"NĐ 226/2025 Điều 3 khoản 3 điểm a.");
Q("dd","Đất có nguồn gốc nông, lâm trường đã giải thể, phá sản không còn quản lý: cấp Giấy chứng nhận cho đối tượng đủ điều kiện:","Không phải lập phương án sử dụng đất theo Điều 181 Luật Đất đai",["Vẫn phải lập phương án","Chỉ cấp cho tổ chức","Không được cấp"],"NĐ 226/2025 Điều 3 khoản 4 (bổ sung khoản 5 Điều 26 NĐ 101/2024).");
})();
