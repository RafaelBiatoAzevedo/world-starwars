import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('início e todas as opções do menu têm conteúdo e imagens válidas', async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /UMA GALÁXIA/ })).toBeVisible();
  await page.locator('img').evaluateAll(images =>
    Promise.all(
      images.map(image => {
        const img = image as HTMLImageElement;
        img.loading = 'eager';
        return img.decode();
      }),
    ),
  );
  await page.screenshot({ path: `artifacts/home-${testInfo.project.name}.png`, fullPage: true });
  for (const [route, title] of [
    ['characters', 'Personagens.'],
    ['planets', 'Planetas.'],
    ['films', 'Filmes.'],
    ['species', 'Espécies.'],
    ['starships', 'Naves.'],
    ['vehicles', 'Veículos.'],
  ]) {
    await page.goto(`/${route}`);
    await expect(page.getByRole('heading', { level: 1, name: title, exact: true })).toBeVisible();
    expect(await page.locator('.entity-card').count()).toBeGreaterThan(0);
    await expect(page.getByText('Em Breve', { exact: true })).toHaveCount(0);
    await page.locator('.entity-image img').evaluateAll(images =>
      Promise.all(
        images.map(image => {
          const img = image as HTMLImageElement;
          img.loading = 'eager';
          return img.decode();
        }),
      ),
    );
  }
  expect(errors).toEqual([]);
});

test('busca, filtro, ordenação, lista e paginação funcionam juntos', async ({ page }) => {
  await page.goto('/characters');
  await page.getByRole('button', { name: 'Próxima página' }).click();
  await expect(page).toHaveURL(/page=2/);
  await page.getByRole('searchbox', { name: 'Buscar personagens' }).fill('skywalker');
  await expect(page.locator('.entity-card')).toHaveCount(3);
  await page.getByRole('combobox', { name: 'Filtrar por gênero' }).selectOption('male');
  await expect(page.locator('.entity-card')).toHaveCount(2);
  await page.getByRole('combobox', { name: 'Ordenar registros' }).selectOption('desc');
  await expect(page.locator('.entity-info h3').first()).toHaveText('Luke Skywalker');
  await page.getByRole('button', { name: 'Visualizar em lista' }).click();
  await expect(page.locator('.entity-list')).toBeVisible();
  await page.getByRole('searchbox', { name: 'Buscar personagens' }).fill('inexistente123');
  await expect(page.getByRole('heading', { name: 'Nenhum sinal por aqui.' })).toBeVisible();
  await page.getByRole('button', { name: 'Limpar filtros' }).first().click();
  await expect(page.locator('.entity-card')).toHaveCount(12);
});

test('coleção persiste, filtra e permite remover o último favorito', async ({ page }) => {
  await page.goto('/characters');
  await page
    .getByRole('button', { name: 'Adicionar Luke Skywalker à coleção', exact: true })
    .click();
  await page.goto('/planets/1');
  await page.getByRole('button', { name: 'Adicionar Tatooine à coleção', exact: true }).click();
  await page.goto('/collection');
  await expect(page.locator('.entity-card')).toHaveCount(2);
  await page.reload();
  await expect(page.locator('.entity-card')).toHaveCount(2);
  await page.getByRole('combobox', { name: 'Filtrar por categoria' }).selectOption('planets');
  await expect(page.locator('.entity-card')).toHaveCount(1);
  await page.getByRole('button', { name: 'Remover Tatooine da coleção' }).click();
  await expect(page.locator('.entity-card')).toHaveCount(0);
  await page.getByRole('button', { name: 'Limpar filtros' }).first().click();
  await page.getByRole('button', { name: 'Remover Luke Skywalker da coleção' }).click();
  await expect(page.getByRole('heading', { name: /Toda coleção começa/ })).toBeVisible();
});

test('busca global e conexões levam a fichas completas', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir busca global' }).click();
  await page.getByRole('textbox', { name: 'Buscar em todas as categorias' }).fill('Vader');
  await page
    .getByRole('dialog')
    .getByRole('link', { name: /Darth Vader/ })
    .click();
  await expect(page).toHaveURL('/characters/4');
  await expect(page.getByRole('heading', { name: 'Darth Vader.', exact: true })).toBeVisible();
  await expect(page.getByText('202 cm', { exact: true })).toBeVisible();
  await page.screenshot({ path: `artifacts/detail-${testInfo.project.name}.png`, fullPage: true });
  await page
    .locator('.related-group')
    .filter({ has: page.getByRole('heading', { name: /Planeta de origem/ }) })
    .getByRole('link', { name: /Tatooine/ })
    .click();
  await expect(page).toHaveURL('/planets/1');
  await expect(page.getByRole('heading', { name: 'Tatooine.', exact: true })).toBeVisible();
});

test('navegação, foco e páginas desconhecidas são acessíveis', async ({ page }, testInfo) => {
  await page.goto('/');
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
    await page
      .getByRole('navigation', { name: 'Navegação móvel' })
      .getByRole('link', { name: 'Naves', exact: true })
      .click();
    await expect(page).toHaveURL('/starships');
    await expect(page.getByRole('button', { name: 'Abrir menu', exact: true })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  } else {
    await page
      .getByRole('navigation', { name: 'Navegação principal', exact: true })
      .getByRole('link', { name: 'Naves', exact: true })
      .click();
    await expect(page).toHaveURL('/starships');
  }
  await page.getByRole('button', { name: 'Abrir busca global' }).click();
  await expect(page.getByRole('textbox', { name: 'Buscar em todas as categorias' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Abrir busca global' })).toBeFocused();
  await page.goto('/planets/99999');
  await expect(page.getByRole('heading', { name: /Essas coordenadas/ })).toBeVisible();
  await page.getByRole('link', { name: 'Voltar à galáxia' }).click();
  await expect(page).toHaveURL('/');
});

test('não há rolagem horizontal em celular, tablet ou desktop', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop');
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/characters', '/starships/10', '/films/2', '/collection']) {
      await page.goto(route);
      const overflowing = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflowing, `${route} com ${width}px`).toBe(false);
    }
  }
});

test('páginas principais e busca passam em auditoria de acessibilidade WCAG AA', async ({
  page,
}) => {
  for (const route of ['/', '/planets', '/characters/1', '/collection']) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      result.violations,
      `${route}: ${JSON.stringify(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })))}`,
    ).toEqual([]);
  }
  await page.getByRole('button', { name: 'Abrir busca global' }).click();
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(result.violations).toEqual([]);
});
