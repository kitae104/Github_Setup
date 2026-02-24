package com.example.backend.auth.dto;

public record AuthTokenResponse(
        String accessToken,
        String tokenType,
        long expiresInSeconds) {
}
