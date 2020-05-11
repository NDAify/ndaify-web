import ip from 'ip';

const createXForwardedFor = (xForwardedFor, remoteAddress, localAddress) => {
  if (!xForwardedFor) {
    return `${remoteAddress}, ${localAddress}`;
  }
  const parts = xForwardedFor.split(',').map((part) => part.trim());

  const [lastProxyAddress] = parts.slice(-1);

  if (ip.isEqual(lastProxyAddress, remoteAddress)) {
    return `${xForwardedFor}, ${localAddress}`;
  }

  return `${xForwardedFor}, ${remoteAddress}, ${localAddress}`;
};

export default createXForwardedFor;
