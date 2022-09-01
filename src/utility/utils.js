import { ARTICLE_BRANCH_USERPOST } from "constants/branches";

export const get_timestring = (timestamp) => {
  // timestamp is in UTC 0
  var a = new Date(timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();

  var timeText = "";
  var now = new Date();

  // consider timezone
  var now_ts = now.getTime() / 1000;
  var diff = now_ts - timestamp;
  if (diff > 24 * 3600) {
    timeText = month + " " + date + ", " + year;
  } else {
    timeText = Math.floor(diff / 3600) + "h ago";
  }
  return timeText;
};

export const get_elapsed_time = (datetime) => {
  let timestamp = new Date(datetime);
  const now = new Date();
  const timeDiff = Math.round((now - timestamp) / 1000);

  let result = 0;
  if (timeDiff < 3600) {
    result = Math.round(timeDiff / 60);
    return `${result}m ago`;
  }
  if (timeDiff < 86400) {
    result = Math.round(timeDiff / 3600);
    return `${result}h ago`;
  }

  result = Math.round(timeDiff / 86400);
  return `${result}d ago`;
};

export const get_today_string = () => {
  var today = new Date(); // in UTC 0
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var date = today.getDate();
  if (date < 10) {
    date = "0" + date;
  }
  return year + "-" + month + "-" + date;
};

export const get_now_datetime_string = ()=> {
  const d = new Date()
  const date = d.toISOString().split('T')[0];
  const time = d.toTimeString().split(' ')[0];
  return `${date} ${time}`
}

export const get_current_local_datetime_string = () => {
  var now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0,16);
}

// Check if source is alive (updated before 14 days from now)
export const is_source_alive = (source) => {
  if (source.branch === ARTICLE_BRANCH_USERPOST) {
    return true;
  }
  const last_updated_ts = Date.parse(source.last_updated);
  const now = new Date();
  const now_ts = now.getTime();
  return last_updated_ts > (now_ts - 86400 * 14000);
};

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

/*
    Get K-format string.
    Input   : int value
    Return  : K-format string if the value >= 1000, otherwise value string
*/
export const int2kstring = (value) => {
  var kstring = "";
  if (value < 1000) {
    kstring = (~~value).toString();
  } else if (value < 1000000) {
    value /= 1000;
    value = round(value, 1);
    kstring = value.toString() + "K";
  } else {
    value /= 1000000;
    value = round(value, 1);
    kstring = value.toString() + "M";
  }

  return kstring;
};

