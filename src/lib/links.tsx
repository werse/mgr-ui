export function applicationDetailsRef(appId: string): string {
  return `/applications/${appId}/details`;
}

export function tenantDetailsRef(tenantId: string): string {
  return `/tenants/${tenantId}/details`;
}

export function entitlementFlowDetailsRef(tenantId: string): string {
  return `/entitlement-flows/${tenantId}/details`;
}

export function applicationFlowDetailsRef(flowId: string): string {
  return `/application-flows/${flowId}/details`;
}
