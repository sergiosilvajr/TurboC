import { gql } from "@apollo/client";

const LIST_LAUNCHES = gql`
 {
  launches {
    id
    mission_name
    rocket {
      rocket_name
      rocket_type
    }
    details
    launch_date_utc
  }
}
`;

export default LIST_LAUNCHES;