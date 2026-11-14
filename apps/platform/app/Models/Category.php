<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = ['user_id', 'kind', 'name', 'color'];

    /** Users see system categories (user_id null) plus their own. */
    protected static function booted(): void
    {
        static::addGlobalScope('tenant', function (Builder $query) {
            if (auth()->check()) {
                $query->where(function (Builder $q) {
                    $q->whereNull($q->getModel()->getTable().'.user_id')
                        ->orWhere($q->getModel()->getTable().'.user_id', auth()->id());
                });
            }
        });
    }
}
