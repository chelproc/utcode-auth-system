<?php
/*
Plugin Name: ut.code(); Customize Plugin
*/

add_action('login_init', function() {
    if (isset($_SERVER['HTTP_X_USER'])) {
        $user_login = $_SERVER['HTTP_X_USER'];
        $user = get_user_by('login', $user_login);
        if (!$user) {
            $user_profile = json_decode(file_get_contents('http://members-api:8081/profile/' . $user_login));
            if ($user_profile === NULL) exit;
            $user_id = wp_insert_user([
                'user_login' => $user_login,
                'user_pass' => wp_generate_password(30),
                'user_email' => $user_login . '@utcode.net',
                'display_name' => $user_profile->nickname,
                'nickname' => $user_profile->nickname
            ]);
            $user = get_user_by('id', $user_id);
            if (!$user) exit;
        }
        wp_clear_auth_cookie();
        wp_set_auth_cookie($user->ID);
        do_action('wp_login', $user->login, $user);
        wp_safe_redirect(isset($_GET['redirect_to']) ? $_GET['redirect_to'] : admin_url());
        exit;
    }
}, 1);