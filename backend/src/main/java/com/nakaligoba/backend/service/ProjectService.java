package com.nakaligoba.backend.service;

import com.nakaligoba.backend.entity.MemberEntity;
import com.nakaligoba.backend.entity.MemberProjectEntity;
import com.nakaligoba.backend.entity.ProjectEntity;
import com.nakaligoba.backend.entity.Role;
import com.nakaligoba.backend.repository.MemberProjectRepository;
import com.nakaligoba.backend.repository.MemberRepository;
import com.nakaligoba.backend.repository.ProjectRepository;
import com.nakaligoba.backend.controller.ProjectController.*;
import lombok.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;
    private final MemberProjectRepository memberProjectRepository;

    @Transactional
    public ProjectCreateResponse create(ProjectCreateRequest request, String email) {
        if (projectRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("프로젝트명이 중복되었습니다.");
        }

        // Todo. template, storageId 추후 수정 필요
        String template = "python";

        ProjectEntity createdProject = ProjectEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .storageKey("storage_" + System.currentTimeMillis())
                .build();

        createdProject = projectRepository.save(createdProject);

        // Role를 구분하기 위한 logic
        MemberEntity currentMember = findMemberByEmail(email);
        saveOwnerToProject(currentMember, createdProject);

        return ProjectCreateResponse.builder()
                .id(createdProject.getId())
                .storageId(createdProject.getStorageKey())
                .build();
    }

    @Transactional
    public List<ProjectListResponse> getProjectsOfMember(String email) {
        List<MemberProjectEntity> memberProjects = memberProjectRepository.findByMemberEmailWithFetch(email);
        return memberProjects.stream()
                .map(memberProject -> {
                    ProjectEntity project = memberProject.getProject();
                    List<CollaboratorResponse> collaborators = getCollaborators(project);
                    return ProjectListResponse.builder()
                            .id(project.getId())
                            .storageId(project.getStorageKey())
                            .name(project.getName())
                            .description(project.getDescription())
                            .updatedAt(project.getUpdatedAt())
                            .collaborators(collaborators)
                            .build();
                })
                .collect(Collectors.toList());
    }
    private List<CollaboratorResponse> getCollaborators(ProjectEntity project) {
        return project.getProjectToMembers().stream()
                .map(projectMember -> new CollaboratorResponse(
                        projectMember.getMember().getId(),
                        projectMember.getMember().getName(),
                        projectMember.getRole()))
                .collect(Collectors.toList());
    }

    private MemberEntity findMemberByEmail(String email) {
        MemberEntity currentMember = memberRepository.findByEmail(email);
        if (currentMember == null) {
            throw new IllegalArgumentException("회원 정보를 찾을 수 없습니다.");
        }
        return currentMember;
    }

    private void saveOwnerToProject(MemberEntity member, ProjectEntity project) {
        MemberProjectEntity owner = MemberProjectEntity.builder()
                .role(Role.OWNER)
                .project(project)
                .member(member)
                .build();
        memberProjectRepository.save(owner);
    }
}
