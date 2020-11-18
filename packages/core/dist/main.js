(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 149:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ResponseType": () => /* binding */ ResponseType,
  "TonClient": () => /* binding */ TonClient,
  "default": () => /* binding */ src
});

;// CONCATENATED MODULE: ./src/modules/utils/index.ts
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Misc utility Functions.
 *
 * @remarks
 * Misc utility Functions.
 */
class utils_UtilsModule {
  constructor(tonClient) {
    _defineProperty(this, "tonClient", void 0);

    this.tonClient = tonClient;
  }
  /**
   * Converts address from any TON format to any TON format
   *
   * @remarks
   * Converts address from any TON format to any TON format
   *
   * @param {ParamsOfConvertAddress} param - parameters
   * @returns ResultOfConvertAddress
   */


  convert_address(params) {
    return this.tonClient.request("utils.convert_address", params);
  }

}
;// CONCATENATED MODULE: ./src/utils.module.ts
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




class UtilsModule extends utils_UtilsModule {
  getBalance(address) {
    var _arguments = arguments,
        _this = this;

    return _asyncToGenerator(function* () {
      var outputFormat = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : "hex";

      try {
        var {
          result
        } = yield _this.tonClient.net.query_collection({
          collection: "accounts",
          filter: {
            id: {
              eq: address
            }
          },
          result: "id balance"
        });

        if (!result[0]) {
          return "";
        }

        return outputFormat === "hex" ? result[0].balance : parseInt(result[0].balance, 16);
      } catch (err) {
        console.log(err);
        throw new src.TonClientError(err.code, err.message, err.data);
      }
    })();
  }

}


;// CONCATENATED MODULE: ./src/modules/client/index.ts
function client_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Provides information about library.
 *
 * @remarks
 * Provides information about library.
 */
class ClientModule {
  constructor(tonClient) {
    client_defineProperty(this, "tonClient", void 0);

    this.tonClient = tonClient;
  }
  /**
   * Returns Core Library API reference
   *
   * @remarks
   * Returns Core Library API reference
   */


  get_api_reference() {
    return this.tonClient.request("client.get_api_reference");
  }
  /**
   * Returns Core Library version
   *
   * @remarks
   * Returns Core Library version
   */


  version() {
    return this.tonClient.request("client.version");
  }
  /**
   * Returns detailed information about this build.
   *
   * @remarks
   * Returns detailed information about this build.
   */


  build_info() {
    return this.tonClient.request("client.build_info");
  }

}
;// CONCATENATED MODULE: ./src/modules/net/index.ts
function net_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Network access.
 *
 * @remarks
 * Network access.
 */
class NetModule {
  constructor(tonClient) {
    net_defineProperty(this, "tonClient", void 0);

    this.tonClient = tonClient;
  }
  /**
   * Queries collection data
   *
   * @remarks
   * Queries collection data
   *
   * Queries data that satisfies the `filter` conditions,
   * limits the number of returned records and orders them.
   * The projection fields are limited to  `result` fields
   *
   * @param {ParamsOfQueryCollection} param - parameters
   * @returns ResultOfQueryCollection
   */


  query_collection(params) {
    return this.tonClient.request("net.query_collection", params);
  }
  /**
   * Returns an object that fulfills the conditions or waits for its appearance
   *
   * @remarks
   * Returns an object that fulfills the conditions or waits for its appearance
   *
   * Triggers only once.
   * If object that satisfies the `filter` conditions
   * already exists - returns it immediately.
   * If not - waits for insert/update of data withing the specified `timeout`,
   * and returns it.
   * The projection fields are limited to  `result` fields
   *
   * @param {ParamsOfWaitForCollection} param - parameters
   * @returns ResultOfWaitForCollection
   */


  wait_for_collection(params) {
    return this.tonClient.request("net.wait_for_collection", params);
  }
  /**
   * Cancels a subscription
   *
   * @remarks
   * Cancels a subscription
   *
   * Cancels a subscription specified by its handle.
   *
   * @param {ResultOfSubscribeCollection} param - parameters
   */


