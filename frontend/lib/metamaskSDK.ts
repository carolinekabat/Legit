import MetaMaskSDK from "@metamask/sdk";

export const instantiateSDK = () => {
  if (typeof window === "undefined") {
    return null;
  }

  new MetaMaskSDK();
};