# Client
openssl ecparam -genkey -name prime256v1 -noout -out src/keys/client-private.pem
openssl ec -in src/keys/client-private.pem -pubout -out src/keys/client-public.pem

# Server
openssl ecparam -genkey -name prime256v1 -noout -out src/keys/server-private.pem
openssl ec -in src/keys/server-private.pem -pubout -out src/keys/server-public.pem