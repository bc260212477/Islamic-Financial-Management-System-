<?php

namespace Database\Seeders;

use App\Models\MarketInstrument;
use App\Models\MarketPrice;
use App\Models\MarketSector;
use Illuminate\Database\Seeder;

class MarketDemoSeeder extends Seeder
{
    public function run(): void
    {
        // FICTIONAL demo instruments — not real PSX prices. Replaced by CSV/EOD import.
        $data = [
            'Energy' => [['DEMO-E1', 'Demo Energy One', 5000, 3.2], ['DEMO-E2', 'Demo Energy Two', 3000, -1.4]],
            'Banks' => [['DEMO-B1', 'Demo Bank One', 8000, 1.1], ['DEMO-B2', 'Demo Bank Two', 2000, -2.0]],
        ];
        foreach ($data as $sectorName => $rows) {
            $sector = MarketSector::firstOrCreate(['index_code' => 'KMI-30', 'name' => $sectorName]);
            foreach ($rows as [$symbol, $name, $cap, $chg]) {
                $ins = MarketInstrument::firstOrCreate(['sector_id' => $sector->id, 'symbol' => $symbol], ['name' => $name, 'market_cap' => $cap]);
                MarketPrice::updateOrCreate(['instrument_id' => $ins->id, 'date' => now()->toDateString()],
                    ['close' => 100 + $chg, 'change_pct' => $chg, 'volume' => 10000, 'data_mode' => 'Demo']);
            }
        }
    }
}
