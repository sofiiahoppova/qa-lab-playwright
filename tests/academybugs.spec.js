import { test, expect } from "@playwright/test";

test.describe("Фінальний набір тестів для AcademyBugs.com", () => {
  //ТЕСТ #1: УСПІШНИЙ ПЕРЕХІД НА СТОРІНКУ ТОВАРУ

  test("Перевірка успішного переходу на сторінку товару", async ({ page }) => {
    // Крок 1: Відкриваємо сторінку зі списком усіх товарів
    await page.goto("https://academybugs.com/find-bugs/");

    // Крок 2: Знаходимо посилання на товар "DNK Yellow Shoes" і клікаємо на нього
    await page.getByRole("link", { name: "DNK Yellow Shoes" }).click();

    // Крок 3: Перевіряємо, що ми опинилися на правильній сторінці.
    // Очікуємо, що ПЕРШИЙ заголовок <h1> на новій сторінці буде містити потрібний текст.
    const pageTitle = page.locator("h1").first();
    await expect(pageTitle).toHaveText("DNK Yellow Shoes");
  });

  // ТЕСТ #2: Успішний перегляд повнорозмірної картинки товару «DNK Yellow Shoes»

  test("Перевірка повнорозмірної картинки товару", async ({ page }) => {
    // Крок 1: Відкриваємо сторінку зі списком усіх товарів
    await page.goto("https://academybugs.com/find-bugs/");

    // Крок 2: Знаходимо посилання на товар "DNK Yellow Shoes" і клікаємо на нього
    await page.getByRole("link", { name: "DNK Yellow Shoes" }).click();

    // Крок 3: Знайходимо зображення товару
    const image = page.locator(".ec_details_main_image img");
    // Перевіряємо, що зображення дійсно існує і відображається
    await expect(image).toBeVisible();
    // Клікаємо на зображення, щоб відкрити повнорозмірну картинку
    await image.click();

    // Крок 4: Перевіряємо, що зʼявилось модальне вікно
    // На сайті воно зʼявляється з CSS-класом ec_details_large_popup_main
    const modalImage = page.locator(".ec_details_large_popup_main img");
    // Перевіряємо, що повнорозмірна картинка видима
    await expect(modalImage).toBeVisible();

    // Крок 5: Перевіряємо що на модальній картинці немає зайвих іконок або тексту
    const icons = page.locator(".pp_hoverContainer");
    await expect(icons).toBeHidden();
  });

  //ТЕСТ #3: Успішний перехід на сторінку реєстаціїї

  test("Перевірка успішного переходу на сторінку реєстаціїї", async ({
    page,
  }) => {
    // Крок 1: Відкриваємо сторінку зі списком усіх товарів
    await page.goto("https://academybugs.com/find-bugs/");

    // Крок 2: Знаходимо посилання на будь-який товар і клікаємо на нього
    await page.getByRole("link", { name: "DNK Yellow Shoes" }).click();

    // Крок 3: Зназодимо посилання на сторінку реєстрації у кінці сторінки і клікаємо на нього
    await page.getByRole("link", { name: "SIGN UP" }).click();

    // Крок 4: Перевіряємо, що ми оипинились на сторінці реєстрації.
    await expect(page).toHaveURL(/.*account/);
  });
});
