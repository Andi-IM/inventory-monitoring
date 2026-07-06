<?php

namespace Modules\Access\DTOs;

readonly class ExternalBorrowerDTO
{
    public function __construct(
        public int $id,
        public ?int $group_id,
        public string $name,
        public ?string $identity_number,
        public ?string $contact,
        public ?GroupDTO $group = null
    ) {}
}
