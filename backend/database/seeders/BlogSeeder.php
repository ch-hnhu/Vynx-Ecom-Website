<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;
use Carbon\Carbon;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
            $baseUrl = 'http://localhost:8000/storage/blogs/';
        $items = [
            [
                'author_name' => 'Nguyễn Thành',
                'title' => 'HONOR Magic8 RSR ra mắt: Siêu flagship mang DNA Porsche, camera tele 200MP và lens zoom xịn sò',
                'content' => 'HONOR vừa chính thức trình làng HONOR Magic8 RSR Porsche Design tại Trung Quốc, mẫu “super flagship” mới nhất được phát triển cùng Porsche Design. Đây là phiên bản cao cấp nhất của dòng Magic8, hướng đến người dùng yêu cầu trải nghiệm đỉnh cao cả về thiết kế, hiệu năng lẫn nhiếp ảnh di động. Máy sở hữu khung viền kim loại cứng cáp, mặt lưng hoàn thiện sang trọng cùng điểm nhấn nhận diện thương hiệu Porsche. 
                Về cấu hình, Magic8 RSR sử dụng vi xử lý Snapdragon đầu bảng kết hợp RAM tốc độ cao và bộ nhớ chuẩn UFS mới, cho khả năng xử lý mượt các tác vụ nặng như chỉnh sửa ảnh/video hay game đồ họa cao. Màn hình OLED LTPO có tần số quét thích ứng, hiển thị sắc nét và tối ưu pin khi dùng hằng ngày. Viên pin dung lượng lớn hỗ trợ sạc nhanh có dây và không dây, đủ dùng trọn ngày làm việc.
                Điểm nổi bật nhất nằm ở cụm camera: ống kính tele 200MP kết hợp thuật toán zoom mới giúp giữ chi tiết tốt hơn khi chụp xa. Trong thực tế, ảnh zoom vẫn cho độ sắc nét cao, ít nhiễu và màu sắc ổn định. Camera chính sử dụng cảm biến lớn giúp chụp thiếu sáng cải thiện rõ rệt. Với những nâng cấp này, Magic8 RSR hướng đến người dùng đam mê chụp ảnh di động và cần một chiếc flagship toàn diện.',
                'image_url' => $baseUrl . 'honer_magic_8.jpg',
            ],
            [
                'author_name' => 'Trần Minh',
                'title' => 'Laptop học tập – làm việc: chọn cấu hình nào để dùng bền 3–5 năm?',
                'content' => 'Nhiều người mua laptop cho học tập và làm việc thường băn khoăn cấu hình nào là “đủ” để dùng bền 3–5 năm. Điểm quan trọng nhất là cân bằng giữa CPU, RAM và SSD. Với tác vụ văn phòng, học online, chỉnh sửa ảnh nhẹ, bạn nên ưu tiên CPU tầm trung thế hệ mới, RAM tối thiểu 16GB và SSD từ 512GB trở lên để đảm bảo khả năng đa nhiệm.
                Màn hình cũng là yếu tố quan trọng: tấm nền IPS với độ sáng tốt giúp mắt dễ chịu khi làm việc lâu. Nếu thường xuyên di chuyển, trọng lượng dưới 1.5kg và pin thực tế 6–8 giờ sẽ mang lại trải nghiệm tốt hơn. Bàn phím có hành trình ổn định và touchpad rộng giúp thao tác nhanh. 
                Một lưu ý khác là khả năng nâng cấp. Một số mẫu cho phép nâng RAM/SSD sau này, giúp kéo dài vòng đời thiết bị và tiết kiệm chi phí. Trước khi mua, nên kiểm tra cổng kết nối, webcam và chất lượng loa để phục vụ học họp trực tuyến. Với những tiêu chí này, bạn sẽ chọn được một chiếc laptop ổn định, dùng lâu dài và tối ưu ngân sách.',
                'image_url' => $baseUrl . 'lap-top.jpg',
            ],
            [
                'author_name' => 'Lê Hạnh',
                'title' => 'Laptop mỏng và nhẹ: lợi thế khi làm việc di động',
                'content' => 'Laptop mỏng nhẹ đang là xu hướng bởi đáp ứng tốt nhu cầu làm việc di động. Với trọng lượng khoảng 1.2–1.4kg, người dùng có thể mang theo cả ngày mà không bị mỏi. Tuy nhiên, không phải mẫu nào cũng đánh đổi hiệu năng. Nhiều dòng máy hiện nay dùng CPU tiết kiệm điện nhưng vẫn đủ mạnh cho đa nhiệm văn phòng và chỉnh sửa ảnh cơ bản.
                Để chọn đúng, bạn nên chú ý đến chất liệu vỏ máy (nhôm hoặc hợp kim sẽ cứng cáp hơn), bàn phím gõ êm và màn hình có độ sáng tối thiểu 300 nits để dùng tốt trong nhiều môi trường ánh sáng. Pin là yếu tố then chốt: các mẫu có pin 50–60Wh thường cho thời gian sử dụng thực tế 7–9 giờ.
                Một số mẫu laptop mỏng nhẹ còn trang bị sạc USB-C, giúp sạc nhanh bằng củ sạc nhỏ gọn. Điều này rất tiện khi di chuyển, chỉ cần mang một củ sạc cho nhiều thiết bị. Nếu bạn là người thường xuyên học tập, làm việc tại quán cà phê hoặc di chuyển nhiều, laptop mỏng nhẹ là lựa chọn đáng cân nhắc.',
                'image_url' => $baseUrl . 'laptop-mong-va-nhe-1.jpg',
            ],
        ];

        foreach ($items as $index => $item) {
            Blog::create([
                'author_name' => $item['author_name'],
                'title' => $item['title'],
                'image_url' => $item['image_url'],
                'content' => $item['content'],
                'published_at' => $now->copy()->subDays($index + 1)->setTime(9 + ($index % 5), 15),
                'is_active' => true,
            ]);
        }
    }
}