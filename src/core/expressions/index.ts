import {Expression} from '../Query.js'
import from from './from.js'
import to from './to.js'

export const Expressions: Record<string, Expression> = {
  from: from,
  to: to,
}
