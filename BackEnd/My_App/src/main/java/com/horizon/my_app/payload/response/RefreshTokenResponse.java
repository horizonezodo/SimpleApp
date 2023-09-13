package com.horizon.my_app.payload.response;

public class RefreshTokenResponse {
    private String token;
    private String refreshToken;

    public RefreshTokenResponse() {
    }

    public RefreshTokenResponse(String token, String refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
