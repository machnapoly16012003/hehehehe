import voice1Video from "../assets/voice1.mp4";

/**
 * Cấu hình nội dung thư gõ chữ (Typewriter Letter) & Giọng đọc tâm sự (Narration Voiceover)
 * Mặc định sử dụng video voice1.mp4 từ thư mục src/assets/
 */
export const defaultLetterNarration = {
  enabled: true,
  src: voice1Video,
  sourceType: "video", // "video" | "audio"
  title: "My voice",
  subtitle:
    "Nhấn phát để vừa nghe anh đọc, vừa xem cái lời",
};

export const defaultLetterSections = [
  {
    id: 1,
    text: "Hello Nhi nha",
    speed: 85,
    pause: 1400,
    style: "large",
    align: "left",
  },
  {
    id: 2,
    text: "Chắc chắn là em đang đọc cái dòng chữ này, anh đang theo dõi em qua camera anh thấy hết =))) gan dữ lắm mình mới dám làm cái này thì có cái gì lạ lạ em để yên đó đi. Ròi giờ dỡn dỡn xíu đi ha ròi vô câu chiện chính. ĐỌC TIẾP ĐI",
    speed: 60,
    pause: 1500,
    style: "normal",
    align: "left",
  },
  {
    id: 3,
    text: "LÀM CÁI này thì anh làm cũng chắc vừa vừa nên nó kh đc đẹp lắm, chủ yếu là anh muốn tạo ấn tượng với em một cái gì đó để em có thể là sẽ nhớ tới anh một xíu xiu... anh biết là em vẫn đang đọc nên là giờ em đọc tiếp đi còn ở dứ nữa .",
    speed: 60,
    pause: 1400,
    style: "italic",
    align: "left",
  },
  {
    id: 4,
    text: "HÔM NAY CÓ VẺ NHƯ LÀ MỘT CÁI NGÀY ĐẶC BIỆT NHỜ =)))) GIỜ TỤI MÌNH CBI CÓ DANH PHẬN NÈ CỐT",
    speed: 65,
    pause: 1700,
    style: "highlight",
    align: "left",
  },
  {
    id: 5,
    text: "Oceiii nay 16/10 . 16 là ngày sinh nhật anh còn 1 tháng 6 là sinh nhật em nên ngày 16 là đẹp nhất ròi. Ngày này mà thành đôi là đẹp luôn cốt , giờ muốn có danh phận ròi. Lâu quá k có đc iu",
    speed: 55,
    pause: 2000,
    style: "serif",
    align: "center",
  },
  {
    id: 6,
    text:"Tâm sự nhẹ xíu đi ha cốt. Tức là cũng khó khăn lắm mình cũng quen nhau được. Anh cũng k biết sao mà giờ anh iu em vãi l như zay nữa, giờ cũng sợ mất em vãi l luôn. Mình biết nhau chắc cũng rất là lâu ròi, cái lúc mà cái em mặc đầm tím đi ăn với gia đình đó. Okeii thừa nhận là tại em đẹp anh cũng tia em lúc đó với đã hơn nữa là em ngồi ở khu của anh trực với lại là gia đình em dễ thương mà k có hối anh nên anh chú ý lắm. Khúc này kể nhiểu ròi nên ngắn gọn đi ha. Má đã thiệt tự nhiên được em đầm tím như tiểu thư xin info anh nhân ziên Hokkaido . Lúc đó mà kiu là hong em là giờ cúc luôn ròi.  Là tự nhiên quen đc em 2 tháng, anh cũng k biết sao mà giờ anh iu em vãi l như zay nữa, giờ cũng sợ mất em vãi l luôn. Mình biết nhau chắc cũng rất là lâu ròi, cái lúc mà cái em mặc đầm tím đi ăn với gia đình đó. Okeii thừa nhận là tại em đẹp anh cũng tia em lúc đó với đã hơn nữa là em ngồi ở khu của anh trực với lại là gia đình em dễ thương mà k có hối anh nên anh chú ý lắm. Khúc này kể nhiểu ròi nên ngắn gọn đi ha. Má đã thiệt tự nhiên được em đầm tím như tiểu thư xin info anh nhân ziên Hokkaido . Lúc đó mà kiu là hong em là giờ cúc luôn ròi.  Là tự nhiên quen đc em 2 tháng cũng may vcl, nhma cốt kiu quen hơi nhanh nha , làm anh bị ngộp á. Mà lúc đó cũng quãi thiệc qua chơi đc tỏ tình cũng hay. May là cũng dính 2 tháng nhma lúc đó khác nhau về suy nghĩ nên ctay cũng lẹ. Dm bị chửi như concho zay. Nhma bồ mình mình thương . Mà cũng cho là may đi may là ctay lúc đó chứ quen nữa khổ nữa . Ctay xong lụy mấy tháng mới end đc mà má lụy xong cái t thành con quỷ luôn. Chắc cái việc anh nhớ anh tội nhất là em kiu em đau mắt đỏ, bữa đó trời mưa vãi l, mà còn 10h tối nữa, chạy qua cầm thuốc nhỏ mắt với mấy cái đồ ăn vặt qua mà ẻm ngủ. Cũng lỗi anh anh lo qua anh qua k báo. Cái được một lúc ẻm dậy ẻm rep 1 câu xogn tưởng gặp đc ròi, cái ha dm đi ngủ tiếp . Ngồi đợi chắc 2 tiếng mấy như concho rách luôn. Nhma nhờ zayy mới có kỉ niệm đc, dui vcl . Ròi với cái lần mà đi mua chuột với em nữa . Thề lúc đó ngại vcl hình như là lần đầu đc đứng trước nhà em á xong chị em có kiu vô ngồi mà anh ngại. Xong chở em đi tự nhiên em ôm anh nha mà lúc đó ctay cmnr. Đã đi xe mà k đội nón bảo hiểm nữa , ròi gặp l Đạt k có bằng lái nữa bị bắt là anccuc , mà hên là đi đc về đc. Bằng một cách nào đó tưởng như quay lại nhma không. Mình ntin như ngiu nhma một lúc nào đó thì kh phải là iu, ohh quaoo.Cay nha , tui quýnh có rớt 2 sao à mà bà dũa tui ác lắm . T tưởng đâu ngày cúi cùng t sống tới nơi zayy. Để đi giờ t biết nick Liên Quân ròi mốt t hack luôn.",
    speed: 55,
    pause: 2000,
    style: "normal",
    align: "left",
  },
  {
    id: 7,
    text: "Gòi giờ tới lúc move on em xong nè. Là anh cũng học đại học, anh gặp cũng rất là nhiều ng , hầu như là đủ mọi thể loại. Coi như là anh trải đời xong luôn ròi đó. Má hết bị trap tới bị chán ròi tới bị ngta tệ vãi l tệ mà anh vẫn ngu. Gòi cái tui mới đi trả thù đời bà , anh đi tệ ngược lại với ng khác , anh hong muốn iu luôn anh chỉ muốn ntin cho dui ròi đi chơi cho dui giết thời gian th à. Mà nha lâu lâu anh rãnh á cái anh đi stalk lum la . Anh có stalk em nữa nên anh mới bic em có bồ mới . Hình như là stalk em cũng kha khá th. Ròi đợt rãnh tự nhiên vô stalk thấy bị block . Mà cũng hong nghĩ nhiều anh cứ nghĩ là em hồi trc đã ghét anh thì giờ em block thoi anh cũng kệ , mà thật ra kh phải em block. Hài thiệt !! Ròi nha vẫn lâu lâu stalk tự nhiên thấy mở block xong vài ngày hay gì á block tiếp . Anh mới thấy em rãnh quá nên kh stalk nữa mà thật ra không phải em làm điều này. Chắc cái lúc em add anh xong anh thấy vậy anh kh accept em luôn. Ròi để cỡ 2 ngày hay gì á em hủy . Anh không acp tại lúc đó em có bồ ròi. Mà với suy nghĩ anh bây giờ thì chắc lúc đó em mệc lắm nên mới add anh . Đợt mà em stalk anh xong em thấy anh có up str nhỏ nào á mà lúc đó là anh đang quen con quỷ . Anh bị ép chứ má anh suy nghĩ vãi l lắm. Kiểu anh nghĩ là anh sẽ thay đổi đc 1 con ng á. giờ kể nghe ghéc lắm. Nên em nhớ là lúc đó anh có bồ cũng đúng. 2025 thì anh nhớ là mình có lâu lâu nhắn tin với nhau. Hầu như là bé nhắn anh trước là nhìu xong anh cũng thấy dui nên nhắn lại. Mà hỏng bic sao lâu lâu cái bị block kì thiệt =)))) ấn tượng là bị block nha cốt iu. Khúc này anh hỏng biết kể thêm cái gì hết nên là giờ mình đổi qua khúc khác đi .  ",
    speed: 60,
    pause: 2200,
    style: "normal",
    align: "left",
  },
  {
    id: 8,
    text: "Tới khúc này là tụi mình bắt đầu lại nè",
    speed: 60,
    pause: 2400,
    style: "highlight",
    align: "center",
  },
  {
    id: 9,
    text: "Chắc là mình bắt đầu từ hồi tháng tư , lúc đó là em nhắn cho anh trước , kiểu nhắn qua loa này kia xong em mới bắt đầu kể về thằng đó như nào với em . Ban đầu thì anh nghĩ là bình thường iu nhau nên khó chịu này nọ, giận này nọ nhma không. Và hầu như mọi cuộc nchuyen của anh với em đều kể về nó rất là nhiều mấy cái hành động nó làm với em. Tất nhiên là ban đầu anh nghe với cách bthuogn và anh chỉ là đang lắng nghe em th nhma dần thì anh muốn thay đổi hơn là anh có cảm tình với em một xíu với cái cách mà em quan tâm anh . Em lúc đó em bất lực lắm Nhi , em kể mà anh thấy là em rất là mệc nhma em vẫn quan tâm tới anh . Nên là dần thì anh suy nghĩ anh muốn kéo em ra khỏi th đó. Gòi he nhắn tin lại đc mấy ngày hay mấy tuần gì á xong tự nhiên mình dừng nhắn luôn. Anh cũng chẳng biết tại sao nhma thoi anh cũng kệ, anh cũng cho em lời khuyên ời cái anh cũng im anh hong hỏi luôn. Gòi he tới ngày sinh nhật bả he, tụ nhin thấy ẻm up hình bên insta anh nghĩ là oh. Khuyên cho đã xong ẻm quay lại nhma giờ nghe em kể anh mới bic hết. Anh nghĩ em qlai với nó nữa là vì cái lúc tốt nghiệp hình như em có up thêm hình nó nữa. ohh vãi l chưa . =))))) Cô ấy bị ép . May là ẻm đủ tỉnh táo ẻm kh quay lại. Mà hên là gặp anh Đạt nữa, sau lần đó thì anh vẫn ntin em bthuong chớ cũng chưa tình cảm gì đâu. Mà nhắn nhìu xong qtam nhìu cái anh nghĩ anh có tình cảm. Và em cũng muốn qlai với anh. Anh thì muốn em dứt hẳn thằng đấy . Nên là ban đầu em hỏi mình là gì mà quan tâm nhau dữ zayy thì anh luôn tránh né tại anh muốn em dứt hẳn nó, nghĩ tới nó thì em chỉ thấy phiền th. Đó giờ tui làm được ròi đó cốt. Mà đã thiệt, anh với em tìm hiểu lâu thiệt. Tại thằng Đạt hết, quen em anh mới bic là đc iu nó đã dữ . ",
    speed: 75,
    pause: 2600,
    style: "normal",
    align: "left",
  },
  ,
  {
    id: 9,
    text: "Thật ra là cũng chưa có quen mà là mình kiểu chắc mập mờ, mà như là mập địch luôn ròi bé . Kiểu tự dưng quen nhau mà k có nói năng cái gì hết , cũng không biết là khi nào quen luôn. Công nhận quen anh em tốn nước mắt thiệt , đi bủi nào mà k rớt nước mắt là chịu không có đc. Anh nhớ là anh làm em khóc 2 lần tại vì lúc đó cái mỏ anh nó hư quá , nó nói thẳng quá xong nói sao mà hồi thấy em im im xong em khóc . Mà anh rối thiệt anh không biết làm gì hết xong anh mới chọc chọc em để em cười lại. Anh nghĩ là giờ thì chắc cũng vừa nêm ròi đó giờ là cho cái danh phận nữa đẹp luôn cốt . Công khai luôn đc ròi. Đạt biết là Đạt chưa có hiểu hết iu là cái gì nên bé thông cảm nha . Lâu ròi mới iu cốt oi . Hên quá là ẻm lấy đth coi nhma chưa có mở đc vô cái này coi. Hôm nay là ngày đẹp luôn cốt , anh nghĩ là giờ mình love nhau là đẹp ròi , không phải đợi nữa , Em chỉ có dạ và đồng ý th kh có option cho em lựa đâu Nhi. Yên tâm là anh sẽ làm mấy ngày tháng còn lại của em nó trở nên an toàn tuyệt đối , nhma skin pubg đẹp quá cốt uoc gì đc bắn pubg luôn á . giờ anh rối quá anh cũng không biết nên nói gì nữa tại vì là cái này anh nghĩ gì nói đó trong một lần. Làm zay nó mơi thật lòng đc cốt . Gòi hoi hong có vòng vo nữa . Đó giờ thì mình cũng quen nhau đc một thời gian, gặp cũng nhiều lần ròi và anh cũng mong là anh sẽ gặp em được thêm nhiều lần nữa. Lần này là anh nghiêm túc với em . Cảm ơn đã iu anh . Anh nghĩ là giờ mà bỏ lỡ em chắc ác lắm nên là th giờ tui hốt bà luôn bà Nhi . Má giờ hong biết nói gì nhiều hết , nói chum là cảm ơn bạn rất rất là nhìu vì đã tới đây nha bà. TUI THƯƠNG BÀ lắm . ",
    speed: 75,
    pause: 2600,
    style: "normal",
    align: "left",
  },
  
  {
    id: 10,
    text: "GÒI !! nói có nhiêu đó thôi á chứ mà kiu t nói ở ngoài t quên chắc ",
    speed: 75,
    pause: 2600,
    style: "final",
    align: "center",
  },
];
