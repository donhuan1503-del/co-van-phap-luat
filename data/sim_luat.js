/* Kho TÌNH HUỐNG pháp lý có tham số ngẫu nhiên (cùng cơ chế với app kế toán).
   Mỗi mẫu: {id, role, topic, level, make(R)} -> {title, facts[], stages[], law, lesson, warn}
   Căn cứ ổn định: BLDS 2015, BLLĐ 2019, Luật Thương mại 2005, Luật Doanh nghiệp 2020 (sửa 76/2025), BLTTDS 2015, Luật THADS. Luôn đối chiếu văn bản hiện hành trước khi dùng thực tế. */
var SIM_ROLES = ["Luật sư tư vấn","Pháp chế doanh nghiệp","Thẩm phán, hòa giải viên","Chuyên viên nhân sự - lao động"];
var SIM_IND = ["thương mại điện máy","xây dựng dân dụng","sản xuất bao bì","vận tải hàng hóa","nhà hàng - khách sạn","phân phối thực phẩm","phần mềm","may mặc xuất khẩu","vật liệu xây dựng","dược phẩm bán lẻ"];
var SIM_NAME = ["An Phát","Hoàng Long","Minh Quang","Thiên Ân","Đại Việt","Phú Gia","Bảo Tín","Hải Đăng","Kim Ngân","Lạc Hồng"];
var SIM_PERSON = ["anh Hùng","chị Lan","anh Tuấn","chị Mai","anh Đức","chị Hạnh","anh Nam","chị Thu"];
function SR(){var r={};
  r.int=function(a,b){return a+Math.floor(Math.random()*(b-a+1));};
  r.step=function(a,b,s){return a+s*Math.floor(Math.random()*((b-a)/s+1));};
  r.pick=function(x){return x[Math.floor(Math.random()*x.length)];};
  r.shuf=function(x){return shuffle(x);};
  r.m=function(n){return money(n);};
  r.co=function(){return "Công ty "+r.pick(SIM_NAME)+" ("+r.pick(SIM_IND)+")";};
  return r;}
