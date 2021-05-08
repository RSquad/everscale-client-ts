import { KeyPair } from "@ton-client-ts/core/types/modules/crypto/types";
import { TonClient } from "../src";

test("test_sha256", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const base64 = btoa("Free TON to the moon, baby");
  const { hash } = await tonClient.crypto.sha256({ data: base64 });
  expect(hash).toBe(
    "beb0d9e314ef4af12e6b8c48d2b6b205eed1245a78f8d9c99164fd6fcce0ed9c"
  );
});

test("test_sha512", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const base64 = btoa("Free TON to the moon, baby");
  const { hash } = await tonClient.crypto.sha512({ data: base64 });
  expect(hash).toBe(
    "cf0da0fbba843bc85d38a0d2de092b4aaaa4a86f9f19d354a74ed64ce5a27d0c5e85bcb281033f46e39d2f2e31edd864e626163fd4a9de1c007a2061cee6614d"
  );
});

test("test_hdkey_xprv_from_mnemonic", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const { xprv } = await tonClient.crypto.hdkey_xprv_from_mnemonic({
    phrase:
      "huge vivid crowd exhaust seek decline income copper envelope black bench dial",
  });
  expect(xprv).toBe(
    "xprv9s21ZrQH143K2nMupN4yyNb9vvkQyHkzu8P7XyabS1VViULhTzYgorJjLYZhcGKugRgSq29LwsCSP6b6AGL7PN82caUuUxZA7FF4PVtqapY"
  );
  // add error
});

test("test_hdkey_secret_from_xprv", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const { secret } = await tonClient.crypto.hdkey_secret_from_xprv({
    xprv:
      "xprv9s21ZrQH143K2nMupN4yyNb9vvkQyHkzu8P7XyabS1VViULhTzYgorJjLYZhcGKugRgSq29LwsCSP6b6AGL7PN82caUuUxZA7FF4PVtqapY",
  });
  expect(secret).toBe(
    "01d62c5c294477431c86da4fb837af93a3ae1057e2e8add57b7ffca65f4d7825"
  );
  // add error
});

test("test_hdkey_public_from_xprv", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const { public: pubkey } = await tonClient.crypto.hdkey_public_from_xprv({
    xprv:
      "xprv9s21ZrQH143K2nMupN4yyNb9vvkQyHkzu8P7XyabS1VViULhTzYgorJjLYZhcGKugRgSq29LwsCSP6b6AGL7PN82caUuUxZA7FF4PVtqapY",
  });
  expect(pubkey).toBe(
    "23c68bdb153025131fc41aa2ee94094cedb5717755f7151f6172bc927785da79"
  );
  // add error
});

test("test_hdkey_derive_from_xprv", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const { xprv } = await tonClient.crypto.hdkey_derive_from_xprv({
    xprv:
      "xprv9s21ZrQH143K2nMupN4yyNb9vvkQyHkzu8P7XyabS1VViULhTzYgorJjLYZhcGKugRgSq29LwsCSP6b6AGL7PN82caUuUxZA7FF4PVtqapY",
    child_index: 0,
    hardened: false,
  });
  expect(xprv).toBe(
    "xprv9v1PfAouME8AKhx5sBR5s5kkAZDvfaBFBrMYBWhh8NW4ikucpJxFszdUHtWhwd7RuELqc2PGz8NMvZzqi8jfPfooayPnzgjDbUS1DSqStbr"
  );
  // add error
});

test("test_hdkey_derive_from_xprv_path", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const { xprv } = await tonClient.crypto.hdkey_derive_from_xprv_path({
    xprv:
      "xprv9s21ZrQH143K2nMupN4yyNb9vvkQyHkzu8P7XyabS1VViULhTzYgorJjLYZhcGKugRgSq29LwsCSP6b6AGL7PN82caUuUxZA7FF4PVtqapY",
    path: "m/44'/60'/0'/0'",
  });
  expect(xprv).toBe(
    "xprvA24A5y8PXd8rj3h8hkEktXshDWEEGKjQ9Sne6G87X6fjpkbTirGjmwueThkGmqtzCzyb1FF5xZHiwQUYNfVtC4U8Sz5pQc8Q4jDn4HGDPHg"
  );
  // add error
});

test("test factorize", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const { factors } = await tonClient.crypto.factorize({
    composite: "17ED48941A08F981",
  });

  expect(factors[0]).toBe("494C553B");
  expect(factors[1]).toBe("53911073");
});

test("test modular_power", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const { modular_power } = await tonClient.crypto.modular_power({
    base: "0123456789ABCDEF",
    exponent: "0123",
    modulus: "01234567",
  });

  expect(modular_power).toBe("63bfdf");
});

