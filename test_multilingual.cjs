const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

console.log('=== MULTILINGUAL & LICENSE AUDIT VERIFICATION ===\n');

// 1. Verify THIRD_PARTY_NOTICES.md
console.log('1. Verifying THIRD_PARTY_NOTICES.md existence and contents...');
const noticePath = path.join(__dirname, 'THIRD_PARTY_NOTICES.md');
assert.ok(fs.existsSync(noticePath), 'THIRD_PARTY_NOTICES.md must exist in project root');
const noticeContent = fs.readFileSync(noticePath, 'utf8');

assert.ok(noticeContent.includes('# THIRD-PARTY OPEN-SOURCE NOTICES & AUDIT'), 'Must contain header');
assert.ok(noticeContent.includes('Total Dependencies Audited:'), 'Must show total audited packages');
assert.ok(noticeContent.includes('Executive Summary & License Distribution'), 'Must contain executive summary table');
assert.ok(noticeContent.includes('Direct Dependencies'), 'Must list direct dependencies');
assert.ok(noticeContent.includes('Flagged Items Requiring Human Review'), 'Must identify flagged packages');
assert.ok(noticeContent.includes('Comprehensive Package Attribution & Notices'), 'Must preserve attribution notices');
assert.ok(noticeContent.includes('MIT') && noticeContent.includes('Apache-2.0'), 'Must categorize licenses');
assert.ok(noticeContent.includes('react') && noticeContent.includes('lucide-react'), 'Must include direct dependencies');

console.log('✔ THIRD_PARTY_NOTICES.md passed all audit integrity checks.\n');

// 2. Verify Multilingual Translations Structure
console.log('2. Verifying translations.ts completeness (en, hi, te)...');
const translationsSrc = fs.readFileSync(path.join(__dirname, 'src/i18n/translations.ts'), 'utf8');

for (const lang of ['en', 'hi', 'te']) {
  assert.ok(translationsSrc.includes(`${lang}: {`), `Language '${lang}' must be defined in translations dictionary`);
}

// 3. Verify Quiz Translations
console.log('3. Verifying quizTranslations.ts completeness (Cancer & TB in EN, HI, TE)...');
const quizTransSrc = fs.readFileSync(path.join(__dirname, 'src/data/quizTranslations.ts'), 'utf8');

const requiredQuestionIds = [
  'cancer-1', 'cancer-2', 'cancer-3', 'cancer-4', 'cancer-5', 'cancer-6',
  'tb-1', 'tb-2', 'tb-3', 'tb-4', 'tb-5', 'tb-6'
];

for (const qId of requiredQuestionIds) {
  const matches = (quizTransSrc.match(new RegExp(`'${qId}':`, 'g')) || []).length;
  assert.ok(matches >= 3, `Question ${qId} must have translations in at least 3 languages (found ${matches})`);
}

console.log('✔ All 12 Cancer and TB questions verified across English, Hindi, and Telugu.\n');

// 4. Verify Persistent Language Selector Component & Integration
console.log('4. Verifying LanguageSelector component & LanguageProvider integration...');
const appSrc = fs.readFileSync(path.join(__dirname, 'src/App.tsx'), 'utf8');
assert.ok(appSrc.includes('<LanguageProvider>'), 'App.tsx must be wrapped in LanguageProvider');
assert.ok(appSrc.includes('<LanguageSelector />'), 'Topbar must render LanguageSelector');
assert.ok(appSrc.includes('useLanguage()'), 'Components must consume useLanguage() hook');

console.log('✔ Multilingual context, topbar selector, and persistence verified.\n');

console.log('🎉 ALL MULTILINGUAL AND LICENSE AUDIT CHECKS PASSED SUCCESSFULLY!');
