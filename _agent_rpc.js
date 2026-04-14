📦
240382 /agent/rpc.js
✄
var xs=Object.defineProperty;var Ns=(t,e)=>{for(var n in e)xs(t,n,{get:e[n],enumerable:!0})};var Ie=[],be=[],Wt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(let t=0,e=Wt.length;t<e;++t)Ie[t]=Wt[t],be[Wt.charCodeAt(t)]=t;be[45]=62;be[95]=63;function ks(t){let e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");let n=t.indexOf("=");n===-1&&(n=e);let r=n===e?0:4-n%4;return[n,r]}function Ms(t,e,n){return(e+n)*3/4-n}function jr(t){let e=ks(t),n=e[0],r=e[1],o=new Uint8Array(Ms(t,n,r)),s=0,i=r>0?n-4:n,l;for(l=0;l<i;l+=4){let a=be[t.charCodeAt(l)]<<18|be[t.charCodeAt(l+1)]<<12|be[t.charCodeAt(l+2)]<<6|be[t.charCodeAt(l+3)];o[s++]=a>>16&255,o[s++]=a>>8&255,o[s++]=a&255}if(r===2){let a=be[t.charCodeAt(l)]<<2|be[t.charCodeAt(l+1)]>>4;o[s++]=a&255}if(r===1){let a=be[t.charCodeAt(l)]<<10|be[t.charCodeAt(l+1)]<<4|be[t.charCodeAt(l+2)]>>2;o[s++]=a>>8&255,o[s++]=a&255}return o}function js(t){return Ie[t>>18&63]+Ie[t>>12&63]+Ie[t>>6&63]+Ie[t&63]}function Os(t,e,n){let r=[];for(let o=e;o<n;o+=3){let s=(t[o]<<16&16711680)+(t[o+1]<<8&65280)+(t[o+2]&255);r.push(js(s))}return r.join("")}function Kt(t){let e=t.length,n=e%3,r=[],o=16383;for(let s=0,i=e-n;s<i;s+=o)r.push(Os(t,s,s+o>i?i:s+o));if(n===1){let s=t[e-1];r.push(Ie[s>>2]+Ie[s<<4&63]+"==")}else if(n===2){let s=(t[e-2]<<8)+t[e-1];r.push(Ie[s>>10]+Ie[s>>4&63]+Ie[s<<2&63]+"=")}return r.join("")}function nt(t,e,n,r,o){let s,i,l=o*8-r-1,a=(1<<l)-1,c=a>>1,d=-7,p=n?o-1:0,f=n?-1:1,u=t[e+p];for(p+=f,s=u&(1<<-d)-1,u>>=-d,d+=l;d>0;)s=s*256+t[e+p],p+=f,d-=8;for(i=s&(1<<-d)-1,s>>=-d,d+=r;d>0;)i=i*256+t[e+p],p+=f,d-=8;if(s===0)s=1-c;else{if(s===a)return i?NaN:(u?-1:1)*(1/0);i=i+Math.pow(2,r),s=s-c}return(u?-1:1)*i*Math.pow(2,s-r)}function Qt(t,e,n,r,o,s){let i,l,a,c=s*8-o-1,d=(1<<c)-1,p=d>>1,f=o===23?Math.pow(2,-24)-Math.pow(2,-77):0,u=r?0:s-1,_=r?1:-1,h=e<0||e===0&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(l=isNaN(e)?1:0,i=d):(i=Math.floor(Math.log(e)/Math.LN2),e*(a=Math.pow(2,-i))<1&&(i--,a*=2),i+p>=1?e+=f/a:e+=f*Math.pow(2,1-p),e*a>=2&&(i++,a/=2),i+p>=d?(l=0,i=d):i+p>=1?(l=(e*a-1)*Math.pow(2,o),i=i+p):(l=e*Math.pow(2,p-1)*Math.pow(2,o),i=0));o>=8;)t[n+u]=l&255,u+=_,l/=256,o-=8;for(i=i<<o|l,c+=o;c>0;)t[n+u]=i&255,u+=_,i/=256,c-=8;t[n+u-_]|=h*128}var Fs={INSPECT_MAX_BYTES:50},Xt=2147483647;m.TYPED_ARRAY_SUPPORT=!0;Object.defineProperty(m.prototype,"parent",{enumerable:!0,get:function(){if(m.isBuffer(this))return this.buffer}});Object.defineProperty(m.prototype,"offset",{enumerable:!0,get:function(){if(m.isBuffer(this))return this.byteOffset}});function Le(t){if(t>Xt)throw new RangeError('The value "'+t+'" is invalid for option "size"');let e=new Uint8Array(t);return Object.setPrototypeOf(e,m.prototype),e}function m(t,e,n){if(typeof t=="number"){if(typeof e=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return nn(t)}return Fr(t,e,n)}m.poolSize=8192;function Fr(t,e,n){if(typeof t=="string")return Us(t,e);if(ArrayBuffer.isView(t))return Bs(t);if(t==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(t instanceof ArrayBuffer||t&&t.buffer instanceof ArrayBuffer||t instanceof SharedArrayBuffer||t&&t.buffer instanceof SharedArrayBuffer)return en(t,e,n);if(typeof t=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');let r=t.valueOf&&t.valueOf();if(r!=null&&r!==t)return m.from(r,e,n);let o=zs(t);if(o)return o;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof t[Symbol.toPrimitive]=="function")return m.from(t[Symbol.toPrimitive]("string"),e,n);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}m.from=function(t,e,n){return Fr(t,e,n)};Object.setPrototypeOf(m.prototype,Uint8Array.prototype);Object.setPrototypeOf(m,Uint8Array);function Dr(t){if(typeof t!="number")throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function Ds(t,e,n){return Dr(t),t<=0?Le(t):e!==void 0?typeof n=="string"?Le(t).fill(e,n):Le(t).fill(e):Le(t)}m.alloc=function(t,e,n){return Ds(t,e,n)};function nn(t){return Dr(t),Le(t<0?0:rn(t)|0)}m.allocUnsafe=function(t){return nn(t)};m.allocUnsafeSlow=function(t){return nn(t)};function Us(t,e){if((typeof e!="string"||e==="")&&(e="utf8"),!m.isEncoding(e))throw new TypeError("Unknown encoding: "+e);let n=Ur(t,e)|0,r=Le(n),o=r.write(t,e);return o!==n&&(r=r.slice(0,o)),r}function Yt(t){let e=t.length<0?0:rn(t.length)|0,n=Le(e);for(let r=0;r<e;r+=1)n[r]=t[r]&255;return n}function Bs(t){if(t instanceof Uint8Array){let e=new Uint8Array(t);return en(e.buffer,e.byteOffset,e.byteLength)}return Yt(t)}function en(t,e,n){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(n||0))throw new RangeError('"length" is outside of buffer bounds');let r;return e===void 0&&n===void 0?r=new Uint8Array(t):n===void 0?r=new Uint8Array(t,e):r=new Uint8Array(t,e,n),Object.setPrototypeOf(r,m.prototype),r}function zs(t){if(m.isBuffer(t)){let e=rn(t.length)|0,n=Le(e);return n.length===0||t.copy(n,0,0,e),n}if(t.length!==void 0)return typeof t.length!="number"||Number.isNaN(t.length)?Le(0):Yt(t);if(t.type==="Buffer"&&Array.isArray(t.data))return Yt(t.data)}function rn(t){if(t>=Xt)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+Xt.toString(16)+" bytes");return t|0}m.isBuffer=function(e){return e!=null&&e._isBuffer===!0&&e!==m.prototype};m.compare=function(e,n){if(e instanceof Uint8Array&&(e=m.from(e,e.offset,e.byteLength)),n instanceof Uint8Array&&(n=m.from(n,n.offset,n.byteLength)),!m.isBuffer(e)||!m.isBuffer(n))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===n)return 0;let r=e.length,o=n.length;for(let s=0,i=Math.min(r,o);s<i;++s)if(e[s]!==n[s]){r=e[s],o=n[s];break}return r<o?-1:o<r?1:0};m.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}};m.concat=function(e,n){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(e.length===0)return m.alloc(0);let r;if(n===void 0)for(n=0,r=0;r<e.length;++r)n+=e[r].length;let o=m.allocUnsafe(n),s=0;for(r=0;r<e.length;++r){let i=e[r];if(i instanceof Uint8Array)s+i.length>o.length?(m.isBuffer(i)||(i=m.from(i.buffer,i.byteOffset,i.byteLength)),i.copy(o,s)):Uint8Array.prototype.set.call(o,i,s);else if(m.isBuffer(i))i.copy(o,s);else throw new TypeError('"list" argument must be an Array of Buffers');s+=i.length}return o};function Ur(t,e){if(m.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||t instanceof ArrayBuffer)return t.byteLength;if(typeof t!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);let n=t.length,r=arguments.length>2&&arguments[2]===!0;if(!r&&n===0)return 0;let o=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":return tn(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return n*2;case"hex":return n>>>1;case"base64":return qr(t).length;default:if(o)return r?-1:tn(t).length;e=(""+e).toLowerCase(),o=!0}}m.byteLength=Ur;function Js(t,e,n){let r=!1;if((e===void 0||e<0)&&(e=0),e>this.length||((n===void 0||n>this.length)&&(n=this.length),n<=0)||(n>>>=0,e>>>=0,n<=e))return"";for(t||(t="utf8");;)switch(t){case"hex":return Xs(this,e,n);case"utf8":case"utf-8":return zr(this,e,n);case"ascii":return Ks(this,e,n);case"latin1":case"binary":return Qs(this,e,n);case"base64":return qs(this,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Ys(this,e,n);default:if(r)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),r=!0}}m.prototype._isBuffer=!0;function Fe(t,e,n){let r=t[e];t[e]=t[n],t[n]=r}m.prototype.swap16=function(){let e=this.length;if(e%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let n=0;n<e;n+=2)Fe(this,n,n+1);return this};m.prototype.swap32=function(){let e=this.length;if(e%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let n=0;n<e;n+=4)Fe(this,n,n+3),Fe(this,n+1,n+2);return this};m.prototype.swap64=function(){let e=this.length;if(e%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let n=0;n<e;n+=8)Fe(this,n,n+7),Fe(this,n+1,n+6),Fe(this,n+2,n+5),Fe(this,n+3,n+4);return this};m.prototype.toString=function(){let e=this.length;return e===0?"":arguments.length===0?zr(this,0,e):Js.apply(this,arguments)};m.prototype.toLocaleString=m.prototype.toString;m.prototype.equals=function(e){if(!m.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e?!0:m.compare(this,e)===0};m.prototype.inspect=function(){let e="",n=Fs.INSPECT_MAX_BYTES;return e=this.toString("hex",0,n).replace(/(.{2})/g,"$1 ").trim(),this.length>n&&(e+=" ... "),"<Buffer "+e+">"};m.prototype[Symbol.for("nodejs.util.inspect.custom")]=m.prototype.inspect;m.prototype.compare=function(e,n,r,o,s){if(e instanceof Uint8Array&&(e=m.from(e,e.offset,e.byteLength)),!m.isBuffer(e))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(n===void 0&&(n=0),r===void 0&&(r=e?e.length:0),o===void 0&&(o=0),s===void 0&&(s=this.length),n<0||r>e.length||o<0||s>this.length)throw new RangeError("out of range index");if(o>=s&&n>=r)return 0;if(o>=s)return-1;if(n>=r)return 1;if(n>>>=0,r>>>=0,o>>>=0,s>>>=0,this===e)return 0;let i=s-o,l=r-n,a=Math.min(i,l),c=this.slice(o,s),d=e.slice(n,r);for(let p=0;p<a;++p)if(c[p]!==d[p]){i=c[p],l=d[p];break}return i<l?-1:l<i?1:0};function Br(t,e,n,r,o){if(t.length===0)return-1;if(typeof n=="string"?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,Number.isNaN(n)&&(n=o?0:t.length-1),n<0&&(n=t.length+n),n>=t.length){if(o)return-1;n=t.length-1}else if(n<0)if(o)n=0;else return-1;if(typeof e=="string"&&(e=m.from(e,r)),m.isBuffer(e))return e.length===0?-1:Or(t,e,n,r,o);if(typeof e=="number")return e=e&255,typeof Uint8Array.prototype.indexOf=="function"?o?Uint8Array.prototype.indexOf.call(t,e,n):Uint8Array.prototype.lastIndexOf.call(t,e,n):Or(t,[e],n,r,o);throw new TypeError("val must be string, number or Buffer")}function Or(t,e,n,r,o){let s=1,i=t.length,l=e.length;if(r!==void 0&&(r=String(r).toLowerCase(),r==="ucs2"||r==="ucs-2"||r==="utf16le"||r==="utf-16le")){if(t.length<2||e.length<2)return-1;s=2,i/=2,l/=2,n/=2}function a(d,p){return s===1?d[p]:d.readUInt16BE(p*s)}let c;if(o){let d=-1;for(c=n;c<i;c++)if(a(t,c)===a(e,d===-1?0:c-d)){if(d===-1&&(d=c),c-d+1===l)return d*s}else d!==-1&&(c-=c-d),d=-1}else for(n+l>i&&(n=i-l),c=n;c>=0;c--){let d=!0;for(let p=0;p<l;p++)if(a(t,c+p)!==a(e,p)){d=!1;break}if(d)return c}return-1}m.prototype.includes=function(e,n,r){return this.indexOf(e,n,r)!==-1};m.prototype.indexOf=function(e,n,r){return Br(this,e,n,r,!0)};m.prototype.lastIndexOf=function(e,n,r){return Br(this,e,n,r,!1)};function Vs(t,e,n,r){n=Number(n)||0;let o=t.length-n;r?(r=Number(r),r>o&&(r=o)):r=o;let s=e.length;r>s/2&&(r=s/2);let i;for(i=0;i<r;++i){let l=parseInt(e.substr(i*2,2),16);if(Number.isNaN(l))return i;t[n+i]=l}return i}function Gs(t,e,n,r){return Et(tn(e,t.length-n),t,n,r)}function $s(t,e,n,r){return Et(ri(e),t,n,r)}function Hs(t,e,n,r){return Et(qr(e),t,n,r)}function Zs(t,e,n,r){return Et(oi(e,t.length-n),t,n,r)}m.prototype.write=function(e,n,r,o){if(n===void 0)o="utf8",r=this.length,n=0;else if(r===void 0&&typeof n=="string")o=n,r=this.length,n=0;else if(isFinite(n))n=n>>>0,isFinite(r)?(r=r>>>0,o===void 0&&(o="utf8")):(o=r,r=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let s=this.length-n;if((r===void 0||r>s)&&(r=s),e.length>0&&(r<0||n<0)||n>this.length)throw new RangeError("Attempt to write outside buffer bounds");o||(o="utf8");let i=!1;for(;;)switch(o){case"hex":return Vs(this,e,n,r);case"utf8":case"utf-8":return Gs(this,e,n,r);case"ascii":case"latin1":case"binary":return $s(this,e,n,r);case"base64":return Hs(this,e,n,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Zs(this,e,n,r);default:if(i)throw new TypeError("Unknown encoding: "+o);o=(""+o).toLowerCase(),i=!0}};m.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function qs(t,e,n){return e===0&&n===t.length?Kt(t):Kt(t.slice(e,n))}function zr(t,e,n){n=Math.min(t.length,n);let r=[],o=e;for(;o<n;){let s=t[o],i=null,l=s>239?4:s>223?3:s>191?2:1;if(o+l<=n){let a,c,d,p;switch(l){case 1:s<128&&(i=s);break;case 2:a=t[o+1],(a&192)===128&&(p=(s&31)<<6|a&63,p>127&&(i=p));break;case 3:a=t[o+1],c=t[o+2],(a&192)===128&&(c&192)===128&&(p=(s&15)<<12|(a&63)<<6|c&63,p>2047&&(p<55296||p>57343)&&(i=p));break;case 4:a=t[o+1],c=t[o+2],d=t[o+3],(a&192)===128&&(c&192)===128&&(d&192)===128&&(p=(s&15)<<18|(a&63)<<12|(c&63)<<6|d&63,p>65535&&p<1114112&&(i=p))}}i===null?(i=65533,l=1):i>65535&&(i-=65536,r.push(i>>>10&1023|55296),i=56320|i&1023),r.push(i),o+=l}return Ws(r)}var Rr=4096;function Ws(t){let e=t.length;if(e<=Rr)return String.fromCharCode.apply(String,t);let n="",r=0;for(;r<e;)n+=String.fromCharCode.apply(String,t.slice(r,r+=Rr));return n}function Ks(t,e,n){let r="";n=Math.min(t.length,n);for(let o=e;o<n;++o)r+=String.fromCharCode(t[o]&127);return r}function Qs(t,e,n){let r="";n=Math.min(t.length,n);for(let o=e;o<n;++o)r+=String.fromCharCode(t[o]);return r}function Xs(t,e,n){let r=t.length;(!e||e<0)&&(e=0),(!n||n<0||n>r)&&(n=r);let o="";for(let s=e;s<n;++s)o+=si[t[s]];return o}function Ys(t,e,n){let r=t.slice(e,n),o="";for(let s=0;s<r.length-1;s+=2)o+=String.fromCharCode(r[s]+r[s+1]*256);return o}m.prototype.slice=function(e,n){let r=this.length;e=~~e,n=n===void 0?r:~~n,e<0?(e+=r,e<0&&(e=0)):e>r&&(e=r),n<0?(n+=r,n<0&&(n=0)):n>r&&(n=r),n<e&&(n=e);let o=this.subarray(e,n);return Object.setPrototypeOf(o,m.prototype),o};function ae(t,e,n){if(t%1!==0||t<0)throw new RangeError("offset is not uint");if(t+e>n)throw new RangeError("Trying to access beyond buffer length")}m.prototype.readUintLE=m.prototype.readUIntLE=function(e,n,r){e=e>>>0,n=n>>>0,r||ae(e,n,this.length);let o=this[e],s=1,i=0;for(;++i<n&&(s*=256);)o+=this[e+i]*s;return o};m.prototype.readUintBE=m.prototype.readUIntBE=function(e,n,r){e=e>>>0,n=n>>>0,r||ae(e,n,this.length);let o=this[e+--n],s=1;for(;n>0&&(s*=256);)o+=this[e+--n]*s;return o};m.prototype.readUint8=m.prototype.readUInt8=function(e,n){return e=e>>>0,n||ae(e,1,this.length),this[e]};m.prototype.readUint16LE=m.prototype.readUInt16LE=function(e,n){return e=e>>>0,n||ae(e,2,this.length),this[e]|this[e+1]<<8};m.prototype.readUint16BE=m.prototype.readUInt16BE=function(e,n){return e=e>>>0,n||ae(e,2,this.length),this[e]<<8|this[e+1]};m.prototype.readUint32LE=m.prototype.readUInt32LE=function(e,n){return e=e>>>0,n||ae(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+this[e+3]*16777216};m.prototype.readUint32BE=m.prototype.readUInt32BE=function(e,n){return e=e>>>0,n||ae(e,4,this.length),this[e]*16777216+(this[e+1]<<16|this[e+2]<<8|this[e+3])};m.prototype.readBigUInt64LE=function(e){e=e>>>0,He(e,"offset");let n=this[e],r=this[e+7];(n===void 0||r===void 0)&&rt(e,this.length-8);let o=n+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24,s=this[++e]+this[++e]*2**8+this[++e]*2**16+r*2**24;return BigInt(o)+(BigInt(s)<<BigInt(32))};m.prototype.readBigUInt64BE=function(e){e=e>>>0,He(e,"offset");let n=this[e],r=this[e+7];(n===void 0||r===void 0)&&rt(e,this.length-8);let o=n*2**24+this[++e]*2**16+this[++e]*2**8+this[++e],s=this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+r;return(BigInt(o)<<BigInt(32))+BigInt(s)};m.prototype.readIntLE=function(e,n,r){e=e>>>0,n=n>>>0,r||ae(e,n,this.length);let o=this[e],s=1,i=0;for(;++i<n&&(s*=256);)o+=this[e+i]*s;return s*=128,o>=s&&(o-=Math.pow(2,8*n)),o};m.prototype.readIntBE=function(e,n,r){e=e>>>0,n=n>>>0,r||ae(e,n,this.length);let o=n,s=1,i=this[e+--o];for(;o>0&&(s*=256);)i+=this[e+--o]*s;return s*=128,i>=s&&(i-=Math.pow(2,8*n)),i};m.prototype.readInt8=function(e,n){return e=e>>>0,n||ae(e,1,this.length),this[e]&128?(255-this[e]+1)*-1:this[e]};m.prototype.readInt16LE=function(e,n){e=e>>>0,n||ae(e,2,this.length);let r=this[e]|this[e+1]<<8;return r&32768?r|4294901760:r};m.prototype.readInt16BE=function(e,n){e=e>>>0,n||ae(e,2,this.length);let r=this[e+1]|this[e]<<8;return r&32768?r|4294901760:r};m.prototype.readInt32LE=function(e,n){return e=e>>>0,n||ae(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24};m.prototype.readInt32BE=function(e,n){return e=e>>>0,n||ae(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]};m.prototype.readBigInt64LE=function(e){e=e>>>0,He(e,"offset");let n=this[e],r=this[e+7];(n===void 0||r===void 0)&&rt(e,this.length-8);let o=this[e+4]+this[e+5]*2**8+this[e+6]*2**16+(r<<24);return(BigInt(o)<<BigInt(32))+BigInt(n+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24)};m.prototype.readBigInt64BE=function(e){e=e>>>0,He(e,"offset");let n=this[e],r=this[e+7];(n===void 0||r===void 0)&&rt(e,this.length-8);let o=(n<<24)+this[++e]*2**16+this[++e]*2**8+this[++e];return(BigInt(o)<<BigInt(32))+BigInt(this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+r)};m.prototype.readFloatLE=function(e,n){return e=e>>>0,n||ae(e,4,this.length),nt(this,e,!0,23,4)};m.prototype.readFloatBE=function(e,n){return e=e>>>0,n||ae(e,4,this.length),nt(this,e,!1,23,4)};m.prototype.readDoubleLE=function(e,n){return e=e>>>0,n||ae(e,8,this.length),nt(this,e,!0,52,8)};m.prototype.readDoubleBE=function(e,n){return e=e>>>0,n||ae(e,8,this.length),nt(this,e,!1,52,8)};function fe(t,e,n,r,o,s){if(!m.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>o||e<s)throw new RangeError('"value" argument is out of bounds');if(n+r>t.length)throw new RangeError("Index out of range")}m.prototype.writeUintLE=m.prototype.writeUIntLE=function(e,n,r,o){if(e=+e,n=n>>>0,r=r>>>0,!o){let l=Math.pow(2,8*r)-1;fe(this,e,n,r,l,0)}let s=1,i=0;for(this[n]=e&255;++i<r&&(s*=256);)this[n+i]=e/s&255;return n+r};m.prototype.writeUintBE=m.prototype.writeUIntBE=function(e,n,r,o){if(e=+e,n=n>>>0,r=r>>>0,!o){let l=Math.pow(2,8*r)-1;fe(this,e,n,r,l,0)}let s=r-1,i=1;for(this[n+s]=e&255;--s>=0&&(i*=256);)this[n+s]=e/i&255;return n+r};m.prototype.writeUint8=m.prototype.writeUInt8=function(e,n,r){return e=+e,n=n>>>0,r||fe(this,e,n,1,255,0),this[n]=e&255,n+1};m.prototype.writeUint16LE=m.prototype.writeUInt16LE=function(e,n,r){return e=+e,n=n>>>0,r||fe(this,e,n,2,65535,0),this[n]=e&255,this[n+1]=e>>>8,n+2};m.prototype.writeUint16BE=m.prototype.writeUInt16BE=function(e,n,r){return e=+e,n=n>>>0,r||fe(this,e,n,2,65535,0),this[n]=e>>>8,this[n+1]=e&255,n+2};m.prototype.writeUint32LE=m.prototype.writeUInt32LE=function(e,n,r){return e=+e,n=n>>>0,r||fe(this,e,n,4,4294967295,0),this[n+3]=e>>>24,this[n+2]=e>>>16,this[n+1]=e>>>8,this[n]=e&255,n+4};m.prototype.writeUint32BE=m.prototype.writeUInt32BE=function(e,n,r){return e=+e,n=n>>>0,r||fe(this,e,n,4,4294967295,0),this[n]=e>>>24,this[n+1]=e>>>16,this[n+2]=e>>>8,this[n+3]=e&255,n+4};function Jr(t,e,n,r,o){Zr(e,r,o,t,n,7);let s=Number(e&BigInt(4294967295));t[n++]=s,s=s>>8,t[n++]=s,s=s>>8,t[n++]=s,s=s>>8,t[n++]=s;let i=Number(e>>BigInt(32)&BigInt(4294967295));return t[n++]=i,i=i>>8,t[n++]=i,i=i>>8,t[n++]=i,i=i>>8,t[n++]=i,n}function Vr(t,e,n,r,o){Zr(e,r,o,t,n,7);let s=Number(e&BigInt(4294967295));t[n+7]=s,s=s>>8,t[n+6]=s,s=s>>8,t[n+5]=s,s=s>>8,t[n+4]=s;let i=Number(e>>BigInt(32)&BigInt(4294967295));return t[n+3]=i,i=i>>8,t[n+2]=i,i=i>>8,t[n+1]=i,i=i>>8,t[n]=i,n+8}m.prototype.writeBigUInt64LE=function(e,n=0){return Jr(this,e,n,BigInt(0),BigInt("0xffffffffffffffff"))};m.prototype.writeBigUInt64BE=function(e,n=0){return Vr(this,e,n,BigInt(0),BigInt("0xffffffffffffffff"))};m.prototype.writeIntLE=function(e,n,r,o){if(e=+e,n=n>>>0,!o){let a=Math.pow(2,8*r-1);fe(this,e,n,r,a-1,-a)}let s=0,i=1,l=0;for(this[n]=e&255;++s<r&&(i*=256);)e<0&&l===0&&this[n+s-1]!==0&&(l=1),this[n+s]=(e/i>>0)-l&255;return n+r};m.prototype.writeIntBE=function(e,n,r,o){if(e=+e,n=n>>>0,!o){let a=Math.pow(2,8*r-1);fe(this,e,n,r,a-1,-a)}let s=r-1,i=1,l=0;for(this[n+s]=e&255;--s>=0&&(i*=256);)e<0&&l===0&&this[n+s+1]!==0&&(l=1),this[n+s]=(e/i>>0)-l&255;return n+r};m.prototype.writeInt8=function(e,n,r){return e=+e,n=n>>>0,r||fe(this,e,n,1,127,-128),e<0&&(e=255+e+1),this[n]=e&255,n+1};m.prototype.writeInt16LE=function(e,n,r){return e=+e,n=n>>>0,r||fe(this,e,n,2,32767,-32768),this[n]=e&255,this[n+1]=e>>>8,n+2};m.prototype.writeInt16BE=function(e,n,r){return e=+e,n=n>>>0,r||fe(this,e,n,2,32767,-32768),this[n]=e>>>8,this[n+1]=e&255,n+2};m.prototype.writeInt32LE=function(e,n,r){return e=+e,n=n>>>0,r||fe(this,e,n,4,2147483647,-2147483648),this[n]=e&255,this[n+1]=e>>>8,this[n+2]=e>>>16,this[n+3]=e>>>24,n+4};m.prototype.writeInt32BE=function(e,n,r){return e=+e,n=n>>>0,r||fe(this,e,n,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[n]=e>>>24,this[n+1]=e>>>16,this[n+2]=e>>>8,this[n+3]=e&255,n+4};m.prototype.writeBigInt64LE=function(e,n=0){return Jr(this,e,n,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))};m.prototype.writeBigInt64BE=function(e,n=0){return Vr(this,e,n,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))};function Gr(t,e,n,r,o,s){if(n+r>t.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function $r(t,e,n,r,o){return e=+e,n=n>>>0,o||Gr(t,e,n,4,34028234663852886e22,-34028234663852886e22),Qt(t,e,n,r,23,4),n+4}m.prototype.writeFloatLE=function(e,n,r){return $r(this,e,n,!0,r)};m.prototype.writeFloatBE=function(e,n,r){return $r(this,e,n,!1,r)};function Hr(t,e,n,r,o){return e=+e,n=n>>>0,o||Gr(t,e,n,8,17976931348623157e292,-17976931348623157e292),Qt(t,e,n,r,52,8),n+8}m.prototype.writeDoubleLE=function(e,n,r){return Hr(this,e,n,!0,r)};m.prototype.writeDoubleBE=function(e,n,r){return Hr(this,e,n,!1,r)};m.prototype.copy=function(e,n,r,o){if(!m.isBuffer(e))throw new TypeError("argument should be a Buffer");if(r||(r=0),!o&&o!==0&&(o=this.length),n>=e.length&&(n=e.length),n||(n=0),o>0&&o<r&&(o=r),o===r||e.length===0||this.length===0)return 0;if(n<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(o<0)throw new RangeError("sourceEnd out of bounds");o>this.length&&(o=this.length),e.length-n<o-r&&(o=e.length-n+r);let s=o-r;return this===e?this.copyWithin(n,r,o):Uint8Array.prototype.set.call(e,this.subarray(r,o),n),s};m.prototype.fill=function(e,n,r,o){if(typeof e=="string"){if(typeof n=="string"?(o=n,n=0,r=this.length):typeof r=="string"&&(o=r,r=this.length),o!==void 0&&typeof o!="string")throw new TypeError("encoding must be a string");if(typeof o=="string"&&!m.isEncoding(o))throw new TypeError("Unknown encoding: "+o);if(e.length===1){let i=e.charCodeAt(0);(o==="utf8"&&i<128||o==="latin1")&&(e=i)}}else typeof e=="number"?e=e&255:typeof e=="boolean"&&(e=Number(e));if(n<0||this.length<n||this.length<r)throw new RangeError("Out of range index");if(r<=n)return this;n=n>>>0,r=r===void 0?this.length:r>>>0,e||(e=0);let s;if(typeof e=="number")for(s=n;s<r;++s)this[s]=e;else{let i=m.isBuffer(e)?e:m.from(e,o),l=i.length;if(l===0)throw new TypeError('The value "'+e+'" is invalid for argument "value"');for(s=0;s<r-n;++s)this[s+n]=i[s%l]}return this};var $e={};function on(t,e,n){$e[t]=class extends n{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${t}]`,this.stack,delete this.name}get code(){return t}set code(o){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:o,writable:!0})}toString(){return`${this.name} [${t}]: ${this.message}`}}}on("ERR_BUFFER_OUT_OF_BOUNDS",function(t){return t?`${t} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError);on("ERR_INVALID_ARG_TYPE",function(t,e){return`The "${t}" argument must be of type number. Received type ${typeof e}`},TypeError);on("ERR_OUT_OF_RANGE",function(t,e,n){let r=`The value of "${t}" is out of range.`,o=n;return Number.isInteger(n)&&Math.abs(n)>2**32?o=Pr(String(n)):typeof n=="bigint"&&(o=String(n),(n>BigInt(2)**BigInt(32)||n<-(BigInt(2)**BigInt(32)))&&(o=Pr(o)),o+="n"),r+=` It must be ${e}. Received ${o}`,r},RangeError);function Pr(t){let e="",n=t.length,r=t[0]==="-"?1:0;for(;n>=r+4;n-=3)e=`_${t.slice(n-3,n)}${e}`;return`${t.slice(0,n)}${e}`}function ei(t,e,n){He(e,"offset"),(t[e]===void 0||t[e+n]===void 0)&&rt(e,t.length-(n+1))}function Zr(t,e,n,r,o,s){if(t>n||t<e){let i=typeof e=="bigint"?"n":"",l;throw s>3?e===0||e===BigInt(0)?l=`>= 0${i} and < 2${i} ** ${(s+1)*8}${i}`:l=`>= -(2${i} ** ${(s+1)*8-1}${i}) and < 2 ** ${(s+1)*8-1}${i}`:l=`>= ${e}${i} and <= ${n}${i}`,new $e.ERR_OUT_OF_RANGE("value",l,t)}ei(r,o,s)}function He(t,e){if(typeof t!="number")throw new $e.ERR_INVALID_ARG_TYPE(e,"number",t)}function rt(t,e,n){throw Math.floor(t)!==t?(He(t,n),new $e.ERR_OUT_OF_RANGE(n||"offset","an integer",t)):e<0?new $e.ERR_BUFFER_OUT_OF_BOUNDS:new $e.ERR_OUT_OF_RANGE(n||"offset",`>= ${n?1:0} and <= ${e}`,t)}var ti=/[^+/0-9A-Za-z-_]/g;function ni(t){if(t=t.split("=")[0],t=t.trim().replace(ti,""),t.length<2)return"";for(;t.length%4!==0;)t=t+"=";return t}function tn(t,e){e=e||1/0;let n,r=t.length,o=null,s=[];for(let i=0;i<r;++i){if(n=t.charCodeAt(i),n>55295&&n<57344){if(!o){if(n>56319){(e-=3)>-1&&s.push(239,191,189);continue}else if(i+1===r){(e-=3)>-1&&s.push(239,191,189);continue}o=n;continue}if(n<56320){(e-=3)>-1&&s.push(239,191,189),o=n;continue}n=(o-55296<<10|n-56320)+65536}else o&&(e-=3)>-1&&s.push(239,191,189);if(o=null,n<128){if((e-=1)<0)break;s.push(n)}else if(n<2048){if((e-=2)<0)break;s.push(n>>6|192,n&63|128)}else if(n<65536){if((e-=3)<0)break;s.push(n>>12|224,n>>6&63|128,n&63|128)}else if(n<1114112){if((e-=4)<0)break;s.push(n>>18|240,n>>12&63|128,n>>6&63|128,n&63|128)}else throw new Error("Invalid code point")}return s}function ri(t){let e=[];for(let n=0;n<t.length;++n)e.push(t.charCodeAt(n)&255);return e}function oi(t,e){let n,r,o,s=[];for(let i=0;i<t.length&&!((e-=2)<0);++i)n=t.charCodeAt(i),r=n>>8,o=n%256,s.push(o),s.push(r);return s}function qr(t){return jr(ni(t))}function Et(t,e,n,r){let o;for(o=0;o<r&&!(o+n>=e.length||o>=t.length);++o)e[o+n]=t[o];return o}var si=function(){let t="0123456789abcdef",e=new Array(256);for(let n=0;n<16;++n){let r=n*16;for(let o=0;o<16;++o)e[r+o]=t[n]+t[o]}return e}();var Ut={};Ns(Ut,{ArtMethod:()=>kt,ArtStackVisitor:()=>Dn,DVM_JNI_ENV_OFFSET_SELF:()=>go,HandleVector:()=>dt,VariableSizedHandleScope:()=>ut,backtrace:()=>Yn,deoptimizeBootImage:()=>or,deoptimizeEverything:()=>rr,deoptimizeMethod:()=>nr,ensureClassInitialized:()=>Ll,getAndroidApiLevel:()=>te,getAndroidVersion:()=>pt,getApi:()=>V,getArtApexVersion:()=>Hn,getArtClassSpec:()=>qn,getArtFieldSpec:()=>Ft,getArtMethodSpec:()=>me,getArtThreadFromEnv:()=>Dt,getArtThreadSpec:()=>We,makeArtClassLoaderVisitor:()=>Xn,makeArtClassVisitor:()=>Qn,makeMethodMangler:()=>vc,makeObjectVisitorPredicate:()=>ir,revertGlobalPatches:()=>er,translateMethod:()=>Sc,withAllArtThreadsSuspended:()=>Kn,withRunnableArtThread:()=>Ee});var{pageSize:sn,pointerSize:ii}=Process,an=class{constructor(e){this.sliceSize=e,this.slicesPerPage=sn/e,this.pages=[],this.free=[]}allocateSlice(e,n){let r=e.near===void 0,o=n===1;if(r&&o){let s=this.free.pop();if(s!==void 0)return s}else if(n<sn){let{free:s}=this,i=s.length,l=o?null:ptr(n-1);for(let a=0;a!==i;a++){let c=s[a],d=r||this._isSliceNear(c,e),p=o||c.and(l).isNull();if(d&&p)return s.splice(a,1)[0]}}return this._allocatePage(e)}_allocatePage(e){let n=Memory.alloc(sn,e),{sliceSize:r,slicesPerPage:o}=this;for(let s=1;s!==o;s++){let i=n.add(s*r);this.free.push(i)}return this.pages.push(n),n}_isSliceNear(e,n){let r=e.add(this.sliceSize),{near:o,maxDistance:s}=n,i=Wr(o.sub(e)),l=Wr(o.sub(r));return i.compare(s)<=0&&l.compare(s)<=0}freeSlice(e){this.free.push(e)}};function Wr(t){let e=ii===4?31:63,n=ptr(1).shl(e).not();return t.and(n)}function ln(t){return new an(t)}function ue(t,e){if(e!==0)throw new Error(t+" failed: "+e)}var vt={v1_0:805371904,v1_2:805372416},St={canTagObjects:1},{pointerSize:ai}=Process,li={exceptions:"propagate"};function xe(t,e){this.handle=t,this.vm=e,this.vtable=t.readPointer()}xe.prototype.deallocate=ot(47,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});xe.prototype.getLoadedClasses=ot(78,"int32",["pointer","pointer","pointer"],function(t,e,n){let r=t(this.handle,e,n);ue("EnvJvmti::getLoadedClasses",r)});xe.prototype.iterateOverInstancesOfClass=ot(112,"int32",["pointer","pointer","int","pointer","pointer"],function(t,e,n,r,o){let s=t(this.handle,e,n,r,o);ue("EnvJvmti::iterateOverInstancesOfClass",s)});xe.prototype.getObjectsWithTags=ot(114,"int32",["pointer","int","pointer","pointer","pointer","pointer"],function(t,e,n,r,o,s){let i=t(this.handle,e,n,r,o,s);ue("EnvJvmti::getObjectsWithTags",i)});xe.prototype.addCapabilities=ot(142,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});function ot(t,e,n,r){let o=null;return function(){o===null&&(o=new NativeFunction(this.vtable.add((t-1)*ai).readPointer(),e,n,li));let s=[o];return s=s.concat.apply(s,arguments),r.apply(this,s)}}function Ne(t,e,{limit:n}){let r=t,o=null;for(let s=0;s!==n;s++){let i=Instruction.parse(r),l=e(i,o);if(l!==null)return l;r=i.next,o=i}return null}function de(t){let e=null,n=!1;return function(...r){return n||(e=t(...r),n=!0),e}}function b(t,e){this.handle=t,this.vm=e}var wt=Process.pointerSize,je=2,ci=28,di=34,ui=37,pi=40,fi=43,hi=46,_i=49,mi=52,gi=55,yi=58,bi=61,Ei=64,vi=67,Si=70,wi=73,Ii=76,Ci=79,Ai=82,Ti=85,Li=88,xi=91,Ni=114,ki=117,Mi=120,ji=123,Oi=126,Ri=129,Pi=132,Fi=135,Di=138,Ui=141,Bi=95,zi=96,Ji=97,Vi=98,Gi=99,$i=100,Hi=101,Zi=102,qi=103,Wi=104,Ki=105,Qi=106,Xi=107,Yi=108,ea=109,ta=110,na=111,ra=112,oa=145,sa=146,ia=147,aa=148,la=149,ca=150,da=151,ua=152,pa=153,fa=154,ha=155,_a=156,ma=157,ga=158,ya=159,ba=160,Ea=161,va=162,Sa={pointer:di,uint8:ui,int8:pi,uint16:fi,int16:hi,int32:_i,int64:mi,float:gi,double:yi,void:bi},wa={pointer:Ei,uint8:vi,int8:Si,uint16:wi,int16:Ii,int32:Ci,int64:Ai,float:Ti,double:Li,void:xi},Ia={pointer:Ni,uint8:ki,int8:Mi,uint16:ji,int16:Oi,int32:Ri,int64:Pi,float:Fi,double:Di,void:Ui},Ca={pointer:Bi,uint8:zi,int8:Ji,uint16:Vi,int16:Gi,int32:$i,int64:Hi,float:Zi,double:qi},Aa={pointer:Wi,uint8:Ki,int8:Qi,uint16:Xi,int16:Yi,int32:ea,int64:ta,float:na,double:ra},Ta={pointer:oa,uint8:sa,int8:ia,uint16:aa,int16:la,int32:ca,int64:da,float:ua,double:pa},La={pointer:fa,uint8:ha,int8:_a,uint16:ma,int16:ga,int32:ya,int64:ba,float:Ea,double:va},Qr={exceptions:"propagate"},cn=null,En=[];b.dispose=function(t){En.forEach(t.deleteGlobalRef,t),En=[]};function De(t){return En.push(t),t}function It(t){return cn===null&&(cn=t.handle.readPointer()),cn}function x(t,e,n,r){let o=null;return function(){o===null&&(o=new NativeFunction(It(this).add(t*wt).readPointer(),e,n,Qr));let s=[o];return s=s.concat.apply(s,arguments),r.apply(this,s)}}b.prototype.getVersion=x(4,"int32",["pointer"],function(t){return t(this.handle)});b.prototype.findClass=x(6,"pointer",["pointer","pointer"],function(t,e){let n=t(this.handle,Memory.allocUtf8String(e));return this.throwIfExceptionPending(),n});b.prototype.throwIfExceptionPending=function(){let t=this.exceptionOccurred();if(t.isNull())return;this.exceptionClear();let e=this.newGlobalRef(t);this.deleteLocalRef(t);let n=this.vaMethod("pointer",[])(this.handle,e,this.javaLangObject().toString),r=this.stringFromJni(n);this.deleteLocalRef(n);let o=new Error(r);throw o.$h=e,Script.bindWeak(o,xa(this.vm,e)),o};function xa(t,e){return function(){t.perform(n=>{n.deleteGlobalRef(e)})}}b.prototype.fromReflectedMethod=x(7,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.fromReflectedField=x(8,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.toReflectedMethod=x(9,"pointer",["pointer","pointer","pointer","uint8"],function(t,e,n,r){return t(this.handle,e,n,r)});b.prototype.getSuperclass=x(10,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.isAssignableFrom=x(11,"uint8",["pointer","pointer","pointer"],function(t,e,n){return!!t(this.handle,e,n)});b.prototype.toReflectedField=x(12,"pointer",["pointer","pointer","pointer","uint8"],function(t,e,n,r){return t(this.handle,e,n,r)});b.prototype.throw=x(13,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.exceptionOccurred=x(15,"pointer",["pointer"],function(t){return t(this.handle)});b.prototype.exceptionDescribe=x(16,"void",["pointer"],function(t){t(this.handle)});b.prototype.exceptionClear=x(17,"void",["pointer"],function(t){t(this.handle)});b.prototype.pushLocalFrame=x(19,"int32",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.popLocalFrame=x(20,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.newGlobalRef=x(21,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.deleteGlobalRef=x(22,"void",["pointer","pointer"],function(t,e){t(this.handle,e)});b.prototype.deleteLocalRef=x(23,"void",["pointer","pointer"],function(t,e){t(this.handle,e)});b.prototype.isSameObject=x(24,"uint8",["pointer","pointer","pointer"],function(t,e,n){return!!t(this.handle,e,n)});b.prototype.newLocalRef=x(25,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.allocObject=x(27,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.getObjectClass=x(31,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.isInstanceOf=x(32,"uint8",["pointer","pointer","pointer"],function(t,e,n){return!!t(this.handle,e,n)});b.prototype.getMethodId=x(33,"pointer",["pointer","pointer","pointer","pointer"],function(t,e,n,r){return t(this.handle,e,Memory.allocUtf8String(n),Memory.allocUtf8String(r))});b.prototype.getFieldId=x(94,"pointer",["pointer","pointer","pointer","pointer"],function(t,e,n,r){return t(this.handle,e,Memory.allocUtf8String(n),Memory.allocUtf8String(r))});b.prototype.getIntField=x(100,"int32",["pointer","pointer","pointer"],function(t,e,n){return t(this.handle,e,n)});b.prototype.getStaticMethodId=x(113,"pointer",["pointer","pointer","pointer","pointer"],function(t,e,n,r){return t(this.handle,e,Memory.allocUtf8String(n),Memory.allocUtf8String(r))});b.prototype.getStaticFieldId=x(144,"pointer",["pointer","pointer","pointer","pointer"],function(t,e,n,r){return t(this.handle,e,Memory.allocUtf8String(n),Memory.allocUtf8String(r))});b.prototype.getStaticIntField=x(150,"int32",["pointer","pointer","pointer"],function(t,e,n){return t(this.handle,e,n)});b.prototype.getStringLength=x(164,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.getStringChars=x(165,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.releaseStringChars=x(166,"void",["pointer","pointer","pointer"],function(t,e,n){t(this.handle,e,n)});b.prototype.newStringUtf=x(167,"pointer",["pointer","pointer"],function(t,e){let n=Memory.allocUtf8String(e);return t(this.handle,n)});b.prototype.getStringUtfChars=x(169,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.releaseStringUtfChars=x(170,"void",["pointer","pointer","pointer"],function(t,e,n){t(this.handle,e,n)});b.prototype.getArrayLength=x(171,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.newObjectArray=x(172,"pointer",["pointer","int32","pointer","pointer"],function(t,e,n,r){return t(this.handle,e,n,r)});b.prototype.getObjectArrayElement=x(173,"pointer",["pointer","pointer","int32"],function(t,e,n){return t(this.handle,e,n)});b.prototype.setObjectArrayElement=x(174,"void",["pointer","pointer","int32","pointer"],function(t,e,n,r){t(this.handle,e,n,r)});b.prototype.newBooleanArray=x(175,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.newByteArray=x(176,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.newCharArray=x(177,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.newShortArray=x(178,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.newIntArray=x(179,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.newLongArray=x(180,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.newFloatArray=x(181,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.newDoubleArray=x(182,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});b.prototype.getBooleanArrayElements=x(183,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.getByteArrayElements=x(184,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.getCharArrayElements=x(185,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.getShortArrayElements=x(186,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.getIntArrayElements=x(187,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.getLongArrayElements=x(188,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.getFloatArrayElements=x(189,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.getDoubleArrayElements=x(190,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});b.prototype.releaseBooleanArrayElements=x(191,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,je)});b.prototype.releaseByteArrayElements=x(192,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,je)});b.prototype.releaseCharArrayElements=x(193,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,je)});b.prototype.releaseShortArrayElements=x(194,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,je)});b.prototype.releaseIntArrayElements=x(195,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,je)});b.prototype.releaseLongArrayElements=x(196,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,je)});b.prototype.releaseFloatArrayElements=x(197,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,je)});b.prototype.releaseDoubleArrayElements=x(198,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,je)});b.prototype.getByteArrayRegion=x(200,"void",["pointer","pointer","int","int","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});b.prototype.setBooleanArrayRegion=x(207,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});b.prototype.setByteArrayRegion=x(208,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});b.prototype.setCharArrayRegion=x(209,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});b.prototype.setShortArrayRegion=x(210,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});b.prototype.setIntArrayRegion=x(211,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});b.prototype.setLongArrayRegion=x(212,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});b.prototype.setFloatArrayRegion=x(213,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});b.prototype.setDoubleArrayRegion=x(214,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});b.prototype.registerNatives=x(215,"int32",["pointer","pointer","pointer","int32"],function(t,e,n,r){return t(this.handle,e,n,r)});b.prototype.monitorEnter=x(217,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.monitorExit=x(218,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.getDirectBufferAddress=x(230,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});b.prototype.getObjectRefType=x(232,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});var Kr=new Map;function Ct(t,e,n,r){return Sn(this,"p",ka,t,e,n,r)}function vn(t,e,n,r){return Sn(this,"v",Ma,t,e,n,r)}function Na(t,e,n,r){return Sn(this,"n",ja,t,e,n,r)}function Sn(t,e,n,r,o,s,i){if(i!==void 0)return n(t,r,o,s,i);let l=[r,e,o].concat(s).join("|"),a=Kr.get(l);return a===void 0&&(a=n(t,r,o,s,Qr),Kr.set(l,a)),a}function ka(t,e,n,r,o){return new NativeFunction(It(t).add(e*wt).readPointer(),n,["pointer","pointer","pointer"].concat(r),o)}function Ma(t,e,n,r,o){return new NativeFunction(It(t).add(e*wt).readPointer(),n,["pointer","pointer","pointer","..."].concat(r),o)}function ja(t,e,n,r,o){return new NativeFunction(It(t).add(e*wt).readPointer(),n,["pointer","pointer","pointer","pointer","..."].concat(r),o)}b.prototype.constructor=function(t,e){return vn.call(this,ci,"pointer",t,e)};b.prototype.vaMethod=function(t,e,n){let r=Sa[t];if(r===void 0)throw new Error("Unsupported type: "+t);return vn.call(this,r,t,e,n)};b.prototype.nonvirtualVaMethod=function(t,e,n){let r=wa[t];if(r===void 0)throw new Error("Unsupported type: "+t);return Na.call(this,r,t,e,n)};b.prototype.staticVaMethod=function(t,e,n){let r=Ia[t];if(r===void 0)throw new Error("Unsupported type: "+t);return vn.call(this,r,t,e,n)};b.prototype.getField=function(t){let e=Ca[t];if(e===void 0)throw new Error("Unsupported type: "+t);return Ct.call(this,e,t,[])};b.prototype.getStaticField=function(t){let e=Ta[t];if(e===void 0)throw new Error("Unsupported type: "+t);return Ct.call(this,e,t,[])};b.prototype.setField=function(t){let e=Aa[t];if(e===void 0)throw new Error("Unsupported type: "+t);return Ct.call(this,e,"void",[t])};b.prototype.setStaticField=function(t){let e=La[t];if(e===void 0)throw new Error("Unsupported type: "+t);return Ct.call(this,e,"void",[t])};var dn=null;b.prototype.javaLangClass=function(){if(dn===null){let t=this.findClass("java/lang/Class");try{let e=this.getMethodId.bind(this,t);dn={handle:De(this.newGlobalRef(t)),getName:e("getName","()Ljava/lang/String;"),getSimpleName:e("getSimpleName","()Ljava/lang/String;"),getGenericSuperclass:e("getGenericSuperclass","()Ljava/lang/reflect/Type;"),getDeclaredConstructors:e("getDeclaredConstructors","()[Ljava/lang/reflect/Constructor;"),getDeclaredMethods:e("getDeclaredMethods","()[Ljava/lang/reflect/Method;"),getDeclaredFields:e("getDeclaredFields","()[Ljava/lang/reflect/Field;"),isArray:e("isArray","()Z"),isPrimitive:e("isPrimitive","()Z"),isInterface:e("isInterface","()Z"),getComponentType:e("getComponentType","()Ljava/lang/Class;")}}finally{this.deleteLocalRef(t)}}return dn};var un=null;b.prototype.javaLangObject=function(){if(un===null){let t=this.findClass("java/lang/Object");try{let e=this.getMethodId.bind(this,t);un={handle:De(this.newGlobalRef(t)),toString:e("toString","()Ljava/lang/String;"),getClass:e("getClass","()Ljava/lang/Class;")}}finally{this.deleteLocalRef(t)}}return un};var pn=null;b.prototype.javaLangReflectConstructor=function(){if(pn===null){let t=this.findClass("java/lang/reflect/Constructor");try{pn={getGenericParameterTypes:this.getMethodId(t,"getGenericParameterTypes","()[Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(t)}}return pn};var fn=null;b.prototype.javaLangReflectMethod=function(){if(fn===null){let t=this.findClass("java/lang/reflect/Method");try{let e=this.getMethodId.bind(this,t);fn={getName:e("getName","()Ljava/lang/String;"),getGenericParameterTypes:e("getGenericParameterTypes","()[Ljava/lang/reflect/Type;"),getParameterTypes:e("getParameterTypes","()[Ljava/lang/Class;"),getGenericReturnType:e("getGenericReturnType","()Ljava/lang/reflect/Type;"),getGenericExceptionTypes:e("getGenericExceptionTypes","()[Ljava/lang/reflect/Type;"),getModifiers:e("getModifiers","()I"),isVarArgs:e("isVarArgs","()Z")}}finally{this.deleteLocalRef(t)}}return fn};var hn=null;b.prototype.javaLangReflectField=function(){if(hn===null){let t=this.findClass("java/lang/reflect/Field");try{let e=this.getMethodId.bind(this,t);hn={getName:e("getName","()Ljava/lang/String;"),getType:e("getType","()Ljava/lang/Class;"),getGenericType:e("getGenericType","()Ljava/lang/reflect/Type;"),getModifiers:e("getModifiers","()I"),toString:e("toString","()Ljava/lang/String;")}}finally{this.deleteLocalRef(t)}}return hn};var _n=null;b.prototype.javaLangReflectTypeVariable=function(){if(_n===null){let t=this.findClass("java/lang/reflect/TypeVariable");try{let e=this.getMethodId.bind(this,t);_n={handle:De(this.newGlobalRef(t)),getName:e("getName","()Ljava/lang/String;"),getBounds:e("getBounds","()[Ljava/lang/reflect/Type;"),getGenericDeclaration:e("getGenericDeclaration","()Ljava/lang/reflect/GenericDeclaration;")}}finally{this.deleteLocalRef(t)}}return _n};var mn=null;b.prototype.javaLangReflectWildcardType=function(){if(mn===null){let t=this.findClass("java/lang/reflect/WildcardType");try{let e=this.getMethodId.bind(this,t);mn={handle:De(this.newGlobalRef(t)),getLowerBounds:e("getLowerBounds","()[Ljava/lang/reflect/Type;"),getUpperBounds:e("getUpperBounds","()[Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(t)}}return mn};var gn=null;b.prototype.javaLangReflectGenericArrayType=function(){if(gn===null){let t=this.findClass("java/lang/reflect/GenericArrayType");try{gn={handle:De(this.newGlobalRef(t)),getGenericComponentType:this.getMethodId(t,"getGenericComponentType","()Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(t)}}return gn};var yn=null;b.prototype.javaLangReflectParameterizedType=function(){if(yn===null){let t=this.findClass("java/lang/reflect/ParameterizedType");try{let e=this.getMethodId.bind(this,t);yn={handle:De(this.newGlobalRef(t)),getActualTypeArguments:e("getActualTypeArguments","()[Ljava/lang/reflect/Type;"),getRawType:e("getRawType","()Ljava/lang/reflect/Type;"),getOwnerType:e("getOwnerType","()Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(t)}}return yn};var bn=null;b.prototype.javaLangString=function(){if(bn===null){let t=this.findClass("java/lang/String");try{bn={handle:De(this.newGlobalRef(t))}}finally{this.deleteLocalRef(t)}}return bn};b.prototype.getClassName=function(t){let e=this.vaMethod("pointer",[])(this.handle,t,this.javaLangClass().getName);try{return this.stringFromJni(e)}finally{this.deleteLocalRef(e)}};b.prototype.getObjectClassName=function(t){let e=this.getObjectClass(t);try{return this.getClassName(e)}finally{this.deleteLocalRef(e)}};b.prototype.getActualTypeArgument=function(t){let e=this.vaMethod("pointer",[])(this.handle,t,this.javaLangReflectParameterizedType().getActualTypeArguments);if(this.throwIfExceptionPending(),!e.isNull())try{return this.getTypeNameFromFirstTypeElement(e)}finally{this.deleteLocalRef(e)}};b.prototype.getTypeNameFromFirstTypeElement=function(t){if(this.getArrayLength(t)>0){let n=this.getObjectArrayElement(t,0);try{return this.getTypeName(n)}finally{this.deleteLocalRef(n)}}else return"java.lang.Object"};b.prototype.getTypeName=function(t,e){let n=this.vaMethod("pointer",[]);if(this.isInstanceOf(t,this.javaLangClass().handle))return this.getClassName(t);if(this.isInstanceOf(t,this.javaLangReflectGenericArrayType().handle))return this.getArrayTypeName(t);if(this.isInstanceOf(t,this.javaLangReflectParameterizedType().handle)){let r=n(this.handle,t,this.javaLangReflectParameterizedType().getRawType);this.throwIfExceptionPending();let o;try{o=this.getTypeName(r)}finally{this.deleteLocalRef(r)}return e&&(o+="<"+this.getActualTypeArgument(t)+">"),o}else return this.isInstanceOf(t,this.javaLangReflectTypeVariable().handle)||this.isInstanceOf(t,this.javaLangReflectWildcardType().handle),"java.lang.Object"};b.prototype.getArrayTypeName=function(t){let e=this.vaMethod("pointer",[]);if(this.isInstanceOf(t,this.javaLangClass().handle))return this.getClassName(t);if(this.isInstanceOf(t,this.javaLangReflectGenericArrayType().handle)){let n=e(this.handle,t,this.javaLangReflectGenericArrayType().getGenericComponentType);this.throwIfExceptionPending();try{return"[L"+this.getTypeName(n)+";"}finally{this.deleteLocalRef(n)}}else return"[Ljava.lang.Object;"};b.prototype.stringFromJni=function(t){let e=this.getStringChars(t);if(e.isNull())throw new Error("Unable to access string");try{let n=this.getStringLength(t);return e.readUtf16String(n)}finally{this.releaseStringChars(t,e)}};var Xr=65542,Ze=Process.pointerSize,wn=Process.getCurrentThreadId(),Ue=new Map,st=new Map;function Ce(t){let e=t.vm,n=null,r=null,o=null;function s(){let l=e.readPointer(),a={exceptions:"propagate"};n=new NativeFunction(l.add(4*Ze).readPointer(),"int32",["pointer","pointer","pointer"],a),r=new NativeFunction(l.add(5*Ze).readPointer(),"int32",["pointer"],a),o=new NativeFunction(l.add(6*Ze).readPointer(),"int32",["pointer","pointer","int32"],a)}this.handle=e,this.perform=function(l){let a=Process.getCurrentThreadId(),c=i(a);if(c!==null)return l(c);let d=this._tryGetEnv(),p=d!==null;p||(d=this.attachCurrentThread(),Ue.set(a,!0)),this.link(a,d);try{return l(d)}finally{let f=a===wn;if(f||this.unlink(a),!p&&!f){let u=Ue.get(a);Ue.delete(a),u&&this.detachCurrentThread()}}},this.attachCurrentThread=function(){let l=Memory.alloc(Ze);return ue("VM::AttachCurrentThread",n(e,l,NULL)),new b(l.readPointer(),this)},this.detachCurrentThread=function(){ue("VM::DetachCurrentThread",r(e))},this.preventDetachDueToClassLoader=function(){let l=Process.getCurrentThreadId();Ue.has(l)&&Ue.set(l,!1)},this.getEnv=function(){let l=i(Process.getCurrentThreadId());if(l!==null)return l;let a=Memory.alloc(Ze),c=o(e,a,Xr);if(c===-2)throw new Error("Current thread is not attached to the Java VM; please move this code inside a Java.perform() callback");return ue("VM::GetEnv",c),new b(a.readPointer(),this)},this.tryGetEnv=function(){let l=i(Process.getCurrentThreadId());return l!==null?l:this._tryGetEnv()},this._tryGetEnv=function(){let l=this.tryGetEnvHandle(Xr);return l===null?null:new b(l,this)},this.tryGetEnvHandle=function(l){let a=Memory.alloc(Ze);return o(e,a,l)!==0?null:a.readPointer()},this.makeHandleDestructor=function(l){return()=>{this.perform(a=>{a.deleteGlobalRef(l)})}},this.link=function(l,a){let c=st.get(l);c===void 0?st.set(l,[a,1]):c[1]++},this.unlink=function(l){let a=st.get(l);a[1]===1?st.delete(l):a[1]--};function i(l){let a=st.get(l);return a===void 0?null:a[0]}s.call(this)}Ce.dispose=function(t){Ue.get(wn)===!0&&(Ue.delete(wn),t.detachCurrentThread())};var Oa=4,v=Process.pointerSize,{readU32:Ra,readPointer:Pa,writeU32:Fa,writePointer:Da}=NativePointer.prototype,Ua=1,Ba=8,za=16,xt=256,Ja=524288,Va=2097152,mo=1073741824,Ga=524288,$a=134217728,Yr=1048576,Ha=2097152,Za=268435456,qa=268435456,Wa=0,On=3,Rn=5,$n=ptr(1).not(),Ka=2147467263,Qa=4294963200,Pt=17*v,Xa=18*v,go=12,Ya=112,el=116,tl=0,Cn=56,eo=4,nl=8,rl=10,ol=12,sl=14,il=28,al=36,ll=0,cl=1,dl=2,ul=3,pl=4,fl=5,hl=6,_l=7,to=2147483648,ml=28,ct=3*v,gl=3*v,yl=1,bl=1,yo=de(Nl),El=de(Vl),me=de($l),We=de(Hl),vl=de(Zl),Sl=de(nc),pt=de(Ql),bo=de(Xl),te=de(Yl),Hn=de(ec),wl=de(ic),Il=Process.arch==="ia32"?Hc:$c,K={exceptions:"propagate"},it={},An=null,Tn=null,Eo=null,se=null,Zn=[],Nt=new Map,vo=[],Ln=null,no=0,ro=!1,oo=!1,at=null,Cl=[],xn=null,At=null;function V(){return An===null&&(An=Al()),An}function Al(){let t=Process.enumerateModules().filter(u=>/^lib(art|dvm).so$/.test(u.name)).filter(u=>!/\/system\/fake-libs/.test(u.path));if(t.length===0)return null;let e=t[0],n=e.name.indexOf("art")!==-1?"art":"dalvik",r=n==="art",o={module:e,find(u){let{module:_}=this,h=_.findExportByName(u);return h===null&&(h=_.findSymbolByName(u)),h},flavor:n,addLocalReference:null};o.isApiLevel34OrApexEquivalent=r&&(o.find("_ZN3art7AppInfo29GetPrimaryApkReferenceProfileEv")!==null||o.find("_ZN3art6Thread15RunFlipFunctionEPS0_")!==null);let s=r?{functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],artInterpreterToCompiledCodeBridge:function(u){this.artInterpreterToCompiledCodeBridge=u},_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadENS_6ObjPtrINS_6mirror6ObjectEEE:["art::JavaVMExt::AddGlobalRef","pointer",["pointer","pointer","pointer"]],_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadEPNS_6mirror6ObjectE:["art::JavaVMExt::AddGlobalRef","pointer",["pointer","pointer","pointer"]],_ZN3art17ReaderWriterMutex13ExclusiveLockEPNS_6ThreadE:["art::ReaderWriterMutex::ExclusiveLock","void",["pointer","pointer"]],_ZN3art17ReaderWriterMutex15ExclusiveUnlockEPNS_6ThreadE:["art::ReaderWriterMutex::ExclusiveUnlock","void",["pointer","pointer"]],_ZN3art22IndirectReferenceTable3AddEjPNS_6mirror6ObjectE:function(u){this["art::IndirectReferenceTable::Add"]=new NativeFunction(u,"pointer",["pointer","uint","pointer"],K)},_ZN3art22IndirectReferenceTable3AddENS_15IRTSegmentStateENS_6ObjPtrINS_6mirror6ObjectEEE:function(u){this["art::IndirectReferenceTable::Add"]=new NativeFunction(u,"pointer",["pointer","uint","pointer"],K)},_ZN3art9JavaVMExt12DecodeGlobalEPv:function(u){let _;te()>=26?_=Il(u,["pointer","pointer"]):_=new NativeFunction(u,"pointer",["pointer","pointer"],K),this["art::JavaVMExt::DecodeGlobal"]=function(h,g,y){return _(h,y)}},_ZN3art9JavaVMExt12DecodeGlobalEPNS_6ThreadEPv:["art::JavaVMExt::DecodeGlobal","pointer",["pointer","pointer","pointer"]],_ZNK3art6Thread19DecodeGlobalJObjectEP8_jobject:["art::Thread::DecodeJObject","pointer",["pointer","pointer"]],_ZNK3art6Thread13DecodeJObjectEP8_jobject:["art::Thread::DecodeJObject","pointer",["pointer","pointer"]],_ZN3art10ThreadList10SuspendAllEPKcb:["art::ThreadList::SuspendAll","void",["pointer","pointer","bool"]],_ZN3art10ThreadList10SuspendAllEv:function(u){let _=new NativeFunction(u,"void",["pointer"],K);this["art::ThreadList::SuspendAll"]=function(h,g,y){return _(h)}},_ZN3art10ThreadList9ResumeAllEv:["art::ThreadList::ResumeAll","void",["pointer"]],_ZN3art11ClassLinker12VisitClassesEPNS_12ClassVisitorE:["art::ClassLinker::VisitClasses","void",["pointer","pointer"]],_ZN3art11ClassLinker12VisitClassesEPFbPNS_6mirror5ClassEPvES4_:function(u){let _=new NativeFunction(u,"void",["pointer","pointer","pointer"],K);this["art::ClassLinker::VisitClasses"]=function(h,g){_(h,g,NULL)}},_ZNK3art11ClassLinker17VisitClassLoadersEPNS_18ClassLoaderVisitorE:["art::ClassLinker::VisitClassLoaders","void",["pointer","pointer"]],_ZN3art2gc4Heap12VisitObjectsEPFvPNS_6mirror6ObjectEPvES5_:["art::gc::Heap::VisitObjects","void",["pointer","pointer","pointer"]],_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE:["art::gc::Heap::GetInstances","void",["pointer","pointer","pointer","int","pointer"]],_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEbiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE:function(u){let _=new NativeFunction(u,"void",["pointer","pointer","pointer","bool","int","pointer"],K);this["art::gc::Heap::GetInstances"]=function(h,g,y,E,C){_(h,g,y,0,E,C)}},_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEjb:["art::StackVisitor::StackVisitor","void",["pointer","pointer","pointer","uint","uint","bool"]],_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEmb:["art::StackVisitor::StackVisitor","void",["pointer","pointer","pointer","uint","size_t","bool"]],_ZN3art12StackVisitor9WalkStackILNS0_16CountTransitionsE0EEEvb:["art::StackVisitor::WalkStack","void",["pointer","bool"]],_ZNK3art12StackVisitor9GetMethodEv:["art::StackVisitor::GetMethod","pointer",["pointer"]],_ZNK3art12StackVisitor16DescribeLocationEv:function(u){this["art::StackVisitor::DescribeLocation"]=Lt(u,["pointer"])},_ZNK3art12StackVisitor24GetCurrentQuickFrameInfoEv:function(u){this["art::StackVisitor::GetCurrentQuickFrameInfo"]=sc(u)},_ZN3art7Context6CreateEv:["art::Context::Create","pointer",[]],_ZN3art6Thread18GetLongJumpContextEv:["art::Thread::GetLongJumpContext","pointer",["pointer"]],_ZN3art6mirror5Class13GetDescriptorEPNSt3__112basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE:function(u){this["art::mirror::Class::GetDescriptor"]=u},_ZN3art6mirror5Class11GetLocationEv:function(u){this["art::mirror::Class::GetLocation"]=Lt(u,["pointer"])},_ZN3art9ArtMethod12PrettyMethodEb:function(u){this["art::ArtMethod::PrettyMethod"]=Lt(u,["pointer","bool"])},_ZN3art12PrettyMethodEPNS_9ArtMethodEb:function(u){this["art::ArtMethod::PrettyMethodNullSafe"]=Lt(u,["pointer","bool"])},_ZN3art6Thread14CurrentFromGdbEv:["art::Thread::CurrentFromGdb","pointer",[]],_ZN3art6mirror6Object5CloneEPNS_6ThreadE:function(u){this["art::mirror::Object::Clone"]=new NativeFunction(u,"pointer",["pointer","pointer"],K)},_ZN3art6mirror6Object5CloneEPNS_6ThreadEm:function(u){let _=new NativeFunction(u,"pointer",["pointer","pointer","pointer"],K);this["art::mirror::Object::Clone"]=function(h,g){let y=NULL;return _(h,g,y)}},_ZN3art6mirror6Object5CloneEPNS_6ThreadEj:function(u){let _=new NativeFunction(u,"pointer",["pointer","pointer","uint"],K);this["art::mirror::Object::Clone"]=function(h,g){return _(h,g,0)}},_ZN3art3Dbg14SetJdwpAllowedEb:["art::Dbg::SetJdwpAllowed","void",["bool"]],_ZN3art3Dbg13ConfigureJdwpERKNS_4JDWP11JdwpOptionsE:["art::Dbg::ConfigureJdwp","void",["pointer"]],_ZN3art31InternalDebuggerControlCallback13StartDebuggerEv:["art::InternalDebuggerControlCallback::StartDebugger","void",["pointer"]],_ZN3art3Dbg9StartJdwpEv:["art::Dbg::StartJdwp","void",[]],_ZN3art3Dbg8GoActiveEv:["art::Dbg::GoActive","void",[]],_ZN3art3Dbg21RequestDeoptimizationERKNS_21DeoptimizationRequestE:["art::Dbg::RequestDeoptimization","void",["pointer"]],_ZN3art3Dbg20ManageDeoptimizationEv:["art::Dbg::ManageDeoptimization","void",[]],_ZN3art15instrumentation15Instrumentation20EnableDeoptimizationEv:["art::Instrumentation::EnableDeoptimization","void",["pointer"]],_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEPKc:["art::Instrumentation::DeoptimizeEverything","void",["pointer","pointer"]],_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEv:function(u){let _=new NativeFunction(u,"void",["pointer"],K);this["art::Instrumentation::DeoptimizeEverything"]=function(h,g){_(h)}},_ZN3art7Runtime19DeoptimizeBootImageEv:["art::Runtime::DeoptimizeBootImage","void",["pointer"]],_ZN3art15instrumentation15Instrumentation10DeoptimizeEPNS_9ArtMethodE:["art::Instrumentation::Deoptimize","void",["pointer","pointer"]],_ZN3art3jni12JniIdManager14DecodeMethodIdEP10_jmethodID:["art::jni::JniIdManager::DecodeMethodId","pointer",["pointer","pointer"]],_ZN3art3jni12JniIdManager13DecodeFieldIdEP9_jfieldID:["art::jni::JniIdManager::DecodeFieldId","pointer",["pointer","pointer"]],_ZN3art11interpreter18GetNterpEntryPointEv:["art::interpreter::GetNterpEntryPoint","pointer",[]],_ZN3art7Monitor17TranslateLocationEPNS_9ArtMethodEjPPKcPi:["art::Monitor::TranslateLocation","void",["pointer","uint32","pointer","pointer"]]},variables:{_ZN3art3Dbg9gRegistryE:function(u){this.isJdwpStarted=()=>!u.readPointer().isNull()},_ZN3art3Dbg15gDebuggerActiveE:function(u){this.isDebuggerActive=()=>!!u.readU8()}},optionals:new Set(["artInterpreterToCompiledCodeBridge","_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadENS_6ObjPtrINS_6mirror6ObjectEEE","_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadEPNS_6mirror6ObjectE","_ZN3art9JavaVMExt12DecodeGlobalEPv","_ZN3art9JavaVMExt12DecodeGlobalEPNS_6ThreadEPv","_ZNK3art6Thread19DecodeGlobalJObjectEP8_jobject","_ZNK3art6Thread13DecodeJObjectEP8_jobject","_ZN3art10ThreadList10SuspendAllEPKcb","_ZN3art10ThreadList10SuspendAllEv","_ZN3art11ClassLinker12VisitClassesEPNS_12ClassVisitorE","_ZN3art11ClassLinker12VisitClassesEPFbPNS_6mirror5ClassEPvES4_","_ZNK3art11ClassLinker17VisitClassLoadersEPNS_18ClassLoaderVisitorE","_ZN3art6mirror6Object5CloneEPNS_6ThreadE","_ZN3art6mirror6Object5CloneEPNS_6ThreadEm","_ZN3art6mirror6Object5CloneEPNS_6ThreadEj","_ZN3art22IndirectReferenceTable3AddEjPNS_6mirror6ObjectE","_ZN3art22IndirectReferenceTable3AddENS_15IRTSegmentStateENS_6ObjPtrINS_6mirror6ObjectEEE","_ZN3art2gc4Heap12VisitObjectsEPFvPNS_6mirror6ObjectEPvES5_","_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE","_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEbiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE","_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEjb","_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEmb","_ZN3art12StackVisitor9WalkStackILNS0_16CountTransitionsE0EEEvb","_ZNK3art12StackVisitor9GetMethodEv","_ZNK3art12StackVisitor16DescribeLocationEv","_ZNK3art12StackVisitor24GetCurrentQuickFrameInfoEv","_ZN3art7Context6CreateEv","_ZN3art6Thread18GetLongJumpContextEv","_ZN3art6mirror5Class13GetDescriptorEPNSt3__112basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE","_ZN3art6mirror5Class11GetLocationEv","_ZN3art9ArtMethod12PrettyMethodEb","_ZN3art12PrettyMethodEPNS_9ArtMethodEb","_ZN3art3Dbg13ConfigureJdwpERKNS_4JDWP11JdwpOptionsE","_ZN3art31InternalDebuggerControlCallback13StartDebuggerEv","_ZN3art3Dbg15gDebuggerActiveE","_ZN3art15instrumentation15Instrumentation20EnableDeoptimizationEv","_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEPKc","_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEv","_ZN3art7Runtime19DeoptimizeBootImageEv","_ZN3art15instrumentation15Instrumentation10DeoptimizeEPNS_9ArtMethodE","_ZN3art3Dbg9StartJdwpEv","_ZN3art3Dbg8GoActiveEv","_ZN3art3Dbg21RequestDeoptimizationERKNS_21DeoptimizationRequestE","_ZN3art3Dbg20ManageDeoptimizationEv","_ZN3art3Dbg9gRegistryE","_ZN3art3jni12JniIdManager14DecodeMethodIdEP10_jmethodID","_ZN3art3jni12JniIdManager13DecodeFieldIdEP9_jfieldID","_ZN3art11interpreter18GetNterpEntryPointEv","_ZN3art7Monitor17TranslateLocationEPNS_9ArtMethodEjPPKcPi"])}:{functions:{_Z20dvmDecodeIndirectRefP6ThreadP8_jobject:["dvmDecodeIndirectRef","pointer",["pointer","pointer"]],_Z15dvmUseJNIBridgeP6MethodPv:["dvmUseJNIBridge","void",["pointer","pointer"]],_Z20dvmHeapSourceGetBasev:["dvmHeapSourceGetBase","pointer",[]],_Z21dvmHeapSourceGetLimitv:["dvmHeapSourceGetLimit","pointer",[]],_Z16dvmIsValidObjectPK6Object:["dvmIsValidObject","uint8",["pointer"]],JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]]},variables:{gDvmJni:function(u){this.gDvmJni=u},gDvm:function(u){this.gDvm=u}}},{functions:i={},variables:l={},optionals:a=new Set}=s,c=[];for(let[u,_]of Object.entries(i)){let h=o.find(u);h!==null?typeof _=="function"?_.call(o,h):o[_[0]]=new NativeFunction(h,_[1],_[2],K):a.has(u)||c.push(u)}for(let[u,_]of Object.entries(l)){let h=o.find(u);h!==null?_.call(o,h):a.has(u)||c.push(u)}if(c.length>0)throw new Error("Java API only partially available; please file a bug. Missing: "+c.join(", "));let d=Memory.alloc(v),p=Memory.alloc(Oa);if(ue("JNI_GetCreatedJavaVMs",o.JNI_GetCreatedJavaVMs(d,1,p)),p.readInt()===0)return null;if(o.vm=d.readPointer(),r){let u=te(),_;u>=27?_=33554432:u>=24?_=16777216:_=0,o.kAccCompileDontBother=_;let h=o.vm.add(v).readPointer();o.artRuntime=h;let g=yo(o),y=g.offset,E=y.instrumentation;o.artInstrumentation=E!==null?h.add(E):null,Hn()>=36e7&&o.artInstrumentation!=null&&(o.artInstrumentation=o.artInstrumentation.readPointer()),o.artHeap=h.add(y.heap).readPointer(),o.artThreadList=h.add(y.threadList).readPointer();let T=h.add(y.classLinker).readPointer(),M=Gl(h,g).offset,O=T.add(M.quickResolutionTrampoline).readPointer(),k=T.add(M.quickImtConflictTrampoline).readPointer(),N=T.add(M.quickGenericJniTrampoline).readPointer(),S=T.add(M.quickToInterpreterBridgeTrampoline).readPointer();o.artClassLinker={address:T,quickResolutionTrampoline:O,quickImtConflictTrampoline:k,quickGenericJniTrampoline:N,quickToInterpreterBridgeTrampoline:S};let L=new Ce(o);o.artQuickGenericJniTrampoline=Nn(N,L),o.artQuickToInterpreterBridge=Nn(S,L),o.artQuickResolutionTrampoline=Nn(O,L),o["art::JavaVMExt::AddGlobalRef"]===void 0&&(o["art::JavaVMExt::AddGlobalRef"]=Uc(o)),o["art::JavaVMExt::DecodeGlobal"]===void 0&&(o["art::JavaVMExt::DecodeGlobal"]=Bc(o)),o["art::ArtMethod::PrettyMethod"]===void 0&&(o["art::ArtMethod::PrettyMethod"]=o["art::ArtMethod::PrettyMethodNullSafe"]),o["art::interpreter::GetNterpEntryPoint"]!==void 0?o.artNterpEntryPoint=o["art::interpreter::GetNterpEntryPoint"]():o.artNterpEntryPoint=o.find("ExecuteNterpImpl"),se=cc(o,L),Gc(o);let j=null;Object.defineProperty(o,"jvmti",{get(){return j===null&&(j=[Tl(L,this.artRuntime)]),j[0]}})}let f=e.enumerateImports().filter(u=>u.name.indexOf("_Z")===0).reduce((u,_)=>(u[_.name]=_.address,u),{});return o.$new=new NativeFunction(f._Znwm||f._Znwj,"pointer",["ulong"],K),o.$delete=new NativeFunction(f._ZdlPv,"void",["pointer"],K),Eo=r?zn:Jn,o}function Tl(t,e){let n=null;return t.perform(()=>{let r=V().find("_ZN3art7Runtime18EnsurePluginLoadedEPKcPNSt3__112basic_stringIcNS3_11char_traitsIcEENS3_9allocatorIcEEEE");if(r===null)return;let o=new NativeFunction(r,"bool",["pointer","pointer","pointer"]),s=Memory.alloc(v);if(!o(e,Memory.allocUtf8String("libopenjdkjvmti.so"),s))return;let l=vt.v1_2|1073741824,a=t.tryGetEnvHandle(l);if(a===null)return;n=new xe(a,t);let c=Memory.alloc(8);c.writeU64(St.canTagObjects),n.addCapabilities(c)!==0&&(n=null)}),n}function Ll(t,e){V().flavor==="art"&&t.getClassName(e)}function xl(t){return{offset:v===4?{globalsLock:32,globals:72}:{globalsLock:64,globals:112}}}function Nl(t){let e=t.vm,n=t.artRuntime,r=v===4?200:384,o=r+100*v,s=te(),i=bo(),{isApiLevel34OrApexEquivalent:l}=t,a=null;for(let d=r;d!==o;d+=v)if(n.add(d).readPointer().equals(e)){let f,u=null;s>=33||i==="Tiramisu"||l?(f=[d-4*v],u=d-v):s>=30||i==="R"?(f=[d-3*v,d-4*v],u=d-v):s>=29?f=[d-2*v]:s>=27?f=[d-ct-3*v]:f=[d-ct-2*v];for(let _ of f){let h=_-v,g=h-v,y;l?y=g-9*v:s>=24?y=g-8*v:s>=23?y=g-7*v:y=g-4*v;let E={offset:{heap:y,threadList:g,internTable:h,classLinker:_,jniIdManager:u}};if(So(n,E)!==null){a=E;break}}break}if(a===null)throw new Error("Unable to determine Runtime field offsets");let c=Hn()>=36e7;return a.offset.instrumentation=c?Pl(t):Ml(t),a.offset.jniIdsIndirection=Bl(t),a}var kl={ia32:so,x64:so,arm:jl,arm64:Ol};function Ml(t){let e=t["art::Runtime::DeoptimizeBootImage"];return e===void 0?null:Ne(e,kl[Process.arch],{limit:30})}function so(t){if(t.mnemonic!=="lea")return null;let e=t.operands[1].value.disp;return e<256||e>1024?null:e}function jl(t){if(t.mnemonic!=="add.w")return null;let e=t.operands;if(e.length!==3)return null;let n=e[2];return n.type!=="imm"?null:n.value}function Ol(t){if(t.mnemonic!=="add")return null;let e=t.operands;if(e.length!==3||e[0].value==="sp"||e[1].value==="sp")return null;let n=e[2];if(n.type!=="imm")return null;let r=n.value.valueOf();return r<256||r>1024?null:r}var Rl={ia32:io,x64:io,arm:Fl,arm64:Dl};function Pl(t){let e=t["art::Runtime::DeoptimizeBootImage"];return e===void 0?null:Ne(e,Rl[Process.arch],{limit:30})}function io(t){if(t.mnemonic!=="mov")return null;let e=t.operands;if(e[0].value!=="rax")return null;let r=e[1];if(r.type!=="mem")return null;let o=r.value;if(o.base!=="rdi")return null;let s=o.disp;return s<256||s>1024?null:s}function Fl(t){return null}function Dl(t){if(t.mnemonic!=="ldr")return null;let e=t.operands;if(e[0].value==="x0")return null;let n=e[1].value;if(n.base!=="x0")return null;let r=n.disp;return r<256||r>1024?null:r}var Ul={ia32:ao,x64:ao,arm:zl,arm64:Jl};function Bl(t){let e=t.find("_ZN3art7Runtime12SetJniIdTypeENS_9JniIdTypeE");if(e===null)return null;let n=Ne(e,Ul[Process.arch],{limit:20});if(n===null)throw new Error("Unable to determine Runtime.jni_ids_indirection_ offset");return n}function ao(t){return t.mnemonic==="cmp"?t.operands[0].value.disp:null}function zl(t){return t.mnemonic==="ldr.w"?t.operands[1].value.disp:null}function Jl(t,e){if(e===null)return null;let{mnemonic:n}=t,{mnemonic:r}=e;return n==="cmp"&&r==="ldr"||n==="bl"&&r==="str"?e.operands[1].value.disp:null}function Vl(){let e={"4-21":136,"4-22":136,"4-23":172,"4-24":196,"4-25":196,"4-26":196,"4-27":196,"4-28":212,"4-29":172,"4-30":180,"4-31":180,"8-21":224,"8-22":224,"8-23":296,"8-24":344,"8-25":344,"8-26":352,"8-27":352,"8-28":392,"8-29":328,"8-30":336,"8-31":336}[`${v}-${te()}`];if(e===void 0)throw new Error("Unable to determine Instrumentation field offsets");return{offset:{forcedInterpretOnly:4,deoptimizationEnabled:e}}}function Gl(t,e){let n=So(t,e);if(n===null)throw new Error("Unable to determine ClassLinker field offsets");return n}function So(t,e){if(Tn!==null)return Tn;let{classLinker:n,internTable:r}=e.offset,o=t.add(n).readPointer(),s=t.add(r).readPointer(),i=v===4?100:200,l=i+100*v,a=te(),c=null;for(let d=i;d!==l;d+=v)if(o.add(d).readPointer().equals(s)){let f;a>=30||bo()==="R"?f=6:a>=29?f=4:a>=23?f=3:f=5;let u=d+f*v,_;a>=23?_=u-2*v:_=u-3*v,c={offset:{quickResolutionTrampoline:_,quickImtConflictTrampoline:u-v,quickGenericJniTrampoline:u,quickToInterpreterBridgeTrampoline:u+v}};break}return c!==null&&(Tn=c),c}function qn(t){let n=null;return t.perform(r=>{let o=Ft(t),s=me(t),i={artArrayLengthSize:4,artArrayEntrySize:o.size,artArrayMax:50},l={artArrayLengthSize:v,artArrayEntrySize:s.size,artArrayMax:100},a=(f,u,_)=>{let h=f.add(u).readPointer();if(h.isNull())return null;let g=_===4?h.readU32():h.readU64().valueOf();return g<=0?null:{length:g,data:h.add(_)}},c=(f,u,_,h)=>{try{let g=a(f,u,h.artArrayLengthSize);if(g===null)return!1;let y=Math.min(g.length,h.artArrayMax);for(let E=0;E!==y;E++)if(g.data.add(E*h.artArrayEntrySize).equals(_))return!0}catch{}return!1},d=r.findClass("java/lang/Thread"),p=r.newGlobalRef(d);try{let f;Ee(t,r,N=>{f=V()["art::JavaVMExt::DecodeGlobal"](t,N,p)});let u=uo(r.getFieldId(p,"name","Ljava/lang/String;")),_=uo(r.getStaticFieldId(p,"MAX_PRIORITY","I")),h=-1,g=-1;for(let N=0;N!==256;N+=4)h===-1&&c(f,N,_,i)&&(h=N),g===-1&&c(f,N,u,i)&&(g=N);if(g===-1||h===-1)throw new Error("Unable to find fields in java/lang/Thread; please file a bug");let y=g!==h?h:0,E=g,C=-1,T=tr(r.getMethodId(p,"getName","()Ljava/lang/String;"));for(let N=0;N!==256;N+=4)C===-1&&c(f,N,T,l)&&(C=N);if(C===-1)throw new Error("Unable to find methods in java/lang/Thread; please file a bug");let M=-1,k=a(f,C,l.artArrayLengthSize).length;for(let N=C;N!==256;N+=4)if(f.add(N).readU16()===k){M=N;break}if(M===-1)throw new Error("Unable to find copied methods in java/lang/Thread; please file a bug");n={offset:{ifields:E,methods:C,sfields:y,copiedMethodsOffset:M}}}finally{r.deleteLocalRef(d),r.deleteGlobalRef(p)}}),n}function $l(t){let e=V(),n;return t.perform(r=>{let o=r.findClass("android/os/Process"),s=tr(r.getStaticMethodId(o,"getElapsedCpuTime","()J"));r.deleteLocalRef(o);let i=Process.getModuleByName("libandroid_runtime.so"),l=i.base,a=l.add(i.size),c=te(),d=c<=21?8:v,p=Ua|Ba|za|xt,f=~(mo|Za|Ha)>>>0,u=null,_=null,h=2;for(let E=0;E!==64&&h!==0;E+=4){let C=s.add(E);if(u===null){let T=C.readPointer();T.compare(l)>=0&&T.compare(a)<0&&(u=E,h--)}_===null&&(C.readU32()&f)===p&&(_=E,h--)}if(h!==0)throw new Error("Unable to determine ArtMethod field offsets");let g=u+d;n={size:c<=21?g+32:g+v,offset:{jniCode:u,quickCode:g,accessFlags:_}},"artInterpreterToCompiledCodeBridge"in e&&(n.offset.interpreterCode=u-d)}),n}function Ft(t){let e=te();return e>=23?{size:16,offset:{accessFlags:4}}:e>=21?{size:24,offset:{accessFlags:12}}:null}function Hl(t){let e=te(),n;return t.perform(r=>{let o=Dt(r),s=r.handle,i=null,l=null,a=null,c=null,d=null,p=null;for(let f=144;f!==256;f+=v)if(o.add(f).readPointer().equals(s)){l=f-6*v,d=f-4*v,p=f+2*v,e<=22&&(l-=v,i=l-v-9*8-3*4,a=f+6*v,d-=v,p-=v),c=f+9*v,e<=22&&(c+=2*v+4,v===8&&(c+=4)),e>=23&&(c+=v);break}if(c===null)throw new Error("Unable to determine ArtThread field offsets");n={offset:{isExceptionReportedToInstrumentation:i,exception:l,throwLocation:a,topHandleScope:c,managedStack:d,self:p}}}),n}function Zl(){return te()>=23?{offset:{topQuickFrame:0,link:v}}:{offset:{topQuickFrame:2*v,link:0}}}var ql={ia32:lo,x64:lo,arm:Wl,arm64:Kl};function Nn(t,e){let n;return e.perform(r=>{let o=Dt(r),s=ql[Process.arch],i=Instruction.parse(t),l=s(i);l!==null?n=o.add(l).readPointer():n=t}),n}function lo(t){return t.mnemonic==="jmp"?t.operands[0].value.disp:null}function Wl(t){return t.mnemonic==="ldr.w"?t.operands[1].value.disp:null}function Kl(t){return t.mnemonic==="ldr"?t.operands[1].value.disp:null}function Dt(t){return t.handle.add(v).readPointer()}function Ql(){return Wn("ro.build.version.release")}function Xl(){return Wn("ro.build.version.codename")}function Yl(){return parseInt(Wn("ro.build.version.sdk"),10)}function ec(){try{let t=File.readAllText("/proc/self/mountinfo"),e=null,n=new Map;for(let o of t.trimEnd().split(`
`)){let s=o.split(" "),i=s[4];if(!i.startsWith("/apex/com.android.art"))continue;let l=s[10];i.includes("@")?n.set(l,i.split("@")[1]):e=l}let r=n.get(e);return r!==void 0?parseInt(r):co()}catch{return co()}}function co(){return te()*1e7}var kn=null,tc=92;function Wn(t){kn===null&&(kn=new NativeFunction(Process.getModuleByName("libc.so").getExportByName("__system_property_get"),"int",["pointer","pointer"],K));let e=Memory.alloc(tc);return kn(Memory.allocUtf8String(t),e),e.readUtf8String()}function Ee(t,e,n){let r=Sl(t,e),o=Dt(e).toString();if(it[o]=n,r(e.handle),it[o]!==void 0)throw delete it[o],new Error("Unable to perform state transition; please file a bug")}function nc(t,e){let n=new NativeCallback(rc,"void",["pointer"]);return Co(t,e,n)}function rc(t){let e=t.toString(),n=it[e];delete it[e],n(t)}function Kn(t){let e=V(),n=e.artThreadList;e["art::ThreadList::SuspendAll"](n,Memory.allocUtf8String("frida"),!1?1:0);try{t()}finally{e["art::ThreadList::ResumeAll"](n)}}var Pn=class{constructor(e){let n=Memory.alloc(4*v),r=n.add(v);n.writePointer(r);let o=new NativeCallback((s,i)=>e(i)===!0?1:0,"bool",["pointer","pointer"]);r.add(2*v).writePointer(o),this.handle=n,this._onVisit=o}};function Qn(t){return V()["art::ClassLinker::VisitClasses"]instanceof NativeFunction?new Pn(t):new NativeCallback(n=>t(n)===!0?1:0,"bool",["pointer","pointer"])}var Fn=class{constructor(e){let n=Memory.alloc(4*v),r=n.add(v);n.writePointer(r);let o=new NativeCallback((s,i)=>{e(i)},"void",["pointer","pointer"]);r.add(2*v).writePointer(o),this.handle=n,this._onVisit=o}};function Xn(t){return new Fn(t)}var oc={"include-inlined-frames":0,"skip-inlined-frames":1},Dn=class{constructor(e,n,r,o=0,s=!0){let i=V(),l=512,a=3*v,c=Memory.alloc(l+a);i["art::StackVisitor::StackVisitor"](c,e,n,oc[r],o,s?1:0);let d=c.add(l);c.writePointer(d);let p=new NativeCallback(this._visitFrame.bind(this),"bool",["pointer"]);d.add(2*v).writePointer(p),this.handle=c,this._onVisitFrame=p;let f=c.add(v===4?12:24);this._curShadowFrame=f,this._curQuickFrame=f.add(v),this._curQuickFramePc=f.add(2*v),this._curOatQuickMethodHeader=f.add(3*v),this._getMethodImpl=i["art::StackVisitor::GetMethod"],this._descLocImpl=i["art::StackVisitor::DescribeLocation"],this._getCQFIImpl=i["art::StackVisitor::GetCurrentQuickFrameInfo"]}walkStack(e=!1){V()["art::StackVisitor::WalkStack"](this.handle,e?1:0)}_visitFrame(){return this.visitFrame()?1:0}visitFrame(){throw new Error("Subclass must implement visitFrame")}getMethod(){let e=this._getMethodImpl(this.handle);return e.isNull()?null:new kt(e)}getCurrentQuickFramePc(){return this._curQuickFramePc.readPointer()}getCurrentQuickFrame(){return this._curQuickFrame.readPointer()}getCurrentShadowFrame(){return this._curShadowFrame.readPointer()}describeLocation(){let e=new Ot;return this._descLocImpl(e,this.handle),e.disposeToString()}getCurrentOatQuickMethodHeader(){return this._curOatQuickMethodHeader.readPointer()}getCurrentQuickFrameInfo(){return this._getCQFIImpl(this.handle)}},kt=class{constructor(e){this.handle=e}prettyMethod(e=!0){let n=new Ot;return V()["art::ArtMethod::PrettyMethod"](n,this.handle,e?1:0),n.disposeToString()}toString(){return`ArtMethod(handle=${this.handle})`}};function sc(t){return function(e){let n=Memory.alloc(12);return wl(t)(n,e),{frameSizeInBytes:n.readU32(),coreSpillMask:n.add(4).readU32(),fpSpillMask:n.add(8).readU32()}}}function ic(t){let e=NULL;switch(Process.arch){case"ia32":e=qe(32,n=>{n.putMovRegRegOffsetPtr("ecx","esp",4),n.putMovRegRegOffsetPtr("edx","esp",8),n.putCallAddressWithArguments(t,["ecx","edx"]),n.putMovRegReg("esp","ebp"),n.putPopReg("ebp"),n.putRet()});break;case"x64":e=qe(32,n=>{n.putPushReg("rdi"),n.putCallAddressWithArguments(t,["rsi"]),n.putPopReg("rdi"),n.putMovRegPtrReg("rdi","rax"),n.putMovRegOffsetPtrReg("rdi",8,"edx"),n.putRet()});break;case"arm":e=qe(16,n=>{n.putCallAddressWithArguments(t,["r0","r1"]),n.putPopRegs(["r0","lr"]),n.putMovRegReg("pc","lr")});break;case"arm64":e=qe(64,n=>{n.putPushRegReg("x0","lr"),n.putCallAddressWithArguments(t,["x1"]),n.putPopRegReg("x2","lr"),n.putStrRegRegOffset("x0","x2",0),n.putStrRegRegOffset("w1","x2",8),n.putRet()});break}return new NativeFunction(e,"void",["pointer","pointer"],K)}var ac={ia32:globalThis.X86Relocator,x64:globalThis.X86Relocator,arm:globalThis.ThumbRelocator,arm64:globalThis.Arm64Relocator},Un={ia32:globalThis.X86Writer,x64:globalThis.X86Writer,arm:globalThis.ThumbWriter,arm64:globalThis.Arm64Writer};function qe(t,e){Ln===null&&(Ln=Memory.alloc(Process.pageSize));let n=Ln.add(no),r=Process.arch,o=Un[r];return Memory.patchCode(n,t,s=>{let i=new o(s,{pc:n});if(e(i),i.flush(),i.offset>t)throw new Error(`Wrote ${i.offset}, exceeding maximum of ${t}`)}),no+=t,r==="arm"?n.or(1):n}function lc(t,e){dc(e),_c(e)}function cc(t,e){let n=We(e).offset,r=vl().offset,o=`
#include <gum/guminterceptor.h>

extern GMutex lock;
extern GHashTable * methods;
extern GHashTable * replacements;
extern gpointer last_seen_art_method;

extern gpointer get_oat_quick_method_header_impl (gpointer method, gpointer pc);

void
init (void)
{
  g_mutex_init (&lock);
  methods = g_hash_table_new_full (NULL, NULL, NULL, NULL);
  replacements = g_hash_table_new_full (NULL, NULL, NULL, NULL);
}

void
finalize (void)
{
  g_hash_table_unref (replacements);
  g_hash_table_unref (methods);
  g_mutex_clear (&lock);
}

gboolean
is_replacement_method (gpointer method)
{
  gboolean is_replacement;

  g_mutex_lock (&lock);

  is_replacement = g_hash_table_contains (replacements, method);

  g_mutex_unlock (&lock);

  return is_replacement;
}

gpointer
get_replacement_method (gpointer original_method)
{
  gpointer replacement_method;

  g_mutex_lock (&lock);

  replacement_method = g_hash_table_lookup (methods, original_method);

  g_mutex_unlock (&lock);

  return replacement_method;
}

void
set_replacement_method (gpointer original_method,
                        gpointer replacement_method)
{
  g_mutex_lock (&lock);

  g_hash_table_insert (methods, original_method, replacement_method);
  g_hash_table_insert (replacements, replacement_method, original_method);

  g_mutex_unlock (&lock);
}

void
synchronize_replacement_methods (guint quick_code_offset,
                                 void * nterp_entrypoint,
                                 void * quick_to_interpreter_bridge)
{
  GHashTableIter iter;
  gpointer hooked_method, replacement_method;

  g_mutex_lock (&lock);

  g_hash_table_iter_init (&iter, methods);
  while (g_hash_table_iter_next (&iter, &hooked_method, &replacement_method))
  {
    void ** quick_code;

    *((uint32_t *) replacement_method) = *((uint32_t *) hooked_method);

    quick_code = hooked_method + quick_code_offset;
    if (*quick_code == nterp_entrypoint)
      *quick_code = quick_to_interpreter_bridge;
  }

  g_mutex_unlock (&lock);
}

void
delete_replacement_method (gpointer original_method)
{
  gpointer replacement_method;

  g_mutex_lock (&lock);

  replacement_method = g_hash_table_lookup (methods, original_method);
  if (replacement_method != NULL)
  {
    g_hash_table_remove (methods, original_method);
    g_hash_table_remove (replacements, replacement_method);
  }

  g_mutex_unlock (&lock);
}

gpointer
translate_method (gpointer method)
{
  gpointer translated_method;

  g_mutex_lock (&lock);

  translated_method = g_hash_table_lookup (replacements, method);

  g_mutex_unlock (&lock);

  return (translated_method != NULL) ? translated_method : method;
}

gpointer
find_replacement_method_from_quick_code (gpointer method,
                                         gpointer thread)
{
  gpointer replacement_method;
  gpointer managed_stack;
  gpointer top_quick_frame;
  gpointer link_managed_stack;
  gpointer * link_top_quick_frame;

  replacement_method = get_replacement_method (method);
  if (replacement_method == NULL)
    return NULL;

  /*
   * Stack check.
   *
   * Return NULL to indicate that the original method should be invoked, otherwise
   * return a pointer to the replacement ArtMethod.
   *
   * If the caller is our own JNI replacement stub, then a stack transition must
   * have been pushed onto the current thread's linked list.
   *
   * Therefore, we invoke the original method if the following conditions are met:
   *   1- The current managed stack is empty.
   *   2- The ArtMethod * inside the linked managed stack's top quick frame is the
   *      same as our replacement.
   */
  managed_stack = thread + ${n.managedStack};
  top_quick_frame = *((gpointer *) (managed_stack + ${r.topQuickFrame}));
  if (top_quick_frame != NULL)
    return replacement_method;

  link_managed_stack = *((gpointer *) (managed_stack + ${r.link}));
  if (link_managed_stack == NULL)
    return replacement_method;

  link_top_quick_frame = GSIZE_TO_POINTER (*((gsize *) (link_managed_stack + ${r.topQuickFrame})) & ~((gsize) 1));
  if (link_top_quick_frame == NULL || *link_top_quick_frame != replacement_method)
    return replacement_method;

  return NULL;
}

void
on_interpreter_do_call (GumInvocationContext * ic)
{
  gpointer method, replacement_method;

  method = gum_invocation_context_get_nth_argument (ic, 0);

  replacement_method = get_replacement_method (method);
  if (replacement_method != NULL)
    gum_invocation_context_replace_nth_argument (ic, 0, replacement_method);
}

gpointer
on_art_method_get_oat_quick_method_header (gpointer method,
                                           gpointer pc)
{
  if (is_replacement_method (method))
    return NULL;

  return get_oat_quick_method_header_impl (method, pc);
}

void
on_art_method_pretty_method (GumInvocationContext * ic)
{
  const guint this_arg_index = ${Process.arch==="arm64"?0:1};
  gpointer method;

  method = gum_invocation_context_get_nth_argument (ic, this_arg_index);
  if (method == NULL)
    gum_invocation_context_replace_nth_argument (ic, this_arg_index, last_seen_art_method);
  else
    last_seen_art_method = method;
}

void
on_leave_gc_concurrent_copying_copying_phase (GumInvocationContext * ic)
{
  GHashTableIter iter;
  gpointer hooked_method, replacement_method;

  g_mutex_lock (&lock);

  g_hash_table_iter_init (&iter, methods);
  while (g_hash_table_iter_next (&iter, &hooked_method, &replacement_method))
    *((uint32_t *) replacement_method) = *((uint32_t *) hooked_method);

  g_mutex_unlock (&lock);
}
`,s=8,i=v,l=v,a=v,d=Memory.alloc(s+i+l+a),p=d.add(s),f=p.add(i),u=f.add(l),_=t.find(v===4?"_ZN3art9ArtMethod23GetOatQuickMethodHeaderEj":"_ZN3art9ArtMethod23GetOatQuickMethodHeaderEm"),h=new CModule(o,{lock:d,methods:p,replacements:f,last_seen_art_method:u,get_oat_quick_method_header_impl:_??ptr("0xdeadbeef")}),g={exceptions:"propagate",scheduling:"exclusive"};return{handle:h,replacedMethods:{isReplacement:new NativeFunction(h.is_replacement_method,"bool",["pointer"],g),get:new NativeFunction(h.get_replacement_method,"pointer",["pointer"],g),set:new NativeFunction(h.set_replacement_method,"void",["pointer","pointer"],g),synchronize:new NativeFunction(h.synchronize_replacement_methods,"void",["uint","pointer","pointer"],g),delete:new NativeFunction(h.delete_replacement_method,"void",["pointer"],g),translate:new NativeFunction(h.translate_method,"pointer",["pointer"],g),findReplacementFromQuickCode:h.find_replacement_method_from_quick_code},getOatQuickMethodHeaderImpl:_,hooks:{Interpreter:{doCall:h.on_interpreter_do_call},ArtMethod:{getOatQuickMethodHeader:h.on_art_method_get_oat_quick_method_header,prettyMethod:h.on_art_method_pretty_method},Gc:{copyingPhase:{onLeave:h.on_leave_gc_concurrent_copying_copying_phase},runFlip:{onEnter:h.on_leave_gc_concurrent_copying_copying_phase}}}}}function dc(t){oo||(oo=!0,uc(t),pc(),fc(),hc())}function uc(t){let e=V();[e.artQuickGenericJniTrampoline,e.artQuickToInterpreterBridge,e.artQuickResolutionTrampoline].forEach(r=>{Memory.protect(r,32,"rwx");let o=new jt(r);o.activate(t),vo.push(o)})}function pc(){let t=V(),e=te(),{isApiLevel34OrApexEquivalent:n}=t,r;if(e<=22)r=/^_ZN3art11interpreter6DoCallILb[0-1]ELb[0-1]EEEbPNS_6mirror9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtPNS_6JValueE$/;else if(e<=33&&!n)r=/^_ZN3art11interpreter6DoCallILb[0-1]ELb[0-1]EEEbPNS_9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtPNS_6JValueE$/;else if(n)r=/^_ZN3art11interpreter6DoCallILb[0-1]EEEbPNS_9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtbPNS_6JValueE$/;else throw new Error("Unable to find method invocation in ART; please file a bug");let o=t.module,s=[...o.enumerateExports(),...o.enumerateSymbols()].filter(i=>r.test(i.name));if(s.length===0)throw new Error("Unable to find method invocation in ART; please file a bug");for(let i of s)Interceptor.attach(i.address,se.hooks.Interpreter.doCall)}function fc(){let t=V(),n=t.module.findSymbolByName("_ZN3art2gc4Heap22CollectGarbageInternalENS0_9collector6GcTypeENS0_7GcCauseEbj");if(n===null)return;let{artNterpEntryPoint:r,artQuickToInterpreterBridge:o}=t,s=me(t.vm).offset.quickCode;Interceptor.attach(n,{onLeave(){se.replacedMethods.synchronize(s,r,o)}})}function hc(){let t=[["_ZN3art11ClassLinker26VisiblyInitializedCallback22MarkVisiblyInitializedEPNS_6ThreadE","e90340f8 : ff0ff0ff"],["_ZN3art11ClassLinker26VisiblyInitializedCallback29AdjustThreadVisibilityCounterEPNS_6ThreadEl","7f0f00f9 : 1ffcffff"]],e=V(),n=e.module;for(let[r,o]of t){let s=n.findSymbolByName(r);if(s===null)continue;let i=Memory.scanSync(s,8192,o);if(i.length===0)return;let{artNterpEntryPoint:l,artQuickToInterpreterBridge:a}=e,c=me(e.vm).offset.quickCode;Interceptor.attach(i[0].address,function(){se.replacedMethods.synchronize(c,l,a)});return}}function _c(t){if(ro)return;if(ro=!0,!gc()){let{getOatQuickMethodHeaderImpl:s}=se;if(s===null)return;try{Interceptor.replace(s,se.hooks.ArtMethod.getOatQuickMethodHeader)}catch{}}let e=te(),n=null,r=V();e>28?n=r.find("_ZN3art2gc9collector17ConcurrentCopying12CopyingPhaseEv"):e>22&&(n=r.find("_ZN3art2gc9collector17ConcurrentCopying12MarkingPhaseEv")),n!==null&&Interceptor.attach(n,se.hooks.Gc.copyingPhase);let o=null;o=r.find("_ZN3art6Thread15RunFlipFunctionEPS0_"),o===null&&(o=r.find("_ZN3art6Thread15RunFlipFunctionEPS0_b")),o!==null&&Interceptor.attach(o,se.hooks.Gc.runFlip)}var mc={arm:{signatures:[{pattern:["b0 68","01 30","0c d0","1b 98",":","c0 ff","c0 ff","00 ff","00 2f"],validateMatch:Mn},{pattern:["d8 f8 08 00","01 30","0c d0","1b 98",":","f0 ff ff 0f","ff ff","00 ff","00 2f"],validateMatch:Mn},{pattern:["b0 68","01 30","40 f0 c3 80","00 25",":","c0 ff","c0 ff","c0 fb 00 d0","ff f8"],validateMatch:Mn}],instrument:bc},arm64:{signatures:[{pattern:["0a 40 b9","1f 05 00 31","40 01 00 54","88 39 00 f0",":","fc ff ff","1f fc ff ff","1f 00 00 ff","00 00 00 9f"],offset:1,validateMatch:jn},{pattern:["0a 40 b9","1f 05 00 31","40 01 00 54","00 0e 40 f9",":","fc ff ff","1f fc ff ff","1f 00 00 ff","00 fc ff ff"],offset:1,validateMatch:jn},{pattern:["0a 40 b9","1f 05 00 31","01 34 00 54","e0 03 1f aa",":","fc ff ff","1f fc ff ff","1f 00 00 ff","e0 ff ff ff"],offset:1,validateMatch:jn}],instrument:Ec}};function Mn({address:t,size:e}){let n=Instruction.parse(t.or(1)),[r,o]=n.operands,s=o.value.base,i=r.value,l=Instruction.parse(n.next.add(2)),a=ptr(l.operands[0].value),c=l.address.add(l.size),d,p;return l.mnemonic==="beq"?(d=c,p=a):(d=a,p=c),Ne(d.or(1),f,{limit:3});function f(u){let{mnemonic:_}=u;if(!(_==="ldr"||_==="ldr.w"))return null;let{base:h,disp:g}=u.operands[1].value;return h===s&&g===20?{methodReg:s,scratchReg:i,target:{whenTrue:a,whenRegularMethod:d,whenRuntimeMethod:p}}:null}}function jn({address:t,size:e}){let[n,r]=Instruction.parse(t).operands,o=r.value.base,s="x"+n.value.substring(1),i=Instruction.parse(t.add(8)),l=ptr(i.operands[0].value),a=t.add(12),c,d;return i.mnemonic==="b.eq"?(c=a,d=l):(c=l,d=a),Ne(c,p,{limit:3});function p(f){if(f.mnemonic!=="ldr")return null;let{base:u,disp:_}=f.operands[1].value;return u===o&&_===24?{methodReg:o,scratchReg:s,target:{whenTrue:l,whenRegularMethod:c,whenRuntimeMethod:d}}:null}}function gc(){if(te()<31)return!1;let t=mc[Process.arch];if(t===void 0)return!1;let e=t.signatures.map(({pattern:r,offset:o=0,validateMatch:s=yc})=>({pattern:new MatchPattern(r.join("")),offset:o,validateMatch:s})),n=[];for(let{base:r,size:o}of V().module.enumerateRanges("--x"))for(let{pattern:s,offset:i,validateMatch:l}of e){let a=Memory.scanSync(r,o,s).map(({address:c,size:d})=>({address:c.sub(i),size:d+i})).filter(c=>{let d=l(c);return d===null?!1:(c.validationResult=d,!0)});n.push(...a)}return n.length===0?!1:(n.forEach(t.instrument),!0)}function yc(){return{}}var Mt=class{constructor(e,n,r){this.address=e,this.size=n,this.originalCode=e.readByteArray(n),this.trampoline=r}revert(){Memory.patchCode(this.address,this.size,e=>{e.writeByteArray(this.originalCode)})}};function bc({address:t,size:e,validationResult:n}){let{methodReg:r,target:o}=n,s=Memory.alloc(Process.pageSize),i=e;Memory.patchCode(s,256,l=>{let a=new ThumbWriter(l,{pc:s}),c=new ThumbRelocator(t,a);for(let _=0;_!==2;_++)c.readOne();c.writeAll(),c.readOne(),c.skipOne(),a.putBCondLabel("eq","runtime_or_replacement_method");let d=[45,237,16,10];a.putBytes(d);let p=["r0","r1","r2","r3"];a.putPushRegs(p),a.putCallAddressWithArguments(se.replacedMethods.isReplacement,[r]),a.putCmpRegImm("r0",0),a.putPopRegs(p);let f=[189,236,16,10];a.putBytes(f),a.putBCondLabel("ne","runtime_or_replacement_method"),a.putBLabel("regular_method"),c.readOne();let u=c.input.address.equals(o.whenRegularMethod);for(a.putLabel(u?"regular_method":"runtime_or_replacement_method"),c.writeOne();i<10;){let _=c.readOne();if(_===0){i=10;break}i=_}c.writeAll(),a.putBranchAddress(t.add(i+1)),a.putLabel(u?"runtime_or_replacement_method":"regular_method"),a.putBranchAddress(o.whenTrue),a.flush()}),Zn.push(new Mt(t,i,s)),Memory.patchCode(t,i,l=>{let a=new ThumbWriter(l,{pc:t});a.putLdrRegAddress("pc",s.or(1)),a.flush()})}function Ec({address:t,size:e,validationResult:n}){let{methodReg:r,scratchReg:o,target:s}=n,i=Memory.alloc(Process.pageSize);Memory.patchCode(i,256,l=>{let a=new Arm64Writer(l,{pc:i}),c=new Arm64Relocator(t,a);for(let _=0;_!==2;_++)c.readOne();c.writeAll(),c.readOne(),c.skipOne(),a.putBCondLabel("eq","runtime_or_replacement_method");let d=["d0","d1","d2","d3","d4","d5","d6","d7","x0","x1","x2","x3","x4","x5","x6","x7","x8","x9","x10","x11","x12","x13","x14","x15","x16","x17"],p=d.length;for(let _=0;_!==p;_+=2)a.putPushRegReg(d[_],d[_+1]);a.putCallAddressWithArguments(se.replacedMethods.isReplacement,[r]),a.putCmpRegReg("x0","xzr");for(let _=p-2;_>=0;_-=2)a.putPopRegReg(d[_],d[_+1]);a.putBCondLabel("ne","runtime_or_replacement_method"),a.putBLabel("regular_method"),c.readOne();let f=c.input,u=f.address.equals(s.whenRegularMethod);a.putLabel(u?"regular_method":"runtime_or_replacement_method"),c.writeOne(),a.putBranchAddress(f.next),a.putLabel(u?"runtime_or_replacement_method":"regular_method"),a.putBranchAddress(s.whenTrue),a.flush()}),Zn.push(new Mt(t,e,i)),Memory.patchCode(t,e,l=>{let a=new Arm64Writer(l,{pc:t});a.putLdrRegAddress(o,i),a.putBrReg(o),a.flush()})}function vc(t){return new Eo(t)}function Sc(t){return se.replacedMethods.translate(t)}function Yn(t,e={}){let{limit:n=16}=e,r=t.getEnv();return at===null&&(at=wc(t,r)),at.backtrace(r,n)}function wc(t,e){let n=V(),r=Memory.alloc(Process.pointerSize),o=new CModule(`
#include <glib.h>
#include <stdbool.h>
#include <string.h>
#include <gum/gumtls.h>
#include <json-glib/json-glib.h>

typedef struct _ArtBacktrace ArtBacktrace;
typedef struct _ArtStackFrame ArtStackFrame;

typedef struct _ArtStackVisitor ArtStackVisitor;
typedef struct _ArtStackVisitorVTable ArtStackVisitorVTable;

typedef struct _ArtClass ArtClass;
typedef struct _ArtMethod ArtMethod;
typedef struct _ArtThread ArtThread;
typedef struct _ArtContext ArtContext;

typedef struct _JNIEnv JNIEnv;

typedef struct _StdString StdString;
typedef struct _StdTinyString StdTinyString;
typedef struct _StdLargeString StdLargeString;

typedef enum {
  STACK_WALK_INCLUDE_INLINED_FRAMES,
  STACK_WALK_SKIP_INLINED_FRAMES,
} StackWalkKind;

struct _StdTinyString
{
  guint8 unused;
  gchar data[(3 * sizeof (gpointer)) - 1];
};

struct _StdLargeString
{
  gsize capacity;
  gsize size;
  gchar * data;
};

struct _StdString
{
  union
  {
    guint8 flags;
    StdTinyString tiny;
    StdLargeString large;
  };
};

struct _ArtBacktrace
{
  GChecksum * id;
  GArray * frames;
  gchar * frames_json;
};

struct _ArtStackFrame
{
  ArtMethod * method;
  gsize dexpc;
  StdString description;
};

struct _ArtStackVisitorVTable
{
  void (* unused1) (void);
  void (* unused2) (void);
  bool (* visit) (ArtStackVisitor * visitor);
};

struct _ArtStackVisitor
{
  ArtStackVisitorVTable * vtable;

  guint8 padding[512];

  ArtStackVisitorVTable vtable_storage;

  ArtBacktrace * backtrace;
};

struct _ArtMethod
{
  guint32 declaring_class;
  guint32 access_flags;
};

extern GumTlsKey current_backtrace;

extern void (* perform_art_thread_state_transition) (JNIEnv * env);

extern ArtContext * art_make_context (ArtThread * thread);

extern void art_stack_visitor_init (ArtStackVisitor * visitor, ArtThread * thread, void * context, StackWalkKind walk_kind,
    size_t num_frames, bool check_suspended);
extern void art_stack_visitor_walk_stack (ArtStackVisitor * visitor, bool include_transitions);
extern ArtMethod * art_stack_visitor_get_method (ArtStackVisitor * visitor);
extern void art_stack_visitor_describe_location (StdString * description, ArtStackVisitor * visitor);
extern ArtMethod * translate_method (ArtMethod * method);
extern void translate_location (ArtMethod * method, guint32 pc, const gchar ** source_file, gint32 * line_number);
extern void get_class_location (StdString * result, ArtClass * klass);
extern void cxx_delete (void * mem);
extern unsigned long strtoul (const char * str, char ** endptr, int base);

static bool visit_frame (ArtStackVisitor * visitor);
static void art_stack_frame_destroy (ArtStackFrame * frame);

static void append_jni_type_name (GString * s, const gchar * name, gsize length);

static void std_string_destroy (StdString * str);
static gchar * std_string_get_data (StdString * str);

void
init (void)
{
  current_backtrace = gum_tls_key_new ();
}

void
finalize (void)
{
  gum_tls_key_free (current_backtrace);
}

ArtBacktrace *
_create (JNIEnv * env,
         guint limit)
{
  ArtBacktrace * bt;

  bt = g_new (ArtBacktrace, 1);
  bt->id = g_checksum_new (G_CHECKSUM_SHA1);
  bt->frames = (limit != 0)
      ? g_array_sized_new (FALSE, FALSE, sizeof (ArtStackFrame), limit)
      : g_array_new (FALSE, FALSE, sizeof (ArtStackFrame));
  g_array_set_clear_func (bt->frames, (GDestroyNotify) art_stack_frame_destroy);
  bt->frames_json = NULL;

  gum_tls_key_set_value (current_backtrace, bt);

  perform_art_thread_state_transition (env);

  gum_tls_key_set_value (current_backtrace, NULL);

  return bt;
}

void
_on_thread_state_transition_complete (ArtThread * thread)
{
  ArtContext * context;
  ArtStackVisitor visitor = {
    .vtable_storage = {
      .visit = visit_frame,
    },
  };

  context = art_make_context (thread);

  art_stack_visitor_init (&visitor, thread, context, STACK_WALK_SKIP_INLINED_FRAMES, 0, true);
  visitor.vtable = &visitor.vtable_storage;
  visitor.backtrace = gum_tls_key_get_value (current_backtrace);

  art_stack_visitor_walk_stack (&visitor, false);

  cxx_delete (context);
}

static bool
visit_frame (ArtStackVisitor * visitor)
{
  ArtBacktrace * bt = visitor->backtrace;
  ArtStackFrame frame;
  const gchar * description, * dexpc_part;

  frame.method = art_stack_visitor_get_method (visitor);

  art_stack_visitor_describe_location (&frame.description, visitor);

  description = std_string_get_data (&frame.description);
  if (strstr (description, " '<") != NULL)
    goto skip;

  dexpc_part = strstr (description, " at dex PC 0x");
  if (dexpc_part == NULL)
    goto skip;
  frame.dexpc = strtoul (dexpc_part + 13, NULL, 16);

  g_array_append_val (bt->frames, frame);

  g_checksum_update (bt->id, (guchar *) &frame.method, sizeof (frame.method));
  g_checksum_update (bt->id, (guchar *) &frame.dexpc, sizeof (frame.dexpc));

  return true;

skip:
  std_string_destroy (&frame.description);
  return true;
}

static void
art_stack_frame_destroy (ArtStackFrame * frame)
{
  std_string_destroy (&frame->description);
}

void
_destroy (ArtBacktrace * backtrace)
{
  g_free (backtrace->frames_json);
  g_array_free (backtrace->frames, TRUE);
  g_checksum_free (backtrace->id);
  g_free (backtrace);
}

const gchar *
_get_id (ArtBacktrace * backtrace)
{
  return g_checksum_get_string (backtrace->id);
}

const gchar *
_get_frames (ArtBacktrace * backtrace)
{
  GArray * frames = backtrace->frames;
  JsonBuilder * b;
  guint i;
  JsonNode * root;

  if (backtrace->frames_json != NULL)
    return backtrace->frames_json;

  b = json_builder_new_immutable ();

  json_builder_begin_array (b);

  for (i = 0; i != frames->len; i++)
  {
    ArtStackFrame * frame = &g_array_index (frames, ArtStackFrame, i);
    gchar * description, * ret_type, * paren_open, * paren_close, * arg_types, * token, * method_name, * class_name;
    GString * signature;
    gchar * cursor;
    ArtMethod * translated_method;
    StdString location;
    gsize dexpc;
    const gchar * source_file;
    gint32 line_number;

    description = std_string_get_data (&frame->description);

    ret_type = strchr (description, '\\'') + 1;

    paren_open = strchr (ret_type, '(');
    paren_close = strchr (paren_open, ')');
    *paren_open = '\\0';
    *paren_close = '\\0';

    arg_types = paren_open + 1;

    token = strrchr (ret_type, '.');
    *token = '\\0';

    method_name = token + 1;

    token = strrchr (ret_type, ' ');
    *token = '\\0';

    class_name = token + 1;

    signature = g_string_sized_new (128);

    append_jni_type_name (signature, class_name, method_name - class_name - 1);
    g_string_append_c (signature, ',');
    g_string_append (signature, method_name);
    g_string_append (signature, ",(");

    if (arg_types != paren_close)
    {
      for (cursor = arg_types; cursor != NULL;)
      {
        gsize length;
        gchar * next;

        token = strstr (cursor, ", ");
        if (token != NULL)
        {
          length = token - cursor;
          next = token + 2;
        }
        else
        {
          length = paren_close - cursor;
          next = NULL;
        }

        append_jni_type_name (signature, cursor, length);

        cursor = next;
      }
    }

    g_string_append_c (signature, ')');

    append_jni_type_name (signature, ret_type, class_name - ret_type - 1);

    translated_method = translate_method (frame->method);
    dexpc = (translated_method == frame->method) ? frame->dexpc : 0;

    get_class_location (&location, GSIZE_TO_POINTER (translated_method->declaring_class));

    translate_location (translated_method, dexpc, &source_file, &line_number);

    json_builder_begin_object (b);

    json_builder_set_member_name (b, "signature");
    json_builder_add_string_value (b, signature->str);

    json_builder_set_member_name (b, "origin");
    json_builder_add_string_value (b, std_string_get_data (&location));

    json_builder_set_member_name (b, "className");
    json_builder_add_string_value (b, class_name);

    json_builder_set_member_name (b, "methodName");
    json_builder_add_string_value (b, method_name);

    json_builder_set_member_name (b, "methodFlags");
    json_builder_add_int_value (b, translated_method->access_flags);

    json_builder_set_member_name (b, "fileName");
    json_builder_add_string_value (b, source_file);

    json_builder_set_member_name (b, "lineNumber");
    json_builder_add_int_value (b, line_number);

    json_builder_end_object (b);

    std_string_destroy (&location);
    g_string_free (signature, TRUE);
  }

  json_builder_end_array (b);

  root = json_builder_get_root (b);
  backtrace->frames_json = json_to_string (root, FALSE);
  json_node_unref (root);

  return backtrace->frames_json;
}

static void
append_jni_type_name (GString * s,
                      const gchar * name,
                      gsize length)
{
  gchar shorty = '\\0';
  gsize i;

  switch (name[0])
  {
    case 'b':
      if (strncmp (name, "boolean", length) == 0)
        shorty = 'Z';
      else if (strncmp (name, "byte", length) == 0)
        shorty = 'B';
      break;
    case 'c':
      if (strncmp (name, "char", length) == 0)
        shorty = 'C';
      break;
    case 'd':
      if (strncmp (name, "double", length) == 0)
        shorty = 'D';
      break;
    case 'f':
      if (strncmp (name, "float", length) == 0)
        shorty = 'F';
      break;
    case 'i':
      if (strncmp (name, "int", length) == 0)
        shorty = 'I';
      break;
    case 'l':
      if (strncmp (name, "long", length) == 0)
        shorty = 'J';
      break;
    case 's':
      if (strncmp (name, "short", length) == 0)
        shorty = 'S';
      break;
    case 'v':
      if (strncmp (name, "void", length) == 0)
        shorty = 'V';
      break;
  }

  if (shorty != '\\0')
  {
    g_string_append_c (s, shorty);

    return;
  }

  if (length > 2 && name[length - 2] == '[' && name[length - 1] == ']')
  {
    g_string_append_c (s, '[');
    append_jni_type_name (s, name, length - 2);

    return;
  }

  g_string_append_c (s, 'L');

  for (i = 0; i != length; i++)
  {
    gchar ch = name[i];
    if (ch != '.')
      g_string_append_c (s, ch);
    else
      g_string_append_c (s, '/');
  }

  g_string_append_c (s, ';');
}

static void
std_string_destroy (StdString * str)
{
  bool is_large = (str->flags & 1) != 0;
  if (is_large)
    cxx_delete (str->large.data);
}

static gchar *
std_string_get_data (StdString * str)
{
  bool is_large = (str->flags & 1) != 0;
  return is_large ? str->large.data : str->tiny.data;
}
`,{current_backtrace:Memory.alloc(Process.pointerSize),perform_art_thread_state_transition:r,art_make_context:n["art::Thread::GetLongJumpContext"]??n["art::Context::Create"],art_stack_visitor_init:n["art::StackVisitor::StackVisitor"],art_stack_visitor_walk_stack:n["art::StackVisitor::WalkStack"],art_stack_visitor_get_method:n["art::StackVisitor::GetMethod"],art_stack_visitor_describe_location:n["art::StackVisitor::DescribeLocation"],translate_method:se.replacedMethods.translate,translate_location:n["art::Monitor::TranslateLocation"],get_class_location:n["art::mirror::Class::GetLocation"],cxx_delete:n.$delete,strtoul:Process.getModuleByName("libc.so").getExportByName("strtoul")}),s=new NativeFunction(o._create,"pointer",["pointer","uint"],K),i=new NativeFunction(o._destroy,"void",["pointer"],K),l={exceptions:"propagate",scheduling:"exclusive"},a=new NativeFunction(o._get_id,"pointer",["pointer"],l),c=new NativeFunction(o._get_frames,"pointer",["pointer"],l),d=Co(t,e,o._on_thread_state_transition_complete);o._performData=d,r.writePointer(d),o.backtrace=(f,u)=>{let _=s(f,u),h=new Bn(_);return Script.bindWeak(h,p.bind(null,_)),h};function p(f){i(f)}return o.getId=f=>a(f).readUtf8String(),o.getFrames=f=>JSON.parse(c(f).readUtf8String()),o}var Bn=class{constructor(e){this.handle=e}get id(){return at.getId(this.handle)}get frames(){return at.getFrames(this.handle)}};function er(){Nt.forEach(t=>{t.vtablePtr.writePointer(t.vtable),t.vtableCountPtr.writeS32(t.vtableCount)}),Nt.clear();for(let t of vo.splice(0))t.deactivate();for(let t of Zn.splice(0))t.revert()}function tr(t){return wo(t,"art::jni::JniIdManager::DecodeMethodId")}function uo(t){return wo(t,"art::jni::JniIdManager::DecodeFieldId")}function wo(t,e){let n=V(),r=yo(n).offset,o=r.jniIdManager,s=r.jniIdsIndirection;if(o!==null&&s!==null){let i=n.artRuntime;if(i.add(s).readInt()!==Wa){let a=i.add(o).readPointer();return n[e](a,t)}}return t}var Ic={ia32:Cc,x64:Ac,arm:Tc,arm64:Lc};function Cc(t,e,n,r,o){let s=We(o).offset,i=me(o).offset,l;return Memory.patchCode(t,128,a=>{let c=new X86Writer(a,{pc:t}),d=new X86Relocator(e,c),p=[15,174,4,36],f=[15,174,12,36];c.putPushax(),c.putMovRegReg("ebp","esp"),c.putAndRegU32("esp",4294967280),c.putSubRegImm("esp",512),c.putBytes(p),c.putMovRegFsU32Ptr("ebx",s.self),c.putCallAddressWithAlignedArguments(se.replacedMethods.findReplacementFromQuickCode,["eax","ebx"]),c.putTestRegReg("eax","eax"),c.putJccShortLabel("je","restore_registers","no-hint"),c.putMovRegOffsetPtrReg("ebp",7*4,"eax"),c.putLabel("restore_registers"),c.putBytes(f),c.putMovRegReg("esp","ebp"),c.putPopax(),c.putJccShortLabel("jne","invoke_replacement","no-hint");do l=d.readOne();while(l<n&&!d.eoi);d.writeAll(),d.eoi||c.putJmpAddress(e.add(l)),c.putLabel("invoke_replacement"),c.putJmpRegOffsetPtr("eax",i.quickCode),c.flush()}),l}function Ac(t,e,n,r,o){let s=We(o).offset,i=me(o).offset,l;return Memory.patchCode(t,256,a=>{let c=new X86Writer(a,{pc:t}),d=new X86Relocator(e,c),p=[15,174,4,36],f=[15,174,12,36];c.putPushax(),c.putMovRegReg("rbp","rsp"),c.putAndRegU32("rsp",4294967280),c.putSubRegImm("rsp",512),c.putBytes(p),c.putMovRegGsU32Ptr("rbx",s.self),c.putCallAddressWithAlignedArguments(se.replacedMethods.findReplacementFromQuickCode,["rdi","rbx"]),c.putTestRegReg("rax","rax"),c.putJccShortLabel("je","restore_registers","no-hint"),c.putMovRegOffsetPtrReg("rbp",8*8,"rax"),c.putLabel("restore_registers"),c.putBytes(f),c.putMovRegReg("rsp","rbp"),c.putPopax(),c.putJccShortLabel("jne","invoke_replacement","no-hint");do l=d.readOne();while(l<n&&!d.eoi);d.writeAll(),d.eoi||c.putJmpAddress(e.add(l)),c.putLabel("invoke_replacement"),c.putJmpRegOffsetPtr("rdi",i.quickCode),c.flush()}),l}function Tc(t,e,n,r,o){let s=me(o).offset,i=e.and($n),l;return Memory.patchCode(t,128,a=>{let c=new ThumbWriter(a,{pc:t}),d=new ThumbRelocator(i,c),p=[45,237,16,10],f=[189,236,16,10];c.putPushRegs(["r1","r2","r3","r5","r6","r7","r8","r10","r11","lr"]),c.putBytes(p),c.putSubRegRegImm("sp","sp",8),c.putStrRegRegOffset("r0","sp",0),c.putCallAddressWithArguments(se.replacedMethods.findReplacementFromQuickCode,["r0","r9"]),c.putCmpRegImm("r0",0),c.putBCondLabel("eq","restore_registers"),c.putStrRegRegOffset("r0","sp",0),c.putLabel("restore_registers"),c.putLdrRegRegOffset("r0","sp",0),c.putAddRegRegImm("sp","sp",8),c.putBytes(f),c.putPopRegs(["lr","r11","r10","r8","r7","r6","r5","r3","r2","r1"]),c.putBCondLabel("ne","invoke_replacement");do l=d.readOne();while(l<n&&!d.eoi);d.writeAll(),d.eoi||c.putLdrRegAddress("pc",e.add(l)),c.putLabel("invoke_replacement"),c.putLdrRegRegOffset("pc","r0",s.quickCode),c.flush()}),l}function Lc(t,e,n,{availableScratchRegs:r},o){let s=me(o).offset,i;return Memory.patchCode(t,256,l=>{let a=new Arm64Writer(l,{pc:t}),c=new Arm64Relocator(e,a);a.putPushRegReg("d0","d1"),a.putPushRegReg("d2","d3"),a.putPushRegReg("d4","d5"),a.putPushRegReg("d6","d7"),a.putPushRegReg("x1","x2"),a.putPushRegReg("x3","x4"),a.putPushRegReg("x5","x6"),a.putPushRegReg("x7","x20"),a.putPushRegReg("x21","x22"),a.putPushRegReg("x23","x24"),a.putPushRegReg("x25","x26"),a.putPushRegReg("x27","x28"),a.putPushRegReg("x29","lr"),a.putSubRegRegImm("sp","sp",16),a.putStrRegRegOffset("x0","sp",0),a.putCallAddressWithArguments(se.replacedMethods.findReplacementFromQuickCode,["x0","x19"]),a.putCmpRegReg("x0","xzr"),a.putBCondLabel("eq","restore_registers"),a.putStrRegRegOffset("x0","sp",0),a.putLabel("restore_registers"),a.putLdrRegRegOffset("x0","sp",0),a.putAddRegRegImm("sp","sp",16),a.putPopRegReg("x29","lr"),a.putPopRegReg("x27","x28"),a.putPopRegReg("x25","x26"),a.putPopRegReg("x23","x24"),a.putPopRegReg("x21","x22"),a.putPopRegReg("x7","x20"),a.putPopRegReg("x5","x6"),a.putPopRegReg("x3","x4"),a.putPopRegReg("x1","x2"),a.putPopRegReg("d6","d7"),a.putPopRegReg("d4","d5"),a.putPopRegReg("d2","d3"),a.putPopRegReg("d0","d1"),a.putBCondLabel("ne","invoke_replacement");do i=c.readOne();while(i<n&&!c.eoi);if(c.writeAll(),!c.eoi){let d=Array.from(r)[0];a.putLdrRegAddress(d,e.add(i)),a.putBrReg(d)}a.putLabel("invoke_replacement"),a.putLdrRegRegOffset("x16","x0",s.quickCode),a.putBrReg("x16"),a.flush()}),i}var xc={ia32:po,x64:po,arm:Nc,arm64:kc};function po(t,e,n){Memory.patchCode(t,16,r=>{let o=new X86Writer(r,{pc:t});o.putJmpAddress(e),o.flush()})}function Nc(t,e,n){let r=t.and($n);Memory.patchCode(r,16,o=>{let s=new ThumbWriter(o,{pc:r});s.putLdrRegAddress("pc",e.or(1)),s.flush()})}function kc(t,e,n){Memory.patchCode(t,16,r=>{let o=new Arm64Writer(r,{pc:t});n===16?o.putLdrRegAddress("x16",e):o.putAdrpRegAddress("x16",e),o.putBrReg("x16"),o.flush()})}var Mc={ia32:5,x64:16,arm:8,arm64:16},jt=class{constructor(e){this.quickCode=e,this.quickCodeAddress=Process.arch==="arm"?e.and($n):e,this.redirectSize=0,this.trampoline=null,this.overwrittenPrologue=null,this.overwrittenPrologueLength=0}_canRelocateCode(e,n){let r=Un[Process.arch],o=ac[Process.arch],{quickCodeAddress:s}=this,i=new r(s),l=new o(s,i),a;if(Process.arch==="arm64"){let c=new Set(["x16","x17"]);do{let d=l.readOne(),p=new Set(c),{read:f,written:u}=l.input.regsAccessed;for(let _ of[f,u])for(let h of _){let g;h.startsWith("w")?g="x"+h.substring(1):g=h,p.delete(g)}if(p.size===0)break;a=d,c=p}while(a<e&&!l.eoi);n.availableScratchRegs=c}else do a=l.readOne();while(a<e&&!l.eoi);return a>=e}_allocateTrampoline(){At===null&&(At=ln(v===4?128:256));let e=Mc[Process.arch],n,r,o=1,s={};if(v===4||this._canRelocateCode(e,s))n=e,r={};else{let i;Process.arch==="x64"?(n=5,i=Ka):Process.arch==="arm64"&&(n=8,i=Qa,o=4096),r={near:this.quickCodeAddress,maxDistance:i}}return this.redirectSize=n,this.trampoline=At.allocateSlice(r,o),s}_destroyTrampoline(){At.freeSlice(this.trampoline)}activate(e){let n=this._allocateTrampoline(),{trampoline:r,quickCode:o,redirectSize:s}=this,i=Ic[Process.arch],l=i(r,o,s,n,e);this.overwrittenPrologueLength=l,this.overwrittenPrologue=Memory.dup(this.quickCodeAddress,l);let a=xc[Process.arch];a(o,r,s)}deactivate(){let{quickCodeAddress:e,overwrittenPrologueLength:n}=this,r=Un[Process.arch];Memory.patchCode(e,n,o=>{let s=new r(o,{pc:e}),{overwrittenPrologue:i}=this;s.putBytes(i.readByteArray(n)),s.flush()}),this._destroyTrampoline()}};function jc(t){let e=V(),{module:n,artClassLinker:r}=e;return t.equals(r.quickGenericJniTrampoline)||t.equals(r.quickToInterpreterBridgeTrampoline)||t.equals(r.quickResolutionTrampoline)||t.equals(r.quickImtConflictTrampoline)||t.compare(n.base)>=0&&t.compare(n.base.add(n.size))<0}var zn=class{constructor(e){let n=tr(e);this.methodId=n,this.originalMethod=null,this.hookedMethodId=n,this.replacementMethodId=null,this.interceptor=null}replace(e,n,r,o,s){let{kAccCompileDontBother:i,artNterpEntryPoint:l}=s;this.originalMethod=fo(this.methodId,o);let a=this.originalMethod.accessFlags;if((a&qa)!==0&&Oc()){let u=this.originalMethod.jniCode;this.hookedMethodId=u.add(2*v).readPointer(),this.originalMethod=fo(this.hookedMethodId,o)}let{hookedMethodId:c}=this,d=Pc(c,o);this.replacementMethodId=d,Tt(d,{jniCode:e,accessFlags:(a&~(Va|Ja|Yr)|xt|i)>>>0,quickCode:s.artClassLinker.quickGenericJniTrampoline,interpreterCode:s.artInterpreterToCompiledCodeBridge},o);let p=mo|$a|Yr;(a&xt)===0&&(p|=Ga),Tt(c,{accessFlags:(a&~p|i)>>>0},o);let f=this.originalMethod.quickCode;if(l!==null&&f.equals(l)&&Tt(c,{quickCode:s.artQuickToInterpreterBridge},o),!jc(f)){let u=new jt(f);u.activate(o),this.interceptor=u}se.replacedMethods.set(c,d),lc(c,o)}revert(e){let{hookedMethodId:n,interceptor:r}=this;Tt(n,this.originalMethod,e),se.replacedMethods.delete(n),r!==null&&(r.deactivate(),this.interceptor=null)}resolveTarget(e,n,r,o){return this.hookedMethodId}};function Oc(){return te()<28}function fo(t,e){let r=me(e).offset;return["jniCode","accessFlags","quickCode","interpreterCode"].reduce((o,s)=>{let i=r[s];if(i===void 0)return o;let l=t.add(i),a=s==="accessFlags"?Ra:Pa;return o[s]=a.call(l),o},{})}function Tt(t,e,n){let o=me(n).offset;Object.keys(e).forEach(s=>{let i=o[s];if(i===void 0)return;let l=t.add(i);(s==="accessFlags"?Fa:Da).call(l,e[s])})}var Jn=class{constructor(e){this.methodId=e,this.originalMethod=null}replace(e,n,r,o,s){let{methodId:i}=this;this.originalMethod=Memory.dup(i,Cn);let l=r.reduce((f,u)=>f+u.size,0);n&&l++;let a=(i.add(eo).readU32()|xt)>>>0,c=l,d=0,p=l;i.add(eo).writeU32(a),i.add(rl).writeU16(c),i.add(ol).writeU16(d),i.add(sl).writeU16(p),i.add(al).writeU32(Rc(i)),s.dvmUseJNIBridge(i,e)}revert(e){Memory.copy(this.methodId,this.originalMethod,Cn)}resolveTarget(e,n,r,o){let s=r.handle.add(go).readPointer(),i;if(n)i=o.dvmDecodeIndirectRef(s,e.$h);else{let f=e.$borrowClassHandle(r);i=o.dvmDecodeIndirectRef(s,f.value),f.unref(r)}let l;n?l=i.add(tl).readPointer():l=i;let a=l.toString(16),c=Nt.get(a);if(c===void 0){let f=l.add(el),u=l.add(Ya),_=f.readPointer(),h=u.readS32(),g=h*v,y=Memory.alloc(2*g);Memory.copy(y,_,g),f.writePointer(y),c={classObject:l,vtablePtr:f,vtableCountPtr:u,vtable:_,vtableCount:h,shadowVtable:y,shadowVtableCount:h,targetMethods:new Map},Nt.set(a,c)}let d=this.methodId.toString(16),p=c.targetMethods.get(d);if(p===void 0){p=Memory.dup(this.originalMethod,Cn);let f=c.shadowVtableCount++;c.shadowVtable.add(f*v).writePointer(p),p.add(nl).writeU16(f),c.vtableCountPtr.writeS32(c.shadowVtableCount),c.targetMethods.set(d,p)}return p}};function Rc(t){if(Process.arch!=="ia32")return to;let e=t.add(il).readPointer().readCString();if(e===null||e.length===0||e.length>65535)return to;let n;switch(e[0]){case"V":n=ll;break;case"F":n=cl;break;case"D":n=dl;break;case"J":n=ul;break;case"Z":case"B":n=_l;break;case"C":n=hl;break;case"S":n=fl;break;default:n=pl;break}let r=0;for(let o=e.length-1;o>0;o--){let s=e[o];r+=s==="D"||s==="J"?2:1}return n<<ml|r}function Pc(t,e){let n=V();if(te()<23){let r=n["art::Thread::CurrentFromGdb"]();return n["art::mirror::Object::Clone"](t,r)}return Memory.dup(t,me(e).size)}function nr(t,e,n){Io(t,e,Rn,n)}function rr(t,e){Io(t,e,On)}function or(t,e){let n=V();if(te()<26)throw new Error("This API is only available on Android >= 8.0");Ee(t,e,r=>{n["art::Runtime::DeoptimizeBootImage"](n.artRuntime)})}function Io(t,e,n,r){let o=V();if(te()<24)throw new Error("This API is only available on Android >= 7.0");Ee(t,e,s=>{if(te()<30){if(!o.isJdwpStarted()){let l=Fc(o);Cl.push(l)}o.isDebuggerActive()||o["art::Dbg::GoActive"]();let i=Memory.alloc(8+v);switch(i.writeU32(n),n){case On:break;case Rn:i.add(8).writePointer(r);break;default:throw new Error("Unsupported deoptimization kind")}o["art::Dbg::RequestDeoptimization"](i),o["art::Dbg::ManageDeoptimization"]()}else{let i=o.artInstrumentation;if(i===null)throw new Error("Unable to find Instrumentation class in ART; please file a bug");let l=o["art::Instrumentation::EnableDeoptimization"];switch(l!==void 0&&(i.add(El().offset.deoptimizationEnabled).readU8()||l(i)),n){case On:o["art::Instrumentation::DeoptimizeEverything"](i,Memory.allocUtf8String("frida"));break;case Rn:o["art::Instrumentation::Deoptimize"](i,r);break;default:throw new Error("Unsupported deoptimization kind")}}})}var Vn=class{constructor(){let e=Process.getModuleByName("libart.so"),n=e.getExportByName("_ZN3art4JDWP12JdwpAdbState6AcceptEv"),r=e.getExportByName("_ZN3art4JDWP12JdwpAdbState15ReceiveClientFdEv"),o=ho(),s=ho();this._controlFd=o[0],this._clientFd=s[0];let i=null;i=Interceptor.attach(n,function(l){let a=l[0];Memory.scanSync(a.add(8252),256,"00 ff ff ff ff 00")[0].address.add(1).writeS32(o[1]),i.detach()}),Interceptor.replace(r,new NativeCallback(function(l){return Interceptor.revert(r),s[1]},"int",["pointer"])),Interceptor.flush(),this._handshakeRequest=this._performHandshake()}async _performHandshake(){let e=new UnixInputStream(this._clientFd,{autoClose:!1}),n=new UnixOutputStream(this._clientFd,{autoClose:!1}),r=[74,68,87,80,45,72,97,110,100,115,104,97,107,101];try{await n.writeAll(r),await e.readAll(r.length)}catch{}}};function Fc(t){let e=new Vn;t["art::Dbg::SetJdwpAllowed"](1);let n=Dc();t["art::Dbg::ConfigureJdwp"](n);let r=t["art::InternalDebuggerControlCallback::StartDebugger"];return r!==void 0?r(NULL):t["art::Dbg::StartJdwp"](),e}function Dc(){let t=te()<28?2:3,e=0,n=t,r=!0,o=!1,s=e,i=8+ct+2,l=Memory.alloc(i);return l.writeU32(n).add(4).writeU8(r?1:0).add(1).writeU8(o?1:0).add(1).add(ct).writeU16(s),l}function ho(){xn===null&&(xn=new NativeFunction(Process.getModuleByName("libc.so").getExportByName("socketpair"),"int",["int","int","int","pointer"]));let t=Memory.alloc(8);if(xn(yl,bl,0,t)===-1)throw new Error("Unable to create socketpair for JDWP");return[t.readS32(),t.add(4).readS32()]}function Uc(t){let e=xl().offset,n=t.vm.add(e.globalsLock),r=t.vm.add(e.globals),o=t["art::IndirectReferenceTable::Add"],s=t["art::ReaderWriterMutex::ExclusiveLock"],i=t["art::ReaderWriterMutex::ExclusiveUnlock"],l=0;return function(a,c,d){s(n,c);try{return o(r,l,d)}finally{i(n,c)}}}function Bc(t){let e=t["art::Thread::DecodeJObject"];if(e===void 0)throw new Error("art::Thread::DecodeJObject is not available; please file a bug");return function(n,r,o){return e(r,o)}}var zc={ia32:_o,x64:_o,arm:Jc,arm64:Vc};function Co(t,e,n){let r=V(),o=e.handle.readPointer(),s,i=r.find("_ZN3art3JNIILb1EE14ExceptionClearEP7_JNIEnv");i!==null?s=i:s=o.add(Pt).readPointer();let l,a=r.find("_ZN3art3JNIILb1EE10FatalErrorEP7_JNIEnvPKc");a!==null?l=a:l=o.add(Xa).readPointer();let c=zc[Process.arch];if(c===void 0)throw new Error("Not yet implemented for "+Process.arch);let d=null,p=We(t).offset,f=p.exception,u=new Set,_=p.isExceptionReportedToInstrumentation;_!==null&&u.add(_);let h=p.throwLocation;h!==null&&(u.add(h),u.add(h+v),u.add(h+2*v));let g=65536,y=Memory.alloc(g);return Memory.patchCode(y,g,E=>{d=c(E,y,s,l,f,u,n)}),d._code=y,d._callback=n,d}function _o(t,e,n,r,o,s,i){let l={},a=new Set,c=[n];for(;c.length>0;){let h=c.shift();if(Object.values(l).some(({begin:M,end:O})=>h.compare(M)>=0&&h.compare(O)<0))continue;let y=h.toString(),E={begin:h},C=null,T=!1;do{if(h.equals(r)){T=!0;break}let M=Instruction.parse(h);C=M;let O=l[M.address.toString()];if(O!==void 0){delete l[O.begin.toString()],l[y]=O,O.begin=E.begin,E=null;break}let k=null;switch(M.mnemonic){case"jmp":k=ptr(M.operands[0].value),T=!0;break;case"je":case"jg":case"jle":case"jne":case"js":k=ptr(M.operands[0].value);break;case"ret":T=!0;break}k!==null&&(a.add(k.toString()),c.push(k),c.sort((N,S)=>N.compare(S))),h=M.next}while(!T);E!==null&&(E.end=C.address.add(C.size),l[y]=E)}let d=Object.keys(l).map(h=>l[h]);d.sort((h,g)=>h.begin.compare(g.begin));let p=l[n.toString()];d.splice(d.indexOf(p),1),d.unshift(p);let f=new X86Writer(t,{pc:e}),u=!1,_=null;return d.forEach(h=>{let g=h.end.sub(h.begin).toInt32(),y=new X86Relocator(h.begin,f),E;for(;(E=y.readOne())!==0;){let C=y.input,{mnemonic:T}=C,M=C.address.toString();a.has(M)&&f.putLabel(M);let O=!0;switch(T){case"jmp":f.putJmpNearLabel(he(C.operands[0])),O=!1;break;case"je":case"jg":case"jle":case"jne":case"js":f.putJccNearLabel(T,he(C.operands[0]),"no-hint"),O=!1;break;case"mov":{let[k,N]=C.operands;if(k.type==="mem"&&N.type==="imm"){let S=k.value,L=S.disp;if(L===o&&N.value.valueOf()===0){if(_=S.base,f.putPushfx(),f.putPushax(),f.putMovRegReg("xbp","xsp"),v===4)f.putAndRegU32("esp",4294967280);else{let j=_!=="rdi"?"rdi":"rsi";f.putMovRegU64(j,uint64("0xfffffffffffffff0")),f.putAndRegReg("rsp",j)}f.putCallAddressWithAlignedArguments(i,[_]),f.putMovRegReg("xsp","xbp"),f.putPopax(),f.putPopfx(),u=!0,O=!1}else s.has(L)&&S.base===_&&(O=!1)}break}case"call":{let k=C.operands[0];k.type==="mem"&&k.value.disp===Pt&&(v===4?(f.putPopReg("eax"),f.putMovRegRegOffsetPtr("eax","eax",4),f.putPushReg("eax")):f.putMovRegRegOffsetPtr("rdi","rdi",8),f.putCallAddressWithArguments(i,[]),u=!0,O=!1);break}}if(O?y.writeAll():y.skipOne(),E===g)break}y.dispose()}),f.dispose(),u||sr(),new NativeFunction(e,"void",["pointer"],K)}function Jc(t,e,n,r,o,s,i){let l={},a=new Set,c=ptr(1).not(),d=[n];for(;d.length>0;){let y=d.shift();if(Object.values(l).some(({begin:L,end:j})=>y.compare(L)>=0&&y.compare(j)<0))continue;let C=y.and(c),T=C.toString(),M=y.and(1),O={begin:C},k=null,N=!1,S=0;do{if(y.equals(r)){N=!0;break}let L=Instruction.parse(y),{mnemonic:j}=L;k=L;let R=y.and(c).toString(),D=l[R];if(D!==void 0){delete l[D.begin.toString()],l[T]=D,D.begin=O.begin,O=null;break}let U=S===0,F=null;switch(j){case"b":F=ptr(L.operands[0].value),N=U;break;case"beq.w":case"beq":case"bne":case"bne.w":case"bgt":F=ptr(L.operands[0].value);break;case"cbz":case"cbnz":F=ptr(L.operands[1].value);break;case"pop.w":U&&(N=L.operands.filter(z=>z.value==="pc").length===1);break}switch(j){case"it":S=1;break;case"itt":S=2;break;case"ittt":S=3;break;case"itttt":S=4;break;default:S>0&&S--;break}F!==null&&(a.add(F.toString()),d.push(F.or(M)),d.sort((z,ee)=>z.compare(ee))),y=L.next}while(!N);O!==null&&(O.end=k.address.add(k.size),l[T]=O)}let p=Object.keys(l).map(y=>l[y]);p.sort((y,E)=>y.begin.compare(E.begin));let f=l[n.and(c).toString()];p.splice(p.indexOf(f),1),p.unshift(f);let u=new ThumbWriter(t,{pc:e}),_=!1,h=null,g=null;return p.forEach(y=>{let E=new ThumbRelocator(y.begin,u),C=y.begin,T=y.end,M=0;do{if(E.readOne()===0)throw new Error("Unexpected end of block");let k=E.input;C=k.address,M=k.size;let{mnemonic:N}=k,S=C.toString();a.has(S)&&u.putLabel(S);let L=!0;switch(N){case"b":u.putBLabel(he(k.operands[0])),L=!1;break;case"beq.w":u.putBCondLabelWide("eq",he(k.operands[0])),L=!1;break;case"bne.w":u.putBCondLabelWide("ne",he(k.operands[0])),L=!1;break;case"beq":case"bne":case"bgt":u.putBCondLabelWide(N.substr(1),he(k.operands[0])),L=!1;break;case"cbz":{let j=k.operands;u.putCbzRegLabel(j[0].value,he(j[1])),L=!1;break}case"cbnz":{let j=k.operands;u.putCbnzRegLabel(j[0].value,he(j[1])),L=!1;break}case"str":case"str.w":{let j=k.operands[1].value,w=j.disp;if(w===o){h=j.base;let R=h!=="r4"?"r4":"r5",D=["r0","r1","r2","r3",R,"r9","r12","lr"];u.putPushRegs(D),u.putMrsRegReg(R,"apsr-nzcvq"),u.putCallAddressWithArguments(i,[h]),u.putMsrRegReg("apsr-nzcvq",R),u.putPopRegs(D),_=!0,L=!1}else s.has(w)&&j.base===h&&(L=!1);break}case"ldr":{let[j,w]=k.operands;if(w.type==="mem"){let R=w.value;R.base[0]==="r"&&R.disp===Pt&&(g=j.value)}break}case"blx":k.operands[0].value===g&&(u.putLdrRegRegOffset("r0","r0",4),u.putCallAddressWithArguments(i,["r0"]),_=!0,g=null,L=!1);break}L?E.writeAll():E.skipOne()}while(!C.add(M).equals(T));E.dispose()}),u.dispose(),_||sr(),new NativeFunction(e.or(1),"void",["pointer"],K)}function Vc(t,e,n,r,o,s,i){let l={},a=new Set,c=[n];for(;c.length>0;){let y=c.shift();if(Object.values(l).some(({begin:k,end:N})=>y.compare(k)>=0&&y.compare(N)<0))continue;let C=y.toString(),T={begin:y},M=null,O=!1;do{if(y.equals(r)){O=!0;break}let k;try{k=Instruction.parse(y)}catch(L){if(y.readU32()===0){O=!0;break}else throw L}M=k;let N=l[k.address.toString()];if(N!==void 0){delete l[N.begin.toString()],l[C]=N,N.begin=T.begin,T=null;break}let S=null;switch(k.mnemonic){case"b":S=ptr(k.operands[0].value),O=!0;break;case"b.eq":case"b.ne":case"b.le":case"b.gt":S=ptr(k.operands[0].value);break;case"cbz":case"cbnz":S=ptr(k.operands[1].value);break;case"tbz":case"tbnz":S=ptr(k.operands[2].value);break;case"ret":O=!0;break}S!==null&&(a.add(S.toString()),c.push(S),c.sort((L,j)=>L.compare(j))),y=k.next}while(!O);T!==null&&(T.end=M.address.add(M.size),l[C]=T)}let d=Object.keys(l).map(y=>l[y]);d.sort((y,E)=>y.begin.compare(E.begin));let p=l[n.toString()];d.splice(d.indexOf(p),1),d.unshift(p);let f=new Arm64Writer(t,{pc:e});f.putBLabel("performTransition");let u=e.add(f.offset);f.putPushAllXRegisters(),f.putCallAddressWithArguments(i,["x0"]),f.putPopAllXRegisters(),f.putRet(),f.putLabel("performTransition");let _=!1,h=null,g=null;return d.forEach(y=>{let E=y.end.sub(y.begin).toInt32(),C=new Arm64Relocator(y.begin,f),T;for(;(T=C.readOne())!==0;){let M=C.input,{mnemonic:O}=M,k=M.address.toString();a.has(k)&&f.putLabel(k);let N=!0;switch(O){case"b":f.putBLabel(he(M.operands[0])),N=!1;break;case"b.eq":case"b.ne":case"b.le":case"b.gt":f.putBCondLabel(O.substr(2),he(M.operands[0])),N=!1;break;case"cbz":{let S=M.operands;f.putCbzRegLabel(S[0].value,he(S[1])),N=!1;break}case"cbnz":{let S=M.operands;f.putCbnzRegLabel(S[0].value,he(S[1])),N=!1;break}case"tbz":{let S=M.operands;f.putTbzRegImmLabel(S[0].value,S[1].value.valueOf(),he(S[2])),N=!1;break}case"tbnz":{let S=M.operands;f.putTbnzRegImmLabel(S[0].value,S[1].value.valueOf(),he(S[2])),N=!1;break}case"str":{let S=M.operands,L=S[0].value,j=S[1].value,w=j.disp;L==="xzr"&&w===o?(h=j.base,f.putPushRegReg("x0","lr"),f.putMovRegReg("x0",h),f.putBlImm(u),f.putPopRegReg("x0","lr"),_=!0,N=!1):s.has(w)&&j.base===h&&(N=!1);break}case"ldr":{let S=M.operands,L=S[1].value;L.base[0]==="x"&&L.disp===Pt&&(g=S[0].value);break}case"blr":M.operands[0].value===g&&(f.putLdrRegRegOffset("x0","x0",8),f.putCallAddressWithArguments(i,["x0"]),_=!0,g=null,N=!1);break}if(N?C.writeAll():C.skipOne(),T===E)break}C.dispose()}),f.dispose(),_||sr(),new NativeFunction(e,"void",["pointer"],K)}function sr(){throw new Error("Unable to parse ART internals; please file a bug")}function Gc(t){let e=t["art::ArtMethod::PrettyMethod"];e!==void 0&&(Interceptor.attach(e.impl,se.hooks.ArtMethod.prettyMethod),Interceptor.flush())}function he(t){return ptr(t.value).toString()}function $c(t,e){return new NativeFunction(t,"pointer",e,K)}function Hc(t,e){let n=new NativeFunction(t,"void",["pointer"].concat(e),K);return function(){let r=Memory.alloc(v);return n(r,...arguments),r.readPointer()}}function Lt(t,e){let{arch:n}=Process;switch(n){case"ia32":case"arm64":{let r;n==="ia32"?r=qe(64,i=>{let l=1+e.length,a=l*4;i.putSubRegImm("esp",a);for(let c=0;c!==l;c++){let d=c*4;i.putMovRegRegOffsetPtr("eax","esp",a+4+d),i.putMovRegOffsetPtrReg("esp",d,"eax")}i.putCallAddress(t),i.putAddRegImm("esp",a-4),i.putRet()}):r=qe(32,i=>{i.putMovRegReg("x8","x0"),e.forEach((l,a)=>{i.putMovRegReg("x"+a,"x"+(a+1))}),i.putLdrRegAddress("x7",t),i.putBrReg("x7")});let o=new NativeFunction(r,"void",["pointer"].concat(e),K),s=function(...i){o(...i)};return s.handle=r,s.impl=t,s}default:{let r=new NativeFunction(t,"void",["pointer"].concat(e),K);return r.impl=t,r}}}var Ot=class{constructor(){this.handle=Memory.alloc(ct)}dispose(){let[e,n]=this._getData();n||V().$delete(e)}disposeToString(){let e=this.toString();return this.dispose(),e}toString(){let[e]=this._getData();return e.readUtf8String()}_getData(){let e=this.handle,n=(e.readU8()&1)===0;return[n?e.add(1):e.add(2*v).readPointer(),n]}},Gn=class{$delete(){this.dispose(),V().$delete(this)}constructor(e,n){this.handle=e,this._begin=e,this._end=e.add(v),this._storage=e.add(2*v),this._elementSize=n}init(){this.begin=NULL,this.end=NULL,this.storage=NULL}dispose(){V().$delete(this.begin)}get begin(){return this._begin.readPointer()}set begin(e){this._begin.writePointer(e)}get end(){return this._end.readPointer()}set end(e){this._end.writePointer(e)}get storage(){return this._storage.readPointer()}set storage(e){this._storage.writePointer(e)}get size(){return this.end.sub(this.begin).toInt32()/this._elementSize}},dt=class t extends Gn{static $new(){let e=new t(V().$new(gl));return e.init(),e}constructor(e){super(e,v)}get handles(){let e=[],n=this.begin,r=this.end;for(;!n.equals(r);)e.push(n.readPointer()),n=n.add(v);return e}},Zc=0,Ao=v,To=Ao+4,qc=-1,Rt=class t{$delete(){this.dispose(),V().$delete(this)}constructor(e){this.handle=e,this._link=e.add(Zc),this._numberOfReferences=e.add(Ao)}init(e,n){this.link=e,this.numberOfReferences=n}dispose(){}get link(){return new t(this._link.readPointer())}set link(e){this._link.writePointer(e)}get numberOfReferences(){return this._numberOfReferences.readS32()}set numberOfReferences(e){this._numberOfReferences.writeS32(e)}},Lo=Xc(To),xo=Lo+v,Wc=xo+v,ut=class t extends Rt{static $new(e,n){let r=new t(V().$new(Wc));return r.init(e,n),r}constructor(e){super(e),this._self=e.add(Lo),this._currentScope=e.add(xo);let o=(64-v-4-4)/4;this._scopeLayout=lt.layoutForCapacity(o),this._topHandleScopePtr=null}init(e,n){let r=e.add(We(n).offset.topHandleScope);this._topHandleScopePtr=r,super.init(r.readPointer(),qc),this.self=e,this.currentScope=lt.$new(this._scopeLayout),r.writePointer(this)}dispose(){this._topHandleScopePtr.writePointer(this.link);let e;for(;(e=this.currentScope)!==null;){let n=e.link;e.$delete(),this.currentScope=n}}get self(){return this._self.readPointer()}set self(e){this._self.writePointer(e)}get currentScope(){let e=this._currentScope.readPointer();return e.isNull()?null:new lt(e,this._scopeLayout)}set currentScope(e){this._currentScope.writePointer(e)}newHandle(e){return this.currentScope.newHandle(e)}},lt=class t extends Rt{static $new(e){let n=new t(V().$new(e.size),e);return n.init(),n}constructor(e,n){super(e);let{offset:r}=n;this._refsStorage=e.add(r.refsStorage),this._pos=e.add(r.pos),this._layout=n}init(){super.init(NULL,this._layout.numberOfReferences),this.pos=0}get pos(){return this._pos.readU32()}set pos(e){this._pos.writeU32(e)}newHandle(e){let n=this.pos,r=this._refsStorage.add(n*4);return r.writeS32(e.toInt32()),this.pos=n+1,r}static layoutForCapacity(e){let n=To,r=n+e*4;return{size:r+4,numberOfReferences:e,offset:{refsStorage:n,pos:r}}}},Kc={arm:function(t,e){let n=Process.pageSize,r=Memory.alloc(n);Memory.protect(r,n,"rwx");let o=new NativeCallback(e,"void",["pointer"]);r._onMatchCallback=o;let s=[26625,18947,17041,53505,19202,18200,18288,48896],i=s.length*2,l=i+4,a=l+4;return Memory.patchCode(r,a,function(c){s.forEach((d,p)=>{c.add(p*2).writeU16(d)}),c.add(i).writeS32(t),c.add(l).writePointer(o)}),r.or(1)},arm64:function(t,e){let n=Process.pageSize,r=Memory.alloc(n);Memory.protect(r,n,"rwx");let o=new NativeCallback(e,"void",["pointer"]);r._onMatchCallback=o;let s=[3107979265,402653378,1795293247,1409286241,1476395139,3592355936,3596551104],i=s.length*4,l=i+4,a=l+8;return Memory.patchCode(r,a,function(c){s.forEach((d,p)=>{c.add(p*4).writeU32(d)}),c.add(i).writeS32(t),c.add(l).writePointer(o)}),r}};function ir(t,e){return(Kc[Process.arch]||Qc)(t,e)}function Qc(t,e){return new NativeCallback(n=>{n.readS32()===t&&e(n)},"void",["pointer","pointer"])}function Xc(t){let e=t%v;return e!==0?t+v-e:t}var Yc=4,{pointerSize:J}=Process,ed=256,td=65536,nd=131072,rd=33554432,od=67108864,sd=134217728,Be={exceptions:"propagate"},jo=de(yd),id=de(Ed),ad=de(_d),ar=null,lr=!1,Bt=new Map,ft=new Map;function Ae(){return ar===null&&(ar=ld()),ar}function ld(){let t=Process.enumerateModules().filter(a=>/jvm.(dll|dylib|so)$/.test(a.name));if(t.length===0)return null;let e=t[0],n={flavor:"jvm"},r=Process.platform==="windows"?[{module:e,functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],JVM_Sleep:["JVM_Sleep","void",["pointer","pointer","long"]],"VMThread::execute":["VMThread::execute","void",["pointer"]],"Method::size":["Method::size","int",["int"]],"Method::set_native_function":["Method::set_native_function","void",["pointer","pointer","int"]],"Method::clear_native_function":["Method::clear_native_function","void",["pointer"]],"Method::jmethod_id":["Method::jmethod_id","pointer",["pointer"]],"ClassLoaderDataGraph::classes_do":["ClassLoaderDataGraph::classes_do","void",["pointer"]],"NMethodSweeper::sweep_code_cache":["NMethodSweeper::sweep_code_cache","void",[]],"OopMapCache::flush_obsolete_entries":["OopMapCache::flush_obsolete_entries","void",["pointer"]]},variables:{"VM_RedefineClasses::`vftable'":function(a){this.vtableRedefineClasses=a},"VM_RedefineClasses::doit":function(a){this.redefineClassesDoIt=a},"VM_RedefineClasses::doit_prologue":function(a){this.redefineClassesDoItPrologue=a},"VM_RedefineClasses::doit_epilogue":function(a){this.redefineClassesDoItEpilogue=a},"VM_RedefineClasses::allow_nested_vm_operations":function(a){this.redefineClassesAllow=a},"NMethodSweeper::_traversals":function(a){this.traversals=a},"NMethodSweeper::_should_sweep":function(a){this.shouldSweep=a}},optionals:[]}]:[{module:e,functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],_ZN6Method4sizeEb:["Method::size","int",["int"]],_ZN6Method19set_native_functionEPhb:["Method::set_native_function","void",["pointer","pointer","int"]],_ZN6Method21clear_native_functionEv:["Method::clear_native_function","void",["pointer"]],_ZN6Method24restore_unshareable_infoEP10JavaThread:["Method::restore_unshareable_info","void",["pointer","pointer"]],_ZN6Method24restore_unshareable_infoEP6Thread:["Method::restore_unshareable_info","void",["pointer","pointer"]],_ZN6Method11link_methodERK12methodHandleP10JavaThread:["Method::link_method","void",["pointer","pointer","pointer"]],_ZN6Method10jmethod_idEv:["Method::jmethod_id","pointer",["pointer"]],_ZN6Method10clear_codeEv:function(a){let c=new NativeFunction(a,"void",["pointer"],Be);this["Method::clear_code"]=function(d){c(d)}},_ZN6Method10clear_codeEb:function(a){let c=new NativeFunction(a,"void",["pointer","int"],Be),d=0;this["Method::clear_code"]=function(p){c(p,d)}},_ZN18VM_RedefineClasses19mark_dependent_codeEP13InstanceKlass:["VM_RedefineClasses::mark_dependent_code","void",["pointer","pointer"]],_ZN18VM_RedefineClasses20flush_dependent_codeEv:["VM_RedefineClasses::flush_dependent_code","void",[]],_ZN18VM_RedefineClasses20flush_dependent_codeEP13InstanceKlassP6Thread:["VM_RedefineClasses::flush_dependent_code","void",["pointer","pointer","pointer"]],_ZN18VM_RedefineClasses20flush_dependent_codeE19instanceKlassHandleP6Thread:["VM_RedefineClasses::flush_dependent_code","void",["pointer","pointer","pointer"]],_ZN19ResolvedMethodTable21adjust_method_entriesEPb:["ResolvedMethodTable::adjust_method_entries","void",["pointer"]],_ZN15MemberNameTable21adjust_method_entriesEP13InstanceKlassPb:["MemberNameTable::adjust_method_entries","void",["pointer","pointer","pointer"]],_ZN17ConstantPoolCache21adjust_method_entriesEPb:function(a){let c=new NativeFunction(a,"void",["pointer","pointer"],Be);this["ConstantPoolCache::adjust_method_entries"]=function(d,p,f){c(d,f)}},_ZN17ConstantPoolCache21adjust_method_entriesEP13InstanceKlassPb:function(a){let c=new NativeFunction(a,"void",["pointer","pointer","pointer"],Be);this["ConstantPoolCache::adjust_method_entries"]=function(d,p,f){c(d,p,f)}},_ZN20ClassLoaderDataGraph10classes_doEP12KlassClosure:["ClassLoaderDataGraph::classes_do","void",["pointer"]],_ZN20ClassLoaderDataGraph22clean_deallocate_listsEb:["ClassLoaderDataGraph::clean_deallocate_lists","void",["int"]],_ZN10JavaThread27thread_from_jni_environmentEP7JNIEnv_:["JavaThread::thread_from_jni_environment","pointer",["pointer"]],_ZN8VMThread7executeEP12VM_Operation:["VMThread::execute","void",["pointer"]],_ZN11OopMapCache22flush_obsolete_entriesEv:["OopMapCache::flush_obsolete_entries","void",["pointer"]],_ZN14NMethodSweeper11force_sweepEv:["NMethodSweeper::force_sweep","void",[]],_ZN14NMethodSweeper16sweep_code_cacheEv:["NMethodSweeper::sweep_code_cache","void",[]],_ZN14NMethodSweeper17sweep_in_progressEv:["NMethodSweeper::sweep_in_progress","bool",[]],JVM_Sleep:["JVM_Sleep","void",["pointer","pointer","long"]]},variables:{_ZN18VM_RedefineClasses14_the_class_oopE:function(a){this.redefineClass=a},_ZN18VM_RedefineClasses10_the_classE:function(a){this.redefineClass=a},_ZN18VM_RedefineClasses25AdjustCpoolCacheAndVtable8do_klassEP5Klass:function(a){this.doKlass=a},_ZN18VM_RedefineClasses22AdjustAndCleanMetadata8do_klassEP5Klass:function(a){this.doKlass=a},_ZTV18VM_RedefineClasses:function(a){this.vtableRedefineClasses=a},_ZN18VM_RedefineClasses4doitEv:function(a){this.redefineClassesDoIt=a},_ZN18VM_RedefineClasses13doit_prologueEv:function(a){this.redefineClassesDoItPrologue=a},_ZN18VM_RedefineClasses13doit_epilogueEv:function(a){this.redefineClassesDoItEpilogue=a},_ZN18VM_RedefineClassesD0Ev:function(a){this.redefineClassesDispose0=a},_ZN18VM_RedefineClassesD1Ev:function(a){this.redefineClassesDispose1=a},_ZNK18VM_RedefineClasses26allow_nested_vm_operationsEv:function(a){this.redefineClassesAllow=a},_ZNK18VM_RedefineClasses14print_on_errorEP12outputStream:function(a){this.redefineClassesOnError=a},_ZN13InstanceKlass33create_new_default_vtable_indicesEiP10JavaThread:function(a){this.createNewDefaultVtableIndices=a},_ZN13InstanceKlass33create_new_default_vtable_indicesEiP6Thread:function(a){this.createNewDefaultVtableIndices=a},_ZN19Abstract_VM_Version19jre_release_versionEv:function(a){let d=new NativeFunction(a,"pointer",[],Be)().readCString();this.version=d.startsWith("1.8")?8:d.startsWith("9.")?9:parseInt(d.slice(0,2),10),this.versionS=d},_ZN14NMethodSweeper11_traversalsE:function(a){this.traversals=a},_ZN14NMethodSweeper21_sweep_fractions_leftE:function(a){this.fractions=a},_ZN14NMethodSweeper13_should_sweepE:function(a){this.shouldSweep=a}},optionals:["_ZN6Method24restore_unshareable_infoEP10JavaThread","_ZN6Method24restore_unshareable_infoEP6Thread","_ZN6Method11link_methodERK12methodHandleP10JavaThread","_ZN6Method10clear_codeEv","_ZN6Method10clear_codeEb","_ZN18VM_RedefineClasses19mark_dependent_codeEP13InstanceKlass","_ZN18VM_RedefineClasses20flush_dependent_codeEv","_ZN18VM_RedefineClasses20flush_dependent_codeEP13InstanceKlassP6Thread","_ZN18VM_RedefineClasses20flush_dependent_codeE19instanceKlassHandleP6Thread","_ZN19ResolvedMethodTable21adjust_method_entriesEPb","_ZN15MemberNameTable21adjust_method_entriesEP13InstanceKlassPb","_ZN17ConstantPoolCache21adjust_method_entriesEPb","_ZN17ConstantPoolCache21adjust_method_entriesEP13InstanceKlassPb","_ZN20ClassLoaderDataGraph22clean_deallocate_listsEb","_ZN10JavaThread27thread_from_jni_environmentEP7JNIEnv_","_ZN14NMethodSweeper11force_sweepEv","_ZN14NMethodSweeper17sweep_in_progressEv","_ZN18VM_RedefineClasses14_the_class_oopE","_ZN18VM_RedefineClasses10_the_classE","_ZN18VM_RedefineClasses25AdjustCpoolCacheAndVtable8do_klassEP5Klass","_ZN18VM_RedefineClasses22AdjustAndCleanMetadata8do_klassEP5Klass","_ZN18VM_RedefineClassesD0Ev","_ZN18VM_RedefineClassesD1Ev","_ZNK18VM_RedefineClasses14print_on_errorEP12outputStream","_ZN13InstanceKlass33create_new_default_vtable_indicesEiP10JavaThread","_ZN13InstanceKlass33create_new_default_vtable_indicesEiP6Thread","_ZN14NMethodSweeper21_sweep_fractions_leftE"]}],o=[];if(r.forEach(function(a){let c=a.module,d=a.functions||{},p=a.variables||{},f=new Set(a.optionals||[]),u=c.enumerateExports().reduce(function(h,g){return h[g.name]=g,h},{}),_=c.enumerateSymbols().reduce(function(h,g){return h[g.name]=g,h},u);Object.keys(d).forEach(function(h){let g=_[h];if(g!==void 0){let y=d[h];typeof y=="function"?y.call(n,g.address):n[y[0]]=new NativeFunction(g.address,y[1],y[2],Be)}else f.has(h)||o.push(h)}),Object.keys(p).forEach(function(h){let g=_[h];g!==void 0?p[h].call(n,g.address):f.has(h)||o.push(h)})}),o.length>0)throw new Error("Java API only partially available; please file a bug. Missing: "+o.join(", "));let s=Memory.alloc(J),i=Memory.alloc(Yc);if(ue("JNI_GetCreatedJavaVMs",n.JNI_GetCreatedJavaVMs(s,1,i)),i.readInt()===0)return null;n.vm=s.readPointer();let l=Process.platform==="windows"?{$new:["??2@YAPEAX_K@Z","pointer",["ulong"]],$delete:["??3@YAXPEAX@Z","void",["pointer"]]}:{$new:["_Znwm","pointer",["ulong"]],$delete:["_ZdlPv","void",["pointer"]]};for(let[a,[c,d,p]]of Object.entries(l)){let f=Module.findGlobalExportByName(c);if(f===null&&(f=DebugSymbol.fromName(c).address,f.isNull()))throw new Error(`unable to find C++ allocator API, missing: '${c}'`);n[a]=new NativeFunction(f,d,p,Be)}return n.jvmti=cd(n),n["JavaThread::thread_from_jni_environment"]===void 0&&(n["JavaThread::thread_from_jni_environment"]=ud(n)),n}function cd(t){let e=new Ce(t),n;return e.perform(()=>{let r=e.tryGetEnvHandle(vt.v1_0);if(r===null)throw new Error("JVMTI not available");n=new xe(r,e);let o=Memory.alloc(8);o.writeU64(St.canTagObjects);let s=n.addCapabilities(o);ue("getEnvJvmti::AddCapabilities",s)}),n}var dd={x64:pd};function ud(t){let e=null,n=dd[Process.arch];if(n!==void 0){let o=new Ce(t).perform(s=>s.handle.readPointer().add(6*J).readPointer());e=Ne(o,n,{limit:11})}return e===null?()=>{throw new Error("Unable to make thread_from_jni_environment() helper for the current architecture")}:r=>r.add(e)}function pd(t){if(t.mnemonic!=="lea")return null;let{base:e,disp:n}=t.operands[1].value;return e==="rdi"&&n<0?n:null}function Oo(t,e){}var cr=class{constructor(e){this.methodId=e,this.method=e.readPointer(),this.originalMethod=null,this.newMethod=null,this.resolved=null,this.impl=null,this.key=e.toString(16)}replace(e,n,r,o,s){let{key:i}=this,l=ft.get(i);l!==void 0&&(ft.delete(i),this.method=l.method,this.originalMethod=l.originalMethod,this.newMethod=l.newMethod,this.resolved=l.resolved),this.impl=e,Bt.set(i,this),No(o)}revert(e){let{key:n}=this;Bt.delete(n),ft.set(n,this),No(e)}resolveTarget(e,n,r,o){let{resolved:s,originalMethod:i,methodId:l}=this;if(s!==null)return s;if(i===null)return l;i.oldMethod.vtableIndexPtr.writeS32(-2);let c=Memory.alloc(J);return c.writePointer(this.method),this.resolved=c,c}};function No(t){lr||(lr=!0,Script.nextTick(fd,t))}function fd(t){let e=new Map(Bt),n=new Map(ft);Bt.clear(),ft.clear(),lr=!1,t.perform(r=>{let o=Ae(),s=o["JavaThread::thread_from_jni_environment"](r.handle),i=!1;Ro(()=>{e.forEach(l=>{let{method:a,originalMethod:c,impl:d,methodId:p,newMethod:f}=l;c===null?(l.originalMethod=Fo(a),l.newMethod=md(a,d,s),ko(l.newMethod,p,s)):o["Method::set_native_function"](f.method,d,0)}),n.forEach(l=>{let{originalMethod:a,methodId:c,newMethod:d}=l;if(a!==null){gd(a);let p=a.oldMethod;p.oldMethod=d,ko(p,c,s),i=!0}})}),i&&hd(r.handle)})}function hd(t){let{fractions:e,shouldSweep:n,traversals:r,"NMethodSweeper::sweep_code_cache":o,"NMethodSweeper::sweep_in_progress":s,"NMethodSweeper::force_sweep":i,JVM_Sleep:l}=Ae();if(i!==void 0)Thread.sleep(.05),i(),Thread.sleep(.05),i();else{let a=r.readS64(),c=a+2;for(;c>a;)e.writeS32(1),l(t,NULL,50),s()||Ro(()=>{Thread.sleep(.05)}),n.readU8()===0&&(e.writeS32(1),o()),a=r.readS64()}}function Ro(t,e,n){let{execute:r,vtable:o,vtableSize:s,doItOffset:i,prologueOffset:l,epilogueOffset:a}=ad(),c=Memory.dup(o,s),d=Memory.alloc(J*25);d.writePointer(c);let p=new NativeCallback(t,"void",["pointer"]);c.add(i).writePointer(p);let f=null;e!==void 0&&(f=new NativeCallback(e,"int",["pointer"]),c.add(l).writePointer(f));let u=null;n!==void 0&&(u=new NativeCallback(n,"void",["pointer"]),c.add(a).writePointer(u)),r(d)}function _d(){let{vtableRedefineClasses:t,redefineClassesDoIt:e,redefineClassesDoItPrologue:n,redefineClassesDoItEpilogue:r,redefineClassesOnError:o,redefineClassesAllow:s,redefineClassesDispose0:i,redefineClassesDispose1:l,"VMThread::execute":a}=Ae(),c=t.add(2*J),d=15*J,p=Memory.dup(c,d),f=new NativeCallback(()=>{},"void",["pointer"]),u,_,h;for(let g=0;g!==d;g+=J){let y=p.add(g),E=y.readPointer();o!==void 0&&E.equals(o)||i!==void 0&&E.equals(i)||l!==void 0&&E.equals(l)?y.writePointer(f):E.equals(e)?u=g:E.equals(n)?(_=g,y.writePointer(s)):E.equals(r)&&(h=g,y.writePointer(f))}return{execute:a,emptyCallback:f,vtable:p,vtableSize:d,doItOffset:u,prologueOffset:_,epilogueOffset:h}}function Po(t){return new cr(t)}function ko(t,e,n){let{method:r,oldMethod:o}=t,s=Ae();t.methodsArray.add(t.methodIndex*J).writePointer(r),t.vtableIndex>=0&&t.vtable.add(t.vtableIndex*J).writePointer(r),e.writePointer(r),o.accessFlagsPtr.writeU32((o.accessFlags|td|nd)>>>0);let i=s["OopMapCache::flush_obsolete_entries"];if(i!==void 0){let{oopMapCache:_}=t;_.isNull()||i(_)}let l=s["VM_RedefineClasses::mark_dependent_code"],a=s["VM_RedefineClasses::flush_dependent_code"];l!==void 0?(l(NULL,t.instanceKlass),a()):a(NULL,t.instanceKlass,n);let c=Memory.alloc(1);c.writeU8(1),s["ConstantPoolCache::adjust_method_entries"](t.cache,t.instanceKlass,c);let d=Memory.alloc(3*J),p=Memory.alloc(J);p.writePointer(s.doKlass),d.writePointer(p),d.add(J).writePointer(n),d.add(2*J).writePointer(n),s.redefineClass!==void 0&&s.redefineClass.writePointer(t.instanceKlass),s["ClassLoaderDataGraph::classes_do"](d);let f=s["ResolvedMethodTable::adjust_method_entries"];if(f!==void 0)f(c);else{let{memberNames:_}=t;if(!_.isNull()){let h=s["MemberNameTable::adjust_method_entries"];h!==void 0&&h(_,t.instanceKlass,c)}}let u=s["ClassLoaderDataGraph::clean_deallocate_lists"];u!==void 0&&u(0)}function md(t,e,n){let r=Ae(),o=Fo(t);o.constPtr.writePointer(o.const);let s=(o.accessFlags|ed|rd|od|sd)>>>0;if(o.accessFlagsPtr.writeU32(s),o.signatureHandler.writePointer(NULL),o.adapter.writePointer(NULL),o.i2iEntry.writePointer(NULL),r["Method::clear_code"](o.method),o.dataPtr.writePointer(NULL),o.countersPtr.writePointer(NULL),o.stackmapPtr.writePointer(NULL),r["Method::clear_native_function"](o.method),r["Method::set_native_function"](o.method,e,0),r["Method::restore_unshareable_info"](o.method,n),r.version>=17){let i=Memory.alloc(2*J);i.writePointer(o.method),i.add(J).writePointer(n),r["Method::link_method"](o.method,i,n)}return o}function Fo(t){let e=jo(),n=t.add(e.method.constMethodOffset).readPointer(),r=n.add(e.constMethod.sizeOffset).readS32()*J,o=Memory.alloc(r+e.method.size);Memory.copy(o,n,r);let s=o.add(r);Memory.copy(s,t,e.method.size);let i=Mo(s,o,r),l=Mo(t,n,r);return i.oldMethod=l,i}function Mo(t,e,n){let r=Ae(),o=jo(),s=t.add(o.method.constMethodOffset),i=t.add(o.method.methodDataOffset),l=t.add(o.method.methodCountersOffset),a=t.add(o.method.accessFlagsOffset),c=a.readU32(),d=o.getAdapterPointer(t,e),p=t.add(o.method.i2iEntryOffset),f=t.add(o.method.signatureHandlerOffset),u=e.add(o.constMethod.constantPoolOffset).readPointer(),_=e.add(o.constMethod.stackmapDataOffset),h=u.add(o.constantPool.instanceKlassOffset).readPointer(),g=u.add(o.constantPool.cacheOffset).readPointer(),y=id(),E=h.add(y.methodsOffset).readPointer(),C=E.readS32(),T=E.add(J),M=e.add(o.constMethod.methodIdnumOffset).readU16(),O=t.add(o.method.vtableIndexOffset),k=O.readS32(),N=h.add(y.vtableOffset),S=h.add(y.oopMapCacheOffset).readPointer(),L=r.version>=10?h.add(y.memberNamesOffset).readPointer():NULL;return{method:t,methodSize:o.method.size,const:e,constSize:n,constPtr:s,dataPtr:i,countersPtr:l,stackmapPtr:_,instanceKlass:h,methodsArray:T,methodsCount:C,methodIndex:M,vtableIndex:k,vtableIndexPtr:O,vtable:N,accessFlags:c,accessFlagsPtr:a,adapter:d,i2iEntry:p,signatureHandler:f,memberNames:L,cache:g,oopMapCache:S}}function gd(t){let{oldMethod:e}=t;e.accessFlagsPtr.writeU32(e.accessFlags),e.vtableIndexPtr.writeS32(e.vtableIndex)}function yd(){let t=Ae(),{version:e}=t,n;e>=17?n="method:early":e>=9&&e<=16?n="const-method":n="method:late";let o=t["Method::size"](1)*J,s=J,i=2*J,l=3*J,a=4*J,c=n==="method:early"?J:0,d=a+c,p=d+4,f=p+4+8,u=f+J,_=c!==0?a:u,h=o-2*J,g=o-J,y=8,E=y+J,C=E+J,T=n==="const-method"?J:0,M=C+T,O=M+14,k=2*J,N=3*J;return{getAdapterPointer:T!==0?function(L,j){return j.add(C)}:function(L,j){return L.add(_)},method:{size:o,constMethodOffset:s,methodDataOffset:i,methodCountersOffset:l,accessFlagsOffset:d,vtableIndexOffset:p,i2iEntryOffset:f,nativeFunctionOffset:h,signatureHandlerOffset:g},constMethod:{constantPoolOffset:y,stackmapDataOffset:E,sizeOffset:M,methodIdnumOffset:O},constantPool:{cacheOffset:k,instanceKlassOffset:N}}}var bd={x64:vd};function Ed(){let{version:t,createNewDefaultVtableIndices:e}=Ae(),n=bd[Process.arch];if(n===void 0)throw new Error(`Missing vtable offset parser for ${Process.arch}`);let r=Ne(e,n,{limit:32});if(r===null)throw new Error("Unable to deduce vtable offset");let o=t>=10&&t<=11||t>=15?17:18,s=r-7*J,i=r-17*J,l=r-o*J;return{vtableOffset:r,methodsOffset:s,memberNamesOffset:i,oopMapCacheOffset:l}}function vd(t){if(t.mnemonic!=="mov")return null;let e=t.operands[0];if(e.type!=="mem")return null;let{value:n}=e;if(n.scale!==1)return null;let{disp:r}=n;return r<256?null:r+16}var Do=V;try{pt()}catch{Do=Ae}var ht=Do;var Sd=`#include <json-glib/json-glib.h>
#include <string.h>

#define kAccStatic 0x0008
#define kAccConstructor 0x00010000

typedef struct _Model Model;
typedef struct _EnumerateMethodsContext EnumerateMethodsContext;

typedef struct _JavaApi JavaApi;
typedef struct _JavaClassApi JavaClassApi;
typedef struct _JavaMethodApi JavaMethodApi;
typedef struct _JavaFieldApi JavaFieldApi;

typedef struct _JNIEnv JNIEnv;
typedef guint8 jboolean;
typedef gint32 jint;
typedef jint jsize;
typedef gpointer jobject;
typedef jobject jclass;
typedef jobject jstring;
typedef jobject jarray;
typedef jarray jobjectArray;
typedef gpointer jfieldID;
typedef gpointer jmethodID;

typedef struct _jvmtiEnv jvmtiEnv;
typedef enum
{
  JVMTI_ERROR_NONE = 0
} jvmtiError;

typedef struct _ArtApi ArtApi;
typedef guint32 ArtHeapReference;
typedef struct _ArtObject ArtObject;
typedef struct _ArtClass ArtClass;
typedef struct _ArtClassLinker ArtClassLinker;
typedef struct _ArtClassVisitor ArtClassVisitor;
typedef struct _ArtClassVisitorVTable ArtClassVisitorVTable;
typedef struct _ArtMethod ArtMethod;
typedef struct _ArtString ArtString;

typedef union _StdString StdString;
typedef struct _StdStringShort StdStringShort;
typedef struct _StdStringLong StdStringLong;

typedef void (* ArtVisitClassesFunc) (ArtClassLinker * linker, ArtClassVisitor * visitor);
typedef const char * (* ArtGetClassDescriptorFunc) (ArtClass * klass, StdString * storage);
typedef void (* ArtPrettyMethodFunc) (StdString * result, ArtMethod * method, jboolean with_signature);

struct _Model
{
  GHashTable * members;
};

struct _EnumerateMethodsContext
{
  GPatternSpec * class_query;
  GPatternSpec * method_query;
  jboolean include_signature;
  jboolean ignore_case;
  jboolean skip_system_classes;
  GHashTable * groups;
};

struct _JavaClassApi
{
  jmethodID get_declared_methods;
  jmethodID get_declared_fields;
};

struct _JavaMethodApi
{
  jmethodID get_name;
  jmethodID get_modifiers;
};

struct _JavaFieldApi
{
  jmethodID get_name;
  jmethodID get_modifiers;
};

struct _JavaApi
{
  jvmtiEnv * jvmti;
  JavaClassApi clazz;
  JavaMethodApi method;
  JavaFieldApi field;
};

struct _JNIEnv
{
  gpointer * functions;
};

struct _jvmtiEnv
{
  gpointer * functions;
};

struct _ArtApi
{
  gboolean available;

  guint class_offset_ifields;
  guint class_offset_methods;
  guint class_offset_sfields;
  guint class_offset_copied_methods_offset;

  guint method_size;
  guint method_offset_access_flags;

  guint field_size;
  guint field_offset_access_flags;

  guint alignment_padding;

  ArtClassLinker * linker;
  ArtVisitClassesFunc visit_classes;
  ArtGetClassDescriptorFunc get_class_descriptor;
  ArtPrettyMethodFunc pretty_method;

  void (* free) (gpointer mem);
};

struct _ArtObject
{
  ArtHeapReference klass;
  ArtHeapReference monitor;
};

struct _ArtClass
{
  ArtObject parent;

  ArtHeapReference class_loader;
};

struct _ArtClassVisitor
{
  ArtClassVisitorVTable * vtable;
  gpointer user_data;
};

struct _ArtClassVisitorVTable
{
  void (* reserved1) (ArtClassVisitor * self);
  void (* reserved2) (ArtClassVisitor * self);
  jboolean (* visit) (ArtClassVisitor * self, ArtClass * klass);
};

struct _ArtString
{
  ArtObject parent;

  gint32 count;
  guint32 hash_code;

  union
  {
    guint16 value[0];
    guint8 value_compressed[0];
  };
};

struct _StdStringShort
{
  guint8 size;
  gchar data[(3 * sizeof (gpointer)) - sizeof (guint8)];
};

struct _StdStringLong
{
  gsize capacity;
  gsize size;
  gchar * data;
};

union _StdString
{
  StdStringShort s;
  StdStringLong l;
};

static void model_add_method (Model * self, const gchar * name, jmethodID id, jint modifiers);
static void model_add_field (Model * self, const gchar * name, jfieldID id, jint modifiers);
static void model_free (Model * model);

static jboolean collect_matching_class_methods (ArtClassVisitor * self, ArtClass * klass);
static gchar * finalize_method_groups_to_json (GHashTable * groups);
static GPatternSpec * make_pattern_spec (const gchar * pattern, jboolean ignore_case);
static gchar * class_name_from_signature (const gchar * signature);
static gchar * format_method_signature (const gchar * name, const gchar * signature);
static void append_type (GString * output, const gchar ** type);

static gpointer read_art_array (gpointer object_base, guint field_offset, guint length_size, guint * length);

static void std_string_destroy (StdString * str);
static gchar * std_string_c_str (StdString * self);

extern GMutex lock;
extern GArray * models;
extern JavaApi java_api;
extern ArtApi art_api;

void
init (void)
{
  g_mutex_init (&lock);
  models = g_array_new (FALSE, FALSE, sizeof (Model *));
}

void
finalize (void)
{
  guint n, i;

  n = models->len;
  for (i = 0; i != n; i++)
  {
    Model * model = g_array_index (models, Model *, i);
    model_free (model);
  }

  g_array_unref (models);
  g_mutex_clear (&lock);
}

Model *
model_new (jclass class_handle,
           gpointer class_object,
           JNIEnv * env)
{
  Model * model;
  GHashTable * members;
  jvmtiEnv * jvmti = java_api.jvmti;
  gpointer * funcs = env->functions;
  jmethodID (* from_reflected_method) (JNIEnv *, jobject) = funcs[7];
  jfieldID (* from_reflected_field) (JNIEnv *, jobject) = funcs[8];
  jobject (* to_reflected_method) (JNIEnv *, jclass, jmethodID, jboolean) = funcs[9];
  jobject (* to_reflected_field) (JNIEnv *, jclass, jfieldID, jboolean) = funcs[12];
  void (* delete_local_ref) (JNIEnv *, jobject) = funcs[23];
  jobject (* call_object_method) (JNIEnv *, jobject, jmethodID, ...) = funcs[34];
  jint (* call_int_method) (JNIEnv *, jobject, jmethodID, ...) = funcs[49];
  const char * (* get_string_utf_chars) (JNIEnv *, jstring, jboolean *) = funcs[169];
  void (* release_string_utf_chars) (JNIEnv *, jstring, const char *) = funcs[170];
  jsize (* get_array_length) (JNIEnv *, jarray) = funcs[171];
  jobject (* get_object_array_element) (JNIEnv *, jobjectArray, jsize) = funcs[173];
  jsize n, i;

  model = g_new (Model, 1);

  members = g_hash_table_new_full (g_str_hash, g_str_equal, g_free, g_free);
  model->members = members;

  if (jvmti != NULL)
  {
    gpointer * jf = jvmti->functions - 1;
    jvmtiError (* deallocate) (jvmtiEnv *, void * mem) = jf[47];
    jvmtiError (* get_class_methods) (jvmtiEnv *, jclass, jint *, jmethodID **) = jf[52];
    jvmtiError (* get_class_fields) (jvmtiEnv *, jclass, jint *, jfieldID **) = jf[53];
    jvmtiError (* get_field_name) (jvmtiEnv *, jclass, jfieldID, char **, char **, char **) = jf[60];
    jvmtiError (* get_field_modifiers) (jvmtiEnv *, jclass, jfieldID, jint *) = jf[62];
    jvmtiError (* get_method_name) (jvmtiEnv *, jmethodID, char **, char **, char **) = jf[64];
    jvmtiError (* get_method_modifiers) (jvmtiEnv *, jmethodID, jint *) = jf[66];
    jint method_count;
    jmethodID * methods;
    jint field_count;
    jfieldID * fields;
    char * name;
    jint modifiers;

    get_class_methods (jvmti, class_handle, &method_count, &methods);
    for (i = 0; i != method_count; i++)
    {
      jmethodID method = methods[i];

      get_method_name (jvmti, method, &name, NULL, NULL);
      get_method_modifiers (jvmti, method, &modifiers);

      model_add_method (model, name, method, modifiers);

      deallocate (jvmti, name);
    }
    deallocate (jvmti, methods);

    get_class_fields (jvmti, class_handle, &field_count, &fields);
    for (i = 0; i != field_count; i++)
    {
      jfieldID field = fields[i];

      get_field_name (jvmti, class_handle, field, &name, NULL, NULL);
      get_field_modifiers (jvmti, class_handle, field, &modifiers);

      model_add_field (model, name, field, modifiers);

      deallocate (jvmti, name);
    }
    deallocate (jvmti, fields);
  }
  else if (art_api.available)
  {
    gpointer elements;
    guint n, i;
    const guint field_arrays[] = {
      art_api.class_offset_ifields,
      art_api.class_offset_sfields
    };
    guint field_array_cursor;
    gboolean merged_fields = art_api.class_offset_sfields == 0;

    elements = read_art_array (class_object, art_api.class_offset_methods, sizeof (gsize), NULL);
    n = *(guint16 *) (class_object + art_api.class_offset_copied_methods_offset);
    for (i = 0; i != n; i++)
    {
      jmethodID id;
      guint32 access_flags;
      jboolean is_static;
      jobject method, name;
      const char * name_str;
      jint modifiers;

      id = elements + (i * art_api.method_size);

      access_flags = *(guint32 *) (id + art_api.method_offset_access_flags);
      if ((access_flags & kAccConstructor) != 0)
        continue;
      is_static = (access_flags & kAccStatic) != 0;
      method = to_reflected_method (env, class_handle, id, is_static);
      name = call_object_method (env, method, java_api.method.get_name);
      name_str = get_string_utf_chars (env, name, NULL);
      modifiers = access_flags & 0xffff;

      model_add_method (model, name_str, id, modifiers);

      release_string_utf_chars (env, name, name_str);
      delete_local_ref (env, name);
      delete_local_ref (env, method);
    }

    for (field_array_cursor = 0; field_array_cursor != G_N_ELEMENTS (field_arrays); field_array_cursor++)
    {
      jboolean is_static;

      if (field_arrays[field_array_cursor] == 0)
        continue;

      if (!merged_fields)
        is_static = field_array_cursor == 1;

      elements = read_art_array (class_object, field_arrays[field_array_cursor], sizeof (guint32), &n);
      for (i = 0; i != n; i++)
      {
        jfieldID id;
        guint32 access_flags;
        jobject field, name;
        const char * name_str;
        jint modifiers;

        id = elements + (i * art_api.field_size);

        access_flags = *(guint32 *) (id + art_api.field_offset_access_flags);
        if (merged_fields)
          is_static = (access_flags & kAccStatic) != 0;
        field = to_reflected_field (env, class_handle, id, is_static);
        name = call_object_method (env, field, java_api.field.get_name);
        name_str = get_string_utf_chars (env, name, NULL);
        modifiers = access_flags & 0xffff;

        model_add_field (model, name_str, id, modifiers);

        release_string_utf_chars (env, name, name_str);
        delete_local_ref (env, name);
        delete_local_ref (env, field);
      }
    }
  }
  else
  {
    jobject elements;

    elements = call_object_method (env, class_handle, java_api.clazz.get_declared_methods);
    n = get_array_length (env, elements);
    for (i = 0; i != n; i++)
    {
      jobject method, name;
      const char * name_str;
      jmethodID id;
      jint modifiers;

      method = get_object_array_element (env, elements, i);
      name = call_object_method (env, method, java_api.method.get_name);
      name_str = get_string_utf_chars (env, name, NULL);
      id = from_reflected_method (env, method);
      modifiers = call_int_method (env, method, java_api.method.get_modifiers);

      model_add_method (model, name_str, id, modifiers);

      release_string_utf_chars (env, name, name_str);
      delete_local_ref (env, name);
      delete_local_ref (env, method);
    }
    delete_local_ref (env, elements);

    elements = call_object_method (env, class_handle, java_api.clazz.get_declared_fields);
    n = get_array_length (env, elements);
    for (i = 0; i != n; i++)
    {
      jobject field, name;
      const char * name_str;
      jfieldID id;
      jint modifiers;

      field = get_object_array_element (env, elements, i);
      name = call_object_method (env, field, java_api.field.get_name);
      name_str = get_string_utf_chars (env, name, NULL);
      id = from_reflected_field (env, field);
      modifiers = call_int_method (env, field, java_api.field.get_modifiers);

      model_add_field (model, name_str, id, modifiers);

      release_string_utf_chars (env, name, name_str);
      delete_local_ref (env, name);
      delete_local_ref (env, field);
    }
    delete_local_ref (env, elements);
  }

  g_mutex_lock (&lock);
  g_array_append_val (models, model);
  g_mutex_unlock (&lock);

  return model;
}

static void
model_add_method (Model * self,
                  const gchar * name,
                  jmethodID id,
                  jint modifiers)
{
  GHashTable * members = self->members;
  gchar * key, type;
  const gchar * value;

  if (name[0] == '$')
    key = g_strdup_printf ("_%s", name);
  else
    key = g_strdup (name);

  type = (modifiers & kAccStatic) != 0 ? 's' : 'i';

  value = g_hash_table_lookup (members, key);
  if (value == NULL)
    g_hash_table_insert (members, key, g_strdup_printf ("m:%c0x%zx", type, id));
  else
    g_hash_table_insert (members, key, g_strdup_printf ("%s:%c0x%zx", value, type, id));
}

static void
model_add_field (Model * self,
                 const gchar * name,
                 jfieldID id,
                 jint modifiers)
{
  GHashTable * members = self->members;
  gchar * key, type;

  if (name[0] == '$')
    key = g_strdup_printf ("_%s", name);
  else
    key = g_strdup (name);
  while (g_hash_table_contains (members, key))
  {
    gchar * new_key = g_strdup_printf ("_%s", key);
    g_free (key);
    key = new_key;
  }

  type = (modifiers & kAccStatic) != 0 ? 's' : 'i';

  g_hash_table_insert (members, key, g_strdup_printf ("f:%c0x%zx", type, id));
}

static void
model_free (Model * model)
{
  g_hash_table_unref (model->members);

  g_free (model);
}

gboolean
model_has (Model * self,
           const gchar * member)
{
  return g_hash_table_contains (self->members, member);
}

const gchar *
model_find (Model * self,
            const gchar * member)
{
  return g_hash_table_lookup (self->members, member);
}

gchar *
model_list (Model * self)
{
  GString * result;
  GHashTableIter iter;
  guint i;
  const gchar * name;

  result = g_string_sized_new (128);

  g_string_append_c (result, '[');

  g_hash_table_iter_init (&iter, self->members);
  for (i = 0; g_hash_table_iter_next (&iter, (gpointer *) &name, NULL); i++)
  {
    if (i > 0)
      g_string_append_c (result, ',');

    g_string_append_c (result, '"');
    g_string_append (result, name);
    g_string_append_c (result, '"');
  }

  g_string_append_c (result, ']');

  return g_string_free (result, FALSE);
}

gchar *
enumerate_methods_art (const gchar * class_query,
                       const gchar * method_query,
                       jboolean include_signature,
                       jboolean ignore_case,
                       jboolean skip_system_classes)
{
  gchar * result;
  EnumerateMethodsContext ctx;
  ArtClassVisitor visitor;
  ArtClassVisitorVTable visitor_vtable = { NULL, };

  ctx.class_query = make_pattern_spec (class_query, ignore_case);
  ctx.method_query = make_pattern_spec (method_query, ignore_case);
  ctx.include_signature = include_signature;
  ctx.ignore_case = ignore_case;
  ctx.skip_system_classes = skip_system_classes;
  ctx.groups = g_hash_table_new_full (NULL, NULL, NULL, NULL);

  visitor.vtable = &visitor_vtable;
  visitor.user_data = &ctx;

  visitor_vtable.visit = collect_matching_class_methods;

  art_api.visit_classes (art_api.linker, &visitor);

  result = finalize_method_groups_to_json (ctx.groups);

  g_hash_table_unref (ctx.groups);
  g_pattern_spec_free (ctx.method_query);
  g_pattern_spec_free (ctx.class_query);

  return result;
}

static jboolean
collect_matching_class_methods (ArtClassVisitor * self,
                                ArtClass * klass)
{
  EnumerateMethodsContext * ctx = self->user_data;
  const char * descriptor;
  StdString descriptor_storage = { 0, };
  gchar * class_name = NULL;
  gchar * class_name_copy = NULL;
  const gchar * normalized_class_name;
  JsonBuilder * group;
  size_t class_name_length;
  GHashTable * seen_method_names;
  gpointer elements;
  guint n, i;

  if (ctx->skip_system_classes && klass->class_loader == 0)
    goto skip_class;

  descriptor = art_api.get_class_descriptor (klass, &descriptor_storage);
  if (descriptor[0] != 'L')
    goto skip_class;

  class_name = class_name_from_signature (descriptor);

  if (ctx->ignore_case)
  {
    class_name_copy = g_utf8_strdown (class_name, -1);
    normalized_class_name = class_name_copy;
  }
  else
  {
    normalized_class_name = class_name;
  }

  if (!g_pattern_match_string (ctx->class_query, normalized_class_name))
    goto skip_class;

  group = NULL;
  class_name_length = strlen (class_name);
  seen_method_names = ctx->include_signature ? NULL : g_hash_table_new_full (g_str_hash, g_str_equal, g_free, NULL);

  elements = read_art_array (klass, art_api.class_offset_methods, sizeof (gsize), NULL);
  n = *(guint16 *) ((gpointer) klass + art_api.class_offset_copied_methods_offset);
  for (i = 0; i != n; i++)
  {
    ArtMethod * method;
    guint32 access_flags;
    jboolean is_constructor;
    StdString method_name = { 0, };
    const gchar * bare_method_name;
    gchar * bare_method_name_copy = NULL;
    const gchar * normalized_method_name;
    gchar * normalized_method_name_copy = NULL;

    method = elements + (i * art_api.method_size);

    access_flags = *(guint32 *) ((gpointer) method + art_api.method_offset_access_flags);
    is_constructor = (access_flags & kAccConstructor) != 0;

    art_api.pretty_method (&method_name, method, ctx->include_signature);
    bare_method_name = std_string_c_str (&method_name);
    if (ctx->include_signature)
    {
      const gchar * return_type_end, * name_begin;
      GString * name;

      return_type_end = strchr (bare_method_name, ' ');
      name_begin = return_type_end + 1 + class_name_length + 1;
      if (is_constructor && g_str_has_prefix (name_begin, "<clinit>"))
        goto skip_method;

      name = g_string_sized_new (64);

      if (is_constructor)
      {
        g_string_append (name, "$init");
        g_string_append (name, strchr (name_begin, '>') + 1);
      }
      else
      {
        g_string_append (name, name_begin);
      }
      g_string_append (name, ": ");
      g_string_append_len (name, bare_method_name, return_type_end - bare_method_name);

      bare_method_name_copy = g_string_free (name, FALSE);
      bare_method_name = bare_method_name_copy;
    }
    else
    {
      const gchar * name_begin;

      name_begin = bare_method_name + class_name_length + 1;
      if (is_constructor && strcmp (name_begin, "<clinit>") == 0)
        goto skip_method;

      if (is_constructor)
        bare_method_name = "$init";
      else
        bare_method_name += class_name_length + 1;
    }

    if (seen_method_names != NULL && g_hash_table_contains (seen_method_names, bare_method_name))
      goto skip_method;

    if (ctx->ignore_case)
    {
      normalized_method_name_copy = g_utf8_strdown (bare_method_name, -1);
      normalized_method_name = normalized_method_name_copy;
    }
    else
    {
      normalized_method_name = bare_method_name;
    }

    if (!g_pattern_match_string (ctx->method_query, normalized_method_name))
      goto skip_method;

    if (group == NULL)
    {
      group = g_hash_table_lookup (ctx->groups, GUINT_TO_POINTER (klass->class_loader));
      if (group == NULL)
      {
        group = json_builder_new_immutable ();
        g_hash_table_insert (ctx->groups, GUINT_TO_POINTER (klass->class_loader), group);

        json_builder_begin_object (group);

        json_builder_set_member_name (group, "loader");
        json_builder_add_int_value (group, klass->class_loader);

        json_builder_set_member_name (group, "classes");
        json_builder_begin_array (group);
      }

      json_builder_begin_object (group);

      json_builder_set_member_name (group, "name");
      json_builder_add_string_value (group, class_name);

      json_builder_set_member_name (group, "methods");
      json_builder_begin_array (group);
    }

    json_builder_add_string_value (group, bare_method_name);

    if (seen_method_names != NULL)
      g_hash_table_add (seen_method_names, g_strdup (bare_method_name));

skip_method:
    g_free (normalized_method_name_copy);
    g_free (bare_method_name_copy);
    std_string_destroy (&method_name);
  }

  if (seen_method_names != NULL)
    g_hash_table_unref (seen_method_names);

  if (group == NULL)
    goto skip_class;

  json_builder_end_array (group);
  json_builder_end_object (group);

skip_class:
  g_free (class_name_copy);
  g_free (class_name);
  std_string_destroy (&descriptor_storage);

  return TRUE;
}

gchar *
enumerate_methods_jvm (const gchar * class_query,
                       const gchar * method_query,
                       jboolean include_signature,
                       jboolean ignore_case,
                       jboolean skip_system_classes,
                       JNIEnv * env)
{
  gchar * result;
  GPatternSpec * class_pattern, * method_pattern;
  GHashTable * groups;
  gpointer * ef = env->functions;
  jobject (* new_global_ref) (JNIEnv *, jobject) = ef[21];
  void (* delete_local_ref) (JNIEnv *, jobject) = ef[23];
  jboolean (* is_same_object) (JNIEnv *, jobject, jobject) = ef[24];
  jvmtiEnv * jvmti = java_api.jvmti;
  gpointer * jf = jvmti->functions - 1;
  jvmtiError (* deallocate) (jvmtiEnv *, void * mem) = jf[47];
  jvmtiError (* get_class_signature) (jvmtiEnv *, jclass, char **, char **) = jf[48];
  jvmtiError (* get_class_methods) (jvmtiEnv *, jclass, jint *, jmethodID **) = jf[52];
  jvmtiError (* get_class_loader) (jvmtiEnv *, jclass, jobject *) = jf[57];
  jvmtiError (* get_method_name) (jvmtiEnv *, jmethodID, char **, char **, char **) = jf[64];
  jvmtiError (* get_loaded_classes) (jvmtiEnv *, jint *, jclass **) = jf[78];
  jint class_count, class_index;
  jclass * classes;

  class_pattern = make_pattern_spec (class_query, ignore_case);
  method_pattern = make_pattern_spec (method_query, ignore_case);
  groups = g_hash_table_new_full (NULL, NULL, NULL, NULL);

  if (get_loaded_classes (jvmti, &class_count, &classes) != JVMTI_ERROR_NONE)
    goto emit_results;

  for (class_index = 0; class_index != class_count; class_index++)
  {
    jclass klass = classes[class_index];
    jobject loader = NULL;
    gboolean have_loader = FALSE;
    char * signature = NULL;
    gchar * class_name = NULL;
    gchar * class_name_copy = NULL;
    const gchar * normalized_class_name;
    jint method_count, method_index;
    jmethodID * methods = NULL;
    JsonBuilder * group = NULL;
    GHashTable * seen_method_names = NULL;

    if (skip_system_classes)
    {
      if (get_class_loader (jvmti, klass, &loader) != JVMTI_ERROR_NONE)
        goto skip_class;
      have_loader = TRUE;

      if (loader == NULL)
        goto skip_class;
    }

    if (get_class_signature (jvmti, klass, &signature, NULL) != JVMTI_ERROR_NONE)
      goto skip_class;

    class_name = class_name_from_signature (signature);

    if (ignore_case)
    {
      class_name_copy = g_utf8_strdown (class_name, -1);
      normalized_class_name = class_name_copy;
    }
    else
    {
      normalized_class_name = class_name;
    }

    if (!g_pattern_match_string (class_pattern, normalized_class_name))
      goto skip_class;

    if (get_class_methods (jvmti, klass, &method_count, &methods) != JVMTI_ERROR_NONE)
      goto skip_class;

    if (!include_signature)
      seen_method_names = g_hash_table_new_full (g_str_hash, g_str_equal, g_free, NULL);

    for (method_index = 0; method_index != method_count; method_index++)
    {
      jmethodID method = methods[method_index];
      const gchar * method_name;
      char * method_name_value = NULL;
      char * method_signature_value = NULL;
      gchar * method_name_copy = NULL;
      const gchar * normalized_method_name;
      gchar * normalized_method_name_copy = NULL;

      if (get_method_name (jvmti, method, &method_name_value, include_signature ? &method_signature_value : NULL, NULL) != JVMTI_ERROR_NONE)
        goto skip_method;
      method_name = method_name_value;

      if (method_name[0] == '<')
      {
        if (strcmp (method_name, "<init>") == 0)
          method_name = "$init";
        else if (strcmp (method_name, "<clinit>") == 0)
          goto skip_method;
      }

      if (include_signature)
      {
        method_name_copy = format_method_signature (method_name, method_signature_value);
        method_name = method_name_copy;
      }

      if (seen_method_names != NULL && g_hash_table_contains (seen_method_names, method_name))
        goto skip_method;

      if (ignore_case)
      {
        normalized_method_name_copy = g_utf8_strdown (method_name, -1);
        normalized_method_name = normalized_method_name_copy;
      }
      else
      {
        normalized_method_name = method_name;
      }

      if (!g_pattern_match_string (method_pattern, normalized_method_name))
        goto skip_method;

      if (group == NULL)
      {
        if (!have_loader && get_class_loader (jvmti, klass, &loader) != JVMTI_ERROR_NONE)
          goto skip_method;

        if (loader == NULL)
        {
          group = g_hash_table_lookup (groups, NULL);
        }
        else
        {
          GHashTableIter iter;
          jobject cur_loader;
          JsonBuilder * cur_group;

          g_hash_table_iter_init (&iter, groups);
          while (g_hash_table_iter_next (&iter, (gpointer *) &cur_loader, (gpointer *) &cur_group))
          {
            if (cur_loader != NULL && is_same_object (env, cur_loader, loader))
            {
              group = cur_group;
              break;
            }
          }
        }

        if (group == NULL)
        {
          jobject l;
          gchar * str;

          l = (loader != NULL) ? new_global_ref (env, loader) : NULL;

          group = json_builder_new_immutable ();
          g_hash_table_insert (groups, l, group);

          json_builder_begin_object (group);

          json_builder_set_member_name (group, "loader");
          str = g_strdup_printf ("0x%" G_GSIZE_MODIFIER "x", GPOINTER_TO_SIZE (l));
          json_builder_add_string_value (group, str);
          g_free (str);

          json_builder_set_member_name (group, "classes");
          json_builder_begin_array (group);
        }

        json_builder_begin_object (group);

        json_builder_set_member_name (group, "name");
        json_builder_add_string_value (group, class_name);

        json_builder_set_member_name (group, "methods");
        json_builder_begin_array (group);
      }

      json_builder_add_string_value (group, method_name);

      if (seen_method_names != NULL)
        g_hash_table_add (seen_method_names, g_strdup (method_name));

skip_method:
      g_free (normalized_method_name_copy);
      g_free (method_name_copy);
      deallocate (jvmti, method_signature_value);
      deallocate (jvmti, method_name_value);
    }

skip_class:
    if (group != NULL)
    {
      json_builder_end_array (group);
      json_builder_end_object (group);
    }

    if (seen_method_names != NULL)
      g_hash_table_unref (seen_method_names);

    deallocate (jvmti, methods);

    g_free (class_name_copy);
    g_free (class_name);
    deallocate (jvmti, signature);

    if (loader != NULL)
      delete_local_ref (env, loader);

    delete_local_ref (env, klass);
  }

  deallocate (jvmti, classes);

emit_results:
  result = finalize_method_groups_to_json (groups);

  g_hash_table_unref (groups);
  g_pattern_spec_free (method_pattern);
  g_pattern_spec_free (class_pattern);

  return result;
}

static gchar *
finalize_method_groups_to_json (GHashTable * groups)
{
  GString * result;
  GHashTableIter iter;
  guint i;
  JsonBuilder * group;

  result = g_string_sized_new (1024);

  g_string_append_c (result, '[');

  g_hash_table_iter_init (&iter, groups);
  for (i = 0; g_hash_table_iter_next (&iter, NULL, (gpointer *) &group); i++)
  {
    JsonNode * root;
    gchar * json;

    if (i > 0)
      g_string_append_c (result, ',');

    json_builder_end_array (group);
    json_builder_end_object (group);

    root = json_builder_get_root (group);
    json = json_to_string (root, FALSE);
    g_string_append (result, json);
    g_free (json);
    json_node_unref (root);

    g_object_unref (group);
  }

  g_string_append_c (result, ']');

  return g_string_free (result, FALSE);
}

static GPatternSpec *
make_pattern_spec (const gchar * pattern,
                   jboolean ignore_case)
{
  GPatternSpec * spec;

  if (ignore_case)
  {
    gchar * str = g_utf8_strdown (pattern, -1);
    spec = g_pattern_spec_new (str);
    g_free (str);
  }
  else
  {
    spec = g_pattern_spec_new (pattern);
  }

  return spec;
}

static gchar *
class_name_from_signature (const gchar * descriptor)
{
  gchar * result, * c;

  result = g_strdup (descriptor + 1);

  for (c = result; *c != '\\0'; c++)
  {
    if (*c == '/')
      *c = '.';
  }

  c[-1] = '\\0';

  return result;
}

static gchar *
format_method_signature (const gchar * name,
                         const gchar * signature)
{
  GString * sig;
  const gchar * cursor;
  gint arg_index;

  sig = g_string_sized_new (128);

  g_string_append (sig, name);

  cursor = signature;
  arg_index = -1;
  while (TRUE)
  {
    const gchar c = *cursor;

    if (c == '(')
    {
      g_string_append_c (sig, c);
      cursor++;
      arg_index = 0;
    }
    else if (c == ')')
    {
      g_string_append_c (sig, c);
      cursor++;
      break;
    }
    else
    {
      if (arg_index >= 1)
        g_string_append (sig, ", ");

      append_type (sig, &cursor);

      if (arg_index != -1)
        arg_index++;
    }
  }

  g_string_append (sig, ": ");
  append_type (sig, &cursor);

  return g_string_free (sig, FALSE);
}

static void
append_type (GString * output,
             const gchar ** type)
{
  const gchar * cursor = *type;

  switch (*cursor)
  {
    case 'Z':
      g_string_append (output, "boolean");
      cursor++;
      break;
    case 'B':
      g_string_append (output, "byte");
      cursor++;
      break;
    case 'C':
      g_string_append (output, "char");
      cursor++;
      break;
    case 'S':
      g_string_append (output, "short");
      cursor++;
      break;
    case 'I':
      g_string_append (output, "int");
      cursor++;
      break;
    case 'J':
      g_string_append (output, "long");
      cursor++;
      break;
    case 'F':
      g_string_append (output, "float");
      cursor++;
      break;
    case 'D':
      g_string_append (output, "double");
      cursor++;
      break;
    case 'V':
      g_string_append (output, "void");
      cursor++;
      break;
    case 'L':
    {
      gchar ch;

      cursor++;
      for (; (ch = *cursor) != ';'; cursor++)
      {
        g_string_append_c (output, (ch != '/') ? ch : '.');
      }
      cursor++;

      break;
    }
    case '[':
      *type = cursor + 1;
      append_type (output, type);
      g_string_append (output, "[]");
      return;
    default:
      g_string_append (output, "BUG");
      cursor++;
  }

  *type = cursor;
}

void
dealloc (gpointer mem)
{
  g_free (mem);
}

static gpointer
read_art_array (gpointer object_base,
                guint field_offset,
                guint length_size,
                guint * length)
{
  gpointer result, header;
  guint n;

  header = GSIZE_TO_POINTER (*(guint64 *) (object_base + field_offset));
  if (header != NULL)
  {
    result = header + length_size;
    if (length_size == sizeof (guint32))
      n = *(guint32 *) header;
    else
      n = *(guint64 *) header;
  }
  else
  {
    result = NULL;
    n = 0;
  }

  if (length != NULL)
    *length = n;

  return result;
}

static void
std_string_destroy (StdString * str)
{
  if ((str->l.capacity & 1) != 0)
    art_api.free (str->l.data);
}

static gchar *
std_string_c_str (StdString * self)
{
  if ((self->l.capacity & 1) != 0)
    return self->l.data;

  return self->s.data;
}
`,wd=/(.+)!([^/]+)\/?([isu]+)?/,ve=null,Bo=null,ze=class t{static build(e,n){return Uo(n),Bo(e,n,r=>new t(ve.new(e,r,n)))}static enumerateMethods(e,n,r){Uo(r);let o=e.match(wd);if(o===null)throw new Error("Invalid query; format is: class!method -- see documentation of Java.enumerateMethods(query) for details");let s=Memory.allocUtf8String(o[1]),i=Memory.allocUtf8String(o[2]),l=!1,a=!1,c=!1,d=o[3];d!==void 0&&(l=d.indexOf("s")!==-1,a=d.indexOf("i")!==-1,c=d.indexOf("u")!==-1);let p;if(n.jvmti!==null){let f=ve.enumerateMethodsJvm(s,i,Ke(l),Ke(a),Ke(c),r);try{p=JSON.parse(f.readUtf8String()).map(u=>{let _=ptr(u.loader);return u.loader=_.isNull()?null:_,u})}finally{ve.dealloc(f)}}else Ee(r.vm,r,f=>{let u=ve.enumerateMethodsArt(s,i,Ke(l),Ke(a),Ke(c));try{let _=n["art::JavaVMExt::AddGlobalRef"],{vm:h}=n;p=JSON.parse(u.readUtf8String()).map(g=>{let y=g.loader;return g.loader=y!==0?_(h,f,ptr(y)):null,g})}finally{ve.dealloc(u)}});return p}constructor(e){this.handle=e}has(e){return ve.has(this.handle,Memory.allocUtf8String(e))!==0}find(e){return ve.find(this.handle,Memory.allocUtf8String(e)).readUtf8String()}list(){let e=ve.list(this.handle);try{return JSON.parse(e.readUtf8String())}finally{ve.dealloc(e)}}};function Uo(t){ve===null&&(ve=Id(t),Bo=Cd(ve,t.vm))}function Id(t){let e=ht(),{jvmti:n=null}=e,{pointerSize:r}=Process,o=8,s=r,i=7*r,l=10*4+5*r,a=o+s+i+l,d=Memory.alloc(a),p=d.add(o),f=p.add(s),{getDeclaredMethods:u,getDeclaredFields:_}=t.javaLangClass(),h=t.javaLangReflectMethod(),g=t.javaLangReflectField(),y=f;[n!==null?n:NULL,u,_,h.getName,h.getModifiers,g.getName,g.getModifiers].forEach(k=>{y=y.writePointer(k).add(r)});let E=f.add(i),{vm:C}=t;if(e.flavor==="art"){let k;if(n!==null)k=[0,0,0,0];else{let j=qn(C).offset;k=[j.ifields,j.methods,j.sfields,j.copiedMethodsOffset]}let N=me(C),S=Ft(C),L=E;[1,...k,N.size,N.offset.accessFlags,S.size,S.offset.accessFlags,4294967295].forEach(j=>{L=L.writeUInt(j).add(4)}),[e.artClassLinker.address,e["art::ClassLinker::VisitClasses"],e["art::mirror::Class::GetDescriptor"],e["art::ArtMethod::PrettyMethod"],Process.getModuleByName("libc.so").getExportByName("free")].forEach((j,w)=>{j===void 0&&(j=NULL),L=L.writePointer(j).add(r)})}let T=new CModule(Sd,{lock:d,models:p,java_api:f,art_api:E}),M={exceptions:"propagate"},O={exceptions:"propagate",scheduling:"exclusive"};return{handle:T,new:new NativeFunction(T.model_new,"pointer",["pointer","pointer","pointer"],M),has:new NativeFunction(T.model_has,"bool",["pointer","pointer"],O),find:new NativeFunction(T.model_find,"pointer",["pointer","pointer"],O),list:new NativeFunction(T.model_list,"pointer",["pointer"],O),enumerateMethodsArt:new NativeFunction(T.enumerate_methods_art,"pointer",["pointer","pointer","bool","bool","bool"],M),enumerateMethodsJvm:new NativeFunction(T.enumerate_methods_jvm,"pointer",["pointer","pointer","bool","bool","bool","pointer"],M),dealloc:new NativeFunction(T.dealloc,"void",["pointer"],O)}}function Cd(t,e){let n=ht();if(n.flavor!=="art")return Ad;let r=n["art::JavaVMExt::DecodeGlobal"];return function(o,s,i){let l;return Ee(e,s,a=>{let c=r(e,a,o);l=i(c)}),l}}function Ad(t,e,n){return n(NULL)}function Ke(t){return t?1:0}var _t=class{constructor(e,n){this.items=new Map,this.capacity=e,this.destroy=n}dispose(e){let{items:n,destroy:r}=this;n.forEach(o=>{r(o,e)}),n.clear()}get(e){let{items:n}=this,r=n.get(e);return r!==void 0&&(n.delete(e),n.set(e,r)),r}set(e,n,r){let{items:o}=this,s=o.get(e);if(s!==void 0)o.delete(e),this.destroy(s,r);else if(o.size===this.capacity){let i=o.keys().next().value,l=o.get(i);o.delete(i),this.destroy(l,r)}o.set(e,n)}};var mt=1,pr=256,zo=65536,Td=305419896,Jo=32,Vo=12,Go=8,$o=8,Ho=4,Zo=4,qo=12,Ld=0,xd=1,Nd=2,kd=3,Md=4,jd=5,Od=6,Rd=4096,Pd=4097,Fd=4099,Dd=8192,Ud=8193,Bd=8194,zd=8195,Jd=8196,Vd=8198,Gd=24,$d=28,Hd=2,Zd=24,Wo=m.from([3,0,7,14,0]),dr="Ldalvik/annotation/Throws;",qd=m.from([0]);function Wd(t){let e=new fr,n=Object.assign({},t);return e.addClass(n),e.build()}var fr=class{constructor(){this.classes=[]}addClass(e){this.classes.push(e)}build(){let e=Xd(this.classes),{classes:n,interfaces:r,fields:o,methods:s,protos:i,parameters:l,annotationDirectories:a,annotationSets:c,throwsAnnotations:d,types:p,strings:f}=e,u=0,_=0,h=8,g=12,y=20,E=112;u+=E;let C=u,T=f.length*Zo;u+=T;let M=u,O=p.length*Ho;u+=O;let k=u,N=i.length*Vo;u+=N;let S=u,L=o.length*Go;u+=L;let j=u,w=s.length*$o;u+=w;let R=u,D=n.length*Jo;u+=D;let U=u,F=c.map(A=>{let P=u;return A.offset=P,u+=4+A.items.length*4,P}),z=n.reduce((A,P)=>(P.classData.constructorMethods.forEach(Z=>{let[,W,q]=Z;(W&pr)===0&&q>=0&&(Z.push(u),A.push({offset:u,superConstructor:q}),u+=Zd)}),A),[]);a.forEach(A=>{A.offset=u,u+=16+A.methods.length*8});let ee=r.map(A=>{u=ur(u,4);let P=u;return A.offset=P,u+=4+2*A.types.length,P}),ne=l.map(A=>{u=ur(u,4);let P=u;return A.offset=P,u+=4+2*A.types.length,P}),le=[],X=f.map(A=>{let P=u,B=m.from(ge(A.length)),Z=m.from(A,"utf8"),W=m.concat([B,Z,qd]);return le.push(W),u+=W.length,P}),ie=z.map(A=>{let P=u;return u+=Wo.length,P}),Y=d.map(A=>{let P=Qd(A);return A.offset=u,u+=P.length,P}),re=n.map((A,P)=>{A.classData.offset=u;let B=Kd(A);return u+=B.length,B}),we=0,et=0;u=ur(u,4);let H=u,_e=r.length+l.length,Te=4+(o.length>0?1:0)+2+c.length+z.length+a.length+(_e>0?1:0)+1+ie.length+d.length+n.length+1,Pe=4+Te*qo;u+=Pe;let Me=u-U,Ge=u,I=m.alloc(Ge);I.write(`dex
035`),I.writeUInt32LE(Ge,32),I.writeUInt32LE(E,36),I.writeUInt32LE(Td,40),I.writeUInt32LE(we,44),I.writeUInt32LE(et,48),I.writeUInt32LE(H,52),I.writeUInt32LE(f.length,56),I.writeUInt32LE(C,60),I.writeUInt32LE(p.length,64),I.writeUInt32LE(M,68),I.writeUInt32LE(i.length,72),I.writeUInt32LE(k,76),I.writeUInt32LE(o.length,80),I.writeUInt32LE(o.length>0?S:0,84),I.writeUInt32LE(s.length,88),I.writeUInt32LE(j,92),I.writeUInt32LE(n.length,96),I.writeUInt32LE(R,100),I.writeUInt32LE(Me,104),I.writeUInt32LE(U,108),X.forEach((A,P)=>{I.writeUInt32LE(A,C+P*Zo)}),p.forEach((A,P)=>{I.writeUInt32LE(A,M+P*Ho)}),i.forEach((A,P)=>{let[B,Z,W]=A,q=k+P*Vo;I.writeUInt32LE(B,q),I.writeUInt32LE(Z,q+4),I.writeUInt32LE(W!==null?W.offset:0,q+8)}),o.forEach((A,P)=>{let[B,Z,W]=A,q=S+P*Go;I.writeUInt16LE(B,q),I.writeUInt16LE(Z,q+2),I.writeUInt32LE(W,q+4)}),s.forEach((A,P)=>{let[B,Z,W]=A,q=j+P*$o;I.writeUInt16LE(B,q),I.writeUInt16LE(Z,q+2),I.writeUInt32LE(W,q+4)}),n.forEach((A,P)=>{let{interfaces:B,annotationsDirectory:Z}=A,W=B!==null?B.offset:0,q=Z!==null?Z.offset:0,tt=0,ye=R+P*Jo;I.writeUInt32LE(A.index,ye),I.writeUInt32LE(A.accessFlags,ye+4),I.writeUInt32LE(A.superClassIndex,ye+8),I.writeUInt32LE(W,ye+12),I.writeUInt32LE(A.sourceFileIndex,ye+16),I.writeUInt32LE(q,ye+20),I.writeUInt32LE(A.classData.offset,ye+24),I.writeUInt32LE(tt,ye+28)}),c.forEach((A,P)=>{let{items:B}=A,Z=F[P];I.writeUInt32LE(B.length,Z),B.forEach((W,q)=>{I.writeUInt32LE(W.offset,Z+4+q*4)})}),z.forEach((A,P)=>{let{offset:B,superConstructor:Z}=A,W=1,q=1,tt=1,ye=0,bt=4;I.writeUInt16LE(W,B),I.writeUInt16LE(q,B+2),I.writeUInt16LE(tt,B+4),I.writeUInt16LE(ye,B+6),I.writeUInt32LE(ie[P],B+8),I.writeUInt32LE(bt,B+12),I.writeUInt16LE(4208,B+16),I.writeUInt16LE(Z,B+18),I.writeUInt16LE(0,B+20),I.writeUInt16LE(14,B+22)}),a.forEach(A=>{let P=A.offset,B=0,Z=0,W=A.methods.length,q=0;I.writeUInt32LE(B,P),I.writeUInt32LE(Z,P+4),I.writeUInt32LE(W,P+8),I.writeUInt32LE(q,P+12),A.methods.forEach((tt,ye)=>{let bt=P+16+ye*8,[Ts,Ls]=tt;I.writeUInt32LE(Ts,bt),I.writeUInt32LE(Ls.offset,bt+4)})}),r.forEach((A,P)=>{let B=ee[P];I.writeUInt32LE(A.types.length,B),A.types.forEach((Z,W)=>{I.writeUInt16LE(Z,B+4+W*2)})}),l.forEach((A,P)=>{let B=ne[P];I.writeUInt32LE(A.types.length,B),A.types.forEach((Z,W)=>{I.writeUInt16LE(Z,B+4+W*2)})}),le.forEach((A,P)=>{A.copy(I,X[P])}),ie.forEach(A=>{Wo.copy(I,A)}),Y.forEach((A,P)=>{A.copy(I,d[P].offset)}),re.forEach((A,P)=>{A.copy(I,n[P].classData.offset)}),I.writeUInt32LE(Te,H);let ce=[[Ld,1,_],[xd,f.length,C],[Nd,p.length,M],[kd,i.length,k]];o.length>0&&ce.push([Md,o.length,S]),ce.push([jd,s.length,j]),ce.push([Od,n.length,R]),c.forEach((A,P)=>{ce.push([Fd,A.items.length,F[P]])}),z.forEach(A=>{ce.push([Ud,1,A.offset])}),a.forEach(A=>{ce.push([Vd,1,A.offset])}),_e>0&&ce.push([Pd,_e,ee.concat(ne)[0]]),ce.push([Bd,f.length,X[0]]),ie.forEach(A=>{ce.push([zd,1,A])}),d.forEach(A=>{ce.push([Jd,1,A.offset])}),n.forEach(A=>{ce.push([Dd,1,A.classData.offset])}),ce.push([Rd,1,H]),ce.forEach((A,P)=>{let[B,Z,W]=A,q=H+4+P*qo;I.writeUInt16LE(B,q),I.writeUInt32LE(Z,q+4),I.writeUInt32LE(W,q+8)});let Mr=new Checksum("sha1");return Mr.update(I.slice(g+y)),m.from(Mr.getDigest()).copy(I,g),I.writeUInt32LE(ou(I,g),h),I}};function Kd(t){let{instanceFields:e,constructorMethods:n,virtualMethods:r}=t.classData;return m.from([0].concat(ge(e.length)).concat(ge(n.length)).concat(ge(r.length)).concat(e.reduce((s,[i,l])=>s.concat(ge(i)).concat(ge(l)),[])).concat(n.reduce((s,[i,l,,a])=>s.concat(ge(i)).concat(ge(l)).concat(ge(a||0)),[])).concat(r.reduce((s,[i,l])=>s.concat(ge(i)).concat(ge(l)).concat([0]),[])))}function Qd(t){let{thrownTypes:e}=t;return m.from([Hd].concat(ge(t.type)).concat([1]).concat(ge(t.value)).concat([$d,e.length]).concat(e.reduce((n,r)=>(n.push(Gd,r),n),[])))}function Xd(t){let e=new Set,n=new Set,r={},o=[],s=[],i={},l=new Set,a=new Set;t.forEach(w=>{let{name:R,superClass:D,sourceFileName:U}=w;e.add("this"),e.add(R),n.add(R),e.add(D),n.add(D),e.add(U),w.interfaces.forEach(F=>{e.add(F),n.add(F)}),w.fields.forEach(F=>{let[z,ee]=F;e.add(z),e.add(ee),n.add(ee),o.push([w.name,ee,z])}),w.methods.some(([F])=>F==="<init>")||(w.methods.unshift(["<init>","V",[]]),l.add(R)),w.methods.forEach(F=>{let[z,ee,ne,le=[],X]=F;e.add(z);let ie=c(ee,ne),Y=null;if(le.length>0){let re=le.slice();re.sort(),Y=re.join("|");let we=i[Y];we===void 0&&(we={id:Y,types:re},i[Y]=we),e.add(dr),n.add(dr),le.forEach(et=>{e.add(et),n.add(et)}),e.add("value")}if(s.push([w.name,ie,z,Y,X]),z==="<init>"){a.add(R+"|"+ie);let re=D+"|"+ie;l.has(R)&&!a.has(re)&&(s.push([D,ie,z,null,0]),a.add(re))}})});function c(w,R){let D=[w].concat(R),U=D.join("|");if(r[U]!==void 0)return U;e.add(w),n.add(w),R.forEach(z=>{e.add(z),n.add(z)});let F=D.map(ru).join("");return e.add(F),r[U]=[U,F,w,R],U}let d=Array.from(e);d.sort();let p=d.reduce((w,R,D)=>(w[R]=D,w),{}),f=Array.from(n).map(w=>p[w]);f.sort(Ko);let u=f.reduce((w,R,D)=>(w[d[R]]=D,w),{}),_=Object.keys(r).map(w=>r[w]);_.sort(eu);let h={},g=_.map(w=>{let[,R,D,U]=w,F;if(U.length>0){let z=U.join("|");F=h[z],F===void 0&&(F={types:U.map(ee=>u[ee]),offset:-1},h[z]=F)}else F=null;return[p[R],u[D],F]}),y=_.reduce((w,R,D)=>{let[U]=R;return w[U]=D,w},{}),E=Object.keys(h).map(w=>h[w]),C=o.map(w=>{let[R,D,U]=w;return[u[R],u[D],p[U]]});C.sort(tu);let T=s.map(w=>{let[R,D,U,F,z]=w;return[u[R],y[D],p[U],F,z]});T.sort(nu);let M=Object.keys(i).map(w=>i[w]).map(w=>({id:w.id,type:u[dr],value:p.value,thrownTypes:w.types.map(R=>u[R]),offset:-1})),O=M.map(w=>({id:w.id,items:[w],offset:-1})),k=O.reduce((w,R,D)=>(w[R.id]=D,w),{}),N={},S=[],L=t.map(w=>{let R=u[w.name],D=mt,U=u[w.superClass],F,z=w.interfaces.map(H=>u[H]);if(z.length>0){z.sort(Ko);let H=z.join("|");F=N[H],F===void 0&&(F={types:z,offset:-1},N[H]=F)}else F=null;let ee=p[w.sourceFileName],ne=T.reduce((H,_e,Te)=>{let[Pe,Me,Ge,I,ce]=_e;return Pe===R&&H.push([Te,Ge,I,Me,ce]),H},[]),le=null,X=ne.filter(([,,H])=>H!==null).map(([H,,_e])=>[H,O[k[_e]]]);X.length>0&&(le={methods:X,offset:-1},S.push(le));let ie=C.reduce((H,_e,Te)=>{let[Pe]=_e;return Pe===R&&H.push([Te>0?1:0,mt]),H},[]),Y=p["<init>"],re=ne.filter(([,H])=>H===Y).map(([H,,,_e])=>{if(l.has(w.name)){let Te=-1,Pe=T.length;for(let Me=0;Me!==Pe;Me++){let[Ge,I,ce]=T[Me];if(Ge===U&&ce===Y&&I===_e){Te=Me;break}}return[H,mt|zo,Te]}else return[H,mt|zo|pr,-1]}),we=Yd(ne.filter(([,H])=>H!==Y).map(([H,,,,_e])=>[H,_e|mt|pr]));return{index:R,accessFlags:D,superClassIndex:U,interfaces:F,sourceFileIndex:ee,annotationsDirectory:le,classData:{instanceFields:ie,constructorMethods:re,virtualMethods:we,offset:-1}}}),j=Object.keys(N).map(w=>N[w]);return{classes:L,interfaces:j,fields:C,methods:T,protos:g,parameters:E,annotationDirectories:S,annotationSets:O,throwsAnnotations:M,types:f,strings:d}}function Yd(t){let e=0;return t.map(([n,r],o)=>{let s;return o===0?s=[n,r]:s=[n-e,r],e=n,s})}function Ko(t,e){return t-e}function eu(t,e){let[,,n,r]=t,[,,o,s]=e;if(n<o)return-1;if(n>o)return 1;let i=r.join("|"),l=s.join("|");return i<l?-1:i>l?1:0}function tu(t,e){let[n,r,o]=t,[s,i,l]=e;return n!==s?n-s:o!==l?o-l:r-i}function nu(t,e){let[n,r,o]=t,[s,i,l]=e;return n!==s?n-s:o!==l?o-l:r-i}function ru(t){let e=t[0];return e==="L"||e==="["?"L":t}function ge(t){if(t<=127)return[t];let e=[],n=!1;do{let r=t&127;t>>=7,n=t!==0,n&&(r|=128),e.push(r)}while(n);return e}function ur(t,e){let n=t%e;return n===0?t:t+e-n}function ou(t,e){let n=1,r=0,o=t.length;for(let s=e;s<o;s++)n=(n+t[s])%65521,r=(r+n)%65521;return(r<<16|n)>>>0}var Qo=Wd;var su=1,hr=null,Xo=null;function Yo(t){hr=t}function _r(t,e,n){let r=Qe(t);return r===null&&(t.indexOf("[")===0?r=mr(t,e,n):(t[0]==="L"&&t[t.length-1]===";"&&(t=t.substring(1,t.length-1)),r=au(t,e,n))),Object.assign({className:t},r)}var es={boolean:{name:"Z",type:"uint8",size:1,byteSize:1,defaultValue:!1,isCompatible(t){return typeof t=="boolean"},fromJni(t){return!!t},toJni(t){return t?1:0},read(t){return t.readU8()},write(t,e){t.writeU8(e)},toString(){return this.name}},byte:{name:"B",type:"int8",size:1,byteSize:1,defaultValue:0,isCompatible(t){return Number.isInteger(t)&&t>=-128&&t<=127},fromJni:Se,toJni:Se,read(t){return t.readS8()},write(t,e){t.writeS8(e)},toString(){return this.name}},char:{name:"C",type:"uint16",size:1,byteSize:2,defaultValue:0,isCompatible(t){if(typeof t!="string"||t.length!==1)return!1;let e=t.charCodeAt(0);return e>=0&&e<=65535},fromJni(t){return String.fromCharCode(t)},toJni(t){return t.charCodeAt(0)},read(t){return t.readU16()},write(t,e){t.writeU16(e)},toString(){return this.name}},short:{name:"S",type:"int16",size:1,byteSize:2,defaultValue:0,isCompatible(t){return Number.isInteger(t)&&t>=-32768&&t<=32767},fromJni:Se,toJni:Se,read(t){return t.readS16()},write(t,e){t.writeS16(e)},toString(){return this.name}},int:{name:"I",type:"int32",size:1,byteSize:4,defaultValue:0,isCompatible(t){return Number.isInteger(t)&&t>=-2147483648&&t<=2147483647},fromJni:Se,toJni:Se,read(t){return t.readS32()},write(t,e){t.writeS32(e)},toString(){return this.name}},long:{name:"J",type:"int64",size:2,byteSize:8,defaultValue:0,isCompatible(t){return typeof t=="number"||t instanceof Int64},fromJni:Se,toJni:Se,read(t){return t.readS64()},write(t,e){t.writeS64(e)},toString(){return this.name}},float:{name:"F",type:"float",size:1,byteSize:4,defaultValue:0,isCompatible(t){return typeof t=="number"},fromJni:Se,toJni:Se,read(t){return t.readFloat()},write(t,e){t.writeFloat(e)},toString(){return this.name}},double:{name:"D",type:"double",size:2,byteSize:8,defaultValue:0,isCompatible(t){return typeof t=="number"},fromJni:Se,toJni:Se,read(t){return t.readDouble()},write(t,e){t.writeDouble(e)},toString(){return this.name}},void:{name:"V",type:"void",size:0,byteSize:0,defaultValue:void 0,isCompatible(t){return t===void 0},fromJni(){},toJni(){return NULL},toString(){return this.name}}},iu=new Set(Object.values(es).map(t=>t.name));function Qe(t){let e=es[t];return e!==void 0?e:null}function au(t,e,n){let r=n._types[e?1:0],o=r[t];return o!==void 0||(t==="java.lang.Object"?o=lu(n):o=cu(t,e,n),r[t]=o),o}function lu(t){return{name:"Ljava/lang/Object;",type:"pointer",size:1,defaultValue:NULL,isCompatible(e){return e===null?!0:e===void 0?!1:e.$h instanceof NativePointer?!0:typeof e=="string"},fromJni(e,n,r){return e.isNull()?null:t.cast(e,t.use("java.lang.Object"),r)},toJni(e,n){return e===null?NULL:typeof e=="string"?n.newStringUtf(e):e.$h}}}function cu(t,e,n){let r=null,o=null,s=null;function i(){return r===null&&(r=n.use(t).class),r}function l(c){let d=i();return o===null&&(o=d.isInstance.overload("java.lang.Object")),o.call(d,c)}function a(){if(s===null){let c=i();s=n.use("java.lang.String").class.isAssignableFrom(c)}return s}return{name:Je(t),type:"pointer",size:1,defaultValue:NULL,isCompatible(c){return c===null?!0:c===void 0?!1:c.$h instanceof NativePointer?l(c):typeof c=="string"&&a()},fromJni(c,d,p){return c.isNull()?null:a()&&e?d.stringFromJni(c):n.cast(c,n.use(t),p)},toJni(c,d){return c===null?NULL:typeof c=="string"?d.newStringUtf(c):c.$h},toString(){return this.name}}}var du=[["Z","boolean"],["B","byte"],["C","char"],["D","double"],["F","float"],["I","int"],["J","long"],["S","short"]].reduce((t,[e,n])=>(t["["+e]=uu("["+e,n),t),{});function uu(t,e){let n=b.prototype,r=mu(e),o={typeName:e,newArray:n["new"+r+"Array"],setRegion:n["set"+r+"ArrayRegion"],getElements:n["get"+r+"ArrayElements"],releaseElements:n["release"+r+"ArrayElements"]};return{name:t,type:"pointer",size:1,defaultValue:NULL,isCompatible(s){return _u(s,e)},fromJni(s,i,l){return fu(s,o,i,l)},toJni(s,i){return hu(s,o,i)}}}function mr(t,e,n){let r=du[t];if(r!==void 0)return r;if(t.indexOf("[")!==0)throw new Error("Unsupported type: "+t);let o=t.substring(1),s=_r(o,e,n),i=0,l=o.length;for(;i!==l&&o[i]==="[";)i++;o=o.substring(i),o[0]==="L"&&o[o.length-1]===";"&&(o=o.substring(1,o.length-1));let a=o.replace(/\./g,"/");iu.has(a)?a="[".repeat(i)+a:a="[".repeat(i)+"L"+a+";";let c="["+a;return o="[".repeat(i)+o,{name:t.replace(/\./g,"/"),type:"pointer",size:1,defaultValue:NULL,isCompatible(d){return d===null?!0:typeof d!="object"||d.length===void 0?!1:d.every(function(p){return s.isCompatible(p)})},fromJni(d,p,f){if(d.isNull())return null;let u=[],_=p.getArrayLength(d);for(let h=0;h!==_;h++){let g=p.getObjectArrayElement(d,h);try{u.push(s.fromJni(g,p))}finally{p.deleteLocalRef(g)}}try{u.$w=n.cast(d,n.use(c),f)}catch{n.use("java.lang.reflect.Array").newInstance(n.use(o).class,0),u.$w=n.cast(d,n.use(c),f)}return u.$dispose=pu,u},toJni(d,p){if(d===null)return NULL;if(!(d instanceof Array))throw new Error("Expected an array");let f=d.$w;if(f!==void 0)return f.$h;let u=d.length,h=n.use(o).$borrowClassHandle(p);try{let g=p.newObjectArray(u,h.value,NULL);p.throwIfExceptionPending();for(let y=0;y!==u;y++){let E=s.toJni(d[y],p);try{p.setObjectArrayElement(g,y,E)}finally{s.type==="pointer"&&p.getObjectRefType(E)===su&&p.deleteLocalRef(E)}p.throwIfExceptionPending()}return g}finally{h.unref(p)}}}}function pu(){let t=this.length;for(let e=0;e!==t;e++){let n=this[e];if(n===null)continue;let r=n.$dispose;if(r===void 0)break;r.call(n)}this.$w.$dispose()}function fu(t,e,n,r){if(t.isNull())return null;let o=Qe(e.typeName),s=n.getArrayLength(t);return new zt(t,e,o,s,n,r)}function hu(t,e,n){if(t===null)return NULL;let r=t.$h;if(r!==void 0)return r;let o=t.length,s=Qe(e.typeName),i=e.newArray.call(n,o);if(i.isNull())throw new Error("Unable to construct array");if(o>0){let l=s.byteSize,a=s.write,c=s.toJni,d=Memory.alloc(o*s.byteSize);for(let p=0;p!==o;p++)a(d.add(p*l),c(t[p]));e.setRegion.call(n,i,0,o,d),n.throwIfExceptionPending()}return i}function _u(t,e){if(t===null)return!0;if(t instanceof zt)return t.$s.typeName===e;if(!(typeof t=="object"&&t.length!==void 0))return!1;let r=Qe(e);return Array.prototype.every.call(t,o=>r.isCompatible(o))}function zt(t,e,n,r,o,s=!0){if(s){let i=o.newGlobalRef(t);this.$h=i,this.$r=Script.bindWeak(this,o.vm.makeHandleDestructor(i))}else this.$h=t,this.$r=null;return this.$s=e,this.$t=n,this.length=r,new Proxy(this,Xo)}Xo={has(t,e){return e in t?!0:t.tryParseIndex(e)!==null},get(t,e,n){let r=t.tryParseIndex(e);return r===null?t[e]:t.readElement(r)},set(t,e,n,r){let o=t.tryParseIndex(e);return o===null?(t[e]=n,!0):(t.writeElement(o,n),!0)},ownKeys(t){let e=[],{length:n}=t;for(let r=0;r!==n;r++){let o=r.toString();e.push(o)}return e.push("length"),e},getOwnPropertyDescriptor(t,e){return t.tryParseIndex(e)!==null?{writable:!0,configurable:!0,enumerable:!0}:Object.getOwnPropertyDescriptor(t,e)}};Object.defineProperties(zt.prototype,{$dispose:{enumerable:!0,value(){let t=this.$r;t!==null&&(this.$r=null,Script.unbindWeak(t))}},$clone:{value(t){return new zt(this.$h,this.$s,this.$t,this.length,t)}},tryParseIndex:{value(t){if(typeof t=="symbol")return null;let e=parseInt(t);return isNaN(e)||e<0||e>=this.length?null:e}},readElement:{value(t){return this.withElements(e=>{let n=this.$t;return n.fromJni(n.read(e.add(t*n.byteSize)))})}},writeElement:{value(t,e){let{$h:n,$s:r,$t:o}=this,s=hr.getEnv(),i=Memory.alloc(o.byteSize);o.write(i,o.toJni(e)),r.setRegion.call(s,n,t,1,i)}},withElements:{value(t){let{$h:e,$s:n}=this,r=hr.getEnv(),o=n.getElements.call(r,e);if(o.isNull())throw new Error("Unable to get array elements");try{return t(o)}finally{n.releaseElements.call(r,e,o)}}},toJSON:{value(){let{length:t,$t:e}=this,{byteSize:n,fromJni:r,read:o}=e;return this.withElements(s=>{let i=[];for(let l=0;l!==t;l++){let a=r(o(s.add(l*n)));i.push(a)}return i})}},toString:{value(){return this.toJSON().toString()}}});function Je(t){return"L"+t.replace(/\./g,"/")+";"}function mu(t){return t.charAt(0).toUpperCase()+t.slice(1)}function Se(t){return t}var gu=4,{ensureClassInitialized:ts,makeMethodMangler:as}=Ut,yu=8,br=1,yt=2,ke=3,gr=1,Er=2,Jt=1,ls=2,ns=Symbol("PENDING_USE"),rs="/data/local/tmp",{getCurrentThreadId:Gt,pointerSize:gt}=Process,pe={state:"empty",factories:[],loaders:null,Integer:null},G=null,Q=null,cs=null,ds=null,us=null,ps=null,fs=null,os=null,yr=null,Ye=new Map,Oe=class t{static _initialize(e,n){G=e,Q=n,cs=n.flavor==="art",n.flavor==="jvm"&&(ts=Oo,as=Po)}static _disposeAll(e){pe.factories.forEach(n=>{n._dispose(e)})}static get(e){let n=Du(),r=n.factories[0];if(e===null)return r;let o=n.loaders.get(e);if(o!==null){let i=r.cast(o,n.Integer);return n.factories[i.intValue()]}let s=new t;return s.loader=e,s.cacheDir=r.cacheDir,wr(s,e),s}constructor(){this.cacheDir=rs,this.codeCacheDir=rs+"/dalvik-cache",this.tempFileNaming={prefix:"frida",suffix:""},this._classes={},this._classHandles=new _t(10,Eu),this._patchedMethods=new Set,this._loader=null,this._types=[{},{}],pe.factories.push(this)}_dispose(e){Array.from(this._patchedMethods).forEach(n=>{n.implementation=null}),this._patchedMethods.clear(),er(),this._classHandles.dispose(e),this._classes={}}get loader(){return this._loader}set loader(e){let n=this._loader===null&&e!==null;this._loader=e,n&&pe.state==="ready"&&this===pe.factories[0]&&wr(this,e)}use(e,n={}){let r=n.cache!=="skip",o=r?this._getUsedClass(e):void 0;if(o===void 0)try{let s=G.getEnv(),{_loader:i}=this,l=i!==null?Su(e,i,s):vu(e);o=this._make(e,l,s)}finally{r&&this._setUsedClass(e,o)}return o}_getUsedClass(e){let n;for(;(n=this._classes[e])===ns;)Thread.sleep(.05);return n===void 0&&(this._classes[e]=ns),n}_setUsedClass(e,n){n!==void 0?this._classes[e]=n:delete this._classes[e]}_make(e,n,r){let o=bu(),s=Object.create(Cr.prototype,{[Symbol.for("n")]:{value:e},$n:{get(){return this[Symbol.for("n")]}},[Symbol.for("C")]:{value:o},$C:{get(){return this[Symbol.for("C")]}},[Symbol.for("w")]:{value:null,writable:!0},$w:{get(){return this[Symbol.for("w")]},set(a){this[Symbol.for("w")]=a}},[Symbol.for("_s")]:{writable:!0},$_s:{get(){return this[Symbol.for("_s")]},set(a){this[Symbol.for("_s")]=a}},[Symbol.for("c")]:{value:[null]},$c:{get(){return this[Symbol.for("c")]}},[Symbol.for("m")]:{value:new Map},$m:{get(){return this[Symbol.for("m")]}},[Symbol.for("l")]:{value:null,writable:!0},$l:{get(){return this[Symbol.for("l")]},set(a){this[Symbol.for("l")]=a}},[Symbol.for("gch")]:{value:n},$gch:{get(){return this[Symbol.for("gch")]}},[Symbol.for("f")]:{value:this},$f:{get(){return this[Symbol.for("f")]}}});o.prototype=s;let i=new o(null);s[Symbol.for("w")]=i,s.$w=i;let l=i.$borrowClassHandle(r);try{let a=l.value;ts(r,a),s.$l=ze.build(a,r)}finally{l.unref(r)}return i}retain(e){let n=G.getEnv();return e.$clone(n)}cast(e,n,r){let o=G.getEnv(),s=e.$h;s===void 0&&(s=e);let i=n.$borrowClassHandle(o);try{if(!o.isInstanceOf(s,i.value))throw new Error(`Cast from '${o.getObjectClassName(s)}' to '${n.$n}' isn't possible`)}finally{i.unref(o)}let l=n.$C;return new l(s,Jt,o,r)}wrap(e,n,r){let o=n.$C,s=new o(e,Jt,r,!1);return s.$r=Script.bindWeak(s,G.makeHandleDestructor(e)),s}array(e,n){let r=G.getEnv(),o=Qe(e);o!==null&&(e=o.name);let s=mr("["+e,!1,this),i=s.toJni(n,r);return s.fromJni(i,r,!0)}registerClass(e){let n=G.getEnv(),r=[];try{let o=this.use("java.lang.Class"),s=n.javaLangReflectMethod(),i=n.vaMethod("pointer",[]),l=e.name,a=e.implements||[],c=e.superClass||this.use("java.lang.Object"),d=[],p=[],f={name:Je(l),sourceFileName:Bu(l),superClass:Je(c.$n),interfaces:a.map(S=>Je(S.$n)),fields:d,methods:p},u=a.slice();a.forEach(S=>{Array.prototype.slice.call(S.class.getInterfaces()).forEach(L=>{let j=this.cast(L,o).getCanonicalName();u.push(this.use(j))})});let _=e.fields||{};Object.getOwnPropertyNames(_).forEach(S=>{let L=this._getType(_[S]);d.push([S,L.name])});let h={},g={};u.forEach(S=>{let L=S.$borrowClassHandle(n);r.push(L);let j=L.value;S.$ownMembers.filter(w=>S[w].overloads!==void 0).forEach(w=>{let R=S[w],D=R.overloads,U=D.map(F=>ss(w,F.returnType,F.argumentTypes));h[w]=[R,U,j],D.forEach((F,z)=>{let ee=U[z];g[ee]=[F,j]})})});let y=e.methods||{},C=Object.keys(y).reduce((S,L)=>{let j=y[L],w=L==="$init"?"<init>":L;return j instanceof Array?S.push(...j.map(R=>[w,R])):S.push([w,j]),S},[]),T=[];C.forEach(([S,L])=>{let j=ke,w,R,D=[],U;if(typeof L=="function"){let ne=h[S];if(ne!==void 0&&Array.isArray(ne)){let[le,X,ie]=ne;if(X.length>1)throw new Error(`More than one overload matching '${S}': signature must be specified`);delete g[X[0]];let Y=le.overloads[0];j=Y.type,w=Y.returnType,R=Y.argumentTypes,U=L;let re=n.toReflectedMethod(ie,Y.handle,0),we=i(n.handle,re,s.getGenericExceptionTypes);D=Ir(n,we).map(Je),n.deleteLocalRef(we),n.deleteLocalRef(re)}else w=this._getType("void"),R=[],U=L}else{if(L.isStatic&&(j=yt),w=this._getType(L.returnType||"void"),R=(L.argumentTypes||[]).map(X=>this._getType(X)),U=L.implementation,typeof U!="function")throw new Error("Expected a function implementation for method: "+S);let ne=ss(S,w,R),le=g[ne];if(le!==void 0){let[X,ie]=le;delete g[ne],j=X.type,w=X.returnType,R=X.argumentTypes;let Y=n.toReflectedMethod(ie,X.handle,0),re=i(n.handle,Y,s.getGenericExceptionTypes);D=Ir(n,re).map(Je),n.deleteLocalRef(re),n.deleteLocalRef(Y)}}let F=w.name,z=R.map(ne=>ne.name),ee="("+z.join("")+")"+F;p.push([S,F,z,D,j===yt?yu:0]),T.push([S,ee,j,w,R,U])});let M=Object.keys(g);if(M.length>0)throw new Error("Missing implementation for: "+M.join(", "));let O=Vt.fromBuffer(Qo(f),this);try{O.load()}finally{O.file.delete()}let k=this.use(e.name),N=C.length;if(N>0){let S=3*gt,L=Memory.alloc(N*S),j=[],w=[];T.forEach(([U,F,z,ee,ne,le],X)=>{let ie=Memory.allocUtf8String(U),Y=Memory.allocUtf8String(F),re=hs(U,k,z,ee,ne,le);L.add(X*S).writePointer(ie),L.add(X*S+gt).writePointer(Y),L.add(X*S+2*gt).writePointer(re),w.push(ie,Y),j.push(re)});let R=k.$borrowClassHandle(n);r.push(R);let D=R.value;n.registerNatives(D,L,N),n.throwIfExceptionPending(),k.$nativeMethods=j}return k}finally{r.forEach(o=>{o.unref(n)})}}choose(e,n){let r=G.getEnv(),{flavor:o}=Q;if(o==="jvm")this._chooseObjectsJvm(e,r,n);else if(o==="art"){let s=Q["art::gc::Heap::VisitObjects"]===void 0;if(s&&Q["art::gc::Heap::GetInstances"]===void 0)return this._chooseObjectsJvm(e,r,n);Ee(G,r,i=>{s?this._chooseObjectsArtPreA12(e,r,i,n):this._chooseObjectsArtLegacy(e,r,i,n)})}else this._chooseObjectsDalvik(e,r,n)}_chooseObjectsJvm(e,n,r){let o=this.use(e),{jvmti:s}=Q,i=1,l=3,a=o.$borrowClassHandle(n),c=int64(a.value.toString());try{let d=new NativeCallback((y,E,C,T)=>(C.writeS64(c),i),"int",["int64","int64","pointer","pointer"]);s.iterateOverInstancesOfClass(a.value,l,d,a.value);let p=Memory.alloc(8);p.writeS64(c);let f=Memory.alloc(gu),u=Memory.alloc(gt);s.getObjectsWithTags(1,p,f,u,NULL);let _=f.readS32(),h=u.readPointer(),g=[];for(let y=0;y!==_;y++)g.push(h.add(y*gt).readPointer());s.deallocate(h);try{for(let y of g){let E=this.cast(y,o);if(r.onMatch(E)==="stop")break}r.onComplete()}finally{g.forEach(y=>{n.deleteLocalRef(y)})}}finally{a.unref(n)}}_chooseObjectsArtPreA12(e,n,r,o){let s=this.use(e),i=ut.$new(r,G),l,a=s.$borrowClassHandle(n);try{let f=Q["art::JavaVMExt::DecodeGlobal"](Q.vm,r,a.value);l=i.newHandle(f)}finally{a.unref(n)}let c=0,d=dt.$new();Q["art::gc::Heap::GetInstances"](Q.artHeap,i,l,c,d);let p=d.handles.map(f=>n.newGlobalRef(f));d.$delete(),i.$delete();try{for(let f of p){let u=this.cast(f,s);if(o.onMatch(u)==="stop")break}o.onComplete()}finally{p.forEach(f=>{n.deleteGlobalRef(f)})}}_chooseObjectsArtLegacy(e,n,r,o){let s=this.use(e),i=[],l=Q["art::JavaVMExt::AddGlobalRef"],a=Q.vm,c,d=s.$borrowClassHandle(n);try{c=Q["art::JavaVMExt::DecodeGlobal"](a,r,d.value).toInt32()}finally{d.unref(n)}let p=ir(c,f=>{i.push(l(a,r,f))});Q["art::gc::Heap::VisitObjects"](Q.artHeap,p,NULL);try{for(let f of i){let u=this.cast(f,s);if(o.onMatch(u)==="stop")break}}finally{i.forEach(f=>{n.deleteGlobalRef(f)})}o.onComplete()}_chooseObjectsDalvik(e,n,r){let o=this.use(e);if(Q.addLocalReference===null){let i=Process.getModuleByName("libdvm.so"),l;switch(Process.arch){case"arm":l="2d e9 f0 41 05 46 15 4e 0c 46 7e 44 11 b3 43 68";break;case"ia32":l="8d 64 24 d4 89 5c 24 1c 89 74 24 20 e8 ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? 85 d2";break}Memory.scan(i.base,i.size,l,{onMatch:(a,c)=>{let d;if(Process.arch==="arm")a=a.or(1),d=new NativeFunction(a,"pointer",["pointer","pointer"]);else{let p=Memory.alloc(Process.pageSize);Memory.patchCode(p,16,f=>{let u=new X86Writer(f,{pc:p});u.putMovRegRegOffsetPtr("eax","esp",4),u.putMovRegRegOffsetPtr("edx","esp",8),u.putJmpAddress(a),u.flush()}),d=new NativeFunction(p,"pointer",["pointer","pointer"]),d._thunk=p}return Q.addLocalReference=d,G.perform(p=>{s(this,p)}),"stop"},onError(a){},onComplete(){Q.addLocalReference===null&&r.onComplete()}})}else s(this,n);function s(i,l){let{DVM_JNI_ENV_OFFSET_SELF:a}=Ut,c=l.handle.add(a).readPointer(),d,p=o.$borrowClassHandle(l);try{d=Q.dvmDecodeIndirectRef(c,p.value)}finally{p.unref(l)}let f=d.toMatchPattern(),u=Q.dvmHeapSourceGetBase(),h=Q.dvmHeapSourceGetLimit().sub(u).toInt32();Memory.scan(u,h,f,{onMatch:(g,y)=>{Q.dvmIsValidObject(g)&&G.perform(E=>{let C=E.handle.add(a).readPointer(),T,M=Q.addLocalReference(C,g);try{T=i.cast(M,o)}finally{E.deleteLocalRef(M)}if(r.onMatch(T)==="stop")return"stop"})},onError(g){},onComplete(){r.onComplete()}})}}openClassFile(e){return new Vt(e,null,this)}_getType(e,n=!0){return _r(e,n,this)}};function bu(){return function(t,e,n,r){return Cr.call(this,t,e,n,r)}}function Cr(t,e,n,r=!0){if(t!==null)if(r){let o=n.newGlobalRef(t);this.$h=o,this.$r=Script.bindWeak(this,G.makeHandleDestructor(o))}else this.$h=t,this.$r=null;else this.$h=null,this.$r=null;return this.$t=e,new Proxy(this,ds)}ds={has(t,e){return e in t?!0:t.$has(e)},get(t,e,n){if(typeof e!="string"||e.startsWith("$")||e==="class")return t[e];let r=t.$find(e);return r!==null?r(n):t[e]},set(t,e,n,r){return t[e]=n,!0},ownKeys(t){return t.$list()},getOwnPropertyDescriptor(t,e){return Object.prototype.hasOwnProperty.call(t,e)?Object.getOwnPropertyDescriptor(t,e):{writable:!1,configurable:!0,enumerable:!0}}};Object.defineProperties(Cr.prototype,{[Symbol.for("new")]:{enumerable:!1,get(){return this.$getCtor("allocAndInit")}},$new:{enumerable:!0,get(){return this[Symbol.for("new")]}},[Symbol.for("alloc")]:{enumerable:!1,value(){let t=G.getEnv(),e=this.$borrowClassHandle(t);try{let n=t.allocObject(e.value);return this.$f.cast(n,this)}finally{e.unref(t)}}},$alloc:{enumerable:!0,get(){return this[Symbol.for("alloc")]}},[Symbol.for("init")]:{enumerable:!1,get(){return this.$getCtor("initOnly")}},$init:{enumerable:!0,get(){return this[Symbol.for("init")]}},[Symbol.for("dispose")]:{enumerable:!1,value(){let t=this.$r;t!==null&&(this.$r=null,Script.unbindWeak(t)),this.$h!==null&&(this.$h=void 0)}},$dispose:{enumerable:!0,get(){return this[Symbol.for("dispose")]}},[Symbol.for("clone")]:{enumerable:!1,value(t){let e=this.$C;return new e(this.$h,this.$t,t)}},$clone:{value(t){return this[Symbol.for("clone")](t)}},[Symbol.for("class")]:{enumerable:!1,get(){let t=G.getEnv(),e=this.$borrowClassHandle(t);try{let n=this.$f;return n.cast(e.value,n.use("java.lang.Class"))}finally{e.unref(t)}}},class:{enumerable:!0,get(){return this[Symbol.for("class")]}},[Symbol.for("className")]:{enumerable:!1,get(){let t=this.$h;return t===null?this.$n:G.getEnv().getObjectClassName(t)}},$className:{enumerable:!0,get(){return this[Symbol.for("className")]}},[Symbol.for("ownMembers")]:{enumerable:!1,get(){return this.$l.list()}},$ownMembers:{enumerable:!0,get(){return this[Symbol.for("ownMembers")]}},[Symbol.for("super")]:{enumerable:!1,get(){let t=G.getEnv(),e=this.$s.$C;return new e(this.$h,ls,t)}},$super:{enumerable:!0,get(){return this[Symbol.for("super")]}},[Symbol.for("s")]:{enumerable:!1,get(){let t=Object.getPrototypeOf(this),e=t.$_s;if(e===void 0){let n=G.getEnv(),r=this.$borrowClassHandle(n);try{let o=n.getSuperclass(r.value);if(o.isNull())e=null;else try{let s=n.getClassName(o),i=t.$f;if(e=i._getUsedClass(s),e===void 0)try{let l=wu(this);e=i._make(s,l,n)}finally{i._setUsedClass(s,e)}}finally{n.deleteLocalRef(o)}}finally{r.unref(n)}t.$_s=e}return e}},$s:{get(){return this[Symbol.for("s")]}},[Symbol.for("isSameObject")]:{enumerable:!1,value(t){return G.getEnv().isSameObject(t.$h,this.$h)}},$isSameObject:{value(t){return this[Symbol.for("isSameObject")](t)}},[Symbol.for("getCtor")]:{enumerable:!1,value(t){let e=this.$c,n=e[0];if(n===null){let r=G.getEnv(),o=this.$borrowClassHandle(r);try{n=Iu(o.value,this.$w,r),e[0]=n}finally{o.unref(r)}}return n[t]}},$getCtor:{value(t){return this[Symbol.for("getCtor")](t)}},[Symbol.for("borrowClassHandle")]:{enumerable:!1,value(t){let e=this.$n,n=this.$f._classHandles,r=n.get(e);return r===void 0&&(r=new Ar(this.$gch(t),t),n.set(e,r,t)),r.ref()}},$borrowClassHandle:{value(t){return this[Symbol.for("borrowClassHandle")](t)}},[Symbol.for("copyClassHandle")]:{enumerable:!1,value(t){let e=this.$borrowClassHandle(t);try{return t.newLocalRef(e.value)}finally{e.unref(t)}}},$copyClassHandle:{value(t){return this[Symbol.for("copyClassHandle")](t)}},[Symbol.for("getHandle")]:{enumerable:!1,value(t){let e=this.$h;if(e===void 0)throw new Error("Wrapper is disposed; perhaps it was borrowed from a hook instead of calling Java.retain() to make a long-lived wrapper?");return e}},$getHandle:{value(t){return this[Symbol.for("getHandle")](t)}},[Symbol.for("list")]:{enumerable:!1,value(){let t=this.$s,e=t!==null?t.$list():[],n=this.$l;return Array.from(new Set(e.concat(n.list())))}},$list:{get(){return this[Symbol.for("list")]}},[Symbol.for("has")]:{enumerable:!1,value(t){if(this.$m.has(t)||this.$l.has(t))return!0;let r=this.$s;return!!(r!==null&&r.$has(t))}},$has:{value(t){return this[Symbol.for("has")](t)}},[Symbol.for("find")]:{enumerable:!1,value(t){let e=this.$m,n=e.get(t);if(n!==void 0)return n;let o=this.$l.find(t);if(o!==null){let i=G.getEnv(),l=this.$borrowClassHandle(i);try{n=Cu(t,o,l.value,this.$w,i)}finally{l.unref(i)}return e.set(t,n),n}let s=this.$s;return s!==null?s.$find(t):null}},$find:{value(t){return this[Symbol.for("find")](t)}},[Symbol.for("toJSON")]:{enumerable:!1,value(){let t=this.$n;if(this.$h===null)return`<class: ${t}>`;let n=this.$className;return t===n?`<instance: ${t}>`:`<instance: ${t}, $className: ${n}>`}},toJSON:{get(){return this[Symbol.for("toJSON")]}}});function Ar(t,e){this.value=e.newGlobalRef(t),e.deleteLocalRef(t),this.refs=1}Ar.prototype.ref=function(){return this.refs++,this};Ar.prototype.unref=function(t){--this.refs===0&&t.deleteGlobalRef(this.value)};function Eu(t,e){t.unref(e)}function vu(t){let e=t.replace(/\./g,"/");return function(n){let r=Gt();ms(r);try{return n.findClass(e)}finally{gs(r)}}}function Su(t,e,n){return yr===null&&(os=n.vaMethod("pointer",["pointer"]),yr=e.loadClass.overload("java.lang.String").handle),n=null,function(r){let o=r.newStringUtf(t),s=Gt();ms(s);try{let i=os(r.handle,e.$h,yr,o);return r.throwIfExceptionPending(),i}finally{gs(s),r.deleteLocalRef(o)}}}function wu(t){return function(e){let n=t.$borrowClassHandle(e);try{return e.getSuperclass(n.value)}finally{n.unref(e)}}}function Iu(t,e,n){let{$n:r,$f:o}=e,s=Uu(r),i=n.javaLangClass(),l=n.javaLangReflectConstructor(),a=n.vaMethod("pointer",[]),c=n.vaMethod("uint8",[]),d=[],p=[],f=o._getType(r,!1),u=o._getType("void",!1),_=a(n.handle,t,i.getDeclaredConstructors);try{let h=n.getArrayLength(_);if(h!==0)for(let g=0;g!==h;g++){let y,E,C=n.getObjectArrayElement(_,g);try{y=n.fromReflectedMethod(C),E=a(n.handle,C,l.getGenericParameterTypes)}finally{n.deleteLocalRef(C)}let T;try{T=Ir(n,E).map(M=>o._getType(M))}finally{n.deleteLocalRef(E)}d.push(Xe(s,e,br,y,f,T,n)),p.push(Xe(s,e,ke,y,u,T,n))}else{if(c(n.handle,t,i.isInterface))throw new Error("cannot instantiate an interface");let y=n.javaLangObject(),E=n.getMethodId(y,"<init>","()V");d.push(Xe(s,e,br,E,f,[],n)),p.push(Xe(s,e,ke,E,u,[],n))}}finally{n.deleteLocalRef(_)}if(p.length===0)throw new Error("no supported overloads");return{allocAndInit:vr(d),initOnly:vr(p)}}function Cu(t,e,n,r,o){return e.startsWith("m")?Au(t,e,n,r,o):Ru(t,e,n,r,o)}function Au(t,e,n,r,o){let{$f:s}=r,i=e.split(":").slice(1),l=o.javaLangReflectMethod(),a=o.vaMethod("pointer",[]),c=o.vaMethod("uint8",[]),d=i.map(f=>{let u=f[0]==="s"?yt:ke,_=ptr(f.substr(1)),h,g=[],y=o.toReflectedMethod(n,_,u===yt?1:0);try{let E=!!c(o.handle,y,l.isVarArgs),C=a(o.handle,y,l.getGenericReturnType);o.throwIfExceptionPending();try{h=s._getType(o.getTypeName(C))}finally{o.deleteLocalRef(C)}let T=a(o.handle,y,l.getParameterTypes);try{let M=o.getArrayLength(T);for(let O=0;O!==M;O++){let k=o.getObjectArrayElement(T,O),N;try{N=E&&O===M-1?o.getArrayTypeName(k):o.getTypeName(k)}finally{o.deleteLocalRef(k)}let S=s._getType(N);g.push(S)}}finally{o.deleteLocalRef(T)}}catch{return null}finally{o.deleteLocalRef(y)}return Xe(t,r,u,_,h,g,o)}).filter(f=>f!==null);if(d.length===0)throw new Error("No supported overloads");t==="valueOf"&&Mu(d);let p=vr(d);return function(f){return p}}function vr(t){let e=Tu();return Object.setPrototypeOf(e,us),e._o=t,e}function Tu(){let t=function(){return t.invoke(this,arguments)};return t}us=Object.create(Function.prototype,{overloads:{enumerable:!0,get(){return this._o}},overload:{value(...t){let e=this._o,n=t.length,r=t.join(":");for(let o=0;o!==e.length;o++){let s=e[o],{argumentTypes:i}=s;if(i.length!==n)continue;if(i.map(a=>a.className).join(":")===r)return s}Sr(this.methodName,this.overloads,"specified argument types do not match any of:")}},methodName:{enumerable:!0,get(){return this._o[0].methodName}},holder:{enumerable:!0,get(){return this._o[0].holder}},type:{enumerable:!0,get(){return this._o[0].type}},handle:{enumerable:!0,get(){return Ve(this),this._o[0].handle}},implementation:{enumerable:!0,get(){return Ve(this),this._o[0].implementation},set(t){Ve(this),this._o[0].implementation=t}},returnType:{enumerable:!0,get(){return Ve(this),this._o[0].returnType}},argumentTypes:{enumerable:!0,get(){return Ve(this),this._o[0].argumentTypes}},canInvokeWith:{enumerable:!0,get(t){return Ve(this),this._o[0].canInvokeWith}},clone:{enumerable:!0,value(t){return Ve(this),this._o[0].clone(t)}},invoke:{value(t,e){let n=this._o,r=t.$h!==null;for(let o=0;o!==n.length;o++){let s=n[o];if(s.canInvokeWith(e)){if(s.type===ke&&!r){let i=this.methodName;if(i==="toString")return`<class: ${t.$n}>`;throw new Error(i+": cannot call instance method without an instance")}return s.apply(t,e)}}if(this.methodName==="toString")return`<class: ${t.$n}>`;Sr(this.methodName,this.overloads,"argument types do not match any of:")}}});function ss(t,e,n){return`${e.className} ${t}(${n.map(r=>r.className).join(", ")})`}function Ve(t){let e=t._o;e.length>1&&Sr(e[0].methodName,e,"has more than one overload, use .overload(<signature>) to choose from:")}function Sr(t,e,n){let o=e.slice().sort((s,i)=>s.argumentTypes.length-i.argumentTypes.length).map(s=>s.argumentTypes.length>0?".overload('"+s.argumentTypes.map(l=>l.className).join("', '")+"')":".overload()");throw new Error(`${t}(): ${n}
	${o.join(`
	`)}`)}function Xe(t,e,n,r,o,s,i,l){let a=o.type,c=s.map(f=>f.type);i===null&&(i=G.getEnv());let d,p;return n===ke?(d=i.vaMethod(a,c,l),p=i.nonvirtualVaMethod(a,c,l)):n===yt?(d=i.staticVaMethod(a,c,l),p=d):(d=i.constructor(c,l),p=d),Lu([t,e,n,r,o,s,d,p])}function Lu(t){let e=xu();return Object.setPrototypeOf(e,ps),e._p=t,e}function xu(){let t=function(){return t.invoke(this,arguments)};return t}ps=Object.create(Function.prototype,{methodName:{enumerable:!0,get(){return this._p[0]}},holder:{enumerable:!0,get(){return this._p[1]}},type:{enumerable:!0,get(){return this._p[2]}},handle:{enumerable:!0,get(){return this._p[3]}},implementation:{enumerable:!0,get(){let t=this._r;return t!==void 0?t:null},set(t){let e=this._p,n=e[1];if(e[2]===br)throw new Error("Reimplementing $new is not possible; replace implementation of $init instead");let o=this._r;if(o!==void 0&&(n.$f._patchedMethods.delete(this),o._m.revert(G),this._r=void 0),t!==null){let[s,i,l,a,c,d]=e,p=hs(s,i,l,c,d,t,this),f=as(a);p._m=f,this._r=p,f.replace(p,l===ke,d,G,Q),n.$f._patchedMethods.add(this)}}},returnType:{enumerable:!0,get(){return this._p[4]}},argumentTypes:{enumerable:!0,get(){return this._p[5]}},canInvokeWith:{enumerable:!0,value(t){let e=this._p[5];return t.length!==e.length?!1:e.every((n,r)=>n.isCompatible(t[r]))}},clone:{enumerable:!0,value(t){let e=this._p.slice(0,6);return Xe(...e,null,t)}},invoke:{value(t,e){let n=G.getEnv(),r=this._p,o=r[2],s=r[4],i=r[5],l=this._r,a=o===ke,c=e.length,d=2+c;n.pushLocalFrame(d);let p=null;try{let f;a?f=t.$getHandle():(p=t.$borrowClassHandle(n),f=p.value);let u,_=t.$t;l===void 0?u=r[3]:(u=l._m.resolveTarget(t,a,n,Q),cs&&l._c.has(Gt())&&(_=ls));let h=[n.handle,f,u];for(let E=0;E!==c;E++)h.push(i[E].toJni(e[E],n));let g;_===Jt?g=r[6]:(g=r[7],a&&h.splice(2,0,t.$copyClassHandle(n)));let y=g.apply(null,h);return n.throwIfExceptionPending(),s.fromJni(y,n,!0)}finally{p!==null&&p.unref(n),n.popLocalFrame(NULL)}}},toString:{enumerable:!0,value(){return`function ${this.methodName}(${this.argumentTypes.map(t=>t.className).join(", ")}): ${this.returnType.className}`}}});function hs(t,e,n,r,o,s,i=null){let l=new Set,a=Nu([t,e,n,r,o,s,i,l]),c=new NativeCallback(a,r.type,["pointer","pointer"].concat(o.map(d=>d.type)));return c._c=l,c}function Nu(t){return function(){return ku(arguments,t)}}function ku(t,e){let n=new b(t[0],G),[r,o,s,i,l,a,c,d]=e,p=[],f;if(s===ke){let h=o.$C;f=new h(t[1],Jt,n,!1)}else f=o;let u=Gt();n.pushLocalFrame(3);let _=!0;G.link(u,n);try{d.add(u);let h;c===null||!Ye.has(u)?h=a:h=c;let g=[],y=t.length-2;for(let T=0;T!==y;T++){let O=l[T].fromJni(t[2+T],n,!1);g.push(O),p.push(O)}let E=h.apply(f,g);if(!i.isCompatible(E))throw new Error(`Implementation for ${r} expected return value compatible with ${i.className}`);let C=i.toJni(E,n);return i.type==="pointer"&&(C=n.popLocalFrame(C),_=!1,p.push(E)),C}catch(h){let g=h.$h;return g!==void 0?n.throw(g):Script.nextTick(()=>{throw h}),i.defaultValue}finally{G.unlink(u),_&&n.popLocalFrame(NULL),d.delete(u),p.forEach(h=>{if(h===null)return;let g=h.$dispose;g!==void 0&&g.call(h)})}}function Mu(t){let{holder:e,type:n}=t[0];t.some(o=>o.type===n&&o.argumentTypes.length===0)||t.push(ju([e,n]))}function ju(t){let e=Ou();return Object.setPrototypeOf(e,fs),e._p=t,e}function Ou(){return function(){return this}}fs=Object.create(Function.prototype,{methodName:{enumerable:!0,get(){return"valueOf"}},holder:{enumerable:!0,get(){return this._p[0]}},type:{enumerable:!0,get(){return this._p[1]}},handle:{enumerable:!0,get(){return NULL}},implementation:{enumerable:!0,get(){return null},set(t){}},returnType:{enumerable:!0,get(){let t=this.holder;return t.$f.use(t.$n)}},argumentTypes:{enumerable:!0,get(){return[]}},canInvokeWith:{enumerable:!0,value(t){return t.length===0}},clone:{enumerable:!0,value(t){throw new Error("Invalid operation")}}});function Ru(t,e,n,r,o){let s=e[2]==="s"?gr:Er,i=ptr(e.substr(3)),{$f:l}=r,a,c=o.toReflectedField(n,i,s===gr?1:0);try{a=o.vaMethod("pointer",[])(o.handle,c,o.javaLangReflectField().getGenericType),o.throwIfExceptionPending()}finally{o.deleteLocalRef(c)}let d;try{d=l._getType(o.getTypeName(a))}finally{o.deleteLocalRef(a)}let p,f,u=d.type;return s===gr?(p=o.getStaticField(u),f=o.setStaticField(u)):(p=o.getField(u),f=o.setField(u)),Pu([s,d,i,p,f])}function Pu(t){return function(e){return new _s([e].concat(t))}}function _s(t){this._p=t}Object.defineProperties(_s.prototype,{value:{enumerable:!0,get(){let[t,e,n,r,o]=this._p,s=G.getEnv();s.pushLocalFrame(4);let i=null;try{let l;if(e===Er){if(l=t.$getHandle(),l===null)throw new Error("Cannot access an instance field without an instance")}else i=t.$borrowClassHandle(s),l=i.value;let a=o(s.handle,l,r);return s.throwIfExceptionPending(),n.fromJni(a,s,!0)}finally{i!==null&&i.unref(s),s.popLocalFrame(NULL)}},set(t){let[e,n,r,o,,s]=this._p,i=G.getEnv();i.pushLocalFrame(4);let l=null;try{let a;if(n===Er){if(a=e.$getHandle(),a===null)throw new Error("Cannot access an instance field without an instance")}else l=e.$borrowClassHandle(i),a=l.value;if(!r.isCompatible(t))throw new Error(`Expected value compatible with ${r.className}`);let c=r.toJni(t,i);s(i.handle,a,o,c),i.throwIfExceptionPending()}finally{l!==null&&l.unref(i),i.popLocalFrame(NULL)}}},holder:{enumerable:!0,get(){return this._p[0]}},fieldType:{enumerable:!0,get(){return this._p[1]}},fieldReturnType:{enumerable:!0,get(){return this._p[2]}},toString:{enumerable:!0,value(){let t=`Java.Field{holder: ${this.holder}, fieldType: ${this.fieldType}, fieldReturnType: ${this.fieldReturnType}, value: ${this.value}}`;return t.length<200?t:`Java.Field{
	holder: ${this.holder},
	fieldType: ${this.fieldType},
	fieldReturnType: ${this.fieldReturnType},
	value: ${this.value},
}`.split(`
`).map(n=>n.length>200?n.slice(0,n.indexOf(" ")+1)+"...,":n).join(`
`)}}});var Vt=class t{static fromBuffer(e,n){let r=is(n),o=r.getCanonicalPath().toString(),s=new File(o,"w");return s.write(e.buffer),s.close(),Fu(o,n),new t(o,r,n)}constructor(e,n,r){this.path=e,this.file=n,this._factory=r}load(){let{_factory:e}=this,{codeCacheDir:n}=e,r=e.use("dalvik.system.DexClassLoader"),o=e.use("java.io.File"),s=this.file;if(s===null&&(s=e.use("java.io.File").$new(this.path)),!s.exists())throw new Error("File not found");o.$new(n).mkdirs(),e.loader=r.$new(s.getCanonicalPath(),n,null,e.loader),G.preventDetachDueToClassLoader()}getClassNames(){let{_factory:e}=this,n=e.use("dalvik.system.DexFile"),r=is(e),o=n.loadDex(this.path,r.getCanonicalPath(),0),s=[],i=o.entries();for(;i.hasMoreElements();)s.push(i.nextElement().toString());return s}};function is(t){let{cacheDir:e,tempFileNaming:n}=t,r=t.use("java.io.File"),o=r.$new(e);return o.mkdirs(),r.createTempFile(n.prefix,n.suffix+".dex",o)}function Fu(t,e){e.use("java.io.File").$new(t).setWritable(!1,!1)}function Du(){switch(pe.state){case"empty":{pe.state="pending";let t=pe.factories[0],e=t.use("java.util.HashMap"),n=t.use("java.lang.Integer");pe.loaders=e.$new(),pe.Integer=n;let r=t.loader;return r!==null&&wr(t,r),pe.state="ready",pe}case"pending":do Thread.sleep(.05);while(pe.state==="pending");return pe;case"ready":return pe}}function wr(t,e){let{factories:n,loaders:r,Integer:o}=pe,s=o.$new(n.indexOf(t));r.put(e,s);for(let i=e.getParent();i!==null&&!r.containsKey(i);i=i.getParent())r.put(i,s)}function ms(t){let e=Ye.get(t);e===void 0&&(e=0),e++,Ye.set(t,e)}function gs(t){let e=Ye.get(t);if(e===void 0)throw new Error(`Thread ${t} is not ignored`);e--,e===0?Ye.delete(t):Ye.set(t,e)}function Uu(t){return t.slice(t.lastIndexOf(".")+1)}function Ir(t,e){let n=[],r=t.getArrayLength(e);for(let o=0;o!==r;o++){let s=t.getObjectArrayElement(e,o);try{n.push(t.getTypeName(s))}finally{t.deleteLocalRef(s)}}return n}function Bu(t){let e=t.split(".");return e[e.length-1]+".java"}var zu=4,ys=Process.pointerSize,Tr=class{ACC_PUBLIC=1;ACC_PRIVATE=2;ACC_PROTECTED=4;ACC_STATIC=8;ACC_FINAL=16;ACC_SYNCHRONIZED=32;ACC_BRIDGE=64;ACC_VARARGS=128;ACC_NATIVE=256;ACC_ABSTRACT=1024;ACC_STRICT=2048;ACC_SYNTHETIC=4096;constructor(){this.classFactory=null,this.ClassFactory=Oe,this.vm=null,this.api=null,this._initialized=!1,this._apiError=null,this._wakeupHandler=null,this._pollListener=null,this._pendingMainOps=[],this._pendingVmOps=[],this._cachedIsAppProcess=null;try{this._tryInitialize()}catch{}}_tryInitialize(){if(this._initialized)return!0;if(this._apiError!==null)throw this._apiError;let e;try{e=ht(),this.api=e}catch(r){throw this._apiError=r,r}if(e===null)return!1;let n=new Ce(e);return this.vm=n,Yo(n),Oe._initialize(n,e),this.classFactory=new Oe,this._initialized=!0,!0}_dispose(){if(this.api===null)return;let{vm:e}=this;e.perform(n=>{Oe._disposeAll(n),b.dispose(n)}),Script.nextTick(()=>{Ce.dispose(e)})}get available(){return this._tryInitialize()}get androidVersion(){return pt()}synchronized(e,n){let{$h:r=e}=e;if(!(r instanceof NativePointer))throw new Error("Java.synchronized: the first argument `obj` must be either a pointer or a Java instance");let o=this.vm.getEnv();ue("VM::MonitorEnter",o.monitorEnter(r));try{n()}finally{o.monitorExit(r)}}enumerateLoadedClasses(e){this._checkAvailable();let{flavor:n}=this.api;n==="jvm"?this._enumerateLoadedClassesJvm(e):n==="art"?this._enumerateLoadedClassesArt(e):this._enumerateLoadedClassesDalvik(e)}enumerateLoadedClassesSync(){let e=[];return this.enumerateLoadedClasses({onMatch(n){e.push(n)},onComplete(){}}),e}enumerateClassLoaders(e){this._checkAvailable();let{flavor:n}=this.api;if(n==="jvm")this._enumerateClassLoadersJvm(e);else if(n==="art")this._enumerateClassLoadersArt(e);else throw new Error("Enumerating class loaders is not supported on Dalvik")}enumerateClassLoadersSync(){let e=[];return this.enumerateClassLoaders({onMatch(n){e.push(n)},onComplete(){}}),e}_enumerateLoadedClassesJvm(e){let{api:n,vm:r}=this,{jvmti:o}=n,s=r.getEnv(),i=Memory.alloc(zu),l=Memory.alloc(ys);o.getLoadedClasses(i,l);let a=i.readS32(),c=l.readPointer(),d=[];for(let p=0;p!==a;p++)d.push(c.add(p*ys).readPointer());o.deallocate(c);try{for(let p of d){let f=s.getClassName(p);e.onMatch(f,p)}e.onComplete()}finally{d.forEach(p=>{s.deleteLocalRef(p)})}}_enumerateClassLoadersJvm(e){this.choose("java.lang.ClassLoader",e)}_enumerateLoadedClassesArt(e){let{vm:n,api:r}=this,o=n.getEnv(),s=r["art::JavaVMExt::AddGlobalRef"],{vm:i}=r;Ee(n,o,l=>{let a=Qn(c=>{let d=s(i,l,c);try{let p=o.getClassName(d);e.onMatch(p,d)}finally{o.deleteGlobalRef(d)}return!0});r["art::ClassLinker::VisitClasses"](r.artClassLinker.address,a)}),e.onComplete()}_enumerateClassLoadersArt(e){let{classFactory:n,vm:r,api:o}=this,s=r.getEnv(),i=o["art::ClassLinker::VisitClassLoaders"];if(i===void 0)throw new Error("This API is only available on Android >= 7.0");let l=n.use("java.lang.ClassLoader"),a=[],c=o["art::JavaVMExt::AddGlobalRef"],{vm:d}=o;Ee(r,s,p=>{let f=Xn(u=>(a.push(c(d,p,u)),!0));Kn(()=>{i(o.artClassLinker.address,f)})});try{a.forEach(p=>{let f=n.cast(p,l);e.onMatch(f)})}finally{a.forEach(p=>{s.deleteGlobalRef(p)})}e.onComplete()}_enumerateLoadedClassesDalvik(e){let{api:n}=this,r=ptr("0xcbcacccd"),o=172,s=8,l=n.gDvm.add(o).readPointer(),a=l.readS32(),d=l.add(12).readPointer(),p=a*s;for(let f=0;f<p;f+=s){let _=d.add(f).add(4).readPointer();if(_.isNull()||_.equals(r))continue;let g=_.add(24).readPointer().readUtf8String();if(g.startsWith("L")){let y=g.substring(1,g.length-1).replace(/\//g,".");e.onMatch(y)}}e.onComplete()}enumerateMethods(e){let{classFactory:n}=this,r=this.vm.getEnv(),o=n.use("java.lang.ClassLoader");return ze.enumerateMethods(e,this.api,r).map(s=>{let i=s.loader;return s.loader=i!==null?n.wrap(i,o,r):null,s})}scheduleOnMainThread(e){this.performNow(()=>{this._pendingMainOps.push(e);let{_wakeupHandler:n}=this;if(n===null){let{classFactory:r}=this,o=r.use("android.os.Handler"),s=r.use("android.os.Looper");n=o.$new(s.getMainLooper()),this._wakeupHandler=n}this._pollListener===null&&(this._pollListener=Interceptor.attach(Process.getModuleByName("libc.so").getExportByName("epoll_wait"),this._makePollHook()),Interceptor.flush()),n.sendEmptyMessage(1)})}_makePollHook(){let e=Process.id,{_pendingMainOps:n}=this;return function(){if(this.threadId!==e)return;let r;for(;(r=n.shift())!==void 0;)try{r()}catch(o){Script.nextTick(()=>{throw o})}}}perform(e){if(this._checkAvailable(),!this._isAppProcess()||this.classFactory.loader!==null)try{this.vm.perform(e)}catch(n){Script.nextTick(()=>{throw n})}else this._pendingVmOps.push(e),this._pendingVmOps.length===1&&this._performPendingVmOpsWhenReady()}performNow(e){return this._checkAvailable(),this.vm.perform(()=>{let{classFactory:n}=this;if(this._isAppProcess()&&n.loader===null){let o=n.use("android.app.ActivityThread").currentApplication();o!==null&&bs(n,o)}return e()})}_performPendingVmOpsWhenReady(){this.vm.perform(()=>{let{classFactory:e}=this,n=e.use("android.app.ActivityThread"),r=n.currentApplication();if(r!==null){bs(e,r),this._performPendingVmOps();return}let o=this,s=!1,i="early",l=n.handleBindApplication;l.implementation=function(d){if(d.instrumentationName.value!==null){i="late";let f=e.use("android.app.LoadedApk").makeApplication;f.implementation=function(u,_){return s||(s=!0,Es(e,this),o._performPendingVmOps()),f.apply(this,arguments)}}l.apply(this,arguments)};let c=n.getPackageInfo.overloads.map(d=>[d.argumentTypes.length,d]).sort(([d],[p])=>p-d).map(([d,p])=>p)[0];c.implementation=function(...d){let p=c.call(this,...d);return!s&&i==="early"&&(s=!0,Es(e,p),o._performPendingVmOps()),p}})}_performPendingVmOps(){let{vm:e,_pendingVmOps:n}=this,r;for(;(r=n.shift())!==void 0;)try{e.perform(r)}catch(o){Script.nextTick(()=>{throw o})}}use(e,n){return this.classFactory.use(e,n)}openClassFile(e){return this.classFactory.openClassFile(e)}choose(e,n){this.classFactory.choose(e,n)}retain(e){return this.classFactory.retain(e)}cast(e,n){return this.classFactory.cast(e,n)}array(e,n){return this.classFactory.array(e,n)}backtrace(e){return Yn(this.vm,e)}isMainThread(){let e=this.classFactory.use("android.os.Looper"),n=e.getMainLooper(),r=e.myLooper();return r===null?!1:n.$isSameObject(r)}registerClass(e){return this.classFactory.registerClass(e)}deoptimizeEverything(){let{vm:e}=this;return rr(e,e.getEnv())}deoptimizeBootImage(){let{vm:e}=this;return or(e,e.getEnv())}deoptimizeMethod(e){let{vm:n}=this;return nr(n,n.getEnv(),e)}_checkAvailable(){if(!this.available)throw new Error("Java API not available")}_isAppProcess(){let e=this._cachedIsAppProcess;if(e===null){if(this.api.flavor==="jvm")return e=!1,this._cachedIsAppProcess=e,e;let n=new NativeFunction(Module.getGlobalExportByName("readlink"),"pointer",["pointer","pointer","pointer"],{exceptions:"propagate"}),r=Memory.allocUtf8String("/proc/self/exe"),o=1024,s=Memory.alloc(o),i=n(r,s,ptr(o)).toInt32();if(i!==-1){let l=s.readUtf8String(i);e=/^\/system\/bin\/app_process/.test(l)}else e=!0;this._cachedIsAppProcess=e}return e}};function bs(t,e){let n=t.use("android.os.Process");t.loader=e.getClassLoader(),n.myUid()===n.SYSTEM_UID.value?(t.cacheDir="/data/system",t.codeCacheDir="/data/dalvik-cache"):"getCodeCacheDir"in e?(t.cacheDir=e.getCacheDir().getCanonicalPath(),t.codeCacheDir=e.getCodeCacheDir().getCanonicalPath()):(t.cacheDir=e.getFilesDir().getCanonicalPath(),t.codeCacheDir=e.getCacheDir().getCanonicalPath())}function Es(t,e){let n=t.use("java.io.File");t.loader=e.getClassLoader();let r=n.$new(e.getDataDir()).getCanonicalPath();t.cacheDir=r,t.codeCacheDir=r+"/cache"}var Lr=new Tr;Script.bindWeak(Lr,()=>{Lr._dispose()});var $=Lr;var $t=null;function Re(){return $t||($t={LinkedHashMap:$.use("java.util.LinkedHashMap"),HashMap:$.use("java.util.HashMap"),ArrayList:$.use("java.util.ArrayList"),JavaString:$.use("java.lang.String"),JavaInteger:$.use("java.lang.Integer"),JavaLong:$.use("java.lang.Long"),JavaBoolean:$.use("java.lang.Boolean"),JavaDouble:$.use("java.lang.Double"),JavaObject:$.use("java.lang.Object"),Gson:$.use("com.google.gson.Gson"),TypedByteArray:$.use("com.bytedance.retrofit2.mime.TypedByteArray")},$t)}var Ht=null,Zt=null;var xr=null,Nr=null;function Ss(){return Nr||(Nr=Re().Gson.$new()),Nr}function ws(){return xr||(xr=$.use("X.03xb").LJFF()),xr}function Is(){if(Ht)return Ht;let t=$.use("com.ss.android.ugc.aweme.ecommerce.base.pdp.repository.api.PdpApi").class,e=As("X.0YHQ","LIZIZ"),n=Vu(e);console.log("[*] Retrofit client type:",n.getClass().getName());let r=n.create(t);return console.log("[*] PdpApi proxy type:",r.getClass().getName()),Ht=$.cast(r,$.use("com.ss.android.ugc.aweme.ecommerce.base.pdp.repository.api.PdpApi")),Ht}function Cs(){return Zt||(Zt=$.registerClass({name:"com.frida.rpc.PdpContinuation",implements:[$.use("X.03Un")],methods:{getContext(){return $.use("X.03yq").INSTANCE.value},resumeWith(t){try{if(t===null){send({type:"rpc_result",data:JSON.stringify({status:"null_response"})});return}let e=t.getClass().getName();if(e.includes("Failure")||e.includes("Exception")||e.includes("Error")){send({type:"rpc_error",error:t.toString()});return}send({type:"rpc_result",data:kr(t)})}catch(e){send({type:"rpc_error",error:e.toString()})}}}}),Zt)}function vs(t){return Ss().toJson(t)}function kr(t){try{let e=t.getClass();if(e.getName()==="X.0h2R"){try{let r=e.getDeclaredField("LIZ");r.setAccessible(!0);let o=r.get(t);if(o!==null){let s=$.cast(o,Re().JavaObject),i=s.getClass().getDeclaredField("LJ");i.setAccessible(!0);let l=i.get(s);if(l!==null){let c=$.cast(l,Re().TypedByteArray).bytes.value;if(c!==null){let d=Re().JavaString.$new(c,"UTF-8").toString();if(d.length>2)return d}}}}catch{}try{let r=e.getDeclaredField("LIZIZ");r.setAccessible(!0);let o=r.get(t);if(o!==null)return vs($.cast(o,Re().JavaObject))}catch{}}return vs(t)}catch{return t.toString()}}function qt(t){let e=Re(),n=e.LinkedHashMap.$new();for(let[r,o]of Object.entries(t)){if(o==null)continue;let s=e.JavaString.$new(r);if(typeof o=="string")n.put(s,e.JavaString.$new(o));else if(typeof o=="number")Number.isInteger(o)?o>2147483647||o<-2147483648?n.put(s,e.JavaLong.valueOf(e.JavaLong.parseLong(o.toString()))):n.put(s,e.JavaInteger.valueOf(o)):n.put(s,e.JavaDouble.valueOf(o));else if(typeof o=="boolean")n.put(s,e.JavaBoolean.valueOf(o));else if(Array.isArray(o)){let i=e.ArrayList.$new();for(let l of o)typeof l=="string"?i.add(e.JavaString.$new(l)):typeof l=="number"?Number.isInteger(l)?l>2147483647||l<-2147483648?i.add(e.JavaLong.valueOf(e.JavaLong.parseLong(l.toString()))):i.add(e.JavaInteger.valueOf(l)):i.add(e.JavaDouble.valueOf(l)):typeof l=="boolean"?i.add(e.JavaBoolean.valueOf(l)):typeof l=="object"&&l!==null?i.add(qt(l)):i.add(e.JavaString.$new(String(l)));n.put(s,i)}else typeof o=="object"&&n.put(s,qt(o))}return n}function Ju(t){let e=Re(),n=e.HashMap.$new();for(let[r,o]of Object.entries(t))n.put(e.JavaString.$new(r),e.JavaString.$new(o));return n}function As(t,e){let r=$.use(t).class.getDeclaredField(e);return r.setAccessible(!0),r.get(null)}function Vu(t){return $.cast(t,$.use(t.getClass().getName()))}function Gu(t,e){let n=null,r=null;return $.perform(()=>{try{let o=Is(),s=qt(t),i=Ju(e),a=Cs().$new(),c=ws(),d=o.refreshPdpGodaV2SDUI(s,i,a),p=c!==null&&d!==null&&d.equals(c);!p&&d!==null?n=kr(d):!p&&d===null&&(n=JSON.stringify({status:"null_return"}))}catch(o){r=o.toString()}}),r?JSON.stringify({error:r}):n||JSON.stringify({status:"suspended",message:"Response will arrive via send() message"})}function $u(t,e,n){let r=null,o=null;return $.perform(()=>{try{let s=As("X.0YHQ","LIZ"),i=$.cast(s,$.use("X.0YHQ")),l=qt(t),a=null;e!==null&&(a=Re().JavaInteger.valueOf(e));let c=null;if(n!==null){let _=$.use("com.bytedance.goda.v2.model.vo.GodaV2RequestParams");c=Ss().fromJson(JSON.stringify(n),_.class)}let p=Cs().$new(),f=ws(),u=i.LJIJ(l,a,c,p);u!==null&&!u.equals(f)&&(r=kr(u))}catch(s){o=s.toString()}}),o?JSON.stringify({error:o}):r||JSON.stringify({status:"suspended",message:"Response will arrive via send() message"})}function Hu(){let t="unknown";return $.perform(()=>{try{t=Is()!==null?"ready":"api_null"}catch(e){t="error: "+e.toString()}}),t}rpc.exports={ping:Hu,callPdpApi(t,e){return Gu(JSON.parse(t),JSON.parse(e))},callPdpApiViaRepo(t,e,n){return $u(JSON.parse(t),e,n?JSON.parse(n):null)}};console.log("[*] rpc.ts loaded \u2014 RPC exports ready.");console.log("[*] Available: ping(), callPdpApi(), callPdpApiViaRepo()");
