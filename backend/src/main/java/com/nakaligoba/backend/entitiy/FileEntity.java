package com.nakaligoba.backend.entitiy;

import com.nakaligoba.backend.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Table(name = "files")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class FileEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String ext;

    @Lob
    private String content;

    @Builder
    public FileEntity(String name, String ext, String content) {
        this.name = name;
        this.ext = ext;
        this.content = content;
    }

    public void changeName(String newName) {
        this.name = newName;
    }
    public void changeExt(String newExt) {
        this.ext = newExt;
    }
    public void changeContent(String newContent) {
        this.content = newContent;
    }
}