function simMC(q,right,wrongs,e){
  var o=shuffle([{t:right,ok:1}].concat(wrongs.map(function(w){return {t:w,ok:0};})));
  return {type:"mc",q:q,o:o.map(function(x){return x.t;}),a:o.findIndex(function(x){return x.ok;}),e:e};
}
var SCEN = [

{id:"l_phat_hd",role:"Luật sư tư vấn",topic:"tm",level:2,make:function(R){
  var gt=R.step(200e6,2000e6,50e6),pct=R.pick([10,12,15]),vp=Math.round(gt*0.08);
  return {title:"Phạt vi phạm hợp đồng thương mại",
   facts:["Bên A ("+R.co()+") ký hợp đồng mua bán với bên B, giá trị phần nghĩa vụ bị vi phạm là "+R.m(gt)+" đồng.","Hợp đồng ghi phạt vi phạm "+pct+"% giá trị phần nghĩa vụ bị vi phạm. Cả hai bên đều là thương nhân và hợp đồng thương mại thông thường.","Bên B giao hàng chậm, bên A yêu cầu phạt đúng mức ghi trong hợp đồng."],
   stages:[
    simMC("Mức phạt tối đa được chấp nhận theo Luật Thương mại là bao nhiêu?","08% giá trị phần nghĩa vụ bị vi phạm",["Đúng "+pct+"% như hợp đồng","12% giá trị hợp đồng","Không giới hạn nếu hai bên tự nguyện"],"Điều 301 Luật Thương mại 2005: mức phạt vi phạm tối đa 8% giá trị phần nghĩa vụ hợp đồng bị vi phạm. Thỏa thuận cao hơn bị giới hạn."),
    {type:"num",q:"Số tiền phạt tối đa bên A có thể đòi (đồng)?",ans:vp,unit:"đồng",e:"08% × "+R.m(gt)+" = "+R.m(vp)+" đồng."},
    simMC("Ngoài phạt vi phạm, bên A còn có thể đòi gì nếu chứng minh được thiệt hại?","Bồi thường thiệt hại thực tế (có thể áp dụng đồng thời với phạt)",["Không được đòi thêm gì","Chỉ đòi lãi chậm trả","Chỉ đòi hủy hợp đồng"],"Điều 307 Luật Thương mại 2005: có thể áp dụng đồng thời phạt vi phạm và bồi thường thiệt hại nếu hợp đồng có thỏa thuận về phạt; thiệt hại phải chứng minh.")],
   law:"Điều 300-307 Luật Thương mại 2005; BLDS 2015 Điều 418",
   lesson:"Hợp đồng thương mại: phạt tối đa 8%; hợp đồng dân sự thông thường hai bên tự thỏa thuận mức phạt.",
   warn:"Nếu hợp đồng không phải hoạt động thương mại giữa thương nhân thì áp dụng BLDS, không bị trần 8%."};}},

{id:"l_lai_cham",role:"Luật sư tư vấn",topic:"ds",level:2,make:function(R){
  var g=R.step(100e6,900e6,10e6),th=R.int(4,14),lai=Math.round(g*0.10*th/12);
  return {title:"Lãi chậm trả không có thỏa thuận",
   facts:[R.co()+" nợ bên bán số tiền gốc "+R.m(g)+" đồng, chậm trả "+th+" tháng.","Hợp đồng không ghi lãi suất chậm trả. Bên bán đòi tính lãi."],
   stages:[
    simMC("Mức lãi suất chậm trả áp dụng khi không có thỏa thuận là?","10%/năm trên số tiền chậm trả",["20%/năm","Lãi suất ngân hàng bất kỳ","Không được tính lãi"],"Điều 357 khoản 2 BLDS 2015: lãi chậm trả theo mức lãi suất quy định tại Điều 468 khoản 1, tức 10%/năm."),
    {type:"num",q:"Lãi chậm trả trong "+th+" tháng (đồng, làm tròn)?",ans:lai,unit:"đồng",e:"Gốc × 10% × "+th+"/12 = "+R.m(lai)+" đồng."},
    simMC("Nếu hai bên thỏa thuận lãi 30%/năm thì sao?","Phần vượt 20%/năm không có hiệu lực",["Toàn bộ thỏa thuận hợp lệ","Toàn bộ hợp đồng vô hiệu","Phần vượt 10%/năm không có hiệu lực"],"Điều 468 BLDS 2015: lãi suất vay tối đa 20%/năm; vượt thì phần vượt không có hiệu lực.")],
   law:"Điều 357, 468 BLDS 2015",
   lesson:"Hai mức hay nhầm: 10%/năm (mặc định chậm trả) và 20%/năm (trần thỏa thuận).",
   warn:"Hợp đồng vay của tổ chức tín dụng chịu luật chuyên ngành, không bị trần 20%."};}},

{id:"l_thua_ke",role:"Luật sư tư vấn",topic:"hn",level:2,make:function(R){
  var ds=R.step(600e6,3600e6,60e6),n=R.int(3,6);
  var each=Math.round(ds/(n+2));
  return {title:"Chia thừa kế theo pháp luật hàng thứ nhất",
   facts:["Ông X mất không để lại di chúc, di sản "+R.m(ds)+" đồng.","Hàng thừa kế thứ nhất: vợ, bố, mẹ đẻ của ông X còn sống và "+n+" người con. Không ai bị truất quyền hoặc từ chối nhận."],
   stages:[
    simMC("Những người nào thuộc hàng thừa kế thứ nhất?","Vợ, chồng, cha mẹ (đẻ, nuôi), con (đẻ, nuôi)",["Chỉ vợ và các con","Cả anh chị em ruột","Chỉ con đẻ"],"Điều 651 BLDS 2015."),
    {type:"num",q:"Mỗi người hàng thứ nhất được hưởng bao nhiêu (đồng, làm tròn)? Số người = "+(n+3),ans:Math.round(ds/(n+3)),unit:"đồng",e:"Chia đều "+R.m(ds)+" cho "+(n+3)+" người (vợ, bố, mẹ, "+n+" con) = "+R.m(Math.round(ds/(n+3)))+" đồng."},
    simMC("Thời hiệu yêu cầu chia di sản là bất động sản?","30 năm kể từ thời điểm mở thừa kế",["10 năm","03 năm","Không có thời hiệu"],"Điều 623 BLDS 2015: 30 năm với bất động sản, 10 năm với động sản.")],
   law:"Điều 623, 649, 651 BLDS 2015",
   lesson:"Những người cùng hàng được hưởng phần bằng nhau; đếm đủ người trước khi chia, nhớ kiểm tra người bị truất quyền, từ chối và người không phụ thuộc nội dung di chúc.",
   warn:"Nếu có di chúc, vẫn chừa 2/3 suất cho người thừa kế không phụ thuộc nội dung (Điều 644)."};}},

{id:"l_thi_hanh_an",role:"Thẩm phán, hòa giải viên",topic:"td",level:2,make:function(R){
  var y=R.int(2019,2023),m=R.int(1,12);
  return {title:"Thời hạn yêu cầu thi hành án",
   facts:["Bản án dân sự có hiệu lực pháp luật từ tháng "+m+" năm "+y+".","Người được thi hành án chưa gửi đơn yêu cầu. Họ hỏi còn thời hạn không."],
   stages:[
    simMC("Thời hạn yêu cầu thi hành án dân sự là bao lâu?","05 năm kể từ ngày bản án có hiệu lực",["01 năm","03 năm","10 năm"],"Điều 30 Luật Thi hành án dân sự: 05 năm; trường hợp thi hành định kỳ thì thời hạn tính từ ngày đến hạn từng kỳ."),
    simMC("Hết thời hạn mà có trở ngại khách quan hoặc sự kiện bất khả kháng thì sao?","Thời gian có trở ngại không tính vào thời hạn yêu cầu",["Mất quyền vĩnh viễn","Phải khởi kiện lại","Thời hạn tự động tăng gấp đôi"],"Điều 30 khoản 2 Luật THADS."),
    simMC("Sau khi nhận quyết định thi hành án, người phải thi hành có thời gian tự nguyện bao lâu?","10 ngày",["03 ngày","30 ngày","60 ngày"],"Điều 45 Luật THADS.")],
   law:"Điều 30, 45 Luật Thi hành án dân sự",
   lesson:"Hai đồng hồ khác nhau: 05 năm để nộp đơn, 10 ngày để tự nguyện thi hành.",
   warn:"Kiểm tra luật THADS sửa đổi mới nhất về thời hạn và biện pháp bảo đảm."};}},

{id:"l_khang_cao",role:"Thẩm phán, hòa giải viên",topic:"td",level:1,make:function(R){
  var d=R.int(1,25);
  var tuyen=new Date(2026,R.int(0,10),d),kc=new Date(tuyen.getTime()+15*86400000);
  var f=function(x){return x.getDate()+"/"+(x.getMonth()+1)+"/"+x.getFullYear();};
  return {title:"Tính hạn kháng cáo bản án sơ thẩm",
   facts:["Tòa án tuyên bản án dân sự sơ thẩm ngày "+f(tuyen)+", đương sự có mặt.","Bị đơn không đồng ý bản án."],
   stages:[
    simMC("Ngày cuối cùng nộp đơn kháng cáo (đương sự có mặt khi tuyên án)?",f(kc),[f(new Date(tuyen.getTime()+7*86400000)),f(new Date(tuyen.getTime()+30*86400000)),f(new Date(tuyen.getTime()+60*86400000))],"Điều 273 BLTTDS 2015: 15 ngày kể từ ngày tuyên án nếu đương sự có mặt; nếu vắng mặt thì từ ngày nhận bản án hoặc niêm yết. Cần rà soát ngày nghỉ cuối cùng."),
    simMC("Với quyết định đình chỉ vụ án, thời hạn kháng cáo là?","07 ngày",["15 ngày","30 ngày","03 ngày"],"Điều 273 BLTTDS 2015.")],
   law:"Điều 273 BLTTDS 2015",
   lesson:"Hạn tính theo ngày dương lịch; nếu ngày cuối trùng ngày nghỉ thì dời sang ngày làm việc kế tiếp (Điều 148 BLDS).",
   warn:"Luôn kiểm tra ngày nhận bản án thực tế khi đương sự vắng mặt."};}},

{id:"l_gop_von",role:"Pháp chế doanh nghiệp",topic:"dn",level:2,make:function(R){
  var v=R.step(500e6,5000e6,100e6),dd=R.int(60,120);
  return {title:"Góp vốn chậm và hậu quả pháp lý",
   facts:[R.co()+" là công ty TNHH hai thành viên, vốn điều lệ "+R.m(v)+" đồng.","Một thành viên cam kết góp 40% vốn nhưng đến ngày thứ "+dd+" kể từ ngày được cấp Giấy chứng nhận đăng ký doanh nghiệp vẫn chưa góp."],
   stages:[
    simMC("Thời hạn góp đủ vốn của thành viên là bao lâu?","90 ngày kể từ ngày được cấp Giấy chứng nhận đăng ký doanh nghiệp",["30 ngày","180 ngày","Không giới hạn"],"Điều 47 Luật Doanh nghiệp 2020 (không bị Luật 76/2025 sửa phần này)."),
    simMC(dd>90?"Thành viên đã quá hạn. Xử lý đúng?":"Thành viên còn trong hạn. Xử lý đúng?",dd>90?"Thành viên chưa góp đủ mặc nhiên không còn là thành viên với phần chưa góp; công ty phải đăng ký giảm vốn hoặc huy động người khác góp":"Chưa vi phạm, tiếp tục theo dõi đến ngày thứ 90",dd>90?["Công ty mặc nhiên miễn nghĩa vụ góp","Thành viên vẫn được hưởng quyền như đã góp đủ","Phải giải thể ngay"]:["Đã mất tư cách thành viên","Công ty phải giải thể","Phải đóng phạt 20% vốn"],"Điều 47 khoản 3-4: sau 90 ngày, thành viên chưa góp đủ phần vốn cam kết đương nhiên không còn là thành viên đối với phần chưa góp; phải đăng ký điều chỉnh vốn trong 30 ngày kể từ ngày cuối cùng phải góp."),
    simMC("Hành vi 'kê khống vốn điều lệ' (theo Luật 76/2025 sửa Điều 16) là gì?","Không góp đủ vốn như đã đăng ký mà không điều chỉnh vốn điều lệ, hoặc cố ý định giá tài sản góp vốn sai",["Chỉ là vi phạm kế toán","Chỉ áp dụng cho công ty niêm yết","Là hành vi hợp pháp"],"Khoản 5 Điều 16 Luật Doanh nghiệp (sửa đổi) cấm kê khống vốn.")],
   law:"Điều 47, 16 Luật Doanh nghiệp 2020 (sửa bởi Luật 76/2025/QH15)",
   lesson:"Vốn đăng ký phải góp đủ trong 90 ngày; quá hạn không điều chỉnh là vi phạm và có rủi ro bị xử lý.",
   warn:"Các điều chỉnh hướng dẫn thi hành mới cần đối chiếu NĐ hướng dẫn hiện hành."};}},

{id:"l_vo_hieu",role:"Luật sư tư vấn",topic:"ds",level:3,make:function(R){
  var g=R.step(400e6,3000e6,100e6);
  return {title:"Giao dịch nhầm lẫn và thời hiệu yêu cầu tuyên vô hiệu",
   facts:[R.pick(SIM_PERSON)+" mua một thửa đất giá "+R.m(g)+" đồng. Sau ký hợp đồng phát hiện diện tích thực tế nhỏ hơn đáng kể do bên bán lừa dối về ranh giới.","Giao dịch ký cách đây 14 tháng, đã công chứng và sang tên."],
   stages:[
    simMC("Căn cứ tuyên giao dịch vô hiệu nào phù hợp?","Giao dịch xác lập do bị lừa dối (Điều 127 BLDS 2015)",["Vô hiệu vì vi phạm điều cấm","Vô hiệu vì giả tạo","Không có căn cứ vô hiệu"],"Điều 127: giao dịch xác lập do bị lừa dối có thể bị Tòa án tuyên vô hiệu theo yêu cầu."),
    simMC("Thời hiệu yêu cầu Tòa án tuyên bố giao dịch vô hiệu do lừa dối là?","02 năm kể từ ngày bị lừa dối, nên vẫn còn thời hiệu",["10 năm","03 tháng","Không có thời hiệu"],"Điều 132 BLDS 2015: 02 năm."),
    simMC("Hậu quả khi giao dịch vô hiệu?","Hoàn trả cho nhau những gì đã nhận; bên có lỗi bồi thường thiệt hại",["Giao dịch vẫn có hiệu lực","Chỉ bên mua phải trả lại đất","Không phải hoàn trả gì"],"Điều 131 BLDS 2015.")],
   law:"Điều 117, 127, 131, 132 BLDS 2015",
   lesson:"Gặp giao dịch có vấn đề: xác định căn cứ vô hiệu, đếm thời hiệu, rồi tính hậu quả hoàn trả.",
   warn:"Với bất động sản còn phải cân nhắc người thứ ba ngay tình và việc đã sang tên."};}},

{id:"l_cham_dut_hdld",role:"Chuyên viên nhân sự - lao động",topic:"ld",level:2,make:function(R){
  var th=R.pick(["xác định thời hạn 18 tháng","không xác định thời hạn","xác định thời hạn 12 tháng"]);
  var bt=th.indexOf("không")>=0?"45 ngày":"30 ngày";
  return {title:"Người lao động nghỉ việc: báo trước bao lâu?",
   facts:[R.pick(SIM_PERSON)+" làm cho "+R.co()+" theo hợp đồng lao động "+th+".","Người này nộp đơn xin nghỉ việc, không có lý do đặc biệt như bị quấy rối hay không trả lương."],
   stages:[
    simMC("Thời hạn báo trước tối thiểu?",bt,["03 ngày làm việc","60 ngày","Không cần báo trước"],"Điều 35 BLLĐ 2019: HĐLĐ không xác định thời hạn: 45 ngày; xác định 12-36 tháng: 30 ngày; dưới 12 tháng: 03 ngày làm việc."),
    simMC("Nếu người lao động nghỉ không báo trước đủ thì?","Là chấm dứt trái pháp luật; phải bồi thường nửa tháng lương và tiền lương những ngày không báo trước, hoàn trả chi phí đào tạo (nếu có)",["Không có hậu quả","Mất toàn bộ lương tháng đó","Bị phạt tiền theo quy chế nội bộ"],"Điều 40 BLLĐ 2019."),
    simMC("Công ty có thể phạt tiền người lao động nghỉ không báo trước?","Không; luật cấm phạt tiền, cắt lương thay việc xử lý kỷ luật",["Có, 20% lương","Có, tối đa 05 triệu","Có, nếu ghi nội quy"],"Điều 127 BLLĐ 2019 cấm hình thức này.")],
   law:"Điều 35, 40, 127 BLLĐ 2019",
   lesson:"Ba mốc báo trước: 45 ngày, 30 ngày, 03 ngày làm việc; bồi thường khi trái luật.",
   warn:"Một số trường hợp (bệnh nặng, thai sản) có thời hạn báo trước riêng."};}},

{id:"l_ky_luat",role:"Chuyên viên nhân sự - lao động",topic:"ld",level:3,make:function(R){
  var ngay=R.int(5,9);
  return {title:"Sa thải do tự ý bỏ việc",
   facts:["Nhân viên của "+R.co()+" tự ý nghỉ "+ngay+" ngày cộng dồn trong 30 ngày liên tục, không có lý do chính đáng.","Công ty chưa họp xử lý kỷ luật."],
   stages:[
    simMC("Có đủ căn cứ sa thải theo Điều 125 BLLĐ?","Có nếu nghỉ từ 05 ngày cộng dồn trong 30 ngày hoặc 20 ngày cộng dồn trong 365 ngày mà không có lý do chính đáng",["Không, phải đủ 15 ngày","Chỉ khi có đơn xin nghỉ","Chỉ khi vi phạm ba lần"],"Điều 125 BLLĐ 2019."),
    simMC("Trình tự bắt buộc trước khi ra quyết định sa thải?","Họp xử lý kỷ luật có đại diện tổ chức đại diện người lao động, thông báo trước ít nhất 05 ngày làm việc, lập biên bản",["Ra quyết định ngay","Chỉ cần tin nhắn","Gửi email là đủ"],"Điều 122 BLLĐ 2019 và Điều 70 NĐ 145/2020."),
    simMC("Thời hiệu xử lý kỷ luật thông thường?","06 tháng kể từ ngày xảy ra vi phạm",["01 tháng","03 tháng","24 tháng"],"Điều 123 BLLĐ 2019; 12 tháng với vi phạm liên quan tài chính, tài sản, bí mật.")],
   law:"Điều 122-125 BLLĐ 2019; NĐ 145/2020",
   lesson:"Căn cứ đúng chưa đủ; thiếu trình tự là kỷ luật trái luật và có thể phải nhận lại, bồi thường.",
   warn:"Nếu sa thải trái luật phải nhận lại, trả lương những ngày không làm việc và bồi thường tối thiểu 02 tháng lương (Điều 41)."};}},

{id:"l_thong_linh",role:"Pháp chế doanh nghiệp",topic:"tm",level:3,make:function(R){
  var a=R.int(18,28),b=R.int(18,28),c=a+b;
  return {title:"Thị phần và vị trí thống lĩnh",
   facts:["Hai doanh nghiệp cùng ngành phân phối có thị phần "+a+"% và "+b+"% trên thị trường liên quan; tổng "+c+"%.","Họ thường xuyên cùng điều chỉnh giá bán."],
   stages:[
    simMC("Một doanh nghiệp bị coi là có vị trí thống lĩnh thị trường khi?","Có thị phần từ 30% trở lên trên thị trường liên quan, hoặc có khả năng gây hạn chế cạnh tranh một cách đáng kể",["Từ 10%","Từ 50%","Từ 70%"],"Điều 24 Luật Cạnh tranh 2018."),
    simMC("Hai doanh nghiệp cùng hành động bị coi là thống lĩnh khi tổng thị phần từ bao nhiêu?","50% trở lên (với 02 doanh nghiệp)",["30%","40%","80%"],"Điều 24 Luật Cạnh tranh 2018: 02 DN 50%, 03 DN 65%, 04 DN 75%, 05 DN trở lên 85%."),
    simMC("Cùng điều chỉnh giá với đối thủ nhằm hạn chế cạnh tranh thuộc nhóm hành vi nào?","Thỏa thuận hạn chế cạnh tranh (ấn định giá)",["Tập trung kinh tế hợp pháp","Quảng cáo","Khuyến mại thông thường"],"Điều 11 Luật Cạnh tranh 2018.")],
   law:"Điều 11, 24 Luật Cạnh tranh 2018",
   lesson:"Chặn từ sớm: tính thị phần, kiểm tra thỏa thuận ngầm về giá, báo cáo tập trung kinh tế khi chạm ngưỡng.",
   warn:"Ngưỡng thông báo tập trung kinh tế theo NĐ 35/2020 (cần đối chiếu bản hiện hành)."};}},

{id:"l_tam_giu",role:"Thẩm phán, hòa giải viên",topic:"hs",level:2,make:function(R){
  var lan=R.int(0,2);
  return {title:"Tạm giữ trong tố tụng hình sự",
   facts:["Cơ quan điều tra tạm giữ một người trong trường hợp khẩn cấp. Đã gia hạn "+lan+" lần.","Người thân hỏi tổng thời hạn tạm giữ tối đa."],
   stages:[
    simMC("Thời hạn tạm giữ ban đầu?","03 ngày",["24 giờ","07 ngày","10 ngày"],"Điều 118 BLTTHS 2015."),
    simMC("Tổng thời hạn tạm giữ tối đa kể cả hai lần gia hạn?","09 ngày",["06 ngày","12 ngày","15 ngày"],"Điều 118: mỗi lần gia hạn không quá 03 ngày, gia hạn tối đa hai lần."),
    simMC("Người bị tạm giữ có quyền gì?","Được biết lý do, được gặp người bào chữa, khiếu nại về việc tạm giữ",["Không có quyền bào chữa","Không được thông báo cho người thân","Chỉ được gặp luật sư sau 30 ngày"],"Điều 59 BLTTHS 2015.")],
   law:"Điều 59, 118 BLTTHS 2015",
   lesson:"Ghi nhớ 3 + 3 + 3 = 9 ngày; mọi lần gia hạn cần phê chuẩn của Viện kiểm sát.",
   warn:"Chỉ mang tính học tập; vụ việc cụ thể cần luật sư hình sự."};}},

{id:"l_dat_dai",role:"Luật sư tư vấn",topic:"dd",level:3,make:function(R){
  var s=R.step(120,400,10);
  return {title:"Chuyển nhượng quyền sử dụng đất: điều kiện",
   facts:["Hộ gia đình muốn chuyển nhượng thửa đất ở diện tích "+s+" m2 cho người khác.","Thửa đất đã có Giấy chứng nhận, đang không tranh chấp, không bị kê biên, còn trong thời hạn sử dụng."],
   stages:[
    simMC("Điều kiện cơ bản để người sử dụng đất thực hiện quyền chuyển nhượng?","Có Giấy chứng nhận, đất không tranh chấp, không bị kê biên, còn thời hạn sử dụng và không bị biện pháp khẩn cấp tạm thời",["Chỉ cần hợp đồng viết tay","Chỉ cần xác nhận của trưởng thôn","Chỉ cần nộp thuế"],"Điều 45 khoản 1 Luật Đất đai 2024 (đã đối chiếu nguyên văn): đủ 5 điều kiện."),
    simMC("Hợp đồng chuyển nhượng quyền sử dụng đất phải được?","Công chứng hoặc chứng thực; đăng ký biến động tại cơ quan đăng ký đất đai",["Chỉ ký tay","Chỉ cần có người làm chứng","Không cần đăng ký"],"Luật Đất đai 2024 và Luật Công chứng 2024; đăng ký biến động trong 30 ngày (Điều 133 khoản 3).")],
   law:"Luật Đất đai 2024 (31/2024/QH15) và văn bản hướng dẫn",
   lesson:"Soát giấy chứng nhận, tranh chấp, kê biên, thời hạn rồi mới làm công chứng và đăng ký.",
   warn:"Đã đối chiếu Điều 45, 133 nguyên văn; luôn kiểm tra thêm quy hoạch và nghị định hướng dẫn mới nhất."};}}

];
