import { TonClient } from "../..";
import {
  ParamsOfFactorize,
  ResultOfFactorize,
  ParamsOfModularPower,
  ResultOfModularPower,
  ParamsOfTonCrc16,
  ResultOfTonCrc16,
  ParamsOfGenerateRandomBytes,
  ResultOfGenerateRandomBytes,
  ParamsOfConvertPublicKeyToTonSafeFormat,
  ResultOfConvertPublicKeyToTonSafeFormat,
  KeyPair,
  ParamsOfSign,
  ResultOfSign,
  ParamsOfVerifySignature,
  ResultOfVerifySignature,
  ParamsOfHash,
  ResultOfHash,
  ParamsOfScrypt,
  ResultOfScrypt,
  ParamsOfNaclSignKeyPairFromSecret,
  ParamsOfNaclSign,
  ResultOfNaclSign,
  ParamsOfNaclSignOpen,
  ResultOfNaclSignOpen,
  ResultOfNaclSignDetached,
  ParamsOfNaclBoxKeyPairFromSecret,
  ParamsOfNaclBox,
  ResultOfNaclBox,
  ParamsOfNaclBoxOpen,
  ResultOfNaclBoxOpen,
  ParamsOfNaclSecretBox,
  ParamsOfNaclSecretBoxOpen,
  ParamsOfMnemonicWords,
  ResultOfMnemonicWords,
  ParamsOfMnemonicFromRandom,
  ResultOfMnemonicFromRandom,
  ParamsOfMnemonicFromEntropy,
  ResultOfMnemonicFromEntropy,
  ParamsOfMnemonicVerify,
  ResultOfMnemonicVerify,
  ParamsOfMnemonicDeriveSignKeys,
  ParamsOfHDKeyXPrvFromMnemonic,
  ResultOfHDKeyXPrvFromMnemonic,
  ParamsOfHDKeyDeriveFromXPrv,
  ResultOfHDKeyDeriveFromXPrv,
  ParamsOfHDKeyDeriveFromXPrvPath,
  ResultOfHDKeyDeriveFromXPrvPath,
  ParamsOfHDKeySecretFromXPrv,
  ResultOfHDKeySecretFromXPrv,
  ParamsOfHDKeyPublicFromXPrv,
  ResultOfHDKeyPublicFromXPrv,
  ParamsOfChaCha20,
  ResultOfChaCha20,
  ParamsOfAppSigningBox,
  ResultOfAppSigningBox,
  RegisteredSigningBox,
  ResultOfSigningBoxGetPublicKey,
  ParamsOfSigningBoxSign,
  ResultOfSigningBoxSign,
} from "./types";

/**
 * Crypto functions.
 */
export class CryptoModule {
  tonClient: TonClient;
  constructor(tonClient: TonClient) {
    this.tonClient = tonClient;
  }

  /**
   * Performs prime factorization – decomposition of a composite number into a product of smaller prime integers (factors). See [https://en.wikipedia.org/wiki/Integer_factorization]
   *
   * @param {ParamsOfFactorize} param - parameters
   * @returns ResultOfFactorize
   */
  factorize(params: ParamsOfFactorize): Promise<ResultOfFactorize> {
    return this.tonClient.request("crypto.factorize", params);
  }

  /**
   * Performs modular exponentiation for big integers (`base`^`exponent` mod `modulus`). See [https://en.wikipedia.org/wiki/Modular_exponentiation]
   *
   * @param {ParamsOfModularPower} param - parameters
   * @returns ResultOfModularPower
   */
  modular_power(params: ParamsOfModularPower): Promise<ResultOfModularPower> {
    return this.tonClient.request("crypto.modular_power", params);
  }

  /**
   * Calculates CRC16 using TON algorithm.
   *
   * @param {ParamsOfTonCrc16} param - parameters
   * @returns ResultOfTonCrc16
   */
  ton_crc16(params: ParamsOfTonCrc16): Promise<ResultOfTonCrc16> {
    return this.tonClient.request("crypto.ton_crc16", params);
  }

  /**
   * Generates random byte array of the specified length and returns it in `base64` format
   *
   * @param {ParamsOfGenerateRandomBytes} param - parameters
   * @returns ResultOfGenerateRandomBytes
   */
  generate_random_bytes(
    params: ParamsOfGenerateRandomBytes
  ): Promise<ResultOfGenerateRandomBytes> {
    return this.tonClient.request("crypto.generate_random_bytes", params);
  }

