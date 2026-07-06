<?php

namespace Modules\Inventory\DTOs;

readonly class CategoryDTO
{
    public function __construct(
        public int $id,
        public string $name,
        public ?string $code
    ) {}
}
