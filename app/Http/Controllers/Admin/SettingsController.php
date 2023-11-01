<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index()
    {
        $comment_settings = env('COMMENT_SETTINGS', '');
        return view('admin.settings', compact('comment_settings'));
    }

    public function update(Request $request)
    {
        $this->storeConfiguration('COMMENT_SETTINGS', $request->comments);
        return redirect()->back();
    }

    private function storeConfiguration($key, $value)
    {
        $path = base_path('.env');

        if (file_exists($path)) {
            $env = file_get_contents($path);

            if (strpos($env, $key) !== false) {
                // Key already exists, replace its value
                $env = str_replace(
                    $key . '=' . env($key),
                    $key . '=' . $value,
                    $env
                );
            } else {
                // Key doesn't exist, add it to the end of the file
                $env .= "\n" . $key . '=' . $value;
            }

            file_put_contents($path, $env);
        }
    }
}
