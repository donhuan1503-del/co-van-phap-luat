/* Câu luyện tập LUẬT THUẾ, HẢI QUAN, ĐẦU TƯ CÔNG, ĐẤU THẦU, PPP: đã đối chiếu nguyên văn các văn bản hợp nhất Công báo. Thêm vào CUỐI bảng QUIZ. */
(function(){
function sh(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function uniq(a){var s={},r=[];a.forEach(function(x){if(!s[x]){s[x]=1;r.push(x);}});return r;}
function Q(t,q,right,wrongs,e){wrongs=uniq(wrongs).filter(function(w){return w!==right;});
  var o=sh([{t:right,ok:1}].concat(wrongs.slice(0,3).map(function(w){return {t:w,ok:0};})));
  QUIZ.push({t:t,q:q,o:o.map(function(x){return x.t;}),a:o.findIndex(function(x){return x.ok;}),e:(e||"")+" [đã đối chiếu nguyên văn bản hợp nhất]"});}
function fm(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,".");}
function R(a,b){return a+Math.floor(Math.random()*(b-a+1));}
/* ===== Thuế ===== */
Q("th","Thời hạn khai bổ sung hồ sơ khai thuế khi chưa có quyết định thanh tra, kiểm tra (tính từ ngày hết hạn nộp hồ sơ của kỳ có sai sót):","05 năm",["03 năm","10 năm","02 năm"],"Luật QLT 108/2025 Điều 12 khoản 5.");
Q("th","Tiền chậm nộp theo Luật Quản lý thuế 108/2025:","0,03%/ngày trên số tiền chậm nộp",["0,05%/ngày","0,03%/tháng","0,1%/ngày"],"Điều 16 khoản 2.");
Q("th","Bất khả kháng: thời gian gia hạn nộp hồ sơ khai thuế (tháng, quý, năm) tối đa:","30 ngày kể từ ngày hết hạn",["15 ngày","60 ngày","90 ngày"],"Luật QLT Điều 12 khoản 4; hồ sơ quyết toán tối đa 60 ngày.");
Q("th","Luật Quản lý thuế 108/2025 có hiệu lực chung từ:","01/7/2026 (Điều 13 và Điều 26 về hộ kinh doanh, hóa đơn điện tử từ 01/01/2026)",["01/01/2026","01/01/2027","01/7/2025"],"Điều 52.");
Q("th","Doanh nghiệp doanh thu năm từ bao nhiêu trở lên phải tính GTGT theo phương pháp khấu trừ (trừ hộ, cá nhân kinh doanh)?","01 tỷ đồng",["500 triệu đồng","03 tỷ đồng","10 tỷ đồng"],"Luật GTGT Điều 11.");
Q("th","Tỷ lệ % GTGT tính trực tiếp theo doanh thu: phân phối, cung cấp hàng hóa là:","1%",["2%","3%","5%"],"Luật GTGT Điều 12 khoản 2 điểm b1.");
Q("th","Hoàn thuế GTGT cho hàng hóa, dịch vụ xuất khẩu theo tháng, quý khi thuế đầu vào chưa khấu trừ hết từ:","300 triệu đồng trở lên (số hoàn không vượt quá 10% doanh thu xuất khẩu của kỳ hoàn)",["100 triệu đồng","500 triệu đồng","01 tỷ đồng"],"Luật GTGT Điều 15 khoản 1.");
Q("th","Hàng hóa xuất khẩu đủ điều kiện chịu thuế suất GTGT:","0%",["5%","8%","10%"],"Luật GTGT Điều 9 khoản 1.");
Q("th","Thuế suất TNDN cho doanh nghiệp có tổng doanh thu năm liền trước không quá 03 tỷ đồng:","15%",["10%","17%","20%"],"Luật TNDN Điều 10 khoản 2.");
Q("th","Thuế suất TNDN cho doanh nghiệp có doanh thu năm liền trước trên 03 tỷ đến không quá 50 tỷ đồng:","17%",["15%","18%","20%"],"Luật TNDN Điều 10 khoản 3.");
Q("th","Thời gian chuyển lỗ tối đa theo Luật TNDN:","05 năm liên tục",["03 năm","07 năm","10 năm"],"Điều 16.");
Q("th","Khoản chi nào không được trừ khi tính thu nhập chịu thuế TNDN?","Tiền phạt vi phạm hành chính và tiền chậm nộp thuế",["Chi đào tạo nghề cho người lao động","Chi nghiên cứu khoa học, chuyển đổi số","Chi tài trợ giáo dục theo quy định"],"Luật TNDN Điều 9 khoản 2 điểm b, l.");
Q("th","Mức giảm trừ gia cảnh của người nộp thuế TNCN theo Luật 109/2025:","15,5 triệu đồng/tháng (186 triệu đồng/năm)",["11 triệu đồng/tháng","13 triệu đồng/tháng","17 triệu đồng/tháng"],"Luật TNCN Điều 10.");
Q("th","Biểu thuế lũy tiến TNCN đối với tiền lương, tiền công có mấy bậc?","5 bậc: 5%, 10%, 20%, 30%, 35%",["7 bậc","4 bậc","6 bậc"],"Luật TNCN Điều 9.");
Q("th","Quy định mới về thu nhập từ kinh doanh, tiền lương, tiền công của cá nhân cư trú (Luật TNCN 109/2025) áp dụng từ:","Kỳ tính thuế năm 2026",["01/01/2025","01/01/2027","Từng tháng từ 01/7/2026"],"Điều 29 khoản 2.");
Q("th","Thuế xuất khẩu, nhập khẩu phải nộp khi nào nếu không có bảo lãnh?","Trước khi thông quan hoặc giải phóng hàng hóa",["Sau thông quan 30 ngày","Cuối quý","Cuối năm"],"Luật Thuế xuất khẩu, thuế nhập khẩu Điều 9 khoản 1.");
Q("th","Có tổ chức tín dụng bảo lãnh số thuế phải nộp, thời hạn bảo lãnh tối đa:","30 ngày kể từ ngày đăng ký tờ khai hải quan",["10 ngày","60 ngày","90 ngày"],"Điều 9 khoản 1.");
Q("th","Hàng hóa quá cảnh, chuyển khẩu, trung chuyển có chịu thuế xuất khẩu, nhập khẩu không?","Không thuộc đối tượng chịu thuế",["Có, 5%","Có, nếu trị giá lớn","Có, nếu lưu kho trên 30 ngày"],"Điều 2 khoản 4.");
Q("th","Hàng xuất nhập khẩu đang trong quá trình giám sát hải quan bị hư hỏng, mất mát toàn bộ được giám định thì:","Không phải nộp thuế",["Nộp 50% thuế","Nộp đủ thuế","Chỉ nộp tiền phạt"],"Điều 18 khoản 1.");
/* ===== Hải quan ===== */
Q("hq","Hồ sơ hải quan hàng nhập khẩu được nộp:","Trước ngày hàng đến cửa khẩu hoặc trong 30 ngày kể từ ngày hàng đến cửa khẩu",["Trong 5 ngày sau thông quan","Trong 90 ngày kể từ ngày hàng đến","Sau khi nộp thuế đầy đủ"],"Luật Hải quan Điều 25 khoản 2.");
Q("hq","Hồ sơ hải quan hàng xuất khẩu phải nộp chậm nhất trước khi phương tiện xuất cảnh:","04 giờ (hàng chuyển phát nhanh: 02 giờ)",["01 giờ","12 giờ","24 giờ"],"Điều 25 khoản 1.");
Q("hq","Thời hạn cơ quan hải quan hoàn thành kiểm tra hồ sơ kể từ khi tiếp nhận đầy đủ hồ sơ:","Chậm nhất 02 giờ làm việc",["08 giờ làm việc","01 ngày","03 ngày"],"Điều 23 khoản 2 điểm a.");
Q("hq","Thời hạn hoàn thành kiểm tra thực tế hàng hóa kể từ khi xuất trình đủ hàng:","Chậm nhất 08 giờ làm việc (lô lớn, phức tạp được gia hạn tối đa 02 ngày)",["02 giờ làm việc","24 giờ","05 ngày"],"Điều 23 khoản 2 điểm b.");
Q("hq","Hàng đã thông quan, người khai hải quan được khai bổ sung trong:","60 ngày kể từ ngày thông quan và trước khi có quyết định kiểm tra sau thông quan, thanh tra, kiểm tra",["30 ngày kể từ ngày thông quan","90 ngày","05 năm"],"Điều 29 khoản 4 điểm b.");
Q("hq","Chính sách thuế áp dụng cho hàng xuất nhập khẩu là chính sách tại thời điểm:","Đăng ký tờ khai hải quan (trừ khi luật thuế xuất nhập khẩu quy định khác)",["Hàng đến cửa khẩu","Thông quan","Thanh toán"],"Điều 29 khoản 3.");
Q("hq","Kiểm tra sau thông quan được thực hiện trong thời gian tối đa kể từ ngày đăng ký tờ khai đến ngày ban hành quyết định kiểm tra:","05 năm",["02 năm","03 năm","10 năm"],"Điều 77 khoản 4.");
Q("hq","Trị giá hải quan hàng nhập khẩu là:","Giá thực tế phải trả tính đến cửa khẩu nhập đầu tiên",["Giá bán trong nước","Giá niêm yết của nhà sản xuất","Giá thấp nhất trong 3 tháng"],"Điều 86 khoản 3.");
Q("hq","Tỷ giá tính thuế xuất nhập khẩu là:","Tỷ giá hối đoái do Ngân hàng Nhà nước Việt Nam công bố tại thời điểm tính thuế",["Tỷ giá ngân hàng thương mại bất kỳ","Tỷ giá thị trường tự do","Tỷ giá ghi trên hợp đồng"],"Điều 86 khoản 4.");
Q("hq","Hàng hóa được thông quan khi chưa nộp đủ thuế trong trường hợp nào?","Được tổ chức tín dụng bảo lãnh số thuế hoặc được áp dụng thời hạn nộp thuế theo pháp luật về thuế",["Khi người khai hứa nộp sau","Khi đã nộp tờ khai","Khi có thư xin gia hạn"],"Điều 37 khoản 2.");
/* ===== Đầu tư công, đấu thầu, PPP ===== */
Q("dth","Dự án sử dụng vốn đầu tư công từ bao nhiêu trở lên là dự án quan trọng quốc gia (tiêu chí vốn)?","30.000 tỷ đồng",["10.000 tỷ đồng","20.000 tỷ đồng","50.000 tỷ đồng"],"Luật Đầu tư công Điều 8 khoản 1.");
Q("dth","Dự án giao thông (cầu, cảng, sân bay, đường sắt, quốc lộ) thuộc nhóm A khi tổng mức đầu tư từ:","4.600 tỷ đồng",["2.000 tỷ đồng","3.000 tỷ đồng","10.000 tỷ đồng"],"Điều 9 khoản 2.");
Q("dth","Dự án cấp thoát nước, xử lý rác thải thuộc nhóm A khi tổng mức đầu tư từ:","3.000 tỷ đồng",["2.000 tỷ đồng","4.600 tỷ đồng","1.600 tỷ đồng"],"Điều 9 khoản 3.");
Q("dth","Dự án hạ tầng khu công nghiệp thuộc nhóm A:","Không phân biệt tổng mức đầu tư",["Khi từ 1.000 tỷ đồng","Khi từ 3.000 tỷ đồng","Không bao giờ"],"Điều 9 khoản 1.");
Q("dth","Hình thức nào cho phép giao một nhà thầu thực hiện gói thầu trong trường hợp luật liệt kê (cấp bách, duy nhất một nhà thầu...)?","Chỉ định thầu",["Đấu thầu rộng rãi","Chào hàng cạnh tranh","Đàm phán giá"],"Luật Đấu thầu Điều 23.");
Q("dth","Đấu thầu rộng rãi là hình thức:","Không hạn chế số lượng nhà thầu tham dự",["Chỉ mời 3 nhà thầu","Chỉ nhà thầu trong nước","Chỉ nhà thầu đã làm cho chủ đầu tư"],"Điều 21 khoản 1.");
Q("dth","Mua sắm trực tiếp chỉ áp dụng một lần với khối lượng nhỏ hơn bao nhiêu so với gói thầu đã ký trước đó?","130%",["100%","150%","200%"],"Điều 25 khoản 2 điểm b.");
Q("dth","Thời gian từ khi ký hợp đồng gói thầu trước đến ngày phê duyệt kết quả mua sắm trực tiếp không quá:","12 tháng",["06 tháng","24 tháng","36 tháng"],"Điều 25 khoản 2 điểm d.");
Q("dth","Bảo đảm thực hiện hợp đồng có mức:","Từ 2% đến 10% giá hợp đồng",["Từ 0,5% đến 1,5%","Từ 10% đến 20%","Cố định 5%"],"Điều 68 khoản 4.");
Q("dth","Nhà thầu nào không phải thực hiện bảo đảm thực hiện hợp đồng?","Nhà thầu cung cấp dịch vụ tư vấn",["Nhà thầu xây lắp","Nhà thầu cung cấp hàng hóa","Nhà thầu hỗn hợp"],"Điều 68 khoản 2.");
Q("dth","Hành vi dàn xếp để một bên rút hồ sơ dự thầu nhằm bên khác trúng thầu gọi là:","Thông thầu",["Gian lận","Cản trở","Hủy thầu"],"Điều 16 khoản 3.");
Q("dth","Hủy thầu khi nào?","Khi tất cả hồ sơ không đáp ứng yêu cầu hồ sơ mời thầu (và các trường hợp khác luật liệt kê)",["Khi chỉ có một nhà thầu nộp hồ sơ","Khi giá dự thầu thấp","Khi chủ đầu tư thay đổi ý định"],"Điều 17 khoản 1 điểm a.");
Q("dth","Hợp đồng PPP mà nhà đầu tư xây dựng, kinh doanh, vận hành trong thời hạn nhất định rồi chuyển giao cho Nhà nước là:","BOT",["BOO","BTO","O&M"],"Luật PPP Điều 45 khoản 1 điểm a.");
Q("dth","Hợp đồng PPP mà xây dựng xong chuyển giao cho Nhà nước, sau đó được kinh doanh, vận hành trong thời hạn nhất định là:","BTO",["BOT","BOO","O&M"],"Điều 45 khoản 1 điểm b.");
Q("dth","Hợp đồng PPP xây dựng, sở hữu, kinh doanh trong thời hạn rồi chấm dứt (không chuyển giao) là:","BOO",["BOT","BTO","O&M"],"Điều 45 khoản 1 điểm c.");
Q("dth","Tổng thời hạn hợp đồng PPP (kể cả điều chỉnh) không vượt quá:","Thời hạn giao đất, cho thuê đất theo pháp luật về đất đai",["Luôn 20 năm","Luôn 50 năm","Theo ý nhà đầu tư"],"Luật PPP Điều 51 khoản 2.");
/* ===== Sinh số ngẫu nhiên ===== */
(function(){var i;
 for(i=0;i<8;i++){var g=R(2,60)*1e8*1,small=g<=20e9,p1=small?0.01:0.015,p2=small?0.015:0.03;
  var lo=Math.round(g*0.01),hi=Math.round(g*0.015);
  var g2=R(21,80)*1e9,lo2=Math.round(g2*0.015),hi2=Math.round(g2*0.03);
  Q("dth","Gói thầu xây lắp giá gói thầu "+fm(g)+" đồng (không quá 20 tỷ đồng), đấu thầu rộng rãi. Mức bảo đảm dự thầu trong hồ sơ mời thầu nằm trong khoảng:","Từ "+fm(lo)+" đến "+fm(hi)+" đồng (1% đến 1,5% giá gói thầu)",["Từ "+fm(Math.round(g*0.015))+" đến "+fm(Math.round(g*0.03))+" đồng","Từ "+fm(Math.round(g*0.02))+" đến "+fm(Math.round(g*0.1))+" đồng","Từ "+fm(Math.round(g*0.005))+" đến "+fm(Math.round(g*0.015))+" đồng"],"Điều 14 khoản 4 điểm a Luật Đấu thầu: xây lắp, hỗn hợp không quá 20 tỷ đồng: 1% đến 1,5%.");
  Q("dth","Gói thầu xây lắp giá gói thầu "+fm(g2)+" đồng (trên 20 tỷ đồng). Mức bảo đảm dự thầu nằm trong khoảng:","Từ "+fm(lo2)+" đến "+fm(hi2)+" đồng (1,5% đến 3% giá gói thầu)",["Từ "+fm(Math.round(g2*0.01))+" đến "+fm(Math.round(g2*0.015))+" đồng","Từ "+fm(Math.round(g2*0.03))+" đến "+fm(Math.round(g2*0.05))+" đồng","Từ "+fm(Math.round(g2*0.02))+" đến "+fm(Math.round(g2*0.1))+" đồng"],"Điều 14 khoản 4 điểm b: các gói thầu còn lại: 1,5% đến 3%.");}
 for(i=0;i<8;i++){var v=R(5,300)*1e8,ve=Math.round(v*0.02),vh=Math.round(v*0.1);
  Q("dth","Giá hợp đồng "+fm(v)+" đồng. Giá trị bảo đảm thực hiện hợp đồng có thể quy định trong khoảng:","Từ "+fm(ve)+" đến "+fm(vh)+" đồng (2% đến 10% giá hợp đồng)",["Từ "+fm(Math.round(v*0.01))+" đến "+fm(Math.round(v*0.03))+" đồng","Từ "+fm(Math.round(v*0.1))+" đến "+fm(Math.round(v*0.2))+" đồng","Từ "+fm(Math.round(v*0.005))+" đến "+fm(Math.round(v*0.015))+" đồng"],"Điều 68 khoản 4: từ 2% đến 10% giá hợp đồng.");}
 for(i=0;i<6;i++){var d=R(1,25),m=R(1,12),y=2026,dt=new Date(y,m-1,d),end=new Date(dt.getTime()+60*86400000),f=function(x){return x.getDate()+"/"+(x.getMonth()+1)+"/"+x.getFullYear();};
  Q("hq","Hàng được thông quan ngày "+f(dt)+" (chưa có quyết định kiểm tra). Hạn chót khai bổ sung theo Điều 29 Luật Hải quan (60 ngày kể từ ngày thông quan) là:",f(end),[f(new Date(dt.getTime()+30*86400000)),f(new Date(dt.getTime()+90*86400000)),f(new Date(dt.getTime()+365*86400000))],"Điều 29 khoản 4 điểm b: trong 60 ngày kể từ ngày thông quan và trước khi có quyết định dừng đưa hàng qua khu vực giám sát, kiểm tra sau thông quan, thanh tra, kiểm tra.");}
})();
})();
