<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('complaints', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('ticket_code', 32)->unique();
            $table->string('title');
            $table->text('description');
            $table->enum('category', [
                'fasilitas',
                'akademik',
                'kekerasan_perundungan',
            ])->index();
            $table->boolean('is_anonymous')->default(false);
            $table->enum('status', [
                'terkirim',
                'diproses',
                'disposisi',
                'selesai',
            ])
                ->default('terkirim')
                ->index();
            $table->boolean('escalated_to_center')->default(false);
            $table->timestamp('escalated_at')->nullable();
            $table->timestamp('first_response_at')->nullable();
            $table->timestamps();

            $table->index(['status', 'created_at']);
        });

        Schema::create('complaint_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('complaint_id')->constrained()->cascadeOnDelete();
            $table->string('file_path');
            $table->string('file_type', 32);
            $table->unsignedBigInteger('file_size')->default(0);
            $table->timestamps();
        });

        Schema::create('complaint_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('complaint_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->enum('author_role', [
                'mahasiswa',
                'satgas',
                'pembina',
                'unit',
            ])->default('satgas');
            $table->text('response_text');
            $table->timestamps();
        });

        Schema::create('dispatches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('complaint_id')->constrained()->cascadeOnDelete();
            $table->foreignId('dispatched_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('unit_name');
            $table->text('notes')->nullable();
            $table->timestamp('dispatched_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dispatches');
        Schema::dropIfExists('complaint_responses');
        Schema::dropIfExists('complaint_attachments');
        Schema::dropIfExists('complaints');
    }
};
