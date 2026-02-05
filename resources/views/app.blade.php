<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
        <style>
            .goog-te-banner-frame { display: none !important; }
            body { top: 0px !important; }
            .goog-te-gadget-icon { display: none !important; }
            .goog-te-gadget-simple {
                background-color: transparent !important;
                border: none !important;
                font-size: 10px !important;
                padding: 0 !important;
            }
            .goog-te-gadget-simple .goog-te-menu-value span {
                color: #555 !important;
                font-weight: bold !important;
            }
        </style>
    </head>
    <body class="font-sans antialiased">
        @inertia
        
        <script type="text/javascript">
            function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                    pageLanguage: 'en', 
                    includedLanguages: 'en,bn', 
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false
                }, 'google_translate_element');
            }
        </script>
        <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
</html>
