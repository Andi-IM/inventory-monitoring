<?php

namespace Modules\Inventory\Contracts;

use Illuminate\Support\Collection;
use Modules\Inventory\DTOs\ItemUnitDTO;

interface InventoryClientInterface
{
    /**
     * Get an item unit by its ID.
     */
    public function getItemUnitById(int $id): ?ItemUnitDTO;

    /**
     * Get multiple item units by their IDs.
     *
     * @param  array<int>  $ids
     * @return Collection<int, ItemUnitDTO>
     */
    public function getItemUnitsByIds(array $ids): Collection;

    /**
     * Get available item units.
     *
     * @return Collection<int, ItemUnitDTO>
     */
    public function getAvailableItemUnits(): Collection;

    /**
     * Get available item units by their IDs.
     *
     * @param  array<int>  $ids
     * @return Collection<int, ItemUnitDTO>
     */
    public function getAvailableItemUnitsByIds(array $ids): Collection;

    /**
     * Update the status of an item unit.
     */
    public function updateItemUnitStatus(int $id, string $status): bool;

    /**
     * Get the total count of all item units.
     */
    public function getTotalItemUnitsCount(): int;

    /**
     * Get the total count of item units by status.
     */
    public function getItemUnitsCountByStatus(string $status): int;
}
