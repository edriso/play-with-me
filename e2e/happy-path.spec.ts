import { expect, test } from '@playwright/test';

test('pick empty → a lying-down idea → swap → favourite → persists', async ({ page }) => {
  await page.goto('/');

  // The pick screen is visible on load.
  const heading = page.getByRole('heading', { name: /Your kid wants to play/ });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveCSS('opacity', '1');

  // Running on empty → reassurance + a single idea.
  await page.getByRole('button', { name: /Running on empty/ }).click();
  await expect(page.getByText(/without getting up/)).toBeVisible();
  const first = await page.locator('.pl-idea').textContent();

  // Another idea swaps the text.
  await page.getByRole('button', { name: /Another idea/ }).click();
  await expect(page.locator('.pl-idea')).not.toHaveText(first ?? '');

  // Favourite it, then open the favourites view and see it.
  const saved = await page.locator('.pl-idea').textContent();
  await page.getByRole('button', { name: 'Love it' }).click();
  await page.getByRole('button', { name: 'Favourites' }).click();
  await expect(page.getByRole('heading', { name: 'Saved ideas' })).toBeVisible();
  await expect(page.getByText(saved ?? '')).toBeVisible();

  // It survives a reload (localStorage persistence).
  await page.reload();
  await page.getByRole('button', { name: 'Favourites' }).click();
  await expect(page.getByText(saved ?? '')).toBeVisible();
});
