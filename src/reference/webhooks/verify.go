func IsRequestValid(r *http.Request, secret, body []byte) bool {
	mac := hmac.New(sha512.New384, secret)
	mac.Write(body)
	actual := []byte("sha384=" + strings.ToUpper(hex.EncodeToString(mac.Sum(nil))))
	return hmac.Equal([]byte(r.Header.Get("X-Poker-Signature")), actual)
}
