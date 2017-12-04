/**
 * Created by Administrator on 2017/11/20.
 */
// 接口数据加密解密
function encryptByDES(message) {
  var key = "V29n8rqY38b7HMXBcYfu09K0";
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

function decryptByDES(ciphertext) {
  var key = "V29n8rqY38b7HMXBcYfu09K0";
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
//      ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}