  /**
   * Converts public key to ton safe_format
   *
   * @param {ParamsOfConvertPublicKeyToTonSafeFormat} param - parameters
   * @returns ResultOfConvertPublicKeyToTonSafeFormat
   */
  convert_public_key_to_ton_safe_format(
    params: ParamsOfConvertPublicKeyToTonSafeFormat
  ): Promise<ResultOfConvertPublicKeyToTonSafeFormat> {
    return this.tonClient.request(
      "crypto.convert_public_key_to_ton_safe_format",
      params
    );
  }

  /**
   * Generates random ed25519 key pair.
   */
  generate_random_sign_keys(): Promise<KeyPair> {
    return this.tonClient.request("crypto.generate_random_sign_keys");
  }

  /**
   * Signs a data using the provided keys.
   *
   * @param {ParamsOfSign} param - parameters
   * @returns ResultOfSign
   */
  sign(params: ParamsOfSign): Promise<ResultOfSign> {
    return this.tonClient.request("crypto.sign", params);
  }

  /**
   * Verifies signed data using the provided public key. Raises error if verification is failed.
   *
   * @param {ParamsOfVerifySignature} param - parameters
   * @returns ResultOfVerifySignature
   */
  verify_signature(
    params: ParamsOfVerifySignature
  ): Promise<ResultOfVerifySignature> {
    return this.tonClient.request("crypto.verify_signature", params);
  }

  /**
   * Calculates SHA256 hash of the specified data.
   *
   * @param {ParamsOfHash} param - parameters
   * @returns ResultOfHash
   */
  sha256(params: ParamsOfHash): Promise<ResultOfHash> {
    return this.tonClient.request("crypto.sha256", params);
  }

  /**
   * Calculates SHA512 hash of the specified data.
   *
   * @param {ParamsOfHash} param - parameters
   * @returns ResultOfHash
   */
  sha512(params: ParamsOfHash): Promise<ResultOfHash> {
    return this.tonClient.request("crypto.sha512", params);
  }

  /**
   * Derives key from `password` and `key` using `scrypt` algorithm. See [https://en.wikipedia.org/wiki/Scrypt].
   *
   * @remarks
   * # Arguments
   * - `log_n` - The log2 of the Scrypt parameter `N`
   * - `r` - The Scrypt parameter `r`
   * - `p` - The Scrypt parameter `p`
   * # Conditions
   * - `log_n` must be less than `64`
   * - `r` must be greater than `0` and less than or equal to `4294967295`
   * - `p` must be greater than `0` and less than `4294967295`
   * # Recommended values sufficient for most use-cases
   * - `log_n = 15` (`n = 32768`)
   * - `r = 8`
   * - `p = 1`
   *
   * @param {ParamsOfScrypt} param - parameters
   * @returns ResultOfScrypt
   */
  scrypt(params: ParamsOfScrypt): Promise<ResultOfScrypt> {
    return this.tonClient.request("crypto.scrypt", params);
  }

  /**
   * Generates a key pair for signing from the secret key
   *
   * @param {ParamsOfNaclSignKeyPairFromSecret} param - parameters
   * @returns KeyPair
   */
  nacl_sign_keypair_from_secret_key(
    params: ParamsOfNaclSignKeyPairFromSecret
  ): Promise<KeyPair> {
    return this.tonClient.request(
      "crypto.nacl_sign_keypair_from_secret_key",
      params
    );
  }

  /**
   * Signs data using the signer's secret key.
   *
   * @param {ParamsOfNaclSign} param - parameters
   * @returns ResultOfNaclSign
   */
  nacl_sign(params: ParamsOfNaclSign): Promise<ResultOfNaclSign> {
    return this.tonClient.request("crypto.nacl_sign", params);
  }

  /**
   * Verifies the signature and returns the unsigned message
   *
   * @remarks
   * Verifies the signature in `signed` using the signer's public key `public`
   * and returns the message `unsigned`.
   *
   * If the signature fails verification, crypto_sign_open raises an exception.
   *
   * @param {ParamsOfNaclSignOpen} param - parameters
   * @returns ResultOfNaclSignOpen
   */
  nacl_sign_open(params: ParamsOfNaclSignOpen): Promise<ResultOfNaclSignOpen> {
    return this.tonClient.request("crypto.nacl_sign_open", params);
  }

  /**
   * Signs the message using the secret key and returns a signature.
   *
   * @remarks
   * Signs the message `unsigned` using the secret key `secret`
   * and returns a signature `signature`.
   *
   * @param {ParamsOfNaclSign} param - parameters
   * @returns ResultOfNaclSignDetached
   */
  nacl_sign_detached(
    params: ParamsOfNaclSign
  ): Promise<ResultOfNaclSignDetached> {
    return this.tonClient.request("crypto.nacl_sign_detached", params);
  }