test("test ton_crc16", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const { crc } = await tonClient.crypto.ton_crc16({ data: btoa("123test") });

  expect(crc).toBe(15386);
});

test("test generate_random_bytes", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const { bytes } = await tonClient.crypto.generate_random_bytes({
    length: 10,
  });

  expect(atob(bytes).length).toBe(10);
});

test("test convert_public_key_to_ton_safe_format", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const {
    ton_public_key,
  } = await tonClient.crypto.convert_public_key_to_ton_safe_format({
    public_key:
      "BCA335626726CF2E522D287B27E4FAFFF82D1D98615957DB8E224CB397B2EB67",
  });

  expect(ton_public_key).toBe(
    "Pua8ozViZybPLlItKHsn5Pr_-C0dmGFZV9uOIkyzl7LrZ7gv"
  );
});

test("test generate_random_sign_keys", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const {
    public: publicKey,
    secret: secretKey,
  } = await tonClient.crypto.generate_random_sign_keys();
  expect(publicKey.length).toBe(64);
  expect(secretKey.length).toBe(64);
});

test("test sign", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });

  const key: KeyPair = {
    public: "0c7bb0034436c904f9cd8273a39f129c7c24f75c19488b6b82d06558a07dcbb1",
    secret: "61a7b6578976c8c3b3830e6e5fd2b5676bad3b5724653e025ff21ad94011e357",
  };

  const unsigned = btoa("Test Message");

  const { signed, signature } = await tonClient.crypto.sign({
    keys: key,
    unsigned,
  });

  expect(signed).toBe(
    "0WbqQZtnXq0EHtN+hsXn98R1jX8ecDdMwKxKCSfEeytBQfl2QhBqMK6CnuRpcsg563pPykIPZvDdad24RKHzClRlc3QgTWVzc2FnZQ=="
  );
  expect(signature).toBe(
    "d166ea419b675ead041ed37e86c5e7f7c4758d7f1e70374cc0ac4a0927c47b2b4141f97642106a30ae829ee46972c839eb7a4fca420f66f0dd69ddb844a1f30a"
  );

  const { unsigned: verified } = await tonClient.crypto.verify_signature({
    public: key.public,
    signed,
  });

  expect(unsigned).toBe(verified);
});

test("test scrypt", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const password = btoa("Test Password");
  const salt = btoa("Test salt");
  const { key } = await tonClient.crypto.scrypt({
    log_n: 10,
    r: 8,
    p: 16,
    dk_len: 64,
    password: password,
    salt: salt,
  });

  expect(key).toBe(
    "03bb240d2fbb1fd1caded3137d281325dd0cf68f37f2315ae7ef27553be64731061e2db7633c88176a44775e9f1d6efd71d9954a429ae03f150462c389799735"
  );
});

test("test nacl_sign_keypair_from_secret_key", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const key = await tonClient.crypto.nacl_sign_keypair_from_secret_key({
    secret: "61a7b6578976c8c3b3830e6e5fd2b5676bad3b5724653e025ff21ad94011e357",
  });

  expect(key.public).toBe(
    "0c7bb0034436c904f9cd8273a39f129c7c24f75c19488b6b82d06558a07dcbb1"
  );
});

test("test nacl_sign", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });

  const unsigned = btoa("Test Message");
  const secret =
    "56b6a77093d6fdf14e593f36275d872d75de5b341942376b2a08759f3cbae78f1869b7ef29d58026217e9cf163cbfbd0de889bdf1bf4daebf5433a312f5b8d6e";
  const { signed } = await tonClient.crypto.nacl_sign({
    secret,
    unsigned,
  });

  expect(signed).toBe(
    "+wz+QO6l1slgZS5s65BNqKcu4vz24FCJz4NSAxef9lu0jFfs8x3PzSZRC+pn5k8+aJi3xYMA3BQzglQmjK3hA1Rlc3QgTWVzc2FnZQ=="
  );

  const { unsigned: opened } = await tonClient.crypto.nacl_sign_open({
    public: "1869b7ef29d58026217e9cf163cbfbd0de889bdf1bf4daebf5433a312f5b8d6e",
    signed,
  });

  expect(opened).toBe("VGVzdCBNZXNzYWdl");

  const { signature } = await tonClient.crypto.nacl_sign_detached({
    secret,
    unsigned,
  });

  expect(signature).toBe(
    "fb0cfe40eea5d6c960652e6ceb904da8a72ee2fcf6e05089cf835203179ff65bb48c57ecf31dcfcd26510bea67e64f3e6898b7c58300dc14338254268cade103"
  );
});

