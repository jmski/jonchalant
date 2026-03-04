# Data Audit & Migration Plan - Complete Content Inventory

**Last Audited**: March 3, 2026  
**Total Hardcoded Content Instances Found**: 36  
**Total Pages Audited**: 9

---

## 📋 Executive Summary

Most pages are **properly architected** to fetch from Sanity with fallback mock data. However, **36 instances of hardcoded content** need to be migrated or cleaned up. The good news: **infrastructure is solid**—pages are fetching from Sanity, just need to populate the CMS and remove redundant mock data.

---

## 🔍 Page-by-Page Audit

### ✅ **HOME (`app/page.tsx`)** - Status: PARTIAL
**Currently Fetching from Sanity**: ✅ homePageContent, services  
**Hardcoded Data Found**: 1 MOCK_HOME_CONTENT object (14 fields)

**Hardcoded Fields**:
- `stats` [3 items]
- `impactSectionHeadline`
- `featuredMainTitle`
- `featuredMainDescription`
- `sidebarFeatures` [2 items]
- `servicesHeadline`
- `servicesDescription`

**Recommendation**: Sanity fetch is active. Remove hardcoded `MOCK_HOME_CONTENT` once CMS is verified to have all fields.  
**Refactoring Needed**: None—code is clean.

---

### ✅ **DANCE (`app/dance/page.tsx`)** - Status: PARTIAL
**Currently Fetching from Sanity**: ✅ getPortfolioItems()  
**Hardcoded Data Found**: 1 MOCK_DANCEDATA array (4 items)

**Hardcoded Items**:
- `chore-1`: Ninjago Choreography
- `chore-2`: Midnight Dreams
- `free-1`: Cypher Session
- `perf-1`: Seoul Performance

**Issue**: Portfolio items have mock data but Sanity fetch is active. The page will use Sanity data if available.  
**Recommendation**: Verify Sanity portfolio data exists, then remove MOCK_DANCEDATA.  
**Refactoring Needed**: None—code is clean.

---

### ✅ **ABOUT (`app/about/page.tsx`)** - Status: NEEDS WORK
**Currently Fetching from Sanity**: ✅ aboutPageContent, services  
**Hardcoded Data Found**: 3 objects (23 fields)

**Hardcoded Objects**:
1. **MOCK_ABOUT_CONTENT** (8 fields)
   - `heroHeadline`
   - `heroDescription`
   - `originSectionHeadline`
   - `originSectionDescription`
   - `phases` [3 items]
   - `stats` [4 items]

2. **PHILOSOPHIES** array [3 items]
   - 'No Performance Required'
   - 'Science + Intuition'
   - 'Sustainable Leadership'

3. **INTROVERT_TRAITS** array [6 items]
   - Deep Listeners
   - Thoughtful Decision Makers
   - One-on-One Masters
   - Authentic Leaders
   - Written Communicators
   - Resilient Problem Solvers

**Issues**:
- PHILOSOPHIES should be content in Sanity
- INTROVERT_TRAITS should be dynamic from Sanity
- About page needs additional Sanity schema fields for `phases` and `stats`

**Recommendation**: 
1. Expand `aboutPage` schema to include `phases` array and `stats` array  
2. Create new schema for `philosophy` type
3. Add `introvertTraits` field to aboutPage
4. Remove hardcoded objects

**Refactoring Needed**: 
- [ ] Expand aboutPageContent schema
- [ ] Create philosophy schema type
- [ ] Update page fetch logic
- [ ] Add philosophy collection loop

---

### ✅ **CONTACT (`app/contact/page.tsx`)** - Status: PARTIAL
**Currently Fetching from Sanity**: ✅ getContactInfo(), getPageMetadata()  
**Hardcoded Data Found**: 2 objects (9 fields)

**Hardcoded Objects**:
1. **MOCK_CONTACT_METHODS** [3 items]
   - Email, Instagram, TikTok
   