  /**
   * Generates a random NaCl key pair
   */
  nacl_box_keypair(): Promise<KeyPair> {
    return this.tonClient.request("crypto.nacl_box_keypair");
  }

  /**
   * Generates key pair from a secret key
   *
   * @param {ParamsOfNaclBoxKeyPairFromSecret} param - parameters
   * @returns KeyPair
   */
  nacl_box_keypair_from_secret_key(
    params: ParamsOfNaclBoxKeyPairFromSecret
  ): Promise<KeyPair> {
    return this.tonClient.request(
      "crypto.nacl_box_keypair_from_secret_key",
      params
    );
  }

  /**
   * Public key authenticated encryption
   *
   * @remarks
   * Encrypt and authenticate a message using the senders secret key, the recievers public
   * key, and a nonce.
   *
   * @param {ParamsOfNaclBox} param - parameters
   * @returns ResultOfNaclBox
   */
  nacl_box(params: ParamsOfNaclBox): Promise<ResultOfNaclBox> {
    return this.tonClient.request("crypto.nacl_box", params);
  }

  /**
   * Decrypt and verify the cipher text using the recievers secret key, the senders public key, and the nonce.
   *
   * @param {ParamsOfNaclBoxOpen} param - parameters
   * @returns ResultOfNaclBoxOpen
   */
  nacl_box_open(params: ParamsOfNaclBoxOpen): Promise<ResultOfNaclBoxOpen> {
    return this.tonClient.request("crypto.nacl_box_open", params);
  }

  /**
   * Encrypt and authenticate message using nonce and secret key.
   *
   * @param {ParamsOfNaclSecretBox} param - parameters
   * @returns ResultOfNaclBox
   */
  nacl_secret_box(params: ParamsOfNaclSecretBox): Promise<ResultOfNaclBox> {
    return this.tonClient.request("crypto.nacl_secret_box", params);
  }

  /**
   * Decrypts and verifies cipher text using `nonce` and secret `key`.
   *
   * @param {ParamsOfNaclSecretBoxOpen} param - parameters
   * @returns ResultOfNaclBoxOpen
   */
  nacl_secret_box_open(
    params: ParamsOfNaclSecretBoxOpen
  ): Promise<ResultOfNaclBoxOpen> {
    return this.tonClient.request("crypto.nacl_secret_box_open", params);
  }

  /**
   * Prints the list of words from the specified dictionary
   *
   * @param {ParamsOfMnemonicWords} param - parameters
   * @returns ResultOfMnemonicWords
   */
  mnemonic_words(
    params: ParamsOfMnemonicWords
  ): Promise<ResultOfMnemonicWords> {
    return this.tonClient.request("crypto.mnemonic_words", params);
  }

  /**
   * Generates a random mnemonic from the specified dictionary and word count
   *
   * @param {ParamsOfMnemonicFromRandom} param - parameters
   * @returns ResultOfMnemonicFromRandom
   */
  mnemonic_from_random(
    params: ParamsOfMnemonicFromRandom
  ): Promise<ResultOfMnemonicFromRandom> {
    return this.tonClient.request("crypto.mnemonic_from_random", params);
  }

  /**
   * Generates mnemonic from pre-generated entropy
   *
   * @param {ParamsOfMnemonicFromEntropy} param - parameters
   * @returns ResultOfMnemonicFromEntropy
   */
  mnemonic_from_entropy(
    params: ParamsOfMnemonicFromEntropy
  ): Promise<ResultOfMnemonicFromEntropy> {
    return this.tonClient.request("crypto.mnemonic_from_entropy", params);
  }

  /**
   * The phrase supplied will be checked for word length and validated according to the checksum specified in BIP0039.
   *
   * @param {ParamsOfMnemonicVerify} param - parameters
   * @returns ResultOfMnemonicVerify
   */
  mnemonic_verify(
    params: ParamsOfMnemonicVerify
  ): Promise<ResultOfMnemonicVerify> {
    return this.tonClient.request("crypto.mnemonic_verify", params);
  }

  /**
   * Validates the seed phrase, generates master key and then derives the key pair from the master key and the specified path
   *
   * @param {ParamsOfMnemonicDeriveSignKeys} param - parameters
   * @returns KeyPair
   */
  mnemonic_derive_sign_keys(
    params: ParamsOfMnemonicDeriveSignKeys
  ): Promise<KeyPair> {
    return this.tonClient.request("crypto.mnemonic_derive_sign_keys", params);
  }

