<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductAttributeValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('product_attribute_values')->insert([
            // MSI Gaming GF63 Thin
            [
                'product_id' => 1,
                'attribute_id' => 3, // RAM
                'value' => '8',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 1,
                'attribute_id' => 4, // Kích thước màn hình
                'value' => '15.6',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Acer Aspire 5
            [
                'product_id' => 2,
                'attribute_id' => 3, // RAM
                'value' => '8',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 2,
                'attribute_id' => 4, // Kích thước màn hình
                'value' => '15.6',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Dell XPS 15
            [
                'product_id' => 3,
                'attribute_id' => 3, // RAM
                'value' => '16',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 3,
                'attribute_id' => 4, // Kích thước màn hình
                'value' => '15',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
