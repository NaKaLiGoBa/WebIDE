package com.nakaligoba.backend.service;

import com.nakaligoba.backend.entitiy.FileEntity;
import com.nakaligoba.backend.repository.FileRepository;
import lombok.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class FileService {

    private final FileRepository fileRepository;

    @Transactional
    public FileDto createFile(FileDto fileDto) {
        if (fileRepository.existsByName(fileDto.fileName)) {
            throw new IllegalArgumentException("파일이름이 중복되었습니다.");
        }

        FileEntity createdFile = FileEntity.builder()
                .name(fileDto.fileName)
                .ext(fileDto.ext)
                .content(fileDto.content)
                .build();

        createdFile = fileRepository.save(createdFile);

        return FileDto.builder()
                .fileId(createdFile.getId())
                .fileName(createdFile.getName())
                .ext(createdFile.getExt())
                .content(createdFile.getContent())
                .build();
    }

    @Transactional
    public FileDto updateFile(Long fileId, FileDto fileDto) {
        FileEntity fileEntity = fileRepository.findById(fileId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 파일을 찾을 수 없습니다."));

        fileEntity.changeName(fileDto.getFileName());
        fileEntity.changeExt(fileDto.getExt());
        fileEntity.changeContent(fileDto.getContent());

        fileRepository.save(fileEntity);

        return FileDto.builder()
                .fileId(fileEntity.getId())
                .fileName(fileEntity.getName())
                .ext(fileEntity.getExt())
                .content(fileEntity.getContent())
                .build();
    }

    @Transactional
    public FileDto getFileById(Long id) {
        return fileRepository.findById(id)
                .map(file -> FileDto.builder()
                        .fileId(file.getId())
                        .fileName(file.getName())
                        .ext(file.getExt())
                        .content(file.getContent())
                        .build())
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 파일을 찾을 수 없습니다."));
    }

    public String runCode(Long id) {
        FileEntity file = fileRepository.findById(id).orElseThrow(()
                -> new NoSuchElementException("해당 ID의 파일을 찾을 수 없습니다."));
        String content = file.getContent();
        // ..

        return content;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FileDto {
        private Long fileId;
        private String fileName;
        private String ext;
        private String content;
    }
}
