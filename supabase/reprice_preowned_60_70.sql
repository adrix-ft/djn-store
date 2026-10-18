-- ============================================================================
-- DJN TECH - COMPLIANT PRE-OWNED GAMES REPRICING (60% - 70% DISCOUNT)
-- Applied to all pre-owned games in database
-- ============================================================================

UPDATE public.products SET
    price = 1499,
    mrp = 4499,
    discount_percent = 67,
    updated_at = NOW()
WHERE id = 'call-of-duty-infinite-warfare-legacy-edition-ps4-preowned';
UPDATE public.products SET
    price = 1499,
    mrp = 3999,
    discount_percent = 63,
    updated_at = NOW()
WHERE id = 'cricket-22-ps4-preowned';
UPDATE public.products SET
    price = 799,
    mrp = 2399,
    discount_percent = 67,
    updated_at = NOW()
WHERE id = 'call-of-duty-infinite-warfare-xbox-preowned';