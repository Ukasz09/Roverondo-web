import { AsideDrawer, LoginPage, WallAllActivities } from "../pages";
import { Constants } from "../constants";

fixture(`Wall Page`)
  .page(Constants.hostname)
  .beforeEach(async t => {
    await t.maximizeWindow();
    await t.expect(LoginPage.loginBtn.exists).ok();
    await t.click(LoginPage.loginBtn);
    await t.typeText(LoginPage.oauthUsernameInput, Constants.testUserLogin);
    await t.typeText(LoginPage.oauthPasswordInput, Constants.testUserPass);
    await t.click(LoginPage.oauthLoginBtn);
  });

test("Click reaction btn", async (t) => {
  await t.expect(AsideDrawer.allActivitiesBtn.exists).ok();
  await t.click(AsideDrawer.allActivitiesBtn);
  let cardsExist = await WallAllActivities.activityCards.exists;
  // Retry
  if (!cardsExist) {
    await t.click(AsideDrawer.allActivitiesBtn);
  }
  await t.expect(WallAllActivities.activityCards.exists).ok();
  const fstCard = WallAllActivities.activityCards.nth(0);
  await t.expect(fstCard.exists).ok();
  await t.click(WallAllActivities.getAddReactionBtn(fstCard));
  await t.expect(WallAllActivities.alreadyReactedToPost(fstCard)).ok();
}).after(async t => {
  const fstCard = WallAllActivities.activityCards.nth(0);
  await t.expect(fstCard.exists).ok();
  await t.click(WallAllActivities.getAddReactionBtn(fstCard));
  await t.expect(WallAllActivities.alreadyReactedToPost(fstCard)).notOk();
});

test("Click activity details", async (t) => {
  await t.expect(AsideDrawer.allActivitiesBtn.exists).ok();
  await t.click(AsideDrawer.allActivitiesBtn);

  let cardsExist = await WallAllActivities.activityCards.exists;
  // Retry
  if (!cardsExist) {
    await t.click(AsideDrawer.allActivitiesBtn);
  }

  await t.expect(WallAllActivities.activityCards.exists).ok();
  const fstCard = WallAllActivities.activityCards.nth(0);
  await t.expect(fstCard.exists).ok();
  await t.click(WallAllActivities.getActivityTitle(fstCard));
  await t.expect(WallAllActivities.descriptionContainer.exists).ok();
  await t.scroll(WallAllActivities.scrollContainer, "bottom");
  await t.expect(WallAllActivities.graphPlot.exists).ok();
});

test("Click planned activity details", async (t) => {
  await t.expect(AsideDrawer.plannedActivitiesBtn.exists).ok();
  await t.click(AsideDrawer.plannedActivitiesBtn);

  let cardsExist = await WallAllActivities.activityCards.exists;
  // Retry
  if (!cardsExist) {
    await t.click(AsideDrawer.allActivitiesBtn);
  }
  await t.expect(WallAllActivities.activityCards.exists).ok();

  const fstCard = WallAllActivities.activityCards.nth(0);
  await t.expect(fstCard.exists).ok();
  await t.click(WallAllActivities.getActivityTitle(fstCard));
  await t.expect(WallAllActivities.descriptionContainer.exists).ok();
  await t.scroll(WallAllActivities.scrollContainer, "bottom");
  await t.expect(WallAllActivities.graphPlot.exists).ok();
});
