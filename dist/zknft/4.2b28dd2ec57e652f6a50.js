(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"6yEv":function(e,t,r){"use strict";(function(e){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),f=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&n(t,e,r);return f(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.rlphash=t.ripemd160FromArray=t.ripemd160FromString=t.ripemd160=t.sha256FromArray=t.sha256FromString=t.sha256=t.keccakFromArray=t.keccakFromHexString=t.keccakFromString=t.keccak256=t.keccak=void 0;const s=r("wzGL"),u=r("mObS"),o=i(r("o8pB")),a=r("QMmI"),c=r("RD56");t.keccak=function(e,t=256){switch(c.assertIsBuffer(e),t){case 224:return s.keccak224(e);case 256:return s.keccak256(e);case 384:return s.keccak384(e);case 512:return s.keccak512(e);default:throw new Error("Invald algorithm: keccak"+t)}},t.keccak256=function(e){return t.keccak(e)},t.keccakFromString=function(r,n=256){c.assertIsString(r);const f=e.from(r,"utf8");return t.keccak(f,n)},t.keccakFromHexString=function(e,r=256){return c.assertIsHexString(e),t.keccak(a.toBuffer(e),r)},t.keccakFromArray=function(e,r=256){return c.assertIsArray(e),t.keccak(a.toBuffer(e),r)};const l=function(e){return e=a.toBuffer(e),u("sha256").update(e).digest()};t.sha256=function(e){return c.assertIsBuffer(e),l(e)},t.sha256FromString=function(e){return c.assertIsString(e),l(e)},t.sha256FromArray=function(e){return c.assertIsArray(e),l(e)};const d=function(e,t){e=a.toBuffer(e);const r=u("rmd160").update(e).digest();return!0===t?a.setLengthLeft(r,32):r};t.ripemd160=function(e,t){return c.assertIsBuffer(e),d(e,t)},t.ripemd160FromString=function(e,t){return c.assertIsString(e),d(e,t)},t.ripemd160FromArray=function(e,t){return c.assertIsArray(e),d(e,t)},t.rlphash=function(e){return t.keccak(o.encode(e))}}).call(this,r("tjlA").Buffer)},BNs3:function(e,t,r){"use strict";(function(e){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.toType=t.TypeOutput=t.bnToRlp=t.bnToHex=void 0;const f=n(r("OZ/i")),i=r("mhLr"),s=r("QMmI");var u;t.bnToHex=function(e){return"0x"+e.toString(16)},t.bnToRlp=function(t){return s.unpadBuffer(t.toArrayLike(e))},function(e){e[e.Number=0]="Number",e[e.BN=1]="BN",e[e.Buffer=2]="Buffer",e[e.PrefixedHexString=3]="PrefixedHexString"}(u=t.TypeOutput||(t.TypeOutput={})),t.toType=function(e,t){if("string"==typeof e&&!i.isHexString(e))throw new Error("A string must be provided with a 0x-prefix, given: "+e);if("number"==typeof e&&!Number.isSafeInteger(e))throw new Error("The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)");if(e=s.toBuffer(e),t===u.Buffer)return e;if(t===u.BN)return new f.default(e);if(t===u.Number){const t=new f.default(e),r=new f.default(Number.MAX_SAFE_INTEGER.toString());if(t.gt(r))throw new Error("The provided number is greater than MAX_SAFE_INTEGER (please use an alternative output type)");return t.toNumber()}return"0x"+e.toString("hex")}}).call(this,r("tjlA").Buffer)},L9Jt:function(e,t,r){"use strict";(function(e){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),f=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&n(t,e,r);return f(t,e),t},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.defineProperties=void 0;const u=s(r("9lTW")),o=i(r("mhLr")),a=i(r("o8pB")),c=r("QMmI");t.defineProperties=function(t,r,n){if(t.raw=[],t._fields=[],t.toJSON=function(e=!1){if(e){const e={};return t._fields.forEach(r=>{e[r]="0x"+t[r].toString("hex")}),e}return c.baToJSON(t.raw)},t.serialize=function(){return a.encode(t.raw)},r.forEach((r,n)=>{function f(){return t.raw[n]}function i(f){"00"!==(f=c.toBuffer(f)).toString("hex")||r.allowZero||(f=e.allocUnsafe(0)),r.allowLess&&r.length?(f=c.unpadBuffer(f),u.default(r.length>=f.length,`The field ${r.name} must not have more ${r.length} bytes`)):r.allowZero&&0===f.length||!r.length||u.default(r.length===f.length,`The field ${r.name} must have byte length of ${r.length}`),t.raw[n]=f}t._fields.push(r.name),Object.defineProperty(t,r.name,{enumerable:!0,configurable:!0,get:f,set:i}),r.default&&(t[r.name]=r.default),r.alias&&Object.defineProperty(t,r.alias,{enumerable:!1,configurable:!0,set:i,get:f})}),n)if("string"==typeof n&&(n=e.from(o.stripHexPrefix(n),"hex")),e.isBuffer(n)&&(n=a.decode(n)),Array.isArray(n)){if(n.length>t._fields.length)throw new Error("wrong number of fields in data");n.forEach((e,r)=>{t[t._fields[r]]=c.toBuffer(e)})}else{if("object"!=typeof n)throw new Error("invalid data");{const e=Object.keys(n);r.forEach(r=>{-1!==e.indexOf(r.name)&&(t[r.name]=n[r.name]),-1!==e.indexOf(r.alias)&&(t[r.alias]=n[r.alias])})}}}}).call(this,r("tjlA").Buffer)},QMmI:function(e,t,r){"use strict";(function(e){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.baToJSON=t.addHexPrefix=t.toUnsigned=t.fromSigned=t.bufferToHex=t.bufferToInt=t.toBuffer=t.unpadHexString=t.unpadArray=t.unpadBuffer=t.setLengthRight=t.setLengthLeft=t.zeros=void 0;const f=n(r("OZ/i")),i=r("mhLr"),s=r("RD56");t.zeros=function(t){return e.allocUnsafe(t).fill(0)};const u=function(e,r,n){const f=t.zeros(r);return n?e.length<r?(e.copy(f),f):e.slice(0,r):e.length<r?(e.copy(f,r-e.length),f):e.slice(-r)};t.setLengthLeft=function(e,t){return s.assertIsBuffer(e),u(e,t,!1)},t.setLengthRight=function(e,t){return s.assertIsBuffer(e),u(e,t,!0)};const o=function(e){let t=e[0];for(;e.length>0&&"0"===t.toString();)t=(e=e.slice(1))[0];return e};t.unpadBuffer=function(e){return s.assertIsBuffer(e),o(e)},t.unpadArray=function(e){return s.assertIsArray(e),o(e)},t.unpadHexString=function(e){return s.assertIsHexString(e),e=i.stripHexPrefix(e),o(e)},t.toBuffer=function(t){if(null==t)return e.allocUnsafe(0);if(e.isBuffer(t))return e.from(t);if(Array.isArray(t)||t instanceof Uint8Array)return e.from(t);if("string"==typeof t){if(!i.isHexString(t))throw new Error("Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: "+t);return e.from(i.padToEven(i.stripHexPrefix(t)),"hex")}if("number"==typeof t)return i.intToBuffer(t);if(f.default.isBN(t))return t.toArrayLike(e);if(t.toArray)return e.from(t.toArray());if(t.toBuffer)return e.from(t.toBuffer());throw new Error("invalid type")},t.bufferToInt=function(e){return new f.default(t.toBuffer(e)).toNumber()},t.bufferToHex=function(e){return"0x"+(e=t.toBuffer(e)).toString("hex")},t.fromSigned=function(e){return new f.default(e).fromTwos(256)},t.toUnsigned=function(t){return e.from(t.toTwos(256).toArray())},t.addHexPrefix=function(e){return"string"!=typeof e||i.isHexPrefixed(e)?e:"0x"+e},t.baToJSON=function(r){if(e.isBuffer(r))return"0x"+r.toString("hex");if(r instanceof Array){const e=[];for(let n=0;n<r.length;n++)e.push(t.baToJSON(r[n]));return e}}}).call(this,r("tjlA").Buffer)},RD56:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.assertIsString=t.assertIsArray=t.assertIsBuffer=t.assertIsHexString=void 0;const n=r("mhLr");t.assertIsHexString=function(e){if(!n.isHexString(e))throw new Error("This method only supports 0x-prefixed hex strings but input was: "+e)},t.assertIsBuffer=function(t){if(!e.isBuffer(t))throw new Error("This method only supports Buffer but input was: "+t)},t.assertIsArray=function(e){if(!Array.isArray(e))throw new Error("This method only supports number arrays but input was: "+e)},t.assertIsString=function(e){if("string"!=typeof e)throw new Error("This method only supports strings but input was: "+e)}}).call(this,r("tjlA").Buffer)},cAFe:function(e,t,r){"use strict";(function(e){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),f=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&n(t,e,r);return f(t,e),t},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.isZeroAddress=t.zeroAddress=t.importPublic=t.privateToAddress=t.privateToPublic=t.publicToAddress=t.pubToAddress=t.isValidPublic=t.isValidPrivate=t.generateAddress2=t.generateAddress=t.isValidChecksumAddress=t.toChecksumAddress=t.isValidAddress=t.Account=void 0;const u=s(r("9lTW")),o=s(r("OZ/i")),a=i(r("o8pB")),c=r("IhPl"),l=r("mhLr"),d=r("ypah"),h=r("QMmI"),p=r("6yEv"),g=r("RD56"),b=r("BNs3");class m{constructor(e=new o.default(0),t=new o.default(0),r=d.KECCAK256_RLP,n=d.KECCAK256_NULL){this.nonce=e,this.balance=t,this.stateRoot=r,this.codeHash=n,this._validate()}static fromAccountData(e){const{nonce:t,balance:r,stateRoot:n,codeHash:f}=e;return new m(t?new o.default(h.toBuffer(t)):void 0,r?new o.default(h.toBuffer(r)):void 0,n?h.toBuffer(n):void 0,f?h.toBuffer(f):void 0)}static fromRlpSerializedAccount(e){const t=a.decode(e);if(!Array.isArray(t))throw new Error("Invalid serialized account input. Must be array");return this.fromValuesArray(t)}static fromValuesArray(e){const[t,r,n,f]=e;return new m(new o.default(t),new o.default(r),n,f)}_validate(){if(this.nonce.lt(new o.default(0)))throw new Error("nonce must be greater than zero");if(this.balance.lt(new o.default(0)))throw new Error("balance must be greater than zero");if(32!==this.stateRoot.length)throw new Error("stateRoot must have a length of 32");if(32!==this.codeHash.length)throw new Error("codeHash must have a length of 32")}raw(){return[b.bnToRlp(this.nonce),b.bnToRlp(this.balance),this.stateRoot,this.codeHash]}serialize(){return a.encode(this.raw())}isContract(){return!this.codeHash.equals(d.KECCAK256_NULL)}isEmpty(){return this.balance.isZero()&&this.nonce.isZero()&&this.codeHash.equals(d.KECCAK256_NULL)}}t.Account=m,t.isValidAddress=function(e){try{g.assertIsString(e)}catch(t){return!1}return/^0x[0-9a-fA-F]{40}$/.test(e)},t.toChecksumAddress=function(e,t){g.assertIsHexString(e);const r=l.stripHexPrefix(e).toLowerCase();let n="";t&&(n=b.toType(t,b.TypeOutput.BN).toString()+"0x");const f=p.keccakFromString(n+r).toString("hex");let i="0x";for(let s=0;s<r.length;s++)parseInt(f[s],16)>=8?i+=r[s].toUpperCase():i+=r[s];return i},t.isValidChecksumAddress=function(e,r){return t.isValidAddress(e)&&t.toChecksumAddress(e,r)===e},t.generateAddress=function(t,r){g.assertIsBuffer(t),g.assertIsBuffer(r);const n=new o.default(r);return n.isZero()?p.rlphash([t,null]).slice(-20):p.rlphash([t,e.from(n.toArray())]).slice(-20)},t.generateAddress2=function(t,r,n){return g.assertIsBuffer(t),g.assertIsBuffer(r),g.assertIsBuffer(n),u.default(20===t.length),u.default(32===r.length),p.keccak256(e.concat([e.from("ff","hex"),t,r,p.keccak256(n)])).slice(-20)},t.isValidPrivate=function(e){return c.privateKeyVerify(e)},t.isValidPublic=function(t,r=!1){return g.assertIsBuffer(t),64===t.length?c.publicKeyVerify(e.concat([e.from([4]),t])):!!r&&c.publicKeyVerify(t)},t.pubToAddress=function(t,r=!1){return g.assertIsBuffer(t),r&&64!==t.length&&(t=e.from(c.publicKeyConvert(t,!1).slice(1))),u.default(64===t.length),p.keccak(t).slice(-20)},t.publicToAddress=t.pubToAddress,t.privateToPublic=function(t){return g.assertIsBuffer(t),e.from(c.publicKeyCreate(t,!1)).slice(1)},t.privateToAddress=function(e){return t.publicToAddress(t.privateToPublic(e))},t.importPublic=function(t){return g.assertIsBuffer(t),64!==t.length&&(t=e.from(c.publicKeyConvert(t,!1).slice(1))),t},t.zeroAddress=function(){const e=h.zeros(20);return h.bufferToHex(e)},t.isZeroAddress=function(e){try{g.assertIsString(e)}catch(r){return!1}return t.zeroAddress()===e}}).call(this,r("tjlA").Buffer)},g4Pk:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),f=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&n(t,e,r);return f(t,e),t},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.rlp=t.BN=void 0;const u=s(r("OZ/i"));t.BN=u.default;const o=i(r("o8pB"));t.rlp=o},sboa:function(e,t,r){"use strict";(function(e){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.hashPersonalMessage=t.isValidSignature=t.fromRpcSig=t.toRpcSig=t.ecrecover=t.ecsign=void 0;const f=r("IhPl"),i=n(r("OZ/i")),s=r("QMmI"),u=r("6yEv"),o=r("RD56"),a=r("BNs3");function c(e,t){const r=a.toType(e,a.TypeOutput.BN);if(!t)return r.subn(27);const n=a.toType(t,a.TypeOutput.BN);return r.sub(n.muln(2).addn(35))}function l(e){const t=new i.default(e);return t.eqn(0)||t.eqn(1)}t.ecsign=function(t,r,n){const{signature:i,recid:s}=f.ecdsaSign(t,r),u=e.from(i.slice(0,32)),o=e.from(i.slice(32,64));if(!n||"number"==typeof n){if(n&&!Number.isSafeInteger(n))throw new Error("The provided number is greater than MAX_SAFE_INTEGER (please use an alternative input type)");return{r:u,s:o,v:n?s+(2*n+35):s+27}}return{r:u,s:o,v:a.toType(n,a.TypeOutput.BN).muln(2).addn(35).addn(s).toArrayLike(e)}},t.ecrecover=function(t,r,n,i,u){const o=e.concat([s.setLengthLeft(n,32),s.setLengthLeft(i,32)],64),a=c(r,u);if(!l(a))throw new Error("Invalid signature v value");const d=f.ecdsaRecover(o,a.toNumber(),t);return e.from(f.publicKeyConvert(d,!1).slice(1))},t.toRpcSig=function(t,r,n,f){if(!l(c(t,f)))throw new Error("Invalid signature v value");return s.bufferToHex(e.concat([s.setLengthLeft(r,32),s.setLengthLeft(n,32),s.toBuffer(t)]))},t.fromRpcSig=function(e){const t=s.toBuffer(e);if(t.length<65)throw new Error("Invalid signature length");let r=s.bufferToInt(t.slice(64));return r<27&&(r+=27),{v:r,r:t.slice(0,32),s:t.slice(32,64)}},t.isValidSignature=function(e,t,r,n=!0,f){const s=new i.default("7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0",16),u=new i.default("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141",16);if(32!==t.length||32!==r.length)return!1;if(!l(c(e,f)))return!1;const o=new i.default(t),a=new i.default(r);return!(o.isZero()||o.gt(u)||a.isZero()||a.gt(u)||n&&1===a.cmp(s))},t.hashPersonalMessage=function(t){o.assertIsBuffer(t);const r=e.from("\x19Ethereum Signed Message:\n"+t.length.toString(),"utf-8");return u.keccak(e.concat([r,t]))}}).call(this,r("tjlA").Buffer)},tnHP:function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),f=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||t.hasOwnProperty(r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),f(r("ypah"),t),f(r("cAFe"),t),f(r("v0P2"),t),f(r("6yEv"),t),f(r("sboa"),t),f(r("QMmI"),t),f(r("L9Jt"),t),f(r("g4Pk"),t),f(r("BNs3"),t),f(r("mhLr"),t)},v0P2:function(e,t,r){"use strict";(function(e){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Address=void 0;const f=n(r("9lTW")),i=n(r("OZ/i")),s=r("QMmI"),u=r("cAFe");class o{constructor(e){f.default(20===e.length,"Invalid address length"),this.buf=e}static zero(){return new o(s.zeros(20))}static fromString(e){return f.default(u.isValidAddress(e),"Invalid address"),new o(s.toBuffer(e))}static fromPublicKey(t){f.default(e.isBuffer(t),"Public key should be Buffer");const r=u.pubToAddress(t);return new o(r)}static fromPrivateKey(t){f.default(e.isBuffer(t),"Private key should be Buffer");const r=u.privateToAddress(t);return new o(r)}static generate(t,r){return f.default(i.default.isBN(r)),new o(u.generateAddress(t.buf,r.toArrayLike(e)))}static generate2(t,r,n){return f.default(e.isBuffer(r)),f.default(e.isBuffer(n)),new o(u.generateAddress2(t.buf,r,n))}equals(e){return this.buf.equals(e.buf)}isZero(){return this.equals(o.zero())}isPrecompileOrSystemAddress(){const e=new i.default(this.buf),t=new i.default(0),r=new i.default("ffff","hex");return e.gte(t)&&e.lte(r)}toString(){return"0x"+this.buf.toString("hex")}toBuffer(){return e.from(this.buf)}}t.Address=o}).call(this,r("tjlA").Buffer)},ypah:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.KECCAK256_RLP=t.KECCAK256_RLP_S=t.KECCAK256_RLP_ARRAY=t.KECCAK256_RLP_ARRAY_S=t.KECCAK256_NULL=t.KECCAK256_NULL_S=t.TWO_POW256=t.MAX_INTEGER=void 0;const f=r("tjlA").Buffer,i=n(r("OZ/i"));t.MAX_INTEGER=new i.default("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",16),t.TWO_POW256=new i.default("10000000000000000000000000000000000000000000000000000000000000000",16),t.KECCAK256_NULL_S="c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",t.KECCAK256_NULL=f.from(t.KECCAK256_NULL_S,"hex"),t.KECCAK256_RLP_ARRAY_S="1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",t.KECCAK256_RLP_ARRAY=f.from(t.KECCAK256_RLP_ARRAY_S,"hex"),t.KECCAK256_RLP_S="56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",t.KECCAK256_RLP=f.from(t.KECCAK256_RLP_S,"hex")}}]);