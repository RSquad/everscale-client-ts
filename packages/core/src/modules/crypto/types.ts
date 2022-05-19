export type CryptoErrorCode =
  | "InvalidPublicKey"
  | "InvalidSecretKey"
  | "InvalidKey"
  | "InvalidFactorizeChallenge"
  | "InvalidBigInt"
  | "ScryptFailed"
  | "InvalidKeySize"
  | "NaclSecretBoxFailed"
  | "NaclBoxFailed"
  | "NaclSignFailed"
  | "Bip39InvalidEntropy"
  | "Bip39InvalidPhrase"
  | "Bip32InvalidKey"
  | "Bip32InvalidDerivePath"
  | "Bip39InvalidDictionary"
  | "Bip39InvalidWordCount"
  | "MnemonicGenerationFailed"
  | "MnemonicFromEntropyFailed"
  | "SigningBoxNotRegistered"
  | "InvalidSignature"
  | "EncryptionBoxNotRegistered"
  | "InvalidIvSize"
  | "UnsupportedCipherMode"
  | "CannotCreateCipher"
  | "EncryptDataError"
  | "DecryptDataError"
  | "IvRequired"
  | "CryptoBoxNotRegistered"
  | "InvalidCryptoBoxType"
  | "CryptoBoxSecretSerializationError"
  | "CryptoBoxSecretDeserializationError"
  | "InvalidNonceSize";

export type SigningBoxHandle = number;

export type EncryptionBoxHandle = number;

export type EncryptionBoxInfo = {
  /**
   * hdpath - Derivation path, for instance "m/44'/396'/0'/0/0"
   */
  hdpath?: string;
  /**
   * algorithm - Cryptographic algorithm, used by this encryption box
   */
  algorithm?: string;
  /**
   * options - Options, depends on algorithm and specific encryption box implementation
   */
  options?: any;
  /**
   * public - Public information, depends on algorithm
   */
  public?: any;
};

export type EncryptionAlgorithm =
  | {
      type: "AES";
      value: AesParamsEB;
    }
  | {
      type: "ChaCha20";
      value: ChaCha20ParamsEB;
    }
  | {
      type: "NaclBox";
      value: NaclBoxParamsEB;
    }
  | {
      type: "NaclSecretBox";
      value: NaclSecretBoxParamsEB;
    };

export type CipherMode = "CBC" | "CFB" | "CTR" | "ECB" | "OFB";

export type AesParamsEB = {
  mode: CipherMode;
  key: string;
  iv?: string;
};

export type AesInfo = {
  mode: CipherMode;
  iv?: string;
};

export type ChaCha20ParamsEB = {
  /**
   * key - 256-bit key.
   */
  key: string;
  /**
   * nonce - 96-bit nonce.
   */
  nonce: string;
};

export type NaclBoxParamsEB = {
  /**
   * their_public - 256-bit key.
   */
  their_public: string;
  /**
   * secret - 256-bit key.
   */
  secret: string;
  /**
   * nonce - 96-bit nonce.
   */
  nonce: string;
};

export type NaclSecretBoxParamsEB = {
  /**
   * key - Secret key - unprefixed 0-padded to 64 symbols hex string
   */
  key: string;
  /**
   * nonce - Nonce in `hex`
   */
  nonce: string;
};

/**
 * * RandomSeedPhrase - Creates Crypto Box from a random seed phrase. This option can be used if a developer doesn't want the seed phrase to leave the core library's memory, where it is stored encrypted.
 * 
 * * PredefinedSeedPhrase - Restores crypto box instance from an existing seed phrase. This type should be used when Crypto Box is initialized from a seed phrase, entered by a user.
 * 
 * * EncryptedSecret - Use this type for wallet reinitializations, when you already have `encrypted_secret` on hands. To get `encrypted_secret`, use `get_crypto_box_info` function after you initialized your crypto box for the first time.
 * 

*/
export type CryptoBoxSecret =
  | {
      type: "RandomSeedPhrase";
      dictionary: number;
      wordcount: number;
    }
  | {
      type: "PredefinedSeedPhrase";
      phrase: string;
      dictionary: number;
      wordcount: number;
    }
  | {
      type: "EncryptedSecret";
      encrypted_secret: string;
    };

export type CryptoBoxHandle = number;

