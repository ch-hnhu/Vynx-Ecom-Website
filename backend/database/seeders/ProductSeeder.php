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
                'name' => 'MSI Gaming GF63 Thin',
                'slug' => 'msi-gaming-gf63-thin',
                'description' => 'Laptop gaming mỏng nhẹ với card đồ họa NVIDIA GeForce GTX 1650, màn hình 15.6 inch Full HD 120Hz',
                'price' => 19990000,
                'image_url' => json_encode([
                    'https://example.com/products/msi-gf63-1.jpg',
                    'https://example.com/products/msi-gf63-2.jpg',
                    'https://example.com/products/msi-gf63-3.jpg'
                ]),
                'category_id' => 2, // Laptop
                'brand_id' => 5, // MSI
                'promotion_id' => 1, // NEWYEAR2026
                'stock_quantity' => 50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Acer Aspire 5',
                'slug' => 'acer-aspire-5',
                'description' => 'Laptop văn phòng với hiệu năng ổn định, màn hình 15.6 inch Full HD',
                'price' => 15990000,
                'image_url' => json_encode([
                    'https://example.com/products/acer-aspire-5-1.jpg',
                    'https://example.com/products/acer-aspire-5-2.jpg'
                ]),
                'category_id' => 2, // Laptop
                'brand_id' => 2, // Acer
                'promotion_id' => null,
                'stock_quantity' => 40,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Dell XPS 15',
                'slug' => 'dell-xps-15',
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
                'slug' => 'sony-wh-1000xm5',
                'description' => 'Tai nghe chống ồn tốt nhất thế giới, âm thanh Hi-Res, pin 30 giờ, kết nối đa điểm',
                'price' => 8990000,
                'image_url' => json_encode([
                    'https://example.com/products/sony-headphone-1.jpg',
                    'https://example.com/products/sony-headphone-2.jpg'
                ]),
                'category_id' => 4, // Tai nghe
                'brand_id' => 3, // Sony
                'promotion_id' => 3, // SUMMER20
                'stock_quantity' => 100,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz',
                'slug' => 'corsair-vengeance-lpx-16gb-ddr4-3200mhz',
                'description' => 'Bộ nhớ RAM Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz, hiệu năng cao cho máy tính chơi game và làm việc đa nhiệm',
                'price' => 2490000,
                'image_url' => json_encode([
                    'https://example.com/products/corsair-ram-1.jpg',
                    'https://example.com/products/corsair-ram-2.jpg'
                ]),
                'category_id' => 8, // Ram
                'brand_id' => 1, // Corsair
                'promotion_id' => null,
                'stock_quantity' => 75,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
