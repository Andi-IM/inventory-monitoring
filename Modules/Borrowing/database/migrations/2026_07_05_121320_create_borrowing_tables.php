<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('loans', function (Blueprint $table): void {
            $table->id();
            $table->string('code')->unique();
            $table->foreignId('borrower_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('external_borrower_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('recorded_by_user_id')->constrained('users')->restrictOnDelete();
            $table->dateTime('borrowed_at');
            $table->dateTime('due_at');
            $table->dateTime('returned_at')->nullable();
            $table->string('status')->default('active');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['status', 'due_at']);
        });

        Schema::create('loan_items', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('loan_id')->constrained()->cascadeOnDelete();
            $table->foreignId('item_unit_id')->constrained()->restrictOnDelete();
            $table->dateTime('returned_at')->nullable();
            $table->string('return_condition')->nullable();
            $table->text('return_notes')->nullable();
            $table->timestamps();

            $table->unique(['loan_id', 'item_unit_id']);
            $table->index(['item_unit_id', 'returned_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('loan_items');
        Schema::dropIfExists('loans');
    }
};
