import { ArbitraryWithContextualShrink } from '../check/arbitrary/definition/ArbitraryWithContextualShrink';
import { convertFromNextWithShrunkOnce } from '../check/arbitrary/definition/Converters';
import { IntegerArbitrary } from './_internals/IntegerArbitrary';

/**
 * Constraints to be applied on {@link nat}
 * @remarks Since 2.6.0
 * @public
 */
export interface NatConstraints {
  /**
   * Upper bound for the generated postive integers (included)
   * @defaultValue 0x7fffffff
   * @remarks Since 2.6.0
   */
  max?: number;
}

/**
 * For positive integers between 0 (included) and 2147483647 (included)
 * @remarks Since 0.0.1
 * @public
 */
function nat(): ArbitraryWithContextualShrink<number>;
/**
 * For positive integers between 0 (included) and max (included)
 *
 * @param max - Upper bound for the generated integers
 *
 * @remarks You may prefer to use `fc.nat({max})` instead.
 * @remarks Since 0.0.1
 * @public
 */
function nat(max: number): ArbitraryWithContextualShrink<number>;
/**
 * For positive integers between 0 (included) and max (included)
 *
 * @param constraints - Constraints to apply when building instances
 *
 * @remarks Since 2.6.0
 * @public
 */
function nat(constraints: NatConstraints): ArbitraryWithContextualShrink<number>;
function nat(arg?: number | NatConstraints): ArbitraryWithContextualShrink<number> {
  const max = typeof arg === 'number' ? arg : arg && arg.max !== undefined ? arg.max : 0x7fffffff;
  if (max < 0) {
    throw new Error('fc.nat value should be greater than or equal to 0');
  }
  if (!Number.isInteger(max)) {
    throw new Error('fc.nat maximum value should be an integer');
  }
  const arb = new IntegerArbitrary(0, max);
  return convertFromNextWithShrunkOnce(arb, arb.defaultTarget());
}
export { nat };
