import { AsideDrawer, Leaderboard, LoginPage } from "../pages";
import { Constants } from "../constants";

fixture(`Leaderboard`)
  .page(Constants.hostname)
  .beforeEach(async t => {
    await t.maximizeWindow();
    await t.expect(LoginPage.loginBtn.exists).ok();
    await t.click(LoginPage.loginBtn);
    await t.typeText(LoginPage.oauthUsernameInput, Constants.testUserLogin);
    await t.typeText(LoginPage.oauthPasswordInput, Constants.testUserPass);
    await t.click(LoginPage.oauthLoginBtn);
  });

test("Leaderboard exist, rank medals exists", async (t) => {
  await t.expect(AsideDrawer.leaderboardBtn.exists).ok();
  await t.click(AsideDrawer.leaderboardBtn);
  const userCards = Leaderboard.userCard;
  await t.expect(userCards.exists).ok();

  const goldMedal = Leaderboard.getGoldMedal(userCards.nth(0));
  const silverMedal = Leaderboard.getSilverMedal(userCards.nth(1));
  const bronzeMedal = Leaderboard.getBronzeMedal(userCards.nth(2));
  await t.expect(goldMedal.exists).ok();
  await t.expect(silverMedal.exists).ok();
  await t.expect(bronzeMedal.exists).ok();
});
