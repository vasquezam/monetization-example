import React, {useEffect, useState} from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"

const PLANS = {
  PLAN_FREE: "plan_free",
  PLAN_SMALL: "plan_small",
  PLAN_MEDIUM: "plan_medium",
  PLAN_LARGE: "plan_large"
}

const monday = mondaySdk();

const App = props => {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    monday.get("context").then((res) => {
      console.log("subscription is", res?.data?.subscription)
      console.log("Payload: ", res.data)
      setSubscription(res?.data?.subscription)
    });
  }, []);

  if (!subscription) {
    return (
        <div className={"monday-monetization-example__no-subscription"}>No active subscription found.</div>
    )
  }

  return (
      <div className={"monday-monetization-example"}>
        <div className={"monday-monetization-example__trial"}>Trial: {`${!!subscription.is_trial}`}</div>
        <div className={"monday-monetization-example__plans-container"}>
          { Object.values(PLANS).map((planId) => {
            return (
                <div key={planId} className={`monday-monetization-example__plan ${planId===subscription.plan_id ? "selected-plan" : ""}`}>
                  {planId}
                </div>
            )
          }) }
        </div>
      </div>
  )
}

export default App;


// In the API Playground, set a mock subscription:
// mutation {
//   set_mock_app_subscription (
//       app_id:12345678,
//       partial_signing_secret: "fdd167890",
//       is_trial: true,
//       renewal_date:"2023-10-27Z10:00:00+00:00",
//       plan_id: "plan_small"
// ) {
//     plan_id
//   }
// }

// To remove the mock subscription:
// mutation {
//   remove_mock_app_subscription (
//       app_id:12345678,
//       partial_signing_secret: "fdd167890",
// ) {
//     plan_id
//   }
// }