  unsubscribe(params) {
    return this.tonClient.request("net.unsubscribe", params);
  }
  /**
   * Creates a subscription
   *
   * @remarks
   * Creates a subscription
   *
   * Triggers for each insert/update of data
   * that satisfies the `filter` conditions.
   * The projection fields are limited to  `result` fields.
   *
   * @param {ParamsOfSubscribeCollection} param - parameters
   * @param {Request} responseHandler - Request callback
   * @returns ResultOfSubscribeCollection
   */


  subscribe_collection(params, responseHandler) {
    return this.tonClient.request("net.subscribe_collection", params, responseHandler);
  }

}
;// CONCATENATED MODULE: ./src/modules/boc/index.ts
function boc_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * BOC manipulation module.
 *
 * @remarks
 * BOC manipulation module.
 */
class BocModule {
  constructor(tonClient) {
    boc_defineProperty(this, "tonClient", void 0);

    this.tonClient = tonClient;
  }
  /**
   * Parses message boc into a JSON
   *
   * @remarks
   * Parses message boc into a JSON
   *
   * JSON structure is compatible with GraphQL API message object
   *
   * @param {ParamsOfParse} param - parameters
   * @returns ResultOfParse
   */


  parse_message(params) {
    return this.tonClient.request("boc.parse_message", params);
  }
  /**
   * Parses transaction boc into a JSON
   *
   * @remarks
   * Parses transaction boc into a JSON
   *
   * JSON structure is compatible with GraphQL API transaction object
   *
   * @param {ParamsOfParse} param - parameters
   * @returns ResultOfParse
   */


  parse_transaction(params) {
    return this.tonClient.request("boc.parse_transaction", params);
  }
  /**
   * Parses account boc into a JSON
   *
   * @remarks
   * Parses account boc into a JSON
   *
   * JSON structure is compatible with GraphQL API account object
   *
   * @param {ParamsOfParse} param - parameters
   * @returns ResultOfParse
   */


  parse_account(params) {
    return this.tonClient.request("boc.parse_account", params);
  }
  /**
   * Parses block boc into a JSON
   *
   * @remarks
   * Parses block boc into a JSON
   *
   * JSON structure is compatible with GraphQL API block object
   *
   * @param {ParamsOfParse} param - parameters
   * @returns ResultOfParse
   */


  parse_block(params) {
    return this.tonClient.request("boc.parse_block", params);
  }
  /**
   * Parses shardstate boc into a JSON
   *
   * @remarks
   * Parses shardstate boc into a JSON
   *
   * JSON structure is compatible with GraphQL API shardstate object
   *
   * @param {ParamsOfParseShardstate} param - parameters
   * @returns ResultOfParse
   */


  parse_shardstate(params) {
    return this.tonClient.request("boc.parse_shardstate", params);
  }

  get_blockchain_config(params) {
    return this.tonClient.request("boc.get_blockchain_config", params);
  }

}
;// CONCATENATED MODULE: ./src/modules/crypto/index.ts
function crypto_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Crypto functions.
 *
 * @remarks
 * Crypto functions.
 */
class CryptoModule {
  constructor(tonClient) {
    crypto_defineProperty(this, "tonClient", void 0);

    this.tonClient = tonClient;
  }
  /**
   * Integer factorization
   *
   * @remarks
   * Performs prime factorization – decomposition of a composite number
   * into a product of smaller prime integers (factors).
   * See [https://en.wikipedia.org/wiki/Integer_factorization]
   *
   * @param {ParamsOfFactorize} param - parameters
   * @returns ResultOfFactorize
   */


  factorize(params) {
    return this.tonClient.request("crypto.factorize", params);
  }
  /**
   * Modular exponentiation
   *
   * @remarks
   * Performs modular exponentiation for big integers (`base`^`exponent` mod `modulus`).
   * See [https://en.wikipedia.org/wiki/Modular_exponentiation]
   *
   * @param {ParamsOfModularPower} param - parameters
   * @returns ResultOfModularPower
   */


  modular_power(params) {
    return this.tonClient.request("crypto.modular_power", params);
  }
  /**
   * Calculates CRC16 using TON algorithm.
   *
   * @remarks
   * Calculates CRC16 using TON algorithm.
   *
   * @param {ParamsOfTonCrc16} param - parameters
   * @returns ResultOfTonCrc16
   */


