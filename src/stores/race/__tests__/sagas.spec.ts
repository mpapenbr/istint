import { expectSaga } from "redux-saga-test-plan";
import { driverInitialState } from "../../driver/reducer";
import { settingsInitialState } from "../../settings/reducer";
import { sagaChangeDuration } from "../actions";
import { raceInitialState } from "../reducer";
import { handleChangeDuration } from "../sagas/settings";
import { RaceActionTypes } from "../types";

/**
 * see http://redux-saga-test-plan.jeremyfairbank.com/integration-testing/mocking/dynamic-providers.html for doc
 * also for examples: https://github.com/jfairbank/redux-saga-test-plan/tree/master/__tests__/expectSaga/providers
 *
 *
 */
describe("race saga testplan ", () => {
  beforeEach(() => {
    // console.log("before")
  });

  it("should check ", () => {
    return (
      expectSaga(handleChangeDuration, sagaChangeDuration(42))
        .withState({ race: raceInitialState, driver: driverInitialState, settings: settingsInitialState })
        .put({ type: RaceActionTypes.SET_DURATION, payload: 42 })
        // TODO:  check if payload is just some array (content not important)
        // .put({ type: RaceActionTypes.SET_STINTS, payload: [] })

        .run()
    );
    // .then(x => console.log(x));
  });
});
