import { test, expect } from "@playwright/test";

// Допоміжна функція для додавання товару в кошик
async function addProductToCart(page, productName = "DNK Yellow Shoes") {
  // Перехід на сторінку магазину
  await page.goto("https://academybugs.com/find-bugs/", { timeout: 90000 });

  // Перехід до потрібного товару
  await page.getByRole("link", { name: productName }).first().click();

  // Додавання товару до кошика
  await page.getByRole("button", { name: /add to cart/i }).click();

  // Перевірка переходу до сторінки кошика
  await expect(page).toHaveURL(/.*cart.*/, { timeout: 30000 });
  await expect(page.getByRole("heading", { name: /shopping cart/i })).toBeVisible();
}

test.describe("Фінальний набір тестів для AcademyBugs.com", () => {
  
  //ТЕСТ #1: Успішне додавання товару в кошик
  test("Успішне додавання товару в кошик", async ({ page }) => {
    await addProductToCart(page);

    // Перевірка, що товар відображається у кошику
    const productName = page.locator(".cart_item .product-name a");
    await expect(productName).toHaveText("DNK Yellow Shoes");

    // Перевірка кількості товару
    const quantity = page.locator(".cart_item .product-quantity input");
    await expect(quantity).toHaveValue("1");

    // Перевірка наявності ціни
    const price = page.locator(".cart_item .product-subtotal");
    await expect(price).toBeVisible();

    // Перевірка наявності зображення товару
    const productImage = page.locator(".cart_item .product-thumbnail img");
    await expect(productImage).toBeVisible();
  });

  //ТЕСТ #2: Видалення товару при Quantity = 0
  test("Перевірка видалення товару при Quantity = 0", async ({ page }) => {
    await addProductToCart(page);

    // Встановлення кількості 0 і оновлення кошика
    const quantityInput = page.locator(".cart_item .product-quantity input").first();
    await quantityInput.fill("0");
    await page.getByRole("button", { name: "UPDATE" }).click();

    // Очікуваний результат: повідомлення про порожній кошик
    const emptyMessage = page.locator(".cart-empty");
    await expect(emptyMessage).toHaveText("There are no items in your cart.");
  });

  //ТЕСТ #3: Додавання більше ніж 3 одиниць товару
  test("Перевірка додавання більше 3 одиниць товару", async ({ page }) => {
    await addProductToCart(page);

    // Зміна кількості товару на 4
    const quantityInput = page.locator(".cart_item .product-quantity input").first();
    await quantityInput.fill("4");
    await page.getByRole("button", { name: "UPDATE" }).click();

    // Очікуваний результат: кількість оновилась до 4
    await expect(quantityInput).toHaveValue("4");

    // Перевірка, що загальна сума (Grand Total) відображається
    const grandTotal = page.locator(".order-total .amount");
    await expect(grandTotal).toBeVisible();
  });
});
