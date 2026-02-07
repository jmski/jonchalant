# Phase 3A Testing Guide

**Date**: February 7, 2026  
**Focus**: Verify 4-step collaboration form works end-to-end  
**Expected Duration**: 15-20 minutes

---

## Pre-Test Checklist

- [ ] Open terminal in project root
- [ ] Run `npm run build` to verify no errors
- [ ] Run `npm run dev` to start development server
- [ ] Open http://localhost:3000 in browser
- [ ] Open Chrome DevTools (F12) → Console tab

---

## Step-by-Step Testing

### 1. Navigate to Collaborations Form (2 min)

**Actions**:
1. Go to http://localhost:3000/collaborations
2. Scroll down to the "Let's Work Together" form section
3. **Check**: Form is visible with header "Let's talk about your project"
4. **Check**: FormProgress shows "Step 1 of 4"

**Expected Result**: 
- ✅ Form loads without errors
- ✅ No red console errors
- ✅ Step indicator shows correct progress

---

### 2. Test Step 1: Project Details (3 min)

**Actions**:
1. Fill out Step 1 fields:
   - **Collaboration Type**: Select any option (e.g., "🎬 Music Video Direction")
   - **Project Name**: Enter "Test Dance Video"
   - **Project Description**: Enter "This is a test project with enough characters to pass validation"

2. **Test Validation** - Try clicking "Next →" with incomplete fields:
   - Clear Project Name
   - Click "Next →"
   - **Check**: Button should do nothing (validation prevents it)
   - **Check**: Error message appears under Project Name field

3. Fill name again: "Test Dance Video"
4. **Test Validation** - Try with short description:
   - Clear description
   - Enter "Too short"
   - Click "Next →"
   - **Check**: Error message "Must be at least 20 characters"

5. Fill complete description again
6. Click "Next →"

**Expected Result**:
- ✅ Validation prevents forward without required fields
- ✅ Error messages display correctly
- ✅ Progress bar updates to 50%
- ✅ Step 2 fields appear with animation

---

### 3. Test Step 2: Budget & Timeline (2 min)

**Actions**:
1. Fill out Step 2 fields:
   - **Budget Range**: Select "$5,000 - $10,000"
   - **Timeline**: Select "1-2 months"

2. **Test Validation** - Try clicking Next with empty fields:
   - Click on Budget dropdown, select nothing
   - Click "Next →"
   - **Check**: Error appears

3. Fill Budget again
4. Click "Next →"

**Expected Result**:
- ✅ Form data from Step 1 is remembered
- ✅ Progress bar at 75%
- ✅ Step 3 renders smoothly

---

### 4. Test Step 3: Contact Info (2 min)

**Actions**:
1. Fill out Step 3 fields:
   - **Name**: "Jon Chalon"
   - **Email**: "jon@test.com"
   - **Company**: "Test Brand" (optional)

2. **Test Validation** - Try invalid email:
   - Change Email to "notanemail"
   - Click "Next →"
   - **Check**: Error appears "Invalid email"

3. Enter valid email: "jon@test.com"
4. Click "Next →"

**Expected Result**:
- ✅ Form data from Steps 1-2 is remembered
- ✅ Progress bar at 100%
- ✅ Step 4 Review screen appears

---

### 5. Test Step 4: Review Screen (3 min)

**Actions**:
1. **Verify Review Display**:
   - ✅ Check "Collaboration Type" shows: "🎬 Music Video Direction"
   - ✅ Check "Project Name" shows: "Test Dance Video"
   - ✅ Check "Project Description" shows: Your full description
   - ✅ Check "Budget Range" shows: "$5,000 - $10,000"
   - ✅ Check "Timeline" shows: "1-2 months"
   - ✅ Check "Name" shows: "Jon Chalon"
   - ✅ Check "Email" shows: "jon@test.com"
   - ✅ Check "Company" shows: "Test Brand"

2. **Test Previous Navigation**:
   - Click "← Previous" button
   - **Check**: Returns to Step 3 (Contact Info)
   - **Check**: All Step 3 data is still there
   
3. Navigate forward:
   - Click "Next →"
   - **Check**: Returns to Step 4 Review

4. **Test Submit Button**:
   - Verify button text is "✨ Send Inquiry" (not "Next →")
   - **Check**: Button is not disabled

**Expected Result**:
- ✅ All form data displays correctly with proper labels
- ✅ No form data is lost when navigating back
- ✅ Submit button ready to send

