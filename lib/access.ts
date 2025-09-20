import { PLAN_LIMITS, PLAN_TIERS, Plan, OpType } from '@/config/plans'

// NOTE: these functions are skeletons; wire them to Supabase in your app.
export async function getActivePlan(userId: string): Promise<Plan|null> {
  // TODO: fetch from subscriptions where status='active' and expires_at > now()
  return 'free'
}

export function getRemainingLimits(userId: string, plan: Plan, opType: OpType){
  const limit = PLAN_LIMITS[plan][opType]
  // TODO: fetch used from subscription_usage for current period
  const used = 0
  const remaining = limit < 0 ? -1 : Math.max(0, limit - used)
  return { available: limit < 0 || remaining > 0, remaining }
}

export async function getServiceTier(serviceCode: string): Promise<'free'|'standard'|'pro'|'balance_only'> {
  // TODO: read from services.tier
  return 'standard'
}

export async function priceFor(serviceCode: string, opType: OpType): Promise<number> {
  // TODO: read from service_prices
  return 500
}

export async function canUseService(userId: string, serviceCode: string, opType: OpType){
  const plan = await getActivePlan(userId)
  if(!plan) return { allow:false as const, reason:'upgrade' as const }
  const tier = await getServiceTier(serviceCode)
  const allowedTiers = PLAN_TIERS[plan]
  if(!allowedTiers.includes(tier as any) && tier !== 'balance_only'){
    return { allow:false as const, reason:'upgrade' as const }
  }
  const { available } = getRemainingLimits(userId, plan, opType)
  if(available){
    return { allow:true as const, charge:'subscription' as const }
  }
  // fallback to balance
  // TODO: check balances.real_cents >= price
  const price = await priceFor(serviceCode, opType)
  if(price > 0){
    return { allow:true as const, charge:'balance' as const }
  }
  return { allow:false as const, reason:'balance' as const }
}

export async function charge(userId: string, mode:'subscription'|'balance', {serviceCode, opType}:{serviceCode:string, opType:OpType}){
  if(mode==='subscription'){
    // TODO: increment usage in subscription_usage
    return { ok:true }
  }else{
    // TODO: decrement balances.real_cents and insert into payments
    return { ok:true }
  }
}
