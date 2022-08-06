import { EndpointsManager } from "../../lib";
import { token, pipeName } from "./config";

// Starts and endpoint manager and an endpoint to query the TB pipe
// In this case, there's only one pipe so a single endpoint is enough
const em = new EndpointsManager(token);
const endpoint = em.createEndpoint(pipeName);

export default endpoint;