package com.nakaligoba.backend.controller;

import com.nakaligoba.backend.entity.Role;
import com.nakaligoba.backend.service.ProjectService;
import com.nakaligoba.backend.utils.JwtUtils;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final JwtUtils jwtUtils;

    @PostMapping
    public ResponseEntity<ProjectCreateResponse> createProject(
            @Valid @RequestBody ProjectCreateRequest request,
            HttpServletRequest httpServletRequest) {

        String email = getEmailFromRequest(httpServletRequest);
        ProjectCreateResponse response = projectService.create(request, email);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ProjectListResponse>> getAllProjects(HttpServletRequest httpServletRequest) {

        String email = getEmailFromRequest(httpServletRequest);
        List<ProjectListResponse> projects = projectService.getProjectsOfMember(email);
        return ResponseEntity.ok(projects);
    }

    private String getEmailFromRequest(HttpServletRequest request) {
        String token = jwtUtils.getTokenFromHeader(request);
        return jwtUtils.getEmailFromJwt(token);
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProjectCreateRequest {
        private String name;
        private String description;
        private String template;
    }

    @Data
    @Builder
    public static class ProjectCreateResponse {
        private Long id;
        private String storageId;
    }

    @Data
    @Builder
    public static class ProjectListResponse {
        private Long id;
        private String storageId;
        private String name;
        private String description;
        private LocalDateTime updatedAt;
        private List<CollaboratorResponse> collaborators;
    }

    @Data
    @Builder
    public static class CollaboratorResponse {
        private Long id;
        private String name;
        private Role role;

        public CollaboratorResponse(Long id, String name, Role role) {
            this.id = id;
            this.name = name;
            this.role = role;
        }
    }
}
