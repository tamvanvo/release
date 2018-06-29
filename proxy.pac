function FindProxyForURL(url, host) {
    if(shExpMatch(host,"*.qas-labs.com")) return "DIRECT";
    if(shExpMatch(host,"*.qtestnet.com")) return "DIRECT";
    return "PROXY 192.168.56.17:3128";
}
