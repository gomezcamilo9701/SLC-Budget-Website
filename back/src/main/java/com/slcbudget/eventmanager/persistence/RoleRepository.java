package com.slcbudget.eventmanager.persistence;

import com.slcbudget.eventmanager.domain.RoleEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends CrudRepository<RoleEntity, Long> {
}