test("test nacl_box_keypair", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const key = await tonClient.crypto.nacl_box_keypair();

  expect(key.public.length).toBe(64);
  expect(key.secret.length).toBe(64);
  expect(key.public).not.toBe(key.secret);
});

test("test nacl_box_keypair_from_secret_key", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });
  const key = await tonClient.crypto.nacl_box_keypair_from_secret_key({
    secret: "61a7b6578976c8c3b3830e6e5fd2b5676bad3b5724653e025ff21ad94011e357",
  });

  expect(key.public).toBe(
    "9c5816d3cf6bf55fa028dfaa7be09ad24e38a36fe9b8f43278ef0ada15c3ba0e"
  );
});

test("test naclBox", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });

  const { decrypted, nonce, secret, their_public } = {
    decrypted: btoa("Test Message"),
    nonce: "cd7f99924bf422544046e83595dd5803f17536f5c9a11746",
    their_public:
      "c4e2d9fe6a6baf8d1812b799856ef2a306291be7a7024837ad33a8530db79c6b",
    secret: "d9b9dc5033fb416134e5d2107fdbacab5aadb297cb82dbdcd137d663bac59f7f",
  };

  const { encrypted } = await tonClient.crypto.nacl_box({
    decrypted,
    nonce,
    secret,
    their_public,
  });

  expect(encrypted).toEqual("li4XED4kx/pjQ2qdP0eR2d/K30uN94voNADxwA==");

  const { decrypted: decryptedOpen } = await tonClient.crypto.nacl_box_open({
    encrypted,
    nonce,
    secret,
    their_public,
  });

  expect(decryptedOpen).toBe(decrypted);
});

test("test nacl_secret_box", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });

  const message = btoa("Test Message");
  const nonce = "2a33564717595ebe53d91a785b9e068aba625c8453a76e45";
  const key =
    "8f68445b4e78c000fe4d6b7fc826879c1e63e3118379219a754ae66327764bd8";

  const { encrypted } = await tonClient.crypto.nacl_secret_box({
    decrypted: message,
    key,
    nonce,
  });

  expect(encrypted).toBe("JL7ejKWe2KXmrsns41yfXoQF0t/C1Q8RGyzQ2A==");

  const { decrypted } = await tonClient.crypto.nacl_secret_box_open({
    encrypted,
    key,
    nonce,
  });

  expect(decrypted).toBe(message);
});

test("test mnemonic_words", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });

  const { words } = await tonClient.crypto.mnemonic_words({});

  expect(words.split(" ").length).toBe(2048);
});

test("test mnemonic_from_random", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });

  const { phrase } = await tonClient.crypto.mnemonic_from_random({
    word_count: 15,
    dictionary: 1,
  });

  expect(phrase.split(" ").length).toBe(15);
});

test("test mnemonic_from_entropy", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });

  const { phrase } = await tonClient.crypto.mnemonic_from_entropy({
    entropy: "00112233445566778899AABBCCDDEEFF",
  });

  expect(phrase.split(" ").length).toBe(12);
});

test("test mnemonic_verify", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });

  const { phrase } = await tonClient.crypto.mnemonic_from_random({});
  const { valid } = await tonClient.crypto.mnemonic_verify({ phrase });

  expect(valid).toBe(true);
});

test("test mnemonic_derive_sign_keys", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });

  const phrase =
    "abandon math mimic master filter design carbon crystal rookie group knife young";

  const key = await tonClient.crypto.mnemonic_derive_sign_keys({ phrase });
  const {
    ton_public_key,
  } = await tonClient.crypto.convert_public_key_to_ton_safe_format({
    public_key: key.public,
  });

  expect(ton_public_key).toBe(
    "PuZhw8W5ejPJwKA68RL7sn4_RNmeH4BIU_mEK7em5d4_-cIx"
  );
});

test("test chacha20", async () => {
  const tonClient = new TonClient({
    network: { server_address: "net.ton.dev" },
  });

  const key =
    "0101010101010101010101010101010101010101010101010101010101010101";
  const nonce = "ffffffffffffffffffffffff";

  const encrypted = await tonClient.crypto.chacha20({
    data: Buffer.from("Message").toString("base64"),
    key,
    nonce,
  });

  expect(encrypted.data).toEqual("w5QOGsJodQ==");
  const decrypted = await tonClient.crypto.chacha20({
    data: encrypted.data,
    key,
    nonce,
  });
  expect(decrypted.data).toEqual("TWVzc2FnZQ==");
});
