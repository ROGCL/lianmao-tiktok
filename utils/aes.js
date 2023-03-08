// 密钥
// import {aesKey} from '@/util/config.js'
var CryptoJS = require("crypto-js");
const decryptedFun = (ciphertext)=>{
	// 将密钥转换为16进制
	let aesKey = '362DA87FA3E89A95'
	var keyHex = CryptoJS.enc.Utf8.parse(aesKey);
	
	// 将密文转换为16进制
	var ciphertextHex = CryptoJS.enc.Hex.parse(ciphertext);
	
	// 解密
	var decrypted = CryptoJS.AES.decrypt(
	    {
	        ciphertext: ciphertextHex
	    },
	    keyHex,
	    {
	        mode: CryptoJS.mode.ECB,
	        padding: CryptoJS.pad.Pkcs7
	    }
	);
	
	// 将解密后的数据转换为utf8字符串
	var plaintext = decrypted.toString(CryptoJS.enc.Utf8);
	
	// 输出解密后的数据
	
	return JSON.parse(plaintext)
}

export {
	decryptedFun
}