  ton_crc16(params) {
    return this.tonClient.request("crypto.ton_crc16", params);
  }
  /**
   * Generates random byte array of the specified length and returns it in `base64` format
   *
   * @remarks
   * Generates random byte array of the specified length and returns it in `base64` format
   *
   * @param {ParamsOfGenerateRandomBytes} param - parameters
   * @returns ResultOfGenerateRandomBytes
   */


  generate_random_bytes(params) {
    return this.tonClient.request("crypto.generate_random_bytes", params);
  }
  /**
   * Converts public key to ton safe_format
   *
   * @remarks
   * Converts public key to ton safe_format
   *
   * @param {ParamsOfConvertPublicKeyToTonSafeFormat} param - parameters
   * @returns ResultOfConvertPublicKeyToTonSafeFormat
   */


  convert_public_key_to_ton_safe_format(params) {
    return this.tonClient.request("crypto.convert_public_key_to_ton_safe_format", params);
  }
  /**
   * Generates random ed25519 key pair.
   *
   * @remarks
   * Generates random ed25519 key pair.
   */


  generate_random_sign_keys() {
    return this.tonClient.request("crypto.generate_random_sign_keys");
  }
  /**
   * Signs a data using the provided keys.
   *
   * @remarks
   * Signs a data using the provided keys.
   *
   * @param {ParamsOfSign} param - parameters
   * @returns ResultOfSign
   */


  sign(params) {
    return this.tonClient.request("crypto.sign", params);
  }
  /**
   * Verifies signed data using the provided public key.
   *
   * @remarks
   * Verifies signed data using the provided public key.
   * Raises error if verification is failed.
   *
   * @param {ParamsOfVerifySignature} param - parameters
   * @returns ResultOfVerifySignature
   */


  verify_signature(params) {
    return this.tonClient.request("crypto.verify_signature", params);
  }
  /**
   * Calculates SHA256 hash of the specified data.
   *
   * @remarks
   * Calculates SHA256 hash of the specified data.
   *
   * @param {ParamsOfHash} param - parameters
   * @returns ResultOfHash
   */


  sha256(params) {
    return this.tonClient.request("crypto.sha256", params);
  }
  /**
   * Calculates SHA512 hash of the specified data.
   *
   * @remarks
   * Calculates SHA512 hash of the specified data.
   *
   * @param {ParamsOfHash} param - parameters
   * @returns ResultOfHash
   */


  sha512(params) {
    return this.tonClient.request("crypto.sha512", params);
  }
  /**
   * Perform `scrypt` encryption
   *
   * @remarks
   * Derives key from `password` and `key` using `scrypt` algorithm.
   * See [https://en.wikipedia.org/wiki/Scrypt].
   *
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


  scrypt(params) {
    return this.tonClient.request("crypto.scrypt", params);
  }
  /**
   * Generates a key pair for signing from the secret key
   *
   * @remarks
   * Generates a key pair for signing from the secret key
   *
   * @param {ParamsOfNaclSignKeyPairFromSecret} param - parameters
   * @returns KeyPair
   */


  nacl_sign_keypair_from_secret_key(params) {
    return this.tonClient.request("crypto.nacl_sign_keypair_from_secret_key", params);
  }
  /**
   * Signs data using the signer's secret key.
   *
   * @remarks
   * Signs data using the signer's secret key.
   *
   * @param {ParamsOfNaclSign} param - parameters
   * @returns ResultOfNaclSign
   */


  nacl_sign(params) {
    return this.tonClient.request("crypto.nacl_sign", params);
  }

  nacl_sign_open(params) {
    return this.tonClient.request("crypto.nacl_sign_open", params);
  }

  nacl_sign_detached(params) {
    return this.tonClient.request("crypto.nacl_sign_detached", params);
  }

  nacl_box_keypair() {
    return this.tonClient.request("crypto.nacl_box_keypair");
  }
  /**
   * Generates key pair from a secret key
   *
   * @remarks
   * Generates key pair from a secret key
   *
   * @param {ParamsOfNaclBoxKeyPairFromSecret} param - parameters
   * @returns KeyPair
   */