export const get_textwidth = (text, font) => {
  // re-use canvas object for better performance
  var canvas =
    get_textwidth.canvas ||
    (get_textwidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
};

export const int2commastring = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const slugify = (string) => {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

/*
*/
export const gen_random_int = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}


/*
    Get sub string of instr between startstr and endstr.
*/
export const get_substring = (instr, startstr, endstr) => {
  if (startstr === "") {
    const length = instr.indexOf(endstr);
    if (length >= 0) return instr.substring(0, length);
  }

  let start_idx = instr.indexOf(startstr);
  if (start_idx === -1) return "";

  start_idx += startstr.length;
  if (start_idx >= 0) {
    if (endstr !== undefined) {
      const length = instr.substring(start_idx).indexOf(endstr);
      if (length === -1) return instr.substring(start_idx);
      return instr.substring(start_idx, start_idx + length);
    }
    return instr.substring(start_idx);
  }
};

export const summarize_text = (text, length) => {
  if (text === null || text === undefined || text === "") {
    return "";
  }
  
  let words = text.split(" ");
  let characters = 0;
  let word_count = 0;
  let new_words = [];
  while (characters < length && word_count < words.length) {
    new_words.push(words[word_count]);
    characters += words[word_count].length;
    word_count++;
  }

  let summary = new_words.join(" ");
  if (word_count < words.length) {
    summary += "...";
  }
  return summary;
};

export const decodeHTMLEntities = (text) => {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

export const extract_text = (text) => {
  const div = document.createElement("div");
  div.innerHTML = text;
  const pureText = div.textContent || div.innerText || "";
  return pureText;
}

export const urlify = (text) => {
  let words = [];
  const matches = get_urls(text);
  if (matches === null) {
    words.push({
      type: "text",
      value: text,
    });
    return words;
  }

  let temp_sentence = text;
  for (let match of matches) {
    let pre = get_substring(temp_sentence, "", match);
    if (pre !== "") {
      words.push({
        type: "text",
        value: pre,
      });
    }
    words.push({
      type: "link",
      value: match,
    });
    temp_sentence = get_substring(temp_sentence, match);
  }
  if (temp_sentence.length > 0) {
    words.push({
      type: "text",
      value: temp_sentence,
    });
  }
  return words;
};

export const render_text = (text, dark=false) => {
  const decoded_sentence = decodeHTMLEntities(text);
  const words = urlify(decoded_sentence);
  return (
    <>
      {words.map((word) => {
        if (word.type === "text")
          return word.value;
        if (word.type === "link") {
          if (dark) {
            return (
              <a href={word.value} key={word.value} target="_blank" rel="noreferrer" style={{color: "white", textDecoration: "underline"}}>
                {word.value}
              </a>
            );
          } else { 
            return (
              <a href={word.value} key={word.value} target="_blank" rel="noreferrer">
                {word.value}
              </a>
            );
          }
        }
        return "";
      })}
    </>
  );
};

export const is_valid_url = (string) => {
  // var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
  return (res !== null)
};

export const get_urls = (string) => {
  // var matches = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
  var matches = string.match(/(http(s)?:\/\/[^\s]+)/g);
  return matches;
}

export const get_hostname = (url) => {
  var urlParts = url.replace('http://','').replace('https://','').split(/[/?#]/);
  return urlParts[0];
}

export const get_domainname = (url) => {
  var urlParts = url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/);
  return urlParts[0];
}

export const validate_email = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


const MD5 = function(e) {
  function h(a, b) {
      var c, d, e, f, g;
      e = a & 2147483648;
      f = b & 2147483648;
      c = a & 1073741824;
      d = b & 1073741824;
      g = (a & 1073741823) + (b & 1073741823);
      return c & d ? g ^ 2147483648 ^ e ^ f : c | d ? g & 1073741824 ? g ^ 3221225472 ^ e ^ f : g ^ 1073741824 ^ e ^ f : g ^ e ^ f
  }

  function k(a, b, c, d, e, f, g) {
      a = h(a, h(h((b & c) | (~b & d), e), g));
      return h((a << f) | (a >>> 32 - f), b)
  }

  function l(a, b, c, d, e, f, g) {
      a = h(a, h(h((b & d) | (c & ~d), e), g));
      return h((a << f) | (a >>> 32 - f), b)
  }

  function m(a, b, d, c, e, f, g) {
      a = h(a, h(h(b ^ d ^ c, e), g));
      return h((a << f) | (a >>> 32 - f), b)
  }

  function n(a, b, d, c, e, f, g) {
      a = h(a, h(h(d ^ (b | ~c), e), g));
      return h((a << f) | (a >>> 32 - f), b)
  }

  function p(a) {
      var b = "",
          d = "",
          c;
      for (c = 0; 3 >= c; c++) { 
        d = (a >>> 8 * c) & 255; 
        d = "0" + d.toString(16); 
        b += d.substr(d.length - 2, 2); 
      }
      return b
  }
  var f = [],
      q, r, s, t, a, b, c, d;
  e = function(a) {
      a = a.replace(/\r\n/g, "\n");
      for (var b = "", d = 0; d < a.length; d++) {
          var c = a.charCodeAt(d);
          if (128 > c) {
            b += String.fromCharCode(c)
          } else {
            if (127 < c && 2048 > c ) {
               b += String.fromCharCode((c >> 6) | 192);
            } else {
              b += String.fromCharCode((c >> 12) | 224);
              b += String.fromCharCode(((c >> 6) & 63) | 128); b += String.fromCharCode((c & 63) | 128);
            }
          }
      }
      return b
  }(e);
  f = function(b) {
      var a, c = b.length;
      a = c + 8;
      for (var d = 16 * ((a - a % 64) / 64 + 1), e = Array(d - 1), f = 0, g = 0; g < c;) {
        a = (g - g % 4) / 4;
        f = g % 4 * 8;
        e[a] |= b.charCodeAt(g) << f;
        g++;
      }
      a = (g - g % 4) / 4;
      e[a] |= 128 << g % 4 * 8;
      e[d - 2] = c << 3;
      e[d - 1] = c >>> 29;
      return e
  }(e);
  a = 1732584193;
  b = 4023233417;
  c = 2562383102;
  d = 271733878;
  for (e = 0; e < f.length; e += 16) { 
    q = a; r = b; s = c; t = d; 
    a = k(a, b, c, d, f[e + 0], 7, 3614090360); 
    d = k(d, a, b, c, f[e + 1], 12, 3905402710); 
    c = k(c, d, a, b, f[e + 2], 17, 606105819); 
    b = k(b, c, d, a, f[e + 3], 22, 3250441966); 
    a = k(a, b, c, d, f[e + 4], 7, 4118548399); 
    d = k(d, a, b, c, f[e + 5], 12, 1200080426); 
    c = k(c, d, a, b, f[e + 6], 17, 2821735955); 
    b = k(b, c, d, a, f[e + 7], 22, 4249261313); 
    a = k(a, b, c, d, f[e + 8], 7, 1770035416); 
    d = k(d, a, b, c, f[e + 9], 12, 2336552879);
    c = k(c, d, a, b, f[e + 10], 17, 4294925233);
    b = k(b, c, d, a, f[e + 11], 22, 2304563134);
    a = k(a, b, c, d, f[e + 12], 7, 1804603682);
    d = k(d, a, b, c, f[e + 13], 12, 4254626195);
    c = k(c, d, a, b, f[e + 14], 17, 2792965006);
    b = k(b, c, d, a, f[e + 15], 22, 1236535329);
    a = l(a, b, c, d, f[e + 1], 5, 4129170786);
    d = l(d, a, b, c, f[e + 6], 9, 3225465664);
    c = l(c, d, a, b, f[e + 11], 14, 643717713);
    b = l(b, c, d, a, f[e + 0], 20, 3921069994);
    a = l(a, b, c, d, f[e + 5], 5, 3593408605);
    d = l(d, a, b, c, f[e + 10], 9, 38016083);
    c = l(c, d, a, b, f[e + 15], 14, 3634488961);
    b = l(b, c, d, a, f[e + 4], 20, 3889429448);
    a = l(a, b, c, d, f[e + 9], 5, 568446438);
    d = l(d, a, b, c, f[e + 14], 9, 3275163606);
    c = l(c, d, a, b, f[e + 3], 14, 4107603335);
    b = l(b, c, d, a, f[e + 8], 20, 1163531501);
    a = l(a, b, c, d, f[e + 13], 5, 2850285829);
    d = l(d, a, b, c, f[e + 2], 9, 4243563512);
    c = l(c, d, a, b, f[e + 7], 14, 1735328473);
    b = l(b, c, d, a, f[e + 12], 20, 2368359562);
    a = m(a, b, c, d, f[e + 5], 4, 4294588738);
    d = m(d, a, b, c, f[e + 8], 11, 2272392833);
    c = m(c, d, a, b, f[e + 11], 16, 1839030562);
    b = m(b, c, d, a, f[e + 14], 23, 4259657740);
    a = m(a, b, c, d, f[e + 1], 4, 2763975236);
    d = m(d, a, b, c, f[e + 4], 11, 1272893353);
    c = m(c, d, a, b, f[e + 7], 16, 4139469664);
    b = m(b, c, d, a, f[e + 10], 23, 3200236656);
    a = m(a, b, c, d, f[e + 13], 4, 681279174);
    d = m(d, a, b, c, f[e + 0], 11, 3936430074);
    c = m(c, d, a, b, f[e + 3], 16, 3572445317);
    b = m(b, c, d, a, f[e + 6], 23, 76029189);
    a = m(a, b, c, d, f[e + 9], 4, 3654602809);
    d = m(d, a, b, c, f[e + 12], 11, 3873151461);
    c = m(c, d, a, b, f[e + 15], 16, 530742520);
    b = m(b, c, d, a, f[e + 2], 23, 3299628645);
    a = n(a, b, c, d, f[e + 0], 6, 4096336452);
    d = n(d, a, b, c, f[e + 7], 10, 1126891415);
    c = n(c, d, a, b, f[e + 14], 15, 2878612391);
    b = n(b, c, d, a, f[e + 5], 21, 4237533241);
    a = n(a, b, c, d, f[e + 12], 6, 1700485571);
    d = n(d, a, b, c, f[e + 3], 10, 2399980690);
    c = n(c, d, a, b, f[e + 10], 15, 4293915773);
    b = n(b, c, d, a, f[e + 1], 21, 2240044497);
    a = n(a, b, c, d, f[e + 8], 6, 1873313359);
    d = n(d, a, b, c, f[e + 15], 10, 4264355552);
    c = n(c, d, a, b, f[e + 6], 15, 2734768916);
    b = n(b, c, d, a, f[e + 13], 21, 1309151649);
    a = n(a, b, c, d, f[e + 4], 6, 4149444226);
    d = n(d, a, b, c, f[e + 11], 10, 3174756917);
    c = n(c, d, a, b, f[e + 2], 15, 718787259);
    b = n(b, c, d, a, f[e + 9], 21, 3951481745);
    a = h(a, q); b = h(b, r); c = h(c, s); d = h(d, t); 
  }
  return (p(a) + p(b) + p(c) + p(d)).toLowerCase();
};

export const get_hash = (text) => {
  return MD5(text);
}

export const is_valid_slug = (slug) => {
  const regex = /^[a-zA-Z0-9]+(?:[-_][a-zA-Z0-9]+)*$/g;
  const found = slug.match(regex);
  return found !== null;
}

export const is_valid_token_address = (address) => {
  const regex = /^0x[0-9a-fA-F]+$/g;
  const found = address.match(regex);
  return found !== null;
}

export const objects_equal = (o1, o2) => {
  return Object.keys(o1).length === Object.keys(o2).length 
    && Object.keys(o1).every(p => o1[p] === o2[p]);
}


// function test() {
  // var now = new Date();
  // console.log("timezone offset ", now.getTimezoneOffset());
  // console.log("TimeText for 1560282316 ", timeConverter(1560282316));
  // console.log("TimeText for 1560616393 ", timeConverter(1560616393));
  // console.log(get_textwidth("hello there!", "bold 12pt arial"));  // close to 86

  // var somestring = 'first "${searchTerm}" from the beginning';
  // var midstring = get_substring(somestring, '"${', '}"');
  // var startstring = get_substring(somestring, '"${');
  // var laststring = get_substring(somestring, '', "from");

  // console.log("original string :", somestring);
  // console.log("midding string :", midstring);
  // console.log("start string :", startstring);
  // console.log("last string :", laststring);

  // var text = "hello world";
  // var hashval = get_hash(text);
  // console.log("hash value :", hashval);
// };


// test();