<?php
/**
 * Plugin Name: Sound Window - Page template
 * Description: Sound Window project plugin
 * Version: 1.0
 * Author: Maximiliano Cortés
 * Author URI: https://www.maxicortes.com.ar
 */


add_filter( 'page_template', 'wpa3396_page_template' );
function wpa3396_page_template( $page_template )
{
    if ( is_page( 'sound-window' ) ) {
        $page_template = dirname( __FILE__ ) . '/sw-page-template.php';
    }
    return $page_template;
}
