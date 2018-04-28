export class LoginResponseModel {
    access_token: String;
    expires_in: Number;
    refresh_token: String;
    token_type: String;
    userName: String;
    user_id: String;
    vendor_id: String;
}

export class LoginRequestModel {
    Username: String;
    Password: String;
}