  nacl_box_keypair_from_secret_key(params) {
    return this.tonClient.request("crypto.nacl_box_keypair_from_secret_key", params);
  }
  /**
   * Public key authenticated encryption
   *
   * @remarks
   * Public key authenticated encryption
   *
   * Encrypt and authenticate a message using the senders secret key, the recievers public
   * key, and a nonce.
   *
   * @param {ParamsOfNaclBox} param - parameters
   * @returns ResultOfNaclBox
   */


  nacl_box(params) {
    return this.tonClient.request("crypto.nacl_box", params);
  }
  /**
   * Decrypt and verify the cipher text using the recievers secret key, the senders public
   *
   * @remarks
   * Decrypt and verify the cipher text using the recievers secret key, the senders public
   * key, and the nonce.
   *
   * @param {ParamsOfNaclBoxOpen} param - parameters
   * @returns ResultOfNaclBoxOpen
   */


  nacl_box_open(params) {
    return this.tonClient.request("crypto.nacl_box_open", params);
  }
  /**
   * Encrypt and authenticate message using nonce and secret key.
   *
   * @remarks
   * Encrypt and authenticate message using nonce and secret key.
   *
   * @param {ParamsOfNaclSecretBox} param - parameters
   * @returns ResultOfNaclBox
   */


  nacl_secret_box(params) {
    return this.tonClient.request("crypto.nacl_secret_box", params);
  }
  /**
   * Decrypts and verifies cipher text using `nonce` and secret `key`.
   *
   * @remarks
   * Decrypts and verifies cipher text using `nonce` and secret `key`.
   *
   * @param {ParamsOfNaclSecretBoxOpen} param - parameters
   * @returns ResultOfNaclBoxOpen
   */


  nacl_secret_box_open(params) {
    return this.tonClient.request("crypto.nacl_secret_box_open", params);
  }
  /**
   * Prints the list of words from the specified dictionary
   *
   * @remarks
   * Prints the list of words from the specified dictionary
   *
   * @param {ParamsOfMnemonicWords} param - parameters
   * @returns ResultOfMnemonicWords
   */


  mnemonic_words(params) {
    return this.tonClient.request("crypto.mnemonic_words", params);
  }
  /**
   * Generates a random mnemonic
   *
   * @remarks
   * Generates a random mnemonic from the specified dictionary and word count
   *
   * @param {ParamsOfMnemonicFromRandom} param - parameters
   * @returns ResultOfMnemonicFromRandom
   */


  mnemonic_from_random(params) {
    return this.tonClient.request("crypto.mnemonic_from_random", params);
  }
  /**
   * Generates mnemonic from the specified entropy
   *
   * @remarks
   * Generates mnemonic from pre-generated entropy
   *
   * @param {ParamsOfMnemonicFromEntropy} param - parameters
   * @returns ResultOfMnemonicFromEntropy
   */


  mnemonic_from_entropy(params) {
    return this.tonClient.request("crypto.mnemonic_from_entropy", params);
  }
  /**
   * Validates a mnemonic phrase
   *
   * @remarks
   * The phrase supplied will be checked for word length and validated according to the checksum
   * specified in BIP0039.
   *
   * @param {ParamsOfMnemonicVerify} param - parameters
   * @returns ResultOfMnemonicVerify
   */


  mnemonic_verify(params) {
    return this.tonClient.request("crypto.mnemonic_verify", params);
  }
  /**
   * Derives a key pair for signing from the seed phrase
   *
   * @remarks
   * Validates the seed phrase, generates master key and then derives
   * the key pair from the master key and the specified path
   *
   * @param {ParamsOfMnemonicDeriveSignKeys} param - parameters
   * @returns KeyPair
   */


  mnemonic_derive_sign_keys(params) {
    return this.tonClient.request("crypto.mnemonic_derive_sign_keys", params);
  }
  /**
   * Generates an extended master private key that will be the root for all the derived keys
   *
   * @remarks
   * Generates an extended master private key that will be the root for all the derived keys
   *
   * @param {ParamsOfHDKeyXPrvFromMnemonic} param - parameters
   * @returns ResultOfHDKeyXPrvFromMnemonic
   */


