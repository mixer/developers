curl -XPOST https://mixer.com/api/v1/hooks \
    -H Client-ID:da400f1a81d7efc477920b5d686e95be6f92c88af09c2342 \
    -H Authorization:'Secret c51ff3c4e44e7be32be2f639b28e3569f1775f8530b95a5d972ace2cb9310ab8' \
    -d '{ "kind": "web", "events":["channel:314:broadcast"], "url":"https://dev.mixer.com/onHook" }'
