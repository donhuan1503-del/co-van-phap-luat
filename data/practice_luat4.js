/* Câu LAO ĐỘNG - BHXH đã đối chiếu nguyên văn BLLĐ 2019 (Công báo 993+994) và Luật BHXH 2024 (41/2024/QH15, hiệu lực 01/7/2025).
   Gồm câu viết tay và câu SINH TỰ ĐỘNG số liệu ngẫu nhiên. Thêm vào CUỐI bảng QUIZ. */
(function(){
function sh(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function uniq(a){var s={},r=[];a.forEach(function(x){if(!s[x]){s[x]=1;r.push(x);}});return r;}
function Q(t,q,right,wrongs,e){wrongs=uniq(wrongs).filter(function(w){return w!==right;});
  var o=sh([{t:right,ok:1}].concat(wrongs.slice(0,3).map(function(w){return {t:w,ok:0};})));
  QUIZ.push({t:t,q:q,o:o.map(function(x){return x.t;}),a:o.findIndex(function(x){return x.ok;}),e:(e||"")+" [đã đối chiếu nguyên văn]"});}
function fm(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,".");}
function R(a,b){return a+Math.floor(Math.random()*(b-a+1));}
/* ===== Viết tay: hợp đồng, chấm dứt ===== */
Q("ld","Khi hợp đồng xác định thời hạn hết hạn mà người lao động vẫn làm việc, hai bên phải ký hợp đồng mới trong:","30 ngày kể từ ngày hết hạn",["15 ngày","60 ngày","90 ngày"],"Điều 20 khoản 2 điểm a BLLĐ 2019.");
Q("ld","Nếu quá 30 ngày kể từ ngày hết hạn mà không ký hợp đồng mới thì:","Hợp đồng đã giao kết trở thành hợp đồng không xác định thời hạn",["Hợp đồng tự gia hạn 12 tháng","Người lao động mất quyền lợi","Hợp đồng chấm dứt"],"Điều 20 khoản 2 điểm b.");
Q("ld","Hợp đồng lao động xác định thời hạn có thời hạn tối đa:","36 tháng",["12 tháng","24 tháng","60 tháng"],"Điều 20 khoản 1 điểm b.");
Q("ld","Người lao động đơn phương chấm dứt HĐLĐ mà không cần báo trước trong trường hợp nào?","Không được trả đủ lương hoặc trả lương không đúng thời hạn (trừ trường hợp Điều 97 khoản 4)",["Bị nhắc nhở miệng","Muốn đổi sang công ty khác lương cao hơn","Bị chuyển sang bộ phận khác một ngày"],"Điều 35 khoản 2 điểm b.");
Q("ld","Công ty chấm dứt HĐLĐ với người tự ý bỏ việc 05 ngày làm việc liên tục không có lý do chính đáng thì:","Không phải báo trước",["Báo trước 45 ngày","Báo trước 30 ngày","Báo trước 03 ngày làm việc"],"Điều 36 khoản 1 điểm e và khoản 3.");
Q("ld","Người lao động ốm đau điều trị 12 tháng liên tục mà khả năng lao động chưa hồi phục (hợp đồng không xác định thời hạn): công ty có quyền?","Đơn phương chấm dứt hợp đồng, báo trước 03 ngày làm việc",["Không được chấm dứt","Phải chờ đủ 24 tháng","Phải trả thêm 06 tháng lương"],"Điều 36 khoản 1 điểm b, khoản 2 điểm c.");
Q("ld","Công ty đơn phương chấm dứt hợp đồng với nữ lao động đang nuôi con dưới 12 tháng tuổi thì:","Không được thực hiện quyền đơn phương theo Điều 36 (trừ trường hợp luật quy định khác)",["Được nếu báo trước 45 ngày","Được nếu trả thêm 1 tháng lương","Được nếu lao động đồng ý bằng miệng"],"Điều 37 khoản 3.");
Q("ld","Hủy bỏ việc đơn phương chấm dứt HĐLĐ trước khi hết thời hạn báo trước cần điều kiện gì?","Thông báo bằng văn bản và được bên kia đồng ý",["Chỉ cần gọi điện","Không cần bên kia đồng ý","Chỉ cần đóng dấu"],"Điều 38.");
Q("ld","Người lao động chấm dứt HĐLĐ trái pháp luật phải:","Không được trợ cấp thôi việc; bồi thường nửa tháng lương và tiền lương những ngày không báo trước; hoàn trả chi phí đào tạo",["Chỉ xin lỗi","Bồi thường 6 tháng lương","Nộp phạt 5 triệu đồng"],"Điều 40 BLLĐ 2019.");
Q("ld","Công ty chấm dứt HĐLĐ trái pháp luật phải trả thêm cho người lao động ít nhất:","02 tháng tiền lương theo hợp đồng (ngoài lương những ngày không được làm việc và nghĩa vụ BHXH)",["01 tháng lương","03 tháng lương","06 tháng lương"],"Điều 41 khoản 1.");
Q("ld","Trợ cấp thôi việc được tính trên tiền lương nào?","Tiền lương bình quân 06 tháng liền kề theo hợp đồng trước khi thôi việc",["Lương tháng cuối cùng","Lương tối thiểu vùng","Lương bình quân 12 tháng"],"Điều 46 khoản 3.");
Q("ld","Thời gian làm việc để tính trợ cấp thôi việc phải trừ:","Thời gian đã tham gia bảo hiểm thất nghiệp và thời gian đã được trả trợ cấp thôi việc, mất việc làm",["Thời gian thử việc","Thời gian nghỉ phép","Không trừ gì"],"Điều 46 khoản 2.");
Q("ld","Người lao động bị sa thải theo kỷ luật có được trợ cấp thôi việc không?","Không (Điều 46 loại trừ trường hợp chấm dứt do kỷ luật sa thải; khoản 8 Điều 34 không nằm trong các khoản được trả)",["Có, 1/2 tháng lương mỗi năm","Có, 01 tháng lương mỗi năm","Có, nếu làm trên 10 năm"],"Điều 46 khoản 1 chỉ liệt kê các khoản 1, 2, 3, 4, 6, 7, 9, 10 Điều 34.");
Q("ld","Trong thời gian nào hai bên phải thanh toán đầy đủ các khoản tiền liên quan khi chấm dứt hợp đồng?","14 ngày làm việc kể từ ngày chấm dứt (có thể kéo dài tối đa 30 ngày trong trường hợp luật nêu)",["03 ngày","05 ngày làm việc","60 ngày"],"Điều 48 khoản 1.");
Q("ld","Cho thôi việc vì thay đổi cơ cấu, công nghệ hoặc lý do kinh tế phải thông báo trước cho UBND cấp tỉnh và người lao động bao nhiêu ngày?","30 ngày",["07 ngày","15 ngày","60 ngày"],"Điều 42 khoản 6.");
Q("ld","Trợ cấp mất việc làm tối thiểu:","02 tháng tiền lương (mỗi năm làm việc một tháng lương)",["01 tháng lương","03 tháng lương","06 tháng lương"],"Điều 47 BLLĐ 2019.");
/* ===== Kỷ luật ===== */
Q("ld","Tự ý bỏ việc ở mức nào thì công ty có thể SA THẢI (kỷ luật)?","05 ngày cộng dồn trong 30 ngày hoặc 20 ngày cộng dồn trong 365 ngày, không có lý do chính đáng",["03 ngày liên tục","10 ngày cộng dồn trong 90 ngày","15 ngày cộng dồn trong 365 ngày"],"Điều 125 khoản 4.");
Q("ld","Thời hiệu xử lý kỷ luật lao động đối với hành vi liên quan trực tiếp đến tài chính, tài sản, bí mật kinh doanh là:","12 tháng",["03 tháng","06 tháng","24 tháng"],"Điều 123 khoản 1.");
Q("ld","Người lao động bị khiển trách được đương nhiên xóa kỷ luật sau:","03 tháng nếu không tiếp tục vi phạm",["01 tháng","06 tháng","12 tháng"],"Điều 126 khoản 1.");
Q("ld","Người lao động bị cách chức được đương nhiên xóa kỷ luật sau:","03 năm nếu không tiếp tục vi phạm",["06 tháng","01 năm","05 năm"],"Điều 126 khoản 1.");
Q("ld","Trong thời gian tạm đình chỉ công việc, người lao động được tạm ứng:","50% tiền lương trước khi bị đình chỉ",["30% lương","70% lương","100% lương"],"Điều 128 khoản 2.");
Q("ld","Không bị xử lý kỷ luật lao động nếu vi phạm khi đang:","Mắc bệnh tâm thần hoặc bệnh khác làm mất khả năng nhận thức, điều khiển hành vi",["Đang làm thêm giờ","Đang thử việc","Đang nghỉ giải lao"],"Điều 122 khoản 5.");
Q("ld","Công ty có thể kỷ luật lao động đối với hành vi nào?","Hành vi vi phạm đã được quy định trong nội quy lao động hoặc thỏa thuận trong hợp đồng",["Hành vi không có trong nội quy nhưng công ty thấy không phù hợp","Hành vi ngoài giờ làm việc không liên quan","Hành vi chỉ bị người khác phản ánh"],"Điều 127 khoản 3 cấm xử lý hành vi không quy định trong nội quy, hợp đồng, pháp luật lao động.");
/* ===== Thời giờ, lương làm thêm, nghỉ phép, thai sản ===== */
Q("ld","Làm thêm giờ vào ban đêm, người lao động được trả thêm ngoài lương làm thêm và tiền làm đêm:","Ít nhất 20% tiền lương ban ngày của ngày làm việc bình thường",["10%","30%","50%"],"Điều 98 khoản 3.");
Q("ld","Làm việc ban đêm được tính từ:","22 giờ đến 06 giờ sáng ngày hôm sau",["20 giờ đến 04 giờ","21 giờ đến 05 giờ","23 giờ đến 07 giờ"],"Điều 106.");
Q("ld","Làm thêm giờ cần điều kiện nào?","Được sự đồng ý của người lao động và bảo đảm giới hạn giờ làm thêm theo luật",["Chỉ cần quyết định của quản lý","Chỉ cần thông báo bằng miệng","Không cần điều kiện"],"Điều 107 khoản 2.");
Q("ld","Một số ngành như dệt may, da giày, điện tử, chế biến nông, lâm, thủy sản được làm thêm tối đa bao nhiêu giờ mỗi năm?","300 giờ, phải thông báo bằng văn bản cho cơ quan quản lý lao động cấp tỉnh",["200 giờ","250 giờ","400 giờ"],"Điều 107 khoản 3 và 4.");
Q("ld","Số ngày nghỉ Tết Âm lịch được hưởng nguyên lương theo luật:","05 ngày",["03 ngày","07 ngày","10 ngày"],"Điều 112 khoản 1 điểm b.");
Q("ld","Người lao động chưa thành niên được nghỉ phép năm mỗi năm làm đủ 12 tháng:","14 ngày làm việc",["12 ngày","15 ngày","16 ngày"],"Điều 113 khoản 1 điểm b.");
Q("ld","Người lao động làm nghề đặc biệt nặng nhọc, độc hại, nguy hiểm được nghỉ phép năm:","16 ngày làm việc",["12 ngày","14 ngày","20 ngày"],"Điều 113 khoản 1 điểm c.");
Q("ld","Lao động nữ sinh đôi nghỉ thai sản như thế nào so với sinh một con?","Từ con thứ hai trở đi, mỗi con nghỉ thêm 01 tháng",["Không nghỉ thêm","Thêm 03 tháng","Thêm 15 ngày"],"Điều 139 khoản 1.");
Q("ld","Lao động nữ muốn đi làm sớm trước khi hết thời gian nghỉ thai sản phải thỏa mãn:","Đã nghỉ ít nhất 04 tháng, báo trước, công ty đồng ý và có xác nhận của cơ sở khám bệnh",["Nghỉ ít nhất 01 tháng","Chỉ cần công ty đồng ý","Chỉ cần người lao động tự nguyện"],"Điều 139 khoản 4.");
/* ===== BHXH 2024 ===== */
Q("ld","Tỷ lệ người sử dụng lao động đóng vào quỹ hưu trí và tử tuất theo Luật BHXH 2024 (đối tượng thông thường):","14%",["08%","17,5%","22%"],"Điều 34 khoản 1 điểm b.");
Q("ld","Người lao động đóng vào quỹ hưu trí và tử tuất:","8% tiền lương làm căn cứ đóng",["03%","10,5%","14%"],"Điều 33 khoản 1 điểm a.");
Q("ld","Công ty đóng vào quỹ ốm đau và thai sản:","3% tiền lương làm căn cứ đóng",["01%","05%","08%"],"Điều 34 khoản 1 điểm a.");
Q("ld","Chủ hộ kinh doanh có đăng ký kinh doanh tham gia BHXH bắt buộc, mức đóng vào quỹ hưu trí và tử tuất:","22% (cộng 3% ốm đau và thai sản) tiền lương làm căn cứ đóng",["08%","14%","30%"],"Điều 33 khoản 4 điểm a.");
Q("ld","Mức đóng BHXH tự nguyện là:","22% thu nhập làm căn cứ đóng, vào quỹ hưu trí và tử tuất",["08%","14%","25%"],"Điều 32 khoản 2.");
Q("ld","Tiền lương làm căn cứ đóng BHXH bắt buộc tối đa bằng:","20 lần mức tham chiếu",["10 lần mức tham chiếu","20 lần lương cơ sở","30 lần mức tham chiếu"],"Điều 31 khoản 1 điểm đ.");
Q("ld","Người lao động không hưởng lương từ bao nhiêu ngày làm việc trở lên trong tháng thì không phải đóng BHXH tháng đó (trừ thỏa thuận)?","14 ngày làm việc",["05 ngày","10 ngày","20 ngày"],"Điều 33 khoản 5.");
Q("ld","Thời hạn chậm nhất người sử dụng lao động đóng BHXH hằng tháng:","Ngày cuối cùng của tháng tiếp theo",["Ngày 10 tháng sau","Ngày cuối cùng của tháng đó","Ngày 15 tháng sau"],"Điều 34 khoản 4 điểm a.");
Q("ld","Sau bao nhiêu ngày không đăng ký hoặc đăng ký thiếu người tham gia BHXH thì bị coi là TRỐN đóng?","Sau 60 ngày kể từ ngày hết thời hạn đăng ký",["Sau 07 ngày","Sau 30 ngày","Sau 90 ngày"],"Điều 38, 39 Luật BHXH 2024.");
Q("ld","Điều kiện hưởng chế độ thai sản khi sinh con (thông thường):","Đóng BHXH bắt buộc từ đủ 06 tháng trong 12 tháng liền kề trước khi sinh",["Đóng từ đủ 12 tháng liên tục","Đóng từ đủ 03 tháng trong 12 tháng","Không cần điều kiện đóng"],"Điều 50 khoản 2.");
Q("ld","Lao động nam có vợ sinh con (sinh thường) được nghỉ thai sản:","05 ngày làm việc",["03 ngày","07 ngày","14 ngày"],"Điều 53 khoản 2 điểm a.");
Q("ld","Lao động nam được nghỉ 07 ngày làm việc khi:","Vợ sinh con phải phẫu thuật hoặc sinh con dưới 32 tuần tuổi",["Vợ sinh thường","Vợ sinh đôi","Vợ sinh con thứ ba"],"Điều 53 khoản 2 điểm b.");
Q("ld","Ngày bắt đầu nghỉ thai sản của lao động nam phải nằm trong khoảng:","60 ngày kể từ ngày vợ sinh con",["15 ngày","30 ngày","90 ngày"],"Điều 53 khoản 3.");
Q("ld","Trợ cấp thai sản một tháng bằng:","100% bình quân tiền lương đóng BHXH 06 tháng gần nhất trước khi nghỉ",["75% lương tháng cuối","60% lương tháng đầu","50% lương bình quân 12 tháng"],"Điều 59 khoản 1.");
Q("ld","Trợ cấp ốm đau bằng:","75% tiền lương làm căn cứ đóng BHXH của tháng gần nhất trước tháng nghỉ",["100% lương","60% lương","50% lương"],"Điều 45 khoản 2.");
Q("ld","Người đóng BHXH dưới 15 năm làm điều kiện bình thường được hưởng chế độ ốm đau tối đa trong năm:","30 ngày làm việc",["20 ngày","40 ngày","60 ngày"],"Điều 43 khoản 1 điểm a.");
Q("ld","Điều kiện về thời gian đóng BHXH để hưởng lương hưu (đủ tuổi) theo Luật 2024:","Từ đủ 15 năm đóng BHXH bắt buộc",["Từ đủ 10 năm","Từ đủ 20 năm với mọi người","Từ đủ 25 năm"],"Điều 64 khoản 1.");
Q("ld","Lao động nam đóng đủ 20 năm hưởng lương hưu bằng:","45% bình quân tiền lương đóng, mỗi năm thêm tính 2%, tối đa 75%",["30%","55%","60%"],"Điều 66 khoản 1 điểm b.");
Q("ld","Lao động nữ đóng đủ 15 năm hưởng lương hưu bằng:","45%, sau đó mỗi năm thêm 2%, tối đa 75%",["40%","50%","60%"],"Điều 66 khoản 1 điểm a.");
Q("ld","Còn thiếu tối đa bao lâu để đủ điều kiện lương hưu thì được đóng một lần cho số tháng thiếu?","06 tháng",["03 tháng","12 tháng","24 tháng"],"Điều 33 khoản 7.");
Q("ld","BHXH một lần có thể hưởng khi:","Đủ tuổi hưởng lương hưu mà chưa đủ 15 năm đóng (có thể chọn trợ cấp hằng tháng); ra nước ngoài định cư; mắc bệnh hiểm nghèo",["Nghỉ việc 1 tháng","Chuyển công ty","Muốn rút tiền mua nhà"],"Điều 70.");
Q("ld","Trợ cấp mai táng chi trả khi người đóng BHXH bắt buộc chết, điều kiện thời gian đóng tối thiểu:","Từ đủ 12 tháng (hoặc chết do tai nạn lao động, bệnh nghề nghiệp, hoặc đang hưởng lương hưu)",["Từ đủ 06 tháng","Từ đủ 24 tháng","Từ đủ 60 tháng"],"Điều 85.");
/* ===== SINH TỰ ĐỘNG số liệu ===== */
(function(){
 var i,wd,ls,gio,tl;
 for(i=0;i<12;i++){
  ls=R(25,90)*1000*1; gio=R(2,8);
  var kinds=[["ngày thường",1.5],["ngày nghỉ hằng tuần",2.0],["ngày lễ, tết (chưa kể lương ngày lễ)",3.0]];
  var k=kinds[i%3];var tien=ls*gio*k[1];
  var others=[ls*gio*1.0,ls*gio*(k[1]===1.5?2.0:1.5),ls*gio*(k[1]===3.0?2.0:3.0),ls*gio*1.3];
  Q("ld","Lương giờ thực trả "+fm(ls)+" đồng, làm thêm "+gio+" giờ vào "+k[0]+". Tiền làm thêm tối thiểu là bao nhiêu?",fm(tien)+" đồng",others.map(function(x){return fm(x)+" đồng";}),"Điều 98 khoản 1: ngày thường 150%, nghỉ hằng tuần 200%, lễ tết 300%. "+fm(ls)+" × "+gio+" × "+(k[1]*100)+"% = "+fm(tien)+" đồng.");
 }
 for(i=0;i<10;i++){
  var luong=R(10,40)*1e6, nam=R(3,15), bhtn=R(0,Math.min(nam-1,6));
  var tc=Math.round((nam-bhtn)*0.5*luong);
  var w=[Math.round(nam*0.5*luong),Math.round((nam-bhtn)*luong),Math.round((nam-bhtn)*0.5*luong*2),Math.round((nam-bhtn+1)*0.5*luong),Math.round((nam-bhtn)*0.25*luong)];
  Q("ld","Làm việc "+nam+" năm, trong đó đã tham gia bảo hiểm thất nghiệp "+bhtn+" năm, lương bình quân 06 tháng liền kề "+fm(luong)+" đồng. Hết hạn hợp đồng, công ty trả trợ cấp thôi việc (đủ điều kiện) là:",fm(tc)+" đồng",w.map(function(x){return fm(x)+" đồng";}),"Điều 46: (thời gian làm việc − thời gian đóng BHTN) × 1/2 tháng lương = ("+nam+" − "+bhtn+") × 0,5 × "+fm(luong)+" = "+fm(tc)+" đồng.");
 }
 for(i=0;i<10;i++){
  var ll=R(8,60)*1e5*1, ld=Math.round(ll*0.08), cd=Math.round(ll*0.17);
  Q("ld","Lương làm căn cứ đóng BHXH bắt buộc "+fm(ll)+" đồng (đối tượng thông thường). Công ty phải đóng bao nhiêu vào quỹ BHXH (3% + 14%)?",fm(cd)+" đồng",[fm(ld)+" đồng",fm(Math.round(ll*0.25))+" đồng",fm(Math.round(ll*0.22))+" đồng"],"Điều 34: 3% + 14% = 17% × "+fm(ll)+" = "+fm(cd)+" đồng; người lao động đóng 8% = "+fm(ld)+" đồng (Điều 33).");
 }
 for(i=0;i<8;i++){
  var yr=R(15,19), pct=40+(yr-15), pn=45+2*(R(1,5));
  Q("ld","Lao động nam đủ tuổi nghỉ hưu, đóng BHXH "+yr+" năm. Tỷ lệ hưởng lương hưu hằng tháng là bao nhiêu % bình quân tiền lương đóng?",pct+"%",[(pct+5)+"%",(pct-5)+"%","45%","50%","35%"],"Điều 66 khoản 1 điểm b: từ đủ 15 đến dưới 20 năm: 40% tương ứng 15 năm, mỗi năm thêm 1% → "+pct+"%.");
 }
 for(i=0;i<6;i++){
  var m=R(1,10);
  Q("ld","Người lao động làm việc cho một công ty "+m+" tháng trong năm (điều kiện bình thường), số ngày nghỉ phép năm được hưởng theo tỷ lệ là:",(12*m/12)+" ngày",[(m+1)+" ngày",(m+2)+" ngày",(m-1>0?m-1:m+3)+" ngày","12 ngày"],"Điều 113 khoản 2: theo tỷ lệ số tháng làm việc: 12 × "+m+"/12 = "+(12*m/12)+" ngày.");
 }
})();
})();