  hdkey_xprv_from_mnemonic(params) {
    return this.tonClient.request("crypto.hdkey_xprv_from_mnemonic", params);
  }
  /**
   * Returns extended private key derived from the specified extended private key and child index
   *
   * @remarks
   * Returns extended private key derived from the specified extended private key and child index
   *
   * @param {ParamsOfHDKeyDeriveFromXPrv} param - parameters
   * @returns ResultOfHDKeyDeriveFromXPrv
   */


  hdkey_derive_from_xprv(params) {
    return this.tonClient.request("crypto.hdkey_derive_from_xprv", params);
  }
  /**
   * Derives the exented private key from the specified key and path
   *
   * @remarks
   * Derives the exented private key from the specified key and path
   *
   * @param {ParamsOfHDKeyDeriveFromXPrvPath} param - parameters
   * @returns ResultOfHDKeyDeriveFromXPrvPath
   */


  hdkey_derive_from_xprv_path(params) {
    return this.tonClient.request("crypto.hdkey_derive_from_xprv_path", params);
  }
  /**
   * Extracts the private key from the serialized extended private key
   *
   * @remarks
   * Extracts the private key from the serialized extended private key
   *
   * @param {ParamsOfHDKeySecretFromXPrv} param - parameters
   * @returns ResultOfHDKeySecretFromXPrv
   */


  hdkey_secret_from_xprv(params) {
    return this.tonClient.request("crypto.hdkey_secret_from_xprv", params);
  }
  /**
   * Extracts the public key from the serialized extended private key
   *
   * @remarks
   * Extracts the public key from the serialized extended private key
   *
   * @param {ParamsOfHDKeyPublicFromXPrv} param - parameters
   * @returns ResultOfHDKeyPublicFromXPrv
   */


  hdkey_public_from_xprv(params) {
    return this.tonClient.request("crypto.hdkey_public_from_xprv", params);
  }
  /**
   * Performs symmetric `chacha20` encryption.
   *
   * @remarks
   * Performs symmetric `chacha20` encryption.
   *
   * @param {ParamsOfChaCha20} param - parameters
   * @returns ResultOfChaCha20
   */


  chacha20(params) {
    return this.tonClient.request("crypto.chacha20", params);
  }

}
;// CONCATENATED MODULE: ./src/modules/abi/index.ts
function abi_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Provides message encoding and decoding according to the ABI
 *
 * @remarks
 * Provides message encoding and decoding according to the ABI
 * specification.
 */
class AbiModule {
  constructor(tonClient) {
    abi_defineProperty(this, "tonClient", void 0);

    this.tonClient = tonClient;
  }
  /**
   * Encodes message body according to ABI function call.
   *
   * @remarks
   * Encodes message body according to ABI function call.
   *
   * @param {ParamsOfEncodeMessageBody} param - parameters
   * @returns ResultOfEncodeMessageBody
   */


  encode_message_body(params) {
    return this.tonClient.request("abi.encode_message_body", params);
  }

  attach_signature_to_message_body(params) {
    return this.tonClient.request("abi.attach_signature_to_message_body", params);
  }
  /**
   * Encodes an ABI-compatible message
   *
   * @remarks
   * Encodes an ABI-compatible message
   *
   * Allows to encode deploy and function call messages,
   * both signed and unsigned.
   *
   * Use cases include messages of any possible type:
   * - deploy with initial function call (i.e. `constructor` or any other function that is used for some kind
   * of initialization);
   * - deploy without initial function call;
   * - signed/unsigned + data for signing.
   *
   * `Signer` defines how the message should or shouldn't be signed:
   *
   * `Signer::None` creates an unsigned message. This may be needed in case of some public methods,
   * that do not require authorization by pubkey.
   *
   * `Signer::External` takes public key and returns `data_to_sign` for later signing.
   * Use `attach_signature` method with the result signature to get the signed message.
   *
   * `Signer::Keys` creates a signed message with provided key pair.
   *
   * [SOON] `Signer::SigningBox` Allows using a special interface to imlepement signing
   * without private key disclosure to SDK. For instance, in case of using a cold wallet or HSM,
   * when application calls some API to sign data.
   *
   * @param {ParamsOfEncodeMessage} param - parameters
   * @returns ResultOfEncodeMessage
   */


