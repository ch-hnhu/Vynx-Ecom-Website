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
			// iPhone 16 Pro Max
			[
				'product_id' => 1,
				'attribute_id' => 1, // Màu sắc
				'value' => 'Titan Đen',
				'created_at' => now(),
				'updated_at' => now(),
			],
			[
				'product_id' => 1,
				'attribute_id' => 2, // Bộ nhớ
				'value' => '256',
				'created_at' => now(),
				'updated_at' => now(),
			],
			// Samsung Galaxy S24 Ultra
			[
				'product_id' => 2,
				'attribute_id' => 1, // Màu sắc
				'value' => 'Titan Tím',
				'created_at' => now(),
				'updated_at' => now(),
			],
			[
				'product_id' => 2,
				'attribute_id' => 2, // Bộ nhớ
				'value' => '512',
				'created_at' => now(),
				'updated_at' => now(),
			],
		]);
	}
}
