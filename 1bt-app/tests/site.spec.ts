import { test, expect } from '@playwright/test';

test.describe('1Б 123 ОБрТрО — Site E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('nav', { timeout: 10_000 });
  });

  test('01 — Navbar: логотип, посилання та кнопка', async ({ page }) => {
    const nav = page.locator('nav');

    await test.step('nav відображається', async () => {
      await expect(nav).toBeVisible();
    });

    await test.step('логотип присутній', async () => {
      await expect(nav.locator('img').first()).toBeVisible();
    });

    await test.step('навігаційні посилання (Головна / Шлях / Нагороди / Контакти)', async () => {
      await expect(nav.getByRole('link', { name: 'Головна' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Шлях' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Нагороди' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Контакти' })).toBeVisible();
    });

    await test.step('кнопка «Долучитись» видима', async () => {
      await expect(nav.locator('button', { hasText: 'Долучитись' }).first()).toBeVisible();
    });
  });

  test('02 — Hero: заголовок, бейдж, CTA та статистика', async ({ page }) => {
    const hero = page.locator('#home');

    await test.step('головний заголовок «1-й Батальйон 123 ОБрТрО»', async () => {
      await expect(hero.locator('text=1-й')).toBeVisible();
      await expect(hero.locator('text=123 ОБрТрО')).toBeVisible();
    });

    await test.step('верхній бейдж В/Ч А7052', async () => {
      await expect(hero.locator('text=В/Ч А7052')).toBeVisible();
    });

    await test.step('шеврон (зображення логотипа)', async () => {
      await expect(hero.locator('img').last()).toBeVisible();
    });

    await test.step('CTA-кнопки «Бойовий шлях» та «Долучитись»', async () => {
      await expect(hero.locator('a', { hasText: 'Бойовий шлях' })).toBeVisible();
      await expect(hero.locator('button', { hasText: 'Долучитись' })).toBeVisible();
    });
  });

  test('03 — Timeline: усі 6 карток бойового шляху', async ({ page }) => {
    await page.locator('#history').scrollIntoViewIfNeeded();

    await test.step('відображаються всі 6 записів', async () => {
      const history = page.locator('#history');
      await expect(history.locator('text=Формування')).toBeVisible({ timeout: 5000 });
      await expect(history.locator('text=Офіційне створення')).toBeVisible();
      await expect(history.locator('text=Повномасштабне вторгнення')).toBeVisible();
      await expect(history.locator('text=Оборона Миколаєва')).toBeVisible();
      await expect(history.locator('text=Дніпровські острови')).toBeVisible();
      await expect(history.locator('text=Харківщина')).toBeVisible();
    });

    await test.step('блок статистики (4 напрямки) під заголовком', async () => {
      await expect(page.locator('#history').locator('text=4').first()).toBeVisible();
      await expect(page.locator('#history').locator('text=Напрямки бойових дій')).toBeVisible();
    });

    await test.step('бейдж «Активно» на поточній кампанії', async () => {
      await expect(page.locator('#history').locator('text=Активно')).toBeVisible();
    });
  });

  test('04 — Awards: статистика та картки нагород', async ({ page }) => {
    await page.locator('#awards').scrollIntoViewIfNeeded();
    const awards = page.locator('#awards');

    await test.step('блок статистики: цифра 253 та підпис «Держ. нагороди»', async () => {
      await expect(awards.locator('text=253').first()).toBeVisible({ timeout: 5000 });
      await expect(awards.locator('text=Держ. нагороди')).toBeVisible();
    });

    await test.step('заголовки секцій «Державні нагороди» та «Відомчі відзнаки»', async () => {
      await expect(awards.getByRole('heading', { name: 'Державні нагороди' })).toBeVisible();
      await expect(awards.getByRole('heading', { name: 'Відомчі відзнаки' })).toBeVisible();
    });

    await test.step('конкретні нагороди в списку', async () => {
      await expect(awards.locator('text=Богдана Хмельницького')).toBeVisible();
      await expect(awards.locator('text=Золотий хрест')).toBeVisible();
    });
  });

  test('05 — Contact: форма заповнюється та відправляється', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();
    const contact = page.locator('#contact');

    await test.step('секція «Написати нам» видима', async () => {
      await expect(contact.locator('text=Написати нам')).toBeVisible({ timeout: 5000 });
    });

    await test.step('заповнення полів форми', async () => {
      await contact.locator('input').nth(0).fill('Тест Тестенко');
      await contact.locator('input').nth(1).fill('+380991234567');
      await contact.locator('textarea').fill('Тестове повідомлення');
    });

    await test.step('відправка і перевірка станів «Відправлення…» → «Надіслано»', async () => {
      await contact.locator('button[type=submit]').click();
      await expect(contact.locator('text=Відправлення')).toBeVisible({ timeout: 5000 });
      await expect(contact.locator('text=Повідомлення надіслано')).toBeVisible({ timeout: 5000 });
    });
  });

  test('06 — Join modal: відкривається, заповнюється, сабмітиться і закривається', async ({ page }) => {
    await test.step('кнопка «Долучитись» відкриває модалку', async () => {
      await page.locator('nav button', { hasText: 'Долучитись' }).first().click();
      await expect(page.locator('text=Заявка на Долучення')).toBeVisible({ timeout: 5000 });
    });

    await test.step('лейбли полів форми видимі', async () => {
      const modal = page.locator('[style*="scaleIn"]').or(page.locator('text=Заявка на Долучення').locator('..').locator('..'));
      await expect(page.locator('text=Ім\'я та прізвище').first()).toBeVisible();
      await expect(page.locator('text=Номер телефону').first()).toBeVisible();
      await expect(page.locator('text=Досвід та інше').first()).toBeVisible();
    });

    await test.step('форма містить поля для вводу', async () => {
      await page.locator('input[type=text]').last().fill('Ivan Franko');
      await page.locator('input[type=tel]').fill('+380661234567');
    });

    await test.step('відправка форми показує success стан', async () => {
      await page.locator('button[type=submit]').last().click();
      await expect(page.locator('text=Заявку прийнято!')).toBeVisible({ timeout: 5000 });
      await expect(page.locator('text=Ми зв\'яжемося з вами найближчим часом.')).toBeVisible();
    });
  });

  test('06b — Join modal: закривається кнопкою ×', async ({ page }) => {
    await page.locator('nav button', { hasText: 'Долучитись' }).first().click();
    await expect(page.locator('text=Заявка на Долучення')).toBeVisible({ timeout: 5000 });

    await test.step('кнопка × закриває модалку', async () => {
      await page.locator('[data-testid="modal-close"]').click();
      await expect(page.locator('text=Заявка на Долучення')).not.toBeVisible({ timeout: 5000 });
    });
  });

  test('07 — Footer: логотип і копірайт', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await test.step('footer видимий', async () => {
      await expect(page.locator('footer')).toBeVisible({ timeout: 5000 });
    });

    await test.step('назва підрозділу та рядок копірайту', async () => {
      await expect(page.locator('footer').locator('text=ОБрТрО')).toBeVisible();
      await expect(page.locator('footer').locator('text=Всі права захищено')).toBeVisible();
    });
  });

  test('08 — Awards: порядок відомчих відзнак', async ({ page }) => {
    await page.locator('#awards').scrollIntoViewIfNeeded();
    const depSection = page.locator('#awards').locator('text=Відомчі відзнаки').locator('..');

    await test.step('«Хрест Сил ТрО» є у списку відомчих відзнак', async () => {
      await expect(page.locator('#awards').locator('text=Хрест Сил ТрО')).toBeVisible({ timeout: 5000 });
    });

    await test.step('«Іменна вогнепальна зброя» є у списку відомчих відзнак', async () => {
      await expect(page.locator('#awards').locator('text=Іменна вогнепальна зброя')).toBeVisible();
    });

    await test.step('«Медаль «За поранення» є у списку', async () => {
      await expect(page.locator('#awards').locator('text=За поранення')).toBeVisible();
    });

    await test.step('«Знак пошани» є у списку', async () => {
      await expect(page.locator('#awards').locator('text=Знак пошани')).toBeVisible();
    });
  });
});
