/**
 * Hỗ trợ tự động nhận diện tài nguyên (ảnh, video, audio) từ cả 2 nguồn:
 * 1. Thư mục `src/assets/` (Dành cho bạn muốn thả tất cả ảnh/video vào src/assets/)
 * 2. Thư mục `public/` (Đường dẫn tĩnh như /images/..., /videos/..., /audio/...)
 */

// Tự động quét toàn bộ file trong src/assets/ bằng tính năng của Vite
const assetFiles = import.meta.glob('../assets/*', { eager: true, query: '?url', import: 'default' });

/**
 * Lấy URL hợp lệ cho ảnh, audio hoặc video
 * @param {string} pathOrName - Có thể là tên file trong src/assets/ (vd: 'voice1.mp4', 'anh1.jpg') hoặc đường dẫn đầy đủ (/videos/..., /images/...)
 * @returns {string} Đường dẫn URL chuẩn
 */
export function resolveAsset(pathOrName) {
  if (!pathOrName) return '';

  // Nếu là blob preview từ trình duyệt hoặc link ngoài
  if (pathOrName.startsWith('blob:') || pathOrName.startsWith('http://') || pathOrName.startsWith('https://') || pathOrName.startsWith('data:')) {
    return pathOrName;
  }

  // Chuẩn hóa tên file: loại bỏ tiền tố 'src/assets/', 'assets/', '/'
  const cleanName = pathOrName.replace(/^(\/)?(src\/)?assets\//, '').replace(/^\//, '');

  // 1. Tìm trong thư mục src/assets/
  const matchKey = Object.keys(assetFiles).find((k) => k.endsWith('/' + cleanName));
  if (matchKey && assetFiles[matchKey]) {
    return assetFiles[matchKey];
  }

  // 2. Nếu là đường dẫn public (bắt đầu bằng '/')
  if (pathOrName.startsWith('/')) {
    return pathOrName;
  }

  // 3. Fallback: coi như đường dẫn gốc
  return `/${cleanName}`;
}
