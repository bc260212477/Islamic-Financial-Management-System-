<?php

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Builder;

trait BelongsToTenant
{
    protected static function bootBelongsToTenant(): void
    {
        static::addGlobalScope('tenant', function (Builder $query) {
            if (auth()->check()) {
                $query->where($query->getModel()->getTable().'.user_id', auth()->id());
            }
        });
        static::creating(function ($model) {
            if (auth()->check() && empty($model->user_id)) {
                $model->user_id = auth()->id();
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