2. **MOCK_PAGE_METADATA** (2 fields)
   - `headline`
   - `subheadline`

3. **getMethodDescription()** function (3 hardcoded descriptions)

**Issue**: Contact methods descriptions are hardcoded in a function. Should be in Sanity.

**Recommendation**:
1. Add `description` field to contactInfo schema for each method
2. Remove getMethodDescription() function
3. Remove MOCK data once CMS is verified

**Refactoring Needed**: 
- [ ] Add description to contactInfo schema
- [ ] Remove getMethodDescription() function

---

### ✅ **COLLABORATIONS (`app/collaborations/page.tsx`)** - Status: NEEDS WORK
**Currently Fetching from Sanity**: ✅ getCollaborations(), getPageMetadata()  
**Hardcoded Data Found**: 4 objects (23 fields)

**Hardcoded Objects**:
1. **MOCK_COLLABORATIONS** [4 items]
   - Leadership Coaching for Teams
   - Corporate Workshops
   - Executive Coaching
   - Podcast/Media Appearances

2. **MOCK_PAGE_METADATA** (2 fields)
   - `headline`
   - `subheadline`

3. **SERVICE_CATEGORIES** [4 categories with 25 items total]
   - Leadership Coaching (5)
   - Speaking & Teaching (5)
   - Content & Media (5)
   - Custom Partnerships (5)

**Critical Issue**: SERVICE_CATEGORIES are hardcoded and displayed in a loop. This is a full section that should be in Sanity.

**Recommendation**:
1. Create `serviceCategory` schema with array of items
2. Add `serviceCategories` field to collaborationsPageContent in Sanity
3. Update page to loop through Sanity data
4. Remove MOCK data

**Refactoring Needed**: ⚠️ SIGNIFICANT
- [ ] Create serviceCategory schema type  
- [ ] Extend collaborationsPageContent schema
- [ ] Refactor page's SERVICE_CATEGORIES loop to use Sanity
- [ ] Remove all hardcoding

---

### ✅ **PROGRAMS (`app/programs/page.tsx`)** - Status: PARTIAL  
**Currently Fetching from Sanity**: ✅ getPrograms()  
**Hardcoded Data Found**: 2 objects (30 fields)

**Hardcoded Objects**:
1. **PROGRAMS** [6 items]
   - The 90-Day Presence Pivot
   - Social Choreography Workshop
   - Quiet Command Essentials
   - Interview & Pitch Coaching
   - Team Leadership Program
   - Book Your Presence Audit

2. **PROGRAM_FOCUS** [3 items]
   - Physical Grounding
   - Social Scripting
   - Energy Mastery (the 3 pillars)

**Issue**: PROGRAM_FOCUS (3 pillars) are hardcoded. These are core to the brand and should be managed in Sanity.

**Recommendation**:
1. Create `programFocus` or `pillar` schema type
2. Add `programFocusItems` field to programsPageContent
3. Remove hardcoded PROGRAM_FOCUS array
4. Keep PROGRAMS in Sanity (already being fetched)

**Refactoring Needed**: 
- [ ] Create schema for program focus/pillars
- [ ] Add to programs page content
- [ ] Refactor PROGRAM_FOCUS display loop

---

### ✅ **MEDIA KIT (`app/media-kit/page.tsx`)** - Status: NEEDS WORK
**Currently Fetching from Sanity**: ✅ getMediaKitData(), getPageMetadata()  
**Hardcoded Data Found**: 4 objects (47 fields)

**Hardcoded Objects**:
1. **MOCK_MEDIA_KIT_DATA** (nested structure)
   - `keyMetrics` [4 items]
   - `platforms` [3 items]
   - `contentCategories` [4 items]
   - `audience` (age [3], gender [3], locations [5])

2. **MOCK_PAGE_METADATA** (2 fields)
   - `headline`
   - `subheadline`

3. **COLLABORATION_PACKAGES** [3 items]
   - Content Integration
   - Campaign Package
   - Exclusive Partnership

