<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Wishlist
 *
 * @property int $id
 * @property int $user_id
 * @property int $product_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 *
 * @property User $user
 * @property Product $product
 *
 * @package App\Models
 */
class Wishlist extends Model
{
	use HasFactory, SoftDeletes;

	protected $table = 'wishlists';

	protected $casts = [
		'user_id' => 'int',
		'product_id' => 'int',
	];

	protected $fillable = [
		'user_id',
		'product_id'
	];

	/**
	 * Get the user that owns the wishlist item
	 */
	public function user()
	{
		return $this->belongsTo(User::class);
	}

	/**
	 * Get the product in the wishlist
	 */
	public function product()
	{
		return $this->belongsTo(Product::class);
	}
}
