import { gql } from "@apollo/client";

const LAUNCH_DETAILS = gql`
query Launch($launchId: ID!) {
    launch(id: $launchId) {
      mission_name rocket { rocket_name rocket_type } 
      details launch_date_utc launch_site { site_name } links { article_link video_link } }
    }
  
`;

export default LAUNCH_DETAILS;