# Changelog

## v0.6.0

[compare changes](https://github.com/ddradar/nuxt-swa/compare/v0.5.0...v0.6.0)

### 🩹 Fixes

- **docs:** Move instrumentation key to public ([#129](https://github.com/ddradar/nuxt-swa/pull/129))
- **docs:** Use UContent components instead of UDocs ([#130](https://github.com/ddradar/nuxt-swa/pull/130))
- Avoid use lodash/template on generate types ([#158](https://github.com/ddradar/nuxt-swa/pull/158))

### 🏡 Chore

- Migrate to @nuxt/fonts ([#94](https://github.com/ddradar/nuxt-swa/pull/94), [#128](https://github.com/ddradar/nuxt-swa/pull/128), [#138](https://github.com/ddradar/nuxt-swa/pull/138), [#161](https://github.com/ddradar/nuxt-swa/pull/161))
- Migrate to eslint v9 & @nuxt/eslint module & flat config ([#95](https://github.com/ddradar/nuxt-swa/pull/95), [#122](https://github.com/ddradar/nuxt-swa/pull/122), [#137](https://github.com/ddradar/nuxt-swa/pull/137), [#138](https://github.com/ddradar/nuxt-swa/pull/138), [#160](https://github.com/ddradar/nuxt-swa/pull/160), [#161](https://github.com/ddradar/nuxt-swa/pull/161), [#166](https://github.com/ddradar/nuxt-swa/pull/166)), closes [#107](https://github.com/ddradar/nuxt-swa/issues/107)
- Update @nuxt/module-builder to 0.6.0 ([#125](https://github.com/ddradar/nuxt-swa/pull/125))
- Migrate to pnpm v9 ([#127](https://github.com/ddradar/nuxt-swa/pull/127))
- Use corepack ([#157](https://github.com/ddradar/nuxt-swa/pull/157)), closes [#148](https://github.com/ddradar/nuxt-swa/issues/148)
- Use swa-cli on deploy ([#168](https://github.com/ddradar/nuxt-swa/pull/168), [#169](https://github.com/ddradar/nuxt-swa/pull/169), [#170](https://github.com/ddradar/nuxt-swa/pull/170)), closes [#62](https://github.com/ddradar/nuxt-swa/issues/62)

### 🤖 CI

#### Dependencies Update

|kind|package|old|new|PRs|
|----|-------|--:|--:|---|
|NPM|@nuxt/kit|3.10.3|3.13.0|[#83](https://github.com/ddradar/nuxt-swa/pull/83), [#138](https://github.com/ddradar/nuxt-swa/pull/138), [#161](https://github.com/ddradar/nuxt-swa/pull/161)|
|NPM|ufo|1.4.0|1.5.4|[#92](https://github.com/ddradar/nuxt-swa/pull/92), [#147](https://github.com/ddradar/nuxt-swa/pull/147)|
|NPM(dev)|@azure/static-web-apps-cli|1.1.6|2.0.1|[#85](https://github.com/ddradar/nuxt-swa/pull/85), [#141](https://github.com/ddradar/nuxt-swa/pull/141)|
|NPM(dev)|@nuxt/module-builder|0.5.5|0.8.3|[#125](https://github.com/ddradar/nuxt-swa/pull/125), [#138](https://github.com/ddradar/nuxt-swa/pull/138), [#161](https://github.com/ddradar/nuxt-swa/pull/161)|
|NPM(dev)|@nuxt/schema|3.10.3|3.13.0|[#83](https://github.com/ddradar/nuxt-swa/pull/83), [#128](https://github.com/ddradar/nuxt-swa/pull/128), [#138](https://github.com/ddradar/nuxt-swa/pull/138), [#161](https://github.com/ddradar/nuxt-swa/pull/161)|
|NPM(dev)|@nuxt/test-utils|3.11.0|3.14.1|[#83](https://github.com/ddradar/nuxt-swa/pull/83), [#128](https://github.com/ddradar/nuxt-swa/pull/128), [#138](https://github.com/ddradar/nuxt-swa/pull/138), [#161](https://github.com/ddradar/nuxt-swa/pull/161)|
|NPM(dev)|@nuxthq/studio|1.0.12|2.0.3|[#90](https://github.com/ddradar/nuxt-swa/pull/90), [#111](https://github.com/ddradar/nuxt-swa/pull/111), [#139](https://github.com/ddradar/nuxt-swa/pull/139)|
|NPM(dev)|@types/node|18.19.22|18.19.47|[#97](https://github.com/ddradar/nuxt-swa/pull/97), [#106](https://github.com/ddradar/nuxt-swa/pull/106), [#110](https://github.com/ddradar/nuxt-swa/pull/110), [#153](https://github.com/ddradar/nuxt-swa/pull/153), [#162](https://github.com/ddradar/nuxt-swa/pull/162)|
|NPM(dev)|@vitest/coverage-v8|1.3.1|2.0.5|[#82](https://github.com/ddradar/nuxt-swa/pull/82), [#109](https://github.com/ddradar/nuxt-swa/pull/109), [#128](https://github.com/ddradar/nuxt-swa/pull/128), [#136](https://github.com/ddradar/nuxt-swa/pull/136), [#149](https://github.com/ddradar/nuxt-swa/pull/149)|
|NPM(dev)|@vue/test-utils|2.4.4|2.4.6|[#86](https://github.com/ddradar/nuxt-swa/pull/86), [#128](https://github.com/ddradar/nuxt-swa/pull/128)|
|NPM(dev)|eslint-plugin-simple-import-sort|12.0.0|12.1.1|[#128](https://github.com/ddradar/nuxt-swa/pull/128), [#137](https://github.com/ddradar/nuxt-swa/pull/137)|
|NPM(dev)|happy-dom|13.6.2|14.12.3|[#93](https://github.com/ddradar/nuxt-swa/pull/93), [#103](https://github.com/ddradar/nuxt-swa/pull/103), [#128](https://github.com/ddradar/nuxt-swa/pull/128), [#142](https://github.com/ddradar/nuxt-swa/pull/142)|
|NPM(dev)|husky|9.0.11|9.1.5|[#137](https://github.com/ddradar/nuxt-swa/pull/137), [#160](https://github.com/ddradar/nuxt-swa/pull/160)|
|NPM(dev)|husky|9.1.3|9.1.4|[#150](https://github.com/ddradar/nuxt-swa/pull/150)|
|NPM(dev)|lint-staged|15.2.2|15.2.9|[#137](https://github.com/ddradar/nuxt-swa/pull/137), [#160](https://github.com/ddradar/nuxt-swa/pull/160)|
|NPM(dev)|nuxt-applicationinsights|0.3.2|0.6.0|[#84](https://github.com/ddradar/nuxt-swa/pull/84), [#113](https://github.com/ddradar/nuxt-swa/pull/113), [#140](https://github.com/ddradar/nuxt-swa/pull/140)|
|NPM(dev)|prettier|3.2.5|3.3.3|[#137](https://github.com/ddradar/nuxt-swa/pull/137)|
|NPM(dev)|vitest|1.3.1|2.0.5|[#82](https://github.com/ddradar/nuxt-swa/pull/82), [#109](https://github.com/ddradar/nuxt-swa/pull/109), [#128](https://github.com/ddradar/nuxt-swa/pull/128), [#136](https://github.com/ddradar/nuxt-swa/pull/136), [#149](https://github.com/ddradar/nuxt-swa/pull/149)|
|NPM(dev)|vue-tsc|1.8.27|2.0.29|[#88](https://github.com/ddradar/nuxt-swa/pull/88), [#105](https://github.com/ddradar/nuxt-swa/pull/105), [#112](https://github.com/ddradar/nuxt-swa/pull/112), [#145](https://github.com/ddradar/nuxt-swa/pull/145)|
|NPM(docs)|@iconify-json/heroicons|1.1.20|1.1.24|[#114](https://github.com/ddradar/nuxt-swa/pull/114), [#143](https://github.com/ddradar/nuxt-swa/pull/143), [#164](https://github.com/ddradar/nuxt-swa/pull/164)|
|NPM(docs)|@iconify-json/simple-icons|1.1.93|1.1.115|[#91](https://github.com/ddradar/nuxt-swa/pull/91), [#104](https://github.com/ddradar/nuxt-swa/pull/104), [#116](https://github.com/ddradar/nuxt-swa/pull/116), [#146](https://github.com/ddradar/nuxt-swa/pull/146), [#152](https://github.com/ddradar/nuxt-swa/pull/152), [#163](https://github.com/ddradar/nuxt-swa/pull/163), [#166](https://github.com/ddradar/nuxt-swa/pull/166)|
|NPM(docs)|@nuxt/content|2.12.0|2.13.2|[#83](https://github.com/ddradar/nuxt-swa/pull/83), [#138](https://github.com/ddradar/nuxt-swa/pull/138)|
|NPM(docs)|@nuxt/ui-pro|1.0.1|1.4.1|[#83](https://github.com/ddradar/nuxt-swa/pull/83), [#129](https://github.com/ddradar/nuxt-swa/pull/129), [#138](https://github.com/ddradar/nuxt-swa/pull/138), [#151](https://github.com/ddradar/nuxt-swa/pull/151), [#161](https://github.com/ddradar/nuxt-swa/pull/161)|
|NPM(docs)|nuxt|3.10.3|3.13.0|[#83](https://github.com/ddradar/nuxt-swa/pull/83), [#128](https://github.com/ddradar/nuxt-swa/pull/128), [#138](https://github.com/ddradar/nuxt-swa/pull/138),[#161](https://github.com/ddradar/nuxt-swa/pull/161)|
|GitHub Actions|actions/checkout|4.1.1|4.1.7|[#100](https://github.com/ddradar/nuxt-swa/pull/100), [#119](https://github.com/ddradar/nuxt-swa/pull/119), [#131](https://github.com/ddradar/nuxt-swa/pull/131), [#134](https://github.com/ddradar/nuxt-swa/pull/134)|
|GitHub Actions|actions/download-artifact|4.1.3|4.1.8|[#99](https://github.com/ddradar/nuxt-swa/pull/99), [#117](https://github.com/ddradar/nuxt-swa/pull/117), [#155](https://github.com/ddradar/nuxt-swa/pull/155)|
|GitHub Actions|actions/setup-node|4.0.2|4.0.3|[#156](https://github.com/ddradar/nuxt-swa/pull/156)|
|GitHub Actions|actions/upload-artifact|4.3.1|4.3.6|[#120](https://github.com/ddradar/nuxt-swa/pull/120), [#154](https://github.com/ddradar/nuxt-swa/pull/154), [#159](https://github.com/ddradar/nuxt-swa/pull/159)|
|GitHub Actions|codecov/codecov-action|4.1.0|4.5.0|[#98](https://github.com/ddradar/nuxt-swa/pull/98), [#118](https://github.com/ddradar/nuxt-swa/pull/118), [#133](https://github.com/ddradar/nuxt-swa/pull/133), [#135](https://github.com/ddradar/nuxt-swa/pull/135)|
|GitHub Actions|pnpm/action-setup|3.0.0|4.0.0|[#132](https://github.com/ddradar/nuxt-swa/pull/132)|

### ❤️ Contributors

- Nogic ([@nogic1008](http://github.com/nogic1008))

## v0.5.0

[compare changes](https://github.com/ddradar/nuxt-swa/compare/v0.4.0...v0.5.0)

### ⚠️ Breaking Changes

- `hasRole` returns `ComputedRef<boolean>` instead of `boolean` ([#80](https://github.com/ddradar/nuxt-swa/pull/80))

### 🩹 Fixes

- ⚠️  `hasRole` returns `ComputedRef<boolean>` instead of `boolean` ([#80](https://github.com/ddradar/nuxt-swa/pull/80))
- Read cookie if auth header is undefined ([#79](https://github.com/ddradar/nuxt-swa/pull/79))

### 🤖 CI

#### Dependencies Update

|kind|package|old|new|PRs|
|----|-------|--:|--:|---|
|NPM(dev)|@types/node|18.19.18|18.19.22|[#81](https://github.com/ddradar/nuxt-swa/pull/81)|
|GitHub Actions|actions/download-artifact|4.1.2|4.1.3|[#77](https://github.com/ddradar/nuxt-swa/pull/77)|
|GitHub Actions|codecov/codecov-action|4.0.2|4.1.0|[#78](https://github.com/ddradar/nuxt-swa/pull/78)|

### ❤️ Contributors

- Nogic ([@nogic1008](http://github.com/nogic1008))

## v0.4.0

Highlights:
- Warn log if `nitro.preset` is not "azure"

[compare changes](https://github.com/ddradar/nuxt-swa/compare/v0.3.2...v0.4.0)

### 🚀 Enhancements

- Warn if `nitro.preset` is not "azure" ([#71](https://github.com/ddradar/nuxt-swa/pull/71), resolved [#63](https://github.com/ddradar/nuxt-swa/issues/63))

### 🩹 Fixes

- Provide middleware & server type on build package ([#70](https://github.com/ddradar/nuxt-swa/pull/70))

### 🤖 CI

#### Dependencies Update

|kind|package|old|new|PRs|
|----|-------|--:|--:|---|
|NPM|@iconify-json/heroicons|1.1.19|1.1.20|#75|
|NPM|@iconify-json/simple-icons|1.1.92|1.1.93|#75|
|NPM(dev)|@nuxthq/studio|1.0.11|1.0.12|#75|
|NPM(dev)|nuxt-applicationinsights|0.3.1|0.3.2|#75|
|NPM(dev)|happy-dom|13.6.0|13.6.2|#75|

### ❤️ Contributors

- Nogic

## v0.3.2

- No enhancements on packages

[compare changes](https://github.com/ddradar/nuxt-swa/compare/v0.3.1...v0.3.2)

### 🩹 Fixes

- ship type definition on build package ([#69](https://github.com/ddradar/nuxt-swa/pull/69), resolve [#67](https://github.com/ddradar/nuxt-swa/issues/67))

### 🏡 Chore

- **lint:** Add eslint-plugin-simple-import ([#68](https://github.com/ddradar/nuxt-swa/pull/68))

### ❤️ Contributors

- Nogic

## v0.3.1

- No enhancements on packages

[compare changes](https://github.com/ddradar/nuxt-swa/compare/v0.3.0...v0.3.1)

### 🩹 Fixes

- **ci:** Avoid run prepare on publish ([#66](https://github.com/ddradar/nuxt-swa/pull/66))

### ❤️ Contributors

- Nogic

## v0.3.0

Highlights:
- Data API helper

[compare changes](https://github.com/ddradar/nuxt-swa/compare/v0.2.0...v0.3.0)

### 🚀 Enhancements

- Add server proxy for `/data-api` & `/.auth` ([#49](https://github.com/ddradar/nuxt-swa/pull/49))
- Add Data API helper ([#50](https://github.com/ddradar/nuxt-swa/pull/50), [#52](https://github.com/ddradar/nuxt-swa/pull/52),[#53](https://github.com/ddradar/nuxt-swa/pull/53))

### 💅 Refactors

- **docs:** Use composable functions ([#51](https://github.com/ddradar/nuxt-swa/pull/51))

### 🤖 CI

#### Dependencies Update (powered by Dependabot🤖)

|kind|package|old|new|PRs|
|----|-------|--:|--:|---|
|NPM|@iconify-json/simple-icons|1.1.91|1.1.92|[#61](https://github.com/ddradar/nuxt-swa/pull/61)|
|NPM|@nuxt/kit|3.10.2|3.10.3|[#57](https://github.com/ddradar/nuxt-swa/pull/57)|
|NPM|@nuxt/ui-pro|0.7.5|1.0.1|[#57](https://github.com/ddradar/nuxt-swa/pull/57)|
|NPM|nuxt|3.10.2|3.10.3|[#57](https://github.com/ddradar/nuxt-swa/pull/57)|
|GitHub Actions|codecov/codecov-action|4.0.1|4.0.2|[#54](https://github.com/ddradar/nuxt-swa/pull/54)|
|NPM(dev)|@nuxt/schema|3.10.2|3.10.3|[#57](https://github.com/ddradar/nuxt-swa/pull/57)|
|NPM(dev)|@types/node|18.19.17|18.19.18|[#60](https://github.com/ddradar/nuxt-swa/pull/60)|
|NPM(dev)|@vitest/coverage-v8|1.3.0|1.3.1|[#55](https://github.com/ddradar/nuxt-swa/pull/55)|
|NPM(dev)|eslint|8.56.0|8.57.0|[#56](https://github.com/ddradar/nuxt-swa/pull/56)|
|NPM(dev)|happy-dom|13.3.8|13.6.0|[#59](https://github.com/ddradar/nuxt-swa/pull/59)|
|NPM(dev)|nuxt-applicationinsights|0.2.1|0.3.1|[#58](https://github.com/ddradar/nuxt-swa/pull/58)|
|NPM(dev)|vitest|1.3.0|1.3.1|[#55](https://github.com/ddradar/nuxt-swa/pull/55)|

### ❤️ Contributors

- Nogic

## v0.2.0

Highlights:
- Route middleware
- Server Utils

[compare changes](https://github.com/ddradar/nuxt-swa/compare/v0.1.0...v0.2.0)

### 🚀 Enhancements

- Add global route middleware ([#42](https://github.com/ddradar/nuxt-swa/pull/42))
- Add server utils ([#45](https://github.com/ddradar/nuxt-swa/pull/45))

### 🩹 Fixes

- **docs:** Resolve 500 error on staging site ([#44](https://github.com/ddradar/nuxt-swa/pull/44))
- Move runtime use files to resolve import error ([#46](https://github.com/ddradar/nuxt-swa/pull/46))

### 🏡 Chore

- **docs:** Migrate to nuxt-applicationinsights ([#41](https://github.com/ddradar/nuxt-swa/pull/41))
- v0.2.0 ([#47](https://github.com/ddradar/nuxt-swa/pull/47))

### ❤️ Contributors

- Nogic

## v0.1.0

[compare changes](https://github.com/ddradar/nuxt-swa/compare/v0.0.2...v0.1.0)

### 🚀 Enhancements

- Provide types for `nitro.azure.config` ([#30](https://github.com/ddradar/nuxt-swa/pull/30))
- Auto detect `IdentityProvider` from `nitro.azure.config` ([#31](https://github.com/ddradar/nuxt-swa/pull/31))
- Warn if `nitro.azure.config` is undefined ([#32](https://github.com/ddradar/nuxt-swa/pull/32))

### 🏡 Chore

- **dev:** Setup Devcontainer ([#33](https://github.com/ddradar/nuxt-swa/pull/33))
- v0.1.0 ([#39](https://github.com/ddradar/nuxt-swa/pull/39))

### 🤖 CI

- **dependabot:** Add nuxt group ([#36](https://github.com/ddradar/nuxt-swa/pull/36))

#### Dependencies Update (powered by Dependabot🤖)

|kind|package|old|new|PRs|
|----|-------|--:|--:|---|
|NPM|@nuxt/kit|3.10.1|3.10.2|[#37](https://github.com/ddradar/nuxt-swa/pull/37)|
|NPM|nuxt|3.10.1|3.10.2|[#37](https://github.com/ddradar/nuxt-swa/pull/37)|
|NPM(dev)|@nuxt/schema|3.10.1|3.10.2|[#37](https://github.com/ddradar/nuxt-swa/pull/37)|
|NPM(dev)|@types/node|18.19.15|18.19.17| [#35](https://github.com/ddradar/nuxt-swa/pull/35)|
|NPM(dev)|@vitest/coverage-v8|1.2.2|1.3.0|[#35](https://github.com/ddradar/nuxt-swa/pull/34)|
|NPM(dev)|vitest|1.2.2|1.3.0|[#34](https://github.com/ddradar/nuxt-swa/pull/34)|

### ❤️ Contributors

- Nogic

## v0.0.2

[compare changes](https://github.com/ddradar/nuxt-swa/compare/v0.0.1...v0.0.2)

### 🚀 Enhancements

- No enhancements on core packages

### 📖 Documentation

- Wrote README ([#22](https://github.com/ddradar/nuxt-swa/pull/22))
- Create module docs & playground Web site ([#23](https://github.com/ddradar/nuxt-swa/pull/23))

### 🏡 Chore

- Setup azure-swa-cli ([#21](https://github.com/ddradar/nuxt-swa/pull/21))
- v0.0.2 ([#27](https://github.com/ddradar/nuxt-swa/pull/27))

### 🤖 CI

- **dependabot:** Enable dependabot ([#12](https://github.com/ddradar/nuxt-swa/pull/12))
- **gh-action:** Add npm publish workflow ([#24](https://github.com/ddradar/nuxt-swa/pull/24), [#25](https://github.com/ddradar/nuxt-swa/pull/25), [#26](https://github.com/ddradar/nuxt-swa/pull/26), [#28](https://github.com/ddradar/nuxt-swa/pull/28))

#### Dependencies Update (powered by Dependabot🤖)

|kind|package|old|new|PRs|
|----|-------|--:|--:|---|
|GitHub Actions|actions/download-artifact|4.1.1|4.1.2|[#14](https://github.com/ddradar/nuxt-swa/pull/14)|
|GitHub Actions|actions/setup-node|4.0.1|4.0.2|[#15](https://github.com/ddradar/nuxt-swa/pull/15)|
|GitHub Actions|actions/upload-artifact|4.3.0|4.3.1|[#16](https://github.com/ddradar/nuxt-swa/pull/16)|
|GitHub Actions|pnpm/action-setup|2.4.0|3.0.0|[#13](https://github.com/ddradar/nuxt-swa/pull/13)|

### ❤️ Contributors

- Nogic

## v0.0.1

First Release

### ❤️ Contributors

- Nogic
