<?php
include_once 'alipay.trade.page.pay/AopSdk.php';

$aop = new AopClient ();
$aop->gatewayUrl = 'https://openapi.alipay.com/gateway.do';
$aop->appId = '2016102700771476';
$aop->rsaPrivateKey = 'MIIEpAIBAAKCAQEAqNA+HYxtzxkCBJ8ntQ582Sg9kEcq5ox6BVj22xdcnHzISsAR4pZ4UC0MpjUrva+AK0ywhH0gxH797ehGrQo2Ah1opYVtl/NN7z4jlMjje0Bxd2ePXHR0KUUsUrECmmFW38C29s1yKParDmp74KV79G6ajwDRu6RL7jM9XzoqF0pijD9mu8Uo+VGMU1PLIhxDjJi2bZsWRV0pQ0iipCuO1AaZjPQ6cAVaq7OHZdW26Z4+Jh5ShDn27gfgXkU3jppZSB8vsYZwixnEWORAQXNP+Sd18rScvgANE7BBZG1bpSQdUP8nPsytxcCc/XqzPRZiIh0udqn1Ji6+aJjgXRTZUQIDAQABAoIBAHBZz81Ypch8S1SKHCIrFzprxrVcOBgijB88+2YLIU7g2WiudfjIziAGK3H+1zKyN+oZay1yHbnJDvUkbs1Bi3pS2k+3Ap5rhoXgZEvke0mPNTUTzlzpAFprODl8p0/Z0riuCNcvGnha2rOIeROk719ZsTHViMCKcyKAJatYCaVffKDiUPz/mbpfSp+lLcwg+kEXkRTiQZCLHrkpUTPtI/r+t2CdmCUailD/+1HpvdGxPyzEvo0xwRwgvw4bvrbzdF26WUBudFoGnHxLFTKrLxy8/GTUsdHEb2sQxpkUOgFC32Ablmbt1Rt1X0kCq3epxtDm3/T3gutCaiqUbfO2fgECgYEA6c5CKKcKlulTy7pNHQ29A9hYGELmbXVEJziMsqlX3EDSISDo791B9sW2kH84JBOGZ9VnIaTBP+JbSpKWqkzcBl52pJEWoyorksmMCHR8om0zpVavzopP4Y1YHAlApIYj7lTW2LvixS/0Lt3JwhXBFJfn4HvCJIDBrlZOq5QnqaECgYEAuNaZcrJ3xiQC3U+DvuYrpNrPB2BxWRX8Ja8yXY1B40cGCtK9KTVQhrAxzDnaaP9iD41mAVmM81LeiBR6xixETMQ7UQKuZjkvF85fEgWHhWU89Pt+YjRhFhxZmn1zxirDcdAIUPAvuSpk2cyYJDthlx/z53ZkahmBqtOYwGP48bECgYEAgx4hqgyreqBVVu4eqsl2k75zAQAbm4zk8J3dAaDIXgOYE+4R09qgUJTmYjiGMm0ktfxOfuaXXY1Cpxp4Ff9OcN/u5zFaoZxXnVUcC+3Pq4NUMEfiBhE45QPQQsDJmLqFUfYQGrGbZfwTk2jb6dUrV7Is3o5o/PGcLHnIWp6Wc6ECgYBgyJ2YnTJyIbEOSPBnKQZ5T8lPx4QSbZyV7uKkca6qXyoeyLIbvbroi6HHmhNvHyotkpBy7H0Ne7rh7jdLRSqON8IHbSv8grzR7lGBkjuf8Z61eGp46Yxck4OnjUDt5r5n/dIc72dNwZEFKkgP0LgM9cI01J1HoQtwc1Nsiex0QQKBgQCyjVYZiW9NJmVu4DHLyxg0UP0JefUNJDpht2QF6B1PkJbvV6ATTrMfUBw7I8vkc6/osW/kDAJHdBaJdxlD59XxK99iAsALmQ/biTshEi1G5dANFt2XuCh9o7IghCbFg3q7sPUJWRDer9RPXYlNYDMefQc3DN3rGFBtsZXTG2BxiA==';
$aop->alipayrsaPublicKey= 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnCg7o/GRmAVYLBdIurmsxmVPgBVfrLXJhwIg71ST0diIiUA6PpqwYEbhmtympchBJ8D2swYRdc/SupKSmX1kN0OU5CvWF2HOu85v77QWe2HAkuuAWAow1Nn1nA32zSx1cib1xjiz2+XzXtKAhSUy/bydniv525eyCKxOVfpwwqYB/jsW23Q2pxx2yAKA1OiNsDoGpMqi9IiRnXJprmvc6+x2p2y4XrBjix0l1TIBGaV0HUWAe2Ilxrtu7Elq/n2nzfEiPzbdmTeosuJLmkbYLJWumjAoXehw3IaqxJ+PARy6pgQrb4n6UpdP2UId001SKLvrN5ZDsZZkKchP8IwekwIDAQAB';
$aop->apiVersion = '1.0';
$aop->signType = 'RSA2';
$aop->postCharset='UTF-8';
$aop->format='json';
$request = new AlipayTradePrecreateRequest ();
$request->setBizContent("{" .
"\"out_trade_no\":\"1591608149540\",".
"\"total_amount\":88.88," .
"\"subject\":\"Iphone6 16G\"" .
"  }");
$result = $aop->execute ( $request);

$responseNode = str_replace(".", "_", $request->getApiMethodName()) . "_response";
$resultCode = $result->$responseNode->code;
if(!empty($resultCode)&&$resultCode == 10000){
echo "成功";
} else {
echo "失败";
}
echo $result;

?>