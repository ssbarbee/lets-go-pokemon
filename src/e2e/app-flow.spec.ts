import { test, expect } from "@playwright/test";

test.describe("Pokemon App E2E", () => {
  test("App flow", async ({ page }) => {
    await page.goto("/");

    // 1. Validate Landing Page
    await expect(page.getByTestId("floating-background")).toBeVisible();
    await expect(page.getByTestId("search-input")).toBeVisible();

    // 2. Search for a Pokémon (broad search term 'a')
    const searchPokemon = "a";
    await page.getByTestId("search-input").fill(searchPokemon);

    // Wait for the grid to show search results
    await expect(page.getByTestId("pokemon-grid")).toBeVisible();

    // 3. Wait for Filtered Cards to Load
    await page.locator('[data-testid^="pokemon-card-"]').first().waitFor({ state: "visible" });

    // 4. Validate Filtered Cards Count > 0
    const filteredCards = await page.locator('[data-testid^="pokemon-card-"]').all();
    expect(filteredCards.length).toBeGreaterThan(0);

    // 5. Validate Virtualization is Working (rendered cards should be less than dataset)
    const renderedCardCount = await page.locator('[data-testid^="pokemon-card-"]').count();
    expect(renderedCardCount).toBeLessThan(50); // Assuming virtualization threshold (~20-40)

    // 6. Navigate to Pokémon Details Page (click first card)
    await filteredCards[0].click();

    // Wait for Pokémon Details to Load
    await expect(page.getByTestId("pokemon-name-heading")).toBeVisible();
    await expect(page.getByTestId("pokemon-name-heading")).toHaveText(new RegExp("bulbasaur", "i"));

    // 7. Open Evolution Drawer (Beaker Icon)
    const beakerButton = page.getByTestId("evolution-drawer-button");
    await beakerButton.waitFor({ state: "visible" });
    await beakerButton.click({ force: true });

    // 8. Validate Evolution Drawer is Visible
    const evoDrawer = page.locator("h2", { hasText: "Evolution Chain" });
    await expect(evoDrawer).toBeVisible();

    // Wait for Evolution Items to Load
    const evoCardCount = await page.locator('[data-testid^="evo-card-"]').count();
    expect(evoCardCount).toBeGreaterThan(1);
  });
});