---

### 6. Test Form Submission (3 min)

**Actions**:
1. Click "✨ Send Inquiry" button
2. **Check Console** (DevTools → Console):
   - Look for any JavaScript errors
   - Look for successful API call
3. **Check Form States**:
   - While submitting: Button should show "Submitting..." text
   - After success: Success message appears
   - After success: Form might reset or show confirmation

**Expected Result**:
- ✅ Form submits to `/api/inquiries` endpoint
- ✅ Loading state displays during submission
- ✅ Success confirmation message shows
- ✅ No errors in console

**Note**: If API endpoint doesn't exist, you'll see error. That's OK - document it below.

---

### 7. Test Form Reset & Navigation (2 min)

**Actions** (if form submitted successfully):
1. If success message shows, wait 5 seconds
2. **Check**: Form resets to Step 1
3. **Check**: All fields are cleared
4. **Check**: Progress bar is at Step 1

**Alternative** (if testing error handling):
1. Intentionally cause an error:
   - Change email to invalid format again
   - Click Next through all steps
   - Try to submit
2. **Check**: Error message displays
3. **Check**: Form doesn't reset

**Expected Result**:
- ✅ Form successfully resets after submission
- ✅ Can submit another inquiry
- ✅ Error handling works if needed

---

## Console Error Tracking

As you test, note any errors:

| Error | Location | Severity | Action |
|-------|----------|----------|--------|
| *Example: "Cannot read property 'url' of undefined"* | Step 3, Submit | High | Fix before launch |
| | | | |
| | | | |

---

## Accessibility Testing

Quick a11y checks:

- [ ] Tab through form fields - works correctly?
- [ ] Screen reader can read labels
- [ ] Error messages are announced
- [ ] Color contrast on buttons is good
- [ ] Focus indicators are visible

---

## Performance Checks

Monitor during testing:

- **Form Load**: Instant (no spinner)?
- **Step Transitions**: Smooth animation?
- **Validation**: Instant feedback?
- **Submit**: Request makes it to API?

---

## Known Issues to Document

If you find bugs, list them here:

```
Issue #1: [Description]
- Steps to reproduce: [...]
- Expected: [...]
- Actual: [...]
- Severity: [Low/Medium/High]

Issue #2: [Description]
- etc.
```

---

## Test Results Summary

**Date**: ____________  
**Tester**: ____________  
**Overall Result**: ⬜ Pass | ⬜ Fail | ⬜ Partial

### Detailed Results

- **Step 1 Project Details**: ⬜ Works | ⬜ Issues
- **Step 2 Budget & Timeline**: ⬜ Works | ⬜ Issues  
- **Step 3 Contact Info**: ⬜ Works | ⬜ Issues
- **Step 4 Review**: ⬜ Works | ⬜ Issues
- **Form Submission**: ⬜ Works | ⬜ Issues
- **Form Reset**: ⬜ Works | ⬜ Issues

### Issues Found (if any)

```
1. 
2. 
3. 
```

### Notes

```
[Add any observations or suggestions here]
```

---

## Next Actions

### If All Tests Pass ✅
```
1. Update PROJECT_STATUS.md → Mark Phase 3A as "Verified"
2. Proceed to Phase 3B (form polish) or Phase 4 (quick wins)
3. See NEXT_STEPS.md for recommendations
```

### If Tests Fail 🔴
```
1. Document all issues in the "Test Results" section above
2. Fix critical issues (blocking submit)
3. Fix medium issues (validation not working)
4. Re-test after fixes
5. Proceed once all critical items pass
```

### If Partial Success 🟡
```
1. Identify which steps work
2. Document failing steps
3. Fix issues in CollaborationForm.tsx
4. Re-test failing sections
5. Proceed to next phase once main flow works
```

---

## Quick Debug Tips

If something's wrong, check:

1. **DevTools Console** (F12) - Any red errors?
2. **Network Tab** - Is API request going out?
3. **React DevTools** - Is form state updating?
4. **Check Component** - Is CollaborationForm.tsx rendering?

```bash
# Check if form component exists:
grep -n "export default function CollaborationForm" components/forms/CollaborationForm.tsx

# Check if page imports it:
grep -n "CollaborationForm" app/collaborations/page.tsx
```

---

**Start Testing**: Run `npm run dev` and go to http://localhost:3000/collaborations

**Estimated Time**: 15-20 minutes  
**Success Criteria**: Form loads, validates, displays review, and submits without errors
