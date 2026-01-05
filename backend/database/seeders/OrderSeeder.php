<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		DB::table('orders')->insert([
			[
				'user_id' => 3, // customer01
				'promotion_id' => 1, // NEWYEAR2026 (15% off)
				'address_id' => 1,
				'subtotal_amount' => 34990000,
				'discount_amount' => 5248500, // 15% of 34990000
				'shipping_fee' => 30000,
				'total_amount' => 29771500,
				'payment_method' => 'vnpay',
				'payment_status' => 'paid',
				'delivery_method' => 'express',
				'delivery_status' => 'delivered',
				'created_at' => now()->subDays(10),
				'updated_at' => now()->subDays(5),
			],
			[
				'user_id' => 4, // customer02
				'promotion_id' => 2, // FLASH100K (100k off)
				'address_id' => 3,
				'subtotal_amount' => 45990000,
				'discount_amount' => 100000,
				'shipping_fee' => 0,
				'total_amount' => 45890000,
				'payment_method' => 'cod',
				'payment_status' => 'pending',
				'delivery_method' => 'standard',
				'delivery_status' => 'shipping',
				'created_at' => now()->subDays(3),
				'updated_at' => now()->subDays(1),
			],
			[
				'user_id' => 3, // customer01
				'promotion_id' => null,
				'address_id' => 2,
				'subtotal_amount' => 17980000, // 2x Sony headphones
				'discount_amount' => 0,
				'shipping_fee' => 30000,
				'total_amount' => 18010000,
				'payment_method' => 'vnpay',
				'payment_status' => 'paid',
				'delivery_method' => 'standard',
				'delivery_status' => 'confirmed',
				'created_at' => now()->subDays(2),
				'updated_at' => now()->subHours(12),
			],
			[
				'user_id' => 4, // customer02
				'promotion_id' => 1, // NEWYEAR2026 (15% off)
				'address_id' => 4,
				'subtotal_amount' => 29990000,
				'discount_amount' => 4498500, // 15% of 29990000
				'shipping_fee' => 30000,
				'total_amount' => 25521500,
				'payment_method' => 'cod',
				'payment_status' => 'pending',
				'delivery_method' => 'express',
				'delivery_status' => 'pending',
				'created_at' => now()->subHours(6),
				'updated_at' => now()->subHours(6),
			],
		]);
	}
}