  encode_message(params) {
    return this.tonClient.request("abi.encode_message", params);
  }
  /**
   * Combines `hex`-encoded `signature` with `base64`-encoded `unsigned_message`.
   *
   * @remarks
   * Combines `hex`-encoded `signature` with `base64`-encoded `unsigned_message`.
   * Returns signed message encoded in `base64`.
   *
   * @param {ParamsOfAttachSignature} param - parameters
   * @returns ResultOfAttachSignature
   */


  attach_signature(params) {
    return this.tonClient.request("abi.attach_signature", params);
  }
  /**
   * Decodes message body using provided message BOC and ABI.
   *
   * @remarks
   * Decodes message body using provided message BOC and ABI.
   *
   * @param {ParamsOfDecodeMessage} param - parameters
   * @returns DecodedMessageBody
   */


  decode_message(params) {
    return this.tonClient.request("abi.decode_message", params);
  }
  /**
   * Decodes message body using provided body BOC and ABI.
   *
   * @remarks
   * Decodes message body using provided body BOC and ABI.
   *
   * @param {ParamsOfDecodeMessageBody} param - parameters
   * @returns DecodedMessageBody
   */


  decode_message_body(params) {
    return this.tonClient.request("abi.decode_message_body", params);
  }
  /**
   * Creates account state BOC
   *
   * @remarks
   * Creates account state BOC
   *
   * Creates account state provided with one of these sets of data :
   * 1. BOC of code, BOC of data, BOC of library
   * 2. TVC (string in `base64`), keys, init params
   *
   * @param {ParamsOfEncodeAccount} param - parameters
   * @returns ResultOfEncodeAccount
   */


  encode_account(params) {
    return this.tonClient.request("abi.encode_account", params);
  }

}
;// CONCATENATED MODULE: ./src/errors.ts
function errors_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TonClientError extends Error {
  constructor(code, message, data) {
    super(message);

    errors_defineProperty(this, "code", void 0);

    errors_defineProperty(this, "data", void 0);

    this.code = code;
    this.data = data;
  }

}
;// CONCATENATED MODULE: ./src/modules/processing/index.ts
function processing_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Message processing module.
 *
 * @remarks
 * Message processing module.
 *
 * This module incorporates functions related to complex message
 * processing scenarios.
 */
class ProcessingModule {
  constructor(tonClient) {
    processing_defineProperty(this, "tonClient", void 0);

    this.tonClient = tonClient;
  }
  /**
   * Sends message to the network
   *
   * @remarks
   * Sends message to the network
   *
   * Sends message to the network and returns the last generated shard block of the destination account
   * before the message was sent. It will be required later for message processing.
   *
   * @param {ParamsOfSendMessage} param - parameters
   * @param {Request} responseHandler - Request callback
   * @returns ResultOfSendMessage
   */


  send_message(params, responseHandler) {
    return this.tonClient.request("processing.send_message", params, responseHandler);
  }
  /**
   * Performs monitoring of the network for the result transaction
   *
   * @remarks
   * Performs monitoring of the network for the result transaction
   * of the external inbound message processing.
   *
   * `send_events` enables intermediate events, such as `WillFetchNextBlock`,
   * `FetchNextBlockFailed` that may be useful for logging of new shard blocks creation
   * during message processing.
   *
   * Note that presence of the `abi` parameter is critical for ABI
   * compliant contracts. Message processing uses drastically
   * different strategy for processing message for contracts which
   * ABI includes "expire" header.
   *
   * When the ABI header `expire` is present, the processing uses
   * `message expiration` strategy:
   * - The maximum block gen time is set to
   * `message_expiration_time + transaction_wait_timeout`.
   * - When maximum block gen time is reached the processing will
   * be finished with `MessageExpired` error.
   *
   * When the ABI header `expire` isn't present or `abi` parameter
   * isn't specified, the processing uses `transaction waiting`
   * strategy:
   * - The maximum block gen time is set to
   * `now() + transaction_wait_timeout`.
   *
   * - If maximum block gen time is reached and no result transaction is found
   * the processing will exit with an error.
   *
   * @param {ParamsOfWaitForTransaction} param - parameters
   * @param {Request} responseHandler - Request callback
   * @returns ResultOfProcessMessage
   */


