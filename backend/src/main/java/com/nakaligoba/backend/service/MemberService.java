package com.nakaligoba.backend.service;

import com.nakaligoba.backend.controller.MemberController.*;
import com.nakaligoba.backend.entity.MemberEntity;
import com.nakaligoba.backend.repository.MemberRepository;
import com.nakaligoba.backend.utils.AuthNumberManager;
import com.nakaligoba.backend.utils.BasicUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Optional;

@Slf4j
@PropertySource("classpath:application.yml")
@RequiredArgsConstructor
@Service
public class MemberService {

    @Value("${spring.mail.username}")
    private String sender;

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JavaMailSender javaMailSender;
    private final AuthNumberManager authNumberManager;

    @Transactional
    public void signup(MemberDto memberDto) {
        if (memberRepository.existsByEmail(memberDto.getEmail())) {
            throw new IllegalArgumentException("이미 등록된 이메일입니다.");
        }

        MemberEntity memberEntity = MemberEntity.builder()
                .email(memberDto.getEmail())
                .password(passwordEncoder.encode(memberDto.getPassword()))
                .name(memberDto.getName())
                .build();

        memberRepository.save(memberEntity);
    }

    @Transactional
    public void authEmail(AuthEmailDto authEmailDto) {
        String authNumber = BasicUtils.getAuthNumber();

        authNumberManager.setData(authEmailDto.getEmail(), authNumber);
        sendAuthEmail(authEmailDto, authNumber);
    }

    private void sendAuthEmail(AuthEmailDto authEmailDto, String authNumber) {
        String title = "NakaLiGoBa 회원가입 인증 메일입니다.";
        String contents = "";
        contents += "안녕하세요. NakaLiGoBa 입니다.<br/>";
        contents += "NakaLiGoBa 회원가입을 진심으로 환영합니다.<br/><br/>";
        contents += "아래의 인증번호를 입력하여 인증을 하시면 NakaLiGoBa 회원가입이 완료됩니다.<br/><br/>";
        contents += "회원가입 인증번호 : ";
        contents += authNumber;

        sendEmail(title, contents, authEmailDto.getEmail());
    }

    private void sendEmail(String title, String contents, String toEmail) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "utf-8");
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(toEmail);
            mimeMessageHelper.setSubject(title);
            mimeMessageHelper.setText(contents, true);

            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public String authEmailCheck(AuthEmailCheckDto authEmailCheckDto) {
        return Optional.ofNullable(authNumberManager.getData(authEmailCheckDto.getEmail()))
                .map(value -> {
                    if (value.equals(authEmailCheckDto.getAuthNumber())) {
                        authNumberManager.removeCode(authEmailCheckDto.getAuthNumber());
                        return AuthEmailCheckDto.AUTH_SUCCESS;
                    } else return AuthEmailCheckDto.AUTH_FAIL;
                })
                .orElse(AuthEmailCheckDto.AUTH_FAIL);
    }

    @Transactional
    public void passwordReset(PasswordResetDto passwordResetDto) {
        String resetPasswordToken = BasicUtils.getUUID();

        log.info("resetPasswordToken : " + resetPasswordToken);

        authNumberManager.setData(resetPasswordToken, passwordResetDto.getEmail());
        passwordResetEmail(passwordResetDto, resetPasswordToken);
    }

    private void passwordResetEmail(PasswordResetDto passwordResetDto, String resetPasswordToken) {
        String title = "[NakaLiGoBa] 비밀번호 재설정 메일입니다.";
        String passwordResetAuthLink = "http://50.19.246.89:8080/api/v1/auth/password/reset/email/" + resetPasswordToken;
        String contents = "";
        contents += "NakaLiGoBa 비밀번호 재설정 안내 메일입니다.<br/>";
        contents += "비밀번호 재발급을 원하시면 아래의 버튼을 누르세요.<br/><br/>";
        contents += "<a href=\"" + passwordResetAuthLink + "\">비밀번호 재설정</a>";

        sendEmail(title, contents, passwordResetDto.getEmail());
    }

    @Transactional
    public String passwordResetAuth(PasswordResetAuthDto passwordResetAuthDto) {
        String email = authNumberManager.getData(passwordResetAuthDto.getToken());

        return Optional.ofNullable(memberRepository.findByEmail(email))
                .map(value -> PasswordResetAuthDto.AUTH_SUCCESS)
                .orElse(PasswordResetAuthDto.AUTH_FAIL);
    }

    @Transactional
    public String passwordResetCheck(PasswordResetCheckDto passwordResetCheckDto) {
        String email = authNumberManager.getData(passwordResetCheckDto.getToken());
        log.info("email : " + email);

        return Optional.ofNullable(memberRepository.findByEmail(email))
                .map(updatedMemberEntity -> {
                    updatedMemberEntity.setPassword(passwordEncoder.encode(passwordResetCheckDto.getNewPassword()));
                    memberRepository.save(updatedMemberEntity);
                    authNumberManager.removeCode(passwordResetCheckDto.getToken());

                    return PasswordResetCheckDto.RESET_SUCCESS;
                })
                .orElse(PasswordResetCheckDto.RESET_FAIL);
    }
}