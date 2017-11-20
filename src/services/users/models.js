// @flow

/* User represents a user as returned by the API */
export interface User {
  id? : string;
  name? : string;
  first_name? : string;
  last_name? : string;
  email? : string;
  is_admin? : boolean;
  picture? : string;
  public_email? : string;
  phone_number? : string;
  linkedin_custom_url? : string;
  facebook_username? : string;
  twitter_username? : string;
  is_featured? : boolean;
}