export type BoxEncryptionAlgorithm =
  | {
      type: "ChaCha20";
      value: ChaCha20ParamsCB;
    }
  | {
      type: "NaclBox";
      value: NaclBoxParamsCB;
    }
  | {
      type: "NaclSecretBox";
      value: NaclSecretBoxParamsCB;
    };

export type ChaCha20ParamsCB = {
  /**
   * nonce - 96-bit nonce.
   */
  nonce: string;
};

export type NaclBoxParamsCB = {
  /**
   * their_public - 256-bit key.
   */
  their_public: string;
  /**
   * nonce - 96-bit nonce.
   */
  nonce: string;
};

export type NaclSecretBoxParamsCB = {
  /**
   * nonce - Nonce in `hex`
   */
  nonce: string;
};

export type ParamsOfFactorize = {
  /**
   * composite - Hexadecimal representation of u64 composite number.
   */
  composite: string;
};

export type ResultOfFactorize = {
  /**
   * factors - Two factors of composite or empty if composite can't be factorized.
   */
  factors: string[];
};

export type ParamsOfModularPower = {
  /**
   * base - `base` argument of calculation.
   */
  base: string;
  /**
   * exponent - `exponent` argument of calculation.
   */
  exponent: string;
  /**
   * modulus - `modulus` argument of calculation.
   */
  modulus: string;
};

export type ResultOfModularPower = {
  /**
   * modular_power - Result of modular exponentiation
   */
  modular_power: string;
};

export type ParamsOfTonCrc16 = {
  /**
   * data - Input data for CRC calculation.
   */
  data: string;
};

export type ResultOfTonCrc16 = {
  /**
   * crc - Calculated CRC for input data.
   */
  crc: number;
};

export type ParamsOfGenerateRandomBytes = {
  /**
   * length - Size of random byte array.
   */
  length: number;
};

export type ResultOfGenerateRandomBytes = {
  /**
   * bytes - Generated bytes encoded in `base64`.
   */
  bytes: string;
};

export type ParamsOfConvertPublicKeyToTonSafeFormat = {
  /**
   * public_key - Public key - 64 symbols hex string
   */
  public_key: string;
};

export type ResultOfConvertPublicKeyToTonSafeFormat = {
  /**
   * ton_public_key - Public key represented in TON safe format.
   */
  ton_public_key: string;
};

export type KeyPair = {
  /**
   * public - Public key - 64 symbols hex string
   */
  public: string;
  /**
   * secret - Private key - u64 symbols hex string
   */
  secret: string;
};

export type ParamsOfSign = {
  /**
   * unsigned - Data that must be signed encoded in `base64`.
   */
  unsigned: string;
  keys: KeyPair;
};

export type ResultOfSign = {
  /**
   * signed - Signed data combined with signature encoded in `base64`.
   */
  signed: string;
  /**
   * signature - Signature encoded in `hex`.
   */
  signature: string;
};

export type ParamsOfVerifySignature = {
  /**
   * signed - Signed data that must be verified encoded in `base64`.
   */
  signed: string;
  /**
   * public - Signer's public key - 64 symbols hex string
   */
  public: string;
};

export type ResultOfVerifySignature = {
  /**
   * unsigned - Unsigned data encoded in `base64`.
   */
  unsigned: string;
};

export type ParamsOfHash = {
  /**
   * data - Input data for hash calculation.
   */
  data: string;
};

export type ResultOfHash = {
  /**
   * hash - Hash of input `data`.
   */
  hash: string;
};

export type ParamsOfScrypt = {
  /**
   * password - The password bytes to be hashed. Must be encoded with `base64`.
   */
  password: string;
  /**
   * salt - Salt bytes that modify the hash to protect against Rainbow table attacks. Must be encoded with `base64`.
   */
  salt: string;
  /**
   * log_n - CPU/memory cost parameter
   */
  log_n: number;
  /**
   * r - The block size parameter, which fine-tunes sequential memory read size and performance.
   */
  r: number;
  /**
   * p - Parallelization parameter.
   */
  p: number;
  /**
   * dk_len - Intended output length in octets of the derived key.
   */
  dk_len: number;
};

export type ResultOfScrypt = {
  /**
   * key - Derived key.
   */
  key: string;
};

export type ParamsOfNaclSignKeyPairFromSecret = {
  /**
   * secret - Secret key - unprefixed 0-padded to 64 symbols hex string
   */
  secret: string;
};

