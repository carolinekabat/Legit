const truncateRegex = /^(0x[a-zA-Z0-9]{6})[a-zA-Z0-9]+([a-zA-Z0-9]{6})$/;

export const shortenAddress = (address: string) => {
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}...${match[2]}`;
};
