package com.horizon.my_app.payload.request;

public class searchFoodRequest {
    private String key;

    public searchFoodRequest() {
    }

    public searchFoodRequest(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
