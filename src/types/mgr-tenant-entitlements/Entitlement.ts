export interface Entitlement {
  applicationId: string;
  tenantId: string;
  tenantName?: string; // loaded by UI
  modules?: string[];
}
