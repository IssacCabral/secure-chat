<!-- https://www.fumdum.com/convert/base64 -->
# Sistema de Mensagens Seguras em Node

## Objetivo

Esse repositório teve o objetivo de Desenvolver um sistema de comunicação segura cliente-servidor em **Node**, utilizando **sockets** e técnicas de **criptografia** para garantir:

- **Confidencialidade**
- **Integridade**
- **Autenticidade**

---

## Funcionalidades de Segurança

| Segurança       | Mecanismo Utilizado                                        |
|----------------|-------------------------------------------------------------|
| Confidencialidade | AES (Advanced Encryption Standard) no modo CBC              |
| Integridade     | HMAC (Hash-based Message Authentication Code) com SHA-256  |
| Autenticidade   | Verificação de origem via HMAC e ECDSA                     |
| Troca de Chaves | Diffie-Hellman (DH)                                        |
| Assinatura Digital | ECDSA (Elliptic Curve Digital Signature Algorithm)       |
| Derivação de Chaves | PBKDF2 com salt e múltiplas iterações                     |

---

## Fluxo do Sistema

### 1. Handshake Seguro

- Troca de chaves **Diffie-Hellman (DH)**.
- Assinatura das chaves DH com **ECDSA**.
- Verificação de identidade via chaves públicas hospedadas no GitHub (`https://github.com/USERNAME.keys`).

### 2. Derivação de Chaves

Utilização do **PBKDF2** para derivar duas chaves seguras:

- `Key_AES`: Para criptografar mensagens.
- `Key_HMAC`: Para gerar e verificar o HMAC.

### 3. Envio da Mensagem Segura

Cliente envia uma mensagem no seguinte formato:

`[HMAC_TAG] + [IV_AES] + [MENSAGEM_CRIPTOGRAFADA]`


- `HMAC_TAG`: Calculado com `Key_HMAC` sobre `IV_AES + MENSAGEM_CRIPTOGRAFADA`.
- `IV_AES`: Vetor de Inicialização aleatório usado na criptografia AES.
- `MENSAGEM_CRIPTOGRAFADA`: Conteúdo cifrado com `Key_AES`.

### 4. Validação no Servidor

- Valida o HMAC (integridade e autenticidade).
- Se válido, descriptografa a mensagem com AES.
- Exibe o conteúdo em texto claro.

---

## Tecnologias Utilizadas

- Node
- `socket`
- `node:crypto`

---

## Observações

- Parâmetros DH (primo `p` e gerador `g`) são fixos para simplificação.
- Chaves públicas devem estar hospedadas no GitHub.
- O uso de tempo constante na verificação do HMAC é essencial para evitar ataques de temporização.

---

