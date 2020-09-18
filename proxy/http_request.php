<?php

if (!function_exists('http_request')) {

    /**
     * http请求
     *
     * @param  string $method 请求方式
     * @param  string $url    接口地址
     * @param  array $args    接口参数
     * @return array
     */
    function http_request($method, $url, $args = [], $headers = [])
    {
        $res = [];
        switch ( strtoupper($method) ) {
            case 'GET':
                $ch = curl_init ();
                $actual_url = strpos($url, '?') === false ? 
                    $url . '?' . http_build_query($args)
                    :$url . '&' . http_build_query($args);
                curl_setopt ( $ch, CURLOPT_URL, $actual_url);
                curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
                curl_setopt ( $ch, CURLOPT_TIMEOUT, 60 );
                curl_setopt ( $ch, CURLOPT_FOLLOWLOCATION, 1);
                curl_setopt ( $ch, CURLOPT_HTTPHEADER, $headers);
                $result = curl_exec ( $ch );
                curl_close ( $ch );
                break;
            case 'POST':
                $ch = curl_init ();
                curl_setopt ( $ch, CURLOPT_URL, $url );
                curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
                curl_setopt($ch, CURLOPT_POST, 1);
                $args = json_encode($args);
                curl_setopt ( $ch, CURLOPT_POSTFIELDS, $args );
                curl_setopt ( $ch, CURLOPT_HTTPHEADER, array(
                    "Content-Type: application/json; charset='utf-8'",
                    "Content-Length: " . strlen($args))
                );
                curl_setopt ( $ch, CURLOPT_TIMEOUT, 60 );
                $result = curl_exec ( $ch );
                curl_close ( $ch );
                break;
            default:
                break;
        }
        $temp_result = json_decode($result, true);
        if ( $temp_result ) {
            $res = $temp_result;
        } else {
            $res = $result;
        }
        return $res;
    }

}

?>