  /**
   * Generates an extended master private key that will be the root for all the derived keys
   *
   * @param {ParamsOfHDKeyXPrvFromMnemonic} param - parameters
   * @returns ResultOfHDKeyXPrvFromMnemonic
   */
  hdkey_xprv_from_mnemonic(
    params: ParamsOfHDKeyXPrvFromMnemonic
  ): Promise<ResultOfHDKeyXPrvFromMnemonic> {
    return this.tonClient.request("crypto.hdkey_xprv_from_mnemonic", params);
  }

  /**
   * Returns extended private key derived from the specified extended private key and child index
   *
   * @param {ParamsOfHDKeyDeriveFromXPrv} param - parameters
   * @returns ResultOfHDKeyDeriveFromXPrv
   */
  hdkey_derive_from_xprv(
    params: ParamsOfHDKeyDeriveFromXPrv
  ): Promise<ResultOfHDKeyDeriveFromXPrv> {
    return this.tonClient.request("crypto.hdkey_derive_from_xprv", params);
  }

  /**
   * Derives the extended private key from the specified key and path
   *
   * @param {ParamsOfHDKeyDeriveFromXPrvPath} param - parameters
   * @returns ResultOfHDKeyDeriveFromXPrvPath
   */
  hdkey_derive_from_xprv_path(
    params: ParamsOfHDKeyDeriveFromXPrvPath
  ): Promise<ResultOfHDKeyDeriveFromXPrvPath> {
    return this.tonClient.request("crypto.hdkey_derive_from_xprv_path", params);
  }

  /**
   * Extracts the private key from the serialized extended private key
   *
   * @param {ParamsOfHDKeySecretFromXPrv} param - parameters
   * @returns ResultOfHDKeySecretFromXPrv
   */
  hdkey_secret_from_xprv(
    params: ParamsOfHDKeySecretFromXPrv
  ): Promise<ResultOfHDKeySecretFromXPrv> {
    return this.tonClient.request("crypto.hdkey_secret_from_xprv", params);
  }

  /**
   * Extracts the public key from the serialized extended private key
   *
   * @param {ParamsOfHDKeyPublicFromXPrv} param - parameters
   * @returns ResultOfHDKeyPublicFromXPrv
   */
  hdkey_public_from_xprv(
    params: ParamsOfHDKeyPublicFromXPrv
  ): Promise<ResultOfHDKeyPublicFromXPrv> {
    return this.tonClient.request("crypto.hdkey_public_from_xprv", params);
  }

  /**
   * Performs symmetric `chacha20` encryption.
   *
   * @param {ParamsOfChaCha20} param - parameters
   * @returns ResultOfChaCha20
   */
  chacha20(params: ParamsOfChaCha20): Promise<ResultOfChaCha20> {
    return this.tonClient.request("crypto.chacha20", params);
  }

  /**
   * Register an application implemented signing box.
   *
   *
   * @returns RegisteredSigningBox
   */
  register_signing_box(): Promise<RegisteredSigningBox> {
    return this.tonClient.request("crypto.register_signing_box");
  }

  /**
   * Creates a default signing box implementation.
   *
   * @param {KeyPair} param - parameters
   * @returns RegisteredSigningBox
   */
  get_signing_box(params: KeyPair): Promise<RegisteredSigningBox> {
    return this.tonClient.request("crypto.get_signing_box", params);
  }

  /**
   * Returns public key of signing key pair.
   *
   * @param {RegisteredSigningBox} param - parameters
   * @returns ResultOfSigningBoxGetPublicKey
   */
  signing_box_get_public_key(
    params: RegisteredSigningBox
  ): Promise<ResultOfSigningBoxGetPublicKey> {
    return this.tonClient.request("crypto.signing_box_get_public_key", params);
  }

  /**
   * Returns signed user data.
   *
   * @param {ParamsOfSigningBoxSign} param - parameters
   * @returns ResultOfSigningBoxSign
   */
  signing_box_sign(
    params: ParamsOfSigningBoxSign
  ): Promise<ResultOfSigningBoxSign> {
    return this.tonClient.request("crypto.signing_box_sign", params);
  }

  /**
   * Removes signing box from SDK.
   *
   * @param {RegisteredSigningBox} param - parameters
   */
  remove_signing_box(params: RegisteredSigningBox): Promise<undefined> {
    return this.tonClient.request("crypto.remove_signing_box", params);
  }
}
