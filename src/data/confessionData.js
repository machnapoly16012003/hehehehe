/**
 * Cấu hình phần Tỏ tình (Confession) và Kết thúc (Ending) bằng Tiếng Việt
 */
export const defaultConfessionData = {
  subtitle: "Anh nghĩ là giờ anh phải nói",
  lines: [
    "Mình cũng là may vcl may mới qlai được",
    "Nên là kh muốn về nhì nữa ",
    "1 là em có 2 là em dạ có . DUNG DE THANG NAY NONG"
  ],
  responses: [
    {
      id: "yes",
      label: "Em dạ có",
      responseTitle: "Dung co don mat voi t:",
      responseMessage: "mai iu.",
      badge: "Tốt em"
    },
    {
      id: "think",
      label: "Em đồng ý",
      responseTitle: "Quy luat lam bo:",
      responseMessage: "Em la luat",
      badge: "Giỏi em"
    }
  ]
};

export const defaultEndingData = {
  credits: [
    "Giờ thì có danh phận",
    "Qúa là ngon, mình muốn đập bồ mình một cái.",
    "Má thề tự nhiên nghĩ ra cái này sến vcl mà chịu khó coi đi ha Nhi . Hết cách ròi bé"
  ],
  signOff: "iu em =)))",
  date: "Tháng 10, 2026",
  restartButtonText: "ĐỌC LẠI TỪ ĐẦU"
};