export type ParamsOfNaclSign = {
  /**
   * unsigned - Data that must be signed encoded in `base64`.
   */
  unsigned: string;
  /**
   * secret - Signer's secret key - unprefixed 0-padded to 128 symbols hex string (concatenation of 64 symbols secret and 64 symbols public keys). See `nacl_sign_keypair_from_secret_key`.
   */
  secret: string;
};

export type ResultOfNaclSign = {
  /**
   * signed - Signed data, encoded in `base64`.
   */
  signed: string;
};

export type ParamsOfNaclSignOpen = {
  /**
   * signed - Signed data that must be unsigned.
   */
  signed: string;
  /**
   * public - Signer's public key - unprefixed 0-padded to 64 symbols hex string
   */
  public: string;
};

export type ResultOfNaclSignOpen = {
  /**
   * unsigned - Unsigned data, encoded in `base64`.
   */
  unsigned: string;
};

export type ResultOfNaclSignDetached = {
  /**
   * signature - Signature encoded in `hex`.
   */
  signature: string;
};

export type ParamsOfNaclSignDetachedVerify = {
  /**
   * unsigned - Unsigned data that must be verified.
   */
  unsigned: string;
  /**
   * signature - Signature that must be verified.
   */
  signature: string;
  /**
   * public - Signer's public key - unprefixed 0-padded to 64 symbols hex string.
   */
  public: string;
};

export type ResultOfNaclSignDetachedVerify = {
  /**
   * succeeded - `true` if verification succeeded or `false` if it failed
   */
  succeeded: boolean;
};

export type ParamsOfNaclBoxKeyPairFromSecret = {
  /**
   * secret - Secret key - unprefixed 0-padded to 64 symbols hex string
   */
  secret: string;
};

export type ParamsOfNaclBox = {
  /**
   * decrypted - Data that must be encrypted encoded in `base64`.
   */
  decrypted: string;
  /**
   * nonce - Nonce, encoded in `hex`
   */
  nonce: string;
  /**
   * their_public - Receiver's public key - unprefixed 0-padded to 64 symbols hex string
   */
  their_public: string;
  /**
   * secret - Sender's private key - unprefixed 0-padded to 64 symbols hex string
   */
  secret: string;
};

export type ResultOfNaclBox = {
  /**
   * encrypted - Encrypted data encoded in `base64`.
   */
  encrypted: string;
};

export type ParamsOfNaclBoxOpen = {
  /**
   * encrypted - Data that must be decrypted.
   */
  encrypted: string;
  /**
   * nonce - Nonce
   */
  nonce: string;
  /**
   * their_public - Sender's public key - unprefixed 0-padded to 64 symbols hex string
   */
  their_public: string;
  /**
   * secret - Receiver's private key - unprefixed 0-padded to 64 symbols hex string
   */
  secret: string;
};

export type ResultOfNaclBoxOpen = {
  /**
   * decrypted - Decrypted data encoded in `base64`.
   */
  decrypted: string;
};

export type ParamsOfNaclSecretBox = {
  /**
   * decrypted - Data that must be encrypted.
   */
  decrypted: string;
  /**
   * nonce - Nonce in `hex`
   */
  nonce: string;
  /**
   * key - Secret key - unprefixed 0-padded to 64 symbols hex string
   */
  key: string;
};

export type ParamsOfNaclSecretBoxOpen = {
  /**
   * encrypted - Data that must be decrypted.
   */
  encrypted: string;
  /**
   * nonce - Nonce in `hex`
   */
  nonce: string;
  /**
   * key - Secret key - unprefixed 0-padded to 64 symbols hex string
   */
  key: string;
};

export type ParamsOfMnemonicWords = {
  /**
   * dictionary - Dictionary identifier
   */
  dictionary?: number;
};

export type ResultOfMnemonicWords = {
  /**
   * words - The list of mnemonic words
   */
  words: string;
};

export type ParamsOfMnemonicFromRandom = {
  /**
   * dictionary - Dictionary identifier
   */
  dictionary?: number;
  /**
   * word_count - Mnemonic word count
   */
  word_count?: number;
};

export type ResultOfMnemonicFromRandom = {
  /**
   * phrase - String of mnemonic words
   */
  phrase: string;
};

export type ParamsOfMnemonicFromEntropy = {
  /**
   * entropy - Entropy bytes.
   */
  entropy: string;
  /**
   * dictionary - Dictionary identifier
   */
  dictionary?: number;
  /**
   * word_count - Mnemonic word count
   */
  word_count?: number;
};

