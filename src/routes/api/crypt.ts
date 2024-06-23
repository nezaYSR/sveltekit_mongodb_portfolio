import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { AES_SECRET_KEY, IV_STRING } from '$env/static/private'


const keyString = AES_SECRET_KEY
const IVString= IV_STRING

const algorithm = 'aes-256-cbc'

export function encrypt(text: string): string {
    let cipher = crypto.createCipheriv(algorithm, keyString, IVString);
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
}

export function decrypt(encryptedText: string): string {
    let decipher = crypto.createDecipheriv(algorithm, keyString, IVString);
    let decrypted = decipher.update(encryptedText, "base64", "utf8");
    return decrypted + decipher.final("utf8");
}