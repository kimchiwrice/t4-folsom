const { test, expect } = require('@playwright/test');
const { getStatus } = require('../store-hours');
test('Folsom opening, closing, midnight and daylight saving boundaries', () => {
    for (const [date, open] of [
        ['2026-09-22T17:59:00Z', false], ['2026-09-22T18:00:00Z', true],
        ['2026-09-23T03:59:00Z', true], ['2026-09-23T04:00:00Z', false],
        ['2026-09-26T04:59:00Z', true], ['2026-09-26T05:00:00Z', false],
        ['2026-09-27T04:59:00Z', true], ['2026-09-27T05:00:00Z', false],
        ['2026-09-28T04:00:00Z', false], ['2026-09-22T07:00:00Z', false],
        ['2026-01-05T19:00:00Z', true], ['2026-01-06T05:00:00Z', false],
        ['2026-03-08T18:00:00Z', true], ['2026-11-01T19:00:00Z', true]
    ]) expect(getStatus(new Date(date)).isOpen, date).toBe(open);
});
for (const blocked of ['gsap.min.js', 'ScrollTrigger.min.js', 'none']) {
    test(`mobile essentials with ${blocked} blocked`, async ({ page }) => {
        await page.setViewportSize({width:390,height:844});
        const errors=[]; page.on('pageerror', e => errors.push(e.message));
        if (blocked !== 'none') await page.route(`**/${blocked}`, route => route.abort());
        await page.goto('/');
        await expect(page.locator('#loader')).toBeHidden({timeout:10000});
        await expect(page.locator('#hero .hero-ctas')).toHaveCSS('opacity','1');
        const toggle=page.getByRole('button',{name:'Toggle navigation'});
        await toggle.focus(); await page.keyboard.press('Enter');
        await expect(toggle).toHaveAttribute('aria-expanded','true');
        await page.keyboard.press('Tab');
        await expect(page.locator('#navLinks a').first()).toBeFocused();
        await page.keyboard.press('Escape');
        await expect(toggle).toBeFocused(); await expect(toggle).toHaveAttribute('aria-expanded','false');
        await page.keyboard.press('Space');
        await page.locator('#navLinks a').first().click();
        await expect(toggle).toHaveAttribute('aria-expanded','false');
        await page.getByRole('button',{name:'Milk Tea',exact:true}).click();
        await expect(page.locator('.menu-panel.active')).toHaveCount(1);
        await page.getByRole('button',{name:'All',exact:true}).click();
        expect(await page.locator('.menu-panel.active').count()).toBeGreaterThan(1);
        await expect(page.locator('#heroOpenStatus')).toContainText(/Open Now|Closed/);
        expect(errors).toEqual([]);
        if (blocked === 'gsap.min.js') await page.screenshot({path:'test-results/mobile-no-cdn.png',fullPage:true});
    });
}
for (const timezoneId of ['Asia/Tokyo','America/New_York','America/Los_Angeles']) {
    test(`visitor in ${timezoneId} sees Folsom hours and refresh`, async ({ browser }) => {
        const context=await browser.newContext({timezoneId}); const page=await context.newPage();
        await page.route('**/gsap.min.js', r => r.abort());
        await page.clock.install({time:new Date('2026-09-22T17:59:50Z')});
        await page.goto('/'); await expect(page.locator('#heroOpenStatus')).toContainText('Closed');
        await page.clock.fastForward(30000); await expect(page.locator('#heroOpenStatus')).toContainText('Open Now');
        await context.close();
    });
}

test('desktop preview and unavailable session storage', async ({ page }) => {
    await page.setViewportSize({width:1440,height:1000});
    await page.addInitScript(() => Object.defineProperty(window, 'sessionStorage', { get() { throw new Error('blocked storage'); } }));
    const errors=[]; page.on('pageerror', e => errors.push(e.message));
    await page.goto('/');
    await expect(page.locator('#loader')).toBeHidden({timeout:10000});
    await expect(page.locator('#hero .hero-ctas')).toHaveCSS('opacity','1');
    await expect(page.locator('#navLinks')).toBeVisible();
    await page.screenshot({path:'test-results/desktop.png'});
    expect(errors).toEqual([]);
});
