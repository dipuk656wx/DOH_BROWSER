import net from "net";
import fetch from "node-fetch";

function isIP(hostname) {
    return net.isIP(hostname);
  }
  
  // Function to resolve DNS using Cloudflare's DoH
  async function resolveDoH(hostname) {
    if (isIP(hostname)) {
      return hostname; // If it's already an IP, return it as is
    }
  
    const url = `https://cloudflare-dns.com/dns-query?name=${hostname}&type=A`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/dns-json',
      },
    });
  
    const data = await response.json();
    if (data.Answer && data.Answer.length > 0) {
      return data.Answer[0].data; // Return the resolved IP
    } else {
      throw new Error(`Unable to resolve ${hostname}`);
    }
  }
  
export default resolveDoH;
