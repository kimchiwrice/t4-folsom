# T4 Folsom website maintenance

This is a static website: HTML holds the content and styling, and JavaScript adds interactions. No framework or build step is needed for the published site. Node and Playwright are only local preview/testing tools.

## Preview on your computer

1. Install Node.js LTS and Microsoft Edge.
2. Open a terminal in this repository and run `npm.cmd ci` once (and after a dependency update).
3. Run `npm.cmd run preview` and open http://127.0.0.1:4173.
4. Keep that terminal running while reviewing. Ctrl+C stops it. This does not publish anything.
5. Stop the preview before running `npm.cmd test`, which starts its own server.

On macOS/Linux use `npm` in place of `npm.cmd`; change the Playwright browser channel or install Edge before running tests. The preview server binds only to your own computer and is not a production server.

## Where to edit

- `index.html`: page text, CSS, menu items/prices, phone, address, and order links. Search for the visible text to find its source. Preserve the existing layout for routine content changes.
- `store-hours.js`: Folsom timezone and the opening/closing calculation. Current published hours are Sun–Thu 11AM–9PM, Fri–Sat 11AM–10PM. Update the visible location hours in `index.html` at the same time. Holiday exceptions are not implemented.
- `images/` and `videos/`: local media. Keep filenames consistent with HTML references; compress new media before adding it.
- `tests/maintenance.spec.js`: repeatable browser checks for hours, missing animation scripts, and keyboard navigation.

The status uses America/Los_Angeles, including daylight saving time, and refreshes every 30 seconds and when the tab becomes visible. At closing time the store is closed. It reflects the published schedule, not live store operations.

Animations are optional. If GSAP or ScrollTrigger fails to load, content becomes visible immediately, and navigation, menu filters, and hours still work. The site retains external font and animation requests. Fully disabled JavaScript and slow/hanging CDN requests are not covered by this fallback.

## Make one safe change

1. Start from the latest `master`, with a clean working directory, then create a branch such as `codex/update-hours`.
2. Make the requested change. Obtain owner confirmation for pricing, hours, promotions, reviews, nutrition, and inspection claims.
3. Run `npm.cmd test`. Review the local preview at desktop and phone widths. Check menu filters, keyboard navigation (Enter/Space, Tab, Escape), and the location/contact information.
4. Review `git diff` for unrelated changes. Commit only the intended files. Do not commit credentials, `node_modules`, or `.vercel`.

Keep Meeth, order.online, and Grubhub links unless the owner confirms a channel change. Link clicks alone do not prove checkout works; do not place a test order without authorization.

## Shared preview and production release

The existing Vercel project is connected to this repository. Treat pushes/merges to `master` as potential production releases.

1. When a remote preview is needed, authenticate GitHub (`gh auth login`) and push the feature branch, not `master`.
2. Open a pull request targeting `master`. In the existing T4 Vercel project, verify that the deployment is labeled Preview and corresponds to that feature branch and commit. If no preview appears, check the project's Git integration/branch settings. Do not create another project as a workaround.
3. Review the actual preview URL and run the manual checks above. Preview access protection may require a signed-in account. This procedure has not been exercised for this maintenance branch.
4. Record the previous good production deployment and obtain Sean's approval of the preview before merging or promoting anything to production.
5. After authorized release, verify the production domain, menu filters, order destinations, mobile navigation, and store status. Record the commit, deployment URL, and date.

## Rollback

If an authorized release breaks the site, identify the last known good deployment in the existing Vercel project and use its rollback option after approval. Also revert the offending Git commit through a reviewed change so the next deployment does not restore the bug. Do not reset shared history or delete Vercel projects. Rollback has not been tested here.

## Scope and tradeoff

A small hours module makes the tricky calculation testable while keeping the site simple. The larger HTML file remains in place; extracting all CSS, content, or menu data is separate work. Automated checks reduce repeat work but do not constitute a full accessibility, visual, performance, or business-content audit.
