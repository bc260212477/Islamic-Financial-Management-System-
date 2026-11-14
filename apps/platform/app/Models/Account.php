<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Account extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = ['user_id', 'name', 'kind', 'currency', 'opening_balance', 'opened_on'];

    protected $casts = ['opening_balance' => 'decimal:4', 'opened_on' => 'date'];

    /** Tenant isolation: every query is scoped to the authenticated user. */
    protected static function booted(): void
    {
        static::addGlobalScope('tenant', function (Builder $query) {
            if (auth()->check()) {
                $query->where($query->getModel()->getTable().'.user_id', auth()->id());
            }
        });
        static::creating(function (Account $account) {
            if (auth()->check() && empty($account->user_id)) {
                $account->user_id = auth()->id();
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
