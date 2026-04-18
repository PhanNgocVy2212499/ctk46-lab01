# Bài thực hành 3 - Báo cáo kết quả (vai trò sinh viên)

## 1) Thử fetch với cache no-store trong getPosts()

Em đã đổi hàm getPosts trong trang blog sang:

- fetch(url, { cache: "no-store" })

Ý nghĩa:

- no-store buộc Next.js không lấy dữ liệu từ cache server cho request này.
- Mỗi lần tải lại trang, hệ thống sẽ gọi lại API để lấy dữ liệu mới nhất.

Cách em kiểm tra trong DevTools Network:

1. Mở trang /blog.
2. Nhấn F12, vào tab Network, lọc theo "posts".
3. Reload trang nhiều lần.
4. So sánh trước/sau khi dùng no-store:
- Trước: có thể thấy hành vi cache (ít request mới hơn tùy theo chế độ render).
- Sau: mỗi lần reload đều có request mới đến endpoint posts.

## 2) Hiển thị danh sách comments trong trang chi tiết /blog/[id]

Em đã thêm API:

- https://jsonplaceholder.typicode.com/posts/{id}/comments

Em đã thêm:

- Hàm getComments(id) để gọi API comments.
- Phần UI hiển thị danh sách bình luận gồm:
- Tên người bình luận
- Email
- Nội dung bình luận
- Số lượng bình luận

## 3) Dùng Promise.all cho luồng getPost/getUser

Trang chi tiết đã được tối ưu theo hướng Promise.all:

- Tạo postPromise = getPost(id)
- Dùng Promise.all để chờ đồng thời:
- postPromise
- postPromise.then((post) => getUser(post.userId))
- getComments(id)

Giải thích ngắn gọn:

- Vì getUser cần userId từ post nên không thể khởi động hoàn toàn độc lập từ đầu.
- Tuy nhiên vẫn có lợi ích khi gom các tác vụ vào Promise.all:
- Cơ chế chờ đồng bộ kết quả rõ ràng hơn
- Có thể chạy song song comments với post
- Giảm tổng thời gian chờ ở trang vì comments không bị đợi sau user

Tại sao cách này tốt hơn?

- Tốc độ tải trang tốt hơn do không bắt buộc mọi request phải đợi request trước xong hết.
- Code dễ mở rộng hơn khi cần thêm request độc lập khác.
- Tránh viết nhiều await nối tiếp gây tăng độ trễ tổng.

## Kết luận

Sau khi cập nhật:

- Trang /blog lấy dữ liệu theo no-store.
- Trang /blog/[id] hiển thị đầy đủ bài viết, tác giả và comments.
- Luồng gọi API được tối ưu theo hướng Promise.all để hiệu năng tốt hơn.
