import { AsideDrawer, LoginPage, WallPage } from "../pages";
import { Constants } from "../constants";
import { t } from "testcafe";

fixture(`Completed activities`)
  .page(Constants.hostname)
  .beforeEach(async t => {
    await t.maximizeWindow();
    await t.click(LoginPage.loginBtn);
    await t.typeText(LoginPage.oauthUsernameInput, Constants.testUserLogin);
    await t.typeText(LoginPage.oauthPasswordInput, Constants.testUserPass);
    await t.click(LoginPage.oauthLoginBtn);
  });

test("Click like btn", async (t) => {
  await tryToNavigate(AsideDrawer.wallBtn, WallPage.activityCards);

  const fstCard = WallPage.activityCards.nth(0);
  await t.expect(fstCard.exists).ok();
  const likesCount = +WallPage.reactionsCountLabel.textContent;

  await clickLikeBtnAndExpectProperBehavior(fstCard, true, likesCount + 1);
  await clickLikeBtnAndExpectProperBehavior(fstCard, false, likesCount);
});

test("Click activity details", async (t) => {
  await tryToNavigate(AsideDrawer.wallBtn, WallPage.activityCards);

  await t.expect(WallPage.activityCards.exists).ok();
  const fstCard = WallPage.activityCards.nth(0);
  await t.expect(fstCard.exists).ok();

  await t.click(WallPage.getActivityTitle(fstCard));

  await detailsStatExist();

  await t.expect(WallPage.descriptionContainer.exists).ok();

  await t.scroll(WallPage.scrollContainer, "bottom");
  await t.expect(WallPage.speedChart.exists).ok();
  await t.expect(WallPage.elevationChart.exists).ok();
});

const tryToNavigate = async (link: Selector, expectedElemAfterNavigation: Selector): Promise<void> => {
  await t.click(link);
  const cardsExist = await expectedElemAfterNavigation.exists;
  if (!cardsExist) {
    await t.click(AsideDrawer.wallBtn);
  }
  await t.expect(expectedElemAfterNavigation.exists).ok();
};

const clickLikeBtnAndExpectProperBehavior = async (card: Selector, expectIsLiked: boolean, expectedLikesCount: number): Promise<void> => {
  const likeBtn = WallPage.getAddReactionBtn(card);
  await t.click(likeBtn);
  const postIsLikedAssertion = t.expect(likeBtn.hasClass("liked"));
  expectIsLiked ? await postIsLikedAssertion.ok() : await postIsLikedAssertion.notOk();
  const newLikesCount = +WallPage.reactionsCountLabel.textContent;
  await t.expect(newLikesCount).eql(expectedLikesCount);
  await t.click(WallPage.reactionsList);
  const userBottomSheetWithCurrentUserAssertion = t.expect(WallPage.getUserBottomSheetBtnList(Constants.testUserId).exists);
  expectIsLiked ? await userBottomSheetWithCurrentUserAssertion.ok() : await userBottomSheetWithCurrentUserAssertion.notOk();
  await t.click(WallPage.overlayWrapper); // Dismiss bottom sheet
};

const detailsStatExist = async () => {
  const statList = [
    WallPage.activityStartTimeStat,
    WallPage.activityEndTimeStat,
    WallPage.maxAltitudeStat,
    WallPage.minAltitudeStat,
    WallPage.avgAltitudeStat,
    WallPage.caloriesStat,
    WallPage.elevationStat,
    WallPage.maxSpeedStat,
    WallPage.speedStat,
    WallPage.distanceStat,
    WallPage.durationStat,
    WallPage.locationStat
  ];
  for (const stat of statList) {
    await t.expect(stat.exists).ok();
  }
};
