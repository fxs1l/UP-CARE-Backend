export const careDatabaseBaseUrl = "https://sync.upcare.ph/api";
export const careDatabaseUsername = process.env.CARE_DATABASE_USERNAME;
export const careDatabasePassword = process.env.CARE_DATABASE_PASSWORD;
export const careDatabaseOrganization = process.env.CARE_DATABASE_ORGANIZATION;
export const careDatabaseWorkspaceId = process.env.CARE_DATABASE_WORKSPACE_ID;
export const careDatabaseAuthToken = Buffer.from(`${careDatabaseUsername}:${careDatabasePassword}`).toString("base64");
