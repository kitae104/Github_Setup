package com.example.backend.common.error;

public record ErrorResponse(
        String code,
        String message,
        String timestamp,
        String path,
        Object details) {
}
