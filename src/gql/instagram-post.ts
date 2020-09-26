import { gql } from '@apollo/client';

/*------------------------------------------------------------------------------*/
/*   FRAGMENTS                                                                  */
/*------------------------------------------------------------------------------*/

export const INSTAGRAM_POST_DATA = gql`
  fragment InstagramPostData on InstagramPost {
    url
    smallPreviewUrl
    mediumPreviewUrl
    largePreviewUrl
    description
    ownerUsername
    ownerProfilePic
  }
`;
