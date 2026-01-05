<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		DB::table('products')->insert([
			[
				'name' => 'iPhone 16 Pro Max',
				'description' => 'Siêu phẩm công nghệ với chip A18 Pro mạnh mẽ, camera 48MP, màn hình Super Retina XDR 6.7 inch',
				'price' => 34990000,
				'image_url' => json_encode([
					'https://example.com/products/iphone16-1.jpg',
					'https://example.com/products/iphone16-2.jpg',
					'https://example.com/products/iphone16-3.jpg'
				]),
				'category_id' => 1, // Điện thoại
				'brand_id' => 1, // Apple
				'promotion_id' => 1, // NEWYEAR2026
				'stock_quantity' => 50,
				'created_at' => now(),
				'updated_at' => now(),
			],
			[
				'name' => 'Samsung Galaxy S24 Ultra',
				'description' => 'Flagship Android với bút S Pen, camera zoom 100x, màn hình Dynamic AMOLED 2X 6.8 inch',
				'price' => 29990000,
				'image_url' => json_encode([
					'https://example.com/products/samsung-s24-1.jpg',
					'https://example.com/products/samsung-s24-2.jpg'
				]),
				'category_id' => 1, // Điện thoại
				'brand_id' => 2, // Samsung
				'promotion_id' => 1, // NEWYEAR2026
				'stock_quantity' => 35,
				'created_at' => now(),
				'updated_at' => now(),
			],
			[
				'name' => 'Dell XPS 15',
				'description' => 'Laptop cao cấp cho dân văn phòng và sáng tạo nội dung, màn hình 4K OLED, Intel Core i7 thế hệ 13',
				'price' => 45990000,
				'image_url' => json_encode([
					'https://example.com/products/dell-xps-1.jpg',
					'https://example.com/products/dell-xps-2.jpg',
					'https://example.com/products/dell-xps-3.jpg',
					'https://example.com/products/dell-xps-4.jpg'
				]),
				'category_id' => 2, // Laptop
				'brand_id' => 4, // Dell
				'promotion_id' => null,
				'stock_quantity' => 20,
				'created_at' => now(),
				'updated_at' => now(),
			],
			[
				'name' => 'Sony WH-1000XM5',
				'description' => 'Tai nghe chống ồn tốt nhất thế giới, âm thanh Hi-Res, pin 30 giờ, kết nối đa điểm',
				'price' => 8990000,
				'image_url' => json_encode([
					'https://example.com/products/sony-headphone-1.jpg',
					'https://example.com/products/sony-headphone-2.jpg'
				]),
				'category_id' => 3, // Tai nghe
				'brand_id' => 3, // Sony
				'promotion_id' => 3, // SUMMER20
				'stock_quantity' => 100,
				'created_at' => now(),
				'updated_at' => now(),
			],
		]);
	}
}
