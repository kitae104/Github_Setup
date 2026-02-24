# Backend Rules (Spring Boot 4.x, Java 21)

## Layering
- Controller: HTTP/DTO 변환, 응답
- Service: 비즈니스 로직
- Repository: DB 접근
- Entity: JPA 모델
- DTO: request/response 분리

## Error Handling
- @RestControllerAdvice로 통합 처리
- 표준 에러 형식:
  - code: string
  - message: string
  - timestamp: ISO-8601
  - path: string
  - details: object|null