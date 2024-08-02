import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
// const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID;
const clientId = "2dcda4b39b2d62de8ec249c5d208c530";
export const client = createThirdwebClient({
  clientId: clientId,
});
