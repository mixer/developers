// Using asp.net style requests, you may need to adjust it :)
public bool IsRequestValid(IHttpContext context, string secret, string body) {
    var hmac = new HMACSHA384(Encoding.UTF8.GetBytes(secret));
    var hash = BitConverter.ToString(hmac.ComputeHash(Encoding.UTF8.GetBytes(body))).Replace("-", string.Empty);
    return context.HttpContext.Request.Headers["X-Poker-Signature"].Equals($"sha384={hash}");
}
