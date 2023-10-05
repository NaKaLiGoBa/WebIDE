package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.service.MemberService;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

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

        if(AuthEmailCheckDto.AUTH_SUCCESS.equals(result)) {
            return ResponseEntity.ok(new EmailAuthCheckResponse("200", "인증에 성공하였습니다."));
        } else {
            return ResponseEntity.badRequest().body(new EmailAuthCheckResponse("400", "인증에 실패하였습니다."));
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
}