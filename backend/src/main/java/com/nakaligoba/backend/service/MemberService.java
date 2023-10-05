package com.nakaligoba.backend.service;

import com.nakaligoba.backend.controller.MemberController.AuthEmailCheckDto;
import com.nakaligoba.backend.controller.MemberController.AuthEmailDto;
import com.nakaligoba.backend.controller.MemberController.MemberDto;
import com.nakaligoba.backend.entity.MemberEntity;
import com.nakaligoba.backend.repository.MemberRepository;
import com.nakaligoba.backend.utils.AuthNumberManager;
import lombok.RequiredArgsConstructor;
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
import java.util.Random;

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
        String authNumber = getAuthNumber();

        authNumberManager.setData(authEmailDto.getEmail(), authNumber);
        sendAuthEmail(authEmailDto, authNumber);
    }

    private String getAuthNumber() {
        Random random = new Random();
        return String.valueOf(111111 + random.nextInt(888889));
    }

    private void sendAuthEmail(AuthEmailDto authEmailDto, String authNumber) {
        String title = "NakaLiGoBa 회원가입 인증 메일입니다.";
        String contents = "";
        contents += "안녕하세요. NakaLiGoBa 입니다.<br/>";
        contents += "NakaLiGoBa 회원가입을 진심으로 환영합니다.<br/><br/>";
        contents += "아래의 인증번호를 입력하여 인증을 하시면 NakaLiGoBa 회원가입이 완료됩니다.<br/><br/>";
        contents += "회원가입 인증번호 : ";
        contents += authNumber;

        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "utf-8");
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(authEmailDto.getEmail());
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
}