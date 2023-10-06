package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.service.MemberService;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.io.IOException;

@Slf4j
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@Valid @RequestBody SignupRequest request) {
        MemberDto memberDto = MemberDto.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .name(request.getName())
                .build();

        // TODO : 추후 예외처리 필요
        memberService.signup(memberDto);

        return ResponseEntity.ok(new SignupResponse("회원가입이 완료되었습니다."));
    }

    @PostMapping("/email")
    public ResponseEntity<EmailAuthResponse> authEmail(@Valid @RequestBody EmailAuthRequest request) {
        AuthEmailDto authEmailDto = AuthEmailDto.builder()
                .email(request.email)
                .build();

        memberService.authEmail(authEmailDto);

        return ResponseEntity.ok(new EmailAuthResponse("인증번호를 전송하였습니다."));
    }

    @PostMapping("/email/check")
    public ResponseEntity<EmailAuthCheckResponse> authEmailCheck(@Valid @RequestBody EmailAuthCheckRequest request) {
        AuthEmailCheckDto authEmailCheckDto = AuthEmailCheckDto.builder()
                .email(request.email)
                .authNumber(request.authNumber)
                .build();

        String result = memberService.authEmailCheck(authEmailCheckDto);

        if (AuthEmailCheckDto.AUTH_SUCCESS.equals(result)) {
            return ResponseEntity.ok(new EmailAuthCheckResponse("200", "인증에 성공하였습니다."));
        } else {
            return ResponseEntity.badRequest().body(new EmailAuthCheckResponse("400", "인증에 실패하였습니다."));
        }
    }

    @PostMapping("/password/reset/email")
    public ResponseEntity<PasswordResetResponse> passwordReset(@Valid @RequestBody PasswordResetRequest request) {
        PasswordResetDto passwordResetDto = PasswordResetDto.builder()
                .email(request.getEmail())
                .build();

        memberService.passwordReset(passwordResetDto);

        return ResponseEntity.ok(new PasswordResetResponse("200", "인증 메일이 전송되었습니다."));
    }

    @GetMapping("/password/reset/email/{token}")
    public ResponseEntity<?> passwordResetAuth(@PathVariable("token") String token) throws IOException {
        PasswordResetAuthDto passwordResetAuthDto = PasswordResetAuthDto.builder()
                .token(token)
                .build();

        String result = memberService.passwordResetAuth(passwordResetAuthDto);
        String resetPageUrl = "";

        if (PasswordResetAuthDto.AUTH_SUCCESS.equals(result)) {
            resetPageUrl = "http://static-resource-web-ide.s3-website-us-east-1.amazonaws.com/password/reset?token=" + token;
        } else {
            resetPageUrl = "https://www.google.com"; // 실패 했을 경우 보여줄 페이지(임시)
        }

        return ResponseEntity.status(HttpStatus.FOUND).header("Location", resetPageUrl).build();
    }

    @PostMapping("/password/reset/check")
    public ResponseEntity<PasswordResetCheckResponse> passwordResetCheck(@Valid @RequestBody PasswordResetCheckRequest request) {
        PasswordResetCheckDto passwordResetCheckDto = PasswordResetCheckDto.builder()
                .newPassword(request.getNewPassword())
                .token(request.getToken())
                .build();

        String result = memberService.passwordResetCheck(passwordResetCheckDto);

        if (PasswordResetCheckDto.RESET_SUCCESS.equals(result)) {
            return ResponseEntity.ok(new PasswordResetCheckResponse("200", "비밀번호 재설정이 완료되었습니다."));
        } else {
            return ResponseEntity.badRequest().body(new PasswordResetCheckResponse("400", "비밀번호 재설정에 실패하였습니다."));
        }
    }

    @Data
    static class SignupRequest {
        @NotBlank
        private final String email;

        @NotBlank
        private final String password;

        @NotBlank
        private final String name;
    }

    @Data
    static class SignupResponse {
        private final String message;
    }

    @Data
    static class SigninRequest {
        @NotBlank
        private final String email;

        @NotBlank
        private final String password;
    }

    @Data
    static class SigninResponse {
        private final String accessToken;
        private final String message;
    }

    @Data
    @NoArgsConstructor
    static class EmailAuthRequest {
        @NotBlank
        private String email;
    }

    @Data
    static class EmailAuthResponse {
        private final String message;
    }

    @Data
    @NoArgsConstructor
    static class EmailAuthCheckRequest {
        @NotBlank
        private String email;

        @NotBlank
        private String authNumber;
    }

    @Data
    static class EmailAuthCheckResponse {
        private final String code;
        private final String message;
    }

    @Data
    @NoArgsConstructor
    static class PasswordResetRequest {
        @NotBlank
        private String email;
    }

    @Data
    static class PasswordResetResponse {
        private final String code;
        private final String message;
    }

    @Data
    @NoArgsConstructor
    static class PasswordResetCheckRequest {
        @NotBlank
        private String newPassword;
        @NotBlank
        private String token;
    }

    @Data
    static class PasswordResetCheckResponse {
        private final String code;
        private final String message;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MemberDto {
        private String email;
        private String password;
        private String name;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AuthEmailDto {
        private String email;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AuthEmailCheckDto {
        public static final String AUTH_FAIL = "0";
        public static final String AUTH_SUCCESS = "1";

        private String email;
        private String authNumber;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PasswordResetDto {
        private String email;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PasswordResetAuthDto {
        public static final String AUTH_FAIL = "0";
        public static final String AUTH_SUCCESS = "1";

        private String token;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PasswordResetCheckDto {
        public static final String RESET_FAIL = "0";
        public static final String RESET_SUCCESS = "1";

        private String newPassword;
        private String token;
    }
}