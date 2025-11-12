import entitlements from './entitlement-flows-data.json';
import type { EntitlementFlowsCollection } from '@/types/mgr-tenant-entitlements/flow';

// Cast the imported JSON to the expected type to satisfy TypeScript
export const ENTITLEMENT_FLOWS_SAMPLE_DATA: EntitlementFlowsCollection = entitlements as unknown as EntitlementFlowsCollection;