export type ResultOfMnemonicFromEntropy = {
  /**
   * phrase - Phrase
   */
  phrase: string;
};

export type ParamsOfMnemonicVerify = {
  /**
   * phrase - Phrase
   */
  phrase: string;
  /**
   * dictionary - Dictionary identifier
   */
  dictionary?: number;
  /**
   * word_count - Word count
   */
  word_count?: number;
};

export type ResultOfMnemonicVerify = {
  /**
   * valid - Flag indicating if the mnemonic is valid or not
   */
  valid: boolean;
};

export type ParamsOfMnemonicDeriveSignKeys = {
  /**
   * phrase - Phrase
   */
  phrase: string;
  /**
   * path - Derivation path, for instance "m/44'/396'/0'/0/0"
   */
  path?: string;
  /**
   * dictionary - Dictionary identifier
   */
  dictionary?: number;
  /**
   * word_count - Word count
   */
  word_count?: number;
};

export type ParamsOfHDKeyXPrvFromMnemonic = {
  /**
   * phrase - String with seed phrase
   */
  phrase: string;
  /**
   * dictionary - Dictionary identifier
   */
  dictionary?: number;
  /**
   * word_count - Mnemonic word count
   */
  word_count?: number;
};

export type ResultOfHDKeyXPrvFromMnemonic = {
  /**
   * xprv - Serialized extended master private key
   */
  xprv: string;
};

export type ParamsOfHDKeyDeriveFromXPrv = {
  /**
   * xprv - Serialized extended private key
   */
  xprv: string;
  /**
   * child_index - Child index (see BIP-0032)
   */
  child_index: number;
  /**
   * hardened - Indicates the derivation of hardened/not-hardened key (see BIP-0032)
   */
  hardened: boolean;
};

export type ResultOfHDKeyDeriveFromXPrv = {
  /**
   * xprv - Serialized extended private key
   */
  xprv: string;
};

export type ParamsOfHDKeyDeriveFromXPrvPath = {
  /**
   * xprv - Serialized extended private key
   */
  xprv: string;
  /**
   * path - Derivation path, for instance "m/44'/396'/0'/0/0"
   */
  path: string;
};

export type ResultOfHDKeyDeriveFromXPrvPath = {
  /**
   * xprv - Derived serialized extended private key
   */
  xprv: string;
};

export type ParamsOfHDKeySecretFromXPrv = {
  /**
   * xprv - Serialized extended private key
   */
  xprv: string;
};

export type ResultOfHDKeySecretFromXPrv = {
  /**
   * secret - Private key - 64 symbols hex string
   */
  secret: string;
};

export type ParamsOfHDKeyPublicFromXPrv = {
  /**
   * xprv - Serialized extended private key
   */
  xprv: string;
};

export type ResultOfHDKeyPublicFromXPrv = {
  /**
   * public - Public key - 64 symbols hex string
   */
  public: string;
};

export type ParamsOfChaCha20 = {
  /**
   * data - Source data to be encrypted or decrypted.
   */
  data: string;
  /**
   * key - 256-bit key.
   */
  key: string;
  /**
   * nonce - 96-bit nonce.
   */
  nonce: string;
};

export type ResultOfChaCha20 = {
  /**
   * data - Encrypted/decrypted data.
   */
  data: string;
};

export type ParamsOfCreateCryptoBox = {
  /**
   * secret_encryption_salt - Salt used for secret encryption. For example, a mobile device can use device ID as salt.
   */
  secret_encryption_salt: string;
  secret: CryptoBoxSecret;
};

export type RegisteredCryptoBox = {
  handle: CryptoBoxHandle;
};

/**
 * To secure the password while passing it from application to the library,
 *
 * the library generates a temporary key pair, passes the pubkey
 *
 * to the passwordProvider, decrypts the received password with private key,
 *
 * and deletes the key pair right away.
 *
 *
 *
 * Application should generate a temporary nacl_box_keypair
 *
 * and encrypt the password with naclbox function using nacl_box_keypair.secret
 *
 * and encryption_public_key keys + nonce = 24-byte prefix of encryption_public_key.
 */
export type ParamsOfAppPasswordProvider = {
  type: "GetPassword";
  encryption_public_key: string;
};

export type ResultOfAppPasswordProvider = {
  type: "GetPassword";
  encrypted_password: string;
  app_encryption_pubkey: string;
};

