<?php

namespace Modules\Access\Contracts;

use Illuminate\Support\Collection;
use Modules\Access\DTOs\ExternalBorrowerDTO;
use Modules\Access\DTOs\GroupDTO;

interface AccessClientInterface
{
    /**
     * Get a group by its ID.
     */
    public function getGroupById(int $id): ?GroupDTO;

    /**
     * Get multiple groups by their IDs.
     *
     * @param  array<int>  $ids
     * @return Collection<int, GroupDTO>
     */
    public function getGroupsByIds(array $ids): Collection;

    /**
     * Get an external borrower by its ID.
     */
    public function getExternalBorrowerById(int $id): ?ExternalBorrowerDTO;

    /**
     * Get multiple external borrowers by their IDs.
     *
     * @param  array<int>  $ids
     * @return Collection<int, ExternalBorrowerDTO>
     */
    public function getExternalBorrowersByIds(array $ids): Collection;

    /**
     * Get all external borrowers.
     *
     * @return Collection<int, ExternalBorrowerDTO>
     */
    public function getAllExternalBorrowers(): Collection;
}
