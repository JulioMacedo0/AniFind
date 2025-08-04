// lib/queries.ts
import { gql } from "@apollo/client";

export const GET_ANIME_BY_ID = gql`
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      title {
        english
        romaji
        native
      }
      description
      coverImage {
        extraLarge
      }
      trailer {
        site
        id
      }
      averageScore
      startDate {
        year
      }
      episodes
      genres
      studios(isMain: true) {
        nodes {
          name
        }
      }
      status
      externalLinks {
        site
        url
        type
        language
      }
    }
  }
`;
