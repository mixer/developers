<?php

function isRequestValid($secret) {
  $body = file_get_contents('php://input');
  $expected = "sha384=" . strtoupper(hash_hmac('sha384', $body, $secret));
  return hash_equals($expected, $_SERVER['HTTP_POKER_SIGNATURE']);
}
