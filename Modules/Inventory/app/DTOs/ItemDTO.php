<?php

namespace Modules\Inventory\DTOs;

readonly class ItemDTO
{
    public function __construct(
        public int $id,
        public int $category_id,
        public string $name,
        public ?string $description,
        public ?CategoryDTO $category = null
    ) {}
}
