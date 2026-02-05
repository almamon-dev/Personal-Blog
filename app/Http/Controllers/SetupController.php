<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\Process\Process;

class SetupController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Setup', [
            'tasks' => [
                ['id' => 'composer-update', 'label' => 'Composer Update', 'icon' => 'Package', 'description' => 'Updates all composer dependencies'],
                ['id' => 'migrate', 'label' => 'Migrate', 'icon' => 'Database', 'description' => 'Runs pending database migrations'],
                ['id' => 'migrate-fresh', 'label' => 'Migrate Fresh', 'icon' => 'RefreshCw', 'description' => 'Wipes database and runs all migrations with seeds'],
                ['id' => 'npm-install', 'label' => 'NPM Install', 'icon' => 'Download', 'description' => 'Installs frontend dependencies'],
                ['id' => 'npm-build', 'label' => 'NPM Build', 'icon' => 'Zap', 'description' => 'Builds frontend assets for production'],
                ['id' => 'optimize', 'label' => 'Optimize Clear', 'icon' => 'Trash2', 'description' => 'Clears all cached optimization files'],
            ],
        ]);
    }

    public function run(Request $request)
    {
        $task = $request->input('task');
        $commands = [
            'composer-update' => 'composer update 2>&1',
            'migrate' => 'php artisan migrate --force 2>&1',
            'migrate-fresh' => 'php artisan migrate:fresh --seed --force 2>&1',
            'npm-install' => 'npm install 2>&1',
            'npm-build' => 'npm run build 2>&1',
            'optimize' => 'php artisan optimize:clear 2>&1',
        ];

        if (! isset($commands[$task])) {
            return response()->json(['error' => 'Invalid task'], 400);
        }

        // Increase time limit for long running processes
        set_time_limit(600);

        return response()->stream(function () use ($commands, $task) {
            $process = Process::fromShellCommandline($commands[$task]);
            $process->setTimeout(600);

            $process->run(function ($type, $buffer) {
                echo $buffer;
                if (ob_get_level() > 0) {
                    ob_flush();
                }
                flush();
            });
        }, 200, [
            'Content-Type' => 'text/plain; charset=UTF-8',
            'Cache-Control' => 'no-cache',
            'X-Accel-Buffering' => 'no',
            'Content-Encoding' => 'none',
        ]);
    }
}
