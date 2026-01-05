<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SlideshowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('slideshows')->insert([
            [
                'title' => 'Ra mắt iPhone 16 Pro Max',
                'image_url' => 'https://example.com/slides/iphone16-banner.jpg',
                'link_url' => '/products/iphone-16-pro-max',
                'position' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Samsung Galaxy S24 Ultra - Siêu phẩm 2026',
                'image_url' => 'https://example.com/slides/samsung-s24-banner.jpg',
                'link_url' => '/products/samsung-galaxy-s24-ultra',
                'position' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Laptop Dell XPS - Giảm giá đến 30%',
                'image_url' => 'https://example.com/slides/dell-xps-sale.jpg',
                'link_url' => '/promotions/laptop-sale',
                'position' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Tai nghe Sony WH-1000XM5 - Chống ồn hoàn hảo',
                'image_url' => 'https://example.com/slides/sony-headphone.jpg',
                'link_url' => '/products/sony-wh-1000xm5',
                'position' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
