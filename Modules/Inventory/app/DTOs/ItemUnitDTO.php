<?php

namespace Modules\Inventory\DTOs;

readonly class ItemUnitDTO
{
    public function __construct(
        public int $id,
        public int $item_id,
        public string $asset_code,
        public string $location,
        public string $status,
        public ?ItemDTO $item = null
    ) {}
}