  wait_for_transaction(params, responseHandler) {
    return this.tonClient.request("processing.wait_for_transaction", params, responseHandler);
  }
  /**
   * Creates message, sends it to the network and monitors its processing.
   *
   * @remarks
   * Creates message, sends it to the network and monitors its processing.
   *
   * Creates ABI-compatible message,
   * sends it to the network and monitors for the result transaction.
   * Decodes the output messages's bodies.
   *
   * If contract's ABI includes "expire" header then
   * SDK implements retries in case of unsuccessful message delivery within the expiration
   * timeout: SDK recreates the message, sends it and processes it again.
   *
   * The intermediate events, such as `WillFetchFirstBlock`, `WillSend`, `DidSend`,
   * `WillFetchNextBlock`, etc - are switched on/off by `send_events` flag
   * and logged into the supplied callback function.
   * The retry configuration parameters are defined in config:
   * <add correct config params here>
   * pub const DEFAULT_EXPIRATION_RETRIES_LIMIT: i8 = 3; - max number of retries
   * pub const DEFAULT_EXPIRATION_TIMEOUT: u32 = 40000;  - message expiration timeout in ms.
   * pub const DEFAULT_....expiration_timeout_grow_factor... = 1.5 - factor that increases the expiration timeout for each retry
   *
   * If contract's ABI does not include "expire" header
   * then if no transaction is found within the network timeout (see config parameter ), exits with error.
   *
   * @param {ParamsOfProcessMessage} param - parameters
   * @param {Request} responseHandler - Request callback
   * @returns ResultOfProcessMessage
   */


