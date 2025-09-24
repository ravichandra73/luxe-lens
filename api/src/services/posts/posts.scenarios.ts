import type { Prisma, Post } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: { data: { title: 'String', updatedAt: '2025-09-21T19:25:33.105Z' } },
    two: { data: { title: 'String', updatedAt: '2025-09-21T19:25:33.105Z' } },
  },
})

export type StandardScenario = ScenarioData<Post, 'post'>
