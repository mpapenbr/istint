import { combineReducers } from "redux";
import { expectSaga } from "redux-saga-test-plan";
import { sagaTest } from "../actions";
import { raceReducer } from "../reducer";
import { handleSagaTest } from "../sagas";
import { RaceActionTypes } from "../types";

/**
 * see http://redux-saga-test-plan.jeremyfairbank.com/integration-testing/mocking/dynamic-providers.html for doc
 * also for examples: https://github.com/jfairbank/redux-saga-test-plan/tree/master/__tests__/expectSaga/providers
 *
 *
 */
describe("race saga testplan sample", () => {
  const combReducers = combineReducers({
    race: raceReducer,
  });

  beforeEach(() => {
    // console.log("before")
  });

  it("should do something", () => {
    /**
     * This dummy test tests a lot. But what should be tested?
     * This (almost) full blown example seems to be a little too much.
     * reducer and state should be tested when testing the reducer.
     * It should be sufficient to check the side effects only,
     * in this case the put.
     * Example is kept anyway ;)
     */

    return expectSaga(handleSagaTest, sagaTest(42))
      .withReducer(raceReducer)
      .withState({})
      .put({ type: RaceActionTypes.SET_DURATION, payload: 42 })
      .hasFinalState({ data: { duration: 42 } })
      .run();
    // .then(x => console.log(x));
  });
});