  process_message(params, responseHandler) {
    return this.tonClient.request("processing.process_message", params, responseHandler);
  }

}
;// CONCATENATED MODULE: ./src/modules/tvm/index.ts
function tvm_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TvmModule {
  constructor(tonClient) {
    tvm_defineProperty(this, "tonClient", void 0);

    this.tonClient = tonClient;
  }

  run_executor(params) {
    return this.tonClient.request("tvm.run_executor", params);
  }

  run_tvm(params) {
    return this.tonClient.request("tvm.run_tvm", params);
  }
  /**
   * Executes getmethod and returns data from TVM stack
   *
   * @remarks
   * Executes getmethod and returns data from TVM stack
   *
   * @param {ParamsOfRunGet} param - parameters
   * @returns ResultOfRunGet
   */


  run_get(params) {
    return this.tonClient.request("tvm.run_get", params);
  }

}
;// CONCATENATED MODULE: ./src/index.ts
function src_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function src_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { src_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { src_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function src_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var ResponseType;

(function (ResponseType) {
  ResponseType[ResponseType["Success"] = 0] = "Success";
  ResponseType[ResponseType["Error"] = 1] = "Error";
  ResponseType[ResponseType["Nop"] = 2] = "Nop";
  ResponseType[ResponseType["Custom"] = 100] = "Custom";
})(ResponseType || (ResponseType = {}));

class TonClient {
  constructor(config) {
    src_defineProperty(this, "client", void 0);

    src_defineProperty(this, "utils", void 0);

    src_defineProperty(this, "net", void 0);

    src_defineProperty(this, "boc", void 0);

    src_defineProperty(this, "crypto", void 0);

    src_defineProperty(this, "abi", void 0);

    src_defineProperty(this, "processing", void 0);

    src_defineProperty(this, "tvm", void 0);

    src_defineProperty(this, "config", void 0);

    src_defineProperty(this, "context", null);

    this.config = config || {};
    this.client = new ClientModule(this);
    this.utils = new UtilsModule(this);
    this.net = new NetModule(this);
    this.boc = new BocModule(this);
    this.crypto = new CryptoModule(this);
    this.abi = new AbiModule(this);
    this.processing = new ProcessingModule(this);
    this.tvm = new TvmModule(this);
  }

  destroy() {
    if (this.context !== null) {
      TonClient.destroyContext(this.context);
      this.context = null;
    }
  }

  request(functionName, functionParams, responseHandler) {
    var _this = this;

    return src_asyncToGenerator(function* () {
      if (_this.context === null) {
        _this.context = yield TonClient.createContext(_this.config);
      }

      var context = _this.context;

      try {
        var library = yield TonClient.getLibrary();

        var _result = yield new Promise((resolve, reject) => {
          var request = {
            resolve,
            reject,
            responseHandler
          };
          var requestId = TonClient.getRequestId();
          TonClient.requests.set(requestId, request);
          var paramsStr = functionParams === undefined || functionParams === null ? "" : JSON.stringify(functionParams);
          library.sendRequest(context, requestId, functionName, paramsStr);
        });

        return _result;
      } catch (error) {
        throw new TonClientError(error.code, error.message, error.data);
      }
    })();
  }

  static loadBinaryLibrary(loader) {
    if (this.isInitialized || this.libraryLoadingPromise !== null) return;
    this.libraryLoadingPromise = loader().then(library => {
      var _this$library;

      this.library = library;
      this.isInitialized = true;
      (_this$library = this.library) === null || _this$library === void 0 ? void 0 : _this$library.setResponseHandler(this.handleRawResponse.bind(this));
      return this.library;
    }).catch(reason => {
      throw new TonClientError(1, "Binary library loading failed.", reason);
    });
  }

  static deinit() {
    var _this$library2;

    if (!this.isInitialized) return;
    this.isInitialized = false;
    (_this$library2 = this.library) === null || _this$library2 === void 0 ? void 0 : _this$library2.setResponseHandler();
  }

  static getLibrary() {
    var _this2 = this;

    return src_asyncToGenerator(function* () {
      if (_this2.library !== null) return _this2.library;
      if (_this2.libraryLoadingPromise !== null && !_this2.isInitialized) return _this2.libraryLoadingPromise;
      throw new TonClientError(1, "TON Client is not initialized with binary library.");
    })();
  }

  static createContext(config) {
    var _this3 = this;

    return src_asyncToGenerator(function* () {
      var library = yield _this3.getLibrary();
      var responseStr = yield library.createContext(JSON.stringify(config)).catch(reason => {
        throw new TonClientError(1, "Create context failed.", reason);
      });
      var response = JSON.parse(responseStr);
      var {
        result,
        error
      } = response;

      if (error) {
        throw new TonClientError(error.code, error.message, error.data);
      }

      return result;
    })();
  }

  static destroyContext(context) {
    var _this$library3;

    (_this$library3 = this.library) === null || _this$library3 === void 0 ? void 0 : _this$library3.destroyContext(context);
  }

  static getRequestId() {
    var newId = this.lastRequestId + 1;

    while (this.requests.has(newId)) {
      newId += 1;

      if (newId >= Number.MAX_SAFE_INTEGER) {
        newId = 1;
      }
    }

    this.lastRequestId = newId;
    return newId;
  }

  static handleRawResponse(requestId, paramsJson, responseType, finished) {
    var request = this.requests.get(requestId);

    if (!request) {
      return;
    }

    if (finished) {
      this.requests.delete(requestId);
    }

    var params = paramsJson !== "" ? JSON.parse(paramsJson) : undefined;

    switch (responseType) {
      case ResponseType.Success:
        request.resolve(params);
        break;

      case ResponseType.Error:
        request.reject(params);
        break;

      default:
        if (responseType >= ResponseType.Custom && request.responseHandler) {
          request.responseHandler(params, responseType);
        }

        break;
    }
  }

}

src_defineProperty(TonClient, "TonClientError", TonClientError);

src_defineProperty(TonClient, "requests", new Map());

src_defineProperty(TonClient, "library", null);

src_defineProperty(TonClient, "isInitialized", false);

src_defineProperty(TonClient, "libraryLoadingPromise", null);

src_defineProperty(TonClient, "lastRequestId", 0);

/* harmony default export */ const src = (TonClient);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(149);
/******/ })()

));