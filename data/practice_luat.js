/* Cố vấn Pháp luật VN - Ngân hàng luyện tập: TOPICS, QUIZ (câu viết tay + câu SINH TỰ ĐỘNG từ bảng mốc thời gian và con số),
   DK rỗng. Con số lấy từ văn bản đã đọc (Luật 76/2025, NĐ 274/2025, NĐ 283/2026) hoặc kiến thức ổn định; mục nên đối chiếu ghi trong phần giải thích. */
var TOPICS = {ds:"Luật dân sự",dn:"Luật doanh nghiệp",tm:"Thương mại, cạnh tranh, trọng tài",dt:"Luật đầu tư",dd:"Đất đai, nhà ở, bất động sản",ld:"Lao động, BHXH",hs:"Hình sự và tố tụng hình sự",hc:"Hành chính, xử phạt, khiếu nại",td:"Tố tụng dân sự, thi hành án",hn:"Hôn nhân gia đình, thừa kế",sh:"Sở hữu trí tuệ",ps:"Phá sản",th:"Luật thuế",hq:"Hải quan",dth:"Đấu thầu, đầu tư công, PPP",hp:"Hiến pháp, ban hành văn bản"};
var QUIZ = [];
var DK = [];
(function(){
function sh(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function uniq(a){var s={},r=[];a.forEach(function(x){if(!s[x]){s[x]=1;r.push(x);}});return r;}
function others(pool,right,n){return sh(uniq(pool).filter(function(x){return x!==right;})).slice(0,n);}
function Q(t,q,right,wrongs,e){
  wrongs=uniq(wrongs).filter(function(w){return w!==right;});
  var o=sh([{t:right,ok:1}].concat(wrongs.slice(0,3).map(function(w){return {t:w,ok:0};})));
  QUIZ.push({t:t,q:q,o:o.map(function(x){return x.t;}),a:o.findIndex(function(x){return x.ok;}),e:e||""});
}
/* ===== A. Bảng MỐC THỜI GIAN, CON SỐ (chủ đề, điều kiện hỏi, đáp án, giải thích) ===== */
var T=[
 ["ds","Thời hiệu khởi kiện yêu cầu giải quyết tranh chấp hợp đồng theo Bộ luật Dân sự 2015","03 năm","Điều 429 BLDS 2015: 03 năm kể từ ngày biết hoặc phải biết quyền lợi bị xâm phạm."],
 ["ds","Thời hiệu yêu cầu chia di sản là bất động sản","30 năm","Điều 623 BLDS 2015."],
 ["ds","Thời hiệu yêu cầu chia di sản là động sản","10 năm","Điều 623 BLDS 2015."],
 ["ds","Thời hiệu yêu cầu thực hiện nghĩa vụ của người chết để lại","03 năm","Điều 623 BLDS 2015."],
 ["ds","Thời hiệu yêu cầu Tòa án tuyên bố giao dịch vô hiệu do nhầm lẫn, lừa dối, đe dọa","02 năm","Điều 132 BLDS 2015."],
 ["ds","Mức lãi suất vay tối đa theo thỏa thuận (phần vượt không có hiệu lực)","20%/năm","Điều 468 BLDS 2015."],
 ["ds","Lãi chậm trả khi không có thỏa thuận (theo Điều 357 dẫn Điều 468)","10%/năm","Điều 357 khoản 2 BLDS 2015."],
 ["ds","Độ tuổi người thành niên có đầy đủ năng lực hành vi dân sự","18 tuổi","Điều 20 BLDS 2015."],
 ["dn","Thời hạn thành viên công ty TNHH hai thành viên trở lên phải góp đủ vốn kể từ ngày được cấp Giấy chứng nhận đăng ký doanh nghiệp","90 ngày","Điều 47 Luật Doanh nghiệp 2020 (không bị Luật 76/2025 sửa)."],
 ["dn","Thời hạn cổ đông công ty cổ phần phải thanh toán đủ số cổ phần đăng ký mua","90 ngày","Điều 113 Luật Doanh nghiệp 2020."],
 ["dn","Khi HĐQT không triệu tập họp ĐHĐCĐ theo quy định, nhóm cổ đông đủ điều kiện được tự triệu tập trong thời hạn","30 ngày","Khoản 4a Điều 140 (bổ sung bởi Luật 76/2025/QH15)."],
 ["dn","Danh sách cổ đông có quyền dự họp ĐHĐCĐ được lập không quá bao nhiêu ngày trước ngày gửi giấy mời họp","10 ngày","Khoản 1 Điều 141 (sửa bởi Luật 76/2025/QH15)."],
 ["dn","Thời hạn công ty cổ phần thông báo cho cơ quan đăng ký kinh doanh khi thay đổi thông tin cổ đông là cá nhân nước ngoài","03 ngày làm việc","Khoản 3 Điều 176 (sửa bởi Luật 76/2025/QH15)."],
 ["dn","Thời gian không còn đủ thành viên, cổ đông tối thiểu mà bị thu hồi Giấy chứng nhận đăng ký doanh nghiệp","06 tháng liên tục","Điểm c khoản 1 Điều 207 (sửa bởi Luật 76/2025/QH15)."],
 ["dn","Thời gian lưu giữ thông tin chủ sở hữu hưởng lợi sau khi doanh nghiệp giải thể, phá sản","05 năm","Điểm h khoản 1 Điều 216 (bổ sung bởi Luật 76/2025/QH15)."],
 ["dn","Tỷ lệ tối đa nợ phải trả (gồm trái phiếu dự kiến) trên vốn chủ sở hữu khi phát hành trái phiếu riêng lẻ (không thuộc ngoại lệ)","05 lần","Điểm c1 khoản 3 Điều 128 (bổ sung bởi Luật 76/2025/QH15)."],
 ["dn","Thời gian kinh doanh tối thiểu để công ty cổ phần hoàn trả một phần vốn góp theo quyết định của ĐHĐCĐ","02 năm","Điểm a khoản 5 Điều 112 (sửa bởi Luật 76/2025/QH15)."],
 ["tm","Mức phạt vi phạm hợp đồng thương mại tối đa theo Luật Thương mại","08% giá trị phần nghĩa vụ bị vi phạm","Điều 301 Luật Thương mại 2005."],
 ["tm","Mức giảm giá tối đa trong khuyến mại theo Luật Thương mại","50% giá hàng hóa, dịch vụ","Điều 94 Luật Thương mại 2005."],
 ["tm","Thị phần tối thiểu của một doanh nghiệp để bị coi là có vị trí thống lĩnh thị trường","30%","Điều 24 Luật Cạnh tranh 2018."],
 ["tm","Tổng thị phần tối thiểu của 02 doanh nghiệp cùng hành động để bị coi là có vị trí thống lĩnh","50%","Điều 24 Luật Cạnh tranh 2018."],
 ["tm","Thời hạn nộp đơn yêu cầu hủy phán quyết trọng tài kể từ ngày nhận phán quyết","30 ngày","Điều 68 Luật Trọng tài thương mại 2010."],
 ["ld","Thời gian thử việc tối đa đối với công việc cần trình độ cao đẳng trở lên","60 ngày","Điều 25 BLLĐ 2019."],
 ["ld","Lương thử việc tối thiểu so với lương công việc","85%","Điều 26 BLLĐ 2019."],
 ["ld","Thời hạn báo trước khi người lao động chấm dứt hợp đồng không xác định thời hạn","45 ngày","Điều 35 BLLĐ 2019."],
 ["ld","Thời hạn tối đa của hợp đồng lao động xác định thời hạn","36 tháng","Điều 20 BLLĐ 2019."],
 ["ld","Thời hiệu xử lý kỷ luật lao động (trường hợp thông thường)","06 tháng","Điều 123 BLLĐ 2019."],
 ["ld","Thời hiệu xử lý kỷ luật lao động đối với vi phạm liên quan tài chính, tài sản, bí mật công nghệ","12 tháng","Điều 123 BLLĐ 2019."],
 ["ld","Số ngày tự ý bỏ việc cộng dồn trong 30 ngày mà có thể bị sa thải","05 ngày","Điều 125 BLLĐ 2019."],
 ["ld","Số giờ làm thêm tối đa mỗi tháng (ngành thông thường)","40 giờ","BLLĐ 2019, NĐ 145/2020."],
 ["ld","Số giờ làm thêm tối đa mỗi năm (ngành thông thường)","200 giờ","BLLĐ 2019, NĐ 145/2020."],
 ["ld","Tiền làm thêm giờ vào ngày lễ (chưa kể lương ngày lễ)","300%","Điều 98 BLLĐ 2019."],
 ["ld","Tuổi của con để giao cho người mẹ trực tiếp nuôi khi ly hôn","dưới 36 tháng tuổi","Điều 81 Luật Hôn nhân và gia đình 2014."],
 ["ld","Lương tối thiểu vùng I từ 01/01/2026","5.310.000 đồng/tháng","NĐ 293/2025."],
 ["ld","Thời hiệu xử phạt vi phạm hành chính về lao động, BHXH theo NĐ 283/2026","01 năm","Khoản 4 Điều 3 NĐ 283/2026 (đọc nguyên văn)."],
 ["ld","Lãi chậm đóng, trốn đóng BHXH theo NĐ 274/2025","0,03%/ngày","NĐ 274/2025 (hiệu lực 30/11/2025)."],
 ["ld","Mốc chuyển từ chậm đóng sang trốn đóng khi chưa khắc phục","sau 60 ngày","NĐ 274/2025 Điều 6."],
 ["ld","Mức phạt chậm đóng BHXH theo NĐ 283/2026 (cá nhân)","12% đến 15% số tiền chậm đóng, tối đa 75 triệu đồng","Điều 43 NĐ 283/2026."],
 ["ld","Mức phạt trốn đóng BHXH do đăng ký lương thấp theo NĐ 283/2026 (cá nhân)","18% đến 20% số tiền trốn đóng, tối đa 75 triệu đồng","Điều 44 NĐ 283/2026."],
 ["hs","Độ tuổi chịu trách nhiệm hình sự về mọi tội phạm","từ đủ 16 tuổi","Điều 12 BLHS 2015."],
 ["hs","Thời hạn tạm giữ ban đầu theo Bộ luật Tố tụng hình sự 2015","03 ngày","Điều 118 BLTTHS 2015."],
 ["hs","Tổng thời hạn tạm giữ tối đa kể cả hai lần gia hạn","09 ngày","Điều 118 BLTTHS 2015."],
 ["hc","Thời hiệu khiếu nại lần đầu","90 ngày","Luật Khiếu nại 2011."],
 ["hc","Thời hạn giải quyết tố cáo thông thường","30 ngày","Luật Tố cáo 2018."],
 ["hc","Thời hiệu khởi kiện vụ án hành chính đối với quyết định hành chính","01 năm","Luật Tố tụng hành chính 2015."],
 ["td","Thời hạn kháng cáo bản án sơ thẩm dân sự","15 ngày","Điều 273 BLTTDS 2015."],
 ["td","Thời hạn kháng cáo quyết định tạm đình chỉ, đình chỉ giải quyết vụ án dân sự","07 ngày","Điều 273 BLTTDS 2015."],
 ["td","Thời hạn chuẩn bị xét xử sơ thẩm thông thường","04 tháng","Điều 203 BLTTDS 2015."],
 ["td","Thời hạn yêu cầu thi hành án dân sự kể từ ngày bản án có hiệu lực","05 năm","Điều 30 Luật Thi hành án dân sự."],
 ["td","Thời hạn tự nguyện thi hành án kể từ ngày nhận quyết định","10 ngày","Điều 45 Luật Thi hành án dân sự."],
 ["hn","Độ tuổi tối thiểu kết hôn của nam","20 tuổi","Điều 8 Luật Hôn nhân và gia đình 2014."],
 ["hn","Độ tuổi tối thiểu kết hôn của nữ","18 tuổi","Điều 8 Luật Hôn nhân và gia đình 2014."],
 ["hn","Phần di sản tối thiểu của người không phụ thuộc nội dung di chúc so với suất theo pháp luật","02/3","Điều 644 BLDS 2015."],
 ["sh","Thời hạn bảo hộ sáng chế","20 năm kể từ ngày nộp đơn","Luật Sở hữu trí tuệ."],
 ["sh","Thời hạn hiệu lực một lần của văn bằng bảo hộ nhãn hiệu","10 năm","Luật Sở hữu trí tuệ."],
 ["ps","Thời hạn không thanh toán nợ đến hạn để bị coi là mất khả năng thanh toán","03 tháng","Điều 4 Luật Phá sản 2014."],
 ["th","Tiền chậm nộp thuế theo Luật Quản lý thuế 108/2025","0,03%/ngày","Luật Quản lý thuế 108/2025."],
 ["th","Ngưỡng từ đó hóa đơn mua vào cần chứng từ thanh toán không dùng tiền mặt mới được khấu trừ GTGT","05 triệu đồng","NĐ 181/2025 Điều 26."],
 ["dt","Ngày hiệu lực chung của Luật Đầu tư 2025 (143/2025/QH15) theo nguồn đã tra","01/3/2026","Nguồn thứ cấp; một số phần có hiệu lực 01/7/2026."]
];
var ans=T.map(function(r){return r[2];});
T.forEach(function(r){
  Q(r[0],"Hãy chọn đáp án đúng: "+r[1]+" là:",r[2],others(ans,r[2],3),r[3]);
  Q(r[0],"Con số hoặc thời hạn «"+r[2]+"» liên quan tới quy định nào?",r[1],others(T.map(function(x){return x[1];}),r[1],3),r[3]);
});
/* ===== B. Câu khái niệm viết tay ===== */
Q("ds","Điều kiện có hiệu lực của giao dịch dân sự theo Điều 117 BLDS KHÔNG gồm yếu tố nào?","Phải được công chứng trong mọi trường hợp",["Chủ thể có năng lực phù hợp","Chủ thể hoàn toàn tự nguyện","Mục đích, nội dung không vi phạm điều cấm, không trái đạo đức"],"Hình thức chỉ là điều kiện khi luật có quy định.");
Q("ds","Giao dịch dân sự giả tạo bị xử lý thế nào?","Giao dịch giả tạo vô hiệu; giao dịch bị che giấu vẫn có hiệu lực nếu đáp ứng điều kiện",["Cả hai giao dịch đều hợp lệ","Cả hai giao dịch đều vô hiệu","Chỉ vô hiệu nếu các bên khiếu nại trong 3 năm"],"Điều 124 BLDS 2015.");
Q("ds","Bên nhận đặt cọc từ chối giao kết, thực hiện hợp đồng thì phải:","Trả lại tiền cọc và một khoản tiền tương đương giá trị tiền cọc (trừ thỏa thuận khác)",["Chỉ trả lại tiền cọc","Mất toàn bộ tiền cọc","Không có hậu quả"],"Điều 328 BLDS 2015.");
Q("ds","Người từ đủ 6 đến chưa đủ 15 tuổi xác lập giao dịch dân sự cần gì?","Sự đồng ý của người đại diện, trừ giao dịch phục vụ sinh hoạt hằng ngày phù hợp lứa tuổi",["Không cần ai đồng ý","Chỉ cần công chứng","Chỉ người đại diện được xác lập"],"Điều 21 BLDS 2015.");
Q("ds","Người từ đủ 15 đến dưới 18 tuổi gây thiệt hại mà có tài sản riêng thì ai bồi thường trước?","Chính người đó bằng tài sản riêng; thiếu thì cha mẹ bồi thường phần còn thiếu",["Cha mẹ toàn bộ","Nhà trường","Không ai"],"Điều 586 BLDS 2015.");
Q("dn","Kê khống vốn điều lệ theo Luật Doanh nghiệp (sửa bởi Luật 76/2025) là hành vi:","Không góp đủ vốn đã đăng ký mà không đăng ký điều chỉnh vốn điều lệ, hoặc cố ý định giá tài sản góp vốn sai",["Hợp pháp nếu công ty có lãi","Chỉ bị nhắc nhở","Chỉ áp dụng với công ty cổ phần niêm yết"],"Khoản 5 Điều 16.");
Q("dn","Chủ sở hữu hưởng lợi của doanh nghiệp là:","Cá nhân có quyền sở hữu thực tế vốn điều lệ hoặc có quyền chi phối doanh nghiệp",["Người đại diện theo pháp luật","Kế toán trưởng","Cổ đông tổ chức lớn nhất"],"Khoản 35 Điều 4 (Luật 76/2025).");
Q("dn","Công ty TNHH hai thành viên có số thành viên trong khoảng:","Từ 2 đến 50 thành viên",["Từ 1 đến 50","Từ 3 đến không hạn chế","Từ 2 đến 100"],"Luật Doanh nghiệp 2020.");
Q("dn","Công ty cổ phần có tối thiểu bao nhiêu cổ đông?","03 cổ đông",["02 cổ đông","05 cổ đông","07 cổ đông"],"Luật Doanh nghiệp 2020.");
Q("dn","Doanh nghiệp tư nhân chịu trách nhiệm:","Vô hạn bằng toàn bộ tài sản của chủ doanh nghiệp",["Hữu hạn trong vốn góp","Chỉ trong tài sản của doanh nghiệp","Không chịu trách nhiệm"],"Luật Doanh nghiệp 2020.");
Q("tm","Phạt vi phạm và bồi thường thiệt hại trong thương mại:","Có thể áp dụng đồng thời",["Không được áp dụng đồng thời","Chỉ áp dụng một trong hai","Chỉ áp dụng khi có công chứng"],"Điều 307 Luật Thương mại 2005.");
Q("tm","Điều khoản trọng tài trong hợp đồng khi hợp đồng bị tuyên vô hiệu:","Có thể vẫn có hiệu lực vì thỏa thuận trọng tài độc lập với hợp đồng",["Mặc nhiên vô hiệu","Chỉ vô hiệu nếu hợp đồng chưa thực hiện","Vô hiệu một nửa"],"Điều 19 Luật Trọng tài thương mại 2010.");
Q("tm","Phán quyết của Hội đồng trọng tài thương mại có tính chất:","Chung thẩm",["Sơ thẩm","Phúc thẩm","Tái thẩm"],"Điều 61 Luật Trọng tài thương mại 2010.");
Q("ld","Người lao động báo trước ít nhất bao lâu khi nghỉ việc với hợp đồng xác định thời hạn từ 12 đến 36 tháng?","30 ngày",["03 ngày làm việc","45 ngày","15 ngày"],"Điều 35 BLLĐ 2019.");
Q("ld","Trợ cấp thôi việc mỗi năm làm việc được tính:","1/2 tháng tiền lương, cho thời gian chưa đóng bảo hiểm thất nghiệp",["01 tháng lương cho toàn bộ thời gian","1/2 tháng lương cho toàn bộ thời gian","02 tháng lương"],"Điều 46 BLLĐ 2019.");
Q("ld","Trợ cấp mất việc làm mỗi năm làm việc tối thiểu:","01 tháng tiền lương nhưng tối thiểu 02 tháng",["1/2 tháng lương","03 tháng lương","Không có mức tối thiểu"],"Điều 47 BLLĐ 2019.");
Q("ld","Hình thức kỷ luật lao động KHÔNG có theo Điều 124 BLLĐ là:","Phạt tiền",["Khiển trách","Kéo dài thời hạn nâng lương không quá 06 tháng","Sa thải"],"Cấm phạt tiền, cắt lương thay việc xử lý kỷ luật.");
Q("hs","Tội phạm rất nghiêm trọng là tội có mức cao nhất của khung hình phạt:","Đến 15 năm tù",["Đến 03 năm tù","Đến 07 năm tù","Trên 20 năm"],"Điều 9 BLHS 2015.");
Q("hs","Người từ đủ 14 đến dưới 16 tuổi chịu trách nhiệm hình sự về:","Tội rất nghiêm trọng do cố ý hoặc đặc biệt nghiêm trọng trong các điều luật quy định",["Mọi tội phạm","Chỉ tội ít nghiêm trọng","Không chịu trách nhiệm hình sự"],"Điều 12 BLHS 2015.");
Q("hc","Mức phạt tiền đối với tổ chức so với cá nhân trong xử phạt hành chính nói chung:","Gấp 02 lần (trừ trường hợp nghị định ghi riêng)",["Bằng nhau","Gấp 05 lần","Chỉ bằng một nửa"],"Luật XLVPHC; NĐ 283/2026 Điều 7.");
Q("hc","Khiếu nại lần đầu phải thực hiện trong thời hạn nào?","90 ngày kể từ ngày nhận quyết định hoặc biết hành vi",["30 ngày","60 ngày","01 năm"],"Luật Khiếu nại 2011.");
Q("td","Bản án sơ thẩm dân sự tuyên khi đương sự có mặt, thời hạn kháng cáo tính từ:","Ngày tuyên án",["Ngày cấp bản án phúc thẩm","Ngày thi hành án","Ngày nhận thông báo thụ lý"],"Điều 273 BLTTDS 2015.");
Q("hn","Hàng thừa kế thứ nhất gồm:","Vợ, chồng, cha đẻ, mẹ đẻ, cha nuôi, mẹ nuôi, con đẻ, con nuôi",["Anh, chị, em ruột","Ông bà nội, ngoại","Cô, dì, chú, bác"],"Điều 651 BLDS 2015.");
Q("hn","Di sản được chia theo hàng thừa kế: những người cùng hàng được hưởng:","Phần di sản bằng nhau",["Theo tỷ lệ tuổi","Theo thu nhập","Người lớn tuổi nhất hưởng nhiều nhất"],"Điều 651 BLDS 2015.");
Q("sh","Quyền tác giả phát sinh từ khi nào?","Từ khi tác phẩm được sáng tạo và thể hiện dưới hình thức vật chất nhất định, không phụ thuộc đăng ký",["Từ khi đăng ký bản quyền","Từ khi in ấn","Từ khi bán tác phẩm"],"Luật Sở hữu trí tuệ.");
Q("ps","Doanh nghiệp bị coi là mất khả năng thanh toán khi:","Không thực hiện nghĩa vụ thanh toán khoản nợ trong 03 tháng kể từ ngày đến hạn",["Chậm trả 7 ngày","Lỗ một năm","Giảm doanh thu 20%"],"Điều 4 Luật Phá sản 2014.");
Q("th","Từ 01/7/2026, tiền chậm nộp thuế theo Luật Quản lý thuế 108/2025 là:","0,03%/ngày trên số tiền chậm nộp",["0,05%/ngày","0,1%/ngày","1%/tháng"],"Luật Quản lý thuế 108/2025.");
Q("hp","Khi hai văn bản của cùng một cơ quan ban hành quy định khác nhau về cùng một vấn đề, áp dụng:","Văn bản ban hành sau",["Văn bản ban hành trước","Văn bản dài hơn","Văn bản do người dân chọn"],"Nguyên tắc áp dụng văn bản quy phạm pháp luật.");
Q("hp","Nguồn nào là nguồn chính thống để tra văn bản gốc?","Công báo, Cơ sở dữ liệu quốc gia về văn bản pháp luật, cổng thông tin của cơ quan ban hành",["Bài đăng mạng xã hội","Bài báo tổng hợp","Tin nhắn nhóm"],"Báo chí chỉ để tham khảo, không thay văn bản gốc.");
})();
