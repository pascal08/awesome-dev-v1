// For more information about every statuscode visit:
// http://www.restapitutorial.com/httpstatuscodes.html
//
module.exports = function(statusCode) {
    let msg = "";
    switch (statusCode) {
    case 100: msg = "Continue"; break;
    case 101: msg = "Switching Protocols"; break;
    case 102: msg = "Processing (WebDAV)"; break;
    case 200: msg = "OK"; break;
    case 201: msg = "201 Created"; break;
    case 202: msg = "Accepted"; break;
    case 203: msg = "Non-Authoritative Information"; break;
    case 204: msg = "No Content"; break;
    case 205: msg = "Reset Content"; break;
    case 206: msg = "Partial Content"; break;
    case 207: msg = "Multi-Status (WebDAV)"; break;
    case 208: msg = "Already Reported (WebDAV)"; break;
    case 226: msg = "IM Used"; break;
    case 300: msg = "Multiple Choices"; break;
    case 301: msg = "Moved Permanently"; break;
    case 302: msg = "Found"; break;
    case 303: msg = "See Other"; break;
    case 304: msg = "Not Modified"; break;
    case 305: msg = "Use Proxy"; break;
    case 306: msg = "(Unused)"; break;
    case 307: msg = "Temporary Redirect"; break;
    case 400: msg = "Bad Request"; break;
    case 401: msg = "Unauthorized"; break;
    case 402: msg = "Payment Required"; break;
    case 403: msg = "Forbidden"; break;
    case 404: msg = "Not Found"; break;
    case 405: msg = "Method Not Allowed"; break;
    case 406: msg = "Not Acceptable"; break;
    case 407: msg = "407 Proxy Authentication Required"; break;
    case 408: msg = "Request Timeout"; break;
    case 409: msg = "Conflict"; break;
    case 410: msg = "Gone"; break;
    case 411: msg = "Length Required"; break;
    case 412: msg = "Precondition Failed"; break;
    case 413: msg = "Request Entity Too Large"; break;
    case 414: msg = "Request-URI Too Long"; break;
    case 415: msg = "Unsupported Media Type"; break;
    case 416: msg = "Requested Range Not Satisfiable"; break;
    case 417: msg = "Expectation Failed"; break;
    case 418: msg = "I'm a teapot (RFC 2324)"; break;
    case 420: msg = "Enhance Your Calm (Twitter)"; break;
    case 422: msg = "Unprocessable Entity (WebDAV)"; break;
    case 423: msg = "Locked (WebDAV)"; break;
    case 424: msg = "Failed Dependency (WebDAV)"; break;
    case 425: msg = "Reserved for WebDAV"; break;
    case 426: msg = "Upgrade Required"; break;
    case 428: msg = "Precondition Required"; break;
    case 429: msg = "Too Many Requests"; break;
    case 431: msg = "Request Header Fields Too Large"; break;
    case 444: msg = "No Response (Nginx)"; break;
    case 449: msg = "Retry With (Microsoft)"; break;
    case 450: msg = "Blocked by Windows Parental Controls (Microsoft)"; break;
    case 451: msg = "Unavailable For Legal Reasons"; break;
    case 499: msg = "Client Closed Request (Nginx)"; break;
    case 500: msg = "Internal Server Error"; break;
    case 502: msg = "Bad Gateway"; break;
    case 503: msg = "Service Unavailable"; break;
    case 504: msg = "Gateway Timeout"; break;
    case 505: msg = "HTTP Version Not Supported"; break;
    case 506: msg = "Variant Also Negotiates (Experimental)"; break;
    case 507: msg = "Insufficient Storage (WebDAV)"; break;
    case 508: msg = "Loop Detected (WebDAV)"; break;
    case 509: msg = "Bandwidth Limit Exceeded (Apache)"; break;
    case 510: msg = "Not Extended"; break;
    case 511: msg = "Network Authentication Required"; break;
    case 598: msg = "Network read timeout error"; break;
    case 599: msg = "Network connect timeout error"; break;

    case 501:
    default:  msg = "Not Implemented";
    }

    return msg;
}