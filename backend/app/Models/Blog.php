<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
	use HasFactory;

	protected $table = 'blogs';

	protected $fillable = [
		'author_name',
		'title',
		'image_url',
		'content',
		'published_at',
		'is_active',
	];
}