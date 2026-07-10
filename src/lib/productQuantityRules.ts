export type ProductQuantityRule = {
  minimum: number;
  step: number;
};

const DEFAULT_RULE: ProductQuantityRule = {
  minimum: 1,
  step: 1,
};

const FOUR_MAGNETS_RULE: ProductQuantityRule = {
  minimum: 4,
  step: 4,
};

export function getProductQuantityRule(title?: string): ProductQuantityRule {
  const normalizedTitle = String(title ?? '').trim().toLowerCase();

  if (normalizedTitle === '4 magnets' || normalizedTitle.startsWith('4 magnets ')) {
    return FOUR_MAGNETS_RULE;
  }

  return DEFAULT_RULE;
}

export function normalizeProductQuantity(
  quantity: number,
  title?: string,
  stock?: number,
): number {
  const rule = getProductQuantityRule(title);
  const requested = Math.max(rule.minimum, Math.floor(Number(quantity) || rule.minimum));
  const offset = requested - rule.minimum;
  const normalized = rule.minimum + Math.ceil(offset / rule.step) * rule.step;
  const available = Number(stock);

  if (Number.isFinite(available) && available >= 0) {
    if (available < rule.minimum) {
      return available;
    }

    const maxOffset = available - rule.minimum;
    const maxValidQuantity = rule.minimum + Math.floor(maxOffset / rule.step) * rule.step;

    return Math.min(normalized, maxValidQuantity);
  }

  return normalized;
}

export function getNextProductQuantity(
  quantity: number,
  title?: string,
  stock?: number,
): number {
  const rule = getProductQuantityRule(title);

  return normalizeProductQuantity(quantity + rule.step, title, stock);
}

export function getPreviousProductQuantity(
  quantity: number,
  title?: string,
  stock?: number,
): number {
  const rule = getProductQuantityRule(title);

  return normalizeProductQuantity(quantity - rule.step, title, stock);
}

export function getProductLineTotal(
  price: number,
  quantity: number,
  title?: string,
): number {
  const rule = getProductQuantityRule(title);
  const safePrice = Number(price) || 0;
  const safeQuantity = Math.max(rule.minimum, Number(quantity) || rule.minimum);

  return safePrice * (safeQuantity / rule.minimum);
}
