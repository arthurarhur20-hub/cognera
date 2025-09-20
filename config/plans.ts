export type Plan = 'free'|'standard'|'pro'
export type OpType = 'text'|'image'|'video'|'audio'

export const PLAN_LIMITS: Record<Plan, Record<OpType, number>> = {
  free:     { text: 20,  image: 5,   video: 0,  audio: 0 },
  standard: { text: -1,  image: 100, video: 10, audio: 50 },
  pro:      { text: -1,  image: -1,  video: -1, audio: -1 },
}

export const PLAN_TIERS: Record<Plan, ('free'|'standard'|'pro')[]> = {
  free:     ['free'],
  standard: ['free','standard'],
  pro:      ['free','standard','pro'],
}