export type ResultOfGetCryptoBoxInfo = {
  /**
   * encrypted_secret - Secret (seed phrase) encrypted with salt and password.
   */
  encrypted_secret: string;
};

export type ResultOfGetCryptoBoxSeedPhrase = {
  phrase: string;
  dictionary: number;
  wordcount: number;
};

export type ParamsOfGetSigningBoxFromCryptoBox = {
  /**
   * handle - Crypto Box Handle.
   */
  handle: number;
  /**
   * hdpath - HD key derivation path.
   */
  hdpath?: string;
  /**
   * secret_lifetime - Store derived secret for this lifetime (in ms). The timer starts after each signing box operation. Secrets will be deleted immediately after each signing box operation, if this value is not set.
   */
  secret_lifetime?: number;
};

export type RegisteredSigningBox = {
  handle: SigningBoxHandle;
};

export type ParamsOfGetEncryptionBoxFromCryptoBox = {
  /**
   * handle - Crypto Box Handle.
   */
  handle: number;
  /**
   * hdpath - HD key derivation path.
   */
  hdpath?: string;
  algorithm: BoxEncryptionAlgorithm;
  /**
   * secret_lifetime - Store derived secret for encryption algorithm for this lifetime (in ms). The timer starts after each encryption box operation. Secrets will be deleted (overwritten with zeroes) after each encryption operation, if this value is not set.
   */
  secret_lifetime?: number;
};

export type RegisteredEncryptionBox = {
  handle: EncryptionBoxHandle;
};

/**
 * * GetPublicKey - Get signing box public key
 * 
 * * Sign - Sign data
 * 

*/
export type ParamsOfAppSigningBox =
  | {
      type: "GetPublicKey";
    }
  | {
      type: "Sign";
      unsigned: string;
    };

/**
 * * GetPublicKey - Result of getting public key
 * 
 * * Sign - Result of signing data
 * 

*/
export type ResultOfAppSigningBox =
  | {
      type: "GetPublicKey";
      public_key: string;
    }
  | {
      type: "Sign";
      signature: string;
    };

export type ResultOfSigningBoxGetPublicKey = {
  /**
   * pubkey - Public key of signing box.
   */
  pubkey: string;
};

export type ParamsOfSigningBoxSign = {
  signing_box: SigningBoxHandle;
  /**
   * unsigned - Unsigned user data.
   */
  unsigned: string;
};

export type ResultOfSigningBoxSign = {
  /**
   * signature - Data signature.
   */
  signature: string;
};

/**
 * * GetInfo - Get encryption box info
 * 
 * * Encrypt - Encrypt data
 * 
 * * Decrypt - Decrypt data
 * 

*/
export type ParamsOfAppEncryptionBox =
  | {
      type: "GetInfo";
    }
  | {
      type: "Encrypt";
      data: string;
    }
  | {
      type: "Decrypt";
      data: string;
    };

/**
 * * GetInfo - Result of getting encryption box info
 * 
 * * Encrypt - Result of encrypting data
 * 
 * * Decrypt - Result of decrypting data
 * 

*/
export type ResultOfAppEncryptionBox =
  | {
      type: "GetInfo";
      info: EncryptionBoxInfo;
    }
  | {
      type: "Encrypt";
      data: string;
    }
  | {
      type: "Decrypt";
      data: string;
    };

export type ParamsOfEncryptionBoxGetInfo = {
  encryption_box: EncryptionBoxHandle;
};

export type ResultOfEncryptionBoxGetInfo = {
  info: EncryptionBoxInfo;
};

export type ParamsOfEncryptionBoxEncrypt = {
  encryption_box: EncryptionBoxHandle;
  /**
   * data - Data to be encrypted, encoded in Base64
   */
  data: string;
};

export type ResultOfEncryptionBoxEncrypt = {
  /**
   * data - Encrypted data, encoded in Base64.
   */
  data: string;
};

export type ParamsOfEncryptionBoxDecrypt = {
  encryption_box: EncryptionBoxHandle;
  /**
   * data - Data to be decrypted, encoded in Base64
   */
  data: string;
};

export type ResultOfEncryptionBoxDecrypt = {
  /**
   * data - Decrypted data, encoded in Base64.
   */
  data: string;
};

export type ParamsOfCreateEncryptionBox = {
  algorithm: EncryptionAlgorithm;
};
