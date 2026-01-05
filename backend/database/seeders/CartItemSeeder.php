<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CartItemSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		DB::table('cart_items')->insert([
			[
				'cart_id' => 1, // customer01's cart
				'product_id' => 1, // iPhone 16 Pro Max
				'quantity' => 1,
				'price' => 34990000,
				'created_at' => now(),
				'updated_at' => now(),
			],
			[
				'cart_id' => 1, // customer01's cart
				'product_id' => 4, // Sony WH-1000XM5
				'quantity' => 2,
				'price' => 8990000,
				'created_at' => now(),
				'updated_at' => now(),
			],
			[
				'cart_id' => 2, // customer02's cart
				'product_id' => 3, // Dell XPS 15
				'quantity' => 1,
				'price' => 45990000,
				'created_at' => now(),
				'updated_at' => now(),
			],
			[
				'cart_id' => 3, // guest cart
				'product_id' => 2, // Samsung Galaxy S24 Ultra
				'quantity' => 1,
				'price' => 29990000,
				'created_at' => now(),
				'updated_at' => now(),
			],
		]);
	}
}
