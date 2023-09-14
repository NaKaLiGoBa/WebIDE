package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.service.FileService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import com.nakaligoba.backend.service.FileService.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/file")
public class FileController {

    private final FileService fileService;

    @GetMapping("/{id}")
    public ResponseEntity<FileDto> getFile(@PathVariable Long id) {
        FileDto fileDto = fileService.getFileById(id);
        return ResponseEntity.ok(fileDto);
    }

    @PostMapping
    public ResponseEntity<FileDto> saveFile(@Valid @RequestBody FileRequest request) {
        FileDto fileDto = FileDto.builder()
                .fileName(request.getName())
                .ext(request.getExt())
                .content(request.getContent())
                .build();

        FileDto savedFileDto = fileService.createFile(fileDto);

        return ResponseEntity.ok(savedFileDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FileDto> updateFile(@PathVariable Long id, @Valid @RequestBody FileRequest request) {
        FileDto fileDto = FileDto.builder()
                .fileName(request.getName())
                .ext(request.getExt())
                .content(request.getContent())
                .build();

        FileDto updatedFileDto = fileService.updateFile(id, fileDto);

        return ResponseEntity.ok(updatedFileDto);
    }

    @PostMapping("/{id}/run")
    public ResponseEntity<String> runFile(@PathVariable Long id) {
        String result = fileService.runCode(id);
        return ResponseEntity.ok(result);
    }

    @Data
    static class FileRequest {
        @NotEmpty
        private final String name;
        @NotEmpty
        private final String ext;
        private final String content;
    }
}