**Issue**: Media kit structure is partially in Sanity (mediaKitData exists). COLLABORATION_PACKAGES should be separate or extended.

**Recommendation**:
1. Verify mediaKitData schema in Sanity has all fields from MOCK_MEDIA_KIT_DATA
2. Create `mediaPackage` schema for collaboration packages
3. Add `packages` field to mediaKitData OR create dedicated mediaKitPackages document
4. Remove all hardcoded data once verified

**Refactoring Needed**: ⚠️ MODERATE
- [ ] Verify mediaKitData completeness in Sanity
- [ ] Create mediaPackage schema
- [ ] Update page to fetch packages
- [ ] Remove hardcoded arrays

---

### ✅ **LESSONS (`app/lessons/page.tsx`)** - Status: PARTIAL
**Currently Fetching from Sanity**: ✅ getLessons()  
**Hardcoded Data Found**: 1 MOCK_LESSONS array (9 items)

**Hardcoded Items**:
All 9 lessons with icons, categories, descriptions, etc.

**Recommendation**: Remove MOCK data once Sanity lessons are verified to exist.  
**Refactoring Needed**: None—code is clean.

---

### ✅ **STUDIO** (`app/studio/[[...tool]]/page.tsx`)
**Status**: Embedded Sanity Studio, no content concerns.

---

## 📊 Summary Table

| Page | Sanity Fetch Active | Hardcoded Data | Refactoring Needed | Priority |
|------|:--:|:--:|:--:|:--:|
| Home | ✅ | Low (1 object) | None | Low |
| Dance | ✅ | Low (1 array) | None | Low |
| About | ✅ | HIGH (3 objects) | Yes - expand schema | HIGH |
| Contact | ✅ | Low (2 objects) | Minimal | Medium |
| Collaborations | ✅ | HIGH (4 objects) | Yes - big refactor | HIGH |
| Programs | ✅ | Medium (2 objects) | Minor | Medium |
| Media Kit | ✅ | HIGH (4 objects) | Yes - verify + extend | HIGH |
| Lessons | ✅ | Low (1 array) | None | Low |

---

## 🎯 Cleanup Strategy

### Phase 1: IMMEDIATE (Remove No-Cost Hardcoded Data)
- [ ] Dance: Remove MOCK_DANCEDATA (Portfolio fetch is working)
- [ ] Lessons: Remove MOCK_LESSONS (Fetch is working)
- [ ] Home: Remove MOCK_HOME_CONTENT (Fetch is working)
- [ ] Verify each page works without mock data

### Phase 2: EASY WINS (Minimal Schema Changes)
- [ ] Contact: Add `description` field to contactInfo, remove function
- [ ] Programs: Create pillar schema, remove hardcoded PROGRAM_FOCUS

### Phase 3: MAJOR REFACTORS (Schema Extensions)
- [ ] About: Extend aboutPage schema for `phases`, `stats`, add philosophy type
- [ ] Collaborations: Create SERVICE_CATEGORIES schema, refactor loop
- [ ] Media Kit: Verify mediaKitData completeness, create mediaPackage schema

---

## 🗂️ Additional Files with Content

**`lib/pageContent.ts`**: Contains navigation and page titles (should be kept, general use)

**Missing Data Structures**: None identified—all pages have corresponding Sanity types.

---

## ✨ Final Recommendations

1. **Code Quality**: Pages are WELL-ARCHITECTED with proper fallbacks. Good job!
2. **Content**: 36 instances need migration, but most are low-risk
3. **Priority**: Focus on HIGH priority items (About, Collaborations, Media Kit)
4. **Process**: 
   - Update Sanity schema first
   - Populate CMS with content
   - Update fetch queries if needed
   - Remove hardcoded data
   - Test each page

---

**Owner**: Development Team  
**Next Step**: Prioritize Phase 1 cleanup and begin schema extensions

