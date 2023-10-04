package com.nakaligoba.backend.repository;

import com.nakaligoba.backend.entity.MemberProjectEntity;
import com.nakaligoba.backend.entity.ProjectEntity;
import com.nakaligoba.backend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberProjectRepository extends JpaRepository<MemberProjectEntity, Long> {

    @Query("SELECT mp FROM MemberProjectEntity mp " +
            "JOIN FETCH mp.project JOIN FETCh mp.member " +
            "WHERE mp.member.email = :email")
    List<MemberProjectEntity> findByMemberEmailWithFetch(@Param("email") String email);
}
