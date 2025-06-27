# # Client
openssl ecparam -genkey -name prime256v1 -noout -out src/keys/client-private.pem
ssh-keygen -y -f src/keys/client-private.pem > src/keys/client.pub

# # Server
openssl ecparam -genkey -name prime256v1 -noout -out src/keys/server-private.pem
ssh-keygen -y -f src/keys/server-private.pem > src/keys/server.pub